'use client';

import React from 'react';
import { FilterIcon, FilterLabel, FilterBadge } from './components';

export interface FilterButtonProps {
  label?: string;
  active?: boolean;
  activeCount?: number;
  onClick: () => void;
  className?: string;
}

export default function FilterButton({
  label = 'Filtrar',
  active = false,
  activeCount = 0,
  onClick,
  className = ''
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 h-10 px-3.5 rounded-xl border select-none
        transition-all duration-200 active:scale-98
        ${active 
          ? 'bg-[#D4AF37]/5 border-[#D4AF37]/35 text-[#D4AF37]' 
          : 'bg-[#090909]/65 border-white/5 text-neutral-400 hover:text-white hover:border-white/15'
        }
        ${className}
      `}
    >
      <FilterIcon />
      <FilterLabel>{label}</FilterLabel>
      <FilterBadge count={activeCount} />
    </button>
  );
}