export type AISignal = 'BUY' | 'SELL' | 'HOLD' | 'STRONG_BUY' | 'STRONG_SELL';

export type AssetSymbol = 'USDT' | 'EUSD' | 'ECOIN' | 'BNB';

export interface MarketPair {
  id: string;
  baseSymbol: string;
  quoteSymbol: string;
  displayPair: string;
  price: number;
  priceChange24h: number;
  liquidityUsd: number;
  volume24hUsd: number;
  aiSignal: AISignal;
  pancakeUrl: string;
  isLive: boolean;
}

export interface TradingBotPerformance {
  id: string;
  name: string;
  asset: AssetSymbol;
  capital: number;
  profitToday: number;
  profitWeek: number;
  profitMonth: number;
  profitYear: number;
  isLive: boolean;
}

export interface CapitalPool {
  poolAsset: AssetSymbol;
  available: number;
  inTrading: number;
  reserved: number;
  totalProfit: number;
}

export interface ProfitPool {
  asset: AssetSymbol;
  grossProfit: number;
  tradingFees: number;
  gas: number;
  slippage: number;
  otherCosts: number;
  netRealizedProfit: number;
}

export interface RewardPool {
  asset: AssetSymbol;
  rewardAsset: string;
  availableRewards: number;
  distributedRewards: number;
  eligibleHolders: number;
  mechanism: string;
}

export interface TradeActivity {
  id: string;
  timestamp: string;
  botName: string;
  pair: string;
  type: 'BUY' | 'SELL';
  amount: string;
  status: 'EXECUTED' | 'PROFITABLE' | 'PENDING';
}