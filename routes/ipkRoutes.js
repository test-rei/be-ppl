import express from "express";
import { getAllIPK, getIPKById, getAllIPKCalculate, getIPKByNIMCalculate, createIPK, updateIPK, deleteIPK } from "../controllers/ipkController.js";

const router = express.Router();

router.get("/ipk", getAllIPK);
router.get("/ipk/:id", getIPKById);
router.get("/ipkc", getAllIPKCalculate);
router.get("/ipkc/:id", getIPKByNIMCalculate);
router.post("/ipk", createIPK);
router.patch("/ipk/:id", updateIPK);
router.delete("/ipk/:id", deleteIPK);

export default router;
