'use client';

import React from 'react';
import MarginGridLeftSide from './BotCapitalProfitGrid/MarginGridLeftSide';
import ProfitGridRightSide from './BotCapitalProfitGrid/ProfitGridRightSide';
import EDollarProfitGridRightSide from './BotCapitalProfitGrid/EDollarProfitGridRightSide';
import SecondaryMetricsGrid from './SecondaryMetricsGrid';
import EDollarSecondaryMetricsGrid from './EDollarSecondaryMetricsGrid';
import { RunningBotItem } from '../../../types/ecnTrading';

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
  const normalizedPair = bot.pair.toLowerCase();
  const isEDollarBot =
    normalizedPair.includes('edollar') || normalizedPair.includes('e-usd');

  return (
    <div>
      {/* Grid Superior: Margem partilhada à esquerda + Lucro específico (EUSD ou USDT) à direita */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 bg-[#0B0E14] rounded-xl overflow-hidden mb-3 border shadow-inner ${
          isEDollarBot ? 'border-blue-500/20' : 'border-gray-800'
        }`}
      >
        <MarginGridLeftSide
          bot={bot}
          onOpenAddMargin={onOpenAddMargin}
          onOpenRemoveMargin={onOpenRemoveMargin}
        />

        {isEDollarBot ? (
          <EDollarProfitGridRightSide
            bot={bot}
            onOpenAddCapacity={onOpenAddCapacity}
            onOpenWithdrawProfit={onOpenWithdrawProfit}
          />
        ) : (
          <ProfitGridRightSide
            bot={bot}
            onOpenAddCapacity={onOpenAddCapacity}
            onOpenWithdrawProfit={onOpenWithdrawProfit}
          />
        )}
      </div>

      {/* Métricas Secundárias (EUSD para eDollar Bot / USDT para USDT Bot) */}
      {isEDollarBot ? (
        <EDollarSecondaryMetricsGrid bot={bot} />
      ) : (
        <SecondaryMetricsGrid bot={bot} />
      )}
    </div>
  );
}