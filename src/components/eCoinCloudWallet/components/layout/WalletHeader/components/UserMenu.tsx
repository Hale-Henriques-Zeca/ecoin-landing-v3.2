'use client';

import React, { useState } from 'react';
import { User, Copy, Check, LogOut } from 'lucide-react';

interface UserMenuProps {
  address?: string;
  username?: string;
  status?: 'connected' | 'disconnected' | 'connecting';
}

export default function UserMenu({ 
  address = '0x71C541243118a8A90146059FF12D4AF37493923', 
  username = 'Eden Dev',
  status = 'connected'
}: UserMenuProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      {/* Botão de Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 pr-3 rounded-lg border border-[#D4AF37]/15 bg-black/50 hover:bg-[#D4AF37]/05 hover:border-[#D4AF37]/35 transition-all duration-200"
      >
        {/* Avatar */}
        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#D4AF37]/30 to-[#00FF9C]/30 border border-[#D4AF37]/30 flex items-center justify-center font-mono font-bold text-[9px] text-[#D4AF37]">
          {username.slice(0, 2).toUpperCase()}
        </div>
        {/* Endereço legível */}
        <span className="hidden md:inline font-mono text-[11px] font-bold text-neutral-300">
          {truncatedAddress}
        </span>
      </button>

      {/* Dropdown Flutuante Premium */}
      {isOpen && (
        <>
          {/* Backdrop Invisível para fechar ao clicar fora */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#080808] border border-[#D4AF37]/20 p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 animate-fade-in select-none">
            {/* Header do Menu */}
            <div className="px-2.5 py-1.5 border-b border-white/5 mb-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">Conta Ativa</span>
              <span className="text-xs font-bold text-neutral-200 block mt-0.5">{username}</span>
            </div>

            {/* Ações */}
            <div className="space-y-1">
              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.03] text-neutral-300 hover:text-[#D4AF37] text-left text-xs transition-colors"
              >
                <span className="font-medium">Copiar Endereço</span>
                {copied ? <Check size={14} className="text-[#00FF9C]" /> : <Copy size={14} />}
              </button>

              <button
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 text-left text-xs transition-colors"
              >
                <span className="font-medium">Desconectar Carteira</span>
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}