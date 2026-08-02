import { Candle } from "../types/candle";

export function generateCandleFromPrice(currentPrice: number, previousClose: number): Candle {
  const now = Date.now();
  const variance = currentPrice * 0.002; // Exemplo de variação leve para simular high/low
  
  return {
    time: now,
    open: previousClose,
    high: currentPrice + variance,
    low: currentPrice - variance,
    close: currentPrice,
  };
}