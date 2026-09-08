'use client';

import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-amber-500 animate-spin"></div>
        <span className="absolute text-xs">⚡</span>
      </div>
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
        Initializing ecnTrading Engine...
      </p>
    </div>
  );
};

export default Loading;