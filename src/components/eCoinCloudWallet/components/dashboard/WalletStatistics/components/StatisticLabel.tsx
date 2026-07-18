'use client';

import React from 'react';

interface StatisticLabelProps {
  children: React.ReactNode;
}

export default function StatisticLabel({ children }: StatisticLabelProps) {
  return (
    <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase select-none">
      {children}
    </span>
  );
}