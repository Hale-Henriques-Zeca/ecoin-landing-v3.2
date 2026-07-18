'use client';

import React from 'react';

interface ButtonLabelProps {
  children: React.ReactNode;
}

export default function ButtonLabel({ children }: ButtonLabelProps) {
  return (
    <span className="font-mono text-xs font-bold tracking-widest uppercase">
      {children}
    </span>
  );
}