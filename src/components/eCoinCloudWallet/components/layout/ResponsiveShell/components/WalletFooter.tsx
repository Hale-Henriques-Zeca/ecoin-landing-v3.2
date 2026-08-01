'use client';

import React from 'react';

export default function WalletFooter() {
  return (
    <footer className="hidden lg:block w-full py-5 px-6 border-t border-[#D4AF37]/10 bg-[#050505] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] text-neutral-500">
        <span className="font-mono">Since © 2025 – {new Date().getFullYear()} EdenKingDom Group - eCoin Cloud Wallet (ECCW). Todos os direitos reservados.</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-neutral-300 cursor-pointer transition-colors">Termos de Uso</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="hover:text-neutral-300 cursor-pointer transition-colors">Privacidade</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700" />
          <span className="text-[#00FF9C] font-mono font-bold">v1.2.0-Alpha</span>
        </div>
      </div>
    </footer>
  );
}