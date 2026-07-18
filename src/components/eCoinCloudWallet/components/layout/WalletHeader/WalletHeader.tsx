'use client';

import React from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderCenter from './HeaderCenter';
import HeaderRight from './HeaderRight';
import { NetworkType, NetworkStatus } from './components/NetworkBadge';

export interface WalletHeaderProps {
  // Lado Esquerdo
  onMenuClick?: () => void;
  disabledMenu?: boolean;
  
  // Centro
  network?: NetworkType | string;
  networkStatus?: NetworkStatus;
  children?: React.ReactNode;

  // Lado Direito
  notificationCount?: number;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  walletAddress?: string;
  username?: string;
  closeLabel?: string;

  // Configurações do Header
  mode?: 'page' | 'drawer' | 'modal' | 'popup';
}

export default function WalletHeader({
  onMenuClick,
  disabledMenu = false,
  network = 'BNB Smart Chain',
  networkStatus = 'LIVE',
  children,
  notificationCount = 0,
  onNotificationsClick,
  onSettingsClick,
  onClose,
  showCloseButton = false,
  walletAddress,
  username,
  closeLabel,
  mode = 'page'
}: WalletHeaderProps) {
  
  // Se o modo for 'drawer' ou 'modal', ativamos automaticamente o botão fechar
  const isCloseButtonVisible = showCloseButton || mode === 'drawer' || mode === 'modal';

  return (
    <header className="relative w-full h-16 md:h-[68px] lg:h-[72px] bg-[#050505]/85 backdrop-blur-md px-4 md:px-6 lg:px-8 border-b border-[#D4AF37]/15 grid grid-cols-3 items-center sticky top-0 z-35 select-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* 🌟 15. Linha Ultra-Premium Superior de 1px com Gradiente Dourado -> Verde Neon */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#D4AF37] via-[#00FF9C] to-[#D4AF37]/40" />

      {/* Lado Esquerdo (Menu, Logo, Título) */}
      <HeaderLeft 
        onMenuClick={onMenuClick} 
        disabledMenu={disabledMenu || mode === 'modal'} 
      />

      {/* Centro (Network Badge ou Componente Personalizado de Filtros) */}
      <HeaderCenter 
        network={network} 
        networkStatus={networkStatus}
      >
        {children}
      </HeaderCenter>

      {/* Lado Direito (Notificações, Configurações, Perfil, Ação Fechar) */}
      <HeaderRight
        notificationCount={notificationCount}
        onNotificationsClick={onNotificationsClick}
        onSettingsClick={onSettingsClick}
        onClose={onClose}
        showCloseButton={isCloseButtonVisible}
        walletAddress={walletAddress}
        username={username}
        closeLabel={closeLabel}
      />
    </header>
  );
}