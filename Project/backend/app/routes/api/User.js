
Date.prototype.isMinor = function (cn = "IN") {
    let today = new Date();
    let age = (today - this) / (365.25 * 24 * 3600 * 1000);
    return age < 18
}

import express from "express";
import {
    HttpError
} from "express-web-tools"
import {
    User as userController,
    OTP as otpController,
    Answer as answerController,

} from "../../controller/index.js";
import {
    eventStream,
    isAdmin,
    Mutate,
    expressRoute,
    expressView,
    isAuthenticated,
    fsLogger,
    getMailer,
    sendMail,
    Token,
    adminLogger
} from "../../../utils/index.js"
import { lockedFor, fail, clear, norm } from "../../../utils/throttle.js";
import { createCaptcha, requireCaptcha } from "../../../utils/captcha.js";
import { limit } from "../../../utils/security.js";
import { User as UserModel } from "../../model/index.js";

// What a visitor may never set when registering (role, verification, status, points...): an admin role from the
// sign-up form would have made the visitor an admin.
const REGISTER_BLOCKED = ["password", "fullName", "age", "role", "isVerified", "memberStatus", "qualityScore", "isActive", "isDeleted", "origin", "_id", "createdAt", "updatedAt", "created", "updated", "deleted", "points", "balance", "respondentID", "registrationStatus", "data_mode", "adultMove", "sortOrder", "expert", "adminNote"];

const router = express.Router();
router
    .route('/')
    .get(
        isAdmin,
        expressRoute(
            async req => {
                // Read all entries
                let message = "";
                let data = await userController.list()
                eventStream.emitEvent("admin-list-users", {
                    admin: req.user
                })
                return { message, data };
            },
            userController
        ))
    .post(isAdmin, expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "";
            let data = await userController.list(req.body, null, {}, "+role +isActive")
            eventStream.emitEvent("admin-list-users", {
                admin: req.user,
                filter: req.body
            })
            return { message, data };
        },
        userController
    ))
    .put(limit(20, 60), expressRoute(
        async req => {
            await requireCaptcha(req); // the human check (required for every client once CAPTCHA_REQUIRED=true)
            const userInfo = { ...(req.body && typeof req.body === "object" ? req.body : {}) };
            for (const col of Object.keys(userInfo))
                if (REGISTER_BLOCKED.includes(col) || col.startsWith("$") || col.includes(".")) delete userInfo[col];
            let message = "";
            let data = await userController.create(userInfo);
            eventStream.emitEvent("user-created",
                data
            )

            return {
                message, data: {
                    _id: data._id
                }
            };
        },
        userController
    ))
    .patch(limit(20, 10), expressRoute(
        async req => {
            if (!req?.body?.password || !req?.body?.confirmPassword || req?.body?.password !== req?.body?.confirmPassword) throw new Error("Passwords not matching.")
            const message = "Your password is created. Go to login page and proceed.";
            let otp = await otpController.verify(req.body.userID, "email", req.origin, req.body.emailOTP);
            if (!otp) throw new Error("Link Expired. Unable to set password.");
            let status = await userController.setPassword(req.body.userID, req.body.password)
            if (!status) throw new Error("Something went wrong. Please contact support for more details");
            await otp.discard();
            eventStream.emitEvent("user-password-reset", status);
            return { message, data: [] };
        },
        userController
    ))
