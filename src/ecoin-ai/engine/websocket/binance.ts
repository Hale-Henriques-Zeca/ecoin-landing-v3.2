import WebSocket from "ws";
import { checkTriangularArbitrage } from "../arbitrage/triangular";

type Prices = {
  ETHBTC: number;
  BTCUSDT: number;
  ETHUSDT: number;
};

const prices: Prices = {
  ETHBTC: 0,
  BTCUSDT: 0,
  ETHUSDT: 0,
};

export function startBinanceStream() {
  const ws = new WebSocket(
    "wss://stream.binance.com:9443/ws/ethbtc@bookTicker/btcusdt@bookTicker/ethusdt@bookTicker"
  );

  ws.on("open", () => {
    console.log("🟢 Binance WebSocket Connected");
  });

  ws.on("message", (data) => {
    try {
      const msg = JSON.parse(data.toString());

      const symbol = msg.s;
      const price = parseFloat(msg.a); // ASK PRICE

      if (symbol === "ETHBTC") prices.ETHBTC = price;
      if (symbol === "BTCUSDT") prices.BTCUSDT = price;
      if (symbol === "ETHUSDT") prices.ETHUSDT = price;

      console.clear();
      console.clear();
      console.table(prices);
      
      checkTriangularArbitrage(prices);

    } catch (err) {
      console.error("❌ Parse error:", err);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Reconnecting...");
    setTimeout(startBinanceStream, 3000);
  });

  ws.on("error", (err) => {
    console.error("❌ WS error:", err);
  });
}