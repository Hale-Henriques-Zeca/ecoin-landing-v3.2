'use client';

import { useState } from 'react';
import { RunningBotItem } from '../types/ecnTrading';

// Componentes e Modais exclusivos eCoin & BuyBack
import ECoinAddMarginModal from './components/eCoin/AddMarginModal';
import ECoinRemoveMarginModal from './components/eCoin/RemoveMarginModal';
import ECoinAddCapacityModal from './components/eCoin/AddCapacityModal';
import ECoinWithdrawProfitModal from './components/eCoin/WithdrawProfitModal';
import ECoinBotDetailsModal from './components/eCoin/BotDetailsModal';
import ECoinBotCapitalProfitGrid from './components/eCoin/BotCapitalProfitGrid';

// Componentes e Modais exclusivos USDT & eDollar
import EDollarAddMarginModal from './components/eDollar/AddMarginModal';
import EDollarRemoveMarginModal from './components/eDollar/RemoveMarginModal';
import EDollarAddCapacityModal from './components/eDollar/AddCapacityModal';
import EDollarWithdrawProfitModal from './components/eDollar/WithdrawProfitModal';
import EDollarBotDetailsModal from './components/eDollar/BotDetailsModal';
import EDollarBotCapitalProfitGrid from './components/eDollar/BotCapitalProfitGrid';

const initialBots: RunningBotItem[] = [
  {
    id: '1',
    pair: 'E-Coin Bot',
    status: 'LIVE',
    capitalTrading: '100 E-Coin',
    capitalTradingUsd: 'Exclusivo eCoin Pool',
    lucroRealizado: '+5.42 E-Coin',
    lucroRealizadoPercent: '+5.42%',
    lucroNaoRealizado: '+1.21 E-Coin',
    lucroNaoRealizadoPercent: '+1.21%',
    poolShare: '2.35%',
    capacityRemaining: 85,
  },
  {
    id: '2',
    pair: 'BuyBack Bot',
    status: 'LIVE',
    capitalTrading: '100 E-Coin',
    capitalTradingUsd: 'Liquidez Nativa eCoin',
    lucroRealizado: '+5.93 E-Coin',
    lucroRealizadoPercent: '+5.93%',
    lucroNaoRealizado: '+0.84 E-Coin',
    lucroNaoRealizadoPercent: '+0.84%',
    poolShare: '3.12%',
    capacityRemaining: 75,
  },
  {
    id: '3',
    pair: 'USDT Bot',
    status: 'LIVE',
    capitalTrading: '$100 000',
    capitalTradingUsd: '$100 000',
    lucroRealizado: '+$5 931',
    lucroRealizadoPercent: '+5.93%',
    lucroNaoRealizado: '+$842',
    lucroNaoRealizadoPercent: '+0.84%',
    poolShare: '3.12%',
    capacityRemaining: 40,
  },
  {
    id: '4',
    pair: 'eDollar Bot',
    status: 'LIVE',
    capitalTrading: '$100 000',
    capitalTradingUsd: '$100 000',
    lucroRealizado: '+12.45 EUSD',
    lucroRealizadoPercent: '+12.45%',
    lucroNaoRealizado: '+0.84 EUSD',
    lucroNaoRealizadoPercent: '+0.84%',
    poolShare: '3.12%',
    capacityRemaining: 40,
  },
];

function isECoinEcosystemBot(bot: RunningBotItem | null): boolean {
  if (!bot) return false;
  const label = bot.pair.toLowerCase();
  return label.includes('e-coin') || label.includes('ecoin') || label.includes('buyback');
}

function isEDollarBotItem(bot: RunningBotItem): boolean {
  const label = bot.pair.toLowerCase();
  return label.includes('edollar') || label.includes('e-usd');
}

