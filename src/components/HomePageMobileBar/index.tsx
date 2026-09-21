'use client';

import React, { useState } from 'react';
import { Wallet, Store, Bot, Settings } from 'lucide-react';
import BottomItem from './components/BottomItem';
import BottomAction from './components/BottomAction';
import QuickActionsSheet from './components/QuickActionsSheet';

export default function HomePageMobileBar() {
  const [isHubOpen, setIsHubOpen] = useState(false);

  return (
    <div className="block md:hidden">
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

      {/* Container Fixo 100% Transparente na base */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-transparent backdrop-blur-none border-t border-[#D4AF37]/20 shadow-none">
        <div className="h-[72px] max-w-md mx-auto flex items-center justify-between px-2 pb-[calc(env(safe-area-inset-bottom))]">
          
          {/* 1. Wallet */}
          <BottomItem 
            icon={Wallet} 
            title="Wallet" 
            href="/eCoinCloudWallet" 
          />
          
          {/* 2. Market */}
          <BottomItem 
            icon={Store} 
            title="Market" 
            href="/Market" 
          />
          
          {/* 3. Botão Central HUB */}
          <BottomAction 
            onClick={() => setIsHubOpen(!isHubOpen)} 
            isOpen={isHubOpen} 
          />
          
          {/* 4. Bot */}
          <BottomItem 
            icon={Bot} 
            title="Bot" 
            href="/eCoinShareHolder/ecnTradingDEXBot" 
            badge={<span className="h-full w-full rounded-full bg-[#00FF9C] animate-pulse" />}
          />
          
          {/* 5. Settings */}
          <BottomItem 
            icon={Settings} 
            title="Settings" 
            href="/eCoinShareHolder/ProfileTab" 
          />
          
        </div>
      </div>

      <QuickActionsSheet 
        isOpen={isHubOpen} 
        onClose={() => setIsHubOpen(false)} 
      />
    </div>
  );
}