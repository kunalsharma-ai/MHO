// Issue #56: POST /api/v1/user/check (is this email already registered?) answered 404, because the route was missing
// and "check" fell through to POST /api/v1/user/:id. Against a real API process and a real MongoDB.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 node --test --test-force-exit test/issue-56-user-check.test.mjs
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
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_issue56_${Date.now()}`;
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

test("#56 POST /user/check answers { status, message, data: [count] } instead of 404", async () => {
    const fresh = await call("POST", "/user/check", { mail: email("nobody") });
    assert.equal(fresh.status, 200, JSON.stringify(fresh.body));
    assert.deepEqual(fresh.body, { status: "success", message: "", data: [0] });

    const p = { firstName: "Kiran", dob: "1988-06-01", email: email("kiran"), phone: "+91 98765 43210", phoneCountry: "IN", country: "IN", segment: "patient", addressLater: true };
    assert.equal((await call("POST", "/account/register", { ...p, captcha: await captcha() })).status, 200);
    const taken = await call("POST", "/user/check", { mail: `  ${p.email.toUpperCase()} ` });
    assert.equal(taken.status, 200, JSON.stringify(taken.body));
    assert.deepEqual(taken.body, { status: "success", message: "", data: [1] });
    // the sign-up forms read the count with Number(data) (frontend-1) and isNaN(data) / data > 0 (web)
    assert.equal(Number(taken.body.data), 1);
    assert.equal(Number(fresh.body.data), 0);
});

test("#56 POST /user/check with no or a bad email answers data: [0], never an error", async () => {
    for (const body of [{}, { mail: "" }, { mail: 42 }, { mail: { $ne: null } }, { mail: "x".repeat(300) + "@example.com" }]) {
        const r = await call("POST", "/user/check", body);
        assert.equal(r.status, 200, `${JSON.stringify(body)}: ${JSON.stringify(r.body)}`);
        assert.deepEqual(r.body.data, [0], JSON.stringify(body));
    }
});
