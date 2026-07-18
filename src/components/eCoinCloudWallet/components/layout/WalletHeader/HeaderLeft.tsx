'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import WalletLogo from './components/WalletLogo';

interface HeaderLeftProps {
  onMenuClick?: () => void;
  disabledMenu?: boolean;
}

export default function HeaderLeft({ onMenuClick, disabledMenu = false }: HeaderLeftProps) {
  return (
    <div className="flex items-center gap-3 md:gap-4 justify-start">
      {/* Botão Hambúrguer Mobile/Tablet */}
      {onMenuClick && !disabledMenu && (
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-neutral-300 hover:text-white transition-all duration-200 active:scale-95"
          aria-label="Abrir menu lateral"
        >
          <Menu size={22} />
        </button>
      )}

      {/* Logótipo Premium da eCoin com Link */}
      <WalletLogo />
    </div>
  );
}