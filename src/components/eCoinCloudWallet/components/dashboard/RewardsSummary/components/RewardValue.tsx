'use client';

import React from 'react';

interface RewardValueProps {
  amount: number;
  symbol: string;
}

export default function RewardValue({ amount, symbol }: RewardValueProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4
  }).format(amount);

  return (
    <div className="font-mono text-sm font-black tracking-tight text-white leading-none">
      {formatted} <span className="text-[10px] font-bold text-[#D4AF37] uppercase select-none">{symbol}</span>
    </div>
  );
}