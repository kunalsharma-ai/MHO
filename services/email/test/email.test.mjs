// The email service (services/email): which SMTP settings it picks for a site, how it talks to the SMTP server, and
// what it answers when a mail cannot go out. Runs the real server.js against a stand-in SMTP server started here, so
// no real mail is sent and no outside host is needed.
//
//   cd services/email/test && npm install && npm test
//
// Background: issue #42 (empty config files, HELO name "My Health Opinions"), #46 (SMTP password in the log, no reason
// for the failure) and PR #51 (a relay with a user but no password must send without logging in).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const SERVICE = path.resolve(here, "..");
const SECRET = "Very-Secret-Smtp-Pass-913"; // must never show in a log or an answer

/* ---------- stand-in SMTP server ---------- */
// Records every session: the EHLO name, whether AUTH was used, MAIL FROM, RCPT TO and the message. A recipient
// containing "reject" gets "550 mailbox unavailable"; a password other than SECRET gets "535 bad login".
function smtpServer() {
    const sessions = [];
    const srv = net.createServer((sock) => {
        const s = { ehlo: "", auth: null, from: "", to: [], data: "" };
        sessions.push(s);
        let buf = "";
        let inData = false;
        const say = (line) => sock.write(`${line}\r\n`);
        say("220 stub.smtp ESMTP ready");
        sock.on("data", (chunk) => {
            buf += chunk.toString("utf8");
            for (;;) {
                if (inData) {
                    const end = buf.indexOf("\r\n.\r\n");
                    if (end < 0) return;
                    s.data += buf.slice(0, end);
                    buf = buf.slice(end + 5);
                    inData = false;
                    say("250 2.0.0 queued as STUB1");
                    continue;
                }
                const i = buf.indexOf("\r\n");
                if (i < 0) return;
                const line = buf.slice(0, i);
                buf = buf.slice(i + 2);
                const cmd = line.toUpperCase();
                if (cmd.startsWith("EHLO") || cmd.startsWith("HELO")) {
                    s.ehlo = line.slice(5).trim();
                    sock.write("250-stub.smtp\r\n250-AUTH PLAIN LOGIN\r\n250 8BITMIME\r\n");
                } else if (cmd.startsWith("AUTH PLAIN")) {
                    const [, user, pass] = Buffer.from(line.slice(11).trim(), "base64").toString("utf8").split("\0");
                    s.auth = { user, passOk: pass === SECRET };
                    say(pass === SECRET ? "235 2.7.0 ok" : "535 5.7.8 bad login");
                } else if (cmd.startsWith("MAIL FROM")) {
                    s.from = line.slice(10).trim();
                    say("250 ok");
                } else if (cmd.startsWith("RCPT TO")) {
                    const to = line.slice(8).trim();
                    if (/reject/i.test(to)) { say("550 5.1.1 mailbox unavailable"); continue; }
                    s.to.push(to);
                    say("250 ok");
                } else if (cmd === "DATA") {
                    inData = true;
                    say("354 go ahead");
                } else if (cmd === "QUIT") {
                    say("221 bye");
                    sock.end();
                } else if (cmd === "RSET" || cmd === "NOOP") {
                    say("250 ok");
                } else {
                    say("502 not here");
                }
            }
        });
        sock.on("error", () => {});
    });
    return { srv, sessions };
}

/* ---------- the email service, copied to a folder with test config files ---------- */
let smtp;
let smtpPort;
const services = [];

