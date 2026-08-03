import React from 'react';
import { useMarketData } from './hooks/useMarketData';
import { NETWORK } from './constants';

export const StatsGrid: React.FC = () => {
  const { marketCap, volume, supply, lastUpdate } = useMarketData();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
      <div className="p-4 bg-zinc-900/90 border border-[#D4AF37]/20 rounded-2xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Market Cap</p>
        <p className="text-lg md:text-xl font-bold text-white">${marketCap.toLocaleString()}</p>
      </div>

      <div className="p-4 bg-zinc-900/90 border border-[#D4AF37]/20 rounded-2xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Volume (24h)</p>
        <p className="text-lg md:text-xl font-bold text-white">${volume.toLocaleString()}</p>
      </div>

      <div className="p-4 bg-zinc-900/90 border border-[#D4AF37]/20 rounded-2xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Supply</p>
        <p className="text-lg md:text-xl font-bold text-white">{supply.toLocaleString()}</p>
      </div>

      <div className="p-4 bg-zinc-900/90 border border-[#D4AF37]/20 rounded-2xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Last Update</p>
        <p className="text-sm md:text-base font-bold text-[#D4AF37] font-mono">{lastUpdate}</p>
      </div>

      <div className="p-4 bg-zinc-900/90 border border-[#D4AF37]/20 rounded-2xl shadow-xl backdrop-blur-md col-span-2 md:col-span-1">
        <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-1">Network</p>
        <p className="text-sm md:text-base font-bold text-emerald-400 font-mono">{NETWORK}</p>
      </div>
    </div>
  );
};