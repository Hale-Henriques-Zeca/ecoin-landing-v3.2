'use client';

import { AllocatedProfit, MarketType } from '../types';

export const useBotProfit = (market: MarketType, poolShare: number) => {
  const calculateAllocated = (grossProfit: number): number => {
    return (grossProfit * (poolShare / 100));
  };

  const getMarketBotData = () => {
    switch (market) {
      case 'BNB':
        return {
          botName: '🤖 BNB AI BOT',
          tradingCapital: '100 BNB',
          realizedProfits: [{ asset: 'BNB', amount: 8.42 }],
          allocatedProfits: [{ asset: 'BNB', amount: calculateAllocated(8.42) }]
        };
      case 'USDT':
        return {
          botName: '🤖 USDT AI BOT',
          tradingCapital: '$100,000',
          realizedProfits: [
            { asset: 'USDT', amount: 842.00 },
            { asset: 'EUSD', amount: 391.00 }
          ],
          allocatedProfits: [
            { asset: 'USDT', amount: calculateAllocated(842.00) },
            { asset: 'EUSD', amount: calculateAllocated(391.00) }
          ]
        };
      case 'EUSD':
        return {
          botName: '🤖 EUSD AI BOT',
          tradingCapital: '100,000 EUSD',
          realizedProfits: [
            { asset: 'EUSD', amount: 842.00 },
            { asset: 'USDT', amount: 391.00 }
          ],
          allocatedProfits: [
            { asset: 'EUSD', amount: calculateAllocated(842.00) },
            { asset: 'USDT', amount: calculateAllocated(391.00) }
          ]
        };
      case 'ECOIN':
      default:
        return {
          botName: '🟢 E-COIN AI BOT',
          tradingCapital: '10,000,000 ECOIN',
          realizedProfits: [{ asset: 'ECOIN', amount: 84000 }],
          allocatedProfits: [{ asset: 'ECOIN', amount: calculateAllocated(84000) }]
        };
    }
  };

  return getMarketBotData();
};