'use client';

import React from 'react';
import { RewardPool } from '../../types/ecnTrading';

interface RewardDistributionChartProps {
  pool: RewardPool;
}

export const RewardDistributionChart: React.FC<RewardDistributionChartProps> = ({ pool }) => {
  const total = pool.availableRewards + pool.distributedRewards;
  const availablePct = total > 0 ? (pool.availableRewards / total) * 100 : 0;
  const distributedPct = total > 0 ? (pool.distributedRewards / total) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex shadow-inner">
        <div
          style={{ width: `${distributedPct}%` }}
          className="bg-emerald-500 h-full transition-all duration-500"
          title={`Distributed: ${distributedPct.toFixed(1)}%`}
        />
        <div
          style={{ width: `${availablePct}%` }}
          className="bg-amber-400 h-full transition-all duration-500"
          title={`Available: ${availablePct.toFixed(1)}%`}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Distributed ({distributedPct.toFixed(0)}%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          Pending ({availablePct.toFixed(0)}%)
        </span>
      </div>
    </div>
  );
};

export default RewardDistributionChart;