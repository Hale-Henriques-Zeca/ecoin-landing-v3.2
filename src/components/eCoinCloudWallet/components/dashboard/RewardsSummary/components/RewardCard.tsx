'use client';

import React from 'react';
import RewardValue from './RewardValue';
import RewardProgress from './RewardProgress';
import RewardFooter from './RewardFooter';

interface RewardCardProps {
  title: string;
  earned: number;
  maxCapacity?: number;
  symbol: string;
}

export default function RewardCard({ title, earned, maxCapacity = 1000, symbol }: RewardCardProps) {
  const percent = (earned / maxCapacity) * 100;

  return (
    <div className="p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl hover:border-white/10 transition-all flex flex-col">
      <div className="font-mono text-[9px] font-black tracking-widest text-neutral-400 uppercase mb-2 select-none">
        {title}
      </div>
      <RewardValue amount={earned} symbol={symbol} />
      <RewardProgress value={earned} max={maxCapacity} />
      <RewardFooter percentage={percent} />
    </div>
  );
}