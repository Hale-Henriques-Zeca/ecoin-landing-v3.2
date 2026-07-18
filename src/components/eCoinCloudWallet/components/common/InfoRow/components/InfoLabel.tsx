'use client';

import React from 'react';

interface InfoLabelProps {
  children: React.ReactNode;
}

export default function InfoLabel({ children }: InfoLabelProps) {
  return (
    <span className="text-[11px] md:text-xs font-semibold text-neutral-400 tracking-wide select-none">
      {children}
    </span>
  );
}