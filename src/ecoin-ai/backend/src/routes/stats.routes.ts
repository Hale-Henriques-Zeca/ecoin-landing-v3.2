import { Router } from "express";
import { getStats } from "../../../engine/arbitrage/stats";

const router = Router();

router.get("/", (_, res) => {
  res.json(getStats());
});

export default router;