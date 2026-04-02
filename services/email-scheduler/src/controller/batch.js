// Batch Controller

import mongoose from "mongoose";
import {HttpError} from "optiwari.india-http-error"
import Batch from "../model/batch.js";

class Controller {
    #model;
    constructor(model) {
        this.#model = model
    }
    get model(){
        return this.#model;
    }
    async create(data){
        let parameters=JSON.parse(data.parameters)
        let emails=JSON.parse(data.emails);
        const newBatch=new Batch({...data,parameters,emails});
        return await newBatch.save();        
    }
    async update(id,data){
        return await Batch.findByIdAndUpdate(id,data)
    }
    async list(query={}){
        return await Batch.find(query);
    }
    async prepareToSend(){
        return await Batch.find({
            status:"pending",
            scheduledAt:{
                $lte:(new Date())
            }
        })
    }
    async clear(){
        return await this.model.deleteMany({});
    }
    async delete(id){
        return await this.model.deleteOne({_id:id});
    }
    async read(id){
        if(!mongoose.Types.ObjectId.isValid(id))throw new HttpError("Invalid Request",400)
        return await this.model.findById(id);
    }
}

export default new Controller(Batch)