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
    // The old unique index on { user, type, origin } is gone: the schema has no "type", so it allowed only one code per
    // member and blocked a second channel. The running API drops it at start ("OTP: dropped legacy index").
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
      // Not called "remove": Mongoose uses that name itself and warns at start when a schema overwrites it.
      async discard(){
        return this.deleteOne();
      }
    }
  });