router
    .get("/summarize",
        isAdmin,
        expressRoute(
            async req => {
                const message = "";
                let data = await userController.summary();
                return { message, data }
            },
            userController
        ))
    // a new human check (picture, or ?mode=text for a small sum); each one can be checked once, within 5 minutes
    .get("/captcha", limit(60, 10), expressRoute(
        async req => ({ message: "", data: await createCaptcha(req.origin, req.query.mode === "text" ? "text" : "image") }),
        userController
    ))
    // Issue #56: the sign-up forms (frontend-1 Join, web SignUp) ask POST /api/v1/user/check { mail } whether the email is
    // already registered. The route was missing, so "check" fell through to POST /:id and answered 404. Same shape as
    // every answer: { status, message, data: [<number of accounts with this email on this site>] }. Rate limited.
    .post("/check", limit(30, 10), expressRoute(
        async req => {
            const mail = typeof req.body?.mail === "string" ? req.body.mail.trim().toLowerCase() : "";
            if (!mail || mail.length > 254) return { message: "", data: [0] };
            const count = await UserModel.countDocuments({ mail, origin: req.origin });
            return { message: "", data: [count] };
        },
        userController
    ))
    .post("/login", limit(30, 10), expressRoute(
        async req => {
            const message = "Login successful";
            let data = [];
            await requireCaptcha(req);
            // strings only (an object here would be a database filter), and a per-account lock after 10 wrong
            // passwords in 15 minutes, so a bot that keeps changing its address gets no further
            const { mail, phone, password } = req.body || {};
            if (typeof password !== "string" || !password || (typeof mail !== "string" && typeof phone !== "string"))
                throw new HttpError(401, "E-Mail id or Password is invalid");
            const who = `login:${req.origin}:${norm(typeof mail === "string" && mail ? mail : phone)}`;
            const wait = await lockedFor(who);
            if (wait) throw new HttpError(429, `Too many wrong attempts. Please wait ${wait} minute${wait === 1 ? "" : "s"} or reset your password.`);
            try {
                const user = await userController.login(typeof mail === "string" && mail ? { mail, password } : { phone, password });
                await clear(who);
                const token = Token.generate({
                    _id: user._id,
                    category: user.category,
                    email: user.mail,
                    phone: user.phone,
                    name: user.name,
                    origin: user.origin,
                    role: user.role
                })
                eventStream.emitEvent("user-login", user);
                return { message, data, token }
            } catch (error) {
                console.log(error)
                if (/invalid/i.test(error.message)) await fail(who, { max: 10, windowMin: 15, lockMin: 15 });
                eventStream.emitEvent("user-login-failed", {
                    message: error.message,
                    data: { mail: req.body?.mail, _id: req.body?._id }
                })
                throw new HttpError(401, error.message);
            }
        },
        userController
    ))
    // "Log in as this panelist" from the admin panelist page. It had no check at all: anyone who knew a member's id
    // got a year-long sign-in for them. Admins only now, and the token lasts a day.
    .put("/login", isAdmin, expressRoute(
        async req => {
            const message = "Login successful";
            let data = [];
            try {
                const user = await userController.read(req.body._id);
                const token = Token.generate({
                    _id: user._id,
                    category: user.category,
                    email: user.mail,
                    phone: user.phone,
                    name: user.name,
                    origin: user.origin,
                    role: user.role
                }, "1d")
                eventStream.emitEvent("user-login-api", user);
                return { message, data, token }
            } catch (error) {
                console.log(error)
                eventStream.emitEvent("user-login-failed", {
                    message: error.message,
                    data: { mail: req.body?.mail, _id: req.body?._id }
                })
                throw new HttpError(401, error.message);
            }
        },
        userController
    ))
    .post("/autologin", isAdmin, expressRoute(
        async req => {
            const message = "Login successful";
            let token;
            const user = await userController.read(req.body._id);
            eventStream.emitEvent(`admin-login-as-user${(!user) ? "-error" : ""}`, { user, request: req.body })
            if (!user) throw new Error("Invalid request");
            token = Token.generate({
                _id: user._id,
                category: user.category,
                email: user.email,
                phone: user.phone,
                name: user.name,
                origin: user.origin
            })
            // throw new Error("Abhi login hold pe hai")
            return { message, data: [], token }
        },
        userController
    ))
    .delete(`/terms`, isAdmin, expressRoute(
        async req => {
            const message = "Terms reset";
            let token;
            const user = await userController.update(req.body._id, { terms: [] });
            if (!user) throw new Error("Invalid request");
            eventStream.emitEvent("admin-user-terms-deleted", {
                admin: req.user,
                user
            })
            return { message, data: [], token }
        },
        userController
    ))
    .post("/refresh", isAdmin, expressRoute(
        async req => {
            const message = "Refreshed Respondent, All Records other than registration details removed.";
            const data = await userController.refreshUser(req.body);
            eventStream.emitEvent("admin-user-cleanup", { user: data, admin: req.user })
            return { message, data }
        },
        userController
    ))
    .post(`/resend`, expressRoute(
        async req => {
            // update single entry
            let message = req.body.action;
            let data = await userController.findOne({ mail: req.body.mail, origin: req.origin });

            eventStream.emitEvent("user-resend-otp",
                data
            )
            // // if (req.body.action === "resend-otp") {
            // let otp = await otpController.generate(
            //     data._id,
            //     "email",
            //     req.origin,
            //     1 * 24 * 60 * 60 * 1000
            // );
            // let mailer = await getMailer(
            //     "register",
            //     "respondent",
            //     {
            //         user: data,
            //         otp
            //     }
            // )
            // console.log({
            //     emailStatus: await sendMail(
            //         { origin: req.origin, "content-type": "application/json" },
            //         data.mail,
            //         "My Health Opinions: Registration",
            //         mailer.data
            //     )
            // })

            return { message: "Please check your email to proceed.", data: [] };
            // }
            // return { message:"Please check your email to proceed.", data };
        },
        userController
    ))
    .post(`/:user/profile-data`, isAdmin, expressRoute(
        async req => {
            let data = await userController.read(req.params.user)
            answerController.request = req;
            let temp = Mutate(await answerController.getAnswers({ user: req.params.user, question: { $in: [...req.body.questions] } }))
            let output = Object.fromEntries(Object.entries({ ...Mutate(data), ...temp }).map(info => {
                if (info[0] === "age") return null;
                if (req.body.questions.includes(info[0]))
                    return info;
                return null;
            }).filter(info => Boolean(info)))
            eventStream.emitEvent("admin-user-profile-check", {
                ...req.body,
                user: data,
                admin: req.user
            })
            return {
                message: "under development", data: output
            }
        },
        userController
    ))
