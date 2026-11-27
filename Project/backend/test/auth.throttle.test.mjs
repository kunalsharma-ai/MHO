// Log-in, sign-up and social sign-in, and the per-network limits (throttling) that guard them.
// Starts the real API (app/server.js) against a real MongoDB, so every middleware runs as in production.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 node --test --test-force-exit test/auth.throttle.test.mjs
//
// API_DIR defaults to this backend folder, as for journey.test.mjs. Social sign-in runs against a stand-in sign-on
// service started by this file; the real providers (Google, LinkedIn, X) are never called.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const here = path.dirname(fileURLToPath(import.meta.url));
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
const PORT = 4000 + Math.floor(Math.random() * 900);
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_auth_throttle_${Date.now()}`;
const MHO = "www.myhealthopinions.com";
const JWT_SECRET = "auth-throttle-test-secret";
const SOCIAL_KEY = "social-sign-on-test-key-0123456789abcdef"; // 32+ characters, as Auth.js requires
const PASSWORD = "Sunrise-Clinic-42";

// Same limits as app/lib/limits.js (MHO_RATE_LIMIT_SCALE stays 1 here, as in production).
const LIMIT = { login: 20, register: 10, email: 6, token: 30, captcha: 30 };

let server;
let providers;
let db;

/* ---------- helpers ---------- */
// Every request names its network. The test connects from 127.0.0.1, which the API trusts as its local gateway
// (MHO_TRUSTED_PROXIES default), so it reads the caller from X-Forwarded-For. Each test uses its own address and the
// limits of one test never reach another.
let net = 0;
const network = () => { net += 1; return `203.0.${net >> 8}.${net & 255}`; };

function call(method, p, body, { ip = network(), host = MHO, headers = {} } = {}) {
    const raw = body === undefined ? "" : JSON.stringify(body);
    return new Promise((resolve, reject) => {
        const req = http.request({
            host: "127.0.0.1", port: PORT, method, path: `/api/v1${p}`,
            headers: { host, "content-type": "application/json", "content-length": Buffer.byteLength(raw), "x-forwarded-for": ip, ...headers },
        }, (res) => {
            let text = "";
            res.on("data", (c) => { text += c; });
            res.on("end", () => { let json = {}; try { json = JSON.parse(text); } catch { /* not JSON */ } resolve({ status: res.statusCode, body: json, headers: res.headers }); });
        });
        req.on("error", reject);
        req.end(raw);
    });
}
// A solved security check. NODE_ENV=test makes the API return the answer (never in production).
async function captcha() {
    const r = await call("GET", "/account/captcha");
    assert.equal(r.status, 200, JSON.stringify(r.body));
    return { id: r.body.data.id, answer: r.body.data.testAnswer };
}
const decode = (token) => jwt.verify(token, JWT_SECRET);

let n = 0;
async function member({ verified = true, active = true, origin = MHO } = {}) {
    n += 1;
    const mail = `auth.${Date.now()}.${n}@example.com`;
    const doc = {
        origin, mail, name: { first: `Asha${n}`, last: "Test" }, role: "respondent", category: "patient",
        dob: new Date("1990-01-01"), gender: "Female", password: await bcrypt.hash(PASSWORD, 4),
        isVerified: { email: verified ? "verified" : "unverified" }, accountStatus: active ? "active" : "suspended",
        isActive: true, isDeleted: false, createdAt: new Date(), updatedAt: new Date(),
    };
    const { insertedId } = await db.collection("User").insertOne(doc);
    return { id: String(insertedId), mail };
}
const signUp = (over = {}) => ({
    firstName: "Ravi", dob: "1990-05-05", email: `signup.${Date.now()}.${n++}@example.com`, phone: "+91 98765 43210",
    phoneCountry: "IN", country: "IN", state: "DL", city: "New Delhi", postalCode: "110001", segment: "patient", ...over,
});
// Sends `count` requests from one network and returns the last answer.
async function burst(count, send) {
    let last;
    for (let i = 0; i < count; i++) last = await send(i);
    return last;
}
const isLimited = (r) => r.status === 429 && r.body.code === "RATE_LIMITED";

/* ---------- start: stand-in sign-on service, then the API ---------- */
before(async () => {
    db = (await mongoose.createConnection(DB).asPromise()).db;
    providers = http.createServer((req, res) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ data: { providers: [
            { id: "google", name: "Google", url: "https://signon.example/google" },
            { id: "linkedin", name: "LinkedIn", url: "https://signon.example/linkedin" },
            { id: "x", name: "X", url: "https://signon.example/x" },
        ] } }));
    });
    await new Promise((r) => providers.listen(0, "127.0.0.1", r));
    server = spawn(process.execPath, ["app/server.js"], {
        cwd: API_DIR,
        env: {
            ...process.env, NODE_ENV: "test", MAIL_MX_CHECK: "false", JWT_SECRET, mongodb: DB, port: String(PORT),
            MHO_RATE_LIMIT_SCALE: "1", SOCIAL_JWT_SECRET: SOCIAL_KEY, socials: `http://127.0.0.1:${providers.address().port}/providers`,
        },
        stdio: ["ignore", "pipe", "pipe"],
    });
    let log = "";
    server.stdout.on("data", (d) => { log += d; });
    server.stderr.on("data", (d) => { log += d; });
    for (let i = 0; i < 100; i++) {
        try { if ((await call("GET", "/account/location/countries")).status === 200) return; } catch { /* not up yet */ }
        await new Promise((r) => setTimeout(r, 150));
    }
    throw new Error(`API did not start:\n${log}`);
});
after(async () => {
    server?.kill();
    providers?.close();
    await db?.dropDatabase();
    await mongoose.disconnect();
    process.exit(0);
});

