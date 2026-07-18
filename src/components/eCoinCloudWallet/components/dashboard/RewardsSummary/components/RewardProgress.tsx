'use client';

import React from 'react';

interface RewardProgressProps {
  value: number;
  max?: number;
}

export default function RewardProgress({ value, max = 100 }: RewardProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2 relative select-none">
      <div 
        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00FF9C] rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}