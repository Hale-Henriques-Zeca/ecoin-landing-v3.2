'use client';

import React from 'react';
import { NetworkIcon, NetworkName, NetworkStatus } from './components';
import { NetworkStatusType } from './components/NetworkStatus';
import { NetworkKey } from './components/NetworkIcon';

export interface NetworkBadgeProps {
  networkName: string;
  networkKey: NetworkKey;
  status?: NetworkStatusType;
  shortName?: string;
  onClick?: () => void;
  className?: string;
}

export default function NetworkBadge({
  networkName,
  networkKey,
  status = 'LIVE',
  shortName,
  onClick,
  className = ''
}: NetworkBadgeProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className={`
        flex items-center gap-3 px-3 py-1.5 rounded-lg 
        bg-[#090909]/60 backdrop-blur-md 
        border border-white/5 hover:border-[#D4AF37]/25
        transition-all duration-300 ease-out select-none
        ${isClickable ? 'cursor-pointer hover:bg-white/[0.02] active:scale-98' : ''}
        ${className}
      `}
    >
      {/* 1. Ícone da Rede com Fallback Integrado */}
      <div className="flex items-center justify-center shrink-0">
        <NetworkIcon networkKey={networkKey} size={16} />
      </div>

      {/* 2. Nome da Rede Adaptável */}
      <NetworkName name={networkName} shortName={shortName} />

      {/* Separador Interno Minimalista */}
      <span className="w-[1px] h-3 bg-white/10 shrink-0" />

      {/* 3. Indicador de Status Glow */}
      <NetworkStatus status={status} />
    </div>
  );
}