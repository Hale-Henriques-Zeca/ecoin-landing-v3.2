'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ClearButtonProps {
  onClick: () => void;
}

export default function ClearButton({ onClick }: ClearButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-1 rounded-md hover:bg-white/5 text-neutral-500 hover:text-white transition-colors"
      aria-label="Limpar pesquisa"
    >
      <X size={13} />
    </button>
  );
}