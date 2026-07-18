'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { QUICK_ACTIONS_SECTIONS } from '@/components/eCoinCloudWallet/config/wallet/quickActions';

interface QuickActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickActionsSheet({ isOpen, onClose }: QuickActionsSheetProps) {
  // Tranca o scroll do fundo se o Hub estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end select-none animate-fade-in">
      {/* Backdrop com blur de estúdio */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Painel do Hub (Slide do Fundo) */}
      <div className="relative bg-[#0d0d0d]/95 border-t border-[#D4AF37]/25 rounded-t-2xl max-h-[85vh] overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+24px)] pt-5 px-5 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-slide-up">
        {/* Indicador visual de arrastar/fechar de folha mobile */}
        <div className="w-12 h-1 bg-neutral-800 rounded-full mx-auto mb-5 cursor-pointer" onClick={onClose} />
        
        <div className="space-y-6">
          {QUICK_ACTIONS_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase px-1">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-xl border border-white/[0.02] bg-white/[0.01] hover:bg-[#D4AF37]/05 hover:border-[#D4AF37]/10 transition-all active:scale-[0.99]"
                    >
                      <div className="p-2.5 rounded-lg bg-black border border-[#D4AF37]/15 text-[#D4AF37]">
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold text-neutral-200">{item.title}</span>
                        <span className="text-xs text-neutral-500">{item.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Botão Cancelar Embutido de fácil alcance para o polegar */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-xl border border-white/5 bg-neutral-900/50 hover:bg-neutral-900 text-sm font-bold text-neutral-400 hover:text-white transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}