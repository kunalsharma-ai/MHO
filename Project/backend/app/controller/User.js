
Date.prototype.isMinor = function (cn = "IN") {
    let today = new Date();
    let age = (today - this) / (365.25 * 24 * 3600 * 1000);
    return age < 18
}

import { CrudController, Mutate } from "../../utils/index.js";
import {
    User as userModel,
    Invites as invitesModel,
    Answers,
    Response,
    Reward
} from "../model/index.js";
import fs from "fs"
class User extends CrudController {
    fixUserIssue() {
        super.request = {
            ...this.request,
            user: {
                _id: null
            }
        }
    }
    async login({ phone, mail, password }) {
        let user = await super.list({
            $or: [
                { phone: phone?.match(/\d+/g).join("") },
                { mail }
            ]
        });
        if (user.length !== 1) throw new Error(`${!phone ? "E-Mail id" : "Phone no."} or Password is invalid`)
        let temp = await userModel.findById(user[0]._id).select("+role");
        let response = await temp.verifyPassword(password);
        if (response) {
            return temp;
        }
        throw new Error(`${!phone ? "E-Mail id" : "Phone no."} or Password is invalid`)
    }
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        console.log(query)
        return await super.list(query, populateFields, sort, project)
    }
    async create(data) {
        this.fixUserIssue();
        invitesModel.updateMany({
            email: data.mail
        }, {
            isActive: false
        })
        return await super.create(data)
    }
    async update(id, data) {
        this.fixUserIssue();
        return await super.update(id, data);
    }
    async read(id) {
        // this brand's members only (all three brands share one database)
        let temp = Mutate(await userModel.findOne(this.byId(id)).select("+role"))
        if (!temp) throw new Error("Item not found");
        let dob = new Date(temp.dob);
        const fullname = temp?.fullName ?? null;
        return { ...temp, isMinor: dob.isMinor(), fullname };
    }
    async delete(id) {
        this.fixUserIssue();
        return await super.delete(id);
    }
    async setPassword(user, password) {
        let temp = await super.read(user);
        return await temp.setPassword(password);
    }
    async changePassword(currentPassword, newPassword) {
        let user = await super.read(this.request.user._id);
        return await user.changePassword(currentPassword, newPassword)
    }
    async addInvites(emails) {
        for (let index = 0; index < emails.length; index++) {
            const email = emails[index];
            let invite = await invitesModel.create({
                invitedBy: this.request.user._id,
                email,
                isActive: true,
                isDeleted: false,
                origin: this.request.origin
            })
            await invite.save();
        }
        return true;
    }
    async invitedUsers() {
        const temp = await invitesModel.find({
            ...this.commonFilters,
            invitedBy: this.request.user._id,
            isActive: {
                $in: [true, false]
            }
        }, {
            createdAt: -1,
            email: 1,
            isActive: 1,

        })
        return temp;
    }
    async summary() {
        let summary = Mutate(await userModel.aggregate([
            {
                $match: {
                    ...this.commonFilters
                }
            },
            {
                $group: {
                    _id: "$category",
                    value: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    label: "$_id",
                    value: 1,
                    _id: 0
                }
            }
        ]))
        summary.unshift({
            label: "Total Panelists",
            value: summary.reduce((a, c) => {
                a += Number(c.value);
                return a;
            }, 0)
        })
        return summary;
    }
    async changeCategory(newCategory) {
        let user = await super.read(this.request.user._id);
        user.category = newCategory;
        return await user.save();
    }
    async changePaymentMethod(paymentMethod) {
        return await super.update(this.request.user._id, { paymentMethod });
    }
    async refreshUser(data) {
        await Answers.deleteMany({
            ...data
        })
        await Response.deleteMany({
            ...data
        })
        await Reward.deleteMany({
            ...data
        })
        console.log(data)
    }
}

export default new User(userModel)