import { useState, useEffect } from 'react';
import { Candle } from '../types/candle';
import { useECoinPrice } from './useECoinPrice';
import { chartService } from '../services/chart.service';
import { REFRESH_CHART } from '../constants';

export function useCandlestick(): Candle[] {
  const { price } = useECoinPrice();
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    if (!price) return;

    setCandles((prev) => {
      const lastClose = prev.length > 0 ? prev[prev.length - 1].close : price;
      const newCandle = chartService.formatPriceToCandle(price, lastClose);
      
      // Mantém um histórico recente de candles
      const updated = [...prev, newCandle];
      if (updated.length > 50) updated.shift();
      return updated;
    });
  }, [price]);

  return candles;
}