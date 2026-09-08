'use client';

import React from 'react';
import { ProfitPool } from '../../types/ecnTrading';
import ProfitDistributionChart from './ProfitDistributionChart';

interface ProfitPoolCardProps {
  pool: ProfitPool;
}

export const ProfitPoolCard: React.FC<ProfitPoolCardProps> = ({ pool }) => {
  const formatVal = (val: number) => {
    if (pool.asset === 'USDT' || pool.asset === 'EUSD') {
      return `$${val.toLocaleString()}`;
    }
    return `${val.toLocaleString()} ${pool.asset}`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-white tracking-wide">
            {pool.asset} Profit Pool
          </h3>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            NET REALIZED
          </span>
        </div>

        <div className="space-y-2 text-xs my-4 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center text-slate-300 font-semibold">
            <span>Gross Profit</span>
            <span>{formatVal(pool.grossProfit)}</span>
          </div>
          <div className="flex justify-between items-center text-rose-400/90 pl-2">
            <span>- Trading Fees</span>
            <span>{formatVal(pool.tradingFees)}</span>
          </div>
          <div className="flex justify-between items-center text-rose-400/90 pl-2">
            <span>- Gas Costs</span>
            <span>{formatVal(pool.gas)}</span>
          </div>
          <div className="flex justify-between items-center text-rose-400/90 pl-2">
            <span>- Slippage Impact</span>
            <span>{formatVal(pool.slippage)}</span>
          </div>
          <div className="flex justify-between items-center text-rose-400/90 pl-2">
            <span>- Operational Costs</span>
            <span>{formatVal(pool.otherCosts)}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-black">
            <span className="text-white">NET REALIZED</span>
            <span className="text-emerald-400">+{formatVal(pool.netRealizedProfit)}</span>
          </div>
        </div>
      </div>

      <ProfitDistributionChart pool={pool} />
    </div>
  );
};

export default ProfitPoolCard;