import Level from "../models/levelModel.js";
import User from "../models/userModel.js";

export const createLevel = async (req, res) => {
  try {
    const { title, description, price, order } = req.body;

    if (!title || !description || !price || !order)
      return res.status(400).json({ message: "Make sure you enter the data correctly!" });

    const newLevel = await Level.create({ title, description, price, order });
    res.status(201).json({ message: "Level created successfully", newLevel });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find();
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLevelDetails = async (req, res) => {
  try {
    const { levelId } = req.params;
    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: "Level not found" });

    res.status(200).json({ level });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getUserPurchasedLevels = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("purchasedLevels", "title description price");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Purchased levels fetched successfully",
      purchasedLevels: user.purchasedLevels,
    });
  } catch (error) {
    console.error("Error fetching purchased levels:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
