import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: String,
  gender: { type: String, enum: ["male", "female", "other"] },
  birthday: Date,
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
  purchasedLevels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level" }] // Array of purchased level IDs //! GPT Recommendation
});

// Exclude password and __v from the returned user object
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model("User", userSchema);