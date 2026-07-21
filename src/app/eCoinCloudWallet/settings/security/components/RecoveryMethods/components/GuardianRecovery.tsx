'use client';

import React from 'react';
import { Users, Check } from 'lucide-react';

export default function GuardianRecovery() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#00FF9C]/10 text-[#00FF9C] rounded-lg">
          <Users size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Guardiões Social Multisig</span>
          <span className="text-[10px] text-neutral-500">2 de 3 Guardiões Ativos</span>
        </div>
      </div>
      <Check size={14} className="text-[#00FF9C]" />
    </div>
  );
}