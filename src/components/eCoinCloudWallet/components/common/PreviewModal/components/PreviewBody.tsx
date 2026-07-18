'use client';

import React from 'react';

interface PreviewBodyProps {
  children: React.ReactNode;
  scale: number;
}

export default function PreviewBody({ children, scale }: PreviewBodyProps) {
  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center p-6 bg-[#020202] border border-white/5 rounded-2xl min-h-[300px] select-none">
      <div className="absolute inset-0 bg-radial-gradient from-white/[0.01] to-transparent pointer-events-none" />
      <div 
        className="transition-transform duration-300 ease-out flex items-center justify-center max-w-full max-h-[60vh]"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}