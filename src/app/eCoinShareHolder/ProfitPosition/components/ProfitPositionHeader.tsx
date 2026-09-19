'use client';

import React from 'react';
import BuyBackMarketButton from './BuyBackMarketButton';

export const ProfitPositionHeader: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-wide text-white flex items-center gap-2">
            🧠 E-COIN PROFIT POSITION
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Stake E-Coin → Establish Position → Buy Profit Capacity → Participate in Realized Bot Profits
          </p>
        </div>
        <BuyBackMarketButton />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-amber-500 font-bold block uppercase">Step 1</span>
          <span className="text-xs font-bold text-slate-200">Stake E-Coin</span>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-amber-500 font-bold block uppercase">Step 2</span>
          <span className="text-xs font-bold text-slate-200">Establish Position</span>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-amber-500 font-bold block uppercase">Step 3</span>
          <span className="text-xs font-bold text-slate-200">Buy Capacity (CS)</span>
        </div>
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <span className="text-[10px] text-amber-500 font-bold block uppercase">Step 4</span>
          <span className="text-xs font-bold text-slate-200">Realized Profit</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 bg-slate-950/40 border border-slate-800/50 p-3 rounded-xl leading-relaxed">
        Your E-Coin stake establishes your relative participation in the selected economic pool. Your Commitment Seal activates a temporary profit-capacity cycle (up to 30% profit capacity + return of associated capital, subject to available realized revenue and protocol rules).
      </p>
    </div>
  );
};

export default ProfitPositionHeader;