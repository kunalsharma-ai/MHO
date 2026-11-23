import { AuthToken } from "../model/index.js";
import { newToken, hashSecret, ipHash } from "./security.js";

export const TOKEN_TTL = {
    "verify-email": 24 * 60 * 60 * 1000, // the supplied mailers say the link works for 24 hours
    "reset-password": 24 * 60 * 60 * 1000, // the supplied forgot-password mailer says "valid 24 hours"
};
const MAX_ATTEMPTS = 5;

/** Issues a new single-use token and voids any earlier unused one of the same purpose. Returns the raw token (for the email only). */
export async function issueToken(userId, purpose, origin, ip) {
    await AuthToken.updateMany({ user: userId, purpose, usedAt: null }, { $set: { usedAt: new Date() } });
    const raw = newToken();
    await AuthToken.create({
        user: userId,
        purpose,
        origin,
        tokenHash: hashSecret(raw),
        expiresAt: new Date(Date.now() + TOKEN_TTL[purpose]),
        requestedFrom: ipHash(ip),
    });
    return raw;
}

/**
 * Looks a token up without spending it. Returns { state: "valid" | "expired" | "used" | "invalid", token }.
 * Unknown tokens count as an attempt against the user's live token, so a link cannot be guessed.
 */
export async function inspectToken(userId, purpose, raw) {
    if (!userId || !raw || !/^[a-f0-9]{24}$/i.test(String(userId))) return { state: "invalid" };
    const token = await AuthToken.findOne({ user: userId, purpose, tokenHash: hashSecret(raw) });
    if (!token) {
        await AuthToken.updateMany({ user: userId, purpose, usedAt: null }, { $inc: { attempts: 1 } });
        await AuthToken.updateMany({ user: userId, purpose, usedAt: null, attempts: { $gte: MAX_ATTEMPTS } }, { $set: { usedAt: new Date() } });
        return { state: "invalid" };
    }
    if (token.usedAt) return { state: "used", token };
    if (token.expiresAt <= new Date()) return { state: "expired", token };
    return { state: "valid", token };
}

/** Spends a token atomically; returns true only for the one request that spent it. */
export async function spendToken(token) {
    const r = await AuthToken.updateOne({ _id: token._id, usedAt: null, expiresAt: { $gt: new Date() } }, { $set: { usedAt: new Date() } });
    return r.modifiedCount === 1;
}
