import mongoose from "mongoose";

// The link between a teen member (category "minor patient") and the parent or guardian who approved them.
// The teen names the parent's email at sign-up. Once the teen has verified their own email, the parent is sent a
// single-use link. The parent opens it from their own MyHealthOpinions login, which must use that same email,
// and approves or declines. While a link is approved, the parent may answer the teen's profile questions, and the
// teen may answer their own (see lib/guardian.js for who may change which answer).
const schema = new mongoose.Schema(
    {
        minor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        parentEmail: { type: String, required: true, lowercase: true, trim: true },
        parent: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // set when the parent approves
        status: { type: String, required: true, enum: ["pending", "approved", "declined", "revoked"], default: "pending" },
        // single-use approval link (only its hash is kept)
        tokenHash: { type: String, default: null },
        expiresAt: { type: Date, default: null },
        attempts: { type: Number, default: 0 },
        sentAt: { type: Date, default: null },
        requestedAt: { type: Date, default: Date.now },
        decidedAt: { type: Date, default: null },
        decidedFrom: { type: String, default: null }, // hashed IP
        // what the parent agreed to, copied from the "minor patient" category terms at the moment of approval
        accepted: { type: [{ name: String, body: String, isRequired: Boolean, _id: false }], default: undefined },
        origin: { type: String, required: true },
    },
    { versionKey: false, collection: "GuardianLink", timestamps: true }
);
schema.index({ minor: 1, origin: 1, requestedAt: -1 });
schema.index({ parent: 1, status: 1 });

export default mongoose.models.GuardianLink || mongoose.model("GuardianLink", schema);
