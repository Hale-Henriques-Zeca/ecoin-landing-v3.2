'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceChangeProps {
  trend: number; // Ex: +5.20 ou -1.50
}

export default function BalanceChange({ trend }: BalanceChangeProps) {
  const isPositive = trend >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold
        ${isPositive ? 'bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}
      `}>
        <Icon size={11} />
        <span>{isPositive ? '+' : ''}{trend.toFixed(2)}%</span>
      </div>
      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
        Últimas 24h
      </span>
    </div>
  );
}