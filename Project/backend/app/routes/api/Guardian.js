// Teen members and their parents or guardians (mounted at /api/v1/guardian, after isAuthenticated).
//
//   GET   /api/v1/guardian                     the signed-in member's side: their own approval (teen) and the teens
//                                              they have approved (parent)
//   POST  /api/v1/guardian/resend              teen: send the approval email again, optionally to a corrected address
//   POST  /api/v1/guardian/invite              parent: what an approval link asks ({ link, code }); does not spend it
//   POST  /api/v1/guardian/invite/approve      parent: approve ({ link, code, accepted: [term names] })
//   POST  /api/v1/guardian/invite/decline      parent: decline ({ link, code })
//   GET   /api/v1/guardian/questionnaire/:who  the teen's profile questions with each answer and who gave it
//   PATCH /api/v1/guardian/answers/:who        save answers ({ question: value }); refused ones are listed
//   GET   /api/v1/guardian/history/:who        the change log of the teen's answers, newest first
//
// :who is "me" for the teen themself, or the teen's member id for their approved parent. Who may change which
// answer is decided in lib/guardian.js; the server refuses anything else and logs it.
import express from "express";
import mongoose from "mongoose";
import { User, Category, GuardianLink, Profile, Question, Option } from "../../model/index.js";
import { fsLogger } from "../../../utils/index.js";
import { limits } from "../../lib/limits.js";
import { ipHash, clientIp } from "../../lib/security.js";
import { sendParentApprovalMail } from "../../lib/mail.js";
import { ageOn, MIN_SIGNUP_AGE } from "../../lib/registration.js";
import {
    MINOR_CATEGORY, isMinor, latestLink, childrenOf, maskEmail, issueLinkCode, inspectLinkCode,
    minorQuestions, answersWithAuthors, writeAnswers, historyOf, REFUSAL_TEXT,
} from "../../lib/guardian.js";

const router = express.Router();
const ok = (res, message, data = {}) => res.json({ status: "success", message, data });
const fail = (res, http, code, message, extra = {}) => res.status(http).json({ status: "error", code, message, ...extra });
const wrap = (fn) => async (req, res) => {
    try { await fn(req, res); } catch (error) {
        fsLogger.Log(`guardian route ${req.path} failed: ${error.message}`);
        fail(res, 500, "SERVER_ERROR", "Something went wrong on our side. Please try again in a moment.");
    }
};
router.use((req, res, next) => { res.set("Cache-Control", "private, no-store"); next(); });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isAdult = (user) => !isMinor(user) && (!user.dob || ageOn(new Date(user.dob).toISOString().slice(0, 10)) >= MIN_SIGNUP_AGE);
const LINK_TEXT = {
    expired: "This approval link has expired. Ask your teen to send a new one from their account.",
    used: "This approval link has already been used.",
    invalid: "This approval link isn’t valid. Please use the latest email we sent.",
};

/* ---------------------------------------------------------------- overview */
router.get("/", wrap(async (req, res) => {
    const me = req.user;
    let teen = null;
    if (isMinor(me)) {
        const link = await latestLink(me._id, req.origin);
        teen = {
            status: link?.status || "missing",
            parentEmail: maskEmail(link?.parentEmail),
            sentAt: link?.sentAt || null,
            decidedAt: link?.decidedAt || null,
            canResend: !link || ["pending", "declined"].includes(link.status),
        };
    }
    const links = await childrenOf(me._id, req.origin);
    const users = links.length ? await User.find({ _id: { $in: links.map((l) => l.minor) }, origin: req.origin }).select("name").lean() : [];
    const nameOf = new Map(users.map((u) => [String(u._id), u.name?.first || ""]));
    const children = links.map((l) => ({ id: String(l.minor), firstName: nameOf.get(String(l.minor)) || "", approvedAt: l.decidedAt }));
    ok(res, "", { isTeen: isMinor(me), teen, children });
}));

