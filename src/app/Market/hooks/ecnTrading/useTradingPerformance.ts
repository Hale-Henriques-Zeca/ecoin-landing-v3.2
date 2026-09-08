'use client';

import { useState } from 'react';
import { TradingBotPerformance, TimeframePeriod } from '../../types/ecnTrading';
import { INITIAL_BOT_PERFORMANCE } from '../../lib/ecnTrading/bots/tradingEngine';

export function useTradingPerformance() {
  const [bots] = useState<TradingBotPerformance[]>(INITIAL_BOT_PERFORMANCE);
  const [period, setPeriod] = useState<TimeframePeriod>('today');

  const getTotalProfitForPeriod = (): number => {
    return bots.reduce((acc, bot) => {
      switch (period) {
        case 'today':
          return acc + bot.profitToday;
        case 'week':
          return acc + bot.profitWeek;
        case 'month':
          return acc + bot.profitMonth;
        case 'year':
          return acc + bot.profitYear;
        default:
          return acc + bot.profitToday;
      }
    }, 0);
  };

  return {
    bots,
    period,
    setPeriod,
    totalProfit: getTotalProfitForPeriod(),
  };
}