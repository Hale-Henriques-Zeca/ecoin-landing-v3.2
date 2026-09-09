'use client';

import React from 'react';
import { TradingBotPerformance } from '../../types/ecnTrading';
import BotPerformanceStats from './BotPerformanceStats';
import { ProfitPeriod } from './ProfitPeriodSelector';

interface TradingBotCardProps {
  bot: TradingBotPerformance;
  selectedPeriod: ProfitPeriod;
}

export const TradingBotCard: React.FC<TradingBotCardProps> = ({
  bot,
  selectedPeriod,
}) => {
  const formatCapital = (val: number) => {
    if (bot.asset === 'USDT' || bot.asset === 'EUSD') {
      return `$${val.toLocaleString()}`;
    }
    return `${val.toLocaleString()} ${bot.asset}`;
  };

  const getPancakeLink = (asset: string) => {
    if (asset === 'BNB') return 'https://pancakeswap.finance/swap?inputCurrency=BNB&outputCurrency=ECOIN';
    return 'https://pancakeswap.finance/swap';
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white tracking-wide">{bot.name}</h3>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            TRADING LIVE
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl mb-4">
          <span className="text-xs text-slate-400 block font-medium">Trading Capital</span>
          <span className="text-xl font-black text-amber-400 mt-0.5 block">
            {formatCapital(bot.capital)}
          </span>
        </div>

        <BotPerformanceStats bot={bot} selectedPeriod={selectedPeriod} />
      </div>

      <a
        href="/ecoin-rewards"
        className="w-full text-center py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
      >
        <span>Invest & Earn</span>
        <span>↗</span>
      </a>
    </div>
  );
};

export default TradingBotCard;