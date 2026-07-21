'use client';

import React, { useState } from 'react';
import { Network, Plus, Trash2, ShieldAlert } from 'lucide-react';

export default function IPWhitelisting() {
  const [ips, setIps] = useState(['192.168.1.105 (Este Dispositivo)', '102.218.45.12 (Servidor)']);

  const removeIp = (index: number) => {
    setIps(ips.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
            <Network size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Whitelist de IP & Geo-Fencing</h3>
            <p className="text-xs text-neutral-400">Restringir acesso apenas a redes IP autorizadas</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 bg-[#00FF9C] text-black font-bold text-xs px-3 py-1.5 rounded-xl hover:bg-[#00e089] transition-colors">
          <Plus size={14} /> Adicionar IP
        </button>
      </div>

      <div className="space-y-2">
        {ips.map((ip, idx) => (
          <div key={idx} className="flex items-center justify-between bg-black/40 border border-white/5 p-3 rounded-xl text-xs font-mono">
            <span className="text-neutral-300">{ip}</span>
            <button onClick={() => removeIp(idx)} className="text-neutral-500 hover:text-red-400 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}