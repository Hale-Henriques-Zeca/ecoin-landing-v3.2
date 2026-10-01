'use client';

import React from 'react';
import MarginGridLeftSide from './BotCapitalProfitGrid/MarginGridLeftSide';
import ProfitGridRightSide from './BotCapitalProfitGrid/ProfitGridRightSide';
import SecondaryMetricsGrid from './SecondaryMetricsGrid';
import { RunningBotItem } from '../../types/ecnTrading';

interface BotCapitalProfitGridProps {
  bot: RunningBotItem;
  onOpenAddMargin: (bot: RunningBotItem) => void;
  onOpenRemoveMargin: (bot: RunningBotItem) => void;
  onOpenAddCapacity: (bot: RunningBotItem) => void;
  onOpenWithdrawProfit: (bot: RunningBotItem) => void;
}

export default function BotCapitalProfitGrid({
  bot,
  onOpenAddMargin,
  onOpenRemoveMargin,
  onOpenAddCapacity,
  onOpenWithdrawProfit,
}: BotCapitalProfitGridProps) {
  return (
    <div>
      {/* Grid Superior de Capital e Lucro Realizado */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-[#0B0E14] rounded-xl overflow-hidden mb-3 border border-gray-800 shadow-inner">
        <MarginGridLeftSide
          bot={bot}
          onOpenAddMargin={onOpenAddMargin}
          onOpenRemoveMargin={onOpenRemoveMargin}
        />
        <ProfitGridRightSide
          bot={bot}
          onOpenAddCapacity={onOpenAddCapacity}
          onOpenWithdrawProfit={onOpenWithdrawProfit}
        />
      </div>

      {/* Métricas Secundárias (Lucro Não Realizado & Pool Share) */}
      <SecondaryMetricsGrid bot={bot} />
    </div>
  );
}