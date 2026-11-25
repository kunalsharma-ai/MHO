import express from "express";
import { requireAdmin } from "../../../utils/access.js";
import {
    Survey as surveyController,
    User as userController,
    OTP as otpController,
    Answer as answerController,
    Response as responseController
} from "../../controller/index.js";
import {
    Mutate,
    expressRoute,
    expressView,
    isAuthenticated,
    fsLogger,
    getMailer,
    sendMail,
    Token,
    eventStream
} from "../../../utils/index.js"
import { REFUSAL_TEXT } from "../../lib/guardian.js";
Date.prototype.resetTime = function (type = "start") {
    if (type === "end") {
        this.setHours(23);
        this.setMinutes(59);
        this.setSeconds(59);
    } else {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
    }
}
const special = {
    "address-practice": "stringify",
    "age": "skip",
    "respID": "skip"
}
const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Invalid request");
            answerController.request = req;
            let message = "";
            let data = Mutate(await userController.read(req.user._id))
            data.fullname = data.fullName;
            let navbar = [
                {
                    link: "/admin/dashboard",
                    text: "Admin Zone",
                    icon: "fa-solid fa-gear",
                    roles: ["admin", "superadmin", "root"]
                },
                {
                    link: "/member/dashboard",
                    text: "Dashboard",
                    icon: "icon-drawer",
                    roles: ["admin", "superadmin", "root", "respondent"]
                },
                {
                    link: "/member/myaccount",
                    text: "My Account",
                    icon: "icon-user",
                    roles: ["admin", "superadmin", "root", "respondent"]
                },
                {
                    link: "/member/settings",
                    text: "Settings",
                    icon: "icon-settings",
                    roles: ["admin", "superadmin", "root", "respondent"]
                }
            ]
                .map(link => link.roles.includes(data.role) ? ({
                    link: link.link,
                    text: link.text,
                    icon: link.icon
                }) : null)
                .filter(link => Boolean(link));
            data = { ...Mutate(data), ...req.user, navbar }
            return { message, data };
        },
        userController
    ))
    .post(expressRoute(
        async req => {
            if (!req.user || !req.user._id) throw new Error("Invalid request");
            answerController.request = req;
            let message = "";
            let data = Mutate(await userController.read(req.user._id))
            data.whatsapp = data.phone;
            let temp = Mutate(await answerController.getAnswers({ user: req.user._id, question: { $in: [...req.body.questions] } }))
            return { message, data: { ...data, ...temp } };
        },
        userController
    ))
    .patch(expressRoute(
        async req => {
            const [message, data] = ["Password Change Successfully", []];
            const { oldPassword, newPassword, cnfPassword } = req.body;
            if (newPassword !== cnfPassword) throw new Error("Invalid request")
            await userController.changePassword(oldPassword, newPassword);
            eventStream.emitEvent("user-changed-password", { user: req.user })
            return { message, data }
        },
        userController
    ))
    .put(expressRoute(
        async req => {
            const { terms } = req.body;
            const [message, data] = ["Updated successfully", []];
            // Only fields a member may change about themselves. Role, category, email, verification, account
            // status, DOB and origin can no longer be set through this route (they were before: mass assignment).
            const ALLOWED = ["name", "gender", "phone", "timezone", "address", "profilePicture", "notification", "socials", "terms", "consent", "postalCodeApplicable", "qualityScore"];
            const update = Object.fromEntries(Object.entries(req.body || {}).filter(([k]) => ALLOWED.includes(k)));
            if ("qualityScore" in update) {
                // the member area credits +1 per completed item from the browser (hooks/useRewardsRefresh.js);
                // until that moves to the server, accept only small increases
                const current = Number(req.user.qualityScore) || 0;
                const wanted = Number(update.qualityScore);
                if (!Number.isFinite(wanted) || wanted < current || wanted > Math.min(200, current + 5)) delete update.qualityScore;
            }
            if (update.name && typeof update.name === "object") update.name = { salutation: update.name.salutation, first: update.name.first, middle: update.name.middle, last: update.name.last };
            await userController.update(req.user._id, update);
            if (!!terms) {
                eventStream.emitEvent("user-accepted-terms", { ...req.user, terms })
            } else {
                eventStream.emitEvent("user-updated", { ...req.user, ...req.body })
            }
            return { message, data };
        },
        userController
    ))
