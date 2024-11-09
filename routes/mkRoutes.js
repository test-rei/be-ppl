import { Router } from "express";
import { getAllMK, getMKById, createMK, updateMK, deleteMK } from "../controllers/mkController.js";

const router = Router();

router.get("/mk", getAllMK);
router.get("/mk/:id", getMKById);
router.post("/mk", createMK);
router.patch("/mk/:id", updateMK);
router.delete("/mk/:id", deleteMK);

export default router;
