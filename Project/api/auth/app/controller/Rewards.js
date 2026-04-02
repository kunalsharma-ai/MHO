import { CrudController } from "../../utils/index.js";
import { Reward as rewardModel } from "../model/index.js";

const sources = {
    response: "Response",
    referal: "Invites"//or User * to be decided by mgmt
}
class RewardController extends CrudController {
    async credit(
        type = "response", //referal
        reference,//response._id,
        activity,//Survey: ${Survey.name}
        reward, ///Points rewarded
        status = "Pending"//Pending |Approved | Rejected
    ) {
        try {
            const commonFilters = this.commonFilters;
            const model = this.model;
            return await model.credit({
                user: this.request?.user?._id,
                activity,
                reward,
                reference: {
                    id: reference,
                    source: sources[type]
                },
                ...commonFilters,
                status
            })
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    async debit(
        reference,
        activity,
        reward,
        status
    ) {
        const commonFilters = this.commonFilters;
        model = this.model;
        return await model.debit({
            user: this.request?.user?._id,
            activity,
            reward,
            reference: {
                id: reference,
                source: "Redeem"
            },
            ...commonFilters,
            status
        })
    }
}

export default new RewardController(rewardModel)