/* ================= Authentication: log in ================= */
test("log in: the right email, password and security code give a session for that member only", async () => {
    const m = await member();
    const r = await call("POST", "/account/login", { email: m.mail.toUpperCase(), password: PASSWORD, captcha: await captcha() });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const t = decode(r.body.token);
    assert.equal(t._id, m.id);
    assert.equal(t.origin, MHO);
    assert.equal(t.role, "respondent");
    assert.ok(t.exp - t.iat <= 24 * 3600, "a normal session lasts a day");
});

test("log in: 'keep me signed in' gives 30 days, and only when it is exactly true", async () => {
    const m = await member();
    const long = await call("POST", "/account/login", { email: m.mail, password: PASSWORD, remember: true, captcha: await captcha() });
    const t = decode(long.body.token);
    assert.equal(t.exp - t.iat, 30 * 24 * 3600);
    const str = await call("POST", "/account/login", { email: m.mail, password: PASSWORD, remember: "true", captcha: await captcha() });
    const s = decode(str.body.token);
    assert.equal(s.exp - s.iat, 24 * 3600);
});

test("log in: a wrong password and an unknown email get the same answer", async () => {
    const m = await member();
    const wrong = await call("POST", "/account/login", { email: m.mail, password: "Not-the-password-9", captcha: await captcha() });
    const nobody = await call("POST", "/account/login", { email: `nobody.${Date.now()}@example.com`, password: PASSWORD, captcha: await captcha() });
    assert.equal(wrong.status, 401);
    assert.equal(nobody.status, 401);
    assert.equal(wrong.body.message, nobody.body.message);
    assert.equal(wrong.body.code, "BAD_CREDENTIALS");
    assert.equal(wrong.body.token, undefined);
});

test("log in: refused without a correct, unused security code", async () => {
    const m = await member();
    const none = await call("POST", "/account/login", { email: m.mail, password: PASSWORD });
    assert.equal(none.body.code, "CAPTCHA_FAILED");
    const c = await captcha();
    const wrong = await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: { id: c.id, answer: "zzzzz" } });
    assert.equal(wrong.body.code, "CAPTCHA_FAILED");
    const again = await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: c }); // spent by the wrong try
    assert.equal(again.body.code, "CAPTCHA_FAILED");
    const fresh = await captcha();
    assert.equal((await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: fresh })).status, 200);
    const reused = await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: fresh });
    assert.equal(reused.body.code, "CAPTCHA_FAILED");
});

