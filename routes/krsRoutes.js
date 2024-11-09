import express from "express";
import { getAllKRS, getKRSById, createKRS, updateKRS, deleteKRS } from "../controllers/krsController.js";

const router = express.Router();

router.get("/krs", getAllKRS);
router.get("/krs/:id", getKRSById);
router.post("/krs", createKRS);
router.patch("/krs/:id", updateKRS);
router.delete("/krs/:id", deleteKRS);

export default router;