async function startService({ config = {}, env = {} } = {}) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mho-email-"));
    fs.copyFileSync(path.join(SERVICE, "server.js"), path.join(dir, "server.js"));
    fs.cpSync(path.join(SERVICE, "utils"), path.join(dir, "utils"), { recursive: true });
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ type: "module" }));
    fs.symlinkSync(path.join(here, "node_modules"), path.join(dir, "node_modules"), "dir");
    fs.mkdirSync(path.join(dir, "config"));
    for (const [name, body] of Object.entries(config)) {
        fs.writeFileSync(path.join(dir, "config", `${name}.json`), typeof body === "string" ? body : JSON.stringify(body));
    }
    const port = 20000 + Math.floor(Math.random() * 20000);
    const clean = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith("SMTP_")));
    const child = spawn(process.execPath, ["server.js"], { cwd: dir, env: { ...clean, port: String(port), ...env }, stdio: ["ignore", "pipe", "pipe"] });
    const svc = { child, dir, port, log: "" };
    child.stdout.on("data", (d) => { svc.log += d; });
    child.stderr.on("data", (d) => { svc.log += d; });
    services.push(svc);
    for (let i = 0; i < 100; i++) {
        if (/Started on port/.test(svc.log)) break;
        await new Promise((r) => setTimeout(r, 50));
    }
    assert.match(svc.log, /Started on port/, svc.log);
    return svc;
}
// node:http, not fetch: fetch does not let a test set the Host header, and the service picks the site from it
function send(svc, host, body) {
    const raw = JSON.stringify(body);
    return new Promise((resolve, reject) => {
        const req = http.request({ host: "127.0.0.1", port: svc.port, method: "POST", path: "/email", headers: { host, "content-type": "application/json", "content-length": Buffer.byteLength(raw) } }, (res) => {
            let text = "";
            res.on("data", (c) => { text += c; });
            res.on("end", () => { let json = null; try { json = JSON.parse(text); } catch { /* not JSON */ } resolve({ status: res.statusCode, json, text }); });
        });
        req.on("error", reject);
        req.end(raw);
    });
}
const waitFor = async (fn, ms = 4000) => {
    const end = Date.now() + ms;
    while (Date.now() < end) { if (fn()) return true; await new Promise((r) => setTimeout(r, 50)); }
    return false;
};
const relay = (over = {}) => ({ host: "127.0.0.1", port: smtpPort, secure: false, ignoreTLS: true, from: "support@myhealthopinions.com", name: "My Health Opinions", ...over });
const MAIL = { to: "member@example.com", subject: "Verify your email", content: "<p>Hello</p>" };

before(async () => {
    smtp = smtpServer();
    await new Promise((r) => smtp.srv.listen(0, "127.0.0.1", r));
    smtpPort = smtp.srv.address().port;
});
after(() => {
    for (const s of services) { s.child.kill(); fs.rmSync(s.dir, { recursive: true, force: true }); }
    smtp.srv.close();
});
const newSessions = (from) => smtp.sessions.slice(from);

/* ---------- picking the SMTP settings for a site ---------- */

test("a site's config file is used, and the mail reaches the SMTP server with the right sender and recipient", async () => {
    const svc = await startService({ config: { "mho.test": relay() } });
    const start = smtp.sessions.length;
    const r = await send(svc, "mho.test", MAIL);
    assert.equal(r.status, 200, r.text);
    assert.equal(r.json.message, "message sent");
    const s = newSessions(start).find((x) => x.to.length);
    assert.ok(s, "a mail session");
    assert.equal(s.from, "<support@myhealthopinions.com>");
    assert.deepEqual(s.to, ["<member@example.com>"]);
    assert.match(s.data, /^From: My Health Opinions <support@myhealthopinions\.com>/m, "display name in the From line");
    assert.match(s.data, /^Subject: Verify your email/m);
    assert.match(s.data, /<p>Hello<\/p>/);
});

test("#42: the display name is never the HELO/EHLO name", async () => {
    const svc = await startService({ config: { "mho.test": relay() } });
    const start = smtp.sessions.length;
    await send(svc, "mho.test", MAIL);
    for (const s of newSessions(start)) {
        assert.notEqual(s.ehlo, "My Health Opinions");
        assert.ok(!/\s/.test(s.ehlo), `EHLO name "${s.ehlo}" is a host name`);
    }
});

test("www. and the bare domain share one config file, either way round", async () => {
    const svc = await startService({ config: { "myhealthopinions.test": relay({ from: "bare@myhealthopinions.test" }) } });
    const start = smtp.sessions.length;
    const r = await send(svc, "www.myhealthopinions.test", MAIL);
    assert.equal(r.status, 200, r.text);
    assert.equal(newSessions(start).find((x) => x.to.length).from, "<bare@myhealthopinions.test>");
    const svc2 = await startService({ config: { "www.other.test": relay({ from: "www@other.test" }) } });
    const start2 = smtp.sessions.length;
    assert.equal((await send(svc2, "other.test", MAIL)).status, 200);
    assert.equal(newSessions(start2).find((x) => x.to.length).from, "<www@other.test>");
});

