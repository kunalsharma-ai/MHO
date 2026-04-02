import Mail from "./Mail.js";
import Twig from "twig";
const mail = new Mail({
    name: "No Reply",
    host: "email-server",
    port: 1025,
    secure: false,// ["ssl", "tls"].includes(data.security),
    // auth: data.auth,
    from: "no-reply@localhost.com",
    replyTo: "support@localhost.com"
});

export default async function sendMail(
    {
        _id,
        parameters,
        emails,
        subject,
        template,
        sender
    }
) {

    if (!(emails instanceof Array)) throw new Error("Invalid Email List");
    if (!(parameters instanceof Array)) throw new Error("invalid parameter set");
    if (emails.length !== parameters.length) throw new Error("Invalid request");
    for (let index = 0; index < emails.length; index++) {
        const rcpt = emails[index];
        const params = parameters[index];
        const messageTemplate = Twig.twig(
            {
                data: template
            }
        )
        const message = messageTemplate.render(params);
        console.log(rcpt)
        let resp = await mail.send(
            sender,
            rcpt,
            subject,
            {
                text:"",
                html:message
            }
        )
        console.log(resp);
    }
}