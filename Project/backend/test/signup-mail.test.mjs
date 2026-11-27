// Sign-up, confirmation mail, resend, forgot password, log-in, the human check, social sign-in and the profile address
// prefill, end to end against a real API process and a real MongoDB. Mail is read from the API's test outbox
// (NODE_ENV=test), so no mail server is needed.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 node --test --test-force-exit test/signup-mail.test.mjs
//
// Kunal's rule for mail answers (PRs #50, #51): exactly { status, message, data: [] }, success or failure, with no
// extra fields such as mailSent or code. A mail that could not go out is HTTP 502 with that same shape.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5000 + Math.floor(Math.random() * 900);
const HOST = `127.0.0.1:${PORT}`;
const BASE = `http://${HOST}/api/v1`;
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_signup_mail_${Date.now()}`;
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
const JWT_SECRET = "signup-mail-test-secret";
const SOCIAL_KEY = "signup-mail-social-key-0123456789abcdef";
const PASSWORD = "Sunrise-Clinic-42";
const NEW_PASSWORD = "Monsoon-Garden-77";
const GENERIC = "If an account needs it, we’ve sent an email with a link. Please check your inbox and spam folder.";
let server;
let db;

/* ---------- helpers ---------- */
let net = 0;
async function call(method, url, body, { token, ip, redirect = "follow" } = {}) {
    net += 1;
    const res = await fetch(`${BASE}${url}`, {
        method,
        redirect,
        headers: {
            "content-type": "application/json",
            // every call comes from its own network, so the per-network limits of one test never reach another
            "x-forwarded-for": ip || `198.51.${net >> 8}.${net & 255}`,
            ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    let json = null;
    try { json = JSON.parse(text); } catch { /* not JSON */ }
    return { status: res.status, body: json, text, headers: res.headers };
}
const captcha = async (mode) => {
    const r = await call("GET", `/account/captcha${mode ? `?mode=${mode}` : ""}`);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    return { id: r.body.data.id, answer: r.body.data.testAnswer };
};
const outbox = async (to) => (await call("GET", `/account/__test/outbox?to=${encodeURIComponent(to)}`)).body.data;
const lastMail = async (to, template) => (await outbox(to)).filter((m) => !template || m.template === template).at(-1);
const mailFailure = (on) => call("POST", "/account/__test/mail-failure", { on });
async function withMailDown(fn) {
    await mailFailure(true);
    try { return await fn(); } finally { await mailFailure(false); }
}
let n = 0;
const email = (tag) => `${tag}.${Date.now()}.${n++}@example.com`;
const person = (over = {}) => ({
    firstName: "Asha", dob: "1990-04-12", email: email("asha"), phone: "+91 98765 43210", phoneCountry: "IN",
    country: "IN", state: "DL", city: "New Delhi", postalCode: "110001", segment: "patient", ...over,
});
const hcp = (over = {}) => person({ segment: "hcp", screening: { worksInHealthcare: "yes", clinician: "yes" }, ...over });
const register = async (p) => call("POST", "/account/register", { ...p, captcha: await captcha() });
async function activate(p) {
    const r = await register(p);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const mail = await lastMail(p.email, "respondent");
    const s = await call("POST", "/account/set-password", { user: mail.data.user._id, code: mail.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(s.status, 200, JSON.stringify(s.body));
    return mail.data.user._id;
}
const login = async (mail, password = PASSWORD, extra = {}) => call("POST", "/account/login", { email: mail, password, captcha: await captcha(), ...extra });

/** Kunal's mail answer: exactly status, message, data: [] */
function mailAnswer(r, status, httpStatus, label = "") {
    assert.equal(r.status, httpStatus, `${label} ${JSON.stringify(r.body)}`);
    assert.deepEqual(Object.keys(r.body).sort(), ["data", "message", "status"], `${label} only status, message, data`);
    assert.equal(r.body.status, status, label);
    assert.deepEqual(r.body.data, [], `${label} data is an empty array`);
    assert.equal(typeof r.body.message, "string", label);
    assert.ok(r.body.message.length > 0, `${label} has a message`);
    assert.ok(!/mailSent/i.test(r.text), `${label} no mailSent anywhere`);
}

/* ---------- start the API ---------- */
before(async () => {
    db = (await mongoose.createConnection(DB).asPromise()).db;
    const meta = { origin: HOST, isActive: true, isDeleted: false };
    await db.collection("Question").insertMany([
        { name: "country", label: "Country", type: "select", ...meta },
        { name: "state", label: "State", type: "select", ...meta },
        { name: "city", label: "City", type: "text", ...meta },
        { name: "zipcode", label: "ZIP / Postal code", type: "text", ...meta },
    ]);
    await db.collection("Category").insertMany([
        { name: "patient", age: { min: 18, max: 110 }, terms: [], ...meta },
        { name: "care giver", age: { min: 18, max: 110 }, terms: [], ...meta },
        { name: "healthcare professional", age: { min: 18, max: 110 }, terms: [], ...meta },
    ]);
    server = spawn(process.execPath, ["app/server.js"], {
        cwd: API_DIR,
        env: {
            ...process.env, NODE_ENV: "test", MAIL_MX_CHECK: "false", JWT_SECRET, mongodb: DB, port: String(PORT),
            MHO_RATE_LIMIT_SCALE: "50", SOCIAL_JWT_SECRET: SOCIAL_KEY,
        },
        stdio: ["ignore", "pipe", "pipe"],
    });
    let log = "";
    server.stdout.on("data", (d) => (log += d));
    server.stderr.on("data", (d) => (log += d));
    for (let i = 0; i < 100; i++) {
        try { if ((await fetch(`${BASE}/account/location/countries`)).ok) return; } catch { /* not up yet */ }
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

/* ================= Sign-up and the confirmation mail ================= */

for (const [segment, make, category] of [
    ["patient", person, "patient"],
    ["caregiver", (o) => person({ segment: "caregiver", ...o }), "care giver"],
    ["hcp", hcp, "healthcare professional"],
]) {
    test(`sign-up (${segment}): answer is { status, message, data: [] } and one confirmation mail goes out`, async () => {
        const p = make();
        const r = await register(p);
        mailAnswer(r, "success", 200, "register");
        assert.equal(r.body.message, GENERIC);
        const mails = await outbox(p.email);
        assert.equal(mails.length, 1, "exactly one mail");
        const [m] = mails;
        assert.equal(m.template, "respondent");
        assert.equal(m.segment, segment, "the segment's own mailer");
        assert.match(m.subject, /^Verify your email/);
        assert.equal(m.to, p.email);
        assert.ok(m.data.otp.code.length >= 20, "a long link code, not a short OTP");
        const user = await db.collection("User").findOne({ mail: p.email });
        assert.equal(user.category, category);
        assert.equal(user.accountStatus, "pending");
        assert.notEqual(user.isVerified?.email, "verified");
        assert.equal(String(user._id), m.data.user._id);
    });
}

test("sign-up: the mail carries only the fields the template needs, never DOB, phone or address", async () => {
    const p = person();
    await register(p);
    const m = await lastMail(p.email, "respondent");
    assert.deepEqual(Object.keys(m.data.user).sort(), ["_id", "mail", "memberId", "name", "origin"]);
    assert.deepEqual(Object.keys(m.data.user.name), ["first"]);
    assert.ok(!JSON.stringify(m.data).includes("98765"), "no phone");
    assert.ok(!JSON.stringify(m.data).includes("110001"), "no postal code");
    assert.ok(!JSON.stringify(m.data).includes("1990-04-12"), "no DOB");
    assert.equal(m.data.preferences_url, `https://${HOST}/member/settings`);
});

