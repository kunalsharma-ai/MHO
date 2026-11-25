// Teen members and their parents: who may change which profile answer, and the log of every change.
//
// The rules, enforced here for every route that saves profile answers:
//   - A teen member (category "minor patient") answers from their own login. Their linked parent may answer for them
//     from the parent's own login, once the parent has approved the link (GuardianLink status "approved").
//   - Every answer records who gave it (Answer.answeredBy / answeredByRole). Only that person may change or clear it
//     later. The other person can still see it. Answers saved before this rule existed belong to the member.
//   - A teen's answers, by either person, are limited to the questions the bank tags "minor patient".
//   - Every change, and every change the server refused, is written to the append-only AnswerAudit log.
// Adult members are unaffected: they are the only person who can answer for themselves, as before.
import { Answers, AnswerAudit, GuardianLink, Question } from "../model/index.js";
import { newToken, hashSecret, ipHash, safeEqual } from "./security.js";

export const MINOR_CATEGORY = "minor patient";
export const LINK_TTL = 7 * 24 * 60 * 60 * 1000; // the parent's approval link works for 7 days
const MAX_ATTEMPTS = 5;

const norm = (v) => String(v ?? "").trim().toLowerCase();
export const isMinor = (user) => norm(user?.category) === MINOR_CATEGORY;

/* ---------------------------------------------------------------- links */
export const approvedLink = (minorId, origin) => GuardianLink.findOne({ minor: minorId, origin, status: "approved" }).lean();
export const latestLink = (minorId, origin) => GuardianLink.findOne({ minor: minorId, origin }).sort({ requestedAt: -1, _id: -1 });
export const childrenOf = (parentId, origin) => GuardianLink.find({ parent: parentId, origin, status: "approved" }).lean();

/** "a****@example.com": enough for the teen or the parent to recognise the address, without showing it in full. */
export function maskEmail(email) {
    const [user, domain] = String(email || "").split("@");
    if (!domain) return "";
    return `${user.slice(0, 1)}${"*".repeat(Math.max(2, user.length - 1))}@${domain}`;
}

/** Gives the link a new single-use approval code (any earlier code stops working). Returns the raw code, for the email only. */
export async function issueLinkCode(link) {
    const raw = newToken();
    link.tokenHash = hashSecret(raw);
    link.expiresAt = new Date(Date.now() + LINK_TTL);
    link.attempts = 0;
    link.sentAt = new Date();
    await link.save();
    return raw;
}

/** Checks an approval code without spending it: "valid" | "expired" | "used" | "invalid", and the link. */
export async function inspectLinkCode(linkId, raw, origin) {
    if (!/^[a-f0-9]{24}$/i.test(String(linkId || "")) || !raw) return { state: "invalid" };
    const link = await GuardianLink.findOne({ _id: linkId, origin });
    if (!link) return { state: "invalid" };
    if (link.status !== "pending") return { state: "used", link };
    if (!link.tokenHash || !safeEqual(link.tokenHash, hashSecret(String(raw)))) {
        link.attempts = (link.attempts || 0) + 1;
        if (link.attempts >= MAX_ATTEMPTS) link.tokenHash = null; // too many wrong codes: the teen must send a new link
        await link.save();
        return { state: "invalid" };
    }
    if (!link.expiresAt || link.expiresAt <= new Date()) return { state: "expired", link };
    return { state: "valid", link };
}

/* ---------------------------------------------------------------- questions a teen may be asked */
const minorCache = new Map(); // origin -> { at, names }
export async function minorQuestions(origin) {
    const hit = minorCache.get(origin);
    if (hit && Date.now() - hit.at < 60 * 1000) return hit.names;
    const docs = await Question.find({ origin, category: MINOR_CATEGORY, isDeleted: { $ne: true } }).select("name").lean();
    const names = new Set(docs.map((d) => d.name));
    minorCache.set(origin, { at: Date.now(), names });
    return names;
}

/* ---------------------------------------------------------------- answers */
const list = (v) => (v == null ? [] : [].concat(v).map((x) => (x && typeof x === "object" ? JSON.stringify(x) : String(x))));
const baseOf = (name) => String(name).replace(/_specify$/, "");
const ownerOf = (doc, subjectId) => (doc ? doc.answeredBy || subjectId : null);

/**
 * The person who gave each answer, as the viewer sees it: "you", or "your parent" / "your teen".
 * Returns { [question]: { value, by: "self" | "parent", mine, editable, at } } for the questions that have an answer.
 */
export async function answersWithAuthors(subject, names, viewerId, origin) {
    const subjectId = String(subject._id);
    const docs = await Answers.find({ user: subjectId, origin, question: { $in: names } }).select("+answer").lean();
    const out = {};
    for (const d of docs) {
        const owner = ownerOf(d, subjectId);
        const value = d.answer == null ? null : d.answer.length === 1 ? d.answer[0] : d.answer;
        out[d.question] = {
            value,
            by: owner === subjectId ? "self" : "parent",
            mine: owner === String(viewerId),
            editable: owner === String(viewerId),
            at: d.answeredAt || null,
        };
    }
    return out;
}

