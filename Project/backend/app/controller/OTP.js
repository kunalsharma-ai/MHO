import { CrudController } from "../../utils/index.js";
import { OTP as otpModel } from "../model/index.js";

const MAX_WRONG = 5;

class OTPController extends CrudController {
  async generate(user, channel, origin, validFor) {
    const otp = new otpModel();
    return await otp.generateOTP(user, channel, origin, validFor);
  }

  // A code is good for 5 wrong guesses: then it is deleted and the member asks for a new one. Without this, a bot
  // could try every 6-digit code against someone's set-password or reset link.
  async verify(user, channel, origin, code) {
    user = String(user ?? "");
    if (!/^[a-f0-9]{24}$/i.test(user) || typeof channel !== "string" || typeof origin !== "string") return null;
    code = typeof code === "string" || typeof code === "number" ? String(code) : "";
    const otp = await otpModel.findOne({ user, channel, origin });
    if (!otp) return null;
    if (!code || otp.code !== code) {
      if ((otp.attempts || 0) + 1 >= MAX_WRONG) await otp.deleteOne();
      else await otpModel.updateOne({ _id: otp._id }, { $inc: { attempts: 1 } });
      return null;
    }
    if (otp.expiresAt < new Date()) return null; // an expired code counts as no code
    return otp;
  }
}

export default new OTPController(otpModel);
