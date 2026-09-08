import { ProfitPool } from '../../../types/ecnTrading';

export const INITIAL_PROFIT_POOLS: ProfitPool[] = [
  {
    asset: 'USDT',
    grossProfit: 1020,
    tradingFees: 82,
    gas: 48,
    slippage: 32,
    otherCosts: 16,
    netRealizedProfit: 842,
  },
  {
    asset: 'EUSD',
    grossProfit: 475,
    tradingFees: 38,
    gas: 24,
    slippage: 14,
    otherCosts: 8,
    netRealizedProfit: 391,
  },
  {
    asset: 'ECOIN',
    grossProfit: 102000,
    tradingFees: 8200,
    gas: 4800,
    slippage: 3200,
    otherCosts: 1800,
    netRealizedProfit: 84000,
  },
  {
    asset: 'BNB',
    grossProfit: 0.98,
    tradingFees: 0.08,
    gas: 0.04,
    slippage: 0.03,
    otherCosts: 0.02,
    netRealizedProfit: 0.81,
  },
];