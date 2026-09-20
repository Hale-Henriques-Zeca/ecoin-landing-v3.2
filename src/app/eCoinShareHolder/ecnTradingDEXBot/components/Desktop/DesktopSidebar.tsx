'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Zap, DollarSign, Home, Wallet, ChevronRight, Repeat } from 'lucide-react';

export default function DesktopSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Início', href: '/eCoinShareHolder/ecnTradingDEXBot', icon: Home },
    { label: 'Bot Markets', href: '/eCoinShareHolder/ecnTradingDEXBot/bot', icon: Bot },
    { label: 'Running Bot', href: '/eCoinShareHolder/ecnTradingDEXBot/runningBot', icon: Zap },
    { label: 'Profit', href: '/eCoinShareHolder/ecnTradingDEXBot/profit', icon: DollarSign },
    { label: 'Buy-Back', href: '/eCoinShareHolder/ecnTradingDEXBot/buyback', icon: Repeat },
    { label: 'Assets', href: '/eCoinShareHolder/ecnTradingDEXBot/assets', icon: Wallet },
  ];

  return (
    <aside className="w-64 bg-[#12181F] border-r border-gray-800 min-h-screen p-4 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">
            eCoin ShareHolder
          </span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/eCoinShareHolder/ecnTradingDEXBot' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                    : 'text-gray-400 hover:bg-[#0B0E14] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 bg-[#0B0E14] rounded-xl border border-gray-800 text-center">
        <span className="text-[10px] text-gray-500 block">Status da Rede</span>
        <span className="text-xs font-bold text-[#00FF9C] flex items-center justify-center gap-1 mt-0.5">
          <span className="w-2 h-2 rounded-full bg-[#00FF9C]" />
          BNB Smart Chain (Mainnet)
        </span>
      </div>
    </aside>
  );
}