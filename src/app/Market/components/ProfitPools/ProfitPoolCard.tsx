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
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white tracking-wide">
            {pool.asset} Profit Pool
          </h3>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            NET REALIZED
          </span>
        </div>

        {/* Breakdown List */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-4 space-y-2">
          <div className="flex justify-between items-center text-xs pb-1 border-b border-slate-800/80">
            <span className="text-slate-300 font-bold">Gross Profit</span>
            <span className="font-bold text-white">{formatVal(pool.grossProfit)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-rose-400/90 pl-2">
            <span>- Trading Fees</span>
            <span>{formatVal(pool.tradingFees)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-rose-400/90 pl-2">
            <span>- Gas Costs</span>
            <span>{formatVal(pool.gas)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-rose-400/90 pl-2">
            <span>- Slippage Impact</span>
            <span>{formatVal(pool.slippage)}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] text-rose-400/90 pl-2">
            <span>- Operational Costs</span>
            <span>{formatVal(pool.otherCosts)}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800 font-black">
            <span className="text-white uppercase tracking-wider">Net Realized</span>
            <span className="text-emerald-400 text-sm">+{formatVal(pool.netRealizedProfit)}</span>
          </div>
        </div>

        {/* Chart */}
        <ProfitDistributionChart pool={pool} />
      </div>

      {/* Botão de Acesso Rápido */}
      <a
        href="/ecoin-rewards"
        className="w-full text-center py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm mt-2"
      >
        <span>Invest & Earn</span>
        <span>↗</span>
      </a>
    </div>
  );
};

export default ProfitPoolCard;