test("sign-up: the email is stored in small letters and the confirmation goes to that address", async () => {
    const base = email("Mixed.Case");
    const p = person({ email: base.replace("mixed.case", "Mixed.CASE").replace("@example.com", "@Example.COM") });
    mailAnswer(await register(p), "success", 200);
    const lower = p.email.toLowerCase();
    assert.ok(await db.collection("User").findOne({ mail: lower }));
    assert.equal((await outbox(lower)).length, 1);
});

test("sign-up: the token in the database is not the code in the mail", async () => {
    const p = person();
    await register(p);
    const m = await lastMail(p.email, "respondent");
    const raw = JSON.stringify(await db.collection("AuthToken").find({ user: new mongoose.Types.ObjectId(m.data.user._id) }).toArray());
    assert.ok(!raw.includes(m.data.otp.code), "only a hash of the link code is kept");
});

test("sign-up: the hidden bot field gets the normal answer, but no account and no mail", async () => {
    const p = person({ website: "http://spam.example" });
    mailAnswer(await register(p), "success", 200);
    assert.equal(await db.collection("User").findOne({ mail: p.email }), null);
    assert.equal((await outbox(p.email)).length, 0);
});

test("sign-up: missing or wrong human check creates no account and sends no mail", async () => {
    for (const [label, cap] of [["missing", undefined], ["wrong", async () => ({ ...(await captcha()), answer: "zzzzzz" })], ["made-up id", async () => ({ id: new mongoose.Types.ObjectId().toString(), answer: "abc" })]]) {
        const p = person();
        const r = await call("POST", "/account/register", { ...p, captcha: cap ? await cap() : undefined });
        assert.equal(r.status, 400, `${label}: ${JSON.stringify(r.body)}`);
        assert.equal(r.body.code, "CAPTCHA_FAILED", label);
        assert.ok(r.body.errors.captcha, label);
        assert.equal(await db.collection("User").findOne({ mail: p.email }), null, label);
        assert.equal((await outbox(p.email)).length, 0, label);
    }
});

