import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" }, // e.g. paid / failed / pending
  paymentMethod: String,
  purchaseDate: { type: Date, default: Date.now },
  transactionId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  levelId: { type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true },
  currency: { type: String, default: "USD" },
  
});

export default mongoose.model("Purchase", purchaseSchema);
