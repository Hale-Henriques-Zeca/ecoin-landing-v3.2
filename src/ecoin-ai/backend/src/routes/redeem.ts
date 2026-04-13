import express from "express";
import { ethers } from "ethers";
import User from "../models/User";

const router = express.Router();

const provider = new ethers.JsonRpcProvider(process.env.RPC);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const contract = new ethers.Contract(
  process.env.VAULT!,
  [
    "function redeem(address user, uint256 amount) external",
  ],
  wallet
);

router.post("/redeem", async (req, res) => {
  try {
    const { wallet: userWallet, amount } = req.body;

    if (!userWallet || !amount) {
      return res.status(400).json({ error: "Missing params" });
    }

    const user = await User.findOne({ wallet: userWallet.toLowerCase() });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔥 1. VALIDAR GAS
    if (user.ecGas < amount) {
      return res.status(400).json({ error: "Not enough gas" });
    }

    // 🔥 2. CONVERSÃO
    const usdt = amount / 1000;

    const price = 0.01; // ⚠️ depois liga ao priceEngine

    const ecoinAmount = usdt / price;

    // 🔥 3. ATUALIZAR DB
    user.ecGas -= amount;
    await user.save();

    // 🔥 4. CHAMAR CONTRACT
    const tx = await contract.redeem(
      userWallet,
      ethers.parseUnits(ecoinAmount.toString(), 18)
    );

    await tx.wait();

    res.json({
      success: true,
      txHash: tx.hash,
      ecoinAmount,
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;