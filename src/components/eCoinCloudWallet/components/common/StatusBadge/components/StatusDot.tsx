'use client';

import React from 'react';

export type StatusVariant = 'connected' | 'pending' | 'offline' | 'sponsored' | 'processing';

interface StatusDotProps {
  variant: StatusVariant;
}

export default function StatusDot({ variant }: StatusDotProps) {
  const dotClasses = {
    connected: 'bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]',
    pending: 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse',
    offline: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
    sponsored: 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]',
    processing: 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-ping',
  };

  return (
    <div className="relative flex h-2 w-2">
      {variant === 'processing' && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping" />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${dotClasses[variant]}`} />
    </div>
  );
}