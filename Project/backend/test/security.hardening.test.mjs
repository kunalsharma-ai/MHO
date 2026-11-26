// Hardening against attackers and bots (Kunal, 24 Nov 2026: "no hacker or AI bot can hack this portal"), the MHO copy
// of kunalsharma-ai/MFR#62. Runs the real routes against a real MongoDB.
//
//   MONGO_URL=mongodb://127.0.0.1:27017 API_DIR=/path/to/src node --test --test-force-exit test/security.hardening.test.mjs
//
// API_DIR defaults to this backend folder (app/ and utils/ side by side), as for journey.test.mjs.
import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const API_DIR = process.env.API_DIR || path.resolve(here, "..");
const from = (p) => import(pathToFileURL(path.join(API_DIR, p)).href);
dns.resolveMx = (domain, cb) => cb(null, [{ exchange: `mx.${domain}`, priority: 10 }]);
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
delete process.env.SOCIAL_JWT_SECRET;

const { default: mongoose } = await import("mongoose");
const { default: express } = await import("express");
const { default: jwt } = await import("jsonwebtoken");
const { default: appRoute } = await from("app/routes/index.js");
const { setOrigin, Token } = await from("utils/index.js");
const { default: otpController } = await from("app/controller/OTP.js");

await mongoose.connect(`${process.env.MONGO_URL || "mongodb://127.0.0.1:27017"}/mho_security_${Date.now()}`);
const db = mongoose.connection.db;
const app = express();
app.use([express.json(), setOrigin, appRoute]); // as in server.js (no cookie parser)
const server = await new Promise((r) => { const s = app.listen(0, "127.0.0.1", () => r(s)); });
const PORT = server.address().port;
const MHO = "www.myhealthopinions.com", T2O = "www.turn2opinion.com", MFR = "www.myfrequentrewards.com";

let ipN = 0;
const call = (host, method, p, body, { token } = {}) => new Promise((resolve, reject) => {
    const raw = body === undefined ? "" : JSON.stringify(body);
    ipN += 1;
    const req = http.request({ host: "127.0.0.1", port: PORT, method, path: p, headers: { host, "content-type": "application/json", "content-length": Buffer.byteLength(raw), "x-real-ip": `10.3.${ipN >> 8}.${ipN & 255}`, ...(token ? { authorization: `Bearer ${token}` } : {}) } }, (res) => {
        let text = "";
        res.on("data", (c) => { text += c; });
        res.on("end", () => { let json = {}; try { json = JSON.parse(text); } catch { /* not JSON */ } resolve({ status: res.statusCode, json, text, headers: res.headers }); });
    });
    req.on("error", reject);
    req.setTimeout(10_000, () => { req.destroy(); resolve({ status: 0, json: {}, text: "timeout", headers: {} }); });
    req.end(raw);
});
const base = (origin) => ({ origin, isActive: true, isDeleted: false, createdAt: new Date(), updatedAt: new Date() });
let n = 0;
async function person(origin, { role = "respondent" } = {}) {
    n += 1;
    const doc = { ...base(origin), name: { first: `Person${n}`, last: "Test" }, mail: `person${n}@example.invalid`, role, category: "patient", dob: new Date("1990-01-01"), gender: "Female", isVerified: { email: "verified" }, memberStatus: "active" };
    const { insertedId } = await db.collection("User").insertOne(doc);
    return { id: String(insertedId), mail: doc.mail, token: Token.generate({ _id: String(insertedId), origin }) };
}
const member = await person(MHO);
const admin = await person(MHO, { role: "admin" });
const t2oMember = await person(T2O);

test("log in as a member by id alone is gone: admins only, and for a day", async () => {
    const anon = await call(MHO, "PUT", "/api/v1/user/login", { _id: member.id });
    assert.equal(anon.status, 401);
    assert.ok(!String(anon.headers["set-cookie"] || "").includes("eyJ"));
    assert.equal((await call(MHO, "PUT", "/api/v1/user/login", { _id: member.id }, { token: member.token })).status, 403);
    const ok = await call(MHO, "PUT", "/api/v1/user/login", { _id: member.id }, { token: admin.token });
    assert.notEqual(ok.status, 401);
    assert.notEqual(ok.status, 403);
});

test("registering can't make the visitor an admin", async () => {
    await call(MHO, "PUT", "/api/v1/user", { mail: "climber@example.invalid", role: "admin", isVerified: { email: "verified" }, memberStatus: "active", name: { salutation: "Ms", first: "Climb", last: "Er" }, category: "patient", dob: "1990-01-01", gender: "Female" });
    const u = await db.collection("User").findOne({ mail: "climber@example.invalid" });
    if (u) {
        assert.notEqual(u.role, "admin");
        assert.notEqual(u.isVerified?.email, "verified");
    }
});

