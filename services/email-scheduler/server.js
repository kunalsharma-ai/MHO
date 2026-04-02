import fs from "fs"
import express from "express"
import mongoose from "mongoose";
import timerFunction from "./src/utils/timerFunction.js";
import apiRouter from "./src/routes/index.js";
import batch from "./src/controller/batch.js";
import sendMail from "./src/utils/SendEMail.js";

(async () => {
    const dbURI = process.env.mongodb;
    const port = process.env.port;
    const app = express();
    console.log(process.env)
    await mongoose.connect(dbURI)
    app
        .set("view-engine", "twig")
        .use([
            express.static("public"),
            express.json(),
            express.urlencoded({
                extended: true
            }),
            apiRouter,
            fallbackRoute,
            errorRoute
        ])
        .listen(port, () => {
            console.log(`[${new Date()}]: Server Started on Port ${port}`)
        })
    timerFunction(
        5000,
        async () => {
            try {
                let data = await batch.prepareToSend()
                for (let index = 0; index < data.length; index++) {
                    const lot = data[index];
                        await sendMail(lot)
                        await batch.update(lot._id,{
                            status:"sent"
                        })
                    
                }
                // data.forEach(batch=>{
                // });
                console.log(`[${new Date()}]: Timer function called`)
                
            } catch (error) {
                console.log(`[${new Date()}]: Timer function has error`)
                console.log(error.message)
            }
        }
    )
})()


async function fallbackRoute(req, res) {
    return res.render("fallback.twig", {});
    return res.json({
        status: "success",
        message: "Rasta bhatak gaye"
    })
}
async function errorRoute(error, req, res, next) {
    const { code, message } = error;

    return res.status(code ?? 500).json({
        status: "error",
        message: message
    })
}