import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect"; 
import userRoutes from "./routes/user.routes";
import { startListener } from "./blockchain/listener";
import "./engine/runner"; 
import { startBinanceStream } from "../../engine/websocket/binance";
import arbitrageRoutes from "./routes/arbitrage.routes";
import marketRoutes from "./routes/market.routes";
import historyRoutes from "./routes/history.routes";
import statsRoutes from "./routes/stats.routes";
import binanceRoutes from "./routes/binance.routes";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/arbitrage", arbitrageRoutes);
app.use(
  "/api/arbitrage/market",
  marketRoutes
);
app.use(
  "/api/arbitrage/stats",
  statsRoutes
);
app.use(
  "/api/binance",
  binanceRoutes
);

app.use("/api/arbitrage/history", historyRoutes);

// A função start garante a ordem correta
async function start() {
  await connectDB(); // 1. Conecta ao banco primeiro
  startListener();   // 2. Inicia o listener do blockchain
  startBinanceStream();
  
  app.listen(process.env.PORT || 4000, () => {
    console.log("🚀 Server running on port 4000");
  });
}

start();