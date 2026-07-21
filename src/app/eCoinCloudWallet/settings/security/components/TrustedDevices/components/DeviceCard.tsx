'use client';

import React from 'react';

interface DeviceCardProps {
  children: React.ReactNode;
}

export default function DeviceCard({ children }: DeviceCardProps) {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      {children}
    </div>
  );
}