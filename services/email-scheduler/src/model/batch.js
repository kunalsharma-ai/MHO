import mongoose from "mongoose";
// const batchSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     parameters: [],
//     emails: [{ type: String, required: true }],
//     subject: {
//         type: String
//     },
//     template: {
//         type: String
//     },
//     sender: {
//         type: String
//     },
//     scheduledAt: { type: Date, required: true },
//     status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
// });

// const Batch = mongoose.model('Batch', batchSchema);
const Batch = mongoose.model(
    "Batch",
    new mongoose.Schema({},
        {
            collection: "Batch",
            strict: false
        }))
export default Batch;