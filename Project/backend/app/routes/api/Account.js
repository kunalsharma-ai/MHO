// Registration, email verification, password creation/reset and login for the 2026-11 redesign.
//
//   GET  /api/v1/account/captcha                     new server-side CAPTCHA (SVG)
//   GET  /api/v1/account/location/countries          countries with flag, dialling code, postal-code rule
//   GET  /api/v1/account/location/:country/states    states / provinces
//   GET  /api/v1/account/location/:country/:state/cities
//   GET  /api/v1/account/eligibility                 ages the sign-up form allows (18+, and teens on the patient panel)
//   POST /api/v1/account/register                    create a pending account, send the segment's verify mail
//                                                    (under 18: patient panel only, with parentEmail; see Guardian.js)
//   POST /api/v1/account/resend-verification         new verify link (generic answer, no account probing)
//   POST /api/v1/account/link                        is a verify/reset link still usable? (does not spend it)
//   POST /api/v1/account/set-password                spend the verify link, set the password, activate
//   POST /api/v1/account/forgot-password             send a reset link (generic answer)
//   POST /api/v1/account/reset-password              spend the reset link, set a new password
//   POST /api/v1/account/login                       email + password + CAPTCHA → token + next step
//
// Responses use the API's usual { status, message, data } shape; failures add a machine-readable `code`
// and, for form errors, `errors: { field: message }`.
import express from "express";
import bcrypt from "bcryptjs";
import { User, Answers, GuardianLink } from "../../model/index.js";
import { Token, eventStream, fsLogger } from "../../../utils/index.js";
import { limits } from "../../lib/limits.js";
import { issueChallenge, captchaPassed } from "../../lib/captcha.js";
import { issueToken, inspectToken, spendToken } from "../../lib/tokens.js";
import { passwordProblem, clientIp } from "../../lib/security.js";
import { validateRegistration, categoryForAge, teenRule, ageOn, HCP_SCREEN_OUT, MIN_SIGNUP_AGE } from "../../lib/registration.js";
import { isMinor, latestLink, issueLinkCode } from "../../lib/guardian.js";
import { sendSegmentMail, sendParentApprovalMail } from "../../lib/mail.js";
import { segmentOf, SEGMENTS } from "../../lib/segments.js";
import { journeyFor } from "../../lib/journey.js";
import { world, statesOf, stateOf, postalPattern } from "../../lib/world.js";

const router = express.Router();

const ok = (res, message, data = {}, extra = {}) => res.json({ status: "success", message, data, ...extra });
const fail = (res, http, code, message, extra = {}) => res.status(http).json({ status: "error", code, message, ...extra });
const wrap = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (error) {
        fsLogger.Log(`account route ${req.path} failed: ${error.message}`);
        fail(res, 500, "SERVER_ERROR", "Something went wrong on our side. Please try again in a moment.");
    }
};
const CAPTCHA_FAILED = (res) => fail(res, 400, "CAPTCHA_FAILED", "The security check didn’t match. Please try the new one.", { errors: { captcha: "The security check didn’t match." } });
const lowerEmail = (v) => (typeof v === "string" ? v.trim().toLowerCase() : "");
const GENERIC_EMAIL_SENT = "If an account needs it, we’ve sent an email with a link. Please check your inbox and spam folder.";

/* ---------- CAPTCHA and location lists ---------- */
router.get("/captcha", limits.captcha, wrap(async (req, res) => {
    res.set("Cache-Control", "no-store");
    ok(res, "", await issueChallenge());
}));

