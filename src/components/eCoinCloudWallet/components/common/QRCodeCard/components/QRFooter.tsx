'use client';

import React from 'react';

interface QRFooterProps {
  address: string;
}

export default function QRFooter({ address }: QRFooterProps) {
  const truncated = `${address.slice(0, 8)}...${address.slice(-8)}`;

  return (
    <div className="text-center mt-4 pt-3 border-t border-white/[0.04]">
      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1">
        Endereço Destino
      </div>
      <div className="font-mono text-xs font-bold text-white tracking-wider select-all">
        {truncated}
      </div>
    </div>
  );
}