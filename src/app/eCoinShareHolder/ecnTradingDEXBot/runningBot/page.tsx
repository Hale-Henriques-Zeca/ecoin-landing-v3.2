'use client';

import { useState } from 'react';
import MobileBar from '../components/Mobile/MobileBar';
import { RunningBotItem } from '../types/ecnTrading';
import CSInfoModal from '../components/CSInfoModal';

const initialBots: RunningBotItem[] = [
  {
    id: '1',
    pair: 'E-Coin/BNB',
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
  const [activeTab, setActiveTab] = useState<'LIVE' | 'STOPPED'>('LIVE');
  const [showAddCapacityModal, setShowAddCapacityModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold text-yellow-400 mb-1">Meus Robôs</h1>
      <p className="text-xs text-gray-400 mb-4">Acompanhe o desempenho em tempo real dos bots ativos.</p>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800 pb-2 mb-4">
        <button
          onClick={() => setActiveTab('LIVE')}
          className={`text-xs font-bold px-3 py-1 rounded-lg ${
            activeTab === 'LIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-gray-400'
          }`}
        >
          Todos ({initialBots.filter(b => b.status === 'LIVE').length})
        </button>
        <button
          onClick={() => setActiveTab('STOPPED')}
          className={`text-xs font-bold px-3 py-1 rounded-lg ${
            activeTab === 'STOPPED' ? 'bg-gray-800 text-yellow-400' : 'text-gray-400'
          }`}
        >
          Parados / Finalizados (0)
        </button>
      </div>

      {/* Cartões dos Bots */}
      <div className="space-y-4">
        {initialBots
          .filter((b) => b.status === activeTab)
          .map((bot) => (
            <div key={bot.id} className="bg-[#12181F] border border-gray-800 rounded-2xl p-4 shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-sm text-yellow-400">{bot.pair}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full">
                  ● {bot.status}
                </span>
              </div>

              {/* Layout Estilo Pionex: Investment (Branco) & Total Profit (Verde) */}
              <div className="grid grid-cols-2 bg-[#0B0E14] rounded-xl overflow-hidden mb-3 border border-gray-800">
                <div className="p-3">
                  <span className="text-[10px] text-gray-400 block">Capital de Trading</span>
                  <span className="text-sm font-bold text-white">{bot.capitalTrading}</span>
                  <span className="text-[10px] text-gray-500 block">{bot.capitalTradingUsd}</span>
                  <button
                    onClick={() => setShowAddCapacityModal(true)}
                    className="mt-2 text-[10px] bg-yellow-500/20 text-yellow-400 font-bold px-2 py-1 rounded hover:bg-yellow-500/30 border border-yellow-500/30"
                  >
                    + Add Margin
                  </button>
                </div>
                <div className="p-3 bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 border-l border-emerald-500/20">
                  <span className="text-[10px] text-emerald-300 block">Lucro Realizado (Profit)</span>
                  <span className="text-sm font-extrabold text-emerald-400">{bot.lucroRealizado}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold block">({bot.lucroRealizadoPercent})</span>
                  <button
                    onClick={() => setShowAddCapacityModal(true)}
                    className="mt-2 text-[10px] bg-emerald-500 text-black font-extrabold px-2 py-1 rounded hover:bg-emerald-400 shadow-sm"
                  >
                    + Add Capacity
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-gray-400 text-[11px]">Lucro Não Realizado:</span>
                  <span className="text-emerald-400 font-semibold block">{bot.lucroNaoRealizado} ({bot.lucroNaoRealizadoPercent})</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 text-[11px]">Pool Share:</span>
                  <span className="text-yellow-400 font-semibold block">{bot.poolShare}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-gray-800 text-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-700">
                  Detalhes
                </button>
                <button className="flex-1 py-1.5 bg-gray-800 text-gray-200 text-xs font-semibold rounded-lg hover:bg-gray-700">
                  Histórico
                </button>
              </div>
            </div>
          ))}
      </div>

      <CSInfoModal isOpen={showAddCapacityModal} onClose={() => setShowAddCapacityModal(false)} />
    </div>
  );
}