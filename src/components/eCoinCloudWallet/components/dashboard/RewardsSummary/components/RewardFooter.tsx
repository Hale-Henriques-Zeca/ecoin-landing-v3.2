'use client';

import React from 'react';

interface RewardFooterProps {
  percentage: number;
}

export default function RewardFooter({ percentage }: RewardFooterProps) {
  return (
    <div className="flex items-center justify-between text-[8px] font-mono font-bold uppercase mt-1.5 tracking-wider select-none">
      <span className="text-neutral-500">Capacidade</span>
      <span className={percentage >= 90 ? 'text-red-400' : 'text-[#00FF9C]'}>
        {percentage.toFixed(0)}%
      </span>
    </div>
  );
}