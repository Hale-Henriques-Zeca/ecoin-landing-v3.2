'use client';

import React from 'react';

export default function LoadingIcon() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      {/* Anel Externo Rotativo com Degradê de Luxo */}
      <div className="absolute inset-0 rounded-xl border-2 border-[#D4AF37]/10 border-t-[#D4AF37] border-r-[#00FF9C] animate-spin" />
      {/* Emblema Interno Estilo Eden */}
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
        <path d="M16 4L4 11V21L16 28L28 21V11L16 4Z" fill="url(#loadingGrad)" />
        <defs>
          <linearGradient id="loadingGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4AF37" />
            <stop offset="1" stopColor="#00FF9C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}