'use client';

import React from 'react';

interface InfoValueProps {
  children: React.ReactNode;
  highlight?: boolean;
}

export default function InfoValue({ children, highlight = false }: InfoValueProps) {
  return (
    <span className={`text-[11px] md:text-xs font-mono font-bold tracking-tight ${highlight ? 'text-[#D4AF37]' : 'text-neutral-200'}`}>
      {children}
    </span>
  );
}