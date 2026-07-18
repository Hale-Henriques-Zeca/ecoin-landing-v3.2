'use client';

import React from 'react';
import Image from 'next/image';

interface TokenImageProps {
  src: string;
  symbol: string;
  onError: () => void;
}

export default function TokenImage({ src, symbol, onError }: TokenImageProps) {
  return (
    <Image 
      src={src} 
      alt={`${symbol} Icon`} 
      width={24} 
      height={24}
      className="object-contain relative z-10"
      onError={onError}
    />
  );
}