'use client';

import React from 'react';

interface TokenFallbackProps {
  symbol: string;
}

export default function TokenFallback({ symbol }: TokenFallbackProps) {
  const letter = symbol.charAt(0).toUpperCase();

  return (
    <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 via-[#050505] to-[#00FF9C]/10 rounded-xl flex items-center justify-center border border-white/10">
      <span className="font-mono text-[10px] font-black text-white tracking-tighter">
        {letter}
      </span>
    </div>
  );
}