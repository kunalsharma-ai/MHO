// Logged-in member: journey, consent and dashboard (mounted at /api/v1/me, after isAuthenticated).
//
//   GET  /api/v1/me/journey         where the member stands and the next step (verify / consent / dashboard)
//   GET  /api/v1/me/consent         the consent document the member must sign: segment, version, status
//   POST /api/v1/me/consent         sign: required approvals must be explicitly true; appends a ConsentRecord
//   POST /api/v1/me/consent/decline record a decline (the client then logs the member out)
//   GET  /api/v1/me/consent/history the member's own consent records, newest first
//   GET  /api/v1/me/dashboard       everything the dashboard shows, from the member's own records (403 until consent)
import express from "express";
import crypto from "crypto";
import { ConsentRecord, User } from "../../model/index.js";
import { fsLogger } from "../../../utils/index.js";
import { journeyFor } from "../../lib/journey.js";
import { dashboardFor } from "../../lib/dashboard.js";
import { segmentFor, REQUIRED_APPROVALS, OPTIONAL_APPROVALS } from "../../lib/segments.js";
import { ipHash, clientIp } from "../../lib/security.js";
import { limits } from "../../lib/limits.js";
import { sendSegmentMail } from "../../lib/mail.js";

const router = express.Router();
const ok = (res, message, data = {}) => res.json({ status: "success", message, data });
const fail = (res, http, code, message, extra = {}) => res.status(http).json({ status: "error", code, message, ...extra });
const wrap = (fn) => async (req, res) => {
    try { await fn(req, res); } catch (error) {
        fsLogger.Log(`me route ${req.path} failed: ${error.message}`);
        fail(res, 500, "SERVER_ERROR", "Something went wrong on our side. Please try again in a moment.");
    }
};
const noStore = (req, res, next) => { res.set("Cache-Control", "private, no-store"); next(); };

router.get("/journey", noStore, wrap(async (req, res) => ok(res, "", await journeyFor(req.user))));

router.get("/consent", noStore, wrap(async (req, res) => {
    const segment = segmentFor(req.user.category);
    if (!segment) return fail(res, 409, "NO_SEGMENT", "Your account has no member category. Please contact support.");
    const journey = await journeyFor(req.user);
    ok(res, "", {
        segment: segment.id,
        termsVersion: segment.termsVersion,
        page: segment.consentPage,
        status: journey.consent?.status,
        required: REQUIRED_APPROVALS,
        optional: OPTIONAL_APPROVALS,
        member: { id: req.user.respondentID || String(req.user._id).slice(-8).toUpperCase(), firstName: req.user.name?.first || "", lastName: req.user.name?.last || "" },
        continueUrl: segment.dashboard,
    });
}));

const consentId = (segment) => {
    const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const tag = { hcp: "HCP", caregiver: "CG", patient: "PT" }[segment];
    return `MHO-${tag}-${d}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
};
const short = (v, n) => (typeof v === "string" ? v.slice(0, n) : null);

router.post("/consent", limits.consent, wrap(async (req, res) => {
    const segment = segmentFor(req.user.category); // from the account, never from the request
    if (!segment) return fail(res, 409, "NO_SEGMENT", "Your account has no member category. Please contact support.");
    const b = req.body || {};
    if (b.termsVersion !== segment.termsVersion) return fail(res, 409, "VERSION_CHANGED", "The terms were updated while you were reading. Please reload the page.", { data: { termsVersion: segment.termsVersion } });
    const a = b.approvals || b.consents || {}; // the supplied consent pages send `consents`
    const missing = REQUIRED_APPROVALS.filter((k) => a[k] !== true);
    if (missing.length) return fail(res, 422, "APPROVALS_MISSING", "Please switch on every required approval before signing.", { data: { missing } });
    const approvals = Object.fromEntries([...REQUIRED_APPROVALS.map((k) => [k, true]), ...OPTIONAL_APPROVALS.map((k) => [k, a[k] === true])]);
    const record = await ConsentRecord.create({
        consentId: consentId(segment.id),
        user: req.user._id,
        segment: segment.id,
        action: "accept",
        termsVersion: segment.termsVersion,
        language: short(b.language, 10) || "en",
        approvals,
        clausesReviewed: Array.isArray(b.clausesReviewed) ? b.clausesReviewed.map(Number).filter((n) => Number.isInteger(n) && n > 0 && n < 100).slice(0, 60) : [],
        clientTime: short(b.clientTime || b.acceptedAt, 40),
        timezone: short(b.timezone, 60),
        ipHash: ipHash(clientIp(req)),
        userAgent: short(req.headers["user-agent"], 300),
        origin: req.origin,
    });
    // keep the old member-area check (terms list not empty) satisfied for screens not yet moved to /me/journey
    await User.updateOne({ _id: req.user._id }, { $addToSet: { terms: segment.termsVersion } });
    await sendSegmentMail(req.user, "consent-signed", {
        consent: { version: segment.termsVersion, signedAt: record.acceptedAt.toISOString(), optionalCount: OPTIONAL_APPROVALS.filter((k) => approvals[k]).length },
    });
    const data = { consentId: record.consentId, termsVersion: record.termsVersion, acceptedAt: record.acceptedAt, approvals, next: segment.dashboard };
    // consentId also at the top level: the supplied consent pages read it there for the certificate
    res.json({ status: "success", message: "Your consent has been recorded.", ok: true, consentId: record.consentId, data });
}));

router.post("/consent/decline", limits.consent, wrap(async (req, res) => {
    const segment = segmentFor(req.user.category);
    if (!segment) return fail(res, 409, "NO_SEGMENT", "Your account has no member category. Please contact support.");
    await ConsentRecord.create({
        consentId: consentId(segment.id),
        user: req.user._id,
        segment: segment.id,
        action: "decline",
        termsVersion: segment.termsVersion,
        ipHash: ipHash(clientIp(req)),
        userAgent: short(req.headers["user-agent"], 300),
        origin: req.origin,
    });
    ok(res, "You haven’t accepted the terms, so your dashboard stays closed. You can sign them any time you log in.", { next: "/" });
}));

router.get("/consent/history", noStore, wrap(async (req, res) => {
    const rows = await ConsentRecord.find({ user: req.user._id }).sort({ acceptedAt: -1 }).select("-_id consentId segment action termsVersion approvals acceptedAt language").lean();
    ok(res, "", rows);
}));

router.get("/dashboard", noStore, wrap(async (req, res) => {
    const journey = await journeyFor(req.user);
    if (journey.next === "verify-email") return fail(res, 403, "EMAIL_UNVERIFIED", "Please verify your email first.", { data: { journey } });
    if (journey.next === "consent") return fail(res, 403, "CONSENT_REQUIRED", "Please review and sign your panel terms first.", { data: { journey } });
    ok(res, "", await dashboardFor(req.user));
}));

export default router;
