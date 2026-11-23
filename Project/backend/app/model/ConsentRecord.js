import mongoose from "mongoose";

// Append-only consent history, one document per signature or decline, following the schema supplied
// with the three MHO consent packages (healthcare_member_consents and siblings). Records are evidence:
// the API never updates or deletes them. A member needs consent again when their latest "accept"
// record's termsVersion differs from the current version of their segment.
const approvals = {
    // required
    terms: { type: Boolean, required: true },
    privacy: { type: Boolean, required: true },
    accuracy: { type: Boolean, required: true },
    confidential: { type: Boolean, required: true },
    // optional
    interviews: { type: Boolean, default: false },
    clientContact: { type: Boolean, default: false },
    sensitive: { type: Boolean, default: false },
    marketing: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
};

const schema = new mongoose.Schema(
    {
        consentId: { type: String, required: true, unique: true }, // MHO-HCP-YYYYMMDD-XXXXXXXX, shown on the certificate
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // from the session, never the body
        segment: { type: String, required: true, enum: ["hcp", "caregiver", "patient"] },
        action: { type: String, required: true, enum: ["accept", "decline"], default: "accept" },
        termsVersion: { type: String, required: true },
        language: { type: String, default: "en" },
        approvals: { type: approvals, default: undefined },
        clausesReviewed: { type: [Number], default: [] },
        acceptedAt: { type: Date, required: true, default: Date.now }, // server time
        clientTime: { type: String, default: null },
        timezone: { type: String, default: null },
        ipHash: { type: String, default: null },
        userAgent: { type: String, default: null },
        origin: { type: String, required: true },
    },
    { versionKey: false, collection: "ConsentRecord" }
);
schema.index({ user: 1, acceptedAt: -1 });

const block = function () { throw new Error("Consent records are append-only"); };
["updateOne", "updateMany", "findOneAndUpdate", "deleteOne", "deleteMany", "findOneAndDelete", "replaceOne"].forEach((op) => schema.pre(op, block));

export default mongoose.models.ConsentRecord || mongoose.model("ConsentRecord", schema);
