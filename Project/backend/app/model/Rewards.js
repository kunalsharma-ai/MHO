import mongoose from "mongoose";
import mongooseModel from "../../utils/mongooseModel.js"; // adjust path as needed

export default mongooseModel(
    "Reward",
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        activity: { type: String, trim: true, required: true },
        reward: {
            type: Number,
            required: true,
            default: 0
        },
        reference: {
            id: { type: mongoose.Schema.Types.ObjectId, required: true },
            source: { type: String, trim: true, required: true }
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Approved", "Rejected"]
        },
        balance: { type: Number, default: 0 }
    },
    [
        [
            {
                user: 1,
                "reference.id": 1
            },
            {
                unique: 1
            }
        ]
    ],
    {
        static: {
            async credit({
                user,
                activity,
                reward,
                reference,
                origin,
                isActive,
                isDeleted,
                created,
                status = "Pending",
            }) {
                if (reward < 0) {
                    throw new Error("Reward must be positive");
                }
                try {
                    // 🔹 Get latest balance
                    const lastTxn = await this.findOne({ user, origin })
                        .sort({ createdAt: -1 })

                    const lastBalance = lastTxn?.balance || 0;
                    const newBalance = lastBalance + reward;

                    // 🔹 Insert transaction
                    const [doc] = await this.create([{
                        user,
                        activity,
                        reward, // positive
                        reference,
                        status,
                        balance: newBalance,
                        isActive,
                        isDeleted,
                        created,
                        origin
                    }]);

                    return doc;

                } catch (err) {
                    if (err.code === 11000) {
                        throw new Error("Reward already credited for this reference");
                    }

                    throw err;
                }
            },

            async debit({
                user,
                reward,
                reference,
                origin,
                isActive,
                isDeleted,
                created,
                activity = `Redeem (${reward} points)`,
                status = "Pending",
            }) {
                if (reward < 0) {
                    throw new Error("Reward must be positive");
                }

                try {
                    // 🔹 Get latest balance
                    const lastTxn = await this.findOne({ user, origin })
                        .sort({ createdAt: -1 })

                    const lastBalance = lastTxn?.balance || 0;

                    // 🚫 Prevent negative balance
                    if (lastBalance < reward) {
                        throw new Error("Insufficient balance");
                    }

                    const newBalance = lastBalance - reward;

                    // 🔹 Insert transaction (negative reward)
                    const doc = await this.create({
                        user,
                        activity,
                        reward: -reward,
                        reference,
                        status,
                        balance: newBalance,
                        isActive,
                        isDeleted,
                        created,
                        origin
                    });

                    return doc;

                } catch (err) {
                    throw err;
                }
            }
        }
    }
);

