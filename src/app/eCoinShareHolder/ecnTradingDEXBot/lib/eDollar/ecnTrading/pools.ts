export interface PoolInfo {
  pair: string;
  totalStakedEcoin: number;
  totalLiquidityUsd: number;
  apr24h: number;
}

export const POOL_DATA: Record<string, PoolInfo> = {
  'E-Coin/BNB': {
    pair: 'E-Coin/BNB',
    totalStakedEcoin: 4250000,
    totalLiquidityUsd: 1250000,
    apr24h: 18.5,
  },
  'E-Coin/USDT': {
    pair: 'E-Coin/USDT',
    totalStakedEcoin: 8900000,
    totalLiquidityUsd: 3100000,
    apr24h: 22.4,
  },
  'E-Coin/eDollar': {
    pair: 'E-Coin/eDollar',
    totalStakedEcoin: 3100000,
    totalLiquidityUsd: 950000,
    apr24h: 15.2,
  },
  'E-Coin/E-Coin': {
    pair: 'E-Coin/E-Coin',
    totalStakedEcoin: 15000000,
    totalLiquidityUsd: 2200000,
    apr24h: 28.0,
  },
};