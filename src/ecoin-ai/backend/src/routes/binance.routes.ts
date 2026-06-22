import { Router } from "express";

import {
  connectBinance,
  getBalance,
} from "../services/binance.service";

const router = Router();

router.post("/connect", async (req, res) => {
  try {
    const { apiKey, secretKey } = req.body;

    connectBinance(apiKey, secretKey);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
});

router.get("/balance", async (_, res) => {
  try {
    const balances = await getBalance();

    const usdt =
      balances.find(
        (b: any) => b.asset === "USDT"
      ) || { free: "0" };

    res.json({
      balance: Number(usdt.free),
    });
  } catch (err) {
    res.status(500).json({
      balance: 0,
    });
  }
});

export default router;