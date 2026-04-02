import mongoose from "mongoose";
import mongooseModel from "../../utils/mongooseModel.js"; // adjust path as needed


export default mongooseModel(
    "SupportActions",
    {
        ticketNo: {
            type: String,
            trim: true
        },
        action: {
            type: String
        },
        createdBy: {
            type: String
        }
    }
)