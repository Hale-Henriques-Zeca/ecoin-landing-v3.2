'use client';

import React from 'react';

export type WalletStatusType = 'online' | 'offline' | 'maintenance' | 'updating';

interface FooterStatusProps {
  status?: WalletStatusType;
}

export default function FooterStatus({ status = 'online' }: FooterStatusProps) {
  const statusConfig = {
    online: {
      label: 'Online',
      dotClass: 'bg-[#00FF9C] shadow-[0_0_8px_#00FF9C]',
      pulseClass: 'bg-[#00FF9C]/35',
      textClass: 'text-[#00FF9C]'
    },
    offline: {
      label: 'Offline',
      dotClass: 'bg-red-500 shadow-[0_0_8px_#EF4444]',
      pulseClass: 'bg-red-500/35',
      textClass: 'text-red-400'
    },
    maintenance: {
      label: 'Manutenção',
      dotClass: 'bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]',
      pulseClass: 'bg-[#D4AF37]/35',
      textClass: 'text-[#D4AF37]'
    },
    updating: {
      label: 'Atualizando',
      dotClass: 'bg-blue-400 shadow-[0_0_8px_#60A5FA]',
      pulseClass: 'bg-blue-400/35',
      textClass: 'text-blue-400'
    }
  };

  const config = statusConfig[status] || statusConfig.online;

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.01] border border-white/5 select-none">
      <span className="relative flex h-1.5 w-1.5">
        {status === 'online' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulseClass}`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${config.dotClass}`} />
      </span>
      <span className={`text-[10px] font-mono font-bold tracking-wider uppercase ${config.textClass}`}>
        {config.label}
      </span>
    </div>
  );
}