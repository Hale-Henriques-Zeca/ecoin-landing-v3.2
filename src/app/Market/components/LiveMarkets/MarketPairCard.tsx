'use client';

import React from 'react';
import { MarketPair } from '../../types/ecnTrading';
import PancakeTradeButton from './PancakeTradeButton';

interface MarketPairCardProps {
  pair: MarketPair;
}

export const MarketPairCard: React.FC<MarketPairCardProps> = ({ pair }) => {
  const isPositive = pair.priceChange24h >= 0;

  const getSignalBadgeStyle = (signal: string) => {
    switch (signal) {
      case 'BUY':
      case 'STRONG_BUY':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'SELL':
      case 'STRONG_SELL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-amber-500/5">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE
          </span>
          <span className={`text-xs font-medium border px-2.5 py-0.5 rounded-full ${getSignalBadgeStyle(pair.aiSignal)}`}>
            AI Signal: {pair.aiSignal}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white tracking-tight">{pair.displayPair}</h3>
        
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-slate-100">
            {pair.quoteSymbol === 'ECOIN' ? pair.price.toLocaleString() : `$${pair.price}`}
          </span>
          <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? '+' : ''}{pair.priceChange24h}% <span className="text-slate-500 font-normal">24h</span>
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-400 block">Liquidity</span>
            <span className="font-semibold text-slate-200">${pair.liquidityUsd.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-400 block">24h Volume</span>
            <span className="font-semibold text-slate-200">${pair.volume24hUsd.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <PancakeTradeButton url={pair.pancakeUrl} />
    </div>
  );
};

export default MarketPairCard;