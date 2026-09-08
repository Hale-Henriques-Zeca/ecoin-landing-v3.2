'use client';

import React from 'react';

export const ProfitDistribution: React.FC = () => {
  const distributionSlices = [
    { label: 'Mining Rewards', share: '20%', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30' },
    { label: 'Liquidity Pool', share: '20%', color: 'border-amber-500/40 text-amber-400 bg-amber-950/30' },
    { label: 'Treasury Reserve', share: '10%', color: 'border-sky-500/40 text-sky-400 bg-sky-950/30' },
    { label: 'Shareholders & Stakers', share: '50%', color: 'border-purple-500/40 text-purple-400 bg-purple-950/30' },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span>🏛️</span> Realized Profit Allocation Engine
        </h3>
        <span className="text-[11px] font-mono text-slate-400">Automated On-Chain Split</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {distributionSlices.map((slice) => (
          <div
            key={slice.label}
            className={`p-3 rounded-xl border ${slice.color} flex flex-col justify-between space-y-2`}
          >
            <span className="text-xs font-semibold text-slate-300">{slice.label}</span>
            <span className="text-xl font-black">{slice.share}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfitDistribution;