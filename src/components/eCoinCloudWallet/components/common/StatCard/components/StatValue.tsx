'use client';

import React from 'react';

interface StatValueProps {
  children: React.ReactNode;
}

export default function StatValue({ children }: StatValueProps) {
  return (
    <div className="font-mono text-lg md:text-xl font-black tracking-tight text-white mt-1.5">
      {children}
    </div>
  );
}