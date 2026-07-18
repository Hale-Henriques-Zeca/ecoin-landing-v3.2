'use client';

import React, { useState, useEffect } from 'react';
import WalletHeader from './components/WalletHeader';
import WalletSidebar from './components/WalletSidebar';
import WalletFooter from './components/WalletFooter';
import WalletViewport from './components/WalletViewport';
import WalletBottomBar from '../WalletBottomBar';

interface ResponsiveShellProps {
  children: React.ReactNode;
}

export default function ResponsiveShell({ children }: ResponsiveShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  // Listener nativo ultra rápido para deteção precisa de dispositivo
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });

      // Se o utilizador esticar para desktop, fechamos automaticamente o Drawer lateral
      if (width >= 1024) {
        setIsDrawerOpen(false);
      }
    };

    handleResize(); // Execução inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col bg-[#050505] text-neutral-100 overflow-hidden font-sans">
      
      {/* Ambient background glow fxs (Identidade Visual Premium eCoin) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] rounded-full bg-[#00FF9C]/[0.03] blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[55%] rounded-full bg-[#D4AF37]/[0.03] blur-[140px]" />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-[#00FF9C]/[0.01] blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        {/* 1. Header (Universal) */}
        <WalletHeader onMenuClick={() => setIsDrawerOpen(true)} />

        {/* 2. Área Central (Sidebar + Viewport de Conteúdo) */}
        <div className="flex-1 flex w-full min-h-0 overflow-hidden">
          
          {/* Sidebar Fixa (Desktop apenas) */}
          <WalletSidebar />

          {/* Viewport Isolado de Scroll e Alinhamento */}
          <WalletViewport>
            {children}
          </WalletViewport>
          
        </div>

        {/* 3. Footer (Desktop) */}
        <WalletFooter />

        {/* 4. Barra de Navegação de Polegar (Mobile / Tablet apenas) */}
        <div className="lg:hidden">
          <WalletBottomBar />
        </div>
      </div>

      {/* Drawer Retrátil / Overlay de Menu (Tablet / Mobile) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden select-none animate-fade-in">
          {/* Backdrop Escuro com Blur de Estúdio */}
          <div 
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          
          {/* Painel do Drawer */}
          <div className="relative z-10 h-full">
            <WalletSidebar isDrawer onClose={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}