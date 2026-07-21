'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function RecoveryCodes() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
          <ShieldAlert size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Chave Mestre de Resgate</span>
          <span className="text-[10px] text-neutral-500">Impresso e seguro offline</span>
        </div>
      </div>
      <span className="text-[10px] text-neutral-400 font-bold">Configurado</span>
    </div>
  );
}