'use client';

import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export default function AdvancedStatus() {
  return (
    <div className="bg-gradient-to-r from-neutral-900 via-black to-neutral-900 border border-[#00FF9C]/30 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#00FF9C]/10 text-[#00FF9C] rounded-2xl border border-[#00FF9C]/20">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-base font-black text-white uppercase tracking-wider">Infraestrutura Blindada</h2>
            <p className="text-xs text-neutral-400">
              Sua eCoin Cloud Wallet está utilizando padrões de segurança de grau institucional e militar.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-neutral-950 px-3 py-1.5 rounded-xl border border-white/10 text-[#00FF9C]">
          <Activity size={14} className="animate-pulse" />
          <span>Nodes Protegidos</span>
        </div>
      </div>
    </div>
  );
}