test("log in: database filters in place of an email or password are refused", async () => {
    await member();
    for (const body of [{ email: { $ne: "" }, password: PASSWORD }, { email: "a@example.com", password: { $ne: "" } }, { email: { $regex: ".*" }, password: { $gt: "" } }]) {
        const r = await call("POST", "/account/login", { ...body, captcha: await captcha() });
        assert.notEqual(r.status, 200, JSON.stringify(body));
        assert.equal(r.body.token, undefined);
    }
});

test("log in: unverified and suspended accounts get no session", async () => {
    const unverified = await member({ verified: false });
    const u = await call("POST", "/account/login", { email: unverified.mail, password: PASSWORD, captcha: await captcha() });
    assert.equal(u.status, 403);
    assert.equal(u.body.code, "EMAIL_UNVERIFIED");
    assert.equal(u.body.token, undefined);
    const suspended = await member({ active: false });
    const s = await call("POST", "/account/login", { email: suspended.mail, password: PASSWORD, captcha: await captcha() });
    assert.equal(s.status, 403);
    assert.equal(s.body.code, "ACCOUNT_INACTIVE");
    assert.equal(s.body.token, undefined);
});

test("log in: an account belongs to its own site; the same email on another brand does not sign in here", async () => {
    const other = await member({ origin: "www.turn2opinion.com" });
    const r = await call("POST", "/account/login", { email: other.mail, password: PASSWORD, captcha: await captcha() });
    assert.equal(r.status, 401);
    assert.equal(r.body.token, undefined);
});

test("sessions: a forged, re-signed or expired token is refused by member pages", async () => {
    const m = await member();
    const good = (await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: await captcha() })).body.token;
    const page = (token) => call("GET", "/me/journey", undefined, { headers: { authorization: `Bearer ${token}` } });
    assert.equal((await page(good)).status, 200);
    const claims = { _id: m.id, origin: MHO, role: "admin", email: m.mail };
    assert.notEqual((await page(jwt.sign(claims, "guessed-secret"))).status, 200, "signed with the wrong key");
    assert.notEqual((await page(`${jwt.sign(claims, JWT_SECRET).split(".").slice(0, 2).join(".")}.`)).status, 200, "signature removed");
    const none = `${Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url")}.${Buffer.from(JSON.stringify(claims)).toString("base64url")}.`;
    assert.notEqual((await page(none)).status, 200, "alg none");
    assert.notEqual((await page(jwt.sign({ ...claims, role: "respondent" }, JWT_SECRET, { expiresIn: -10 }))).status, 200, "expired");
});

/* ================= Authentication: sign up ================= */
test("sign up: needs a security code; with one, the account is created unverified and cannot log in yet", async () => {
    const body = signUp();
    const none = await call("POST", "/account/register", body);
    assert.equal(none.body.code, "CAPTCHA_FAILED");
    assert.equal(await db.collection("User").countDocuments({ mail: body.email }), 0);
    const r = await call("POST", "/account/register", { ...body, captcha: await captcha() });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const user = await db.collection("User").findOne({ mail: body.email });
    assert.ok(user, "account created");
    assert.notEqual(user.isVerified?.email, "verified");
    assert.ok(!user.password, "no password until the emailed link is used");
    assert.notEqual(user.role, "admin");
});

test("sign up: a visitor can't choose their own role, verification or brand", async () => {
    const body = signUp({ role: "admin", isVerified: { email: "verified" }, origin: "www.turn2opinion.com", accountStatus: "active" });
    const r = await call("POST", "/account/register", { ...body, captcha: await captcha() });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const user = await db.collection("User").findOne({ mail: body.email });
    assert.notEqual(user.role, "admin");
    assert.notEqual(user.isVerified?.email, "verified");
    assert.equal(user.origin, MHO);
});

/* ================= Social sign-in (Google, LinkedIn, X) ================= */
// The sign-on service talks to the providers and comes back with a short-lived HS256 token signed with
// SOCIAL_JWT_SECRET. The API only checks that token, so the same rules hold for every provider.
const social = (token) => call("GET", `/auth/social?token=${encodeURIComponent(token)}`);
const socialToken = (claims, opts = {}) => jwt.sign(claims, SOCIAL_KEY, { algorithm: "HS256", expiresIn: "10m", ...opts });
// The browser is redirected (issue #47: it used to get a JSON page). A good sign-in goes to "/#social-token=<jwt>".
const sessionFrom = (r) => {
    const m = /#social-token=([^&]+)/.exec(r.headers.location || "");
    return m ? decodeURIComponent(m[1]) : undefined;
};

