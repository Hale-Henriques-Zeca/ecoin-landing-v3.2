'use client';

import React from 'react';

export type NetworkType = 'BNB Smart Chain' | 'Ethereum' | 'Polygon' | 'Base' | 'Arbitrum' | 'Eden Chain';
export type NetworkStatus = 'LIVE' | 'TESTNET' | 'OFFLINE' | 'MAINTENANCE';

interface NetworkBadgeProps {
  network?: NetworkType | string;
  status?: NetworkStatus;
}

export default function NetworkBadge({ 
  network = 'BNB Smart Chain', 
  status = 'LIVE' 
}: NetworkBadgeProps) {
  
  // Mapeamento visual das cores do status
  const getStatusColors = (currentStatus: NetworkStatus) => {
    switch (currentStatus) {
      case 'LIVE':
        return {
          bg: 'bg-[#00FF9C]/5 border-[#00FF9C]/20',
          dot: 'bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]',
          text: 'text-[#00FF9C]'
        };
      case 'TESTNET':
        return {
          bg: 'bg-[#D4AF37]/5 border-[#D4AF37]/20',
          dot: 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]',
          text: 'text-[#D4AF37]'
        };
      case 'OFFLINE':
      default:
        return {
          bg: 'bg-red-500/5 border-red-500/20',
          dot: 'bg-red-500 shadow-[0_0_8px_#EF4444]',
          text: 'text-red-400'
        };
    }
  };

  const colors = getStatusColors(status);

  // Mapeamento amigável de nomes curtos para ecrãs mobile
  const getShortName = (name: string) => {
    if (name === 'BNB Smart Chain') return 'BSC';
    return name;
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${colors.bg} backdrop-blur-sm select-none transition-all duration-300 hover:bg-white/[0.02]`}>
      {/* Luz de Status Reativa */}
      <span className="relative flex h-1.5 w-1.5">
        {status === 'LIVE' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75" />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colors.dot}`} />
      </span>
      
      {/* Título da Rede */}
      <span className="text-[10px] md:text-xs font-bold tracking-widest text-neutral-300 font-mono">
        <span className="inline md:hidden">{getShortName(network)}</span>
        <span className="hidden md:inline">{network}</span>
        <span className={`ml-1 opacity-65 text-[9px] ${colors.text}`}>
          ({status})
        </span>
      </span>
    </div>
  );
}