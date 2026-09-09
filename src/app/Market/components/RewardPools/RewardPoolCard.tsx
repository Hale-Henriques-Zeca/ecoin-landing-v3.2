'use client';

import React from 'react';
import { RewardPool } from '../../types/ecnTrading';
import RewardDistributionChart from './RewardDistributionChart';

interface RewardPoolCardProps {
  pool: RewardPool;
}

export const RewardPoolCard: React.FC<RewardPoolCardProps> = ({ pool }) => {
  const formatVal = (val: number) => {
    if (pool.asset === 'USDT' || pool.asset === 'EUSD') {
      return `$${val.toLocaleString()}`;
    }
    return `${val.toLocaleString()} ${pool.asset}`;
  };

  const getThemeBadge = (asset: string) => {
    switch (asset) {
      case 'USDT':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30';
      case 'EUSD':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/30';
      case 'ECOIN':
        return 'bg-purple-950/80 text-purple-400 border-purple-500/30';
      case 'BNB':
        return 'bg-sky-950/80 text-sky-400 border-sky-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white tracking-wide">
            {pool.asset} Reward Pool
          </h3>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getThemeBadge(pool.asset)}`}>
            {pool.rewardAsset}
          </span>
        </div>

        <div className="space-y-2.5 my-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Available Rewards</span>
            <span className="font-bold text-amber-400">{formatVal(pool.availableRewards)}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Distributed Rewards</span>
            <span className="font-bold text-emerald-400">{formatVal(pool.distributedRewards)}</span>
          </div>
          <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
            <span className="text-slate-400 font-medium">Eligible Holders</span>
            <span className="font-semibold text-slate-200">{pool.eligibleHolders.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3">
          <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
            Staking Mechanism
          </span>
          <span className="text-xs font-semibold text-slate-200 mt-0.5 block truncate">
            {pool.mechanism}
          </span>
        </div>

        <RewardDistributionChart pool={pool} />
      </div>

      <a
        href="/ecoin-rewards"
        className="w-full text-center py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs border border-amber-500/30 transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
      >
        <span>Invest & Earn {pool.rewardAsset}</span>
        <span>↗</span>
      </a>
    </div>
  );
};

export default RewardPoolCard;