import mongoose from "mongoose";
import crypto from "node:crypto";
import mongooseModel from "../../utils/mongooseModel.js"; // adjust path as needed

export default mongooseModel(
  "OTP",
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    channel: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000) },
    attempts: { type: Number, default: 0 }
  },
  [
    [{ user: 1, type: 1, origin: 1 }, { unique: true }],
    [{ expiresAt: 1 }, { expireAfterSeconds: 0 }]
  ],
  {
    method: {
      async generateOTP(user, channel, origin, validFor) {
        const OTPModel = this.constructor;

        // check for existing OTP
        const existing = await OTPModel.findOne({ user, channel, origin });
        if (existing) return existing;

        // a cryptographic random number (the old pseudo-random codes could be predicted from earlier ones)
        const otpCode = String(crypto.randomInt(100000, 1000000));

        const otpDoc = await OTPModel.create({
          user,
          channel,
          code: otpCode,
          expiresAt: (Date.now() + validFor),
          origin, // required by your base model
        });
        return otpDoc;
      },
      async remove(){
        return this.deleteOne();
      }
    }
  });

