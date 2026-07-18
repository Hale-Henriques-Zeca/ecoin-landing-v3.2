'use client';

import React from 'react';
import { X } from 'lucide-react';

interface PreviewHeaderProps {
  title?: string;
  onClose: () => void;
}

export default function PreviewHeader({ title = 'Visualização', onClose }: PreviewHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.04] w-full">
      <span className="font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
        {title}
      </span>
      <button
        onClick={onClose}
        className="p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/10 border border-white/5 text-neutral-400 hover:text-white transition-all active:scale-95"
      >
        <X size={14} />
      </button>
    </div>
  );
}