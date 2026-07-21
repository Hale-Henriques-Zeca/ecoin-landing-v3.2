'use client';

import React, { useState } from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

export default function LockWallet() {
  const [locked, setLocked] = useState(false);

  return (
    <button
      onClick={() => setLocked(!locked)}
      className={`h-9 px-5 font-mono font-bold text-[10px] uppercase rounded-xl transition-all flex items-center gap-2 ${
        locked
          ? 'bg-neutral-800 text-red-400 border border-red-500/30'
          : 'bg-red-500 text-white hover:bg-red-600'
      }`}
    >
      <Lock size={12} />
      {locked ? 'Carteira Bloqueada' : 'Ativar Emergency Lock'}
    </button>
  );
}