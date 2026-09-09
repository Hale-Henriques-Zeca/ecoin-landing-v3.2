'use client';

import React from 'react';
import { CapitalPool } from '../../types/ecnTrading';
import PoolCapitalChart from './PoolCapitalChart';

interface CapitalPoolCardProps {
  pool: CapitalPool;
}

export const CapitalPoolCard: React.FC<CapitalPoolCardProps> = ({ pool }) => {
  const formatVal = (val: number) => {
    if (pool.poolAsset === 'USDT' || pool.poolAsset === 'EUSD') {
      return `$${val.toLocaleString()}`;
    }
    return `${val.toLocaleString()} ${pool.poolAsset}`;
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white tracking-wide">
            {pool.poolAsset} Capital Pool
          </h3>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {pool.poolAsset}
          </span>
        </div>

        <div className="space-y-2.5 my-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Available</span>
            <span className="font-bold text-white">{formatVal(pool.available)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">In Trading</span>
            <span className="font-bold text-amber-400">{formatVal(pool.inTrading)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Reserved</span>
            <span className="font-bold text-sky-400">{formatVal(pool.reserved)}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
            <span className="text-slate-400 font-medium">Total Realized Profit</span>
            <span className="font-black text-emerald-400">+{formatVal(pool.totalProfit)}</span>
          </div>
        </div>

        <PoolCapitalChart pool={pool} />
      </div>

      <a
        href="/ecoin-rewards"
        className="w-full text-center py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
      >
        <span>Invest & Earn</span>
        <span>↗</span>
      </a>
    </div>
  );
};

export default CapitalPoolCard;