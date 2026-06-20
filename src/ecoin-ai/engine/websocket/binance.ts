import WebSocket from "ws";
import { checkTriangularArbitrage } from "../arbitrage/triangular";

type Prices = {
  ETHBTC: {
    bid: number;
    ask: number;
  };

  BTCUSDT: {
    bid: number;
    ask: number;
  };

  ETHUSDT: {
    bid: number;
    ask: number;
  };
};

const prices: Prices = {
  ETHBTC: {
    bid: 0,
    ask: 0,
  },

  BTCUSDT: {
    bid: 0,
    ask: 0,
  },

  ETHUSDT: {
    bid: 0,
    ask: 0,
  },
};

export function startBinanceStream() {
  const ws = new WebSocket(
  "wss://stream.binance.com:9443/stream?streams=ethbtc@bookTicker/btcusdt@bookTicker/ethusdt@bookTicker"
);

  ws.on("open", () => {
    console.log("🟢 Binance WebSocket Connected");
  });

  ws.on("message", (data) => {
    try {
      const payload = JSON.parse(data.toString());
      
      const msg = payload.data;
      
      const symbol = msg.s;


      

if (symbol === "ETHBTC") {
  prices.ETHBTC = {
    bid: Number(msg.b),
    ask: Number(msg.a),
  };
}

if (symbol === "BTCUSDT") {
  prices.BTCUSDT = {
    bid: Number(msg.b),
    ask: Number(msg.a),
  };
}

if (symbol === "ETHUSDT") {
  prices.ETHUSDT = {
    bid: Number(msg.b),
    ask: Number(msg.a),
  };
}

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