'use client';

import React from 'react';
import { Mail, Check } from 'lucide-react';

export default function EmailRecovery() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
          <Mail size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Resgate por E-mail</span>
          <span className="text-[10px] text-neutral-500">h.henriques@icloud.com</span>
        </div>
      </div>
      <Check size={14} className="text-[#00FF9C]" />
    </div>
  );
}