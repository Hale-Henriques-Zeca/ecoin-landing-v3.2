'use client';

import React from 'react';

export default function SpendingLimit() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div>
        <span className="text-xs font-bold text-white block">Limite de Gasto por Operação</span>
        <span className="text-[10px] text-neutral-500">Aprovação direta por Passkey</span>
      </div>
      <span className="text-xs font-bold text-[#D4AF37]">$2,500.00</span>
    </div>
  );
}