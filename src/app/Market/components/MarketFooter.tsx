'use client';

import React from 'react';

export const MarketFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 pt-8 pb-12 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <span className="font-bold text-white text-sm tracking-wide">
              eCoin ecnTrading Engine
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-400">
            <span className="hover:text-amber-400 transition-colors cursor-pointer">BSC Smart Contracts</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">PancakeSwap V2 Router</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">AI Arbitrage Models</span>
            <span className="hover:text-amber-400 transition-colors cursor-pointer">On-Chain Accounting</span>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} E-Coin Protocol. All rights reserved.</p>
          <p className="font-mono">Network Chain ID: 56 (BSC Mainnet)</p>
        </div>
      </div>
    </footer>
  );
};

export default MarketFooter;