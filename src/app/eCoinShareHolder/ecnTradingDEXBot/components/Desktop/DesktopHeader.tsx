'use client';

import React from 'react';
import { Bell, ShieldCheck, Wallet, Search } from 'lucide-react';

interface DesktopHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function DesktopHeader({ 
  title = 'EcnTrading DEX Markets', 
  subtitle = 'ShareHolder Platform (Desktop)' 
}: DesktopHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4 pt-3 border-b border-gray-800/80 mb-6 bg-[#0B0E14] sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-yellow-500/10">
          <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-black text-white tracking-wide leading-tight">{title}</h1>
          <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Buscar pares ou robôs..." 
            className="w-full bg-[#12181F] border border-gray-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500/50"
          />
        </div>

        <button className="p-2.5 bg-[#12181F] border border-gray-800 rounded-xl text-gray-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 px-3 py-2 bg-[#12181F] border border-yellow-500/20 rounded-xl text-xs font-bold text-yellow-400">
          <Wallet className="w-4 h-4 text-yellow-400" />
          <span>0x7a...4E92</span>
        </div>
      </div>
    </header>
  );
}