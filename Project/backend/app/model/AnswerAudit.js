import mongoose from "mongoose";

// Append-only log of every change to a member's profile answers, and of every change the server refused.
// `subject` is the member the answer belongs to. `by` is the account that made the change: the member themself,
// or the parent linked to a teen member. The API never updates or deletes these records.
const schema = new mongoose.Schema(
    {
        subject: { type: String, required: true }, // member id, as Answer.user stores it
        question: { type: String, required: true },
        by: { type: String, required: true },
        role: { type: String, required: true, enum: ["self", "parent"] },
        action: { type: String, required: true, enum: ["set", "clear", "refused"] },
        reason: { type: String, default: null }, // why a change was refused
        before: { type: [String], default: undefined },
        after: { type: [String], default: undefined },
        at: { type: Date, required: true, default: Date.now },
        ipHash: { type: String, default: null },
        origin: { type: String, required: true },
    },
    { versionKey: false, collection: "AnswerAudit" }
);
schema.index({ subject: 1, origin: 1, at: -1 });

const block = function () { throw new Error("The answer change log is append-only"); };
["updateOne", "updateMany", "findOneAndUpdate", "deleteOne", "deleteMany", "findOneAndDelete", "replaceOne"].forEach((op) => schema.pre(op, block));

export default mongoose.models.AnswerAudit || mongoose.model("AnswerAudit", schema);
