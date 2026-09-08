import { CapitalPool } from '../../../types/ecnTrading';

export const INITIAL_CAPITAL_POOLS: CapitalPool[] = [
  {
    poolAsset: 'USDT',
    available: 100000,
    inTrading: 4200,
    reserved: 5000,
    totalProfit: 842,
  },
  {
    poolAsset: 'EUSD',
    available: 50000,
    inTrading: 2100,
    reserved: 3000,
    totalProfit: 391,
  },
  {
    poolAsset: 'ECOIN',
    available: 10000000,
    inTrading: 420000,
    reserved: 500000,
    totalProfit: 84000,
  },
  {
    poolAsset: 'BNB',
    available: 100,
    inTrading: 4.15,
    reserved: 0.8,
    totalProfit: 0.81,
  },
];