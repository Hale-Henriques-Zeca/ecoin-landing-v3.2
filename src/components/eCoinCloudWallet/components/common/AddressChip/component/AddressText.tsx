'use client';

import React from 'react';

interface AddressTextProps {
  address: string;
  truncateIndex?: number;
}

export default function AddressText({ address, truncateIndex = 5 }: AddressTextProps) {
  const formatted = address.length > truncateIndex * 2
    ? `${address.slice(0, truncateIndex)}...${address.slice(-truncateIndex)}`
    : address;

  return (
    <span className="font-mono text-xs font-bold tracking-tight text-neutral-200">
      {formatted}
    </span>
  );
}