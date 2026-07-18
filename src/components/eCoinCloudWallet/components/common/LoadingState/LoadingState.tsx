'use client';

import React from 'react';
import { LoadingIcon, LoadingLabel, LoadingSkeleton, LoadingSpinner } from './components';

export interface LoadingStateProps {
  mode?: 'fullscreen' | 'skeleton' | 'spinner' | 'minimal';
  label?: string;
  skeletonRows?: number;
  className?: string;
}

export default function LoadingState({
  mode = 'minimal',
  label = 'Sincronizando...',
  skeletonRows = 3,
  className = ''
}: LoadingStateProps) {
  
  if (mode === 'skeleton') {
    return (
      <div className={`w-full p-6 bg-black/40 border border-white/5 rounded-xl ${className}`}>
        <LoadingSkeleton rows={skeletonRows} />
      </div>
    );
  }

  if (mode === 'spinner') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <LoadingSpinner />
        <span className="text-xs font-mono font-bold tracking-wide text-neutral-400">{label}</span>
      </div>
    );
  }

  if (mode === 'fullscreen') {
    return (
      <div className="fixed inset-0 bg-[#020202]/95 backdrop-blur-md z-99 flex flex-col items-center justify-center p-4">
        <LoadingIcon />
        <LoadingLabel>{label}</LoadingLabel>
        <span className="text-[10px] text-neutral-600 font-mono tracking-widest mt-1">EdenKingdom Network</span>
      </div>
    );
  }

  // Minimal de fábrica
  return (
    <div className={`flex flex-col items-center justify-center py-10 ${className}`}>
      <LoadingIcon />
      <LoadingLabel>{label}</LoadingLabel>
    </div>
  );
}