'use client';

import React from 'react';

interface StatTitleProps {
  children: React.ReactNode;
}

export default function StatTitle({ children }: StatTitleProps) {
  return (
    <span className="text-[10px] md:text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase select-none">
      {children}
    </span>
  );
}