'use client';

import React, { useState } from 'react';

interface StakeEcoinPanelProps {
  stakedAmount: number;
  onStake: (amount: number) => void;
}

export const StakeEcoinPanel: React.FC<StakeEcoinPanelProps> = ({
  stakedAmount,
  onStake,
}) => {
  const [inputVal, setInputVal] = useState<string>('1000');

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white tracking-wide">STEP 1 — STAKE E-COIN</h3>
        <span className="text-xs text-amber-400 font-bold">Position Base</span>
      </div>

      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1">
        <span className="text-xs text-slate-400 block font-medium">Your Staked E-Coin</span>
        <span className="text-2xl font-black text-amber-400">
          {stakedAmount.toLocaleString()} ECOIN
        </span>
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="bg-slate-950 border border-slate-800 text-white font-bold text-sm rounded-xl px-3 py-2 w-full focus:outline-none focus:border-amber-500"
          placeholder="Amount"
        />
        <button
          onClick={() => onStake(Number(inputVal) || 0)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md shrink-0"
        >
          + STAKE E-COIN
        </button>
      </div>
    </div>
  );
};

export default StakeEcoinPanel;