const COUNTRIES = Object.values(world)
    .map((c) => ({
        code: c.codes.iso2,
        name: c.name,
        flag: c.emoji,
        dial: c.codes.phone ? `+${String(c.codes.phone).replace(/^\+/, "")}` : "",
        hasStates: Object.keys(c.states || {}).length > 0,
        postalFormat: c.zipFormat || null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

router.get("/location/countries", (req, res) => {
    res.set("Cache-Control", "public, max-age=86400");
    ok(res, "", COUNTRIES);
});
router.get("/location/:country/states", (req, res) => {
    res.set("Cache-Control", "public, max-age=86400");
    ok(res, "", statesOf(req.params.country).map((s) => ({ code: s.code, name: s.name, hasCities: (s.cities || []).length > 0 })).sort((a, b) => a.name.localeCompare(b.name)));
});
router.get("/location/:country/:state/cities", (req, res) => {
    res.set("Cache-Control", "public, max-age=86400");
    ok(res, "", [...(stateOf(req.params.country, req.params.state)?.cities || [])].sort((a, b) => a.localeCompare(b)));
});
router.get("/location/:country/postal", (req, res) => {
    const re = postalPattern(req.params.country);
    ok(res, "", { pattern: re ? re.source : null });
});

/* ---------- Register ---------- */
// The ages the sign-up form allows, from the category rules in the database: 18+ for every panel, and the
// "minor patient" age rule for teens on the patient panel (null when teens cannot join).
router.get("/eligibility", wrap(async (req, res) => {
    const teen = await teenRule("patient", req.origin);
    res.set("Cache-Control", "public, max-age=300");
    ok(res, "", { adultAge: MIN_SIGNUP_AGE, teen: teen ? { minAge: teen.min, segment: "patient" } : null });
}));

router.post("/register", limits.register, wrap(async (req, res) => {
    if (req.body?.website) return ok(res, GENERIC_EMAIL_SENT); // honeypot: bots get the normal answer, nothing is created
    const { errors, value: v } = validateRegistration(req.body);
    if (Object.keys(errors).length) return fail(res, 422, "INVALID", "Please check the highlighted fields.", { errors });
    if (!(await captchaPassed(req.body.captcha, clientIp(req)))) return CAPTCHA_FAILED(res);

    if (v.segment === "hcp" && v.worksInHealthcare === "no") return fail(res, 403, "NOT_ELIGIBLE", HCP_SCREEN_OUT);
    const age = ageOn(v.dob);
    let category = "";
    let teen = null;
    if (age < MIN_SIGNUP_AGE) {
        // under 18: the patient panel only, from the "minor patient" age rule, and a parent or guardian must approve
        teen = await teenRule(v.segment, req.origin);
        if (!teen) {
            const teensAllowed = await teenRule("patient", req.origin);
            const message = teensAllowed && v.segment !== "patient"
                ? "Members under 18 can join the patient panel only, with a parent’s or guardian’s approval."
                : "Based on your date of birth you’re not eligible to join this panel yet.";
            return fail(res, 403, "NOT_ELIGIBLE", message, { errors: { dob: teensAllowed && v.segment !== "patient" ? "Members under 18 can join the patient panel only." : "You’re not eligible to join this panel yet." } });
        }
        if (age < teen.min) return fail(res, 403, "NOT_ELIGIBLE", "Based on your date of birth you’re not eligible to join this panel yet.", { errors: { dob: "You’re not eligible to join this panel yet." } });
        if (!v.parentEmail) return fail(res, 422, "INVALID", "Please check the highlighted fields.", { errors: { parentEmail: "Members under 18 need a parent or guardian to approve their account. Please enter their email address." } });
        category = teen.category;
    } else {
        category = await categoryForAge(v.segment, age, req.origin);
    }
    if (!category) return fail(res, 403, "NOT_ELIGIBLE", "Based on your date of birth you’re not eligible to join this panel yet.", { errors: { dob: "You’re not eligible to join this panel yet." } });

    const existing = await User.findOne({ mail: v.email, origin: req.origin });
    if (existing) {
        // Do not reveal whether the address is registered. If that account is still unverified, its link is re-sent.
        if (existing.isVerified?.email !== "verified") {
            const raw = await issueToken(existing._id, "verify-email", req.origin, clientIp(req));
            await sendSegmentMail(existing, "respondent", { otp: { code: raw } });
        }
        return ok(res, GENERIC_EMAIL_SENT, { email: v.email });
    }

    const user = new User({
        category,
        name: { first: v.firstName, middle: v.middleName, last: v.lastName },
        dob: new Date(`${v.dob}T00:00:00Z`),
        mail: v.email,
        phone: v.phone,
        timezone: v.timezone,
        address: [{ tag: "home", country: v.country.toLowerCase(), state: v.state.toLowerCase(), city: v.city, zipcode: v.postalCode }],
        postalCodeApplicable: !v.postalCodeNotApplicable,
        referredBy: /^[\w-]{1,64}$/.test(String(req.body.referredBy || "")) ? String(req.body.referredBy) : null,
        accountStatus: "pending",
        origin: req.origin,
        created: { From: clientIp(req) },
    });
    try {
        await user.save();
    } catch (error) {
        if (error?.code === 11000) return ok(res, GENERIC_EMAIL_SENT, { email: v.email });
        if (error?.name === "ValidationError") {
            const map = { mail: "email", "name.first": "firstName", dob: "dob", phone: "phone" };
            const errs = Object.fromEntries(Object.entries(error.errors).map(([k, e]) => [map[k] || k, e.message]));
            return fail(res, 422, "INVALID", "Please check the highlighted fields.", { errors: errs });
        }
        throw error;
    }
    if (v.segment === "hcp") {
        const answers = [{ user: String(user._id), question: "works_in_healthcare", answer: [v.worksInHealthcare], origin: req.origin }];
        if (v.clinician) answers.push({ user: String(user._id), question: "clinician", answer: [v.clinician], origin: req.origin });
        await Answers.insertMany(answers).catch((e) => fsLogger.Log(`screening answers not saved for ${user._id}: ${e.message}`));
    }
    // the parent is emailed once the teen has verified their own address (set-password), so an unverified sign-up
    // cannot send mail to a stranger
    if (teen) await GuardianLink.create({ minor: user._id, parentEmail: v.parentEmail, origin: req.origin, status: "pending" });
    const raw = await issueToken(user._id, "verify-email", req.origin, clientIp(req));
    await sendSegmentMail(user, "respondent", { otp: { code: raw } });
    eventStream.emitEvent("account-registered", { _id: String(user._id), segment: v.segment });
    ok(res, GENERIC_EMAIL_SENT, { email: v.email });
}));

router.post("/resend-verification", limits.email, wrap(async (req, res) => {
    if (!(await captchaPassed(req.body?.captcha, clientIp(req)))) return CAPTCHA_FAILED(res);
    const user = await User.findOne({ mail: lowerEmail(req.body?.email), origin: req.origin });
    if (user && user.isVerified?.email !== "verified") {
        const raw = await issueToken(user._id, "verify-email", req.origin, clientIp(req));
        await sendSegmentMail(user, "respondent", { otp: { code: raw } });
    }
    ok(res, GENERIC_EMAIL_SENT);
}));

/* ---------- Links: verify + set password, reset password ---------- */
const PURPOSE = { verify: "verify-email", reset: "reset-password" };
const LINK_MESSAGES = {
    expired: "This link has expired. Request a new one below.",
    used: "This link has already been used. If you created your password, please log in.",
    invalid: "This link isn’t valid. Please use the latest email we sent, or request a new link.",
};

router.post("/link", limits.token, wrap(async (req, res) => {
    const purpose = PURPOSE[req.body?.kind];
    if (!purpose) return fail(res, 400, "INVALID", "Unknown link type.");
    const { state, token } = await inspectToken(req.body?.user, purpose, req.body?.code);
    if (state !== "valid") return fail(res, 410, `LINK_${state.toUpperCase()}`, LINK_MESSAGES[state]);
    const user = await User.findById(token.user).lean();
    ok(res, "", { firstName: user?.name?.first || "", email: user?.mail || "", segment: segmentOf(user?.category) });
}));

async function setPasswordWithLink(req, res, kind) {
    const { user: uid, code, password, confirmPassword } = req.body || {};
    if (password !== confirmPassword) return fail(res, 422, "INVALID", "The two passwords don’t match.", { errors: { confirmPassword: "The two passwords don’t match." } });
    const { state, token } = await inspectToken(uid, PURPOSE[kind], code);
    if (state !== "valid") return fail(res, 410, `LINK_${state.toUpperCase()}`, LINK_MESSAGES[state]);
    const user = await User.findById(token.user);
    if (!user) return fail(res, 410, "LINK_INVALID", LINK_MESSAGES.invalid);
    const problem = passwordProblem(password, { email: user.mail });
    if (problem) return fail(res, 422, "WEAK_PASSWORD", problem, { errors: { password: problem } });
    if (!(await spendToken(token))) return fail(res, 410, "LINK_USED", LINK_MESSAGES.used);
    const firstActivation = user.isVerified?.email !== "verified";
    user.password = await bcrypt.hash(password, 12);
    user.isVerified.email = "verified";
    user.accountStatus = "active";
    user.passwordChangedAt = new Date();
    await user.save();
    if (kind === "verify" && firstActivation) await sendSegmentMail(user, "welcome");
    if (kind === "verify" && firstActivation && isMinor(user)) {
        const link = await latestLink(user._id, user.origin);
        if (link?.status === "pending" && !link.sentAt) await sendParentApprovalMail(user, link, await issueLinkCode(link));
    }
    eventStream.emitEvent(kind === "verify" ? "account-activated" : "account-password-reset", { _id: String(user._id) });
    ok(res, kind === "verify" ? "Your password is set and your account is active. Please log in." : "Your new password is set. Please log in.", { email: user.mail });
}
router.post("/set-password", limits.token, wrap((req, res) => setPasswordWithLink(req, res, "verify")));
router.post("/reset-password", limits.token, wrap((req, res) => setPasswordWithLink(req, res, "reset")));

router.post("/forgot-password", limits.email, wrap(async (req, res) => {
    if (!(await captchaPassed(req.body?.captcha, clientIp(req)))) return CAPTCHA_FAILED(res);
    const user = await User.findOne({ mail: lowerEmail(req.body?.email), origin: req.origin });
    if (user) {
        if (user.isVerified?.email !== "verified") {
            // never verified: the verify link is what they need (it also sets the password)
            const raw = await issueToken(user._id, "verify-email", req.origin, clientIp(req));
            await sendSegmentMail(user, "respondent", { otp: { code: raw } });
        } else {
            const raw = await issueToken(user._id, "reset-password", req.origin, clientIp(req));
            await sendSegmentMail(user, "forgot-password", { otp: { code: raw } });
        }
    }
    ok(res, GENERIC_EMAIL_SENT);
}));

/* ---------- Login ---------- */
router.post("/login", limits.login, wrap(async (req, res) => {
    const email = lowerEmail(req.body?.email);
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!email || !password) return fail(res, 422, "INVALID", "Please enter your email and password.");
    if (!(await captchaPassed(req.body?.captcha, clientIp(req)))) return CAPTCHA_FAILED(res);
    const BAD = () => fail(res, 401, "BAD_CREDENTIALS", "Email or password is incorrect.");
    const user = await User.findOne({ mail: email, origin: req.origin }).select("+password +role");
    if (!user) {
        await bcrypt.compare(password, "$2a$12$CwTycUXWue0Thq9StjUM0uJ8.ylYyKDhEt7sZiRQQ/Hb1ZLwdvLR6"); // same time as a real check
        return BAD();
    }
    if (user.isVerified?.email !== "verified" || !user.password) {
        return fail(res, 403, "EMAIL_UNVERIFIED", "Please verify your email first. We can send you a new link.", { data: { email: user.mail } });
    }
    if (!(await bcrypt.compare(password, user.password))) {
        eventStream.emitEvent("user-login-failed", { _id: String(user._id) });
        return BAD();
    }
    if (user.accountStatus === "suspended" || user.isActive === false || user.isDeleted === true) {
        return fail(res, 403, "ACCOUNT_INACTIVE", "This account is not active. Please contact support.");
    }
    if (user.accountStatus !== "active") { user.accountStatus = "active"; await user.save(); } // members who verified before this field existed
    const token = Token.generate(
        { _id: user._id, category: user.category, email: user.mail, name: user.name, origin: user.origin, role: user.role ?? "respondent" },
        req.body?.remember === true ? "30d" : "1d"
    );
    eventStream.emitEvent("user-login", { _id: String(user._id) });
    const journey = await journeyFor(user);
    res.json({ status: "success", message: "Login successful", token, data: { journey } });
}));

// Automated tests only: read the mail the API would have sent. Not mounted unless NODE_ENV=test.
if (process.env.NODE_ENV === "test") {
    router.get("/__test/outbox", async (req, res) => {
        const { testOutbox } = await import("../../lib/mail.js");
        ok(res, "", testOutbox.filter((m) => !req.query.to || m.to === req.query.to));
    });
}

export default router;
