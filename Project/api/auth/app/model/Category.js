import mongoose from "mongoose";
import { mongooseModel } from "../../utils/index.js";

export default mongooseModel(
    "Category",
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        termsMessage: {
            type: String
        },
        terms: [
            {
                name: {
                    type: String,
                    required: true,
                    lowercase: true,
                    trim: true
                },
                body: {
                    type: String,
                    required: true
                },
                isRequired: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }
        ],
        age: {
            min: {
                type: Number,
                default: 18
            },
            max: {
                type: Number,
                default: 110
            },
            underfall: {
                type: String,
                default: null
            },
            overfall: {
                type: String,
                default: null
            }
        },
        showOnRegistration: {
            type: Boolean,
            default: false
        }
    },
    [
        [
            {
                name: 1,
                origin: 1
            },
            {
                unique: true
            }
        ],
    ]
)