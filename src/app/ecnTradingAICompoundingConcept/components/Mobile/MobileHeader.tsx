'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, ShieldCheck, Bell, Wallet } from 'lucide-react';

export default function MobileHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-md">
      {/* BRAND & LOGO */}
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-amber-600 p-[1px] flex items-center justify-center shadow-lg shadow-amber-500/10">
          <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </div>
        <div>
          <span className="text-sm font-black text-white tracking-wide block leading-none">
            ecn<span className="text-[#D4AF37]">Trading</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400 inline" /> AI DEX Bot
          </span>
        </div>
      </Link>

      {/* STATUS DE REDE E CARTEIRA */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>BSC Mainnet</span>
        </div>

        <button 
          aria-label="Notificações"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#D4AF37] transition-colors"
        >
          <Bell className="w-4 h-4" />
        </button>

        <button className="p-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md">
          <Wallet className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}