'use client';

import React from 'react';
import { ProfitPool } from '../../types/ecnTrading';
import ProfitPoolCard from './ProfitPoolCard';
import ProfitDistribution from './ProfitDistribution';

interface ProfitPoolsSectionProps {
  pools: ProfitPool[];
}

export const ProfitPoolsSection: React.FC<ProfitPoolsSectionProps> = ({ pools }) => {
  return (
    <section className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🏦</span> Profit Pools & Net Accounting
          </h2>
          <p className="text-xs text-slate-400">
            Accounting engine separating gross volume from true net realized profit after fees, gas, and slippage.
          </p>
        </div>
        <span className="text-xs text-slate-500 font-mono">4 Asset Pools</span>
      </div>

      <ProfitDistribution />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {pools.map((pool) => (
          <ProfitPoolCard key={pool.asset} pool={pool} />
        ))}
      </div>
    </section>
  );
};

export default ProfitPoolsSection;