test("sign-up: the maths human check works too", async () => {
    const p = person();
    const r = await call("POST", "/account/register", { ...p, captcha: await captcha("math") });
    mailAnswer(r, "success", 200);
});

test("sign-up: form errors are checked before the human check, and nothing is sent", async () => {
    const p = person({ email: "not-an-email", firstName: "" });
    const r = await register(p);
    assert.equal(r.status, 422);
    assert.equal(r.body.code, "INVALID");
    assert.ok(r.body.errors.email && r.body.errors.firstName, JSON.stringify(r.body.errors));
});

test("sign-up: mail down → 502 { status: error, message, data: [] }, account kept, Resend sends it later", async () => {
    const p = person();
    const r = await withMailDown(() => register(p));
    mailAnswer(r, "error", 502, "register, mail down");
    assert.match(r.body.message, /Resend confirmation email/);
    assert.ok(await db.collection("User").findOne({ mail: p.email }), "account kept");
    assert.equal((await outbox(p.email)).length, 0);
    mailAnswer(await call("POST", "/account/resend-verification", { email: p.email, captcha: await captcha() }), "success", 200, "resend");
    assert.equal((await outbox(p.email)).length, 1, "the link goes out once the mail works again");
});

test("sign-up again, not confirmed yet: no second account, a new link, the old one stops working", async () => {
    const p = person();
    await register(p);
    const first = await lastMail(p.email, "respondent");
    const again = await register(p);
    mailAnswer(again, "success", 200, "second sign-up");
    assert.match(again.body.message, /already registered but not confirmed/);
    assert.equal(await db.collection("User").countDocuments({ mail: p.email }), 1);
    const second = await lastMail(p.email, "respondent");
    assert.notEqual(second.data.otp.code, first.data.otp.code);
    const old = await call("POST", "/account/link", { kind: "verify", user: first.data.user._id, code: first.data.otp.code });
    assert.equal(old.status, 410, "the earlier link is void");
    const now = await call("POST", "/account/link", { kind: "verify", user: second.data.user._id, code: second.data.otp.code });
    assert.equal(now.status, 200);
});

test("sign-up again, not confirmed yet, mail down → 502 with the same three fields", async () => {
    const p = person();
    await register(p);
    const r = await withMailDown(() => register(p));
    mailAnswer(r, "error", 502, "second sign-up, mail down");
    assert.match(r.body.message, /not confirmed yet/);
});

