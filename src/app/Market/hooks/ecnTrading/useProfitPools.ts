'use client';

import { useState } from 'react';
import { ProfitPool } from '../../types/ecnTrading';
import { INITIAL_PROFIT_POOLS } from '../../lib/ecnTrading/pools/profitPools';

export function useProfitPools() {
  const [profitPools] = useState<ProfitPool[]>(INITIAL_PROFIT_POOLS);

  return {
    profitPools,
  };
}