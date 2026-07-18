'use client';

import React from 'react';

interface ActionLabelProps {
  children: React.ReactNode;
}

export default function ActionLabel({ children }: ActionLabelProps) {
  return (
    <span className="font-mono text-[9px] md:text-[10px] font-bold tracking-wider text-neutral-400 group-hover:text-white uppercase mt-1.5 transition-colors">
      {children}
    </span>
  );
}