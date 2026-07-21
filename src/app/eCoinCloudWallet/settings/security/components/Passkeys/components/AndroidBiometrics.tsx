'use client';

import React from 'react';
import { Smartphone, Plus } from 'lucide-react';

export default function AndroidBiometrics() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
          <Smartphone size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Biometrics</span>
          <span className="text-[9px] text-neutral-500">Não Registrado</span>
        </div>
      </div>
      <button className="p-1.5 rounded-lg bg-white/5 text-neutral-400 hover:text-white">
        <Plus size={14} />
      </button>
    </div>
  );
}