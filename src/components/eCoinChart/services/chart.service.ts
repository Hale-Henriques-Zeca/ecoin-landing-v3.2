import { Candle } from "../types/candle";

export const chartService = {
  formatPriceToCandle(price: number, previousClose: number): Candle {
    return {
      time: Date.now(),
      open: previousClose,
      high: Math.max(price, previousClose),
      low: Math.min(price, previousClose),
      close: price,
    };
  }
};