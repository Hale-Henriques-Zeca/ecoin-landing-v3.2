import { updateBalance } from "../../profit/pnl/tracker";

type Prices = {
  ETHBTC: number;
  BTCUSDT: number;
  ETHUSDT: number;
};

const FEE = 0.001; // 0.1% por trade

export function checkTriangularArbitrage(prices: Prices) {
  const { ETHBTC, BTCUSDT, ETHUSDT } = prices;

  if (!ETHBTC || !BTCUSDT || !ETHUSDT) return;

  // 🟢 DIREÇÃO 1: USDT → BTC → ETH → USDT
  let usdt = 1;

  let btc = (usdt / BTCUSDT) * (1 - FEE);
  let eth = (btc / ETHBTC) * (1 - FEE);
  let finalUSDT = (eth * ETHUSDT) * (1 - FEE);

  const profit1 = finalUSDT - usdt;

  // 🔵 DIREÇÃO 2: USDT → ETH → BTC → USDT
  let eth2 = (usdt / ETHUSDT) * (1 - FEE);
  let btc2 = (eth2 * ETHBTC) * (1 - FEE);
  let finalUSDT2 = (btc2 * BTCUSDT) * (1 - FEE);

  const profit2 = finalUSDT2 - usdt;

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
}