import { getMailer, sendMail, fsLogger } from "../../utils/index.js";
import { segmentFor } from "./segments.js";

// Sends one of the supplied segment mailers (Project/mailer/<segment>/<template>.liquid) through the existing
// email-template + email services. Subjects are the first subject of each template in the supplied manifests.
const SUBJECTS = {
    hcp: {
        respondent: "Verify your email to activate your MyHealthOpinions professional account",
        welcome: "Your MyHealthOpinions account is active",
        "forgot-password": "Reset your MyHealthOpinions password",
        "reset-password": "Create a new password for your MyHealthOpinions account",
        "consent-signed": "Your consent is signed — here is your copy",
        "consent-updated": "We’ve updated the panel terms — please review",
    },
    caregiver: {
        respondent: "Verify your email to join the MyHealthOpinions caregiver circle",
        welcome: "Your MyHealthOpinions account is active",
        "forgot-password": "Reset your MyHealthOpinions password",
        "reset-password": "Create a new password for your MyHealthOpinions account",
        "consent-signed": "Your consent is signed — here is your copy",
        "consent-updated": "We’ve updated the panel terms — please review",
    },
    patient: {
        respondent: "Verify your email to start with MyHealthOpinions",
        welcome: "Your MyHealthOpinions account is active",
        "forgot-password": "Reset your MyHealthOpinions password",
        "reset-password": "Create a new password for your MyHealthOpinions account",
        "consent-signed": "Your consent is signed — here is your copy",
        "consent-updated": "We’ve updated the panel terms — please review",
    },
};

// Automated tests read sent mail from here instead of a mail server.
export const testOutbox = [];
// Tests can make the next sends fail, as when the mail service has no SMTP settings for the site (issue #42).
export const testMailFailure = { on: false };

/**
 * Issue #42: utils/API resolves every HTTP answer, so a template or SMTP failure (a 404, a 500 from an empty SMTP
 * settings file, or the mail service's own { status: "error" }) used to count as "sent" and nothing was logged.
 * Now any of those is an error, the caller returns false and the failure is in the log.
 */
function checked(step, resp) {
    const body = resp?.data;
    const status = Number(resp?.status) || 0;
    if (status < 200 || status >= 300 || (body && typeof body === "object" && body.status === "error")) {
        const why = body && typeof body === "object" ? body.error || body.message || "" : String(body || "").replace(/<[^>]+>/g, " ").trim().slice(0, 120);
        throw new Error(`${step} answered ${status || "no status"}${why ? `: ${why}` : ""}`);
    }
    return body;
}
async function deliver(segment, template, to, subject, data, origin) {
    const mailer = checked("email-template", await getMailer(segment, template, data, { origin }));
    const html = typeof mailer === "string" ? mailer : mailer?.html || mailer?.data || "";
    if (!html || typeof html !== "string") throw new Error(`email-template gave no HTML for ${segment}/${template}`);
    // email service contract: success is { message: "message sent", data: <nodemailer info> }; a failed send is HTTP 200
    // with status "error", a site without SMTP settings 405 { headers }, a bad creds header { message }
    const sent = checked("email service", await sendMail({ origin, "content-type": "application/json" }, to, subject, html));
    if (sent?.message !== "message sent") throw new Error(`email service answered: ${sent?.error || sent?.message || "no confirmation"}`);
}

/** Only the fields the templates use: never the whole user record (no DOB, phone, address or health data). */
const mailUser = (user) => ({
    _id: String(user._id),
    mail: user.mail,
    origin: user.origin,
    memberId: user.respondentID || String(user._id).slice(-8).toUpperCase(),
    name: { first: user.name?.first || "" },
});

export async function sendSegmentMail(user, template, extra = {}) {
    const segment = segmentFor(user.category);
    if (!segment) throw new Error("This account has no member category. Please contact support.");
    const subject = SUBJECTS[segment.id][template];
    const data = { user: mailUser(user), preferences_url: `https://${user.origin}/member/settings`, ...extra };
    if (process.env.NODE_ENV === "test") {
        if (testMailFailure.on) return false;
        testOutbox.push({ to: user.mail, segment: segment.id, template, subject, data });
        return true;
    }
    try {
        await deliver(segment.mailer, template, user.mail, subject, data, user.origin);
        return true;
    } catch (error) {
        // log the template and user id only, never the link
        fsLogger.Log(`Mail ${segment.id}/${template} failed for user ${user._id}: ${error.message}`);
        console.error(`[mail] ${segment.id}/${template} to user ${user._id} failed: ${error.message}`); // shows in docker compose logs
        return false;
    }
}

/**
 * Asks a teen member's parent or guardian to approve the account (patient mailer "parent-approval").
 * Sent to the parent's email, never the teen's. Only the teen's first name goes into the mail.
 */
export async function sendParentApprovalMail(minor, link, code) {
    const to = link.parentEmail;
    const subject = `${minor.name?.first || "Your teen"} asked you to approve their MyHealthOpinions account`;
    const approve_url = `https://${minor.origin}/auth/guardian-approve?link=${link._id}&code=${encodeURIComponent(code)}`;
    const data = { teen: { first: minor.name?.first || "" }, approve_url, to, preferences_url: `https://${minor.origin}/member/settings`, link: { _id: String(link._id) }, otp: { code } };
    if (process.env.NODE_ENV === "test") {
        testOutbox.push({ to, segment: "patient", template: "parent-approval", subject, data });
        return true;
    }
    try {
        await deliver("patient", "parent-approval", to, subject, data, minor.origin);
        return true;
    } catch (error) {
        fsLogger.Log(`Mail patient/parent-approval failed for teen ${minor._id}: ${error.message}`);
        return false;
    }
}
