import crypto from "crypto";

const pepper = () => process.env.TOKEN_PEPPER || process.env.JWT_SECRET || "";

/** 256-bit URL-safe random token for email links. */
export const newToken = () => crypto.randomBytes(32).toString("base64url");

/** What is stored for a token or a CAPTCHA answer: never the value itself. */
export const hashSecret = (value) =>
    crypto.createHmac("sha256", pepper()).update(String(value)).digest("hex");

/** Salted, shortened hash of an IP for audit trails (the consent schema asks for this, not the raw IP). */
export const ipHash = (ip) =>
    ip ? crypto.createHmac("sha256", `ip:${pepper()}`).update(String(ip)).digest("hex").slice(0, 16) : null;

export const safeEqual = (a, b) => {
    const x = Buffer.from(String(a));
    const y = Buffer.from(String(b));
    return x.length === y.length && crypto.timingSafeEqual(x, y);
};

/**
 * Same policy the website shows (frontend-1 utils/helpers.js validatePassword): 8–128 characters and at
 * least three of capital letters, small letters, numbers and symbols. Returns "" when the password is fine.
 */
export function passwordProblem(password, { email } = {}) {
    const pw = String(password || "");
    if (!pw) return "Please create a password.";
    if (pw.length < 8) return "Use at least 8 characters.";
    if (pw.length > 128) return "Use at most 128 characters.";
    const kinds = [/[A-Z]/, /[a-z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(pw)).length;
    if (kinds < 3) return "Use at least three of these: capital letters, small letters, numbers, symbols.";
    const local = String(email || "").split("@")[0].toLowerCase();
    if (local.length >= 4 && pw.toLowerCase().includes(local)) return "Your password must not contain your email address.";
    return "";
}

/** The caller's IP, read only through proxies listed in MHO_TRUSTED_PROXIES (see utils/clientIp.js). */
export { clientIp } from "../../utils/clientIp.js";
