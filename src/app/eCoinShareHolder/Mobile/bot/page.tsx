'use client';

import Link from 'next/link';
import MobileBar from '../components/MobileBar';

const markets = [
  { id: 'ecoin-bnb', pair: 'E-Coin / BNB', desc: 'Trade BNB com IA & Staking', icon: '⚡' },
  { id: 'ecoin-usdt', pair: 'E-Coin / USDT', desc: 'Trade USDT com IA & DEX/CEX', icon: '₮' },
  { id: 'ecoin-edollar', pair: 'E-Coin / eDollar', desc: 'Trade eDollar & Stablecoin Liquidity', icon: '$' },
  { id: 'ecoin-ecoin', pair: 'E-Coin / E-Coin', desc: 'Pool de Recompensa Nativa E-Coin', icon: '🪙' },
];

export default function BotPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-yellow-400">E-Coin Profit Position</h1>
        <p className="text-xs text-gray-400 mt-1">Activate your profit position with AI trading robots and share real results.</p>
      </div>

      <div className="bg-gradient-to-r from-emerald-900/40 to-yellow-900/20 border border-emerald-500/20 rounded-2xl p-4 mb-6">
        <h2 className="text-base font-semibold text-emerald-400">Stake. Trade. Earn. Grow.</h2>
        <p className="text-xs text-gray-300 mt-1">Selecione o mercado desejado para alocar PPP e adquirir Profit Capacity (CS).</p>
      </div>

      <h3 className="text-sm font-semibold text-gray-300 mb-3">Select Your Trading Market</h3>

      <div className="grid grid-cols-2 gap-3">
        {markets.map((m) => (
          <div key={m.id} className="bg-[#12181F] border border-gray-800 rounded-xl p-3 flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-sm font-bold text-white">{m.pair}</div>
              <div className="text-[11px] text-gray-400 mt-1 leading-tight">{m.desc}</div>
            </div>
            <Link
              href={`/eCoinShareHolder/Mobile/bot/${m.id}`}
              className="mt-4 block text-center py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold"
            >
              Acessar &gt;
            </Link>
          </div>
        ))}
      </div>

      <MobileBar />
    </div>
  );
}