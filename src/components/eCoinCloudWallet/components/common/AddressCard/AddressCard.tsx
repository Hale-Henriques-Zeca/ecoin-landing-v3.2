'use client';

import React from 'react';
import { AddressHeader, AddressBody, AddressFooter, AddressActions } from './components';

export interface AddressCardProps {
  walletName: string;
  networkName: string;
  address: string;
  description?: string;
  explorerUrl?: string;
  onShowQR?: () => void;
  className?: string;
}

export default function AddressCard({
  walletName,
  networkName,
  address,
  description,
  explorerUrl,
  onShowQR,
  className = ''
}: AddressCardProps) {
  return (
    <div className={`
      p-4 rounded-2xl bg-[#050505]/90 border border-white/5 backdrop-blur-xl
      hover:border-white/[0.08] transition-all duration-300 flex flex-col gap-1
      shadow-[0_0_30px_rgba(212,175,55,0.01)] ${className}
    `}>
      <AddressHeader walletName={walletName} networkName={networkName} />
      <AddressBody address={address} />
      <AddressActions address={address} onShowQR={onShowQR} explorerUrl={explorerUrl} />
      <AddressFooter description={description} />
    </div>
  );
}