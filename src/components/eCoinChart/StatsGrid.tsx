import React from 'react';
import { useMarketData } from './hooks/useMarketData';
import { NETWORK } from './constants';

export const StatsGrid: React.FC = () => {
  const { marketCap, volume, supply, lastUpdate } = useMarketData();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
      <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
        <p className="text-xs text-gray-500">Market Cap</p>
        <p className="font-semibold">${marketCap.toLocaleString()}</p>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
        <p className="text-xs text-gray-500">Volume (24h)</p>
        <p className="font-semibold">${volume.toLocaleString()}</p>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
        <p className="text-xs text-gray-500">Supply</p>
        <p className="font-semibold">{supply.toLocaleString()}</p>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
        <p className="text-xs text-gray-500">Last Update</p>
        <p className="font-semibold">{lastUpdate}</p>
      </div>
      <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg">
        <p className="text-xs text-gray-500">Network</p>
        <p className="font-semibold">{NETWORK}</p>
      </div>
    </div>
  );
};