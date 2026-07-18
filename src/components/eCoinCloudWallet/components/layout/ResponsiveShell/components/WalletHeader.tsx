'use client';

import React from 'react';
import { Menu, ShieldCheck, Cpu } from 'lucide-react';

interface WalletHeaderProps {
  onMenuClick: () => void;
}

export default function WalletHeader({ onMenuClick }: WalletHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#050505]/80 backdrop-blur-md border-b border-[#D4AF37]/15 px-4 flex items-center justify-between select-none">
      {/* Lado Esquerdo: Menu Mobile/Tablet & Identidade */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg border border-[#D4AF37]/10 bg-[#0A0A0A] text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all active:scale-95"
          aria-label="Abrir Menu"
        >
          <Menu size={20} />
        </button>
        
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#00FF9C]/50">
            <Cpu size={18} className="text-black stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">eCoin</span>
            <span className="text-[10px] text-[#00FF9C] font-mono tracking-wider -mt-1 font-bold">CLOUD WALLET</span>
          </div>
        </div>
      </div>

      {/* Lado Direito: Status da Rede & Elementos Premium */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00FF9C]/20 bg-[#00FF9C]/5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-[#00FF9C] uppercase tracking-wider">Eden Mainnet</span>
        </div>
        
        <div className="p-2 rounded-lg border border-white/5 bg-[#0A0A0A] text-neutral-400">
          <ShieldCheck size={18} className="text-[#00FF9C]" />
        </div>
      </div>
    </header>
  );
}