export default function RunningBotPage() {
  const [activeTab, setActiveTab] = useState<'LIVE' | 'STOPPED'>('LIVE');

  // Modais de Gestão
  const [selectedBot, setSelectedBot] = useState<RunningBotItem | null>(null);
  const [showMarginModal, setShowMarginModal] = useState(false);
  const [showRemoveMarginModal, setShowRemoveMarginModal] = useState(false);
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [showWithdrawProfitModal, setShowWithdrawProfitModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsDefaultTab, setDetailsDefaultTab] = useState<'metrics' | 'history'>('metrics');

  const handleOpenMargin = (bot: RunningBotItem) => {
    setSelectedBot(bot);
    setShowMarginModal(true);
  };

  const handleOpenRemoveMargin = (bot: RunningBotItem) => {
    setSelectedBot(bot);
    setShowRemoveMarginModal(true);
  };

  const handleOpenCapacity = (bot: RunningBotItem) => {
    setSelectedBot(bot);
    setShowCapacityModal(true);
  };

  const handleOpenWithdrawProfit = (bot: RunningBotItem) => {
    setSelectedBot(bot);
    setShowWithdrawProfitModal(true);
  };

  const handleOpenDetails = (bot: RunningBotItem, defaultTab: 'metrics' | 'history') => {
    setSelectedBot(bot);
    setDetailsDefaultTab(defaultTab);
    setShowDetailsModal(true);
  };

  const isSelectedECoin = isECoinEcosystemBot(selectedBot);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      {/* Cabeçalho de Navegação */}
      <h1 className="text-xl font-bold text-[#D4AF37] mb-1">Meus Robôs Ativos</h1>
      <p className="text-xs text-gray-400 mb-5">
        Acompanhe a performance em tempo real, gerencie margens e expanda sua capacidade de lucro.
      </p>

      {/* Seletor de Tabs (LIVE / STOPPED) */}
      <div className="flex gap-2 border-b border-gray-800 pb-2 mb-4">
        <button
          onClick={() => setActiveTab('LIVE')}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
            activeTab === 'LIVE'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Robôs Em Execução ({initialBots.filter((b) => b.status === 'LIVE').length})
        </button>
        <button
          onClick={() => setActiveTab('STOPPED')}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
            activeTab === 'STOPPED'
              ? 'bg-gray-800 text-[#D4AF37] border border-gray-700'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Parados / Finalizados (0)
        </button>
      </div>

      {/* Lista de Cartões dos Bots */}
      <div className="space-y-4">
        {initialBots
          .filter((b) => b.status === activeTab)
          .map((bot) => {
            const isECoinBot = isECoinEcosystemBot(bot);
            const isEDollarBot = isEDollarBotItem(bot);

            const cardBorderClass = isECoinBot
              ? 'border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
              : isEDollarBot
              ? 'border-blue-500/25 hover:border-blue-500/50'
              : 'border-gray-800 hover:border-emerald-500/40';

            const badgeClass = isECoinBot
              ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
              : isEDollarBot
              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

            const badgeLabel = isECoinBot
              ? 'ECOIN POOL'
              : isEDollarBot
              ? 'EDOLLAR • E-USD'
              : 'STABLE • USDT';

            return (
              <div
                key={bot.id}
                className={`bg-[#12181F] border rounded-2xl p-4 shadow-lg transition ${cardBorderClass}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold text-sm ${
                        isEDollarBot ? 'text-blue-400' : 'text-[#D4AF37]'
                      }`}
                    >
                      {bot.pair}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}
                    >
                      {badgeLabel}
                    </span>
                  </div>

                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {bot.status}
                  </span>
                </div>

                {/* Grid Modular Isolado por Ecossistema */}
                {isECoinBot ? (
                  <ECoinBotCapitalProfitGrid
                    bot={bot}
                    onOpenAddMargin={handleOpenMargin}
                    onOpenRemoveMargin={handleOpenRemoveMargin}
                    onOpenAddCapacity={handleOpenCapacity}
                    onOpenWithdrawProfit={handleOpenWithdrawProfit}
                  />
                ) : (
                  <EDollarBotCapitalProfitGrid
                    bot={bot}
                    onOpenAddMargin={handleOpenMargin}
                    onOpenRemoveMargin={handleOpenRemoveMargin}
                    onOpenAddCapacity={handleOpenCapacity}
                    onOpenWithdrawProfit={handleOpenWithdrawProfit}
                  />
                )}

                {/* Detalhes & Histórico */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                  <button
                    onClick={() => handleOpenDetails(bot, 'metrics')}
                    className="py-2 bg-gray-800/80 text-gray-300 rounded-xl hover:bg-gray-700 transition font-bold cursor-pointer"
                  >
                    Detalhes
                  </button>
                  <button
                    onClick={() => handleOpenDetails(bot, 'history')}
                    className="py-2 bg-gray-800/80 text-gray-300 rounded-xl hover:bg-gray-700 transition font-bold cursor-pointer"
                  >
                    Histórico
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Modais Dedicados ao Ecossistema eCoin / BuyBack */}
      {isSelectedECoin ? (
        <>
          <ECoinAddMarginModal
            bot={selectedBot}
            isOpen={showMarginModal}
            onClose={() => setShowMarginModal(false)}
          />
          <ECoinRemoveMarginModal
            bot={selectedBot}
            isOpen={showRemoveMarginModal}
            onClose={() => setShowRemoveMarginModal(false)}
          />
          <ECoinAddCapacityModal
            bot={selectedBot}
            isOpen={showCapacityModal}
            onClose={() => setShowCapacityModal(false)}
          />
          <ECoinWithdrawProfitModal
            bot={selectedBot}
            isOpen={showWithdrawProfitModal}
            onClose={() => setShowWithdrawProfitModal(false)}
          />
          <ECoinBotDetailsModal
            bot={selectedBot}
            isOpen={showDetailsModal}
            defaultTab={detailsDefaultTab}
            onClose={() => setShowDetailsModal(false)}
          />
        </>
      ) : (
        /* Modais Dedicados ao Ecossistema USDT / eDollar */
        <>
          <EDollarAddMarginModal
            bot={selectedBot}
            pairName={selectedBot?.pair ?? ''}
            isOpen={showMarginModal}
            onClose={() => setShowMarginModal(false)}
          />
          <EDollarRemoveMarginModal
            bot={selectedBot}
            isOpen={showRemoveMarginModal}
            onClose={() => setShowRemoveMarginModal(false)}
          />
          <EDollarAddCapacityModal
            bot={selectedBot}
            pairName={selectedBot?.pair ?? ''}
            isOpen={showCapacityModal}
            onClose={() => setShowCapacityModal(false)}
          />
          <EDollarWithdrawProfitModal
            bot={selectedBot}
            isOpen={showWithdrawProfitModal}
            onClose={() => setShowWithdrawProfitModal(false)}
          />
          <EDollarBotDetailsModal
            bot={selectedBot}
            pairName={selectedBot?.pair ?? ''}
            isOpen={showDetailsModal}
            initialTab={detailsDefaultTab}
            defaultTab={detailsDefaultTab}
            onClose={() => setShowDetailsModal(false)}
          />
        </>
      )}
    </div>
  );
}