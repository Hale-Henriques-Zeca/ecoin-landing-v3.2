'use client';

import { Bell, ShieldCheck, Wallet } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function MobileHeader({ title = 'E-Coin Trading', subtitle = 'ShareHolder Platform' }: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4 pt-2 border-b border-gray-800/80 mb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-yellow-500/10">
          <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
        <div>
          <h1 className="text-sm font-extrabold text-white tracking-wide leading-tight">{title}</h1>
          <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 bg-[#12181F] border border-gray-800 rounded-xl text-gray-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#12181F] border border-yellow-500/20 rounded-xl text-xs font-bold text-yellow-400">
          <Wallet className="w-3.5 h-3.5 text-yellow-400" />
          <span>0x7a...4E92</span>
        </div>
      </div>
    </header>
  );
}