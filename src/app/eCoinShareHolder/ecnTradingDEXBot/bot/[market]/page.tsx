'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import MobileBar from '../../components/Mobile/MobileBar';
import PPPInfoModal from '../../components/PPPInfoModal';
import CSInfoModal from '../../components/CSInfoModal';

export default function MarketConfigPage({ params }: { params: { market: string } }) {
  const router = useRouter();
  const [showPPPInfo, setShowPPPInfo] = useState(false);
  const [showCSInfo, setShowCSInfo] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('10000');
  const [csAmount, setCsAmount] = useState('100');

  const handleCreateBot = () => {
    // Redireciona diretamente para a área de bots rodando em tempo real
    router.push('/eCoinShareHolder/ecnTradingDEXBot/runningBot');
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-xs text-gray-400 mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-yellow-400">E-Coin / USDT Bot</h1>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">● LIVE</span>
      </div>

      {/* Seção 1: Alocar PPP */}
      <div className="bg-[#12181F] border border-yellow-500/20 rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">1. Alocar PPP (Profit Participation Position)</span>
            <button onClick={() => setShowPPPInfo(true)} className="text-yellow-400 hover:text-yellow-300">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <label className="text-xs text-gray-400 block mb-1">E-Coin em Staking</label>
        <div className="relative mb-3">
          <input
            type="number"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2 text-sm font-bold text-yellow-400 focus:outline-none focus:border-yellow-500"
          />
          <span className="absolute right-3 top-2.5 text-xs font-bold text-gray-400">eCoin</span>
        </div>

        <div className="flex justify-between gap-2 mb-4">
          {['25%', '50%', '75%', '100%'].map((pct) => (
            <button key={pct} className="flex-1 py-1 bg-gray-800 text-xs text-gray-300 rounded-lg hover:bg-yellow-500/20">
              {pct}
            </button>
          ))}
        </div>

        <div className="bg-[#0B0E14] p-3 rounded-xl flex justify-between items-center text-xs">
          <div>
            <span className="text-gray-400 block">A tua participação no pool</span>
            <span className="text-emerald-400 font-bold text-sm">2.35%</span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block">Total do Pool</span>
            <span className="text-white font-semibold">425 000 eCoin</span>
          </div>
        </div>
      </div>

      {/* Seção 2: Buy Profit Capacity / CS */}
      <div className="bg-[#12181F] border border-emerald-500/20 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">2. Buy Profit Capacity (CS)</span>
            <button onClick={() => setShowCSInfo(true)} className="text-emerald-400 hover:text-emerald-300">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <button className="flex-1 py-1.5 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-xs font-bold">
            USDT
          </button>
          <button className="flex-1 py-1.5 bg-gray-800 border border-gray-700 text-gray-400 rounded-xl text-xs font-bold">
            eDollar
          </button>
        </div>

        <label className="text-xs text-gray-400 block mb-1">Valor do Commitment Seal</label>
        <input
          type="number"
          value={csAmount}
          onChange={(e) => setCsAmount(e.target.value)}
          className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2 text-sm font-bold text-emerald-400 focus:outline-none focus:border-emerald-500 mb-2"
        />

        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <div className="flex justify-between">
            <span>Capacidade Máxima (130%):</span>
            <span className="text-emerald-400 font-bold">130 USDT</span>
          </div>
          <p className="text-[10px] text-gray-500">100 USDT = 30 USDT (capacidade máxima de lucro)</p>
        </div>

        <button
          onClick={handleCreateBot}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-emerald-500/20"
        >
          Comprar CS & Activar Bot
        </button>
      </div>

      <PPPInfoModal isOpen={showPPPInfo} onClose={() => setShowPPPInfo(false)} />
      <CSInfoModal isOpen={showCSInfo} onClose={() => setShowCSInfo(false)} />
    
    </div>
  );
}