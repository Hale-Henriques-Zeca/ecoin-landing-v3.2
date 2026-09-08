'use client';

import React, { useState } from 'react';
import LiveMarketsSection from '../LiveMarkets/LiveMarketsSection';
import TradingPerformanceSection from '../TradingPerformance/TradingPerformanceSection';
import CapitalPoolsSection from '../CapitalPools/CapitalPoolsSection';
import ProfitPoolsSection from '../ProfitPools/ProfitPoolsSection';
import RewardPoolsSection from '../RewardPools/RewardPoolsSection';
import TradingActivitySection from '../TradingActivity/TradingActivitySection';
import MobileBarAdapter from './MobileBarAdapter';

import { useLiveMarkets } from '../../hooks/ecnTrading/useLiveMarkets';
import { useTradingPerformance } from '../../hooks/ecnTrading/useTradingPerformance';
import { useCapitalPools } from '../../hooks/ecnTrading/useCapitalPools';
import { useProfitPools } from '../../hooks/ecnTrading/useProfitPools';
import { useRewardPools } from '../../hooks/ecnTrading/useRewardPools';
import { INITIAL_TRADE_ACTIVITIES } from '../../lib/ecnTrading/bots/executionEngine';

export const MarketMobile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('markets');

  const { pairs, selectedPair, setSelectedPair } = useLiveMarkets();
  const { bots, period, setPeriod } = useTradingPerformance();
  const { pools } = useCapitalPools();
  const { profitPools } = useProfitPools();
  const { rewardPools } = useRewardPools();

  return (
    <div className="block lg:hidden space-y-6">
      <MobileBarAdapter activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="pt-2">
        {activeTab === 'markets' && (
          <LiveMarketsSection
            pairs={pairs}
            selectedPair={selectedPair}
            onSelectPair={setSelectedPair}
          />
        )}

        {activeTab === 'performance' && (
          <TradingPerformanceSection
            bots={bots}
            period={period}
            onPeriodChange={setPeriod}
          />
        )}

        {activeTab === 'pools' && (
          <div className="space-y-6">
            <CapitalPoolsSection pools={pools} />
            <ProfitPoolsSection pools={profitPools} />
          </div>
        )}

        {activeTab === 'rewards' && (
          <RewardPoolsSection pools={rewardPools} />
        )}

        {activeTab === 'activity' && (
          <TradingActivitySection activities={INITIAL_TRADE_ACTIVITIES} />
        )}
      </div>
    </div>
  );
};

export default MarketMobile;