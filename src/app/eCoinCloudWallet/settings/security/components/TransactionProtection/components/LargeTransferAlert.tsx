'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function LargeTransferAlert() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-2.5">
        <AlertCircle size={15} className="text-yellow-500" />
        <div>
          <span className="text-xs font-bold text-white block">Alerta de Transferências Altas</span>
          <span className="text-[10px] text-neutral-500">Exigir 2FA para envios acima de $1,000 USD</span>
        </div>
      </div>
      <span className="text-[10px] text-[#00FF9C] font-bold">Ativado</span>
    </div>
  );
}