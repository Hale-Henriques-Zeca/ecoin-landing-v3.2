'use client';

import React, { useState } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';

export default function SidebarProfile() {
  const [copied, setCopied] = useState(false);
  
  // Mock de dados para renderização estática limpa
  const walletName = "Main Vault";
  const rawAddress = "0x71C541243118a8A90146059FF12D4AF37493923";
  const displayAddress = `${rawAddress.slice(0, 6)}...${rawAddress.slice(-4)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar endereço', err);
    }
  };

  return (
    <div className="px-6 py-5 border-b border-[#D4AF37]/10 bg-[#060606] flex flex-col gap-3 select-none">
      <div className="flex items-center gap-3">
        {/* Avatar premium em vidro dourado */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37]/20 to-[#00FF9C]/20 border border-[#D4AF37]/30 flex items-center justify-center font-mono font-bold text-xs text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]">
          eV
        </div>
        
        <div className="flex flex-col flex-1">
          <span className="text-xs font-bold text-neutral-200 tracking-wide">{walletName}</span>
          <span className="text-[10px] text-[#00FF9C] font-mono font-bold tracking-wider uppercase">Ativa</span>
        </div>
      </div>

      {/* Seletor de endereço e ações rápidas */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-[#0d0d0d] border border-white/[0.04]">
        <span className="text-xs font-mono text-neutral-400 font-medium pl-1">
          {displayAddress}
        </span>
        
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-white/[0.03] text-neutral-500 hover:text-[#D4AF37] transition-all"
            title="Copiar Endereço"
          >
            {copied ? <Check size={14} className="text-[#00FF9C]" /> : <Copy size={14} />}
          </button>
          
          <button
            className="p-1.5 rounded-md hover:bg-white/[0.03] text-neutral-500 hover:text-[#D4AF37] transition-all"
            title="Mostrar QR Code"
          >
            <QrCode size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}