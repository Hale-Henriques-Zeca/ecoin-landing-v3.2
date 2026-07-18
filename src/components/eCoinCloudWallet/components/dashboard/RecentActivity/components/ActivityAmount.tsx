'use client';

import React from 'react';

interface ActivityAmountProps {
  amount: number;
  symbol: string;
  type: 'deposit' | 'receive' | 'convert' | 'reward' | 'claim' | 'send';
}

export default function ActivityAmount({ amount, symbol, type }: ActivityAmountProps) {
  const isNegative = type === 'send';
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);

  return (
    <div className="flex flex-col items-end leading-none">
      <span className={`font-mono text-xs md:text-sm font-black tracking-tight ${isNegative ? 'text-red-400' : 'text-[#00FF9C]'}`}>
        {isNegative ? '-' : '+'}{formatted}
      </span>
      <span className="font-mono text-[9px] font-bold text-neutral-400 uppercase tracking-widest mt-0.5">
        {symbol}
      </span>
    </div>
  );
}