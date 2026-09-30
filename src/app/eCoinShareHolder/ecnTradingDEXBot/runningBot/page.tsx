'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useMiningStaking } from '@/hooks/useMiningStaking';
import { RunningBotItem } from '../types/ecnTrading';

import AddMarginModal from './components/AddMarginModal';
import AddCapacityModal from './components/AddCapacityModal';
import BotDetailsModal from './components/BotDetailsModal';
import UserShare from '../components/Metrics/UserShare';

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
  const [showCapacityModal, setShowCapacityModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsDefaultTab, setDetailsDefaultTab] = useState<'metrics' | 'history'>('metrics');

  const handleOpenMargin = (bot: RunningBotItem) => {
    setSelectedBot(bot);
    setShowMarginModal(true);
  };

  const handleOpenCapacity = (bot: RunningBotItem) => {
    setSelectedBot(bot);
    setShowCapacityModal(true);
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

      {/* Componente Visual da Participação no Pool (Donut Slice Solto) */}
      <div className="mb-6">
        <UserShare pppShare={Number(mining?.share ?? 0)} />
      </div>

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
            <div key={bot.id} className="bg-[#12181F] border border-gray-800 rounded-2xl p-4 shadow-lg hover:border-gray-700 transition">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-yellow-400">{bot.pair}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {bot.status}
                </span>
              </div>

              {/* Grid Principal do Robô: Capital de Trading (Branco) + Lucro Realizado (Verde) */}
              <div className="grid grid-cols-2 bg-[#0B0E14] rounded-xl overflow-hidden mb-3 border border-gray-800">
                {/* Lado Esquerdo: Capital / Margem */}
                <div className="p-3">
                  <span className="text-[10px] text-gray-400 block">Capital de Trading</span>
                  <span className="text-sm font-bold text-white block">{bot.capitalTrading}</span>
                  <span className="text-[10px] text-gray-500 block mb-2">{bot.capitalTradingUsd}</span>
                  <button
                    onClick={() => handleOpenMargin(bot)}
                    className="text-[10px] bg-yellow-500/20 text-yellow-400 font-bold px-2.5 py-1 rounded-lg hover:bg-yellow-500/30 border border-yellow-500/30 transition"
                  >
                    + Add Margin
                  </button>
                </div>

                {/* Lado Direito: Lucro Realizado (Profit) */}
                <div className="p-3 bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 border-l border-emerald-500/20">
                  <span className="text-[10px] text-emerald-300 block">Lucro Realizado (Profit)</span>
                  <span className="text-sm font-extrabold text-emerald-400 block">{bot.lucroRealizado}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block mb-2">({bot.lucroRealizadoPercent})</span>
                  <button
                    onClick={() => handleOpenCapacity(bot)}
                    className="text-[10px] bg-emerald-500 text-black font-extrabold px-2.5 py-1 rounded-lg hover:bg-emerald-400 shadow-sm transition"
                  >
                    + Add Capacity
                  </button>
                </div>
              </div>

              {/* Métricas Secundárias */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-gray-800/80">
                  <span className="text-gray-400 text-[10px] block">Lucro Não Realizado:</span>
                  <span className="text-emerald-400 font-semibold block">{bot.lucroNaoRealizado} ({bot.lucroNaoRealizadoPercent})</span>
                </div>
                <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-gray-800/80 text-right">
                  <span className="text-gray-400 text-[10px] block">Pool Share:</span>
                  <span className="text-yellow-400 font-semibold block">
                    {mining?.share ? `${mining.share.toFixed(2)}%` : bot.poolShare}
                  </span>
                </div>
              </div>

              {/* Botões de Ação para Detalhes e Histórico */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenDetails(bot, 'metrics')}
                  className="flex-1 py-2 bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl hover:bg-gray-700 transition"
                >
                  Detalhes
                </button>
                <button
                  onClick={() => handleOpenDetails(bot, 'history')}
                  className="flex-1 py-2 bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl hover:bg-gray-700 transition"
                >
                  Histórico
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modais On-Chain */}
      {selectedBot && (
        <>
          <AddMarginModal
            isOpen={showMarginModal}
            onClose={() => setShowMarginModal(false)}
            pairName={selectedBot.pair}
          />
          <AddCapacityModal
            isOpen={showCapacityModal}
            onClose={() => setShowCapacityModal(false)}
            pairName={selectedBot.pair}
          />
          <BotDetailsModal
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            pairName={selectedBot.pair}
            initialTab={detailsDefaultTab}
          />
        </>
      )}
    </div>
  );
}