'use client';

import React from 'react';
import { CapitalPool } from '../../types/ecnTrading';

interface PoolCapitalChartProps {
  pool: CapitalPool;
}

export const PoolCapitalChart: React.FC<PoolCapitalChartProps> = ({ pool }) => {
  const total = pool.available + pool.inTrading + pool.reserved;
  
  const availablePct = total > 0 ? (pool.available / total) * 100 : 0;
  const inTradingPct = total > 0 ? (pool.inTrading / total) * 100 : 0;
  const reservedPct = total > 0 ? (pool.reserved / total) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex shadow-inner">
        <div
          style={{ width: `${availablePct}%` }}
          className="bg-emerald-500 h-full transition-all duration-500"
          title={`Available: ${availablePct.toFixed(1)}%`}
        />
        <div
          style={{ width: `${inTradingPct}%` }}
          className="bg-amber-500 h-full transition-all duration-500"
          title={`In Trading: ${inTradingPct.toFixed(1)}%`}
        />
        <div
          style={{ width: `${reservedPct}%` }}
          className="bg-sky-500 h-full transition-all duration-500"
          title={`Reserved: ${reservedPct.toFixed(1)}%`}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Avail {availablePct.toFixed(0)}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Trade {inTradingPct.toFixed(0)}%
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          Res {reservedPct.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default PoolCapitalChart;