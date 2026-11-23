import mongoose from "mongoose";

// Single-use links sent by email (verify email + create password, reset password).
// Only a SHA-256 hash of the token is stored, so a database leak does not leak working links.
// A token is spent when `usedAt` is set; Mongo removes expired ones (TTL index) a day after expiry.
const schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
        purpose: { type: String, required: true, enum: ["verify-email", "reset-password"] },
        tokenHash: { type: String, required: true, unique: true },
        origin: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        usedAt: { type: Date, default: null },
        attempts: { type: Number, default: 0 },
        requestedFrom: { type: String, default: null }, // salted hash of the requesting IP, never the raw IP
    },
    { timestamps: true, versionKey: false, collection: "AuthToken" }
);
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

export default mongoose.models.AuthToken || mongoose.model("AuthToken", schema);
