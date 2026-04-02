import mongoose from "mongoose";
import mongooseModel from "../../utils/mongooseModel.js"; // adjust path as needed

export default mongooseModel(
    "Invites",
    {
        invitedBy: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        }
    })
    