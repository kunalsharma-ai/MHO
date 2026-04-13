export { default as API } from "./API.js";
export { default as APIResponse } from "./APIResponse.js";
export { default as CrudController } from "./crudController.js";
import { default as fsLogger, FSLogger } from "./fsLogger.js";
export { default as expressRoute } from "./expressRoute.js";
export { default as expressView } from "./expressView.js";
export { default as isAuthenticated } from "./isAuthenticated.js";
export { default as Logger } from "./Logger.js";
export { default as mongooseModel } from "./mongooseModel.js";
export { default as Mutate } from "./Mutate.js";
export { default as Password } from "./password.js";
export { default as setOrigin } from "./setOrigin.js";
export { default as Token } from "./token.js";
export { default as getMailer } from "./getMailer.js";
export { default as sendMail } from "./sendMail.js";
export { default as eventStream } from "./EventStream.js"
export { default as isAdmin } from "./isAdmin.js";
const adminLogger=new FSLogger("app/logs/admin-logs",{
    locale: "en-IN",
    timezone: "IST"
})
export {
    fsLogger,
    adminLogger
}