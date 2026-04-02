import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import pureIP from "express-pureip";
import mongoose from "mongoose";
import Twig from "twig";

import {
    default as routes
} from "./routes/index.js";
import {setOrigin, expressRoute,fsLogger} from "../utils/index.js";

(async () => {
    const env = {
        port: process.env.port ?? 3000,
        db: process.env.mongodb ?? "mongodb://mongo/mho"
    }
    await mongoose.connect(env.db);
    const app = express();
    app
        .set("view-engine", "twig")
        .set('views', "app/views")
        .use([
            express.static("/src/public"),
            cors({
                origin:function(origin,callback){
                    return callback(null,origin)
                }
            }),
            express.json(),
            express.urlencoded({
                extended: true
            }),
            pureIP,
            fileUpload(),
            setOrigin,
            routes
        ])
        .use(expressRoute(
            async (req) => {
                fsLogger.Log("Fallback route",{
                    ...req.headers,
                    origin:req.origin
                })
                return {message: "Fallback route", status: "error"}
            },
            {}
        ))
    .listen(env.port,()=>{
        fsLogger.Log(`Server started at port ${env.port}`)
    })
})();