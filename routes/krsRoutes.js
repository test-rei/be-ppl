import express from "express";
import { getAllKRS, getKRSById, createKRS, updateKRS, deleteKRS } from "../controllers/krsController.js";
import cacheResponse from "../middleware/middlewareCache.js";

const router = express.Router();

router.get("/krs", cacheResponse, getAllKRS);
router.get("/krs/:id", cacheResponse, getKRSById);
router.post("/krs", createKRS);
router.patch("/krs/:id", updateKRS);
router.delete("/krs/:id", deleteKRS);

export default router;
