import { Router } from "express";
import { HttpError } from "optiwari.india-http-error";
import batchController from "../controller/batch.js";
const router = Router();
router.param("id", async (req, res, next) => {
    console.log(req.params);
    req.data = await batchController.read(req.params.id)
    next();
})

router
    .route('/')
    .get(async (req, res) => {
        let data = await batchController.list();
        if (data.length === 0) {
            throw new HttpError("No records found", 404)
        }
        return res.json({
            status: "success",
            message: `Total ${data.length} records found`,
            data
        })
    })
    .post(async (req, res) => {
        let data = await batchController.list(req.body);
        if (data.length === 0) {
            throw new HttpError("No records found", 404)
        }
        return res.json({
            status: "success",
            message: `Total ${data.length} records found`,
            data
        })
    })
    .put(async (req, res) => {
        let data = await batchController.create(req.body)
        return res.json({
            status: "success",
            message: `Created successfully`,
            data
        })
    })
    .delete(async (req, res) => {
        // Database cleanup [should not be used in production]
        await batchController.clean()
        return res.json({
            status: "success",
            message: `Cleared all batches`
        })
    })
router
    .route('/:id')
    .get(async (req, res) => {
        // Read one batch by ID 
        return res.json({
            status: "success",
            message: "",
            data: req.data
        })
    })
    .put(async (req, res) => {
        // Update one batch by ID 

    })
    .delete(async (req, res) => {
        await batchController.delete(id=req.data._id);
        return res.json({
            status:"success",
            message:"Successfully deleted"
        })
    })

export default router;