router
    .get("/points", expressRoute(
        async req => {
            let message = "";
            let data = []
            responseController.request = req;
            let respPoints = await responseController.getPoints();
            data = {
                respPoints,
                redeemPoints: 0,
                totalPoints: (respPoints - 0),
                threshold: 2500,
                conversionRate: 0.01
            }
            return { message, data }
        },
        userController
    ))
    .get(`/statistics`, expressRoute(
        async req => {
            let data = [];
            let message = "";

            responseController.request = req;
            data = Mutate(await responseController.surveySummary());
            if (data.length === 1) data = data[0]
            return { message, data }
        },
        responseController
    ))
    .get(`/rewards`, expressRoute(
        async req => {
            let message = "";
            const data = {
                total: 0,
                claimed: 0,
                earned: 0,
            }
            return { message, data }
        },
        responseController
    ))
    .patch(`/answer`, expressRoute(
        async req => {
            let [message, data] = ["Updated successfully", []]
            const questions = Object.keys(req.body);
            const answers = questions.map(fld => {
                return {
                    user: req.user._id,
                    question: fld,
                    answer: req.body[fld]
                }
            })
            const result = await answerController.save(answers)
            if (result.refused.length && !result.saved.length) throw new Error(REFUSAL_TEXT[result.refused[0].reason] || "This answer cannot be changed.")
            return { message, data: result }
        },
        answerController
    ))
    // members can't change their own segment: admins only
    .patch("/change-category", requireAdmin, expressRoute(
        async req => {
            const [message, data] = [
                "Category Updated",
                await userController.changeCategory(req.body.category)
            ];
            return { message, data };
        },
        userController
    ))
    .patch("/payment-method", expressRoute(
        async req => {
            const [message, data] = [
                "Payment Method Updated",
                await userController.changePaymentMethod(req.body)
            ];
            eventStream.emitEvent("user-changed-payment-method", {
                ...req.user, info: {
                    ...req.body
                }
            })
            return { message, data };
        },
        userController
    ))
    .patch("/parent-details",
        expressRoute(
            async req => {
                await userController.update(req.user._id, { ...req.body });
                let user = Mutate(await userController.read(req.user._id))
                return {
                    status: "success",
                    message: "",
                    data: user
                }
            },
            userController
        )
    )
router
    .route("/change-email")
    .patch(expressRoute(
        async req => {
            let [message, data] = ["", await userController.read(req.user._id)];
            let otp = await otpController.generate(
                data._id,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );
            let token = Token.generate({
                user: data._id,
                otp: otp.code,
                email: req.body.email
            }, "24h")
            let mailer = await getMailer(
                "register",
                "change-email",
                {
                    user: data,
                    token,
                    email: req.body.email
                }
            )

            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                data.mail,
                "My Health Opinions: Update E-Mail Address",
                mailer.data
            )
            message = `Please check your inbox and spam folders of email (${data.mail}) to proceed further in the process.`
            return { message, data };
        },
        userController
    ))
router
    .route("/invite")
    .post(expressRoute(
        async req => {
            const me = await userController.read(req?.user?._id);
            let mails = req.body.emails ?? [];
            let users = Mutate(await userController.list({
                mail: { $in: mails }
            })).map(u => u.mail)
            const emails = mails.filter(e => !users.includes(e));
            // /*
            let mailer = await getMailer(
                "register",
                "invite",
                {
                    user: me,
                    ref: {
                        link: `https://${req.origin}/?ref=${me._id}&signup`
                    }
                }
            )

            for (let index = 0; index < emails.length; index++) {
                const email = emails[index];
                await sendMail(
                    {
                        origin: req.origin,
                        "content-type": "application/json"
                    },
                    email,
                    `Invitation from ${me.fullName} to join My Health Opinions, A survey portal for Healthcare Industry`,
                    mailer.data
                )
            }
            await userController.addInvites(emails);
            eventStream.emitEvent("user-invited-friends", {
                invited: emails,
                alreadyRegistered: users
            })
            return {
                message: "E-Mail Sent Successfully", data: {
                    invited: emails,
                    alreadyRegistered: users
                }
            }
        },
        userController
    ))
    .get(expressRoute(
        async req => {
            return {
                message: "",
                data: await userController.invitedUsers()
            }
        },
        userController
    ))