/* ---------------------------------------------------------------- teen: send the approval email again */
router.post("/resend", limits.email, wrap(async (req, res) => {
    const me = req.user;
    if (!isMinor(me)) return fail(res, 403, "NOT_A_TEEN", "Only members under 18 need a parent’s or guardian’s approval.");
    let link = await latestLink(me._id, req.origin);
    if (link?.status === "approved") return fail(res, 409, "ALREADY_APPROVED", "Your parent or guardian has already approved your account.");
    const wanted = typeof req.body?.parentEmail === "string" ? req.body.parentEmail.trim().toLowerCase() : "";
    if (wanted && (!EMAIL_RE.test(wanted) || wanted.length > 254)) return fail(res, 422, "INVALID", "Please enter a valid email address.", { errors: { parentEmail: "Please enter a valid email address." } });
    if (wanted && wanted === String(me.mail || "").toLowerCase()) return fail(res, 422, "INVALID", "Please enter your parent’s or guardian’s own email address, not yours.", { errors: { parentEmail: "Please enter your parent’s or guardian’s own email address, not yours." } });
    if (!link && !wanted) return fail(res, 422, "INVALID", "Please enter your parent’s or guardian’s email address.", { errors: { parentEmail: "Please enter their email address." } });
    if (!link || link.status !== "pending" || (wanted && wanted !== link.parentEmail)) {
        if (link?.status === "pending") { link.status = "revoked"; link.tokenHash = null; link.decidedAt = new Date(); await link.save(); }
        link = await GuardianLink.create({ minor: me._id, parentEmail: wanted || link.parentEmail, origin: req.origin, status: "pending" });
    }
    const user = await User.findById(me._id);
    const sent = await sendParentApprovalMail(user, link, await issueLinkCode(link));
    if (!sent) return fail(res, 502, "MAIL_FAILED", "We couldn’t send the email just now. Please try again in a few minutes.");
    ok(res, `We’ve emailed ${maskEmail(link.parentEmail)} a link to approve your account.`, { parentEmail: maskEmail(link.parentEmail), sentAt: link.sentAt });
}));

/* ---------------------------------------------------------------- parent: approve or decline */
async function openInvite(req, res) {
    const { state, link } = await inspectLinkCode(req.body?.link, req.body?.code, req.origin);
    if (state !== "valid") { fail(res, 410, `LINK_${state.toUpperCase()}`, LINK_TEXT[state]); return null; }
    if (String(req.user.mail || "").toLowerCase() !== link.parentEmail) {
        fail(res, 403, "WRONG_ACCOUNT", `This link was sent to ${maskEmail(link.parentEmail)}. Please log in with that email address.`, { data: { parentEmail: maskEmail(link.parentEmail) } });
        return null;
    }
    if (String(link.minor) === String(req.user._id) || !isAdult(req.user)) {
        fail(res, 403, "NOT_ALLOWED", "A parent or guardian must be 18 or older and use their own account.");
        return null;
    }
    const minor = await User.findOne({ _id: link.minor, origin: req.origin }).select("name category").lean();
    if (!minor || !isMinor(minor)) { fail(res, 410, "LINK_INVALID", LINK_TEXT.invalid); return null; }
    // what the parent agrees to: the "minor patient" category's own terms, as the database holds them
    const category = await Category.findOne({ name: MINOR_CATEGORY, origin: req.origin, isDeleted: { $ne: true } }).lean();
    const terms = (category?.terms || []).map((t) => ({ name: t.name, body: t.body, isRequired: Boolean(t.isRequired) }));
    return { link, minor, terms, termsMessage: category?.termsMessage || "" };
}

router.post("/invite", limits.token, wrap(async (req, res) => {
    const inv = await openInvite(req, res);
    if (!inv) return;
    ok(res, "", { teenFirstName: inv.minor.name?.first || "", terms: inv.terms, termsMessage: inv.termsMessage, termsReady: inv.terms.length > 0 });
}));

