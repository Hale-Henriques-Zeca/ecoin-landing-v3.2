'use client';

import React, { useState } from 'react';
import LiveMarketsSection from '../LiveMarkets/LiveMarketsSection';
import TradingPerformanceSection from '../TradingPerformance/TradingPerformanceSection';
import CapitalPoolsSection from '../CapitalPools/CapitalPoolsSection';
import ProfitPoolsSection from '../ProfitPools/ProfitPoolsSection';
import RewardPoolsSection from '../RewardPools/RewardPoolsSection';
import TradingActivitySection from '../TradingActivity/TradingActivitySection';
import DesktopBarAdapter from './DesktopBarAdapter';

import { useLiveMarkets } from '../../hooks/ecnTrading/useLiveMarkets';
import { useTradingPerformance } from '../../hooks/ecnTrading/useTradingPerformance';
import { useCapitalPools } from '../../hooks/ecnTrading/useCapitalPools';
import { useProfitPools } from '../../hooks/ecnTrading/useProfitPools';
import { useRewardPools } from '../../hooks/ecnTrading/useRewardPools';
import { INITIAL_TRADE_ACTIVITIES } from '../../lib/ecnTrading/bots/executionEngine';

export const MarketDesktop: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const { pairs, selectedPair, setSelectedPair } = useLiveMarkets();
  const { bots, period, setPeriod } = useTradingPerformance();
  const { pools } = useCapitalPools();
  const { profitPools } = useProfitPools();
  const { rewardPools } = useRewardPools();

  return (
    <div className="hidden lg:block space-y-8">
      <DesktopBarAdapter activeTab={activeTab} setActiveTab={setActiveTab} />

      {(activeTab === 'all' || activeTab === 'markets') && (
        <LiveMarketsSection
          pairs={pairs}
          selectedPair={selectedPair}
          onSelectPair={setSelectedPair}
        />
      )}

      {(activeTab === 'all' || activeTab === 'performance') && (
        <TradingPerformanceSection
          bots={bots}
          period={period}
          onPeriodChange={setPeriod}
        />
      )}

      {(activeTab === 'all' || activeTab === 'pools') && (
        <>
          <CapitalPoolsSection pools={pools} />
          <ProfitPoolsSection pools={profitPools} />
        </>
      )}

      {(activeTab === 'all' || activeTab === 'rewards') && (
        <RewardPoolsSection pools={rewardPools} />
      )}

      {(activeTab === 'all' || activeTab === 'activity') && (
        <TradingActivitySection activities={INITIAL_TRADE_ACTIVITIES} />
      )}
    </div>
  );
};

export default MarketDesktop;