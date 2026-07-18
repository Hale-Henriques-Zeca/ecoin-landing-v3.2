'use client';

import React from 'react';

interface FilterLabelProps {
  children: React.ReactNode;
}

export default function FilterLabel({ children }: FilterLabelProps) {
  return (
    <span className="font-mono text-[11px] font-bold tracking-wider uppercase">
      {children}
    </span>
  );
}