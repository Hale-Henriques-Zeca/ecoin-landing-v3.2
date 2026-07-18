'use client';

import React from 'react';

interface EmptyActionProps {
  label: string;
  onClick: () => void;
}

export default function EmptyAction({ label, onClick }: EmptyActionProps) {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-4 py-2 rounded-lg border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10 text-xs font-mono font-bold text-[#D4AF37] transition-all duration-300 select-none active:scale-98"
    >
      {label}
    </button>
  );
}