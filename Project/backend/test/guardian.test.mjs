// Teen members and their parents or guardians (Kunal, 2026-11-25), run against a real API process and a real MongoDB:
// the teen signs up and names a parent's email, the parent approves from their own login, both can answer, each
// answer records who gave it, only that person can change it, the server refuses everything else, and every change
// is logged.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 API_DIR=/path/to/src node --test test/guardian.test.mjs
//
// API_DIR is laid out like the container (/src/app + /src/utils), as for journey.test.mjs.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4000 + Math.floor(Math.random() * 900) + 50;
const HOST = `127.0.0.1:${PORT}`;
const BASE = `http://${HOST}/api/v1`;
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_guardian_${Date.now()}`;
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
let server;
let db;

/* ---------- helpers (as in journey.test.mjs) ---------- */
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
    return { id: r.body.data.id, answer: r.body.data.testAnswer };
};
const outbox = async (to) => (await call("GET", `/account/__test/outbox?to=${encodeURIComponent(to)}`)).body.data;
let n = 0;
const email = (tag) => `${tag}.${Date.now()}.${n++}@example.com`;
const yearsAgo = (y, days = 10) => { const d = new Date(); d.setUTCFullYear(d.getUTCFullYear() - y); d.setUTCDate(d.getUTCDate() - days); return d.toISOString().slice(0, 10); };
const person = (over = {}) => ({
    firstName: "Asha", dob: "1990-04-12", email: email("asha"), phone: "+91 98765 43210", phoneCountry: "IN",
    country: "IN", state: "DL", city: "New Delhi", postalCode: "110001", segment: "patient", ...over,
});
const register = async (over) => { const p = person(over); return { p, r: await call("POST", "/account/register", { ...p, captcha: await captcha() }) }; };
const PASSWORD = "Sunrise-Clinic-42";
async function activate(p) {
    const mail = (await outbox(p.email)).find((m) => m.template === "respondent");
    const s = await call("POST", "/account/set-password", { user: mail.data.user._id, code: mail.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(s.status, 200, JSON.stringify(s.body));
    const l = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(l.status, 200, JSON.stringify(l.body));
    return { token: l.body.token, journey: l.body.data.journey, id: mail.data.user._id };
}
async function member(over) {
    const { p, r } = await register(over);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    return { p, ...(await activate(p)) };
}
const approvalMail = async (to) => (await outbox(to)).filter((m) => m.template === "parent-approval").at(-1);
const inviteOf = (mail) => ({ link: mail.data.link._id, code: mail.data.otp.code });

/** A teen (15) with an approved parent, both signed in. */
async function linkedPair() {
    const parentEmail = email("parent");
    const parent = await member({ firstName: "Meera", email: parentEmail });
    const teen = await member({ firstName: "Rohan", dob: yearsAgo(15), parentEmail });
    const inv = inviteOf(await approvalMail(parentEmail));
    const ok = await call("POST", "/guardian/invite/approve", { ...inv, accepted: ["parent-consent"] }, parent.token);
    assert.equal(ok.status, 200, JSON.stringify(ok.body));
    return { parent, teen };
}

/* ---------- setup ---------- */
async function seed() {
    const src = path.resolve(here, "../../sections/question-bank");
    const meta = { origin: HOST, isActive: true, isDeleted: false };
    const load = (f) => JSON.parse(fs.readFileSync(path.join(src, f), "utf-8")).map(({ _id, ...d }) => ({ ...d, ...meta }));
    const uniq = (rows, key) => [...new Map(rows.map((r) => [key(r), r])).values()];
    await db.collection("Profile").insertMany(uniq(load("Profile.json").map((p) => ({ ...p, slug: p.slug || p.name })), (p) => `${p.category}|${p.slug}`));
    await db.collection("Question").insertMany(uniq(load("Question.json"), (q) => q.name));
    await db.collection("Option").insertMany(load("Option.json"));
    // the category rules the sign-up and the parent's approval read. The terms text here is test data only:
    // in production it is whatever the "minor patient" category holds.
    await db.collection("Category").insertMany([
        { name: "patient", age: { min: 18, max: 110, underfall: "minor patient", overfall: null }, terms: [], ...meta },
        { name: "minor patient", age: { min: 13, max: 17, underfall: null, overfall: "patient" }, termsMessage: "TEST terms message", terms: [{ name: "parent-consent", body: "TEST statement the parent accepts", isRequired: true }, { name: "updates", body: "TEST optional statement", isRequired: false }], ...meta },
    ]);
}

before(async () => {
    db = (await mongoose.createConnection(DB).asPromise()).db;
    await seed();
    server = spawn(process.execPath, ["app/server.js"], {
        cwd: API_DIR,
        env: { ...process.env, NODE_ENV: "test", MAIL_MX_CHECK: "false", JWT_SECRET: "guardian-test-secret", mongodb: DB, port: String(PORT), MHO_RATE_LIMIT_SCALE: "20" },
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

/* ---------- sign-up ---------- */
test("sign-up: the allowed ages come from the category rules in the database", async () => {
    const r = await call("GET", "/account/eligibility");
    assert.equal(r.status, 200);
    assert.deepEqual(r.body.data, { adultAge: 18, teen: { minAge: 13, segment: "patient" } });
});

test("sign-up: a teen can join the patient panel only, from the minor age, and must name a parent's own email", async () => {
    const cg = await register({ dob: yearsAgo(15), segment: "caregiver", parentEmail: email("p") });
    assert.equal(cg.r.status, 403);
    assert.match(cg.r.body.message, /patient panel only/);
    const young = await register({ dob: yearsAgo(12), parentEmail: email("p") });
    assert.equal(young.r.status, 403);
    assert.equal(young.r.body.code, "NOT_ELIGIBLE");
    const none = await register({ dob: yearsAgo(15) });
    assert.equal(none.r.status, 422);
    assert.ok(none.r.body.errors.parentEmail);
    const own = email("self");
    const same = await register({ dob: yearsAgo(15), email: own, parentEmail: own });
    assert.equal(same.r.status, 422);
    assert.match(same.r.body.errors.parentEmail, /not yours/);
});

test("sign-up: the parent is emailed only after the teen verifies their own address", async () => {
    const parentEmail = email("parent");
    const { p, r } = await register({ firstName: "Rohan", dob: yearsAgo(15), parentEmail });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const u = await db.collection("User").findOne({ mail: p.email });
    assert.equal(u.category, "minor patient");
    assert.equal(await approvalMail(parentEmail), undefined, "no mail to the parent before the teen is verified");
    const teen = await activate(p);
    const mail = await approvalMail(parentEmail);
    assert.ok(mail, "the parent gets the approval mail");
    assert.equal(mail.data.teen.first, "Rohan");
    assert.equal(JSON.stringify(mail.data).includes(p.email), false, "the teen's own email is not in the parent's mail");
    assert.match(mail.data.approve_url, /\/auth\/guardian-approve\?link=[a-f0-9]{24}&code=/);
    assert.equal(teen.journey.next, "guardian", "a teen waits for approval before anything else");
    const blocked = await call("PATCH", "/me/profile", { "diet-plan": "Vegetarian" }, teen.token);
    assert.equal(blocked.status, 403);
    assert.match(blocked.body.message, /approve your account/);
    const g = await call("GET", "/guardian", null, teen.token);
    assert.equal(g.body.data.teen.status, "pending");
    assert.match(g.body.data.teen.parentEmail, /^p\*+@example\.com$/);
});

/* ---------- approval ---------- */
test("approval: only the invited email, from an adult's own login, after accepting the required terms; one use only", async () => {
    const parentEmail = email("parent");
    const parent = await member({ firstName: "Meera", email: parentEmail });
    const stranger = await member({ firstName: "Vikram" });
    await member({ firstName: "Rohan", dob: yearsAgo(15), parentEmail });
    const inv = inviteOf(await approvalMail(parentEmail));
    const wrong = await call("POST", "/guardian/invite", inv, stranger.token);
    assert.equal(wrong.status, 403);
    assert.equal(wrong.body.code, "WRONG_ACCOUNT");
    const bad = await call("POST", "/guardian/invite", { ...inv, code: "nope" }, parent.token);
    assert.equal(bad.status, 410);
    const look = await call("POST", "/guardian/invite", inv, parent.token);
    assert.equal(look.status, 200, JSON.stringify(look.body));
    assert.equal(look.body.data.teenFirstName, "Rohan");
    assert.deepEqual(look.body.data.terms.map((t) => t.name), ["parent-consent", "updates"]);
    const unaccepted = await call("POST", "/guardian/invite/approve", { ...inv, accepted: ["updates"] }, parent.token);
    assert.equal(unaccepted.status, 422);
    assert.equal(unaccepted.body.code, "TERMS_REQUIRED");
    const ok = await call("POST", "/guardian/invite/approve", { ...inv, accepted: ["parent-consent"] }, parent.token);
    assert.equal(ok.status, 200, JSON.stringify(ok.body));
    const again = await call("POST", "/guardian/invite/approve", { ...inv, accepted: ["parent-consent"] }, parent.token);
    assert.equal(again.status, 410);
    const link = await db.collection("GuardianLink").findOne({ _id: new mongoose.Types.ObjectId(inv.link) });
    assert.equal(link.status, "approved");
    assert.equal(String(link.parent), parent.id);
    assert.deepEqual(link.accepted.map((t) => t.name), ["parent-consent"], "what the parent agreed to is kept with the link");
    assert.equal(link.tokenHash, null);
    const g = await call("GET", "/guardian", null, parent.token);
    assert.deepEqual(g.body.data.children.map((c) => c.firstName), ["Rohan"]);
});

test("approval: a teen cannot approve themself, and a declined link can be sent again to a corrected address", async () => {
    const parentEmail = email("typo");
    const teenP = person({ firstName: "Rohan", dob: yearsAgo(15), parentEmail });
    await call("POST", "/account/register", { ...teenP, captcha: await captcha() });
    const teen = await activate(teenP);
    const inv = inviteOf(await approvalMail(parentEmail));
    const self = await call("POST", "/guardian/invite/approve", { ...inv, accepted: ["parent-consent"] }, teen.token);
    assert.equal(self.status, 403, "the teen's own login is not the invited email");
    const real = email("realparent");
    const resent = await call("POST", "/guardian/resend", { parentEmail: real }, teen.token);
    assert.equal(resent.status, 200, JSON.stringify(resent.body));
    const old = await call("POST", "/guardian/invite", inv, teen.token);
    assert.equal(old.status, 410, "the earlier link stops working");
    assert.ok(await approvalMail(real));
    const parent = await member({ firstName: "Meera", email: real });
    const dec = await call("POST", "/guardian/invite/decline", inviteOf(await approvalMail(real)), parent.token);
    assert.equal(dec.status, 200);
    const g = await call("GET", "/guardian", null, teen.token);
    assert.equal(g.body.data.teen.status, "declined");
    assert.equal(g.body.data.teen.canResend, true);
});

/* ---------- shared answers ---------- */
test("answers: each person answers from their own login, and only the person who gave an answer can change it", async () => {
    const { parent, teen } = await linkedPair();
    const j = await call("GET", "/me/journey", null, teen.token);
    assert.notEqual(j.body.data.next, "guardian", "once approved the teen moves on");

    const mine = await call("PATCH", "/me/profile", { "diet-plan": "Vegetarian" }, teen.token);
    assert.equal(mine.status, 200, JSON.stringify(mine.body));
    const theirs = await call("PATCH", `/guardian/answers/${teen.id}`, { "hot-drinks": "Tea" }, parent.token);
    assert.equal(theirs.status, 200, JSON.stringify(theirs.body));
    assert.deepEqual(theirs.body.data.saved, ["hot-drinks"]);

    const p1 = await call("PATCH", `/guardian/answers/${teen.id}`, { "diet-plan": "Vegan" }, parent.token);
    assert.equal(p1.status, 403);
    assert.equal(p1.body.data.refused[0].reason, "answered-by-teen");
    const t1 = await call("PATCH", "/me/profile", { "hot-drinks": "Coffee" }, teen.token);
    assert.equal(t1.status, 403, "the teen cannot change the parent's answer through the profile API either");
    assert.match(t1.body.message, /Your parent gave this answer/);
    const t2 = await call("PATCH", "/guardian/answers/me", { "hot-drinks": null }, teen.token);
    assert.equal(t2.status, 403, "or clear it");

    const stored = await db.collection("Answer").find({ user: teen.id, question: { $in: ["diet-plan", "hot-drinks"] } }).toArray();
    const by = Object.fromEntries(stored.map((a) => [a.question, [a.answer, a.answeredBy, a.answeredByRole]]));
    assert.deepEqual(by["diet-plan"], [["Vegetarian"], teen.id, "self"]);
    assert.deepEqual(by["hot-drinks"], [["Tea"], parent.id, "parent"]);

    // each person can still change their own
    assert.equal((await call("PATCH", `/guardian/answers/${teen.id}`, { "hot-drinks": "Coffee" }, parent.token)).status, 200);
    assert.equal((await call("PATCH", "/guardian/answers/me", { "diet-plan": "Vegan" }, teen.token)).status, 200);
});

test("answers: both see every answer with who gave it, and can edit only their own", async () => {
    const { parent, teen } = await linkedPair();
    await call("PATCH", "/me/profile", { "diet-plan": "Vegetarian" }, teen.token);
    await call("PATCH", `/guardian/answers/${teen.id}`, { "hot-drinks": "Tea" }, parent.token);
    const find = (d, name) => d.profiles.flatMap((p) => p.questions).find((q) => q.name === name);
    const asParent = (await call("GET", `/guardian/questionnaire/${teen.id}`, null, parent.token)).body.data;
    assert.equal(asParent.role, "parent");
    assert.equal(asParent.teen.firstName, "Rohan");
    assert.deepEqual([find(asParent, "diet-plan").answer.by, find(asParent, "diet-plan").editable], ["self", false]);
    assert.deepEqual([find(asParent, "hot-drinks").answer.by, find(asParent, "hot-drinks").editable], ["parent", true]);
    const asTeen = (await call("GET", "/guardian/questionnaire/me", null, teen.token)).body.data;
    assert.equal(asTeen.role, "self");
    assert.deepEqual([find(asTeen, "diet-plan").editable, find(asTeen, "hot-drinks").editable], [true, false]);
    assert.ok(find(asTeen, "diet-plan").options.length > 1, "choice questions carry their options");
    assert.equal(find(asTeen, "alcohol"), undefined, "questions the bank does not ask of teens are left out");
});

test("answers: questions the bank does not tag for teens are refused, for the teen and the parent alike", async () => {
    const { parent, teen } = await linkedPair();
    const t = await call("PATCH", "/me/profile", { alcohol: "Never" }, teen.token);
    assert.equal(t.status, 403);
    assert.equal(t.body.data.refused[0].reason, "not-asked-of-teens");
    const p = await call("PATCH", `/guardian/answers/${teen.id}`, { alcohol: "Never" }, parent.token);
    assert.equal(p.status, 403);
    assert.equal(await db.collection("Answer").countDocuments({ user: teen.id, question: "alcohol" }), 0);
});

test("answers: nobody else can read or answer for a teen", async () => {
    const { teen } = await linkedPair();
    const other = await member({ firstName: "Vikram" });
    assert.equal((await call("GET", `/guardian/questionnaire/${teen.id}`, null, other.token)).status, 403);
    assert.equal((await call("PATCH", `/guardian/answers/${teen.id}`, { "hot-drinks": "Tea" }, other.token)).status, 403);
    assert.equal((await call("GET", `/guardian/history/${teen.id}`, null, other.token)).status, 403);
    assert.equal((await call("GET", "/guardian/questionnaire/me", null, other.token)).status, 403, "an adult has no shared questionnaire");
});

test("log: every change and every refused change is recorded with who made it, and the log cannot be edited", async () => {
    const { parent, teen } = await linkedPair();
    await call("PATCH", "/me/profile", { "diet-plan": "Vegetarian" }, teen.token);
    await call("PATCH", "/me/profile", { "diet-plan": "Vegan" }, teen.token);
    await call("PATCH", `/guardian/answers/${teen.id}`, { "diet-plan": "Jain" }, parent.token);
    const h = (await call("GET", `/guardian/history/${teen.id}`, null, parent.token)).body.data.filter((r) => r.question === "diet-plan");
    assert.deepEqual(h.map((r) => [r.action, r.by, r.you]), [["refused", "parent", true], ["set", "self", false], ["set", "self", false]]);
    assert.deepEqual([h[1].before, h[1].after], [["Vegetarian"], ["Vegan"]]);
    assert.match(h[0].reasonText, /Your teen gave this answer/);
    assert.ok(h[0].label.length > 3, "the log names the question");
    // stored option codes are shown with the bank's label
    await call("PATCH", "/me/profile", { country: "DZ" }, teen.token);
    const c = (await call("GET", "/guardian/history/me", null, teen.token)).body.data.find((r) => r.question === "country");
    assert.deepEqual([c.after, c.afterText], [["DZ"], ["Algeria"]]);
    const teenView = (await call("GET", "/guardian/history/me", null, teen.token)).body.data;
    assert.ok(teenView.some((r) => r.action === "refused" && r.by === "parent"), "the teen sees the parent's refused attempt too");
    // append-only through the model, like the consent records
    const url = new URL(`../app/model/AnswerAudit.js`, `file://${API_DIR}/test/`).href;
    const { default: AnswerAudit } = await import(url);
    await assert.rejects(() => AnswerAudit.updateMany({}, { $set: { action: "set" } }), /append-only/);
});

test("adults: their own answers save as before and are recorded as theirs", async () => {
    const adult = await member({ firstName: "Asha" });
    const r = await call("PATCH", "/me/profile", { "health-status": "good", alcohol: "Never" }, adult.token);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.deepEqual(r.body.data.refused, []);
    const a = await db.collection("Answer").findOne({ user: adult.id, question: "alcohol" });
    assert.deepEqual([a.answer, a.answeredBy, a.answeredByRole], [["Never"], adult.id, "self"]);
    const again = await call("PATCH", "/me/profile", { alcohol: "Occasionally" }, adult.token);
    assert.equal(again.status, 200);
    assert.equal(await db.collection("AnswerAudit").countDocuments({ subject: adult.id, question: "alcohol" }), 2);
});
