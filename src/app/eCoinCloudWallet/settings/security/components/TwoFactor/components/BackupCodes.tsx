'use client';

import React from 'react';
import { KeyRound } from 'lucide-react';

export default function BackupCodes() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
          <KeyRound size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Códigos de Emergência</span>
          <span className="text-[10px] text-neutral-500">8 de 10 códigos restantes</span>
        </div>
      </div>
      <button className="text-[10px] text-[#D4AF37] hover:underline font-bold">
        Ver / Gerar
      </button>
    </div>
  );
}