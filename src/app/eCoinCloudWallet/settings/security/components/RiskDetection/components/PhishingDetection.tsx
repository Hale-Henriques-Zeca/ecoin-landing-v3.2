'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PhishingDetection() {
  return (
    <div className="p-3 bg-neutral-900/40 border border-white/5 rounded-xl font-mono">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-white">Phishing Anti-Drainer</span>
        <ShieldCheck size={14} className="text-[#00FF9C]" />
      </div>
      <p className="text-[10px] text-neutral-500">Varredura contínua de smart contracts ativada.</p>
    </div>
  );
}