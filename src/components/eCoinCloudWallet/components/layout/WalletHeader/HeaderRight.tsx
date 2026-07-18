'use client';

import React from 'react';
import { Settings, X } from 'lucide-react';
import NotificationButton from './components/NotificationButton';
import UserMenu from './components/UserMenu';

interface HeaderRightProps {
  notificationCount?: number;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  walletAddress?: string;
  username?: string;
  closeLabel?: string;
}

export default function HeaderRight({
  notificationCount = 0,
  onNotificationsClick,
  onSettingsClick,
  onClose,
  showCloseButton = false,
  walletAddress,
  username,
  closeLabel = "Fechar"
}: HeaderRightProps) {
  return (
    <div className="flex items-center gap-1.5 md:gap-3 justify-end">
      {/* Botão de Notificações (Mobile esconde para manter layout limpo) */}
      <div className="hidden sm:inline">
        <NotificationButton count={notificationCount} onClick={onNotificationsClick} />
      </div>

      {/* Botão de Configurações da Carteira */}
      <button
        onClick={onSettingsClick}
        className="hidden sm:flex p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-all duration-200"
        aria-label="Configurações da Wallet"
      >
        <Settings size={18} />
      </button>

      {/* Menu do Utilizador com Info de Ligação */}
      <UserMenu address={walletAddress} username={username} />

      {/* Botão Condicional de Encerramento (Ex: Modal/Drawer/Popup) */}
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-all duration-200 border border-transparent hover:border-red-500/20 ml-1.5"
          aria-label={closeLabel}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}