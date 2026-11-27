// Issues #42 (no verification email), #43 (human check letter case) and #44 (profile data not loaded after login),
// against a real API process and a real MongoDB.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 node --test --test-force-exit test/issues-42-44.test.mjs
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";

const here = path.dirname(fileURLToPath(import.meta.url));
const PORT = 4000 + Math.floor(Math.random() * 900) + 50;
const HOST = `127.0.0.1:${PORT}`;
const BASE = `http://${HOST}/api/v1`;
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_issues_${Date.now()}`;
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
let server;
let db;

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
const PASSWORD = "Sunrise-Clinic-42";
async function member(over = {}) {
    const p = { firstName: "Asha", dob: "1990-04-12", email: email("asha"), phone: "+91 98765 43210", phoneCountry: "IN", country: "IN", state: "DL", city: "New Delhi", postalCode: "110001", segment: "patient", ...over };
    const r = await call("POST", "/account/register", { ...p, captcha: await captcha() });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const mail = (await outbox(p.email)).find((m) => m.template === "respondent");
    const s = await call("POST", "/account/set-password", { user: mail.data.user._id, code: mail.data.otp.code, password: PASSWORD, confirmPassword: PASSWORD });
    assert.equal(s.status, 200, JSON.stringify(s.body));
    const l = await call("POST", "/account/login", { email: p.email, password: PASSWORD, captcha: await captcha() });
    assert.equal(l.status, 200, JSON.stringify(l.body));
    return { p, token: l.body.token, id: mail.data.user._id };
}
before(async () => {
    db = (await mongoose.createConnection(DB).asPromise()).db;
    const meta = { origin: HOST, isActive: true, isDeleted: false };
    await db.collection("Question").insertMany([
        { name: "country", label: "Country", type: "select", ...meta },
        { name: "state", label: "State", type: "select", ...meta },
        { name: "city", label: "City", type: "text", ...meta },
        { name: "zipcode", label: "ZIP / Postal code", type: "text", ...meta },
    ]);
    await db.collection("Category").insertMany([{ name: "patient", age: { min: 18, max: 110 }, terms: [], ...meta }]);
    server = spawn(process.execPath, ["app/server.js"], {
        cwd: API_DIR,
        env: { ...process.env, NODE_ENV: "test", MAIL_MX_CHECK: "false", JWT_SECRET: "issues-test-secret", mongodb: DB, port: String(PORT), MHO_RATE_LIMIT_SCALE: "20" },
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


// #42: the sign-up said "check your inbox" even when the confirmation email was never sent
test("#42 sign-up says so when the confirmation email could not be sent, and the account is kept", async () => {
    await call("POST", "/account/__test/mail-failure", { on: true });
    try {
        const p = { firstName: "Ravi", dob: "1985-01-20", email: email("nomail"), phone: "+91 98765 43210", phoneCountry: "IN", country: "IN", segment: "patient", addressLater: true };
        const r = await call("POST", "/account/register", { ...p, captcha: await captcha() });
        assert.equal(r.status, 200, JSON.stringify(r.body));
        assert.equal(r.body.data.mailSent, false);
        assert.match(r.body.message, /couldn’t send the confirmation email/);
        assert.ok(await db.collection("User").findOne({ mail: p.email }), "the account is saved, so Resend can send the link later");
    } finally {
        await call("POST", "/account/__test/mail-failure", { on: false });
    }
    const ok = await call("POST", "/account/register", { firstName: "Ravi", dob: "1985-01-20", email: email("mail"), phone: "+91 98765 43210", phoneCountry: "IN", country: "IN", segment: "patient", addressLater: true, captcha: await captcha() });
    assert.equal(ok.body.data.mailSent, true);
});

// #43: the picture shows capital and small letters; either case must pass
for (const [label, change] of [["small letters", (s) => s.toLowerCase()], ["capital letters", (s) => s.toUpperCase()], ["the exact letters shown", (s) => s]]) {
    test(`#43 the human check accepts ${label}`, async () => {
        const c = await captcha();
        const r = await call("POST", "/account/login", { email: "nobody@example.com", password: "Wrong-password-1", captcha: { id: c.id, answer: change(c.answer) } });
        assert.equal(r.body.code, "BAD_CREDENTIALS", JSON.stringify(r.body)); // got past the human check
    });
}

// #44: the profile sections read answers by question name; sign-up keeps the address on the account
test("#44 the profile sections get the country, state, city and postal code given at sign-up", async () => {
    const { token } = await member({ country: "IN", state: "DL", city: "new delhi", postalCode: "110001" });
    const r = await call("POST", "/me", { questions: ["country", "state", "city", "zipcode", "gender"] }, token);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.data.country, "IN");
    assert.equal(r.body.data.state, "IN-DL");
    assert.equal(r.body.data.city, "New Delhi");
    assert.equal(r.body.data.zipcode, "110001");
});

test("#44 an answer saved in the profile wins over the sign-up address", async () => {
    const { token } = await member({ country: "IN", state: "DL", city: "New Delhi", postalCode: "110001" });
    const s = await call("PATCH", "/me/profile", { city: "Gurugram", state: "IN-HR" }, token);
    assert.equal(s.status, 200, JSON.stringify(s.body));
    const r = await call("POST", "/me", { questions: ["country", "state", "city"] }, token);
    assert.equal(r.body.data.city, "Gurugram");
    assert.equal(r.body.data.state, "IN-HR");
    assert.equal(r.body.data.country, "IN");
});

test("#44 only the questions asked for are filled", async () => {
    const { token } = await member();
    const r = await call("POST", "/me", { questions: ["gender"] }, token);
    assert.equal(r.body.data.state, undefined);
    assert.equal(r.body.data.zipcode, undefined);
});