router.post("/invite/approve", limits.token, wrap(async (req, res) => {
    const inv = await openInvite(req, res);
    if (!inv) return;
    if (!inv.terms.length) return fail(res, 409, "TERMS_MISSING", "The parent or guardian consent terms have not been set up yet, so this account can’t be approved right now. Please contact support@myhealthopinions.com.");
    const accepted = new Set(Array.isArray(req.body?.accepted) ? req.body.accepted.map(String) : []);
    const missing = inv.terms.filter((t) => t.isRequired && !accepted.has(t.name));
    if (missing.length) return fail(res, 422, "TERMS_REQUIRED", "Please accept every required statement to approve.", { data: { missing: missing.map((t) => t.name) } });
    // one approval only: the update matches the link while it is still pending
    const r = await GuardianLink.updateOne(
        { _id: inv.link._id, status: "pending", tokenHash: inv.link.tokenHash },
        { $set: { status: "approved", parent: req.user._id, decidedAt: new Date(), decidedFrom: ipHash(clientIp(req)), tokenHash: null, accepted: inv.terms.filter((t) => accepted.has(t.name)) } }
    );
    if (r.modifiedCount !== 1) return fail(res, 410, "LINK_USED", LINK_TEXT.used);
    ok(res, `You’ve approved ${inv.minor.name?.first || "your teen"}’s account. You can now see and answer their profile questions from your account.`, { teen: { id: String(inv.minor._id), firstName: inv.minor.name?.first || "" } });
}));

router.post("/invite/decline", limits.token, wrap(async (req, res) => {
    const inv = await openInvite(req, res);
    if (!inv) return;
    const r = await GuardianLink.updateOne({ _id: inv.link._id, status: "pending", tokenHash: inv.link.tokenHash }, { $set: { status: "declined", decidedAt: new Date(), decidedFrom: ipHash(clientIp(req)), tokenHash: null } });
    if (r.modifiedCount !== 1) return fail(res, 410, "LINK_USED", LINK_TEXT.used);
    ok(res, "You’ve declined. The account stays unapproved and is not linked to you.");
}));

/* ---------------------------------------------------------------- shared answers */
/** The teen whose answers are asked for, and the role the signed-in member has: "self" or "parent". */
async function subjectFor(req, res) {
    const who = req.params.who;
    if (who === "me") {
        if (!isMinor(req.user)) { fail(res, 403, "NOT_A_TEEN", "Shared answers are for members under 18 and their parent or guardian."); return null; }
        return { subject: req.user, role: "self" };
    }
    if (!mongoose.isValidObjectId(who)) { fail(res, 404, "NOT_FOUND", "We couldn’t find that account."); return null; }
    const link = await GuardianLink.findOne({ minor: who, parent: req.user._id, origin: req.origin, status: "approved" }).lean();
    if (!link) { fail(res, 403, "NOT_LINKED", REFUSAL_TEXT["not-linked"]); return null; }
    const subject = await User.findOne({ _id: who, origin: req.origin }).lean();
    if (!subject || !isMinor(subject)) { fail(res, 404, "NOT_FOUND", "We couldn’t find that account."); return null; }
    return { subject, role: "parent" };
}

const TYPES = { radio: "single", select: "single", checkbox: "multi", multiselect: "multi", text: "text", email: "email", phone: "tel", number: "number", date: "date" };
const filled = (v) => v != null && [].concat(v).some((x) => String(x ?? "").trim() !== "");
const valuesOf = (v) => [].concat(v ?? []).map((x) => String(x).trim().toLowerCase()).filter(Boolean);

