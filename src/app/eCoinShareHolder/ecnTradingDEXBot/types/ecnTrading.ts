export type MarketPair = 'E-Coin/BNB' | 'E-Coin/USDT' | 'E-Coin/eDollar' | 'E-Coin/E-Coin';

export interface BotMarket {
  id: string;
  pair: MarketPair;
  description: string;
  icon: string;
  badge?: string;
}

export interface RunningBotItem {
  id: string;
  pair: MarketPair;
  status: 'LIVE' | 'STOPPED';
  capitalTrading: string;
  capitalTradingUsd: string;
  lucroRealizado: string;
  lucroRealizadoPercent: string;
  lucroNaoRealizado: string;
  lucroNaoRealizadoPercent: string;
  poolShare: string;
  capacityRemaining: number; // Porcentagem de CS restante
}