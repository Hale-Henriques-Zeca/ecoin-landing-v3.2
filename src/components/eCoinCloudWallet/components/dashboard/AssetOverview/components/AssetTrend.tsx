'use client';

import React from 'react';

interface AssetTrendProps {
  trend24h: number;
}

export default function AssetTrend({ trend24h }: AssetTrendProps) {
  const isPositive = trend24h >= 0;
  return (
    <span className={`font-mono text-[10px] font-extrabold ${isPositive ? 'text-[#00FF9C]' : 'text-red-400'}`}>
      {isPositive ? '+' : ''}{trend24h.toFixed(2)}%
    </span>
  );
}