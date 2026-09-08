'use client';

import { useState, useEffect } from 'react';
import { MarketPair } from '../../types/ecnTrading';
import { INITIAL_MARKET_PAIRS } from '../../lib/ecnTrading/market/pairs';

export function useLiveMarkets() {
  const [pairs, setPairs] = useState<MarketPair[]>(INITIAL_MARKET_PAIRS);
  const [selectedPair, setSelectedPair] = useState<MarketPair>(INITIAL_MARKET_PAIRS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPairs((prev) =>
        prev.map((pair) => {
          const delta = (Math.random() - 0.49) * 0.002;
          const newPrice = Math.max(0.000001, pair.price * (1 + delta));
          return {
            ...pair,
            price: Number(newPrice.toFixed(6)),
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return {
    pairs,
    selectedPair,
    setSelectedPair,
  };
}