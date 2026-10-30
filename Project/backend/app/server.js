import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import pureIP from "express-pureip";
import mongoose from "mongoose";
import "./events/index.js";
import {
    default as routes
} from "./routes/index.js";
import {
    setOrigin,
    expressRoute,
    fsLogger,
    eventStream
} from "../utils/index.js";

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
                origin: ["https://mho.sampledge.duckdns.org", "https://admin.sampledge.duckdns.org"],
                credentials: true,
                allowedHeaders: ["Content-Type", "Authorization", "test"],
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
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
                eventStream.emitEvent("server-fallback", {
                    headers: req.headers,
                    message: "Fallback route called"
                })
                return { message: "Fallback route", status: "error" }
            },
            {}
        ))
        .listen(env.port, () => {
            eventStream.emitEvent("server-started", { port: env.port });
        })
})();

