'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  label: string;
  onClick: () => void;
}

export default function RetryButton({ label, onClick }: RetryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 text-xs font-mono font-bold text-red-400 transition-all duration-300 select-none active:scale-98"
    >
      <RefreshCw size={12} className="animate-spin-slow" />
      {label}
    </button>
  );
}