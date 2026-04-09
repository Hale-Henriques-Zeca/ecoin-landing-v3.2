
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect";
import userRoutes from "./routes/user.routes";

import "./engine/runner";
import "./blockchain/listener";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

connectDB();

app.listen(4000, () => {
  console.log("🚀 Backend running on port 4000");
});