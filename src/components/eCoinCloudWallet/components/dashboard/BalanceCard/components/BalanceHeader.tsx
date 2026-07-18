'use client';

import React from 'react';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';

interface BalanceHeaderProps {
  lastUpdated?: string;
  isBalanceHidden: boolean;
  onToggleHide: () => void;
}

export default function BalanceHeader({
  lastUpdated = 'Agora',
  isBalanceHidden,
  onToggleHide,
}: BalanceHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
          Saldo Consolidado
        </span>
        <button
          onClick={onToggleHide}
          className="p-1 rounded-md bg-white/[0.02] hover:bg-white/5 border border-white/5 text-neutral-400 hover:text-white transition-all active:scale-95"
          title={isBalanceHidden ? "Mostrar Saldo" : "Ocultar Saldo"}
        >
          {isBalanceHidden ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      </div>

      <div className="flex items-center gap-1 text-[9px] font-mono font-semibold text-neutral-500 uppercase tracking-wider">
        <RefreshCw size={8} className="animate-spin-slow text-neutral-600" />
        <span>{lastUpdated}</span>
      </div>
    </div>
  );
}