'use client';

import React from 'react';
import { MarketType } from '../types';

interface ProfitMarketCardProps {
  market: MarketType;
}

export const ProfitMarketCard: React.FC<ProfitMarketCardProps> = ({ market }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <span className="text-xs font-bold text-amber-400 block uppercase tracking-wider">
          Active Economic Pool
        </span>
        <h2 className="text-lg font-black text-white">{market} AI PROFIT MARKET</h2>
      </div>
      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
        POOL ACTIVE
      </span>
    </div>
  );
};

export default ProfitMarketCard;