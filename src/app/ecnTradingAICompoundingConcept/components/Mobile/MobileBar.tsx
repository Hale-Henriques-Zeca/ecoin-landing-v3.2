'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, TrendingUp, Layers, Flame, Wallet } from 'lucide-react';

export default function MobileBar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'AI Trading', icon: Bot, href: '/ecnTradingAICompoundingConcept' },
    { label: 'Compounding', icon: TrendingUp, href: '/ecnTradingAICompoundingConcept?tab=compound' },
    { label: 'Pools', icon: Layers, href: '/Market' },
    { label: 'BuyBack', icon: Flame, href: '/eCoinShareHolder/ecnTradingDEXBot/buyback' },
    { label: 'Carteira', icon: Wallet, href: '/eCoinCloudWallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-xl px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (idx === 0 && pathname.includes('ecnTrading'));

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-[#D4AF37] bg-white/[0.04]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400'}`} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#D4AF37] mt-0.5 shadow-sm shadow-amber-400" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}