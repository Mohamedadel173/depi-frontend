import express from "express";
import { createCheckoutSession, stripeWebhook } from "../controllers/stripeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", verifyToken, createCheckoutSession);

const rawParser =
  process.env.STRIPE_TEST_MODE === "true"
    ? express.json()
    : express.raw({ type: "application/json" });
router.post("/webhook", rawParser, stripeWebhook);

export default router;
