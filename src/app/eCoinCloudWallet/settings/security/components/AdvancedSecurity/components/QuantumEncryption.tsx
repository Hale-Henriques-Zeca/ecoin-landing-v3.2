'use client';

import React, { useState } from 'react';
import { Atom } from 'lucide-react';

export default function QuantumEncryption() {
  const [active, setActive] = useState(true);

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
            <Atom size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Criptografia Pós-Quântica</h3>
            <p className="text-xs text-neutral-400">Algoritmo CRYSTALS-Dilithium para resistência a supercomputadores</p>
          </div>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            active ? 'bg-[#00FF9C]/20 text-[#00FF9C] border border-[#00FF9C]/40' : 'bg-neutral-800 text-neutral-500'
          }`}
        >
          {active ? 'ATIVO (Dilithium)' : 'DESATIVADO'}
        </button>
      </div>
    </div>
  );
}