import express from "express";
import User from "../models/User";

const router = express.Router();

// GET USER STATE
router.get("/:wallet", async (req, res) => {
  const { wallet } = req.params;

  let user = await User.findOne({ wallet });

  if (!user) {
    user = await User.create({ wallet });
  }

  res.json(user);
});

// START BOT
router.post("/start", async (req, res) => {
  const { wallet } = req.body;

  await User.updateOne({ wallet }, { botActive: true });

  res.json({ success: true });
});

// STOP BOT
router.post("/stop", async (req, res) => {
  const { wallet } = req.body;

  await User.updateOne({ wallet }, { botActive: false });

  res.json({ success: true });
});

export default router;