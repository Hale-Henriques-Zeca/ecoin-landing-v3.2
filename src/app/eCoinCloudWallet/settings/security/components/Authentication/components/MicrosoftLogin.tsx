'use client';

import React from 'react';
import { Plus } from 'lucide-react';

export default function MicrosoftLogin() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex justify-between items-center font-mono">
      <div>
        <span className="text-xs font-bold text-white block">Microsoft SSO</span>
        <span className="text-[10px] text-neutral-500">Não Vinculado</span>
      </div>
      <button className="p-1.5 rounded-lg bg-white/5 text-neutral-400 hover:text-white">
        <Plus size={14} />
      </button>
    </div>
  );
}