/**
 * Saves profile answers for `subject` (a User) on behalf of `actorId`, applying the rules above.
 *   role    "self" when the member answers for themself, "parent" when a linked parent answers for a teen
 *   values  { [question]: value }  (null saves a skipped answer, as before)
 * Returns { saved: [question], refused: [{ question, reason }] }. Refused answers are not written.
 */
export async function writeAnswers({ subject, actorId, role, values, origin, ip }) {
    const subjectId = String(subject._id);
    const actor = String(actorId);
    const names = Object.keys(values || {});
    const saved = [];
    const refused = [];
    const now = new Date();
    const audits = [];
    const refuse = (question, reason) => {
        refused.push({ question, reason });
        audits.push({ subject: subjectId, question, by: actor, role, action: "refused", reason, at: now, ipHash: ip ? ipHash(ip) : null, origin });
    };
    if (!names.length) return { saved, refused };

    let blockAll = null;
    let allowed = null;
    if (role === "parent") {
        if (!isMinor(subject)) blockAll = "not-a-teen-account";
        else {
            const link = await approvedLink(subject._id, origin);
            if (!link || String(link.parent) !== actor) blockAll = "not-linked";
        }
    } else if (actor !== subjectId) blockAll = "not-your-account";
    else if (isMinor(subject) && !(await approvedLink(subject._id, origin))) blockAll = "parent-approval-pending";
    if (!blockAll && isMinor(subject)) allowed = await minorQuestions(origin);
    if (blockAll) {
        names.forEach((n) => refuse(n, blockAll));
        await AnswerAudit.insertMany(audits);
        return { saved, refused };
    }

    const lookup = [...new Set(names.flatMap((n) => [n, baseOf(n)]))];
    const docs = await Answers.find({ user: subjectId, origin, question: { $in: lookup } }).select("+answer").lean();
    const byName = new Map(docs.map((d) => [d.question, d]));
    const ops = [];
    for (const name of names) {
        const base = baseOf(name);
        if (allowed && !allowed.has(base)) { refuse(name, "not-asked-of-teens"); continue; }
        // a "specify" text follows the answer it explains
        const owner = ownerOf(byName.get(base), subjectId) ?? ownerOf(byName.get(name), subjectId);
        if (owner && owner !== actor) { refuse(name, owner === subjectId ? "answered-by-teen" : "answered-by-parent"); continue; }
        const raw = values[name];
        const after = raw === null ? null : list(raw);
        const before = byName.get(name)?.answer ?? undefined;
        saved.push(name);
        if (before !== undefined && JSON.stringify(list(before)) === JSON.stringify(after ?? []) && (before === null) === (after === null) && byName.get(name)?.answeredBy) continue; // nothing changed
        ops.push({
            updateOne: {
                filter: { user: subjectId, question: name, origin },
                update: { $set: { user: subjectId, question: name, origin, answer: after, answeredBy: actor, answeredByRole: role, answeredAt: now } },
                upsert: true,
            },
        });
        audits.push({
            subject: subjectId, question: name, by: actor, role,
            action: after === null || after.length === 0 ? "clear" : "set",
            before: before === undefined || before === null ? undefined : list(before),
            after: after === null ? undefined : after,
            at: now, ipHash: ip ? ipHash(ip) : null, origin,
        });
    }
    if (ops.length) await Answers.bulkWrite(ops);
    if (audits.length) await AnswerAudit.insertMany(audits);
    return { saved, refused };
}

/** The change log of one member's answers, newest first, as the viewer sees it. */
export async function historyOf(subject, viewerId, origin, limit = 200) {
    const subjectId = String(subject._id);
    const rows = await AnswerAudit.find({ subject: subjectId, origin }).sort({ at: -1, _id: -1 }).limit(Math.min(500, limit)).lean();
    return rows.map((r) => ({
        question: r.question,
        action: r.action,
        reason: r.reason || null,
        by: r.by === subjectId ? "self" : "parent",
        you: r.by === String(viewerId),
        before: r.before ?? null,
        after: r.after ?? null,
        at: r.at,
    }));
}

/** Plain-language reason for a refused answer, for the person who tried. */
export const REFUSAL_TEXT = {
    "answered-by-teen": "Your teen gave this answer, so only they can change it.",
    "answered-by-parent": "Your parent gave this answer, so only they can change it.",
    "not-asked-of-teens": "This question is not asked of members under 18.",
    "parent-approval-pending": "Your parent or guardian needs to approve your account before you can answer profile questions.",
    "not-linked": "You are not the approved parent or guardian of this account.",
    "not-a-teen-account": "Only a teen member's own parent or guardian can answer for them.",
    "not-your-account": "You can only change your own answers.",
};
