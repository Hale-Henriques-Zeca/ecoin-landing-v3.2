'use client';

import React from 'react';
import { RewardPool } from '../../types/ecnTrading';
import RewardPoolCard from './RewardPoolCard';
import RewardPoolTable from './RewardPoolTable';

interface RewardPoolsSectionProps {
  pools: RewardPool[];
}

export const RewardPoolsSection: React.FC<RewardPoolsSectionProps> = ({ pools }) => {
  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🪙</span> Staking Reward Pools
          </h2>
          <p className="text-xs text-slate-400">
            Dedicated vault allocation streams feeding stakers, commitment sealers, and shareholder pools.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono">4 Target Vaults</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {pools.map((pool) => (
          <RewardPoolCard key={pool.asset} pool={pool} />
        ))}
      </div>

      <RewardPoolTable pools={pools} />
    </section>
  );
};

export default RewardPoolsSection;