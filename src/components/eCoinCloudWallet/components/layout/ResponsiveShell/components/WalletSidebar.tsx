'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, LayoutDashboard, Wallet, Clock, Settings, Layers, Coins, ChevronRight } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';

interface WalletSidebarProps {
  onClose?: () => void;
  isDrawer?: boolean;
}

export default function WalletSidebar({ onClose, isDrawer = false }: WalletSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { title: "Dashboard", href: WALLET_ROUTES.dashboard, icon: LayoutDashboard },
    { title: "Assets", href: WALLET_ROUTES.assets, icon: Wallet },
    { title: "Histórico", href: WALLET_ROUTES.history, icon: Clock },
    { title: "Ecossistema", href: WALLET_ROUTES.ecosystem, icon: Layers },
    { title: "NFTs Gallery", href: WALLET_ROUTES.nfts, icon: Coins },
    { title: "Definições", href: WALLET_ROUTES.settings, icon: Settings },
  ];

  return (
    <aside className={`flex flex-col h-full bg-[#080808] border-[#D4AF37]/15 flex-shrink-0 select-none ${
      isDrawer ? 'w-72 border-r animate-slide-in-left shadow-[0_0_80px_rgba(0,255,156,0.08)]' : 'w-64 border-r hidden lg:flex'
    }`}>
      {/* Topo da Sidebar (Apenas visível se for Drawer para fechar facilmente) */}
      <div className="h-16 px-6 border-b border-[#D4AF37]/10 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">Navegação</span>
        {isDrawer && onClose && (
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/5 bg-[#0A0A0A] text-neutral-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Menu Principal */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.href === WALLET_ROUTES.dashboard 
            ? pathname === item.href 
            : pathname.startsWith(item.href);

          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 group ${
                isActive
                  ? 'bg-[#D4AF37]/05 border-[#D4AF37]/20 text-[#D4AF37]'
                  : 'bg-transparent border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  size={18} 
                  className={`transition-colors ${
                    isActive ? 'text-[#D4AF37]' : 'text-neutral-500 group-hover:text-neutral-300'
                  }`} 
                />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
              
              <ChevronRight 
                size={14} 
                className={`transition-transform duration-200 ${
                  isActive ? 'text-[#D4AF37] translate-x-0' : 'text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                }`} 
              />
            </Link>
          );
        })}
      </nav>

      {/* Identidade no rodapé da Sidebar */}
      <div className="p-4 border-t border-[#D4AF37]/10 bg-[#050505]/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.01] border border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Status Node</span>
            <span className="text-[9px] font-mono text-[#00FF9C] -mt-0.5 font-bold">100% Sincronizado</span>
          </div>
        </div>
      </div>
    </aside>
  );
}