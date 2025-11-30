import express from "express";
import { createLevel, getAllLevels, getLevelDetails, getUserPurchasedLevels} from "../controllers/levelController.js";
import { verifyToken, verifyPurchase, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/levels", verifyToken, getAllLevels);
router.get("/purchased-levels", verifyToken, getUserPurchasedLevels);
// canceled
router.post("/create", verifyToken, verifyAdmin, createLevel);
router.get("/:levelId", verifyToken, verifyPurchase, getLevelDetails);


export default router;
