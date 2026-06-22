import { Router } from "express";
import { tradeHistory } from "../engine/arbitrage/history";

const router = Router();

router.get("/", (_, res) => {
  res.json(tradeHistory);
});

export default router;