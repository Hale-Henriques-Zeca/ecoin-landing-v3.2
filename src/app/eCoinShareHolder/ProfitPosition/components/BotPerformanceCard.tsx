'use client';

import React from 'react';

interface BotPerformanceCardProps {
  botName: string;
  tradingCapital: string;
  realizedProfits: { asset: string; amount: number }[];
  poolShare: number;
}

export const BotPerformanceCard: React.FC<BotPerformanceCardProps> = ({
  botName,
  tradingCapital,
  realizedProfits,
  poolShare,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white tracking-wide">{botName}</h3>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ● LIVE
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400">Trading Capital</span>
          <span className="font-bold text-amber-400">{tradingCapital}</span>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-2">
          <span className="text-slate-400 block font-medium">Bot Realized Profit</span>
          {realizedProfits.map((p) => (
            <div key={p.asset} className="flex justify-between items-center font-bold">
              <span className="text-slate-300">{p.asset}</span>
              <span className="text-emerald-400">+{p.amount} {p.asset}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-slate-400 px-1">
          <span>Your Pool Share:</span>
          <span className="font-bold text-white">{poolShare}%</span>
        </div>
      </div>
    </div>
  );
};

export default BotPerformanceCard;