
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import userRoutes from "./routes/user.routes";
import redeemRoute from "./routes/redeem";
import { startListener } from "./blockchain/listener";

import "./engine/runner";
import "./blockchain/listener";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api", redeemRoute);
startListener();

connectDB();

app.listen(4000, () => {
  console.log("🚀 Backend running on port 4000");
});