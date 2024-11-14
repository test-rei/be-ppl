import express from "express";
import { getAllMHS, getMHSByNIM, getAllMHSCalculate, getMHSByNIMCalculate, createMHS, updateMHS, deleteMHS } from "../controllers/mhsController.js";
import cacheResponse from "../middleware/middlewareCache.js";

const router = express.Router();

router.get("/mhs", cacheResponse, getAllMHS);
router.get("/mhs/:nim", cacheResponse, getMHSByNIM);
router.get("/mhsc", cacheResponse, getAllMHSCalculate);
router.get("/mhsc/:nim", cacheResponse, getMHSByNIMCalculate);
router.post("/mhs", createMHS);
router.patch("/mhs/:nim", updateMHS);
router.delete("/mhs/:nim", deleteMHS);

export default router;
