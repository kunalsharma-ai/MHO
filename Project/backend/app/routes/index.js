import express from "express";
import authRouter from "./api/Auth.js";
import categoryRouter from "./api/Category.js";
import questionRouter from "./api/Question.js";
import optionRouter from "./api/Option.js";
import optionsRouter from "./api/options.js";
import surveyRouter from "./api/Survey.js";
import profileRouter from "./api/Profile.js";
import ansRouter from "./api/Answers.js";
import userRouter from "./api/User.js";
import feasibilityRouter from "./api/Feasibility.js";
import projectRouter from "./api/ProjectLaunch.js";
import supportRouter from "./api/Support.js";
import forgotPassword from "./api/forgotPassword.js";
import meResponse from "./api/Response.js";
import llmRouter from "./api/llm.js"
import batchRouter from "./api/Batch.js"
import rewardsRouter from "./api/Reward.js";

import { isAuthenticated } from "../../utils/index.js";
import { requireAdmin } from "../../utils/access.js";
import { bindRequest } from "../../utils/requestContext.js";
import { securityHeaders, sanitizeInput } from "../../utils/security.js";

import meRouter from "./api/Me.js";
import changeEmail from "./api/changeEmail.js"
import contentRouter from "./api/Content.js";
import accountRouter from "./api/Account.js";
import meJourneyRouter from "./api/MeJourney.js";
const router = express.Router();
router
    // every answer gets the browser security headers; member routes run in their own request context (so two
    // requests can't swap brands or members while they wait for the database) and never see code-running Mongo
    // operators
    .use(securityHeaders)
    .use("/api/v1", bindRequest, sanitizeInput)
    // .use("/api/v1/llm", llmRouter)
    .use("/api/v1/answers", ansRouter)
    .use("/api/v1/auth", authRouter)
    .use("/api/v1/category", categoryRouter)
    .use("/api/v1/survey", surveyRouter)
    .use("/api/v1/question", questionRouter)
    .use("/api/v1/option", optionRouter)
    .use("/api/v1/options", optionsRouter)
    .use("/api/v1/content", contentRouter)
    .use("/api/v1/user", userRouter)
    .use("/api/v1/profile", profileRouter)
    .use("/api/v1/forgot-password", forgotPassword)
    .use("/api/v1/change-email", changeEmail)
    .use("/api/v1/feasibility", feasibilityRouter)
    // projects and scheduled e-mail batches are admin tools (project-dev had no sign-in at all)
    .use("/api/v1/project-dev", requireAdmin, projectRouter)
    .use("/api/v1/rewards", isAuthenticated, rewardsRouter)
    .use("/api/v1/account", accountRouter)
    .use("/api/v1/me", isAuthenticated, meJourneyRouter)
    .use("/api/v1/me", isAuthenticated, meRouter)
    .use("/api/v1/response", isAuthenticated, meResponse)
    .use("/api/v1/support", isAuthenticated, supportRouter)
    .use("/api/v1/project", requireAdmin, projectRouter)
    .use("/api/v1/batch", requireAdmin, batchRouter)


// router
//     .use("/api/v1/respondent",respondentRouter)
export default router;