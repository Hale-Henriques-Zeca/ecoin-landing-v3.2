'use client';

import React from 'react';

interface InfoBadgeProps {
  children?: React.ReactNode;
}

export default function InfoBadge({ children }: InfoBadgeProps) {
  if (!children) return null;
  return (
    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black tracking-widest uppercase bg-[#00FF9C]/5 border border-[#00FF9C]/25 text-[#00FF9C] select-none">
      {children}
    </span>
  );
}