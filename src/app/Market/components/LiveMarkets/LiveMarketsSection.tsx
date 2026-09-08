'use client';

import React from 'react';
import { MarketPair } from '../../types/ecnTrading';
import MarketPairGrid from './MarketPairGrid';

interface LiveMarketsSectionProps {
  pairs: MarketPair[];
}

export const LiveMarketsSection: React.FC<LiveMarketsSectionProps> = ({ pairs }) => {
  return (
    <section className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>📈</span> Live Markets
          </h2>
          <p className="text-xs text-slate-400">
            Real-time PancakeSwap pair displays mapped across 3 liquidity pools.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono">3 Pools / 6 Views</span>
      </div>

      <MarketPairGrid pairs={pairs} />
    </section>
  );
};

export default LiveMarketsSection;