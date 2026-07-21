'use client';

import React from 'react';
import { Smartphone, Check } from 'lucide-react';

export default function PhoneRecovery() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
          <Smartphone size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Resgate por Telefone</span>
          <span className="text-[10px] text-neutral-500">+258 84 *** *890</span>
        </div>
      </div>
      <Check size={14} className="text-[#00FF9C]" />
    </div>
  );
}