test("the port in the Host header is ignored when finding the config file", async () => {
    const svc = await startService({ config: { "mho.test": relay() } });
    assert.equal((await send(svc, "mho.test:8080", MAIL)).status, 200);
});

test("#42: an empty or broken config file falls back to the SMTP_* settings of the env file", async () => {
    for (const broken of ["", "   ", "{not json", JSON.stringify({ port: 25 })]) {
        const svc = await startService({
            config: { "mho.test": broken },
            env: { SMTP_HOST: "127.0.0.1", SMTP_PORT: String(smtpPort), SMTP_SECURE: "false", SMTP_FROM: "env@myhealthopinions.com", SMTP_FROM_NAME: "MHO Env" },
        });
        const start = smtp.sessions.length;
        const r = await send(svc, "mho.test", MAIL);
        assert.equal(r.status, 200, `${JSON.stringify(broken)}: ${r.text}\n${svc.log}`);
        const s = newSessions(start).find((x) => x.to.length);
        assert.equal(s.from, "<env@myhealthopinions.com>");
        assert.match(s.data, /^From: MHO Env <env@myhealthopinions\.com>/m);
        assert.match(svc.log, /\[email\] config\/mho\.test\.json (is empty|is not valid JSON|has no "host")/, svc.log);
    }
});

test("SMTP_* settings with a login: AUTH is used with that user and password", async () => {
    const svc = await startService({ env: { SMTP_HOST: "127.0.0.1", SMTP_PORT: String(smtpPort), SMTP_SECURE: "false", SMTP_USER: "support@myhealthopinions.com", SMTP_PASS: SECRET } });
    const start = smtp.sessions.length;
    const r = await send(svc, "no-config.test", MAIL);
    assert.equal(r.status, 200, r.text);
    const s = newSessions(start).find((x) => x.to.length);
    assert.deepEqual(s.auth, { user: "support@myhealthopinions.com", passOk: true });
    assert.equal(s.from, "<support@myhealthopinions.com>", "SMTP_FROM defaults to SMTP_USER");
});

/* ---------- PR #51: a relay with a user and no password ---------- */

test("a relay with a user but no password sends without logging in (no 'Missing credentials for PLAIN')", async () => {
    const svc = await startService({ config: { "mho.localhost": relay({ auth: { user: "support@myhealthopinions.com" } }) } });
    const start = smtp.sessions.length;
    const r = await send(svc, "mho.localhost", MAIL);
    assert.equal(r.status, 200, `${r.text}\n${svc.log}`);
    const s = newSessions(start).find((x) => x.to.length);
    assert.equal(s.auth, null, "no AUTH command");
    assert.ok(!/Missing credentials/.test(svc.log));
});

test("a relay with an empty password is treated the same as no password", async () => {
    const svc = await startService({ config: { "mho.localhost": relay({ auth: { user: "support@myhealthopinions.com", pass: "" } }) } });
    const start = smtp.sessions.length;
    assert.equal((await send(svc, "mho.localhost", MAIL)).status, 200);
    assert.equal(newSessions(start).find((x) => x.to.length).auth, null);
});

test("a server with a user and password logs in", async () => {
    const svc = await startService({ config: { "mho.test": relay({ auth: { user: "support@myhealthopinions.com", pass: SECRET } }) } });
    const start = smtp.sessions.length;
    assert.equal((await send(svc, "mho.test", MAIL)).status, 200);
    assert.deepEqual(newSessions(start).find((x) => x.to.length).auth, { user: "support@myhealthopinions.com", passOk: true });
});

/* ---------- failures: a JSON 502 with the reason in the log, never the password ---------- */

