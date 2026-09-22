'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  TrendingUp, 
  Layers, 
  Flame, 
  FileText, 
  Zap, 
  ShieldAlert, 
  ExternalLink,
  Users,
  Building2
} from 'lucide-react';

export default function DesktopSidebar() {
  const pathname = usePathname();

  const menuSections = [
    {
      title: 'INTELIGÊNCIA ARTIFICIAL',
      items: [
        { name: 'ecnTrading AI Bot', icon: Bot, href: '/ecnTradingAICompoundingConcept' },
        { name: 'Efeito Compounding', icon: TrendingUp, href: '/ecnTradingAICompoundingConcept?tab=compound' },
      ],
    },
    {
      title: 'ECOSSISTEMA & POOLS',
      items: [
        { name: 'Profit Pools (PPP)', icon: Layers, href: '/Market' },
        { name: 'Tesouraria & BuyBack', icon: Flame, href: '/eCoinShareHolder/ecnTradingDEXBot/buyback' },
        { name: 'Rede de Afiliados (3 Níveis)', icon: Users, href: 'https://ecoin.edenkingdom.org/equipes' },
      ],
    },
    {
      title: 'PLATAFORMAS CONECTADAS',
      items: [
        { name: 'eDollar Protocol ($eUSD)', icon: Building2, href: 'https://edollar.edenkingdom.org', external: true },
        { name: 'Whitepaper Oficial', icon: FileText, href: 'https://ecoin.edenkingdom.org/whitepaper', external: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between p-4 space-y-8 bg-slate-950 text-slate-300">
      <div className="space-y-6">
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 px-2 pt-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-600 p-[1px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <h1 className="text-base font-black text-white tracking-wider leading-tight">
              eCoin <span className="text-[#D4AF37]">DEX</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">Neural Trading Suite</p>
          </div>
        </Link>

        {/* NAVEGAÇÃO DE MENU */}
        <div className="space-y-6 pt-4">
          {menuSections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  if (item.external) {
                    return (
                      <a
                        key={itemIdx}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
                          <span>{item.name}</span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-2 border-[#D4AF37] text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD DE INFORMAÇÃO DO CAPITAL POOL NO RODAPÉ DA SIDEBAR */}
      <div className="bg-gradient-to-b from-slate-900 to-black border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">Profit Capacity</span>
          <span className="text-emerald-400 font-bold font-mono">+30% Net</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-[#D4AF37] to-emerald-400 h-full w-[80%]" />
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>Capital Pool de Trading ativo e gerido via Smart Contracts.</span>
        </div>
      </div>
    </div>
  );
}