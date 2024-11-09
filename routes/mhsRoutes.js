import express from "express";
import { getAllMHS, getMHSByNIM, createMHS, updateMHS, deleteMHS } from "../controllers/mhsController.js";

const router = express.Router();

router.get("/mhs", getAllMHS);
router.get("/mhs/:nim", getMHSByNIM);
router.post("/mhs", createMHS);
router.patch("/mhs/:nim", updateMHS);
router.delete("/mhs/:nim", deleteMHS);

export default router;
