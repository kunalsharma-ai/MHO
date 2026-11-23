import express from "express";
import { User as userController, OTP as otpController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token } from "../../../utils/index.js"

const router = express.Router();
router
    .route("/")
    .post(expressRoute(
        async req => {
            let message = "A password reset link has been sent to your mailbox, Please check your email and proceed.";
            let user = await userController.list({ mail: req.body.user });
            // same answer whether or not the address is registered (no account probing)
            if (user.length !== 1) return { message, data: [] };
            let otp = await otpController.generate(
                user[0]._id,
                "email",
                req.origin,
                1 * 24 * 60 * 60 * 1000
            );
            let mailer = await getMailer(
                "register",
                "forgot-password",
                {
                    user: user[0],
                    otp
                }
            )
            // /*
            await sendMail(
                { origin: req.origin, "content-type": "application/json" },
                user[0].mail,
                "My Health Opinions: Forgot Password",
                mailer.data
            )
                //*/
            return { message, data: [] };
        },
        userController
    ))
    .patch(expressRoute(
        async req=>{

        },
        userController
    ))
// Generate and Send OTP
// Verify OTP
// Set Password
export default router;