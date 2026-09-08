'use client';

import React, { useState } from 'react';
import { TradingBotPerformance } from '../../types/ecnTrading';
import TradingBotCard from './TradingBotCard';
import ProfitPeriodSelector, { ProfitPeriod } from './ProfitPeriodSelector';

interface TradingPerformanceSectionProps {
  bots: TradingBotPerformance[];
}

export const TradingPerformanceSection: React.FC<TradingPerformanceSectionProps> = ({ bots }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<ProfitPeriod>('today');

  return (
    <section className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🤖</span> AI Trading Engines Performance
          </h2>
          <p className="text-xs text-slate-400">
            Real-time multi-asset strategy yields executed by autonomous algorithms.
          </p>
        </div>

        <ProfitPeriodSelector
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {bots.map((bot) => (
          <TradingBotCard key={bot.id} bot={bot} selectedPeriod={selectedPeriod} />
        ))}
      </div>
    </section>
  );
};

export default TradingPerformanceSection;