'use client';

import React from 'react';
import { TradingBotPerformance } from '../../types/ecnTrading';
import { ProfitPeriod } from './ProfitPeriodSelector';

interface BotPerformanceStatsProps {
  bot: TradingBotPerformance;
  selectedPeriod: ProfitPeriod;
}

export const BotPerformanceStats: React.FC<BotPerformanceStatsProps> = ({
  bot,
  selectedPeriod,
}) => {
  const formatAssetValue = (val: number) => {
    if (bot.asset === 'USDT' || bot.asset === 'EUSD') {
      return `$${val.toLocaleString()}`;
    }
    return `${val.toLocaleString()} ${bot.asset}`;
  };

  const periodData = [
    { key: 'today', label: 'Today', value: bot.profitToday },
    { key: 'week', label: 'Week', value: bot.profitWeek },
    { key: 'month', label: 'Month', value: bot.profitMonth },
    { key: 'year', label: 'Year', value: bot.profitYear },
  ];

  return (
    <div className="mt-4 space-y-2 border-t border-slate-800/80 pt-3">
      {periodData.map((item) => {
        const isHighlighted = selectedPeriod === item.key;
        return (
          <div
            key={item.key}
            className={`flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
              isHighlighted
                ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-bold'
                : 'text-slate-400 font-medium'
            }`}
          >
            <span>{item.label}</span>
            <span className={isHighlighted ? 'text-emerald-400' : 'text-slate-200'}>
              +{formatAssetValue(item.value)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default BotPerformanceStats;