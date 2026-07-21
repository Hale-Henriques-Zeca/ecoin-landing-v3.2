'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function NewAddressAlert() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-2.5">
        <ShieldAlert size={15} className="text-[#D4AF37]" />
        <div>
          <span className="text-xs font-bold text-white block">Aviso de Novo Endereço</span>
          <span className="text-[10px] text-neutral-500">Delay de 1 hora para carteiras não salvas</span>
        </div>
      </div>
      <span className="text-[10px] text-[#00FF9C] font-bold">Ativado</span>
    </div>
  );
}