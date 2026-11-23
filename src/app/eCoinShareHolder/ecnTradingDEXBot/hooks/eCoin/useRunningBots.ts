'use client';

import { useState } from 'react';
import { RunningBotItem } from '../types/ecnTrading';

const INITIAL_BOTS: RunningBotItem[] = [
  {
    id: 'bot-bnb-01',
    pair: 'E-Coin/BNB',
    status: 'LIVE',
    capitalTrading: '100 BNB',
    capitalTradingUsd: '≈ $58,240',
    lucroRealizado: '+5.42 BNB',
    lucroRealizadoPercent: '+5.42%',
    lucroNaoRealizado: '+1.21 BNB',
    lucroNaoRealizadoPercent: '+1.21%',
    poolShare: '2.35%',
    capacityRemaining: 85,
  },
  {
    id: 'bot-usdt-02',
    pair: 'E-Coin/USDT',
    status: 'LIVE',
    capitalTrading: '$100,000',
    capitalTradingUsd: '$100,000',
    lucroRealizado: '+$5,931',
    lucroRealizadoPercent: '+5.93%',
    lucroNaoRealizado: '+$842',
    lucroNaoRealizadoPercent: '+0.84%',
    poolShare: '3.12%',
    capacityRemaining: 40,
  },
];

export function useRunningBots() {
  const [bots, setBots] = useState<RunningBotItem[]>(INITIAL_BOTS);

  const addCapacity = (botId: string, additionalCsAmount: number) => {
    setBots((prev) =>
      prev.map((bot) => {
        if (bot.id === botId) {
          return {
            ...bot,
            capacityRemaining: Math.min(100, bot.capacityRemaining + 25),
          };
        }
        return bot;
      })
    );
  };

  const stopBot = (botId: string) => {
    setBots((prev) =>
      prev.map((bot) => (bot.id === botId ? { ...bot, status: 'STOPPED' } : bot))
    );
  };

  return {
    bots,
    liveBots: bots.filter((b) => b.status === 'LIVE'),
    stoppedBots: bots.filter((b) => b.status === 'STOPPED'),
    addCapacity,
    stopBot,
  };
}