'use client';

import React from 'react';

export type NetworkStatusType = 'LIVE' | 'TESTNET' | 'OFFLINE' | 'MAINTENANCE';

interface NetworkStatusProps {
  status: NetworkStatusType;
}

export default function NetworkStatus({ status }: NetworkStatusProps) {
  const config = {
    LIVE: {
      dotClass: 'bg-[#00FF9C] shadow-[0_0_8px_rgba(0,255,156,0.5)]',
      pulseClass: 'bg-[#00FF9C]/30',
      textClass: 'text-[#00FF9C]'
    },
    TESTNET: {
      dotClass: 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]',
      pulseClass: 'bg-[#D4AF37]/30',
      textClass: 'text-[#D4AF37]'
    },
    OFFLINE: {
      dotClass: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
      pulseClass: 'bg-red-500/30',
      textClass: 'text-red-400'
    },
    MAINTENANCE: {
      dotClass: 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]',
      pulseClass: 'bg-orange-500/30',
      textClass: 'text-orange-400'
    }
  };

  const current = config[status] || config.LIVE;

  return (
    <div className="flex items-center gap-1.5 select-none">
      {/* Indicador Luminoso Reativo */}
      <span className="relative flex h-1.5 w-1.5">
        {status === 'LIVE' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${current.pulseClass}`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${current.dotClass}`} />
      </span>

      {/* Label de status abreviada de luxo */}
      <span className={`text-[9px] font-bold font-mono tracking-widest ${current.textClass}`}>
        {status}
      </span>
    </div>
  );
}