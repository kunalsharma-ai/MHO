import express from "express";
import { Rewards as rewardsController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger } from "../../../utils/index.js"
Date.prototype.resetTime = function (type = "start") {
    if (type === "end") {
        this.setHours(23);
        this.setMinutes(59);
        this.setSeconds(59);
    } else {
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
    }
}
const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            console.log(req)
            let message = "";
            let data = await rewardsController.list({ user: req.user._id })
            return { message, data };
        },
        rewardsController
    ))
    .post(expressRoute(
        async req => {
            let message = "";
            console.log(req.user)
            const { dateRange } = req.body;
            let filters = {}
            if (Boolean(dateRange) && Boolean(dateRange instanceof Array) && dateRange.length === 2) {
                const start = new Date(dateRange[0]);
                const end = new Date(dateRange[1]);
                start.resetTime("start");
                end.resetTime("end");
                filters = {
                    ...filters,
                    createdAt: {
                        $gte: start,
                        $lte: end
                    }
                }
            }
            let data = await rewardsController.list({ ...filters, user: req.user._id })
            return { message, data };
        },
        rewardsController
    ))
    .put(expressRoute(
        async req => {
            // Create new entry
            throw new Error("under development")
        },
        rewardsController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await rewardsController.read(req.params.id);
            return { message, data };
        },
        rewardsController
    ))
    .put(expressRoute(
        async req => {
            // update single entry
            let message = "";
            let data = await rewardsController.update(req.params.id, req.body)
            return { message, data };
        },
        rewardsController
    ))
    .delete(expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await rewardsController.delete(req.params.id)
            return { message, data };
        },
        rewardsController
    ))
export default router;