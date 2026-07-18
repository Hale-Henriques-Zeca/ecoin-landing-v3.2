'use client';

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DialogHeaderProps {
  title: string;
  severity?: 'warning' | 'danger' | 'info';
  onClose: () => void;
}

export default function DialogHeader({ title, severity = 'warning', onClose }: DialogHeaderProps) {
  const isDanger = severity === 'danger';
  const isWarning = severity === 'warning';

  return (
    <div className="flex items-center justify-between pb-3 border-b border-white/5">
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className={isDanger ? 'text-red-400' : isWarning ? 'text-[#D4AF37]' : 'text-blue-400'} />
        <h4 className="font-bold text-xs md:text-sm text-white uppercase tracking-wider font-mono">
          {title}
        </h4>
      </div>
      <button onClick={onClose} className="p-1 rounded hover:bg-white/5 text-neutral-500 hover:text-white transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}