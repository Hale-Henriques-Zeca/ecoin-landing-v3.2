import React from 'react';
import { useECoinPrice } from './hooks/useECoinPrice';
import { formatPrice } from './utils/formatPrice';

export const PricePanel: React.FC = () => {
  const { price, change24h } = useECoinPrice();

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md">
      <span className="text-sm text-gray-500">E-Coin Price</span>
      <div className="text-3xl font-bold text-gray-900 dark:text-white">
        ${formatPrice(price)} USD
      </div>
      <div className={`text-sm ${change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change24h >= 0 ? '+' : ''}{change24h}% (24h)
      </div>
    </div>
  );
};