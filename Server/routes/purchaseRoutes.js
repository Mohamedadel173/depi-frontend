import express from "express";
import { getUserPurchases, getUsersPurchases } from "../controllers/purchaseController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:userId", verifyToken, getUserPurchases);
router.get("/", verifyToken, verifyAdmin, getUsersPurchases);

export default router;
