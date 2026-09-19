'use client';

import React from 'react';
import WithdrawProfitButton from './WithdrawProfitButton';

interface RealizedProfitCardProps {
  allocatedProfits: { asset: string; amount: number }[];
}

export const RealizedProfitCard: React.FC<RealizedProfitCardProps> = ({
  allocatedProfits,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <h3 className="text-sm font-bold text-white tracking-wide">YOUR ALLOCATED PROFIT</h3>
          <span className="text-xs font-bold text-emerald-400">AVAILABLE</span>
        </div>

        <div className="space-y-2 mb-4">
          {allocatedProfits.map((p) => (
            <div
              key={p.asset}
              className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center"
            >
              <span className="text-xs text-slate-400">{p.asset}</span>
              <span className="text-base font-black text-emerald-400">
                +{p.amount.toFixed(5)} {p.asset}
              </span>
            </div>
          ))}
        </div>
      </div>

      <WithdrawProfitButton allocatedProfits={allocatedProfits} />
    </div>
  );
};

export default RealizedProfitCard;