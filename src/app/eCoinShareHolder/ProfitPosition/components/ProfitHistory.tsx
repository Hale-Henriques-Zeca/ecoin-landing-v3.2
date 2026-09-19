'use client';

import React from 'react';

export const ProfitHistory: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
      <h3 className="text-sm font-bold text-white tracking-wide">HISTORICAL ALLOCATIONS</h3>
      <div className="text-xs text-slate-400 text-center py-6 bg-slate-950/40 rounded-xl border border-slate-800/50">
        No past distributions claimed yet.
      </div>
    </div>
  );
};

export default ProfitHistory;