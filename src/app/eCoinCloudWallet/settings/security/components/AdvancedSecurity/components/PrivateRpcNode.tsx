'use client';

import React, { useState } from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function PrivateRpcNode() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Relay Privado & Escudo MEV</h3>
            <p className="text-xs text-neutral-400">Proteção contra Front-Running e Sandwich Attacks</p>
          </div>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            enabled ? 'bg-[#00FF9C]/20 text-[#00FF9C] border border-[#00FF9C]/40' : 'bg-neutral-800 text-neutral-500'
          }`}
        >
          {enabled ? 'ATIVADO' : 'DESATIVADO'}
        </button>
      </div>

      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-xs space-y-2 font-mono">
        <div className="flex justify-between text-neutral-400">
          <span>Rota Atual:</span>
          <span className="text-[#00FF9C] font-semibold">eCoin Flashbots Private Relay</span>
        </div>
        <div className="flex justify-between text-neutral-400">
          <span>Visibilidade Mempool:</span>
          <span className="text-white">Oculta (Zero Leak)</span>
        </div>
      </div>
    </div>
  );
}