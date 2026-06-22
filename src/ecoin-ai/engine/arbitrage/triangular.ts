import { updateBalance } from "../../profit/pnl/tracker";
import { opportunities } from "./opportunities";
import { market } from "../../api/arbitrage/market";
import { tradeHistory } from "../../engine/arbitrage/history";

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

const FEE = 0.001; // 0.1% por trade

export function checkTriangularArbitrage(prices: Prices) {
  const { ETHBTC, BTCUSDT, ETHUSDT } = prices;

if (
  !ETHBTC.bid ||
  !ETHBTC.ask ||
  !BTCUSDT.bid ||
  !BTCUSDT.ask ||
  !ETHUSDT.bid ||
  !ETHUSDT.ask
) {
  return;
}

  // 🟢 DIREÇÃO 1: USDT → BTC → ETH → USDT
  let usdt = 1;

  let btc = (usdt / BTCUSDT.ask) * (1 - FEE);
  
  let eth = (btc / ETHBTC.ask) * (1 - FEE);
  
  let finalUSDT = (eth * ETHUSDT.bid) * (1 - FEE);

  const profit1 = finalUSDT - usdt;

  console.log(
  `USDT→BTC→ETH→USDT = ${(profit1 * 100).toFixed(4)}%`
);



  // 🔵 DIREÇÃO 2: USDT → ETH → BTC → USDT

let eth2 = (usdt / ETHUSDT.ask) * (1 - FEE);

let btc2 = (eth2 * ETHBTC.bid) * (1 - FEE);

let finalUSDT2 = (btc2 * BTCUSDT.bid) * (1 - FEE);

const profit2 = finalUSDT2 - usdt;

console.log(
  `USDT→ETH→BTC→USDT = ${(profit2 * 100).toFixed(4)}%`
);

  // 📊 LOG + PROFIT ENGINE

// 🟢 DIREÇÃO 1
if (profit1 > 0.0001) {
  console.log("🟢 Arbitragem DETECTADA (via BTC)");
  console.log("Lucro:", profit1.toFixed(6));

  updateBalance(1000 + profit1);

  console.log("💰 Balance atualizado");
}

// 🔵 DIREÇÃO 2
if (profit2 > 0.0001) {
  console.log("🔵 Arbitragem DETECTADA (via ETH)");
  console.log("Lucro:", profit2.toFixed(6));

  updateBalance(1000 + profit2);

  console.log("💰 Balance atualizado");
}

if (profit1 > 0.0001) {

  opportunities.unshift({
    route: "USDT→BTC→ETH→USDT",
    profit: Number((profit1 * 100).toFixed(4)),
    timestamp: Date.now(),
  });

  tradeHistory.unshift({
  route: "USDT→BTC→ETH→USDT",
  profit: Number((profit1 * 100).toFixed(4)),
  fee: 0.3,
  timestamp: Date.now(),
});

}


if (profit2 > 0.0001) {

  opportunities.unshift({
    route: "USDT→ETH→BTC→USDT",
    profit: Number((profit2 * 100).toFixed(4)),
    timestamp: Date.now(),
  });

  tradeHistory.unshift({
  route: "USDT→ETH→BTC→USDT",
  profit: Number((profit2 * 100).toFixed(4)),
  fee: 0.3,
  timestamp: Date.now(),
});

}

market.ETHBTC = {
  bid: ETHBTC.bid,
  ask: ETHBTC.ask,
};

market.BTCUSDT = {
  bid: BTCUSDT.bid,
  ask: BTCUSDT.ask,
};

market.ETHUSDT = {
  bid: ETHUSDT.bid,
  ask: ETHUSDT.ask,
};

market.profit1 = Number(
  (profit1 * 100).toFixed(4)
);

market.profit2 = Number(
  (profit2 * 100).toFixed(4)
);

while (opportunities.length > 100) {
  opportunities.pop();
}

while (tradeHistory.length > 100) {
  tradeHistory.pop();
}

}