'use client';

import { useState } from 'react';
import { AllocatedProfit } from '../types';

export const useWithdrawProfit = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const withdraw = async (profits: AllocatedProfit[]) => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
  };

  return { withdraw, isProcessing };
};