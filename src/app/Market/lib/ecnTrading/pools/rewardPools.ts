import { RewardPool } from '../../../types/ecnTrading';

export const INITIAL_REWARD_POOLS: RewardPool[] = [
  {
    asset: 'USDT',
    rewardAsset: 'USDT',
    availableRewards: 336.8,
    distributedRewards: 12450.0,
    eligibleHolders: 1420,
    mechanism: 'Holder Shares & Stakers',
  },
  {
    asset: 'EUSD',
    rewardAsset: 'EUSD',
    availableRewards: 156.4,
    distributedRewards: 5820.0,
    eligibleHolders: 890,
    mechanism: 'Holder Shares & Stakers',
  },
  {
    asset: 'ECOIN',
    rewardAsset: 'ECOIN',
    availableRewards: 33600.0,
    distributedRewards: 1250000.0,
    eligibleHolders: 3840,
    mechanism: 'E-Coin Staking + Commitment Seal',
  },
  {
    asset: 'BNB',
    rewardAsset: 'BNB',
    availableRewards: 0.324,
    distributedRewards: 12.85,
    eligibleHolders: 412,
    mechanism: 'BNB Staking Pool',
  },
];