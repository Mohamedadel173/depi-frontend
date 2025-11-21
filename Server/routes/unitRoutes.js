import express from "express";
import { getUnitsByLevel, completeUnit, addUnit, getUnitById } from "../controllers/unitController.js";
import { verifyToken, verifyPurchase, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add", verifyToken, verifyAdmin, addUnit);
// Get Units of a specific level
router.get("/:levelId/units", verifyToken, verifyPurchase, getUnitsByLevel);
// Mark Unit Complete
router.patch("/:unitId/complete", verifyToken, completeUnit);
// Get a specific unit
router.get("/:levelId/:unitId", verifyToken, verifyPurchase, getUnitById);


export default router;