'use client';

import React from 'react';
import { ShieldCheck, User } from 'lucide-react';

interface GuardianCardProps {
  name: string;
  role: string;
  status: string;
}

export default function GuardianCard({ name, role, status }: GuardianCardProps) {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex justify-between items-center font-mono">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold text-xs">
          <User size={14} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">{name}</span>
          <span className="text-[9px] text-neutral-500">{role}</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-[#00FF9C] bg-[#00FF9C]/10 px-2 py-0.5 rounded border border-[#00FF9C]/20 text-[9px] font-bold">
        <ShieldCheck size={11} /> {status}
      </div>
    </div>
  );
}