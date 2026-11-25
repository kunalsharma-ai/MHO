import API from "./API.js";
import { verify } from "./token.js";
import {User as userModel} from "../app/model/index.js"
export default async function isAuthenticated(req, res, next) {
    const authtoken = req.headers.authorization;

    if (!authtoken) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized [No Token Found]"
        })
    }
    const token = authtoken.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized- [Invalid Token]"
        })
    }
    try {
        let user = verify(token);
        if (!user || !user._id || !req.origin) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized--[Token Mismatched]"
            })
        }

        if (user.origin !== req.origin) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden"
            })
        }

        req.user = await getUserDetails(user);
        if (!req.user) {
            return res.status(401).json({ status: "error", message: "Unauthorized [Unknown account]" })
        }
        // a password change or reset ends every session that started before it
        if (req.user.passwordChangedAt && user.iat && user.iat * 1000 < new Date(req.user.passwordChangedAt).getTime() - 1000) {
            return res.status(401).json({ status: "error", message: "token expired" })
        }
        return next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            status: "error",
            message: "token expired"
        })
    }
}

async function getUserDetails(user) {
    let usr=await userModel.findById(user._id).select("+role +passwordChangedAt");
    return usr;
}