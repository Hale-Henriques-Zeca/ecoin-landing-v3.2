'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatTrendProps {
  trend?: number; // Ex: +3.5 ou -1.2
}

export default function StatTrend({ trend }: StatTrendProps) {
  if (trend === undefined) return null;

  const isPositive = trend >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`
      flex items-center gap-1 font-mono text-[10px] font-extrabold select-none mt-1.5
      ${isPositive ? 'text-[#00FF9C]' : 'text-red-400'}
    `}>
      <Icon size={11} />
      <span>
        {isPositive ? '+' : ''}
        {trend.toFixed(2)}%
      </span>
    </div>
  );
}