test("sign-up again, account active: 409 'please log in', no mail", async () => {
    const p = person();
    await activate(p);
    const before = (await outbox(p.email)).length;
    const r = await register(p);
    assert.equal(r.status, 409);
    assert.equal(r.body.code, "EMAIL_TAKEN");
    assert.match(r.body.message, /already registered\. Please log in/);
    assert.equal((await outbox(p.email)).length, before, "no mail");
});

/* ================= The link in the mail: check, set password, welcome ================= */

test("confirmation link: checking it shows who it is for and does not spend it", async () => {
    const p = person({ segment: "caregiver" });
    await register(p);
    const m = await lastMail(p.email, "respondent");
    for (let i = 0; i < 2; i++) {
        const r = await call("POST", "/account/link", { kind: "verify", user: m.data.user._id, code: m.data.otp.code });
        assert.equal(r.status, 200, JSON.stringify(r.body));
        assert.deepEqual(r.body.data, [{ firstName: "Asha", email: p.email, segment: "caregiver" }]);
    }
});

test("confirmation link: a reset link is not a confirmation link, and an unknown kind is refused", async () => {
    const p = person();
    await register(p);
    const m = await lastMail(p.email, "respondent");
    const asReset = await call("POST", "/account/link", { kind: "reset", user: m.data.user._id, code: m.data.otp.code });
    assert.equal(asReset.status, 410);
    assert.equal(asReset.body.code, "LINK_INVALID");
    const odd = await call("POST", "/account/link", { kind: "admin", user: m.data.user._id, code: m.data.otp.code });
    assert.equal(odd.status, 400);
});

test("set password: activates the account, sends one welcome mail, and the link then works no more", async () => {
    const p = person();
    await register(p);
    const m = await lastMail(p.email, "respondent");
    const body = { user: m.data.user._id, code: m.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD };
    const s = await call("POST", "/account/set-password", body);
    assert.equal(s.status, 200, JSON.stringify(s.body));
    assert.equal(s.body.status, "success");
    assert.deepEqual(s.body.data, [{ email: p.email }]);
    const user = await db.collection("User").findOne({ mail: p.email });
    assert.equal(user.isVerified.email, "verified");
    assert.equal(user.accountStatus, "active");
    assert.ok(user.password.startsWith("$2"), "a bcrypt hash, never the password");
    const welcome = (await outbox(p.email)).filter((x) => x.template === "welcome");
    assert.equal(welcome.length, 1);
    assert.equal(welcome[0].subject, "Your MyHealthOpinions account is active");
    const again = await call("POST", "/account/set-password", body);
    assert.equal(again.status, 410);
    assert.equal(again.body.code, "LINK_USED");
    assert.equal((await outbox(p.email)).filter((x) => x.template === "welcome").length, 1, "no second welcome");
});

test("set password: the account is still activated when the welcome mail cannot go out", async () => {
    const p = person();
    await register(p);
    const m = await lastMail(p.email, "respondent");
    const s = await withMailDown(() => call("POST", "/account/set-password", { user: m.data.user._id, code: m.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD }));
    assert.equal(s.status, 200, JSON.stringify(s.body));
    assert.equal((await login(p.email)).status, 200);
});

