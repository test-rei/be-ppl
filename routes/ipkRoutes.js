import express from "express";
import { getAllIPK, getIPKByNIM, getAllIPKCalculate, getIPKByNIMCalculate, createIPK, updateIPK, deleteIPK } from "../controllers/ipkController.js";
import cacheResponse from "../middleware/middlewareCache.js";

const router = express.Router();

router.get("/ipk", cacheResponse, getAllIPK);
router.get("/ipk/:nim", cacheResponse, getIPKByNIM);
router.get("/ipkc", cacheResponse, getAllIPKCalculate);
router.get("/ipkc/:nim", cacheResponse, getIPKByNIMCalculate);
router.post("/ipk", createIPK);
router.patch("/ipk/:id", updateIPK);
router.delete("/ipk/:id", deleteIPK);

export default router;