test("#46: a wrong password → 502 JSON, the reason is logged, the password is not", async () => {
    const wrong = "Wrong-Pass-Never-Logged-77";
    const svc = await startService({ config: { "mho.test": relay({ auth: { user: "support@myhealthopinions.com", pass: wrong } }) } });
    const r = await send(svc, "mho.test", MAIL);
    assert.equal(r.status, 502, r.text);
    assert.equal(r.json.status, "error");
    assert.equal(r.json.message, "Unable to send email.");
    assert.ok(await waitFor(() => /sending to member@example\.com for mho\.test failed/.test(svc.log)), svc.log);
    assert.ok(!svc.log.includes(wrong), "password not in the log");
    assert.ok(!r.text.includes(wrong), "password not in the answer");
});

test("a recipient the SMTP server refuses → 502 JSON, not a success", async () => {
    const svc = await startService({ config: { "mho.test": relay() } });
    const r = await send(svc, "mho.test", { ...MAIL, to: "reject-me@example.com" });
    assert.equal(r.status, 502, r.text);
    assert.equal(r.json.status, "error");
});

test("#42: no SMTP settings at all → 503 JSON naming the site, never an HTML error page", async () => {
    const svc = await startService({ config: { "mho.test": "" } });
    const r = await send(svc, "mho.test", MAIL);
    assert.equal(r.status, 503, r.text);
    assert.equal(r.json.message, "No SMTP settings for mho.test.");
    assert.ok(r.json, `JSON answer, got: ${r.text.slice(0, 80)}`);
    assert.equal(r.json.status, "error");
    assert.ok(await waitFor(() => /no SMTP settings at all/.test(svc.log)), svc.log);
});

test("an SMTP server that cannot be reached → 502 JSON within the time limit", async () => {
    const closed = net.createServer();
    await new Promise((r) => closed.listen(0, "127.0.0.1", r));
    const deadPort = closed.address().port;
    await new Promise((r) => closed.close(r));
    const svc = await startService({ config: { "mho.test": relay({ port: deadPort }) } });
    const t = Date.now();
    const r = await send(svc, "mho.test", MAIL);
    assert.equal(r.status, 502, r.text);
    assert.ok(Date.now() - t < 15000);
});

test("a Host header that is not a plain site name never reads a file outside config/", async () => {
    const svc = await startService({ env: {} });
    fs.writeFileSync(path.join(svc.dir, "evil.json"), JSON.stringify(relay()));
    const start = smtp.sessions.length;
    const r = await send(svc, "../evil", MAIL);
    assert.equal(r.status, 503, r.text);
    assert.equal(newSessions(start).filter((x) => x.to.length).length, 0, "nothing sent with the file outside config/");
});

/* ---------- start-up self-check (#46) ---------- */

test("#46: at start-up every site's SMTP login is checked once, with 'SMTP ok' or 'SMTP FAILED' and no password", async () => {
    const svc = await startService({
        config: {
            "good.test": relay({ auth: { user: "ok@myhealthopinions.com", pass: SECRET } }),
            "bad.test": relay({ auth: { user: "bad@myhealthopinions.com", pass: "Not-The-Secret-55" } }),
            "relay.test": relay({ auth: { user: "relay@myhealthopinions.com" } }),
        },
    });
    assert.ok(await waitFor(() => /SMTP ok for good\.test/.test(svc.log) && /SMTP FAILED for bad\.test/.test(svc.log) && /SMTP ok for relay\.test/.test(svc.log)), svc.log);
    assert.match(svc.log, /SMTP ok for good\.test: 127\.0\.0\.1:\d+ as ok@myhealthopinions\.com/);
    assert.match(svc.log, /SMTP ok for relay\.test: .* as \(no login\)/);
    assert.ok(!svc.log.includes(SECRET), "password not in the log");
    assert.ok(!svc.log.includes("Not-The-Secret-55"), "wrong password not in the log");
});

test("the public gateway route to this service stays removed (it was an open relay)", () => {
    const conf = path.resolve(SERVICE, "../gateway");
    if (!fs.existsSync(conf)) return;
    const files = fs.readdirSync(conf, { recursive: true }).filter((f) => /\.conf$/.test(String(f)));
    for (const f of files) {
        const text = fs.readFileSync(path.join(conf, String(f)), "utf8");
        assert.ok(!/location\s+[^{]*\/email\b[^{]*\{[^}]*proxy_pass[^}]*email/s.test(text), `${f} proxies /email to the email service`);
    }
});
