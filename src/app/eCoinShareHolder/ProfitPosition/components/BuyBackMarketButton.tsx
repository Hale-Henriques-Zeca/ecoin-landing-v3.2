'use client';

import React from 'react';

export const BuyBackMarketButton: React.FC = () => {
  return (
    <a
      href="/market"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs hover:bg-amber-500 hover:text-slate-950 transition-all duration-200 shadow-sm"
    >
      <span>BUY-BACK ROBOT MARKET</span>
      <span>↗</span>
    </a>
  );
};

export default BuyBackMarketButton;