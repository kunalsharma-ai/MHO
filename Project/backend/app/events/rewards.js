import crypto from "crypto";
import mongoose from "mongoose";
import { eventStream, fsLogger } from "../../utils/index.js";
import { Reward, Response } from "../model/index.js";
import { REWARD_RULES } from "../config/rewardRules.js";

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const val = (x, meta) => (typeof x === "function" ? x(meta) : x);
const isDuplicate = (e) =>
    e?.duplicate || e?.code === 11000 || /already credited/i.test(e?.message ?? "");

// Purane unique index (user + reference.id) me alag-alag reward type ek jaise referenceId par
// takra sakte hain. Isliye survey ke alawa har type ke liye (source + key) se fixed id banti hai.
const derivedId = (source, key) => new mongoose.Types.ObjectId(
    crypto.createHash("sha1").update(`${source}:${key}`).digest("hex").slice(0, 24)
);

async function withRetry(fn, attempts = 3) {
    let lastErr;
    for (let i = 1; i <= attempts; i++) {
        try { return await fn(); }
        catch (err) {
            lastErr = err;
            if (i < attempts) await sleep(250 * i);
        }
    }
    throw lastErr;
}

async function grant(type, payload = {}) {
    const { user, origin, referenceId, meta = {}, points, status = "Approved" } = payload;
    const rule = REWARD_RULES[type];
    const source = rule && val(rule.source, meta);
    const amount = Number(points ?? rule?.points);

    if (!rule || !user || !origin || !referenceId || !source || !Number.isFinite(amount)) {
        fsLogger.Log("Reward skipped: invalid payload", {
            type, user: String(user), origin, referenceId: String(referenceId)
        });
        return;
    }
    if (amount <= 0) return;

    const refId = type === "survey" ? referenceId : derivedId(source, referenceId);
    try {
        await withRetry(async () => {
            try {
                await Reward.credit({
                    user, origin,
                    activity: val(rule.activity, meta),
                    reward: amount,
                    reference: { id: refId, source },
                    status
                });
            } catch (err) {
                if (!isDuplicate(err)) throw err; // pehle se mil chuka hai
            }
        });
    } catch (err) {
        fsLogger.Log("Reward credit FAILED", {
            type, user: String(user), referenceId: String(referenceId), error: err.message
        });
        throw err;
    }
}

// Jahan bhi baad me koi emit lagega, wahan se yahi event aayega
eventStream.onEvent("reward-earned", (p = {}) => grant(p.type, p));

// Survey: emit save se pehle hota hai, isliye DB me "complete" hone ka intezaar
async function waitForComplete(id, tries = 10, delay = 1000) {
    for (let i = 0; i < tries; i++) {
        const doc = await Response.findById(id).select("user origin survey points status").lean();
        if (doc?.status === "complete") return doc;
        await sleep(delay);
    }
    return null;
}

eventStream.onEvent("survey-internal-completed", async ({ response }) => {
    const doc = await waitForComplete(response._id);
    if (!doc) {
        fsLogger.Log("Reward skipped: response not complete in DB", { response: String(response?._id) });
        return;
    }
    await grant("survey", {
        user: doc.user,
        origin: doc.origin,
        referenceId: doc._id,
        points: doc.points,
        meta: { name: doc.survey?.name }
    });
});

// Signup bonus (rewardRules me signup ke points 0 hain to tab tak kuch nahi hoga)
eventStream.onEvent("user-created", (data) =>
    grant("signup", { user: data._id, origin: data.origin, referenceId: data._id }));