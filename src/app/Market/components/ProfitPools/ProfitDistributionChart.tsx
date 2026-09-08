'use client';

import React from 'react';
import { ProfitPool } from '../../types/ecnTrading';

interface ProfitDistributionChartProps {
  pool: ProfitPool;
}

export const ProfitDistributionChart: React.FC<ProfitDistributionChartProps> = ({ pool }) => {
  const totalDeductions = pool.tradingFees + pool.gas + pool.slippage + pool.otherCosts;
  const netRatio = pool.grossProfit > 0 ? (pool.netRealizedProfit / pool.grossProfit) * 100 : 0;
  const costRatio = pool.grossProfit > 0 ? (totalDeductions / pool.grossProfit) * 100 : 0;

  return (
    <div className="w-full space-y-2">
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden flex shadow-inner">
        <div
          style={{ width: `${netRatio}%` }}
          className="bg-emerald-500 h-full transition-all duration-500"
          title={`Net Profit: ${netRatio.toFixed(1)}%`}
        />
        <div
          style={{ width: `${costRatio}%` }}
          className="bg-rose-500/80 h-full transition-all duration-500"
          title={`Deductions: ${costRatio.toFixed(1)}%`}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Net Yield ({netRatio.toFixed(0)}%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Costs ({costRatio.toFixed(0)}%)
        </span>
      </div>
    </div>
  );
};

export default ProfitDistributionChart;