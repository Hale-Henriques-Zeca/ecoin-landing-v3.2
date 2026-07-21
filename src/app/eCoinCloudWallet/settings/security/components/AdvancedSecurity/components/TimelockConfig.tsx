'use client';

import React, { useState } from 'react';
import { Clock, ShieldAlert } from 'lucide-react';

export default function TimelockConfig() {
  const [delay, setDelay] = useState('24h');

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
            <Clock size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Timelock On-Chain de Segurança</h3>
            <p className="text-xs text-neutral-400">Atraso forçado por contrato inteligente para grandes transações</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 font-mono">
        {['Desativado', '6 Horas', '12 Horas', '24h'].map((time) => (
          <button
            key={time}
            onClick={() => setDelay(time)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
              delay === time
                ? 'bg-[#00FF9C] text-black border-[#00FF9C]'
                : 'bg-black/40 text-neutral-400 border-white/5 hover:border-white/20'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}