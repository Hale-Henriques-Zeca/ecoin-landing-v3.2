'use client';

import React from 'react';
import { Wallet } from 'lucide-react';

interface AddressHeaderProps {
  walletName: string;
  networkName: string;
}

export default function AddressHeader({ walletName, networkName }: AddressHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20">
          <Wallet size={14} className="text-[#D4AF37]" />
        </div>
        <span className="font-mono text-xs font-bold tracking-wider text-white uppercase">
          {walletName}
        </span>
      </div>
      <span className="px-2 py-0.5 rounded-full bg-[#00FF9C]/10 border border-[#00FF9C]/20 font-mono text-[9px] font-bold text-[#00FF9C] uppercase tracking-widest">
        {networkName}
      </span>
    </div>
  );
}