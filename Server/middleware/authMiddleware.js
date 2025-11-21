import jwt from "jsonwebtoken";
import Purchase from "../models/purchaseModel.js";
import User from "../models/userModel.js";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const verifyPurchase = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { levelId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return next();

    const purchase = await Purchase.findOne({ userId, levelId, paymentStatus: "paid" });

    if (!purchase) {
      return res.status(403).json({ message: "You don't have access to this level" });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error in verifyPurchase" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin")
      return res.status(403).json({ message: "Access denied, admin only" });
    
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error in verifyAdmin error", "error": error.message });
  }
};