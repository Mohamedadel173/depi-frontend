import express from "express";
const app = express(); // create express app

import cors from "cors";
app.use(cors());

import connectDB from "./config/db.js";
connectDB(); // connect to database

import dotenv from "dotenv";
dotenv.config(); // load environment variables

// Routes
import authRoutes from "./routes/authRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";
import levelRoutes from "./routes/levelRoutes.js";
import unitRoutes from "./routes/unitRoutes.js";

app.use(express.json()); // for parsing JSON


// For testing
app.get('/', (req, res) => {
  res.status(200).send('API is running successfully!'); 
});

// Routes
app.use("/auth", authRoutes);
app.use("/stripe", stripeRoutes);
app.use("/purchases", purchaseRoutes);
app.use("/levels", levelRoutes);
app.use("/units", unitRoutes);

// get all users (Admin)
import User from "./models/userModel.js";
import { verifyToken, verifyAdmin } from "./middleware/authMiddleware.js";
app.use("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
