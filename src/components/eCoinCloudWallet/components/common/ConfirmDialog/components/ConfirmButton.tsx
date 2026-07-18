'use client';

import React from 'react';

interface ConfirmButtonProps {
  label: string;
  severity?: 'warning' | 'danger' | 'info';
  onClick: () => void;
}

export default function ConfirmButton({ label, severity = 'warning', onClick }: ConfirmButtonProps) {
  const style = severity === 'danger'
    ? 'bg-red-500/10 border-red-500/25 text-red-400 hover:bg-red-500/20'
    : severity === 'warning'
    ? 'bg-[#D4AF37]/5 border-[#D4AF37]/25 text-[#D4AF37] hover:bg-[#D4AF37]/10'
    : 'bg-[#00FF9C]/5 border-[#00FF9C]/25 text-[#00FF9C] hover:bg-[#00FF9C]/10';

  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold tracking-wider uppercase transition-all select-none active:scale-98 ${style}`}
    >
      {label}
    </button>
  );
}