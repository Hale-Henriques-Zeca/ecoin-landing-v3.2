'use client';

import React from 'react';
import { MarketPair } from '../../types/ecnTrading';
import MarketPairCard from './MarketPairCard';

interface MarketPairGridProps {
  pairs: MarketPair[];
}

export const MarketPairGrid: React.FC<MarketPairGridProps> = ({ pairs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {pairs.map((pair) => (
        <MarketPairCard key={pair.id} pair={pair} />
      ))}
    </div>
  );
};

export default MarketPairGrid;