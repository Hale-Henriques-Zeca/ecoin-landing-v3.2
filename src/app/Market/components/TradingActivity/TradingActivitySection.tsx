'use client';

import React from 'react';
import { TradeActivity } from '../../types/ecnTrading';
import TradeActivityTable from './TradeActivityTable';

interface TradingActivitySectionProps {
  activities: TradeActivity[];
}

export const TradingActivitySection: React.FC<TradingActivitySectionProps> = ({ activities }) => {
  return (
    <section className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🔄</span> Live Trading Activity
          </h2>
          <p className="text-xs text-slate-400">
            Real-time execution log broadcasted directly from autonomous bot strategies without strategy exposure.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>FEED ACTIVE</span>
        </div>
      </div>

      <TradeActivityTable activities={activities} />
    </section>
  );
};

export default TradingActivitySection;