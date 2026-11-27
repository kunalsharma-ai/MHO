import nodemailer from "nodemailer"
class Mail {
  #transporter;
  #replyTo;
  constructor(credentials) {
    // `name` in the site settings is the sender's display name ("My Health Opinions"). nodemailer reads `name` as the
    // hostname it greets the SMTP server with, and a strict server refuses "HELO My Health Opinions" (#42). So only
    // the connection settings go to the transport; the display name is used in the From line by server.js.
    const { name, from, replyTo, ...smtp } = credentials || {};
    // A relay that needs no login (like config/mho.localhost.json: a user but no password) must get no `auth` at all:
    // with a user and no password nodemailer stops with 'Missing credentials for "PLAIN"' and nothing is sent.
    if (smtp.auth && !(smtp.auth.user && smtp.auth.pass)) delete smtp.auth;
    this.#replyTo = replyTo || undefined;
    this.#transporter = nodemailer.createTransport({
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 15000,
      ...smtp,
    });
  }
  send(from, to, subject, message, cc = undefined, bcc = undefined, attachments = undefined) {
    return new Promise((resolve, reject) => {

      this.#transporter.sendMail({
        from,
        to,
        cc,
        bcc,
        replyTo: this.#replyTo,
        subject,
        attachments,
        text: message.text,
        html: message.html
      }, (error, info) => {
        if (error) {
          return reject(error);
        }
        resolve(info);
      });
    })
  }
  async verify() {
    try {
      console.log("Connecting")
      let resp = await this.#transporter.verify();
      console.log("Connected successfully")
      return true;
    } catch (error) {
      throw error
    }
  }
}

export default Mail;