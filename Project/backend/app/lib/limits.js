import rateLimit from "express-rate-limit";
import { clientIp } from "./security.js";

// Per-IP limits on the account endpoints (in memory, per API container).
const SCALE = Math.max(1, Number(process.env.MHO_RATE_LIMIT_SCALE) || 1); // test runs raise the ceilings; production leaves it at 1
const make = (windowMs, limit, message) =>
    rateLimit({
        windowMs,
        limit: limit * SCALE,
        standardHeaders: "draft-7",
        legacyHeaders: false,
        keyGenerator: (req) => clientIp(req),
        validate: false,
        handler: (req, res) => res.status(429).json({ status: "error", code: "RATE_LIMITED", message }),
    });

export const limits = {
    captcha: make(60 * 1000, 30, "Too many requests. Please wait a minute and try again."),
    register: make(60 * 60 * 1000, 10, "Too many sign-up attempts from this network. Please try again in an hour."),
    login: make(15 * 60 * 1000, 20, "Too many login attempts. Please wait 15 minutes and try again."),
    email: make(60 * 60 * 1000, 6, "Too many email requests. Please try again in an hour."),
    token: make(15 * 60 * 1000, 30, "Too many attempts. Please wait 15 minutes and try again."),
    consent: make(15 * 60 * 1000, 30, "Too many attempts. Please try again shortly."),
};
