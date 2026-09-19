'use client';

import React from 'react';
import { useProfitPosition } from './hooks/useProfitPosition';
import ProfitPositionHeader from './components/ProfitPositionHeader';
import MarketSelector from './components/MarketSelector';
import ProfitMarketCard from './components/ProfitMarketCard';
import StakeEcoinPanel from './components/StakeEcoinPanel';
import PoolParticipationCard from './components/PoolParticipationCard';
import ProfitCapacityPanel from './components/ProfitCapacityPanel';
import ActiveSealsTable from './components/ActiveSealsTable';
import BotPerformanceCard from './components/BotPerformanceCard';
import RealizedProfitCard from './components/RealizedProfitCard';
import ProfitHistory from './components/ProfitHistory';

export default function ProfitPositionPage() {
  const {
    activeMarket,
    setActiveMarket,
    staking,
    pool,
    seals,
    botData,
  } = useProfitPosition();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <ProfitPositionHeader />

      <MarketSelector activeMarket={activeMarket} onSelectMarket={setActiveMarket} />

      <ProfitMarketCard market={activeMarket} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StakeEcoinPanel
          stakedAmount={staking.stakedAmount}
          onStake={staking.stakeEcoin}
        />

        <PoolParticipationCard
          poolShare={pool.poolSharePercentage}
          userStake={pool.userStake}
          totalEligibleStake={pool.totalEligibleStake}
          marketAsset={activeMarket}
        />

        <ProfitCapacityPanel
          market={activeMarket}
          onBuyCapacity={seals.buyCapacity}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ActiveSealsTable
          seals={seals.seals}
          totalCommitment={seals.totalCommitment}
          totalMaxCapacity={seals.totalMaxCapacity}
        />

        <BotPerformanceCard
          botName={botData.botName}
          tradingCapital={botData.tradingCapital}
          realizedProfits={botData.realizedProfits}
          poolShare={pool.poolSharePercentage}
        />

        <RealizedProfitCard allocatedProfits={botData.allocatedProfits} />
      </div>

      <ProfitHistory />
    </main>
  );
}