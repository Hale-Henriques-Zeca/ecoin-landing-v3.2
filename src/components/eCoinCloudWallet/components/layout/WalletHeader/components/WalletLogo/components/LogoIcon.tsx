'use client';

import React from 'react';
import Image from 'next/image';

interface LogoIconProps {
  useAsset?: boolean;
}

export default function LogoIcon({ useAsset = false }: LogoIconProps) {
  return (
    <div className="relative shrink-0">
      {/* Glow de fundo dourado/verde neon que reage ao hover do link pai */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#00FF9C] to-[#D4AF37] rounded-xl blur-[8px] opacity-20 group-hover:opacity-50 transition duration-300" />
      
      {/* Container do Logo */}
      <div className="relative w-9 h-9 rounded-xl bg-[#050505] border border-[#D4AF37]/25 group-hover:border-[#D4AF37]/50 flex items-center justify-center transition-all duration-300 overflow-hidden">
        {useAsset ? (
          <Image 
            src="/assets/logo/ecoin-icon.svg" 
            alt="eCoin Logo" 
            width={24} 
            height={24}
            className="object-contain"
          />
        ) : (
          // Fallback Vector SVG de luxo interno (Estilo Brasão EdenKingdom Tech)
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L2 9L16 16L30 9L16 2Z" fill="url(#logoIconGrad)" />
            <path d="M2 23L16 30L30 23V9L16 16L2 9V23Z" fill="url(#logoIconGradDark)" opacity="0.85" />
            <defs>
              <linearGradient id="logoIconGrad" x1="2" y1="2" x2="30" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D4AF37" />
                <stop offset="1" stopColor="#00FF9C" />
              </linearGradient>
              <linearGradient id="logoIconGradDark" x1="2" y1="9" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#050505" />
                <stop offset="1" stopColor="#D4AF37" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
}