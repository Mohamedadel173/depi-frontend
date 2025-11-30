import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, default: 0 },
  order: { type: Number, default: 0 }, // Order of the level in the sequence
});

export default mongoose.model("Level", levelSchema);