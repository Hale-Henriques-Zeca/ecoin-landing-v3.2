'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useMiningStaking } from '@/hooks/useMiningStaking';
import { RunningBotItem } from '../types/ecnTrading';

import AddMarginModal from './components/AddMarginModal';
import RemoveMarginModal from './components/RemoveMarginModal';
import AddCapacityModal from './components/AddCapacityModal';
import WithdrawProfitModal from './components/WithdrawProfitModal';
import BotDetailsModal from './components/BotDetailsModal';
import BotCapitalProfitGrid from './components/BotCapitalProfitGrid';

const initialBots: RunningBotItem[] = [
  {
    id: '1',
    pair: 'E-Coin/E-Coin',
    status: 'LIVE',
    capitalTrading: '100 BNB',
    capitalTradingUsd: '≈ $58 240',
    lucroRealizado: '+5.42 BNB',
    lucroRealizadoPercent: '+5.42%',
    lucroNaoRealizado: '+1.21 BNB',
    lucroNaoRealizadoPercent: '+1.21%',
    poolShare: '2.35%',
    capacityRemaining: 85,
  },
  {
    id: '2',
    pair: 'E-Coin/USDT',
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
];

export default function RunningBotPage() {
  const { isConnected } = useAccount();
  const mining = useMiningStaking();

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

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      {/* Cabeçalho de Navegação */}
      <h1 className="text-xl font-bold text-yellow-400 mb-1">Meus Robôs Ativos</h1>
      <p className="text-xs text-gray-400 mb-5">
        Acompanhe a performance em tempo real, gerencie margens e expanda sua capacidade de lucro.
      </p>

      {/* Seletor de Tabs (LIVE / STOPPED) */}
      <div className="flex gap-2 border-b border-gray-800 pb-2 mb-4">
        <button
          onClick={() => setActiveTab('LIVE')}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
            activeTab === 'LIVE'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Robôs Em Execução ({initialBots.filter((b) => b.status === 'LIVE').length})
        </button>
        <button
          onClick={() => setActiveTab('STOPPED')}
          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
            activeTab === 'STOPPED'
              ? 'bg-gray-800 text-yellow-400 border border-gray-700'
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
          .map((bot) => (
            <div
              key={bot.id}
              className="bg-[#12181F] border border-gray-800 rounded-2xl p-4 shadow-lg hover:border-gray-700 transition"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-yellow-400">{bot.pair}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {bot.status}
                </span>
              </div>

              {/* Grid Modular de Capital, Lucro e Métricas */}
              <BotCapitalProfitGrid
                bot={bot}
                onOpenAddMargin={handleOpenMargin}
                onOpenRemoveMargin={handleOpenRemoveMargin}
                onOpenAddCapacity={handleOpenCapacity}
                onOpenWithdrawProfit={handleOpenWithdrawProfit}
              />

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
          ))}
      </div>

      {/* Rendering dos Modais */}
      <AddMarginModal
        bot={selectedBot}
        isOpen={showMarginModal}
        onClose={() => setShowMarginModal(false)}
      />
      <RemoveMarginModal
        bot={selectedBot}
        isOpen={showRemoveMarginModal}
        onClose={() => setShowRemoveMarginModal(false)}
      />
      <AddCapacityModal
        bot={selectedBot}
        isOpen={showCapacityModal}
        onClose={() => setShowCapacityModal(false)}
      />
      <WithdrawProfitModal
        bot={selectedBot}
        isOpen={showWithdrawProfitModal}
        onClose={() => setShowWithdrawProfitModal(false)}
      />
      <BotDetailsModal
        bot={selectedBot}
        isOpen={showDetailsModal}
        defaultTab={detailsDefaultTab}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
}