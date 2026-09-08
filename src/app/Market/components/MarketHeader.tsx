'use client';

import React from 'react';

export const MarketHeader: React.FC = () => {
  return (
    <header className="w-full bg-slate-900/90 border border-amber-500/20 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              ECNTrading <span className="text-amber-400">DEX</span>
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
              LIVE TERMINAL
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            AI Market & Trading Center
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">AI TRADING LIVE</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <span>PancakeSwap LIVE</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 md:gap-4 text-center">
        <div className="bg-slate-800/40 rounded-xl p-2.5 md:p-3 border border-slate-800">
          <span className="block text-xs text-slate-400 font-medium">Capital Pools</span>
          <span className="text-sm md:text-base font-bold text-slate-100">4 Active</span>
        </div>
        <div className="bg-slate-800/40 rounded-xl p-2.5 md:p-3 border border-slate-800">
          <span className="block text-xs text-slate-400 font-medium">Profit Pools</span>
          <span className="text-sm md:text-base font-bold text-amber-400">4 Realized</span>
        </div>
        <div className="bg-slate-800/40 rounded-xl p-2.5 md:p-3 border border-slate-800">
          <span className="block text-xs text-slate-400 font-medium">Reward Pools</span>
          <span className="text-sm md:text-base font-bold text-emerald-400">4 Active</span>
        </div>
      </div>
    </header>
  );
};

export default MarketHeader;