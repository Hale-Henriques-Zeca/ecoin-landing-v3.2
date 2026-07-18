'use client';

import React from 'react';

interface LoadingLabelProps {
  children: React.ReactNode;
}

export default function LoadingLabel({ children }: LoadingLabelProps) {
  return (
    <p className="text-xs font-mono font-bold tracking-widest text-[#D4AF37] uppercase select-none mt-4 text-center">
      {children}
    </p>
  );
}