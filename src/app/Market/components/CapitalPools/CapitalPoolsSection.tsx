'use client';

import React from 'react';
import { CapitalPool } from '../../types/ecnTrading';
import CapitalPoolCard from './CapitalPoolCard';
import CapitalPoolsTable from './CapitalPoolsTable';

interface CapitalPoolsSectionProps {
  pools: CapitalPool[];
}

export const CapitalPoolsSection: React.FC<CapitalPoolsSectionProps> = ({ pools }) => {
  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>💰</span> Capital Pools
          </h2>
          <p className="text-xs text-slate-400">
            Segregated bot funding pools maintaining accounting isolation across active markets.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono">4 Liquidity Sources</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {pools.map((pool) => (
          <CapitalPoolCard key={pool.poolAsset} pool={pool} />
        ))}
      </div>

      <CapitalPoolsTable pools={pools} />
    </section>
  );
};

export default CapitalPoolsSection;