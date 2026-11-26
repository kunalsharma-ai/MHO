import express from "express";
import { Rewards as rewardsController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger } from "../../../utils/index.js"
import { requireAdmin, ADMIN_ROLES } from "../../../utils/access.js";
import { User } from "../../model/index.js";

// The admin Responses page sends "Approve" / "Reject"; the ledger stores "Approved" / "Rejected".
const STATUS = { approve: "Approved", approved: "Approved", reject: "Rejected", rejected: "Rejected", pending: "Pending" };
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
            // Members never credit themselves: the server credits surveys, profiles and referrals from its own records
            // (lib/points.js, POST /api/v1/me/points/sync). Admins approve or reject credits below.
            throw new Error("Rewards are credited by the server. Use POST /api/v1/me/points/sync.")
        },
        rewardsController
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // read single entry: the member's own, or any for an admin
            let message = "";
            let data = await rewardsController.read(req.params.id);
            if (data && String(data.user?._id ?? data.user) !== String(req.user._id)) {
                const me = await User.findById(req.user._id).select("+role").lean();
                if (!ADMIN_ROLES.includes(String(me?.role || "").toLowerCase())) throw new Error("Not found");
            }
            return { message, data };
        },
        rewardsController
    ))
    // approving, rejecting or changing a credit is an admin task (a member could set their own points before)
    .put(requireAdmin, expressRoute(
        async req => {
            // update single entry: only the status can change
            let message = "";
            const status = STATUS[String(req.body?.status || "").trim().toLowerCase()];
            if (!status) throw new Error("Unknown status");
            let data = await rewardsController.update(req.params.id, { status })
            return { message, data };
        },
        rewardsController
    ))
    .delete(requireAdmin, expressRoute(
        async req => {
            // delete single entry
            let message = "";
            let data = await rewardsController.delete(req.params.id)
            return { message, data };
        },
        rewardsController
    ))
export default router;