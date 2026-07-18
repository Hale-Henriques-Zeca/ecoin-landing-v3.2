'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Wallet, Clock, Settings } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';
import BottomItem from './components/BottomItem';
import BottomAction from './components/BottomAction';
import QuickActionsSheet from './components/QuickActionsSheet';

export default function WalletBottomBar() {
  const [isHubOpen, setIsHubOpen] = useState(false);

  return (
    <>
      {/* Injeção de keyframes rápidos nativos para evitar dependências de animação pesadas */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
      `}} />

      {/* Container Principal fixo na base da tela */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/85 backdrop-blur-lg border-t border-[#D4AF37]/15 shadow-[0_-4px_30px_rgba(0,0,0,0.4)]">
        {/* Tratamento cirúrgico da Safe Area + Altura fixa de 72px */}
        <div className="h-[72px] max-w-md mx-auto flex items-center justify-between px-2 pb-[calc(env(safe-area-inset-bottom)-4px)]">
          
          <BottomItem 
            icon={LayoutDashboard} 
            title="Dashboard" 
            href={WALLET_ROUTES.dashboard} 
          />
          
          <BottomItem 
            icon={Wallet} 
            title="Assets" 
            href={WALLET_ROUTES.assets} 
          />
          
          {/* Botão Central de gatilho para o Quick Actions Hub */}
          <BottomAction 
            onClick={() => setIsHubOpen(!isHubOpen)} 
            isOpen={isHubOpen} 
          />
          
          <BottomItem 
            icon={Clock} 
            title="History" 
            href={WALLET_ROUTES.history} 
            badge={<span className="h-full w-full rounded-full bg-[#00FF9C] animate-pulse" />}
          />
          
          <BottomItem 
            icon={Settings} 
            title="Settings" 
            href={WALLET_ROUTES.settings} 
          />
          
        </div>
      </div>

      {/* Renderização do Drawer Hub condicional com bloqueio de interface */}
      <QuickActionsSheet 
        isOpen={isHubOpen} 
        onClose={() => setIsHubOpen(false)} 
      />
    </>
  );
}