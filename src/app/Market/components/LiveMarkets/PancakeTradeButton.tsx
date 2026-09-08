'use client';

import React from 'react';

interface PancakeTradeButtonProps {
  url: string;
}

export const PancakeTradeButton: React.FC<PancakeTradeButtonProps> = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full mt-4 flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 text-xs md:text-sm shadow-sm"
    >
      <span>Trade on PancakeSwap</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

export default PancakeTradeButton;