test("set password: a short, too simple, or email-based password is refused, and the link stays usable", async () => {
    const p = person();
    await register(p);
    const m = await lastMail(p.email, "respondent");
    const local = p.email.split("@")[0];
    for (const bad of ["Ab1!xyz", "alllowercaseletters", `${local}A1!`]) {
        const r = await call("POST", "/account/set-password", { user: m.data.user._id, code: m.data.otp.code, password: bad, confirmPassword: bad });
        assert.equal(r.status, 422, `${bad}: ${JSON.stringify(r.body)}`);
        assert.equal(r.body.code, "WEAK_PASSWORD");
    }
    const ok = await call("POST", "/account/set-password", { user: m.data.user._id, code: m.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(ok.status, 200);
});

/* ================= Resend confirmation ================= */

test("resend: same answer for a pending, an active and an unknown email; only the pending one gets mail", async () => {
    const pending = person();
    await register(pending);
    const active = person();
    await activate(active);
    const unknown = email("nobody");
    const counts = {};
    for (const [label, addr] of [["pending", pending.email], ["active", active.email], ["unknown", unknown]]) {
        counts[label] = (await outbox(addr)).length;
        const r = await call("POST", "/account/resend-verification", { email: addr, captcha: await captcha() });
        mailAnswer(r, "success", 200, `resend ${label}`);
        assert.equal(r.body.message, GENERIC, label);
    }
    assert.equal((await outbox(pending.email)).length, counts.pending + 1, "pending: one new link");
    assert.equal((await outbox(active.email)).length, counts.active, "active: nothing");
    assert.equal((await outbox(unknown)).length, 0, "unknown: nothing");
});

test("resend: the address may be typed in capitals or with spaces", async () => {
    const p = person();
    await register(p);
    const before = (await outbox(p.email)).length;
    mailAnswer(await call("POST", "/account/resend-verification", { email: `  ${p.email.toUpperCase()} `, captcha: await captcha() }), "success", 200);
    assert.equal((await outbox(p.email)).length, before + 1);
});

test("resend: needs the human check; without it nothing is sent", async () => {
    const p = person();
    await register(p);
    const before = (await outbox(p.email)).length;
    const r = await call("POST", "/account/resend-verification", { email: p.email });
    assert.equal(r.status, 400);
    assert.equal(r.body.code, "CAPTCHA_FAILED");
    assert.equal((await outbox(p.email)).length, before);
});

test("resend: mail down → 502 { status: error, message, data: [] } for a pending account", async () => {
    const p = person();
    await register(p);
    mailAnswer(await withMailDown(async () => call("POST", "/account/resend-verification", { email: p.email, captcha: await captcha() })), "error", 502, "resend, mail down");
});

test("resend: mail down does not tell a stranger whether an address is registered", async () => {
    const r = await withMailDown(async () => call("POST", "/account/resend-verification", { email: email("ghost"), captcha: await captcha() }));
    mailAnswer(r, "success", 200, "unknown address, mail down");
});

test("resend: an email filter in place of an address finds nobody", async () => {
    const p = person();
    await register(p);
    const r = await call("POST", "/account/resend-verification", { email: { $ne: "" }, captcha: await captcha() });
    mailAnswer(r, "success", 200);
});

/* ================= Forgot password and reset ================= */

test("forgot password: an active member gets the reset mail of their segment; the answer is the generic one", async () => {
    const p = hcp();
    await activate(p);
    const r = await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() });
    mailAnswer(r, "success", 200, "forgot");
    assert.equal(r.body.message, GENERIC);
    const m = await lastMail(p.email, "forgot-password");
    assert.ok(m, "a forgot-password mail");
    assert.equal(m.segment, "hcp");
    assert.equal(m.subject, "Reset your MyHealthOpinions password");
});

test("forgot password: a member who never confirmed gets the confirmation link instead", async () => {
    const p = person();
    await register(p);
    const before = (await outbox(p.email)).length;
    mailAnswer(await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() }), "success", 200);
    const mails = await outbox(p.email);
    assert.equal(mails.length, before + 1);
    assert.equal(mails.at(-1).template, "respondent");
});

test("forgot password: an unknown email gets the same answer and no mail", async () => {
    const addr = email("unknown");
    const r = await call("POST", "/account/forgot-password", { email: addr, captcha: await captcha() });
    mailAnswer(r, "success", 200);
    assert.equal(r.body.message, GENERIC);
    assert.equal((await outbox(addr)).length, 0);
});

test("forgot password: needs the human check", async () => {
    const p = person();
    await activate(p);
    for (const cap of [undefined, { id: "x", answer: "y" }]) {
        const r = await call("POST", "/account/forgot-password", { email: p.email, captcha: cap });
        assert.equal(r.status, 400, JSON.stringify(r.body));
        assert.equal(r.body.code, "CAPTCHA_FAILED");
    }
    assert.equal((await outbox(p.email)).filter((m) => m.template === "forgot-password").length, 0);
});

