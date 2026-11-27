import { API } from "./index.js";

async function sendMail(headers, to, subject, content, cc = null, bcc = null, attachments = null) {
    const emailAPI = new API({
        baseURL: process.env.EMAIL_SERVICE_URL || "http://email:3000",
        headers
    })
    return await emailAPI.post(`/email`, {
        to,
        subject,
        content,
        cc,
        bcc,
        attachments
    });

}
export default sendMail;