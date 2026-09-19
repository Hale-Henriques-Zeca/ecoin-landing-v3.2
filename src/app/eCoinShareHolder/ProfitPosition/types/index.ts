export type MarketType = 'BNB' | 'USDT' | 'EUSD' | 'ECOIN';

export interface CommitmentSeal {
  id: string;
  sealNumber: string;
  capitalAmount: number;
  paymentAsset: string;
  maxCapacity: number;
  startDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED';
}

export interface MarketPoolMetrics {
  market: MarketType;
  botName: string;
  tradingCapital: number;
  realizedProfitPrimary: number;
  realizedProfitSecondary?: number;
  totalEligibleStake: number;
  userStakedEcoin: number;
  activeSeals: CommitmentSeal[];
}

export interface AllocatedProfit {
  asset: string;
  amount: number;
}