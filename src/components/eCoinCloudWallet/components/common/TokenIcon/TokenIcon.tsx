'use client';

import React, { useState } from 'react';
import { TokenImage, TokenFallback } from './components';

export interface TokenIconProps {
  src?: string;
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function TokenIcon({
  src,
  symbol,
  size = 'md',
  className = ''
}: TokenIconProps) {
  const [error, setError] = useState(!src);

  const sizeClasses = {
    sm: 'w-6 h-6 rounded-lg',
    md: 'w-8 h-8 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 bg-[#020202] border border-white/5 overflow-hidden ${sizeClasses[size]} ${className}`}>
      {!error && src ? (
        <TokenImage src={src} symbol={symbol} onError={() => setError(true)} />
      ) : (
        <TokenFallback symbol={symbol} />
      )}
    </div>
  );
}