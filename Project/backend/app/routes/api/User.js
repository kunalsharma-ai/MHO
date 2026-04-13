
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
} from "/src/utils/index.js"

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
    .put(expressRoute(
        async req => {
            const userInfo = req.body;
            const unwantedCols = ["password", "fullName", "age"];
            for (let index = 0; index < unwantedCols.length; index++) {
                const col = unwantedCols[index];
                if (col in userInfo) delete (userInfo[col]);
            }
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
    .patch(expressRoute(
        async req => {
            if (!req?.body?.password || !req?.body?.confirmPassword || req?.body?.password !== req?.body?.confirmPassword) throw new Error("Passwords not matching.")
            const message = "Your password is created. Go to login page and proceed.";
            let otp = await otpController.verify(req.body.userID, "email", req.origin, req.body.emailOTP);
            if (!otp) throw new Error("Link Expired. Unable to set password.");
            let status = await userController.setPassword(req.body.userID, req.body.password)
            if (!status) throw new Error("Something went wrong. Please contact support for more details");
            await otp.remove();
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
    .post("/login", expressRoute(
        async req => {
            const message = "Login successful";
            let data = [];
            try {
                const user = await userController.login(req.body);
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
                eventStream.emitEvent("user-login-failed", {
                    message: error.message,
                    data: req.body
                })
                throw new HttpError(error.message, 401);
            }
        },
        userController
    ))
    .put("/login", expressRoute(
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
                }, "365d")
                eventStream.emitEvent("user-login-api", user);
                return { message, data, token }
            } catch (error) {
                console.log(error)
                eventStream.emitEvent("user-login-failed", {
                    message: error.message,
                    data: req.body
                })
                throw new HttpError(error.message, 401);
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
    .post(expressRoute(
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