router.get("/questionnaire/:who", wrap(async (req, res) => {
    const s = await subjectFor(req, res);
    if (!s) return;
    const origin = req.origin;
    const allowed = await minorQuestions(origin);
    const docs = await Profile.find({ origin, category: "patient", isDeleted: { $ne: true }, isActive: { $ne: false } }).sort({ _id: 1 }).lean();
    const seenProfile = new Set();
    const seenQuestion = new Set();
    const profiles = [];
    for (const p of docs) {
        const key = String(p.name || "").trim().toLowerCase();
        if (!key || seenProfile.has(key) || /not in use/.test(key)) continue;
        seenProfile.add(key);
        const names = (p.pages || []).flatMap((pg) => (Array.isArray(pg) ? pg.slice(1) : [])).filter((n) => allowed.has(n) && !seenQuestion.has(n));
        names.forEach((n) => seenQuestion.add(n));
        if (names.length) profiles.push({ name: p.name, slug: p.slug, names });
    }
    const all = [...seenQuestion];
    const questions = await Question.find({ origin, name: { $in: all }, isDeleted: { $ne: true } }).lean();
    const qBy = new Map(questions.map((q) => [q.name, q]));
    const parents = [...new Set(questions.map((q) => q.parent).filter(Boolean))];
    const answers = await answersWithAuthors(s.subject, [...new Set([...all, ...parents, ...all.map((n) => `${n}_specify`)])], req.user._id, origin);
    const parentValues = [...new Set(parents.flatMap((p) => [].concat(answers[p]?.value ?? []).map(String)))];
    const choice = questions.filter((q) => ["single", "multi"].includes(TYPES[q.type])).map((q) => q.name);
    const options = choice.length
        ? await Option.find({
            origin, question: { $in: choice }, isDeleted: { $ne: true }, isActive: { $ne: false },
            $or: [{ parentValue: { $exists: false } }, { parentValue: { $size: 0 } }, { parentValue: "-" }, { parentValue: { $in: parentValues } }],
        }).select("question label value parentValue").sort({ _id: 1 }).lean()
        : [];
    const optBy = new Map();
    for (const o of options) (optBy.get(o.question) || optBy.set(o.question, []).get(o.question)).push(o);

    const out = profiles.map((p) => ({
        name: p.name,
        slug: p.slug,
        questions: p.names.map((n) => {
            const q = qBy.get(n);
            if (!q) return null;
            const type = TYPES[q.type] || "text";
            const parentAns = q.parent ? valuesOf(answers[q.parent]?.value) : null;
            let opts = null;
            if (type === "single" || type === "multi") {
                opts = (optBy.get(n) || [])
                    .filter((o) => {
                        const pv = [].concat(o.parentValue ?? []).map((v) => String(v).trim().toLowerCase()).filter((v) => v && v !== "-");
                        return !pv.length || (parentAns && pv.some((v) => parentAns.includes(v)));
                    })
                    .map((o) => ({ label: o.label, value: o.value }));
            }
            // a follow-up shows once its parent question is answered (and, for a choice, has options for that answer)
            const visible = !q.parent || (parentAns.length > 0 && (opts === null || opts.length > 0));
            if (!visible) return null;
            const a = answers[n] || null;
            return {
                name: n,
                label: q.label,
                type,
                options: opts,
                answer: a ? { value: a.value, by: a.by, mine: a.mine, at: a.at } : null,
                editable: a ? a.editable : true,
            };
        }).filter(Boolean),
    })).filter((p) => p.questions.length);
    ok(res, "", {
        role: s.role,
        teen: { id: String(s.subject._id), firstName: s.subject.name?.first || "" },
        profiles: out,
    });
}));

router.patch("/answers/:who", limits.answers, wrap(async (req, res) => {
    const s = await subjectFor(req, res);
    if (!s) return;
    const values = req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body : {};
    if (!Object.keys(values).length || Object.keys(values).length > 50) return fail(res, 422, "INVALID", "Please send between 1 and 50 answers at a time.");
    const result = await writeAnswers({ subject: s.subject, actorId: req.user._id, role: s.role, values, origin: req.origin, ip: clientIp(req) });
    const refused = result.refused.map((r) => ({ ...r, message: REFUSAL_TEXT[r.reason] || "This answer cannot be changed." }));
    if (refused.length && !result.saved.length) return fail(res, 403, "ANSWER_REFUSED", refused[0].message, { data: { saved: [], refused } });
    ok(res, refused.length ? "Some answers were not saved." : "Saved.", { saved: result.saved, refused });
}));

router.get("/history/:who", wrap(async (req, res) => {
    const s = await subjectFor(req, res);
    if (!s) return;
    const rows = await historyOf(s.subject, req.user._id, req.origin, Number(req.query.limit) || 200);
    const qs = await Question.find({ origin: req.origin, name: { $in: [...new Set(rows.map((r) => r.question.replace(/_specify$/, "")))] } }).select("name label").lean();
    const label = new Map(qs.map((q) => [q.name, q.label]));
    ok(res, "", rows.map((r) => ({ ...r, label: label.get(r.question.replace(/_specify$/, "")) || r.question, reasonText: r.reason ? REFUSAL_TEXT[r.reason] || null : null })));
}));

export default router;