test("forgot password: mail down → 502 { status: error, message, data: [] }, for active and unconfirmed accounts", async () => {
    const active = person();
    await activate(active);
    const pending = person();
    await register(pending);
    for (const [label, addr] of [["active", active.email], ["pending", pending.email]]) {
        const r = await withMailDown(async () => call("POST", "/account/forgot-password", { email: addr, captcha: await captcha() }));
        mailAnswer(r, "error", 502, `forgot ${label}, mail down`);
        assert.match(r.body.message, /couldn’t send the email/);
    }
});

test("reset password: the new password works, the old one does not, and the link works once", async () => {
    const p = person({ segment: "caregiver" });
    await activate(p);
    await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() });
    const m = await lastMail(p.email, "forgot-password");
    const check = await call("POST", "/account/link", { kind: "reset", user: m.data.user._id, code: m.data.otp.code });
    assert.equal(check.status, 200, JSON.stringify(check.body));
    assert.equal(check.body.data[0].segment, "caregiver");
    const asVerify = await call("POST", "/account/set-password", { user: m.data.user._id, code: m.data.otp.code, password: NEW_PASSWORD, confirmPassword: NEW_PASSWORD });
    assert.equal(asVerify.status, 410, "a reset link cannot be used on the confirmation page");
    const body = { user: m.data.user._id, code: m.data.otp.code, password: NEW_PASSWORD, confirmPassword: NEW_PASSWORD };
    const r = await call("POST", "/account/reset-password", body);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.match(r.body.message, /new password is set/);
    assert.equal((await login(p.email, NEW_PASSWORD)).status, 200);
    assert.equal((await login(p.email, PASSWORD)).status, 401);
    const again = await call("POST", "/account/reset-password", body);
    assert.equal(again.status, 410);
    assert.equal(again.body.code, "LINK_USED");
    assert.equal((await outbox(p.email)).filter((x) => x.template === "welcome").length, 1, "a reset sends no second welcome");
});

test("reset password: a new request voids the earlier link", async () => {
    const p = person();
    await activate(p);
    await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() });
    const first = await lastMail(p.email, "forgot-password");
    await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() });
    const second = await lastMail(p.email, "forgot-password");
    const old = await call("POST", "/account/reset-password", { user: first.data.user._id, code: first.data.otp.code, password: NEW_PASSWORD, confirmPassword: NEW_PASSWORD });
    assert.equal(old.status, 410);
    const r = await call("POST", "/account/reset-password", { user: second.data.user._id, code: second.data.otp.code, password: NEW_PASSWORD, confirmPassword: NEW_PASSWORD });
    assert.equal(r.status, 200, JSON.stringify(r.body));
});

test("reset password: mismatched passwords are refused before the link is touched", async () => {
    const p = person();
    await activate(p);
    await call("POST", "/account/forgot-password", { email: p.email, captcha: await captcha() });
    const m = await lastMail(p.email, "forgot-password");
    const r = await call("POST", "/account/reset-password", { user: m.data.user._id, code: m.data.otp.code, password: NEW_PASSWORD, confirmPassword: `${NEW_PASSWORD}x` });
    assert.equal(r.status, 422);
    assert.ok(r.body.errors.confirmPassword);
    const check = await call("POST", "/account/link", { kind: "reset", user: m.data.user._id, code: m.data.otp.code });
    assert.equal(check.status, 200, "the link still works");
});

/* ================= Log in ================= */

test("log in: the answer has a token and the next step, and the token belongs to that member", async () => {
    const p = person();
    const id = await activate(p);
    const r = await login(p.email);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.status, "success");
    assert.equal(r.body.message, "Login successful");
    assert.ok(r.body.data.journey, "the next step for the member");
    const claims = jwt.verify(r.body.token, JWT_SECRET);
    assert.equal(String(claims._id), id);
    assert.equal(claims.email, p.email);
    assert.ok(!("password" in claims));
});

test("log in: the email may be typed in capitals", async () => {
    const p = person();
    await activate(p);
    assert.equal((await login(p.email.toUpperCase())).status, 200);
});

