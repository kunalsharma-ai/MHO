// The email service against its API contract (openapi.yml from Kunal, 2026-11-28), with a stand-in SMTP server.
//
//   cd services/email/test && npm install && npm test
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { encrypt } from "encryption-aes";

const here = path.dirname(fileURLToPath(import.meta.url));
const SERVICE = path.resolve(here, "..");
const PORT = 5100 + Math.floor(Math.random() * 800);
const BASE = `http://127.0.0.1:${PORT}`;
let dir, api, smtp, smtpPort, log = "";
const received = []; // { from, to, data } per mail the stand-in SMTP server got
let refuse = false; // make the stand-in SMTP server refuse the next mail

// Minimal SMTP server: enough for nodemailer (EHLO, MAIL, RCPT, DATA, QUIT), no login.
function startSmtp() {
    return new Promise((resolve) => {
        smtp = net.createServer((sock) => {
            let mail = { to: [] }, inData = false, buf = "";
            sock.write("220 stand-in ESMTP\r\n");
            sock.on("data", (chunk) => {
                buf += chunk.toString("utf8");
                let i;
                while ((i = buf.indexOf("\r\n")) >= 0) {
                    const line = buf.slice(0, i); buf = buf.slice(i + 2);
                    if (inData) {
                        if (line === ".") {
                            inData = false;
                            if (refuse) { refuse = false; sock.write("554 5.7.1 Rejected by test\r\n"); }
                            else { received.push(mail); sock.write("250 2.0.0 OK queued\r\n"); }
                            mail = { to: [] };
                        } else mail.data = (mail.data || "") + line + "\n";
                        continue;
                    }
                    const cmd = line.slice(0, 4).toUpperCase();
                    if (cmd === "EHLO" || cmd === "HELO") sock.write("250-stand-in\r\n250 8BITMIME\r\n");
                    else if (cmd === "MAIL") { mail.from = line; sock.write("250 OK\r\n"); }
                    else if (cmd === "RCPT") { mail.to.push(line); sock.write("250 OK\r\n"); }
                    else if (cmd === "DATA") { inData = true; sock.write("354 go\r\n"); }
                    else if (cmd === "QUIT") { sock.write("221 bye\r\n"); sock.end(); }
                    else sock.write("250 OK\r\n");
                }
            });
        }).listen(0, "127.0.0.1", () => { smtpPort = smtp.address().port; resolve(); });
    });
}

const SITE = { name: "My Health Opinions", host: "127.0.0.1", port: 0, secure: false, from: "support@example.com", replyTo: "help@example.com" };

before(async () => {
    await startSmtp();
    SITE.port = smtpPort;
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "email-service-"));
    fs.copyFileSync(path.join(SERVICE, "server.js"), path.join(dir, "server.js"));
    fs.cpSync(path.join(SERVICE, "utils"), path.join(dir, "utils"), { recursive: true });
    fs.mkdirSync(path.join(dir, "config"));
    fs.writeFileSync(path.join(dir, "config", "site.example.json"), JSON.stringify(SITE));
    fs.writeFileSync(path.join(dir, "config", "empty.example.json"), "");
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ type: "module" }));
    fs.symlinkSync(path.join(here, "node_modules"), path.join(dir, "node_modules"));
    api = spawn(process.execPath, ["server.js"], { cwd: dir, env: { ...process.env, port: String(PORT) }, stdio: ["ignore", "pipe", "pipe"] });
    api.stdout.on("data", (d) => (log += d));
    api.stderr.on("data", (d) => (log += d));
    for (let i = 0; i < 100; i++) {
        try { await fetch(`${BASE}/email/verify`, { method: "POST" }); return; } catch {}
        await new Promise((r) => setTimeout(r, 100));
    }
    throw new Error(`email service did not start:\n${log}`);
});
after(() => {
    api?.kill();
    smtp?.close();
    if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

async function call(method, url, { headers = {}, body } = {}) {
    const res = await fetch(`${BASE}${url}`, {
        method,
        headers: { ...(body && !(body instanceof FormData) ? { "content-type": "application/json" } : {}), ...headers },
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
    let json = null;
    try { json = await res.json(); } catch {}
    return { status: res.status, body: json };
}
const credsHeader = (payload) => {
    const key = crypto.randomBytes(32);
    const c = encrypt(JSON.stringify(payload), key);
    return `${c.iv}.${c.data}.${key.toString("base64")}.${c.tag}`;
};

test("POST /email/verify: 200 success 'verified', or 200 error with the contract message", async () => {
    const ok = await call("POST", "/email/verify", { body: { ...SITE, security: "none", auth: undefined } });
    assert.equal(ok.status, 200);
    assert.deepEqual(ok.body, { status: "success", message: "verified" });
    const bad = await call("POST", "/email/verify", { body: { host: "127.0.0.1", port: 1, security: "none", auth: { user: "u", pass: "p" } } });
    assert.equal(bad.status, 200);
    assert.deepEqual(bad.body, { status: "error", message: "Invalid credentials. Unable to connect your smtp server." });
});

test("POST /email with config/<origin>.json: sends, From is \"<name> <from>\", answers { message: 'message sent', data: info }", async () => {
    const r = await call("POST", "/email", { headers: { origin: "https://site.example" }, body: { to: "a@example.com", subject: "Hi", content: "<p>Hello</p>", cc: "c@example.com" } });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.message, "message sent");
    assert.deepEqual(r.body.data.accepted.sort(), ["a@example.com", "c@example.com"]);
    assert.ok(r.body.data.messageId);
    const mail = received.at(-1);
    assert.match(mail.data, /^From: My Health Opinions <support@example\.com>$/m);
    assert.match(mail.data, /^Reply-To: help@example\.com$/m);
    assert.match(mail.data, /<p>Hello<\/p>/);
});

test("POST /email: origin falls back to the Host header; message { text, html } is used when given", async () => {
    // fetch cannot set Host, so a plain http request without an Origin header
    const payload = JSON.stringify({ to: ["a@example.com"], subject: "Hi", message: { text: "plain body", html: "<b>html body</b>" } });
    const r = await new Promise((resolve, reject) => {
        const req = http.request({ host: "127.0.0.1", port: PORT, path: "/email", method: "POST", headers: { host: "site.example", "content-type": "application/json", "content-length": Buffer.byteLength(payload) } }, (res) => {
            let t = ""; res.on("data", (d) => (t += d)); res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(t) }));
        });
        req.on("error", reject); req.end(payload);
    });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.message, "message sent");
    assert.match(received.at(-1).data, /plain body/);
    assert.match(received.at(-1).data, /<b>html body<\/b>/);
});

