import express from "express";
import { getAllMHS, getMHSByNIM, getAllMHSCalculate, getMHSByNIMCalculate, createMHS, updateMHS, deleteMHS } from "../controllers/mhsController.js";

const router = express.Router();

router.get("/mhs", getAllMHS);
router.get("/mhs/:nim", getMHSByNIM);
router.get("/mhs", getAllMHSCalculate);
router.get("/mhs/:nim", getMHSByNIMCalculate);
router.post("/mhs", createMHS);
router.patch("/mhs/:nim", updateMHS);
router.delete("/mhs/:nim", deleteMHS);

export default router;
