'use client';

import React from 'react';

interface StatisticValueProps {
  children: React.ReactNode;
}

export default function StatisticValue({ children }: StatisticValueProps) {
  return (
    <span className="font-mono text-sm md:text-base font-black tracking-tight text-white mt-1">
      {children}
    </span>
  );
}