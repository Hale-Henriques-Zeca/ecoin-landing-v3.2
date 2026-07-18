'use client';

import React from 'react';
import { AddressText, AddressAvatar } from './components';
import CopyButton from '../CopyButton';

export interface AddressChipProps {
  address: string;
  showAvatar?: boolean;
  truncateIndex?: number;
  className?: string;
}

export default function AddressChip({
  address,
  showAvatar = true,
  truncateIndex = 6,
  className = ''
}: AddressChipProps) {
  return (
    <div className={`
      inline-flex items-center gap-2 px-2 py-1 rounded-xl
      bg-[#050505] border border-white/5 ${className}
    `}>
      {showAvatar && <AddressAvatar address={address} />}
      <AddressText address={address} truncateIndex={truncateIndex} />
      <CopyButton value={address} showText={false} className="border-0 bg-transparent p-1" />
    </div>
  );
}