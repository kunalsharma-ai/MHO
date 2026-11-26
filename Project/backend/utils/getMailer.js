import {API} from "./index.js";

async function getMailer(category, type, data,headers) {
    const mailerAPI = new API({
        baseURL: process.env.MAILER_TEMPLATE_URL || "http://api-email-template:8080",
        headers
    })
    return await mailerAPI.post(`/api/v1/mailer/${category}/${type}`, data);

}
export default getMailer;