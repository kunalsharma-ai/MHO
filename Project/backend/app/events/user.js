import {
    eventStream,
    fsLogger,
    getMailer,
    sendMail,
    adminLogger
} from "../../utils/index.js";
import { OTP as otpController } from "../controller/index.js";

// Logs keep who and what, never the record itself: no passwords, codes, DOB, phone or health answers.
const who = (d) => {
    const u = d?.user ?? d;
    return { _id: u?._id ? String(u._id) : undefined, category: u?.category, ...(d?.message ? { message: d.message } : {}) };
};

eventStream.onEvent("user-changed-password", (data) => {
    fsLogger.Log(`Password Changed`, who(data))
})

eventStream.onEvent("user-accepted-terms", (data) => {
    fsLogger.Log(`Terms Accepted: `, who(data))
})

eventStream.onEvent("user-updated", (data) => {
    fsLogger.Log(`User Updated: `, who(data))
})

eventStream.onEvent("user-chagned-payment-method", (data) => {
    fsLogger.Log(`Payment Method Changed: `, who(data))
})


eventStream.onEvent("user-invited-friends", (data) => {
    fsLogger.Log(`User Invited: `, who(data))
})

eventStream.onEvent("user-created", async data => {
    let otp = await otpController.generate(
        data._id,
        "email",
        data.origin,
        1 * 24 * 60 * 60 * 1000
    );
    let mailer = await getMailer(
        "register",
        "respondent",
        {
            user: data,
            otp
        }
    )
    await sendMail(
        { origin: data.origin, "content-type": "application/json" },
        data.mail,
        "My Health Opinions: Registration",
        mailer.data
    )
    fsLogger.Log(
        "OTP Sent to user",
        who(data)
    )
})
eventStream.onEvent("user-resend-otp", async data => {
    let otp = await otpController.generate(
        data._id,
        "email",
        data.origin,
        1 * 24 * 60 * 60 * 1000
    );
    let mailer = await getMailer(
        "register",
        "respondent",
        {
            user: data,
            otp
        }
    )
    await sendMail(
        { origin: data.origin, "content-type": "application/json" },
        data.mail,
        "My Health Opinions: Registration",
        mailer.data
    )
    fsLogger.Log(
        "OTP Sent to user",
        who(data)
    )
})
eventStream.onEvent("user-password-reset", data => {
    fsLogger.Log(
        "Password Changed",
        who(data)
    )
})
eventStream.onEvent("user-login", data => {
    fsLogger.Log(
        "User Logged In",
        who(data)
    )
})
eventStream.onEvent("user-login-failed", data => {
    fsLogger.Log(
        "Login Failed",
        who(data)
    )
})

eventStream.onEvent("admin-list-users", data => {
    adminLogger.Log(
        `${data.admin.fullName} (${data.admin.mail}) Checking userlist`
    )
})
eventStream.onEvent("admin-login-as-user", data => {
    adminLogger.Log(
        `${data.admin.fullName} (${data.admin.mail}) logged in as ${data.user.fullName} (${data.user.mail})`
    )
})
eventStream.onEvent("admin-login-as-user-error", data => {
    adminLogger.Log(
        "Trying to Login as user",
        data
    )
})
eventStream.onEvent("admin-user-terms-deleted", data => {
    adminLogger.Log(
        "Deleted User Terms",
        data
    )
});
eventStream.onEvent("admin-user-cleanup", data => {
    adminLogger.Log(
        "Cleaned up user",
        data
    )
})
eventStream.onEvent("admin-user-profile-check", data => {
    adminLogger.Log(
        `${data.admin.fullName} (${data.admin.mail}) checked user profile of ${data.user.fullName} (${data.user.mail})`
    )
})
eventStream.onEvent("admin-user-open", data => {
    adminLogger.Log(
        `${data.admin.fullName} (${data.admin.mail}) Opening ${data.user.fullName} (${data.user.mail})`
    )
});
eventStream.onEvent("admin-user-updated", data => {
    adminLogger.Log(
        "Updated user",
        data
    )
});
eventStream.onEvent("admin-user-deleted", data => {
    adminLogger.Log(
        "Deleted User",
        data
    )
});
