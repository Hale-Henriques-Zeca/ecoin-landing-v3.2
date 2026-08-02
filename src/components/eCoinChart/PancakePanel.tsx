import React from 'react';

export const PancakePanel: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-pink-50 dark:bg-pink-950/30 rounded-xl border border-pink-200 dark:border-pink-900 my-4">
      <div>
        <h4 className="font-bold text-pink-700 dark:text-pink-400">E-Coin / USDT</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">Negocie diretamente na PancakeSwap com liquidez descentralizada.</p>
      </div>
      <a 
        href="https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964&outputCurrency=0x55d398326f99059fF775485246999027B3197955" 
        target="_blank" 
        rel="noopener noreferrer"
        className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Swap
      </a>
    </div>
  );
};