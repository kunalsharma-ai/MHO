import mongoose from "mongoose";

// Server-issued CAPTCHA challenges: the answer never leaves the server (only an SVG drawing of it does),
// each challenge can be solved once, and it lapses after 10 minutes.
const schema = new mongoose.Schema(
    {
        answerHash: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        usedAt: { type: Date, default: null },
        attempts: { type: Number, default: 0 },
    },
    { versionKey: false, collection: "CaptchaChallenge" }
);
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.CaptchaChallenge || mongoose.model("CaptchaChallenge", schema);
