'use client';

import React from 'react';
import { FooterLeft, FooterCenter, FooterRight, FooterStatus } from './components';

export interface WalletFooterProps {
  className?: string;
  network?: string;
  gasSponsored?: boolean;
  status?: 'online' | 'offline' | 'maintenance' | 'updating';
  version?: string;
}

export default function WalletFooter({
  className = '',
  network = 'BNB Smart Chain',
  gasSponsored = true,
  status = 'online',
  version = 'v1.2.0-Alpha'
}: WalletFooterProps) {
  return (
    <footer className={`hidden md:flex w-full min-h-[56px] border-t border-[#D4AF37]/15 bg-[#050505] px-6 lg:px-8 py-3 items-center justify-between select-none relative z-10 ${className}`}>
      
      {/* Lado Esquerdo - Info de Marca & Versão */}
      <div className="flex items-center gap-4">
        <FooterLeft />
        
        {/* Separador visual de luxo */}
        <span className="h-6 w-px bg-[#D4AF37]/10 hidden lg:inline-block" />
        
        {/* Versão (Apenas visível em desktops para evitar poluição visual) */}
        <span className="hidden lg:inline text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
          {version}
        </span>
      </div>

      {/* Centro - Estado da Rede Ativa e Gas Sponsor do Ecossistema */}
      <FooterCenter network={network} gasSponsored={gasSponsored} />

      {/* Lado Direito - Links Administrativos e Status Pulsante */}
      <div className="flex items-center gap-5">
        <FooterRight />
        <FooterStatus status={status} />
      </div>
    </footer>
  );
}