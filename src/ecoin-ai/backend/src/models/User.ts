import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  wallet: { type: String, unique: true },
  ecGas: { type: Number, default: 0 },
  totalDeposited: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 },
  botActive: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);