test("social sign-in: the sign-in options list Google, LinkedIn and X from the sign-on service", async () => {
    const r = await call("POST", "/auth/socials");
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.deepEqual(r.body.data.map((p) => p.id), ["google", "linkedin", "x"]);
});

for (const provider of ["google", "linkedin", "x"]) {
    test(`social sign-in (${provider}): a valid token for a verified member signs in that member`, async () => {
        const m = await member();
        const r = await social(socialToken({ email: m.mail, provider }));
        assert.equal(r.status, 302, JSON.stringify(r.body));
        assert.match(r.headers.location, /^\/#social-token=/);
        const t = decode(sessionFrom(r));
        assert.equal(t._id, m.id);
        assert.equal(t.email, m.mail);
    });
}

test("social sign-in: forged, tampered, old or wrong-kind tokens sign nobody in", async () => {
    const m = await member();
    const claims = { email: m.mail, provider: "google" };
    const good = socialToken(claims);
    const [h, p] = good.split(".");
    const cases = {
        "wrong key": jwt.sign(claims, "another-key-another-key-another-key-0000"),
        "signature removed": `${h}.${p}.`,
        "alg none": `${Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url")}.${p}.`,
        "other algorithm (HS512)": jwt.sign(claims, SOCIAL_KEY, { algorithm: "HS512" }),
        "expired": socialToken(claims, { expiresIn: -10 }),
        "older than 15 minutes": jwt.sign({ ...claims, iat: Math.floor(Date.now() / 1000) - 16 * 60 }, SOCIAL_KEY),
        "email swapped after signing": `${h}.${Buffer.from(JSON.stringify({ ...claims, email: "admin@example.com" })).toString("base64url")}.${good.split(".")[2]}`,
        "not a token": "hello",
    };
    for (const [name, token] of Object.entries(cases)) {
        const r = await social(token);
        assert.equal(r.status, 302, name);
        assert.equal(sessionFrom(r), undefined, `${name}: no session`);
        assert.match(r.headers.location, /^\/\?signup=1/, name);
    }
    assert.ok(decode(sessionFrom(await social(good))), "the untouched token still works");
});

test("social sign-in: unknown and unverified emails get no session", async () => {
    const unknown = await social(socialToken({ email: `new.${Date.now()}@example.com`, provider: "linkedin" }));
    assert.equal(sessionFrom(unknown), undefined);
    assert.match(unknown.headers.location, /^\/\?signup=1&email=new\./, "a new person goes on to sign up with the email filled in");
    const noEmail = await social(socialToken({ provider: "x" }));
    assert.equal(sessionFrom(noEmail), undefined);
    const unverified = await member({ verified: false });
    const u = await social(socialToken({ email: unverified.mail, provider: "google" }));
    assert.equal(sessionFrom(u), undefined);
    // issue #47: the browser is sent to the "confirm your email" screen, and the account record is never shown
    assert.equal(u.status, 302);
    assert.equal(u.headers.location, `/?verifyemail=${encodeURIComponent(unverified.mail)}`);
    assert.deepEqual(u.body, {}, "no JSON body with the member's details");
});

/* ================= Throttling (per network) ================= */
test(`throttling: log in allows ${LIMIT.login} tries per network in 15 minutes, then answers 429`, async () => {
    const ip = network();
    const body = { email: "bot@example.com", password: "Guess-123456" };
    const last = await burst(LIMIT.login, () => call("POST", "/account/login", body, { ip }));
    assert.equal(last.body.code, "CAPTCHA_FAILED", "the last allowed try is still answered normally");
    const over = await call("POST", "/account/login", body, { ip });
    assert.ok(isLimited(over), JSON.stringify(over.body));
    // blocked before anything is checked: even a correct login from that network waits
    const m = await member();
    const real = await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: await captcha() }, { ip });
    assert.ok(isLimited(real));
    // other networks are not affected
    assert.equal((await call("POST", "/account/login", { email: m.mail, password: PASSWORD, captcha: await captcha() })).status, 200);
});

