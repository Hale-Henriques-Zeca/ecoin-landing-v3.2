'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Wallet, Store, Bot, Settings, ArrowRightLeft, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';

interface QuickActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const HOME_QUICK_ACTIONS = [
  {
    title: "Acesso Rápido às Aplicações",
    items: [
      {
        title: "eCoin Cloud Wallet",
        desc: "Acessar sua carteira Web3 corporativa",
        href: "/eCoinCloudWallet",
        icon: Wallet,
      },
      {
        title: "Marketplace & Conversor",
        desc: "Trocas e mercado de liquidez eCoin",
        href: "/Market",
        icon: Store,
      },
      {
        title: "Trading Bot & ShareHolder",
        desc: "Painel de automação e robôs de staking",
        href: "/eCoinShareHolder/ecnTradingDEXBot",
        icon: Bot,
      },
      {
        title: "Configurações de Perfil",
        desc: "Ajuste e perfil do eCoin ShareHolder",
        href: "/eCoinShareHolder/ProfileTab",
        icon: Settings,
      },
    ]
  },
  {
    title: "Recursos do Ecossistema",
    items: [
      {
        title: "Cash Out Gateway",
        desc: "Converter eCoin para dinheiro físico",
        href: "#cashout-gateway",
        icon: ArrowRightLeft,
      },
      {
        title: "Neural AI Arbitrage",
        desc: "Painel de arbitragem cruzada de IA",
        href: "#neural-arbitrage",
        icon: Sparkles,
      },
      {
        title: "Segurança & Contratos",
        desc: "Auditoria e transparência On-Chain",
        href: "#seguranca-ecoin",
        icon: ShieldCheck,
      },
    ]
  }
];

export default function QuickActionsSheet({ isOpen, onClose }: QuickActionsSheetProps) {
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
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative bg-[#0d0d0d]/95 border-t border-[#D4AF37]/30 rounded-t-3xl max-h-[85vh] overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+24px)] pt-5 px-5 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-slide-up">
        <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-5 cursor-pointer" onClick={onClose} />
        
        <div className="space-y-6">
          {HOME_QUICK_ACTIONS.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase px-1">
                {section.title}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {section.items.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all active:scale-[0.98]"
                    >
                      <div className="p-2.5 rounded-xl bg-black border border-[#D4AF37]/20 text-[#D4AF37]">
                        <Icon size={18} />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm font-semibold text-neutral-100">{item.title}</span>
                        <span className="text-xs text-neutral-400">{item.desc}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 rounded-2xl border border-white/10 bg-neutral-900/80 hover:bg-neutral-800 text-sm font-bold text-neutral-300 hover:text-white transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}