test("log in: before the email is confirmed the answer says so and names the email for Resend", async () => {
    const p = person();
    await register(p);
    const r = await login(p.email, "Anything-123");
    assert.equal(r.status, 403);
    assert.equal(r.body.code, "EMAIL_UNVERIFIED");
    assert.deepEqual(r.body.data, [{ email: p.email }]);
});

test("log in: empty email or password is refused before the human check is spent", async () => {
    const c = await captcha();
    const r = await call("POST", "/account/login", { email: "", password: "", captcha: c });
    assert.equal(r.status, 422);
    const p = person();
    await activate(p);
    const same = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: c });
    assert.equal(same.status, 200, "the check was not used up by the empty form");
});

test("log in: needs the human check even with the right password", async () => {
    const p = person();
    await activate(p);
    const r = await call("POST", "/account/login", { email: p.email, password: PASSWORD });
    assert.equal(r.status, 400);
    assert.equal(r.body.code, "CAPTCHA_FAILED");
    assert.equal(r.body.token, undefined);
});

test("log in: one human check cannot be used for two log-ins", async () => {
    const p = person();
    await activate(p);
    const c = await captcha();
    assert.equal((await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: c })).status, 200);
    const again = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: c });
    assert.equal(again.status, 400);
    assert.equal(again.body.code, "CAPTCHA_FAILED");
});

test("log in: a suspended member gets no session", async () => {
    const p = person();
    await activate(p);
    await db.collection("User").updateOne({ mail: p.email }, { $set: { accountStatus: "suspended" } });
    const r = await login(p.email);
    assert.equal(r.status, 403);
    assert.equal(r.body.code, "ACCOUNT_INACTIVE");
    assert.equal(r.body.token, undefined);
});

/* ================= Human check ================= */

test("human check: the picture and the maths question each come with an id; the answer is never in the picture", async () => {
    for (const mode of [undefined, "math"]) {
        const r = await call("GET", `/account/captcha${mode ? `?mode=${mode}` : ""}`);
        assert.equal(r.status, 200);
        assert.equal(r.headers.get("cache-control"), "no-store");
        assert.ok(r.body.data.id);
        const shown = JSON.stringify({ ...r.body.data, testAnswer: undefined });
        if (!mode) assert.ok(!shown.includes(`>${r.body.data.testAnswer}<`), "letters are drawn as paths");
    }
});

/* ================= Social sign-in ================= */

const social = (token) => call("GET", `/auth/social${token === undefined ? "" : `?token=${encodeURIComponent(token)}`}`, undefined, { redirect: "manual" });
const socialToken = (claims, opts = {}) => jwt.sign(claims, SOCIAL_KEY, { algorithm: "HS256", expiresIn: "10m", ...opts });

test("social sign-in: no token goes to sign-up; the answer is a redirect, never a JSON page", async () => {
    const r = await social();
    assert.equal(r.status, 302);
    assert.equal(r.headers.get("location"), "/?signup=1");
    assert.equal(r.body, null, "no JSON body");
});

test("social sign-in: the email in the token is matched in any letter case", async () => {
    const p = person();
    const id = await activate(p);
    const r = await social(socialToken({ email: p.email.toUpperCase(), provider: "google" }));
    assert.equal(r.status, 302);
    const m = /^\/#social-token=(.+)$/.exec(r.headers.get("location") || "");
    assert.ok(m, r.headers.get("location"));
    assert.equal(String(jwt.verify(decodeURIComponent(m[1]), JWT_SECRET)._id), id);
});

test("social sign-in: a suspended member is sent to log-in with a notice, with no session", async () => {
    const p = person();
    await activate(p);
    await db.collection("User").updateOne({ mail: p.email }, { $set: { accountStatus: "suspended" } });
    const r = await social(socialToken({ email: p.email, provider: "linkedin" }));
    assert.equal(r.status, 302);
    assert.equal(r.headers.get("location"), "/login/?inactive=1");
});

