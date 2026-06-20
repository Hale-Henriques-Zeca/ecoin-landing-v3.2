import { Router } from "express";
import { opportunities } from "../../../api/arbitrage/opportunities";

const router = Router();

router.get("/opportunities", (_, res) => {
  res.json(opportunities);
});

export default router;