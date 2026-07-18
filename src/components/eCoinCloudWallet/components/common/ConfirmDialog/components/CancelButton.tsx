'use client';

import React from 'react';

interface CancelButtonProps {
  label: string;
  onClick: () => void;
}

export default function CancelButton({ label, onClick }: CancelButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-1.5 rounded-lg border border-white/5 bg-transparent hover:bg-white/5 text-xs font-mono font-semibold tracking-wider text-neutral-400 hover:text-neutral-200 uppercase transition-all select-none active:scale-98"
    >
      {label}
    </button>
  );
}