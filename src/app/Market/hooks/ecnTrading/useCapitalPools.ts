'use client';

import { useState } from 'react';
import { CapitalPool } from '../../types/ecnTrading';
import { INITIAL_CAPITAL_POOLS } from '../../lib/ecnTrading/pools/capitalPools';

export function useCapitalPools() {
  const [pools] = useState<CapitalPool[]>(INITIAL_CAPITAL_POOLS);

  return {
    pools,
  };
}