'use client';

import React from 'react';
import MobileHeader from './components/Mobile/MobileHeader';
import MobileBar from './components/Mobile/MobileBar';
import DesktopHeader from './components/Desktop/DesktopHeader';
import DesktopSidebar from './components/Desktop/DesktopSidebar';

export default function EcnTradingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col md:flex-row">
      {/* Sidebar Desktop (exibida apenas em md e superiores) */}
      <DesktopSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Mobile (exibido apenas em telas menores) */}
        <div className="block md:hidden">
          <MobileHeader />
        </div>

        {/* Header Desktop (exibido apenas em md e superiores) */}
        <div className="hidden md:block">
          <DesktopHeader />
        </div>

        {/* Conteúdo dinâmico da página */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Barra de Navegação Inferior Mobile (exibida apenas em telas menores) */}
      <div className="block md:hidden">
        <MobileBar />
      </div>
    </div>
  );
}