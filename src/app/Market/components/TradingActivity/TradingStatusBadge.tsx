'use client';

import React from 'react';

interface TradingStatusBadgeProps {
  status: 'EXECUTED' | 'PROFITABLE' | 'PENDING';
}

export const TradingStatusBadge: React.FC<TradingStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'EXECUTED':
      return (
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          EXECUTED
        </span>
      );
    case 'PROFITABLE':
      return (
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/30 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          PROFITABLE
        </span>
      );
    case 'PENDING':
    default:
      return (
        <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-slate-800 text-slate-300 border border-slate-700 inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          PENDING
        </span>
      );
  }
};

export default TradingStatusBadge;