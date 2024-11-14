import { Router } from "express";
import { getAllMK, getMKById, createMK, updateMK, deleteMK } from "../controllers/mkController.js";
import cacheResponse from "../middleware/middlewareCache.js";

const router = Router();

router.get("/mk", cacheResponse, getAllMK);
router.get("/mk/:id", cacheResponse, getMKById);
router.post("/mk", createMK);
router.patch("/mk/:id", updateMK);
router.delete("/mk/:id", deleteMK);

export default router;
