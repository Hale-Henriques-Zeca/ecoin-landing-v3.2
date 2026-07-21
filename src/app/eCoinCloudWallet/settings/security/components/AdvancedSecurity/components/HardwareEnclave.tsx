'use client';

import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

export default function HardwareEnclave() {
  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase">Hardware Security Enclave (HSM)</h3>
            <p className="text-xs text-neutral-400">Isolamento criptográfico em nível de silício (AWS Nitro / YubiKey)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
        <div className="bg-black/40 p-3 rounded-xl border border-white/5">
          <span className="text-[10px] text-neutral-500 block uppercase">Nível de Enclave</span>
          <span className="text-white font-bold">Secure Element v3</span>
        </div>
        <div className="bg-black/40 p-3 rounded-xl border border-white/5">
          <span className="text-[10px] text-neutral-500 block uppercase">Hardware Token</span>
          <span className="text-[#00FF9C] font-bold">Ativo & Vinculado</span>
        </div>
      </div>
    </div>
  );
}