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
        testOutbox.push({ to: user.mail, segment: segment.id, template, subject, data });
        return true;
    }
    try {
        const mailer = await getMailer(segment.mailer, template, data, { origin: user.origin });
        await sendMail({ origin: user.origin, "content-type": "application/json" }, user.mail, subject, mailer.data);
        return true;
    } catch (error) {
        // log the template and user id only, never the link
        fsLogger.Log(`Mail ${segment.id}/${template} failed for user ${user._id}: ${error.message}`);
        return false;
    }
}
