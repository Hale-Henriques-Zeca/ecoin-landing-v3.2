'use client';

import { useState } from 'react';
import { RewardPool } from '../../types/ecnTrading';
import { INITIAL_REWARD_POOLS } from '../../lib/ecnTrading/pools/rewardPools';

export function useRewardPools() {
  const [rewardPools] = useState<RewardPool[]>(INITIAL_REWARD_POOLS);

  return {
    rewardPools,
  };
}