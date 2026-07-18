'use client';

import React from 'react';
import SidebarHeader from './components/SidebarHeader';
import SidebarProfile from './components/SidebarProfile';
import SidebarNavigation from './components/SidebarNavigation';
import SidebarFooter from './components/SidebarFooter';
import DrawerCloseButton from './components/DrawerCloseButton';

interface WalletSidebarProps {
  onClose?: () => void;
  isDrawer?: boolean;
}

export default function WalletSidebar({ onClose, isDrawer = false }: WalletSidebarProps) {
  return (
    <aside className={`flex flex-col h-full bg-[#080808] border-[#D4AF37]/15 flex-shrink-0 select-none ${
      isDrawer 
        ? 'w-72 border-r animate-slide-in-left shadow-[0_0_80px_rgba(0,255,156,0.08)]' 
        : 'w-64 border-r hidden lg:flex'
    }`}>
      {/* Topo da Sidebar: Header e seletor de close */}
      <div className="relative">
        <SidebarHeader />
        {isDrawer && onClose && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <DrawerCloseButton onClose={onClose} />
          </div>
        )}
      </div>

      {/* Identidade / Perfil de Carteira ativa */}
      <SidebarProfile />

      {/* Navegação Automatizada e Reativa */}
      <SidebarNavigation onItemClick={isDrawer ? onClose : undefined} />

      {/* Rodapé Geral da Sidebar */}
      <SidebarFooter />
    </aside>
  );
}