test("social sign-in: a new person goes to sign-up with only the name and email, nothing else from the token", async () => {
    const addr = email("social.new");
    const r = await social(socialToken({ email: addr, given_name: "Neha", family_name: "Rao", picture: "https://x/p.png", sub: "123", provider: "google" }));
    assert.equal(r.status, 302);
    const loc = new URL(r.headers.get("location"), "http://x");
    assert.equal(loc.pathname, "/");
    assert.deepEqual(Object.fromEntries(loc.searchParams), { signup: "1", given_name: "Neha", family_name: "Rao", email: addr });
});

test("social sign-in: an unconfirmed member is sent to 'confirm your email', and the redirect holds no account data", async () => {
    const p = person();
    await register(p);
    const r = await social(socialToken({ email: p.email, provider: "x" }));
    assert.equal(r.status, 302);
    const loc = r.headers.get("location");
    assert.equal(loc, `/?verifyemail=${encodeURIComponent(p.email)}`);
    for (const secret of ["98765", "110001", "1990", "password", "_id"]) assert.ok(!loc.includes(secret), secret);
});

/* ================= Profile address prefill (issue #44) ================= */

for (const [segment, make] of [["hcp", hcp], ["caregiver", (o) => person({ segment: "caregiver", ...o })], ["patient", person]]) {
    test(`profile prefill (${segment}): country, state, city and postal code from sign-up show in the profile`, async () => {
        const p = make({ country: "IN", state: "MH", city: "mumbai", postalCode: "400001" });
        await activate(p);
        const { body } = await login(p.email);
        const r = await call("POST", "/me", { questions: ["country", "state", "city", "zipcode"] }, { token: body.token });
        assert.equal(r.status, 200, JSON.stringify(r.body));
        assert.equal(r.body.data.country, "IN");
        assert.equal(r.body.data.state, "IN-MH");
        assert.equal(r.body.data.city, "Mumbai");
        assert.equal(r.body.data.zipcode, "400001");
    });
}

test("profile prefill: with 'address later' only the country is filled", async () => {
    const p = person({ state: "", city: "", postalCode: "", addressLater: true });
    await activate(p);
    const { body } = await login(p.email);
    const r = await call("POST", "/me", { questions: ["country", "state", "city", "zipcode"] }, { token: body.token });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.data.country, "IN");
    assert.equal(r.body.data.state, undefined);
    assert.equal(r.body.data.city, undefined);
    assert.equal(r.body.data.zipcode, undefined);
});

test("profile prefill: another country's address uses that country's codes", async () => {
    const p = person({ phone: "+1 415 555 0134", phoneCountry: "US", country: "US", state: "CA", city: "San Francisco", postalCode: "94103" });
    const r0 = await register(p);
    if (r0.status !== 200) return assert.fail(`US sign-up refused: ${JSON.stringify(r0.body)}`);
    const m = await lastMail(p.email, "respondent");
    await call("POST", "/account/set-password", { user: m.data.user._id, code: m.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD });
    const { body } = await login(p.email);
    const r = await call("POST", "/me", { questions: ["country", "state", "city", "zipcode"] }, { token: body.token });
    assert.equal(r.body.data.country, "US");
    assert.equal(r.body.data.state, "US-CA");
    assert.equal(r.body.data.city, "San Francisco");
    assert.equal(r.body.data.zipcode, "94103");
});

test("profile prefill: needs the member's own login", async () => {
    const r = await call("POST", "/me", { questions: ["country"] });
    assert.ok([401, 403].includes(r.status), String(r.status));
});

/* ================= Older endpoints the site still calls ================= */

test("old forgot-password endpoint: unknown email gets { status, message, data: [] }", async () => {
    const r = await call("POST", "/forgot-password", { user: email("old.unknown") });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.deepEqual(Object.keys(r.body).sort(), ["data", "message", "status"]);
    assert.equal(r.body.status, "success");
    assert.deepEqual(r.body.data, []);
});

test("old forgot-password endpoint: a missing email or a filter object is refused", async () => {
    for (const user of [undefined, "", { $ne: "" }]) {
        const r = await call("POST", "/forgot-password", { user });
        assert.notEqual(r.status, 200, JSON.stringify(user));
        assert.equal(r.body.status, "error");
    }
});