test(`throttling: sign up allows ${LIMIT.register} attempts per network in an hour`, async () => {
    const ip = network();
    const last = await burst(LIMIT.register, () => call("POST", "/account/register", signUp(), { ip }));
    assert.equal(last.body.code, "CAPTCHA_FAILED");
    const over = await call("POST", "/account/register", { ...signUp(), captcha: await captcha() }, { ip });
    assert.ok(isLimited(over), JSON.stringify(over.body));
    assert.match(over.body.message, /hour/);
    assert.equal((await call("POST", "/account/register", { ...signUp(), captcha: await captcha() })).status, 200, "another network can still sign up");
});

test(`throttling: emails (resend link, forgot password) share ${LIMIT.email} per network in an hour`, async () => {
    const ip = network();
    const sends = [
        () => call("POST", "/account/resend-verification", { email: "a@example.com" }, { ip }),
        () => call("POST", "/account/forgot-password", { email: "a@example.com" }, { ip }),
    ];
    const last = await burst(LIMIT.email, (i) => sends[i % 2]());
    assert.ok(!isLimited(last), "the sixth email request is still answered");
    for (const send of sends) {
        const over = await send();
        assert.ok(isLimited(over), JSON.stringify(over.body));
    }
    const other = await call("POST", "/account/forgot-password", { email: "a@example.com", captcha: await captcha() });
    assert.equal(other.status, 200, "another network can still ask for a reset link");
});

test(`throttling: link checks and password links allow ${LIMIT.token} tries per network in 15 minutes`, async () => {
    const ip = network();
    const guess = (i) => [
        () => call("POST", "/account/link", { kind: "reset", user: "6b0000000000000000000000", code: `guess${i}` }, { ip }),
        () => call("POST", "/account/reset-password", { user: "6b0000000000000000000000", code: `guess${i}`, password: PASSWORD, confirmPassword: PASSWORD }, { ip }),
        () => call("POST", "/account/set-password", { user: "6b0000000000000000000000", code: `guess${i}`, password: PASSWORD, confirmPassword: PASSWORD }, { ip }),
    ][i % 3]();
    const last = await burst(LIMIT.token, guess);
    assert.equal(last.status, 410, "wrong guesses are answered as invalid links until the limit");
    assert.ok(isLimited(await guess(LIMIT.token)));
});

test(`throttling: the security check allows ${LIMIT.captcha} new codes per network a minute`, async () => {
    const ip = network();
    const last = await burst(LIMIT.captcha, () => call("GET", "/account/captcha", undefined, { ip }));
    assert.equal(last.status, 200);
    assert.ok(isLimited(await call("GET", "/account/captcha", undefined, { ip })));
});

test("throttling: a limited answer is JSON with a plain message and standard RateLimit headers", async () => {
    const ip = network();
    await burst(LIMIT.captcha, () => call("GET", "/account/captcha", undefined, { ip }));
    const r = await call("GET", "/account/captcha", undefined, { ip });
    assert.equal(r.status, 429);
    assert.equal(r.body.status, "error");
    assert.ok(r.body.message.length > 10);
    assert.ok(r.headers["ratelimit-policy"], "RateLimit-Policy header");
    assert.match(String(r.headers.ratelimit), /remaining=0/);
    assert.equal(r.body.data, undefined, "nothing else is sent back");
});

// The limit key is the address our own gateway wrote (the right end of X-Forwarded-For). Addresses a caller adds in
// front of it, or an X-Real-IP it sends itself, are ignored, so changing them on every request gains nothing.
test("throttling: a made-up X-Forwarded-For address does not give a fresh allowance", async () => {
    const real = network();
    await burst(LIMIT.captcha, () => call("GET", "/account/captcha", undefined, { ip: real }));
    const spoofed = await call("GET", "/account/captcha", undefined, { ip: `198.51.100.7, ${real}` });
    assert.ok(isLimited(spoofed), "the same caller is still limited");
    const many = await call("GET", "/account/captcha", undefined, { ip: `198.51.100.8, 198.51.100.9, ${real}`, headers: { "x-real-ip": "198.51.100.10" } });
    assert.ok(isLimited(many), "a longer made-up chain or X-Real-IP does not help either");
    assert.ok(!isLimited(await call("GET", "/account/captcha", undefined, { ip: network() })), "another network is not affected");
});
