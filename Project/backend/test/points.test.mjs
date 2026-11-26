// Member points (Kunal, 2026-11-26: "all points should be properly visible and credited"), run against a real API
// process and a real MongoDB. The Reward ledger is the only source of the balance: the server credits completed
// surveys, completed profile sections and verified referrals once each, members cannot credit or approve themselves,
// and an admin approves or rejects survey credits.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 node --test --test-force-exit test/points.test.mjs
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
const DB = `${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_points_${Date.now()}`;
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
const points = async (token) => {
    const r = await call("GET", "/me/points", null, token);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    return r.body.data;
};

before(async () => {
    db = (await mongoose.createConnection(DB).asPromise()).db;
    const meta = { origin: HOST, isActive: true, isDeleted: false };
    // two small patient sections: "colours" (one question, 75 points set by the admin) and "pets" (default 50)
    await db.collection("Profile").insertMany([
        { name: "colours", slug: "colours", category: "patient", pages: [["Page 1", "fav-colour"]], points: 75, ...meta },
        { name: "pets", slug: "pets", category: "patient", pages: [["Page 1", "has-pet"]], ...meta },
    ]);
    await db.collection("Question").insertMany([
        { name: "fav-colour", label: "Favourite colour", type: "text", ...meta },
        { name: "has-pet", label: "Do you have a pet?", type: "text", ...meta },
    ]);
    await db.collection("Category").insertMany([{ name: "patient", age: { min: 18, max: 110 }, terms: [], ...meta }]);
    server = spawn(process.execPath, ["app/server.js"], {
        cwd: API_DIR,
        env: { ...process.env, NODE_ENV: "test", MAIL_MX_CHECK: "false", JWT_SECRET: "points-test-secret", mongodb: DB, port: String(PORT), MHO_RATE_LIMIT_SCALE: "20" },
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

test("a new member starts at 0 points, with the payout level and rate the member area shows", async () => {
    const { token } = await member();
    const p = await points(token);
    assert.equal(p.totalPoints, 0);
    assert.equal(p.pendingPoints, 0);
    assert.ok(p.threshold > 0 && p.conversionRate > 0);
    assert.deepEqual(p.history, []);
});

test("a completed profile section is credited once, with its own points, and shows in the dashboard", async () => {
    const { token } = await member();
    let r = await call("PATCH", "/me/answer", { "fav-colour": "Teal" }, token);
    assert.equal(r.status, 200, JSON.stringify(r.body));
    const s = await call("POST", "/me/points/sync", {}, token);
    assert.equal(s.status, 200, JSON.stringify(s.body));
    assert.equal(s.body.data.added, 1);
    assert.equal(s.body.data.totalPoints, 75);
    // again: nothing new, nothing paid twice
    const again = await call("POST", "/me/points/sync", {}, token);
    assert.equal(again.body.data.added, 0);
    assert.equal(again.body.data.totalPoints, 75);
    r = await call("PATCH", "/me/answer", { "has-pet": "No" }, token);
    const p = await points(token);
    assert.equal(p.totalPoints, 125);
    assert.equal(p.approvedPoints, 125);
    assert.equal(p.bySource.profile, 125);
    assert.deepEqual(p.history.map((h) => [h.kind, h.points, h.status]).sort(), [["profile", 50, "Approved"], ["profile", 75, "Approved"]]);
    // the old summary route answers the same numbers
    const legacy = await call("GET", "/me/rewards", null, token);
    assert.equal(legacy.body.data.total, 125);
});

test("a completed survey is credited as awaiting approval; an admin approves or rejects it", async () => {
    const { token, id } = await member();
    const surveyDone = (slug, pts) => db.collection("Response").insertOne({ user: new mongoose.Types.ObjectId(id), survey: { slug, name: `Survey ${slug}` }, status: "complete", points: pts, origin: HOST, isActive: true, isDeleted: false, createdAt: new Date(), updatedAt: new Date() });
    await surveyDone("s1", 200);
    await surveyDone("s2", 300);
    await db.collection("Response").insertOne({ user: new mongoose.Types.ObjectId(id), survey: { slug: "s3" }, status: "terminate", points: 999, origin: HOST, isActive: true, isDeleted: false });
    let p = await points(token);
    assert.equal(p.totalPoints, 500);
    assert.equal(p.pendingPoints, 500);
    assert.equal(p.approvedPoints, 0);
    assert.equal(p.bySource.survey, 500);
    const [first, second] = p.history.filter((h) => h.kind === "survey");

    // a member cannot credit, approve or delete
    assert.equal((await call("PUT", "/rewards", { points: 1000 }, token)).body.status, "error");
    assert.equal((await call("PUT", `/rewards/${first._id}`, { status: "Approve" }, token)).status, 403);
    assert.equal((await call("DELETE", `/rewards/${first._id}`, null, token)).status, 403);

    // an admin can, with the words the admin Responses page sends
    const admin = await member({ firstName: "Admin" });
    await db.collection("User").updateOne({ _id: new mongoose.Types.ObjectId(admin.id) }, { $set: { role: "admin" } });
    assert.equal((await call("PUT", `/rewards/${first._id}`, { status: "Approve" }, admin.token)).status, 200);
    assert.equal((await call("PUT", `/rewards/${second._id}`, { status: "Reject" }, admin.token)).status, 200);
    p = await points(token);
    const approved = p.history.find((h) => String(h._id) === String(first._id));
    assert.equal(approved.status, "Approved");
    assert.equal(p.approvedPoints, approved.points);
    assert.equal(p.totalPoints, approved.points); // the rejected survey no longer counts
    assert.equal(p.pendingPoints, 0);
});

test("a friend who joins with the member's link counts once their email is verified", async () => {
    const host = await member();
    const friend = await member({ firstName: "Ravi" });
    await db.collection("User").updateOne({ _id: new mongoose.Types.ObjectId(friend.id) }, { $set: { referredBy: String(host.id) } });
    const p = await points(host.token);
    assert.equal(p.bySource.referral, 100);
    assert.equal(p.totalPoints, 100);
    assert.equal((await points(host.token)).totalPoints, 100);
});

test("another member's credit cannot be read", async () => {
    const a = await member();
    await call("PATCH", "/me/answer", { "fav-colour": "Red" }, a.token);
    const [row] = (await points(a.token)).history;
    const b = await member();
    const r = await call("GET", `/rewards/${row._id}`, null, b.token);
    assert.equal(r.body?.status, "error", JSON.stringify(r.body));
    assert.match(String(r.body?.message), /not found/i);
});
