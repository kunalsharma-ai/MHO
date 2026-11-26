// Member points, kept in ONE place: the Reward ledger (model/Rewards.js, one row per credit or payout).
//
// Before this file the member area added points up in the browser from fields the ledger does not have
// (points / remarks), and paid profiles with PUT /api/v1/rewards, which only throws "under development". So every
// header, dial and counter showed 0 and no profile was ever paid (Kunal, 2026-11-26).
//
// syncPoints(user) makes the ledger complete before it is read. Every credit has a fixed reference id, and the ledger
// has a unique index on (user, reference.id), so running it again never pays twice:
//   survey    each completed Response (its own _id, as controller/Response.js already credits it) .. Response.points
//   profile   each profile section the server counts as complete (lib/profileStatus.js) ........... its points (50 default)
//   referral  each friend who joined with the member's link and verified their email ............ 100
// Survey credits start "Pending" (an admin approves or rejects them on the Responses page); the others are "Approved".
// Rejected credits do not count. Payouts are negative rows (Reward.debit).
import crypto from "crypto";
import mongoose from "mongoose";
import { profileStatus } from "./profileStatus.js";

export const PROFILE_POINTS = 50;
export const REFERRAL_POINTS = 100;
// Payout level and value of a point. 2,500 is what GET /api/v1/me/points has always answered; 1,000 points = $1.00 is what
// all three panel designs show ("1,000 points = $1.00"). Both can be set per server without a code change.
export const PAYOUT_THRESHOLD = Number(process.env.MHO_PAYOUT_THRESHOLD) > 0 ? Number(process.env.MHO_PAYOUT_THRESHOLD) : 2500;
export const CONVERSION_RATE = Number(process.env.MHO_POINTS_PER_USD) > 0 ? 1 / Number(process.env.MHO_POINTS_PER_USD) : 0.001;
const SOURCE = { survey: "Response", profile: "Profile", referral: "Referral" };

// a stable ObjectId for credits that have no record of their own (a profile section, a referred friend)
export const refId = (source, key) =>
    new mongoose.Types.ObjectId(crypto.createHash("sha1").update(`${source}:${key}`).digest("hex").slice(0, 24));

const norm = (v) => String(v ?? "").trim().toLowerCase();

async function credit(user, { activity, reward, id, source, status }) {
    const Reward = mongoose.model("Reward");
    if (!(Number(reward) > 0)) return false;
    try {
        await Reward.credit({ user: user._id, origin: user.origin, activity, reward: Number(reward), reference: { id, source }, status });
        return true;
    } catch (e) {
        if (e?.code === 11000 || /already credited/i.test(e?.message || "")) return false;
        throw e;
    }
}

/** Credits everything the member has earned and is not in the ledger yet. Resolves to { added, profiles }. */
export async function syncPoints(user) {
    const Reward = mongoose.model("Reward");
    const Response = mongoose.model("Response");
    const User = mongoose.model("User");
    const have = new Set((await Reward.find({ user: user._id }).select("reference.id").lean()).map((r) => String(r.reference?.id)));
    let added = 0;
    const add = async (row) => { if (!have.has(String(row.id)) && (await credit(user, row))) { have.add(String(row.id)); added += 1; } };

    // surveys
    const done = await Response.find({ user: user._id, status: "complete", isDeleted: { $ne: true } }).select("survey points").lean();
    for (const r of done) {
        await add({ id: r._id, source: SOURCE.survey, reward: r.points, activity: `Survey: ${r.survey?.name || r.survey?.slug || "research survey"}`, status: "Pending" });
    }

    // profile sections, with the same completion rules as the header and dashboard percentages
    const status = await profileStatus(user).catch(() => ({ sections: [] }));
    const complete = (status.sections || []).filter((s) => s.status === "complete");
    for (const s of complete) {
        await add({ id: refId(SOURCE.profile, `${user._id}:${norm(s.slug)}`), source: SOURCE.profile, reward: Number(s.points) || PROFILE_POINTS, activity: `Profile completed: ${s.name}`, status: "Approved" });
    }

    // referred friends with a verified email
    const friends = await User.find({ referredBy: String(user._id), origin: user.origin, "isVerified.email": "verified" }).select("_id name").limit(1000).lean().catch(() => []);
    for (const f of friends) {
        await add({ id: refId(SOURCE.referral, `${user._id}:${f._id}`), source: SOURCE.referral, reward: REFERRAL_POINTS, activity: `Friend joined: ${f.name?.first || "a friend"}`, status: "Approved" });
    }
    // profiles: the completed sections, so the section packages can mark their cards as done and paid
    return { added, profiles: complete.map((s) => ({ slug: s.slug, name: s.name, points: Number(s.points) || PROFILE_POINTS })) };
}

const kindOf = (r) => (Number(r.reward) < 0 ? "payout" : ({ Response: "survey", Profile: "profile", Referral: "referral" })[r.reference?.source] || "other");

/** The ledger as the member area shows it, newest first. */
export async function ledgerFor(user) {
    const Reward = mongoose.model("Reward");
    const rows = await Reward.find({ user: user._id, isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean();
    return rows.map((r) => ({
        _id: r._id, kind: kindOf(r), activity: r.activity, points: Number(r.reward) || 0, status: r.status,
        source: r.reference?.source || null, reference: r.reference?.id || null, createdAt: r.createdAt,
    }));
}

/** Balance and breakdown. points = everything earned and not rejected, minus payouts. */
export function summarize(rows) {
    const live = rows.filter((r) => r.status !== "Rejected");
    const sum = (list) => list.reduce((a, r) => a + r.points, 0);
    const earned = live.filter((r) => r.points > 0);
    const paidOut = -sum(live.filter((r) => r.points < 0));
    const by = (k) => sum(earned.filter((r) => r.kind === k));
    const points = sum(earned) - paidOut;
    return {
        totalPoints: points,
        approvedPoints: sum(earned.filter((r) => r.status === "Approved")) - paidOut,
        pendingPoints: sum(earned.filter((r) => r.status === "Pending")),
        redeemPoints: paidOut,
        respPoints: by("survey"),
        bySource: { survey: by("survey"), profile: by("profile"), referral: by("referral"), other: by("other") },
        threshold: PAYOUT_THRESHOLD,
        conversionRate: CONVERSION_RATE,
    };
}

/** The balance and the ledger, without syncing first. */
export async function readPoints(user) {
    const rows = await ledgerFor(user);
    return { ...summarize(rows), history: rows };
}

/** Sync, then read: what GET /api/v1/me/points answers. */
export async function pointsFor(user) {
    const { added, profiles } = await syncPoints(user);
    return { ...(await readPoints(user)), added, profiles };
}