router
    .route('/:id')
    .get(
        isAdmin,
        expressRoute(
            async req => {
                // read single entry
                let message = "";
                let data = await userController.read(req.params.id);
                eventStream.emitEvent(
                    "admin-user-open",
                    {
                        user: data,
                        admin: req.user
                    }
                )
                return { message, data };
            },
            userController
        ))
    .post(limit(30, 10), expressRoute(
        async req => {
            // read single entry
            let message = ""
            let otp = await otpController.verify(req.params.id, "email", req.origin, req.body.code)
            if (!otp) throw new Error("Link Expired")
            return { message, data: {} };
        },
        userController
    ))
    .put(
        isAdmin,
        expressRoute(
            async req => {
                // update single entry
                let message = "";
                let data = await userController.update(req.params.id, req.body)
                eventStream.emitEvent("admin-user-updated", { user: data, admin: req.user });
                return { message, data };
            },
            userController
        ))
    .patch(expressRoute(
        async req => {
            // update single entry
            let message = req.body.action;
            let data = await userController.read(req.params.id);
            if (req.body.action === "resend-otp") {
                let otp = await otpController.generate(
                    user._id,
                    "email",
                    req.origin,
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
                console.log({
                    emailStatus: await sendMail(
                        { origin: req.origin, "content-type": "application/json" },
                        data.mail,
                        "My Health Opinions: Registration",
                        mailer.data
                    )
                })

                return { message, data: [] };
            }
            return { message, data };
        },
        userController
    ))
    .delete(
        isAdmin,
        expressRoute(
            async req => {
                // delete single entry
                let message = "";
                let data = await userController.delete(req.params.id)
                eventStream.emitEvent("admin-user-deleted", { user: data, admin: req.user });
                return { message, data };
            },
            userController
        ))
export default router;