router
    .route("/profile")
    // the member's own profile answers. Teen members: see lib/guardian.js for who may change which answer.
    .patch(async (req, res) => {
        try {
            const user = req.user;
            const questions = Object.keys(req.body || {});
            if (!user || questions.length < 1) return res.status(400).json({ status: "error", message: "Invalid request" });
            answerController.request = req;
            const result = await answerController.save(questions.map((fld) => ({ user: user._id, question: fld, answer: req.body[fld] })));
            if (result.refused.length && !result.saved.length) {
                return res.status(403).json({ status: "error", code: "ANSWER_REFUSED", message: REFUSAL_TEXT[result.refused[0].reason] || "This answer cannot be changed.", data: result });
            }
            res.json({ status: "success", message: "Profile updated successfully", data: result });
        } catch (error) {
            fsLogger.Log(`me/profile failed: ${error.message}`);
            res.status(500).json({ status: "error", message: "Your answer was not saved. Please try again." });
        }
    })
router
    .route("/survey")
    .get(expressRoute(
        async req => {
            let message = "";
            let data = await responseController.mySurveyCounts();
            return { message, data }
        },
        responseController
    ))
    .post(expressRoute(
        async req => {
            let message = "";
            const { dateRange, source, status } = req.body;
            let filters = {}
            if (dateRange && (dateRange instanceof Array) && dateRange.length === 2) {
                const start = new Date(dateRange[0]);
                const end = new Date(dateRange[1]);
                start.resetTime("start");
                end.resetTime("end");
                filters = {
                    ...filters,
                    createdAt: {
                        $gte: start,
                        $lte: end
                    }
                }
            }
            if (source) {
                filters = {
                    ...filters,
                    source
                }
            }
            if (status) {
                filters = {
                    ...filters,
                    status
                }
            }
            let data = await responseController.mySurveys(filters);
            // throw new Error("Under development")
            return { message, data }
        },
        responseController
    ))
    .put(expressRoute(
        async req => {
            let message = "";
            surveyController.request = req;
            let data = await surveyController.openBySlug(req.body.slug)
            if (!data) throw new Error("Invalid Request");
            let resp = Mutate(await responseController.createOrUpdate({
                user: req.user._id,
                survey: {
                    name: data.name,
                    slug: data.slug
                },
                timeline: {
                    start: new Date(),
                },
                telemetry: [
                    {
                        key: "UserAgent",
                        value: req.headers["user-agent"]
                    },
                    {
                        key: "Languages",
                        value: req.headers["accept-language"]
                    },
                    {
                        key: "IP Address",
                        value: req.clientIP
                    }
                ],
                status: "dropout",
                source: data.source,
                points: data.points
            }))

            eventStream.emitEvent("survey-internal-started", {
                user: req.user,
                response: resp
            })
            return { message, data: { ...data, respID: resp._id, userInfo: req.user } }
        },
        responseController
    ))
    .patch(expressRoute(
        async req => {
            surveyController.request = req;
            answerController.request = req;
            let message = "";
            let data = []
            let response = await responseController.read(req.body.respID);

            if (response.status !== "dropout") throw new Error("Invalid request");

            const answers = Object.entries(req.body).map(([fld, value]) => {
                let answer = value;
                switch (special[fld]) { //special fields
                    case "stringify":
                        answer = JSON.stringify(value);
                        break;
                    case "skip":
                        return null;
                    default:
                        break;
                }
                return {
                    user: req.user._id,
                    question: fld,
                    answer
                }
            }).filter(val => Boolean(val))
            // console.log(answers);
            const questions = Object.keys(answers);
            // throw new Error("On Hold");
            const me = questions.filter(fld => typeof req.body[fld] === "object" && !Array.isArray(req.body[fld])).map(
                fld => {
                    let temp = fld.split("-")
                    const ans = req.body[fld];
                    let gps = ans?.consent === "Yes" ? {
                        type: "Point",
                        coordinates: [ans.coordinates.lat, ans.coordinates.lng]
                    } : null;

                    if (temp[0] === "address") {
                        return {
                            address: {
                                tag: temp[1],
                                house: ans.line1,
                                street: ans.line2,
                                city: ans.city,
                                state: ans.state,
                                zipcode: ans.zipcode,
                                country: ans.country,
                                gps
                            }
                        }
                    }
                    else {
                        return { [fld]: ans }
                    }
                }
            )
            userController.req = req;
            for (let index = 0; index < me.length; index++) {
                const element = me[index];
                let resp = await userController.update(req.user._id, element)
            }
            eventStream.emitEvent("survey-internal-completed", {
                user:req.user,
                response
            })
            await answerController.save(answers)
            response.status = "complete";
            response.timeline.end = new Date();
            await response.save()
            return { message, data }
        },
        responseController
    ))
export default router;