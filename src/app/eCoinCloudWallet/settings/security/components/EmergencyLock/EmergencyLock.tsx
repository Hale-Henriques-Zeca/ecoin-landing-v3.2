'use client';

import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { LockWallet, EmergencyStatus } from './components';

export default function EmergencyLock() {
  return (
    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 font-mono flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3.5">
        <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
          <ShieldAlert size={20} />
        </div>
        <div>
          <h4 className="text-xs font-black text-white uppercase tracking-wider">Trava Global de Emergência</h4>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Congela saídas e conexões com dApps instantaneamente.
          </p>
          <EmergencyStatus />
        </div>
      </div>
      <LockWallet />
    </div>
  );
}