// End-to-end tests of the redesigned account journey, run against a real API process and a real MongoDB.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 API_DIR=/path/to/src node --test test/journey.test.mjs
//
// API_DIR defaults to this backend folder (app/ and utils/ side by side). The suite seeds the profile
// question bank from Project/sections/question-bank, so profile completion is computed on the real banks.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000 + Math.floor(Math.random() * 900) + 50;
const HOST = `127.0.0.1:${PORT}`;
const BASE = `http://${HOST}/api/v1`;
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_journey_${Date.now()}`;
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
let server;
let db;

/* ---------- helpers ---------- */
async function call(method, url, body, token) {
    const res = await fetch(`${BASE}${url}`, {
        method,
        headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
        body: body ? JSON.stringify(body) : undefined,
    });
    let json = null;
    try { json = await res.json(); } catch {}
    return { status: res.status, body: json };
}
const captcha = async () => {
    const r = await call("GET", "/account/captcha");
    assert.equal(r.status, 200);
    assert.match(r.body.data.svg, /^<svg/);
    assert.ok(!r.body.data.svg.includes(r.body.data.testAnswer), "the answer must not appear in the SVG");
    return { id: r.body.data.id, answer: r.body.data.testAnswer };
};
const outbox = async (to) => (await call("GET", `/account/__test/outbox?to=${encodeURIComponent(to)}`)).body.data;
const linkFrom = (mail) => ({ user: mail.data.user._id, code: mail.data.otp.code });
let n = 0;
const email = (tag) => `${tag}.${Date.now()}.${n++}@example.com`;
const person = (over = {}) => ({
    firstName: "Asha",
    dob: "1990-04-12",
    email: email("asha"),
    phone: "+91 98765 43210",
    phoneCountry: "IN",
    country: "IN",
    state: "DL",
    city: "New Delhi",
    postalCode: "110001",
    segment: "patient",
    ...over,
});
async function register(over) {
    const p = person(over);
    const r = await call("POST", "/account/register", { ...p, captcha: await captcha() });
    return { p, r };
}
const PASSWORD = "Sunrise-Clinic-42";
async function activeMember(over) {
    const { p, r } = await register(over);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const [mail] = await outbox(p.email);
    const s = await call("POST", "/account/set-password", { ...linkFrom(mail), password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(s.status, 200, JSON.stringify(s.body));
    const l = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(l.status, 200, JSON.stringify(l.body));
    return { p, token: l.body.token, journey: l.body.data.journey };
}
const APPROVALS = { terms: true, privacy: true, accuracy: true, confidential: true };
const VERSION = { hcp: "HCP-2026.10", caregiver: "CG-2026.10", patient: "PT-2026.10" };
const sign = (token, segment, extra = {}) => call("POST", "/me/consent", { termsVersion: VERSION[segment], approvals: { ...APPROVALS }, language: "en", ...extra }, token);

/* ---------- setup ---------- */
async function seed() {
    const src = path.resolve(here, "../../sections/question-bank");
    const meta = { origin: HOST, isActive: true, isDeleted: false };
    const load = (f) => JSON.parse(fs.readFileSync(path.join(src, f), "utf-8")).map(({ _id, ...d }) => ({ ...d, ...meta }));
    const uniq = (rows, key) => [...new Map(rows.map((r) => [key(r), r])).values()];
    // the shared bank holds every panel; profiles keyed by category + slug (some copies have no slug)
    await db.collection("Profile").insertMany(uniq(load("Profile.json").map((p) => ({ ...p, slug: p.slug || p.name })), (p) => `${p.category}|${p.slug}`));
    await db.collection("Question").insertMany(uniq(load("Question.json"), (q) => q.name));
    await db.collection("Option").insertMany(load("Option.json"));
    const s = (slug, category, extra = {}) => ({ slug, name: `Study ${slug}`, category, source: "internal", points: 100, loi: 10, status: "active", pages: [], ...meta, ...extra });
    await db.collection("Survey").insertMany([
        s("welcome", "patient"),
        s("pt-open", "patient"),
        s("pt-open-2", "patient", { points: 50 }),
        s("pt-closed", "patient", { status: "closed" }),
        s("pt-future", "patient", { active: { from: new Date(Date.now() + 864e5) } }),
        s("pt-diabetes-only", "patient", { filters: { "chronic-conditions": ["yes"] } }),
        s("hcp-open", "healthcare professional"),
        s("cg-open", "care giver"),
    ]);
}

before(async () => {
    db = (await mongoose.createConnection(DB).asPromise()).db;
    await seed();
    server = spawn(process.execPath, ["app/server.js"], {
        cwd: API_DIR,
        env: { ...process.env, NODE_ENV: "test", MAIL_MX_CHECK: "false", JWT_SECRET: "journey-test-secret", mongodb: DB, port: String(PORT), MHO_RATE_LIMIT_SCALE: "10" },
        stdio: ["ignore", "pipe", "pipe"],
    });
    let log = "";
    server.stdout.on("data", (d) => (log += d));
    server.stderr.on("data", (d) => (log += d));
    for (let i = 0; i < 100; i++) {
        try { if ((await fetch(`${BASE}/account/location/countries`)).ok) return; } catch {}
        await new Promise((r) => setTimeout(r, 150));
    }
    throw new Error(`API did not start:\n${log}`);
});
after(async () => {
    server?.kill();
    await db?.dropDatabase();
    await mongoose.disconnect();
    process.exit(0);
});

/* ---------- registration ---------- */
test("registration: mandatory fields are enforced on the server, middle and last name are optional", async () => {
    const r = await call("POST", "/account/register", { captcha: await captcha() });
    assert.equal(r.status, 422);
    for (const f of ["firstName", "dob", "email", "phone", "country", "segment"]) assert.ok(r.body.errors[f], `${f} should be required`);
    assert.equal(r.body.errors.middleName, undefined);
    assert.equal(r.body.errors.lastName, undefined);
    const ok = await register({ middleName: "", lastName: "" });
    assert.equal(ok.r.status, 200, JSON.stringify(ok.r.body));
});

test("registration: invalid email, phone and future DOB are rejected", async () => {
    const { r } = await register({ email: "not-an-email", phone: "12", dob: "2999-01-01" });
    assert.equal(r.status, 422);
    assert.ok(r.body.errors.email && r.body.errors.phone && r.body.errors.dob);
});

test("registration: under 18 is not eligible (Kunal's 18+ rule)", async () => {
    const d = new Date(); d.setUTCFullYear(d.getUTCFullYear() - 17);
    const { r } = await register({ dob: d.toISOString().slice(0, 10) });
    assert.equal(r.status, 403);
    assert.equal(r.body.code, "NOT_ELIGIBLE");
});

test("location: state required where the country has states; city required where the state has cities", async () => {
    const a = await register({ state: "" });
    assert.equal(a.r.status, 422); assert.ok(a.r.body.errors.state);
    const b = await register({ state: "ZZ" });
    assert.ok(b.r.body.errors.state);
    const c = await register({ city: "" });
    assert.ok(c.r.body.errors.city);
});

test("location: country list has flags, no duplicates, and dependent states/cities", async () => {
    const r = await call("GET", "/account/location/countries");
    const list = r.body.data;
    assert.ok(list.length >= 240);
    assert.equal(new Set(list.map((c) => c.code)).size, list.length);
    assert.ok(list.find((c) => c.code === "IN").flag);
    const st = await call("GET", "/account/location/IN/states");
    assert.ok(st.body.data.find((s) => s.code === "DL"));
    const ct = await call("GET", "/account/location/IN/DL/cities");
    assert.ok(ct.body.data.length > 0);
});

test("postal code: validated per country, and optional when marked not applicable", async () => {
    const bad = await register({ postalCode: "ABCDE" });
    assert.ok(bad.r.body.errors.postalCode, "Indian PIN must be 6 digits");
    const us = await register({ country: "US", phoneCountry: "US", phone: "+1 415 555 2671", state: "CA", city: "San Francisco", postalCode: "94103" });
    assert.equal(us.r.status, 200, JSON.stringify(us.r.body));
    const ukStyleInUs = await register({ country: "US", phoneCountry: "US", phone: "+1 415 555 2671", state: "CA", city: "San Francisco", postalCode: "SW1A 1AA" });
    assert.ok(ukStyleInUs.r.body.errors.postalCode, "a UK postcode is not valid for the US");
    const na = await register({ postalCode: "", postalCodeNotApplicable: true });
    assert.equal(na.r.status, 200);
    const user = await db.collection("User").findOne({ mail: na.p.email });
    assert.equal(user.postalCodeApplicable, false);
    assert.equal(user.address[0].zipcode, "");
});

test("captcha: wrong answers fail and a solved challenge cannot be reused", async () => {
    const c = await captcha();
    const wrong = await call("POST", "/account/register", { ...person(), captcha: { id: c.id, answer: "nope1" } });
    assert.equal(wrong.body.code, "CAPTCHA_FAILED");
    const again = await call("POST", "/account/register", { ...person(), captcha: c });
    assert.equal(again.body.code, "CAPTCHA_FAILED", "a challenge is spent on its first check");
    const none = await call("POST", "/account/login", { email: "x@example.com", password: "x" });
    assert.equal(none.body.code, "CAPTCHA_FAILED");
});

test("HCP screening: not working in healthcare is screened out; a valid HCP stores the screening answers", async () => {
    const out = await register({ segment: "hcp", screening: { worksInHealthcare: "no" } });
    assert.equal(out.r.body.code, "NOT_ELIGIBLE");
    const ok = await register({ segment: "hcp", screening: { worksInHealthcare: "yes", clinician: "yes" } });
    assert.equal(ok.r.status, 200);
    const u = await db.collection("User").findOne({ mail: ok.p.email });
    assert.equal(u.category, "healthcare professional");
    assert.equal(u.accountStatus, "pending");
    assert.equal(u.password, undefined);
    const a = await db.collection("Answer").find({ user: String(u._id) }).toArray();
    assert.deepEqual(a.map((x) => x.question).sort(), ["clinician", "works_in_healthcare"]);
});

test("duplicate email, not confirmed yet: no second account, the confirmation link is sent again", async () => {
    const first = await register();
    const dup = await call("POST", "/account/register", { ...first.p, captcha: await captcha() });
    assert.equal(dup.status, 200);
    assert.equal(dup.body.data.alreadyRegistered, true);
    assert.equal(dup.body.data.unverified, true);
    assert.match(dup.body.message, /already registered but not confirmed/);
    assert.equal((await outbox(first.p.email)).length, 2);
    assert.equal(await db.collection("User").countDocuments({ mail: first.p.email }), 1);
});

test("duplicate email, active account (issue #37): 'already registered, please log in', no second account, no email", async () => {
    const { p } = await activeMember();
    const before = (await outbox(p.email)).length;
    const dup = await call("POST", "/account/register", { ...p, email: p.email.toUpperCase(), captcha: await captcha() });
    assert.equal(dup.status, 409);
    assert.equal(dup.body.code, "EMAIL_TAKEN");
    assert.equal(dup.body.errors.email, "This email is already registered. Please log in.");
    assert.equal(await db.collection("User").countDocuments({ mail: p.email }), 1);
    assert.equal((await outbox(p.email)).length, before);
    // still behind the human check: a wrong answer says nothing about the address
    const bot = await call("POST", "/account/register", { ...p, captcha: { id: "0".repeat(24), answer: "x" } });
    assert.equal(bot.body.code, "CAPTCHA_FAILED");
});

/* ---------- email verification and password ---------- */
test("verification email: segment template, single-use 24h link, no plain code in the database", async () => {
    const { p } = await register({ segment: "caregiver" });
    const [mail] = await outbox(p.email);
    assert.equal(mail.segment, "caregiver");
    assert.equal(mail.template, "respondent");
    assert.match(mail.subject, /caregiver circle/);
    assert.ok(mail.data.otp.code.length >= 40, "token must be long and random");
    const tok = await db.collection("AuthToken").findOne({ purpose: "verify-email", user: new mongoose.Types.ObjectId(mail.data.user._id) });
    assert.notEqual(tok.tokenHash, mail.data.otp.code);
    const hours = (tok.expiresAt - tok.createdAt) / 36e5;
    assert.ok(hours > 23.9 && hours < 24.1);
    assert.equal(Object.keys(mail.data.user).sort().join(","), "_id,mail,memberId,name,origin", "mail gets only the fields its template uses");
});

test("login is blocked until the email is verified", async () => {
    const { p } = await register();
    const l = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(l.status, 403);
    assert.equal(l.body.code, "EMAIL_UNVERIFIED");
});

test("set password: mismatch and weak passwords are refused; the link then works once only", async () => {
    const { p } = await register();
    const [mail] = await outbox(p.email);
    const link = linkFrom(mail);
    const check = await call("POST", "/account/link", { kind: "verify", ...link });
    assert.equal(check.status, 200);
    assert.equal(check.body.data.firstName, "Asha");
    const mismatch = await call("POST", "/account/set-password", { ...link, password: PASSWORD, confirmPassword: "other" });
    assert.ok(mismatch.body.errors.confirmPassword);
    const weak = await call("POST", "/account/set-password", { ...link, password: "password", confirmPassword: "password" });
    assert.equal(weak.body.code, "WEAK_PASSWORD");
    const good = await call("POST", "/account/set-password", { ...link, password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(good.status, 200);
    const reuse = await call("POST", "/account/set-password", { ...link, password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(reuse.body.code, "LINK_USED");
    const u = await db.collection("User").findOne({ mail: p.email });
    assert.equal(u.isVerified.email, "verified");
    assert.equal(u.accountStatus, "active");
    assert.match(u.password, /^\$2[aby]\$12\$/, "bcrypt with cost 12");
    const welcome = (await outbox(p.email)).find((m) => m.template === "welcome");
    assert.ok(welcome, "account-active mail is sent");
});

test("expired and guessed links are refused; a resend voids the earlier link", async () => {
    const { p } = await register();
    const [first] = await outbox(p.email);
    await call("POST", "/account/resend-verification", { email: p.email, captcha: await captcha() });
    const mails = await outbox(p.email);
    assert.equal(mails.length, 2);
    const old = await call("POST", "/account/link", { kind: "verify", ...linkFrom(first) });
    assert.equal(old.body.code, "LINK_USED");
    const guess = await call("POST", "/account/link", { kind: "verify", user: first.data.user._id, code: "A".repeat(43) });
    assert.equal(guess.body.code, "LINK_INVALID");
    await db.collection("AuthToken").updateMany({ user: new mongoose.Types.ObjectId(first.data.user._id), usedAt: null }, { $set: { expiresAt: new Date(Date.now() - 1000) } });
    const expired = await call("POST", "/account/set-password", { ...linkFrom(mails[1]), password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(expired.body.code, "LINK_EXPIRED");
});

test("five wrong guesses burn the live link", async () => {
    const { p } = await register();
    const [mail] = await outbox(p.email);
    for (let i = 0; i < 5; i++) await call("POST", "/account/link", { kind: "verify", user: mail.data.user._id, code: `guess${i}`.padEnd(43, "x") });
    const real = await call("POST", "/account/link", { kind: "verify", ...linkFrom(mail) });
    assert.equal(real.body.code, "LINK_USED");
});

/* ---------- login ---------- */
test("login: wrong password and unknown email give the same answer", async () => {
    const { p } = await activeMember();
    const wrong = await call("POST", "/account/login", { email: p.email, password: "Wrong-Pass-1", captcha: await captcha() });
    const unknown = await call("POST", "/account/login", { email: "nobody@example.com", password: "Wrong-Pass-1", captcha: await captcha() });
    assert.equal(wrong.status, 401);
    assert.deepEqual(wrong.body, unknown.body);
});

test("after login a new member is sent to the consent form of their own segment, never the dashboard", async () => {
    for (const seg of ["hcp", "caregiver", "patient"]) {
        const extra = seg === "hcp" ? { screening: { worksInHealthcare: "yes", clinician: "no" } } : {};
        const { token, journey } = await activeMember({ segment: seg, ...extra });
        assert.equal(journey.segment, seg);
        assert.equal(journey.next, "consent");
        assert.equal(journey.nextUrl, { hcp: "/consent/healthcare/", caregiver: "/consent/caregiver/", patient: "/consent/patient/" }[seg]);
        const c = await call("GET", "/me/consent", null, token);
        assert.equal(c.body.data.segment, seg);
        assert.equal(c.body.data.termsVersion, VERSION[seg]);
        const d = await call("GET", "/me/dashboard", null, token);
        assert.equal(d.status, 403);
        assert.equal(d.body.code, "CONSENT_REQUIRED");
    }
});

/* ---------- consent ---------- */
test("consent: required approvals must be explicitly true; version must be current; segment comes from the account", async () => {
    const { token } = await activeMember({ segment: "patient" });
    const missing = await call("POST", "/me/consent", { termsVersion: VERSION.patient, approvals: { terms: true, privacy: true, accuracy: true } }, token);
    assert.equal(missing.body.code, "APPROVALS_MISSING");
    assert.deepEqual(missing.body.data.missing, ["confidential"]);
    const truthy = await call("POST", "/me/consent", { termsVersion: VERSION.patient, approvals: { terms: "yes", privacy: 1, accuracy: true, confidential: true } }, token);
    assert.equal(truthy.body.code, "APPROVALS_MISSING", "only boolean true counts");
    const wrongDoc = await sign(token, "hcp");
    assert.equal(wrongDoc.body.code, "VERSION_CHANGED", "a patient cannot sign the HCP document");
    const ok = await sign(token, "patient", { approvals: { ...APPROVALS, marketing: true }, clausesReviewed: [1, 2, 24] });
    assert.equal(ok.status, 200, JSON.stringify(ok.body));
    assert.match(ok.body.data.consentId, /^MHO-PT-\d{8}-[0-9A-F]{8}$/);
    assert.equal(ok.body.data.approvals.marketing, true);
    assert.equal(ok.body.data.approvals.analytics, false);
    const j = await call("GET", "/me/journey", null, token);
    assert.equal(j.body.data.next, "dashboard");
    assert.equal(j.body.data.consent.status, "valid");
    const rec = await db.collection("ConsentRecord").findOne({ consentId: ok.body.data.consentId });
    assert.equal(rec.segment, "patient");
    assert.equal(rec.termsVersion, "PT-2026.10");
    assert.ok(rec.acceptedAt instanceof Date);
    assert.equal(rec.ipHash.length, 16);
});

test("consent: a returning member with valid consent goes straight to the dashboard; a version bump asks again", async () => {
    const { p, token } = await activeMember({ segment: "caregiver" });
    await sign(token, "caregiver");
    const again = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(again.body.data.journey.next, "dashboard");
    // simulate a member whose only signature is on an older version
    const u = await db.collection("User").findOne({ mail: p.email });
    await db.collection("ConsentRecord").updateMany({ user: u._id }, { $set: { termsVersion: "CG-2025.01" } });
    const j = await call("GET", "/me/journey", null, token);
    assert.equal(j.body.data.consent.status, "outdated");
    assert.equal(j.body.data.next, "consent");
});

test("consent: decline is recorded and keeps the dashboard closed; history is append-only", async () => {
    const { token } = await activeMember({ segment: "patient" });
    const d = await call("POST", "/me/consent/decline", {}, token);
    assert.equal(d.status, 200);
    const j = await call("GET", "/me/journey", null, token);
    assert.equal(j.body.data.consent.status, "declined");
    assert.equal((await call("GET", "/me/dashboard", null, token)).status, 403);
    await sign(token, "patient");
    const h = await call("GET", "/me/consent/history", null, token);
    assert.deepEqual(h.body.data.map((r) => r.action), ["accept", "decline"]);
    const ConsentRecord = (await import(path.join(API_DIR, "app/model/ConsentRecord.js"))).default;
    await assert.rejects(() => ConsentRecord.updateOne({}, { $set: { action: "x" } }), /append-only/);
});

/* ---------- dashboard ---------- */
test("dashboard: profile completion is computed from the member's own answers and category", async () => {
    const { p, token } = await activeMember({ segment: "patient" });
    await sign(token, "patient");
    const before = (await call("GET", "/me/dashboard", null, token)).body.data;
    assert.equal(before.segment, "patient");
    assert.equal(before.profile.configured, true);
    assert.ok(before.profile.sections.length > 5);
    assert.ok(before.profile.sections.every((s) => !["educational", "professional-address"].includes(s.slug)), "no HCP sections for a patient");
    assert.ok(before.profile.overall < 100);
    const basic = before.profile.sections.find((s) => s.slug === "basic");
    assert.ok(basic.answered >= 6, "sign-up fields count towards the Basic profile");
    // answer the health question through the existing profile API, then the numbers move
    await call("PATCH", "/me/profile", { "health-status": "good" }, token);
    const after = (await call("GET", "/me/dashboard", null, token)).body.data;
    // the patient questionnaire asks health status once, in the General Health profile (sectionRules.json)
    const ph = (d) => d.profile.sections.find((s) => s.slug === "general health profile");
    assert.ok(ph(after).answered === ph(before).answered + 1);
    assert.equal(after.highlights.find((h) => h.question === "health-status").value.toLowerCase().includes("good"), true);
});

test("dashboard: surveys come from the member's category, status, dates, eligibility and own responses", async () => {
    const { p, token } = await activeMember({ segment: "patient" });
    await sign(token, "patient");
    const u = await db.collection("User").findOne({ mail: p.email });
    await db.collection("Response").insertMany([
        { user: u._id, survey: { slug: "pt-open-2", name: "Study pt-open-2" }, status: "complete", points: 50, timeline: { start: new Date(), end: new Date() }, origin: HOST, isActive: true, isDeleted: false },
    ]);
    const d = (await call("GET", "/me/dashboard", null, token)).body.data;
    assert.deepEqual(d.surveys.available.map((s) => s.slug), ["pt-open"], "closed, future, other-category, welcome, taken and filtered surveys are left out");
    assert.equal(d.surveys.counts.completed, 1);
    assert.equal(d.surveys.pointsEarned, 50);
    assert.ok(d.notifications.find((x) => x.kind === "surveys").text.startsWith("1 survey is available"));
    assert.equal(d.consent.action, "accept");
});

test("security: a member cannot raise their own role, category or verification through PUT /me", async () => {
    const { p, token } = await activeMember({ segment: "patient" });
    await call("PUT", "/me", { role: "admin", category: "healthcare professional", isVerified: { email: "verified" }, accountStatus: "active", gender: "Female", qualityScore: 200 }, token);
    const u = await db.collection("User").findOne({ mail: p.email });
    assert.equal(u.role, "respondent");
    assert.equal(u.category, "patient");
    assert.equal(u.gender, "Female", "allowed fields still save");
    assert.equal(u.qualityScore, 100, "a jump to 200 is ignored");
});

test("forgot password: generic answer, reset link works once, and old sessions end", async () => {
    const { p, token } = await activeMember({ segment: "hcp", screening: { worksInHealthcare: "yes", clinician: "yes" } });
    const unknown = await call("POST", "/account/forgot-password", { email: "nobody@example.com", captcha: await captcha() });
    const known = await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() });
    assert.deepEqual(unknown.body, known.body);
    const mail = (await outbox(p.email)).find((m) => m.template === "forgot-password");
    assert.equal(mail.segment, "hcp");
    await new Promise((r) => setTimeout(r, 1100));
    const NEW = "Another-Ward-77";
    const r = await call("POST", "/account/reset-password", { ...linkFrom(mail), password: NEW, confirmPassword: NEW });
    assert.equal(r.status, 200);
    assert.equal((await call("GET", "/me/journey", null, token)).status, 401, "the token from before the reset no longer works");
    const l = await call("POST", "/account/login", { email: p.email, password: NEW, captcha: await captcha() });
    assert.equal(l.status, 200);
    const again = await call("POST", "/account/reset-password", { ...linkFrom(mail), password: NEW, confirmPassword: NEW });
    assert.equal(again.body.code, "LINK_USED");
});

test("dashboard: each profile section is counted once, even where the bank holds older copies of it", async () => {
    const { token } = await activeMember({ segment: "hcp", screening: { worksInHealthcare: "yes", clinician: "yes" } });
    assert.equal((await sign(token, "hcp")).status, 200);
    const d = (await call("GET", "/me/dashboard", null, token)).body.data;
    const names = d.profile.sections.map((s) => s.name.toLowerCase());
    assert.ok(names.length > 0);
    assert.equal(new Set(names).size, names.length, `duplicate sections: ${names.join(", ")}`);
});

// The classic sign-up form (restored 2026-11-26) asks for the country only, gender, and the news opt-in.
const classic = (over = {}) => {
    const { state, city, postalCode, ...rest } = person({ addressLater: true, lastName: "Rao", gender: "Female", marketingOptIn: true, ...over });
    return rest;
};

test("classic sign-up: country only (state, city, postal code later), gender and news opt-in are stored", async () => {
    const p = classic();
    const r = await call("POST", "/account/register", { ...p, captcha: await captcha() });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const u = await db.collection("User").findOne({ mail: p.email });
    assert.equal(u.gender, "Female");
    assert.equal(u.marketingOptIn, true);
    assert.equal(u.address[0].country, "in");
    assert.equal(u.accountStatus, "pending");
    // double opt-in: the confirmation mail is sent, and login waits for it
    const [mail] = await outbox(p.email);
    assert.equal(mail.template, "respondent");
    const blocked = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(blocked.body.code, "EMAIL_UNVERIFIED");
    const s = await call("POST", "/account/set-password", { ...linkFrom(mail), password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(s.status, 200, JSON.stringify(s.body));
    const l = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(l.status, 200, JSON.stringify(l.body));
});

test("classic sign-up: a state or postal code that is sent is still checked; without addressLater they stay required", async () => {
    const bad = await call("POST", "/account/register", { ...classic(), state: "ZZ", postalCode: "12", captcha: await captcha() });
    assert.equal(bad.status, 422);
    assert.ok(bad.body.errors.state && bad.body.errors.postalCode, JSON.stringify(bad.body.errors));
    const { addressLater, ...strict } = classic();
    const r = await call("POST", "/account/register", { ...strict, captcha: await captcha() });
    assert.equal(r.status, 422);
    assert.ok(r.body.errors.state, JSON.stringify(r.body.errors));
});

test("captcha: the maths question is checked on the server once, like the picture code", async () => {
    const c = (await call("GET", "/account/captcha?mode=math")).body.data;
    assert.match(c.question, /^\d+ \+ \d+$/);
    assert.equal(c.svg, undefined);
    const [a, b] = c.question.split(" + ").map(Number);
    assert.equal(String(a + b), c.testAnswer);
    const wrong = await call("POST", "/account/register", { ...classic(), captcha: { id: c.id, answer: String(a + b + 1) } });
    assert.equal(wrong.body.code, "CAPTCHA_FAILED");
    const c2 = (await call("GET", "/account/captcha?mode=math")).body.data;
    const p = classic();
    const ok = await call("POST", "/account/register", { ...p, captcha: { id: c2.id, answer: c2.testAnswer } });
    assert.equal(ok.status, 200, JSON.stringify(ok.body));
    const reuse = await call("POST", "/account/register", { ...classic(), captcha: { id: c2.id, answer: c2.testAnswer } });
    assert.equal(reuse.body.code, "CAPTCHA_FAILED");
});

test("classic sign-up: HCP screening answers go with it; 'No' is screened out", async () => {
    const out = await call("POST", "/account/register", { ...classic({ segment: "hcp", screening: { worksInHealthcare: "no" } }), captcha: await captcha() });
    assert.equal(out.body.code, "NOT_ELIGIBLE");
    const p = classic({ segment: "hcp", screening: { worksInHealthcare: "yes", clinician: "no" } });
    const r = await call("POST", "/account/register", { ...p, captcha: await captcha() });
    assert.equal(r.status, 200, JSON.stringify(r.body));
});

// last: it uses up the CAPTCHA allowance for this minute, which every sign-up and login above needs
test("rate limiting: the CAPTCHA endpoint answers 429 past its limit", async () => {
    let last;
    for (let i = 0; i < 305; i++) last = await call("GET", "/account/captcha");
    assert.equal(last.status, 429);
    assert.equal(last.body.code, "RATE_LIMITED");
});
