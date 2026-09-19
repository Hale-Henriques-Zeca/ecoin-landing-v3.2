'use client';

import { useState } from 'react';
import { MarketType } from '../types';
import { useEcoinStaking } from './useEcoinStaking';
import { usePoolParticipation } from './usePoolParticipation';
import { useCommitmentSeal } from './useCommitmentSeal';
import { useBotProfit } from './useBotProfit';

export const useProfitPosition = () => {
  const [activeMarket, setActiveMarket] = useState<MarketType>('BNB');
  const staking = useEcoinStaking(10000);
  const pool = usePoolParticipation(staking.stakedAmount, 425000);
  const seals = useCommitmentSeal();
  const botData = useBotProfit(activeMarket, pool.poolSharePercentage);

  return {
    activeMarket,
    setActiveMarket,
    staking,
    pool,
    seals,
    botData
  };
};