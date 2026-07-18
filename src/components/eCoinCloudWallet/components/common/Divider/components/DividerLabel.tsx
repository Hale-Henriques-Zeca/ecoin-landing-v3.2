'use client';

import React from 'react';

interface DividerLabelProps {
  children?: React.ReactNode;
}

export default function DividerLabel({ children }: DividerLabelProps) {
  if (!children) return null;
  return (
    <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase shrink-0 select-none">
      {children}
    </span>
  );
}