test("question, category, option, survey and profile changes and the answers list need an admin", async () => {
    const { insertedId: q } = await db.collection("Question").insertOne({ ...base(MHO), name: "q_lock", label: "Locked?", type: "radio", category: ["patient"] });
    const { insertedId: s } = await db.collection("Survey").insertOne({ ...base(MHO), name: "Locked", slug: "locked", points: 100 });
    const writes = [
        ["PUT", `/api/v1/question/${q}`, { label: "Hacked" }],
        ["DELETE", `/api/v1/question/${q}`],
        ["PUT", "/api/v1/category", { name: "evil" }],
        ["PUT", "/api/v1/option/q_lock", { value: "9", label: "Evil" }],
        ["PUT", `/api/v1/survey/${s}`, { points: 999999 }],
        ["GET", "/api/v1/survey/responses/locked"],
        ["POST", "/api/v1/survey/responses", {}],
        ["GET", "/api/v1/answers"],
        ["PUT", "/api/v1/project-dev", { project: "x" }],
        ["PUT", "/api/v1/batch", { name: "spam", emails: ["a@example.invalid"], scheduledAt: new Date() }],
    ];
    for (const [method, p, body] of writes) {
        assert.ok([401, 403].includes((await call(MHO, method, p, body)).status), `${method} ${p} without sign-in`);
        assert.equal((await call(MHO, method, p, body, { token: member.token })).status, 403, `${method} ${p} as a member`);
    }
    assert.equal((await db.collection("Question").findOne({ _id: q })).label, "Locked?");
    assert.equal((await db.collection("Survey").findOne({ _id: s })).points, 100);
    assert.equal((await call(MHO, "PUT", `/api/v1/question/${q}`, { label: "Fixed" }, { token: admin.token })).status, 200);
});

test("sign-in: 10 wrong passwords lock the account, whatever address the bot uses", async () => {
    for (let i = 0; i < 10; i += 1) await call(MHO, "POST", "/api/v1/user/login", { mail: member.mail, password: `wrong-${i}` });
    const locked = await call(MHO, "POST", "/api/v1/user/login", { mail: member.mail, password: "anything" });
    assert.match(locked.json.message || "", /too many wrong attempts/i, locked.text.slice(0, 200));
    const filter = await call(MHO, "POST", "/api/v1/user/login", { mail: { $ne: null }, password: { $ne: null } });
    assert.ok(!String(filter.headers["set-cookie"] || "").includes("eyJ"));
});

test("an emailed code allows 5 wrong guesses, then it is gone; ids only", async () => {
    const p = await person(MHO);
    await db.collection("OTP").insertOne({ ...base(MHO), user: new mongoose.Types.ObjectId(p.id), channel: "email", code: "123456", expiresAt: new Date(Date.now() + 864e5) });
    for (let i = 0; i < 5; i += 1) assert.equal(await otpController.verify(p.id, "email", MHO, String(200000 + i)), null);
    assert.equal(await otpController.verify(p.id, "email", MHO, "123456"), null);
    await db.collection("OTP").insertOne({ ...base(MHO), user: new mongoose.Types.ObjectId(p.id), channel: "email", code: "654321", expiresAt: new Date(Date.now() + 864e5) });
    assert.equal(await otpController.verify({ $ne: null }, "email", MHO, "654321"), null);
});

test("social sign-on: the key that used to be in the code no longer signs anyone in", async () => {
    const OLD = "8e2a8ad9aa0f57a3f8dd7ddda64da43745ee88dec1877a12bc639894937ac600b70721aa431ce6c778bc640b04fbfaecf8fdc68bfa989fb138bff5bfde2f647c";
    const r = await call(MHO, "GET", `/api/v1/auth/socials?token=${jwt.sign({ email: member.mail }, OLD)}`);
    assert.ok(!String(r.headers["set-cookie"] || "").includes("eyJ"), "no session token in a cookie");
});

test("change of e-mail: a sign-in token is never a change link", async () => {
    const r = await call(MHO, "PATCH", "/api/v1/change-email", { token: member.token });
    assert.match(r.json.message || "", /not valid/i, r.text.slice(0, 200));
    assert.equal((await db.collection("User").findOne({ _id: new mongoose.Types.ObjectId(member.id) })).mail, member.mail);
});

test("an admin of one brand can't read a member of another brand by id; brands never mix under load", async () => {
    const r = await call(MHO, "GET", `/api/v1/user/${t2oMember.id}`, undefined, { token: admin.token });
    assert.ok(!r.text.includes(t2oMember.mail), r.text.slice(0, 200));
    const tags = { [T2O]: "zzt2ozz", [MFR]: "zzmfrzz", [MHO]: "zzmhozz" };
    for (const [origin, tag] of Object.entries(tags))
        await db.collection("Question").insertOne({ ...base(origin), name: "same_name", label: `Label ${tag}`, type: "radio", category: ["patient"] });
    const res = await Promise.all(Array.from({ length: 60 }, (_, i) => { const h = [T2O, MFR, MHO][i % 3]; return call(h, "GET", "/api/v1/question").then((x) => [h, x]); }));
    for (const [host, x] of res) for (const [o, tag] of Object.entries(tags)) if (o !== host) assert.ok(!x.text.includes(tag), `${host} saw ${o}'s questions`);
});

test("security headers", async () => {
    const r = await call(MHO, "GET", "/api/v1/question");
    assert.equal(r.headers["x-content-type-options"], "nosniff");
    assert.equal(r.headers["cache-control"], "no-store");
});

test.after(async () => { server.close(); await mongoose.connection.db.dropDatabase(); await mongoose.disconnect(); });
