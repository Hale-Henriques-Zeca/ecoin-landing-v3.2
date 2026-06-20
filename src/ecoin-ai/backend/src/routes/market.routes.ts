import { Router } from "express";
import { market } from "../../../api/arbitrage/market";

const router = Router();

router.get("/", (_, res) => {
  res.json(market);
});

export default router;