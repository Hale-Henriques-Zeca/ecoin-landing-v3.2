'use client';

import { useState } from 'react';

export const useEcoinStaking = (initialStake: number = 10000) => {
  const [stakedAmount, setStakedAmount] = useState<number>(initialStake);

  const stakeEcoin = (amount: number) => {
    setStakedAmount((prev) => prev + amount);
  };

  const unstakeEcoin = (amount: number) => {
    setStakedAmount((prev) => Math.max(0, prev - amount));
  };

  return { stakedAmount, stakeEcoin, unstakeEcoin };
};