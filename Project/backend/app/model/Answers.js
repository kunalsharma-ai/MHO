import mongoose from "mongoose";
import { mongooseModel } from "../../utils/index.js";
const string = {
    type: String,
    trim: true,
    lowercase: true
}
export default mongooseModel(
    "Answer",
    {
        user: {
            type:String,
            trim:true,
            required: true
        },
        question: {
            type:String,
            trim:true,
            required: true
        },
        answer: {
            type: [{
                type:String,
                trim:true
            }],
            select: false
        },
        // who gave the answer: the member (role "self") or the parent linked to a teen member (role "parent").
        // Answers saved before this field existed belong to the member. Only the person who gave an answer may
        // change it (lib/guardian.js).
        answeredBy: {
            type: String,
            trim: true,
            default: null
        },
        answeredByRole: {
            type: String,
            enum: ["self", "parent", null],
            default: null
        },
        answeredAt: {
            type: Date,
            default: null
        },
    },
    [
        [
            {
                user: 1,
                question: 1,
                origin: 1
            },
            {
                unique: true
            }
        ]
    ],
    {
        virtuals: {
            Answer: function () {
                if (this.answer instanceof Array && this.answer.length === 1) return this.answer[0];
                return this.answer;
            }
        },
        pre: {
            save: function (next) {
                if (typeof this.answer === "string") this.answer = [this.answer];
                next();
            }
        }
    }
)