'use client';

import React from 'react';

interface DistributionSlice {
  label: string;
  share: string;
  type: 'Token-specific' | 'Comum';
  color: string;
  badgeColor: string;
}

export const ProfitDistribution: React.FC = () => {
  const distributionSlices: DistributionSlice[] = [
    {
      label: 'Mining / Shareholders',
      share: '20%',
      type: 'Token-specific',
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30 hover:border-emerald-500/60',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    },
    {
      label: 'Liquidity Pool',
      share: '20%',
      type: 'Comum',
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/30 hover:border-amber-500/60',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    },
    {
      label: 'Salary Reserve',
      share: '20%',
      type: 'Token-specific',
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/30 hover:border-purple-500/60',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    },
    {
      label: 'Treasury Reserve',
      share: '10%',
      type: 'Comum',
      color: 'border-sky-500/40 text-sky-400 bg-sky-950/30 hover:border-sky-500/60',
      badgeColor: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    },
    {
      label: 'Buyback & Support',
      share: '10%',
      type: 'Token-specific',
      color: 'border-pink-500/40 text-pink-400 bg-pink-950/30 hover:border-pink-500/60',
      badgeColor: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    },
    {
      label: 'Trading Capital',
      share: '10%',
      type: 'Token-specific',
      color: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/30 hover:border-cyan-500/60',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
    {
      label: 'Ecosystem Dev',
      share: '10%',
      type: 'Comum',
      color: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/30 hover:border-indigo-500/60',
      badgeColor: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span>🏛️</span> Realized Profit Allocation Engine
        </h3>
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>7 Buckets (100% On-Chain)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {distributionSlices.map((slice) => (
          <div
            key={slice.label}
            className={`p-3 rounded-xl border ${slice.color} flex flex-col justify-between space-y-3 transition-all duration-200 hover:scale-[1.02]`}
          >
            <div className="flex flex-col space-y-1">
              <span className="text-[11px] font-semibold text-slate-200 line-clamp-1" title={slice.label}>
                {slice.label}
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded border w-fit font-mono font-medium ${slice.badgeColor}`}>
                {slice.type}
              </span>
            </div>
            <span className="text-xl font-black tracking-tight">{slice.share}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfitDistribution;