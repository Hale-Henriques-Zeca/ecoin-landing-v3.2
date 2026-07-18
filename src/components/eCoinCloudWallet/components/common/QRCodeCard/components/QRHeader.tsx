'use client';

import React from 'react';

interface QRHeaderProps {
  title?: string;
  networkName?: string;
}

export default function QRHeader({ title = 'Código QR de Depósito', networkName }: QRHeaderProps) {
  return (
    <div className="text-center pb-3 mb-4 border-b border-white/[0.04]">
      <h3 className="font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
        {title}
      </h3>
      {networkName && (
        <p className="text-[10px] font-mono font-semibold text-neutral-500 tracking-wider mt-0.5">
          Rede: <span className="text-[#00FF9C]">{networkName}</span>
        </p>
      )}
    </div>
  );
}