test("POST /email multipart with attachments", async () => {
    const fd = new FormData();
    fd.append("to", "a@example.com"); fd.append("subject", "Report"); fd.append("content", "<p>see file</p>");
    fd.append("attachments", new Blob(["hello file"], { type: "text/plain" }), "note.txt");
    const r = await call("POST", "/email", { headers: { origin: "site.example" }, body: fd });
    assert.equal(r.status, 200, JSON.stringify(r.body));
    assert.equal(r.body.message, "message sent");
    assert.match(received.at(-1).data, /filename=note\.txt/);
});

test("POST /email failed send: HTTP 200 { error, status: 'error', message: 'Unable to send email.' }", async () => {
    refuse = true;
    const r = await call("POST", "/email", { headers: { origin: "site.example" }, body: { to: "a@example.com", subject: "Hi", content: "x" } });
    assert.equal(r.status, 200);
    assert.deepEqual(Object.keys(r.body).sort(), ["error", "message", "status"]);
    assert.equal(r.body.status, "error");
    assert.equal(r.body.message, "Unable to send email.");
    assert.match(r.body.error, /Rejected by test/);
});

test("no config file and no creds header: 405 { headers }; an empty config file counts as missing", async () => {
    for (const origin of ["nowhere.example", "empty.example"]) {
        const r = await call("POST", "/email", { headers: { origin }, body: { to: "a@example.com", subject: "Hi", content: "x" } });
        assert.equal(r.status, 405, origin);
        assert.deepEqual(Object.keys(r.body), ["headers"]);
        assert.equal(r.body.headers.origin, origin);
    }
    assert.equal((await call("GET", "/email", { headers: { origin: "nowhere.example" } })).status, 405);
});

test("encrypted creds header: used when the origin matches, 403 when it does not, { message } when it cannot be read", async () => {
    const creds = credsHeader({ origin: "other.example", name: "Other", host: "127.0.0.1", port: smtpPort, security: "none", from: "noreply@other.example" });
    const ok = await call("POST", "/email", { headers: { origin: "other.example", creds }, body: { to: "b@example.com", subject: "Hi", content: "x" } });
    assert.equal(ok.status, 200, JSON.stringify(ok.body));
    assert.equal(ok.body.message, "message sent");
    assert.match(received.at(-1).data, /^From: Other <noreply@other\.example>$/m);

    const wrong = await call("POST", "/email", { headers: { origin: "third.example", creds }, body: { to: "b@example.com", subject: "Hi", content: "x" } });
    assert.equal(wrong.status, 403);
    assert.deepEqual(wrong.body, { status: "error", message: "Invalid request" });

    const broken = await call("POST", "/email", { headers: { origin: "other.example", creds: "a.b.c.d" }, body: { to: "b@example.com", subject: "Hi", content: "x" } });
    assert.equal(broken.status, 200);
    assert.deepEqual(Object.keys(broken.body), ["message"]);
});

test("GET /email: test mail answers { status: 'success' } (with error when the send fails)", async () => {
    const r = await call("GET", "/email", { headers: { origin: "site.example" } });
    assert.equal(r.status, 200);
    assert.equal(r.body.status, "success");
});
