import svgCaptcha from "svg-captcha";
import { CaptchaChallenge } from "../model/index.js";
import { hashSecret } from "./security.js";

// Bot protection for register, login, resend and password reset.
// Default: our own server-side challenge (letters drawn as SVG paths, so the answer is not in the page),
// single use, 10 minutes. If TURNSTILE_SECRET is set, a Cloudflare Turnstile token is accepted instead,
// which is the stronger option for production (needs the site key in the frontend).
const TTL = 10 * 60 * 1000;

export async function issueChallenge() {
    const c = svgCaptcha.create({ size: 5, noise: 3, color: true, ignoreChars: "0oO1iIlL", width: 180, height: 60 });
    const doc = await CaptchaChallenge.create({ answerHash: hashSecret(c.text.toLowerCase()), expiresAt: new Date(Date.now() + TTL) });
    const out = { id: String(doc._id), svg: c.data, expiresIn: TTL / 1000 };
    if (process.env.NODE_ENV === "test") out.testAnswer = c.text; // automated tests only; never set NODE_ENV=test in production
    return out;
}

async function verifyTurnstile(token, ip) {
    try {
        const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: String(token), remoteip: ip || "" });
        const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
        const j = await r.json();
        return Boolean(j.success);
    } catch {
        return false;
    }
}

/** true when the request carries a solved, unused challenge. Every challenge is spent on its first check. */
export async function captchaPassed(captcha, ip) {
    if (!captcha || typeof captcha !== "object") return false;
    if (captcha.turnstile && process.env.TURNSTILE_SECRET) return verifyTurnstile(captcha.turnstile, ip);
    const { id, answer } = captcha;
    if (!id || !answer || !/^[a-f0-9]{24}$/i.test(String(id))) return false;
    // spend it atomically: a second request with the same id finds nothing
    const doc = await CaptchaChallenge.findOneAndUpdate(
        { _id: id, usedAt: null, expiresAt: { $gt: new Date() } },
        { $set: { usedAt: new Date() }, $inc: { attempts: 1 } },
        { new: true }
    );
    if (!doc) return false;
    return doc.answerHash === hashSecret(String(answer).trim().toLowerCase());
}
