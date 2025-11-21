import express from "express";
import { validateRegister } from "../middleware/validateRegisterMiddleware.js";
import {
  registerUser,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// routes
router.post("/register", validateRegister, registerUser);
router.post("/verify", verifyEmail);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;
