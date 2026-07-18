'use client';

import React from 'react';
import { DividerLine, DividerLabel, DividerGlow } from './components';

export interface DividerProps {
  label?: React.ReactNode;
  vertical?: boolean;
  gradient?: boolean;
  glow?: boolean;
  className?: string;
}

export default function Divider({
  label,
  vertical = false,
  gradient = false,
  glow = false,
  className = ''
}: DividerProps) {
  if (vertical) {
    return (
      <div className={`relative flex h-full min-h-[16px] w-px items-center justify-center ${className}`}>
        <div className={`h-full w-px ${gradient ? 'bg-gradient-to-b from-transparent via-[#D4AF37]/35 to-transparent' : 'bg-white/10'}`} />
        {glow && (
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#00FF9C]/30 to-transparent blur-[1.5px]" />
        )}
      </div>
    );
  }

  return (
    <div className={`relative w-full flex items-center ${className}`}>
      {glow && <DividerGlow />}
      <DividerLine gradient={gradient} />
      {label && (
        <>
          <DividerLabel>{label}</DividerLabel>
          <DividerLine gradient={gradient} />
        </>
      )}
    </div>
  );
}