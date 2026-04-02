import { Router } from "express";
import batchRouter from "./batch.js";

const router = Router();

router.use("/api/v1/batch", batchRouter)

export default router;