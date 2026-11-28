import fs from "fs";
import express from 'express';
import Mail from './utils/Mail.js';
import fileUpload from "express-fileupload";
import { decrypt } from "encryption-aes";
const port = process.env.port || 3000;
function getOrigin(data) {
    if (/^https?:\/\//i.test(data)) {
        return new URL(data).hostname; // 'domain.tld'
    }
    return String(data || "").replace(/:\d+$/, "").toLowerCase();
}

// Credentials for /email (email service API contract, openapi.yml): config/<origin>.json when it exists, otherwise the
// encrypted `creds` header, otherwise 405. A config file that is empty or not valid JSON counts as missing (it used to
// crash every request with an HTML 500 page, issue #42), and the reason is logged, never the password.
function readConfig(name) {
    const file = `config/${name}.json`;
    if (!/^[a-z0-9.-]+$/.test(name) || !fs.existsSync(file)) return null;
    try {
        const text = fs.readFileSync(file, "utf-8").trim();
        if (!text) { console.error(`[email] ${file} is empty: no SMTP settings for ${name}`); return null; }
        const c = JSON.parse(text);
        if (!c || !c.host) { console.error(`[email] ${file} has no "host": no SMTP settings for ${name}`); return null; }
        return c;
    } catch (error) {
        console.error(`[email] ${file} is not valid JSON (${error.message})`);
        return null;
    }
}
// Issue #46 ("unable to send mail"): the log only showed the SMTP settings (password included) and never said why the
// send failed. At start-up, log in once to every SMTP server this service knows and print one line per site:
// "SMTP ok" or the server's own reason (wrong password, port blocked, ...). Never the password.
async function smtpSelfCheck() {
    const sites = new Map();
    let files = [];
    try { files = fs.readdirSync("config").filter((f) => f.endsWith(".json")); } catch { /* no config folder */ }
    for (const f of files) {
        const name = f.slice(0, -5);
        const c = readConfig(name);
        if (c) sites.set(name, c);
    }
    if (!sites.size) console.error("[email] no SMTP settings: add config/<site>.json (or send the encrypted creds header)");
    for (const [site, c] of sites) {
        const where = `${c.host}:${c.port || 587}${c.secure ? " (ssl)" : ""} as ${c.auth?.user && c.auth?.pass ? c.auth.user : "(no login)"}`;
        try {
            await new Mail(c).verify();
            console.log(`[email] SMTP ok for ${site}: ${where}`);
        } catch (error) {
            console.error(`[email] SMTP FAILED for ${site}: ${where}: ${error.code || ""} ${error.message}`);
        }
    }
}
const sender = (c) => {
    const from = c.from || c.auth?.user;
    return c.name && from ? `${c.name} <${from}>` : from;
};

(async () => {
    const app = express();
    app
        .use([
            (req, res, next) => {
                req.origin = getOrigin(req.headers.origin ?? req.headers.host);
                req.creds = readConfig(req.origin);
                next();
            },
            express.static('public'),
            express.json(),
            express.urlencoded({
                extended: true,
            }),
            fileUpload(),
        ])
        .post("/email/verify", async (r, s) => {
            try {
                let data=r.body;
                const mail = new Mail({
                    name: data.name,
                    host: data.host,
                    port: data.port,
                    secure: ["ssl", "tls"].includes(data.security),
                    auth: data.auth,
                    from: data.from,
                    replyTo: data.replyTo
                });
                await mail.verify();
                return s.json({
                    status:"success",
                    message:"verified"
                });
            } catch (error) {
                console.log(error)
                return s.json({
                    status: "error",
                    message: "Invalid credentials. Unable to connect your smtp server."
                })
            }
        })
        .use("/email", async (r, s, n) => {
            try {
                if(r.creds)return n();
                if (r?.headers?.creds) {
                    const creds = r.headers.creds.split(".");
                    const temp = decrypt({
                        iv: creds[0],
                        data: creds[1],
                        tag: creds[3]
                    }, Buffer.from(creds[2], "base64"))
                    let data = JSON.parse(temp)
                    if (data.origin !== r.origin)
                        return s.status(403).json({
                            status: "error",
                            message: "Invalid request"
                        })

                    r.creds = {
                        name: data.name,
                        host: data.host,
                        port: data.port,
                        secure: ["ssl", "tls"].includes(data.security),
                        auth: data.auth,
                        from: data.from,
                        replyTo: data.replyTo
                    };
                    return n();
                }
                console.error(`[email] no SMTP settings for ${r.origin}: add config/${r.origin}.json or send the creds header`);
                return s.status(405).json({ headers: r.headers })

            } catch (error) {
                console.log(error.message);
                return s.json({ message: error.message })
            }
        })
        .get("/email", async (r, s) => {
            try {
                // console.log(r.creds)
                // return s.json({
                //     ...r.creds
                // })
                const mail = new Mail(r.creds);
                const status = await mail.send(
                    "Sampledge App <om.tiwari@frequentresearch.com",
                    "optiwari.india@gmail.com",
                    "test mail",
                    {
                        html: "<b>It Works</b>",
                        text: "Chal Gaya"
                    },
                    "sanjeet@frequentresearch.com", "om.tiwari@frequentresearch.com"
                )
                console.log({ status })
                s.json({
                    status: "success",
                    data: r.data
                })
            } catch (error) {
                console.log({ error })
                s.json({
                    status: "success",
                    data: r.data,
                    error: error.message
                })
            }

        })
        .post("/email", async (r, s, n) => {
            try {
                console.log(`[${new Date()}] Sending Mail to ${r.body.to}`);
                const mail = new Mail(r.creds);
                const from = sender(r.creds);
                const to = r.body.to;
                const subject = r.body.subject;
                const message = r.body.message ?? { html: r.body.content };
                let [cc, bcc, attachments] = []
                if (r.body.cc) cc = r.body.cc;
                if (r.body.bcc) bcc = r.body.bcc;
                if (r?.files?.attachments) {
                    let temp = r.files.attachments;
                    attachments = (temp instanceof Array) ? temp.map((e) => {
                        if (e.url) return { filename: e.name, url: e.url }
                        return {
                            filename: e.name,
                            content: e.data
                        }
                    }) : temp.url ? [{
                        filename: temp.name,
                        url: temp.url
                    }] : temp.name ? [{
                        filename: temp.name,
                        content: temp.data
                    }] : []
                }
                let resp = await mail.send(from, to, subject, message, cc, bcc, attachments)
                return s.json({
                    message: "message sent",
                    data: resp
                })

            } catch (error) {
                // never log r.creds: it holds the SMTP password
                console.error(`[email] sending to ${r.body?.to} for ${r.origin} failed: ${error.message}`)
                return s.json({ error: error.message, status: "error", message: "Unable to send email." })
            }
        })
    app.listen(port, () => {
        console.log(`[${new Date()}]: Started on port ${port}`);
        smtpSelfCheck();
    })
})();