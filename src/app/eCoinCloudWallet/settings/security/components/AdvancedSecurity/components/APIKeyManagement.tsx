'use client';

import React, { useState } from 'react';
import { Key, Eye, EyeOff, Plus, Copy } from 'lucide-react';

export default function APIKeyManagement() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
            <Key size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Chaves de API Programáticas</h3>
            <p className="text-xs text-neutral-400">Acesso seguro para Bots de Arbitragem e Scripts</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-white/10 transition-colors">
          <Plus size={14} /> Criar Chave
        </button>
      </div>

      <div className="bg-black/40 border border-white/5 p-3 rounded-xl space-y-2 font-mono text-xs">
        <div className="flex justify-between items-center text-neutral-400">
          <span>Bot Trading Multi-Asset</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Somente Leitura + Ações</span>
        </div>
        <div className="flex items-center justify-between bg-neutral-950 p-2 rounded-lg border border-white/5">
          <span className="text-neutral-300 tracking-widest">
            {showKey ? 'ecoin_live_9f82a1c0d481e4b9' : 'ecoin_live_••••••••••••••••'}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowKey(!showKey)} className="text-neutral-500 hover:text-white">
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}