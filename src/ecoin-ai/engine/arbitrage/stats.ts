import { tradeHistory } from "./history";

export function getStats() {
  const totalTrades = tradeHistory.length;

  const successfulTrades =
    tradeHistory.filter(t => t.profit > 0).length;

  const failedTrades =
    tradeHistory.filter(t => t.profit <= 0).length;

  const totalProfit =
    tradeHistory.reduce(
      (acc, t) => acc + Number(t.profit),
      0
    );

  const winRate =
    totalTrades === 0
      ? 0
      : (successfulTrades / totalTrades) * 100;

  const bestTrade =
    tradeHistory.length
      ? Math.max(...tradeHistory.map(t => t.profit))
      : 0;

  const worstTrade =
    tradeHistory.length
      ? Math.min(...tradeHistory.map(t => t.profit))
      : 0;

  return {
    totalTrades,
    successfulTrades,
    failedTrades,
    totalProfit,
    winRate,
    bestTrade,
    worstTrade
  };
}