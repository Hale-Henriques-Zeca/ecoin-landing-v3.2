'use client';

import React from 'react';

interface FilterBadgeProps {
  count?: number;
}

export default function FilterBadge({ count = 0 }: FilterBadgeProps) {
  if (count <= 0) return null;
  return (
    <span className="min-w-[14px] h-[14px] px-0.5 rounded bg-[#D4AF37] text-black font-mono font-black text-[9px] flex items-center justify-center select-none shadow-[0_0_8px_rgba(212,175,55,0.35)]">
      {count}
    </span>
  );
}