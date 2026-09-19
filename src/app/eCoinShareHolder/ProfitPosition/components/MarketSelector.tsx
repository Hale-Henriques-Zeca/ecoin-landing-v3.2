'use client';

import React from 'react';
import { MarketType } from '../types';

interface MarketSelectorProps {
  activeMarket: MarketType;
  onSelectMarket: (market: MarketType) => void;
}

export const MarketSelector: React.FC<MarketSelectorProps> = ({
  activeMarket,
  onSelectMarket,
}) => {
  const markets: { id: MarketType; label: string; icon: string }[] = [
    { id: 'BNB', label: 'BNB MARKET', icon: '🤖' },
    { id: 'USDT', label: 'USDT MARKET', icon: '🤖' },
    { id: 'EUSD', label: 'EUSD MARKET', icon: '🤖' },
    { id: 'ECOIN', label: 'E-COIN MARKET', icon: '🟢' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {markets.map((m) => {
        const isActive = activeMarket === m.id;
        return (
          <button
            key={m.id}
            onClick={() => onSelectMarket(m.id)}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-2 ${
              isActive
                ? 'bg-amber-500/10 border-amber-500/80 ring-1 ring-amber-500/30'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white tracking-wide">{m.label}</span>
              <span className="text-sm">{m.icon}</span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-0.5">
              <p>• Stake E-Coin</p>
              <p>• Buy Commitment Seal</p>
              <p>• Realized Bot Profit</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MarketSelector;