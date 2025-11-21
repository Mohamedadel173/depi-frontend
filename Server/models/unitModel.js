import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // contentType: String, // e.g. "video", "text", "quiz"
  // content: String,
  order: Number,
  isComplete: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: true },
  levelId: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
});

export default mongoose.model("Unit", unitSchema);
