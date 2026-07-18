'use client';

import React from 'react';

interface StatusTextProps {
  children: React.ReactNode;
}

export default function StatusText({ children }: StatusTextProps) {
  return (
    <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
      {children}
    </span>
  );
}