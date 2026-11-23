'use client';

import Link from 'next/link';

const markets = [
  {
    id: 'eCoinBot',
    pair: 'eCoin Bot',
    desc: 'Trade eCoin com IA & Staking Exclusivo eCoin',
    icon: '⚡',
    ecosystem: 'ECOIN' as const,
    badge: 'ECOIN',
  },
  {
    id: 'buybackBot',
    pair: 'BuyBack Bot',
    desc: 'Pool de Recompra & Liquidez Nativa E-Coin',
    icon: '🪙',
    ecosystem: 'ECOIN' as const,
    badge: 'BUYBACK',
  },
  {
    id: 'usdtBot',
    pair: 'USDT Bot',
    desc: 'Trade USDT com IA & DEX Stable Liquidity',
    icon: '₮',
    ecosystem: 'USDT' as const,
    badge: 'USDT',
  },
  {
    id: 'eDollarBot',
    pair: 'eDollar Bot',
    desc: 'Trade eDollar (E-USD) & Stablecoin Liquidity',
    icon: '$',
    ecosystem: 'EDOLLAR' as const,
    badge: 'E-USD',
  },
];

export default function BotPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#D4AF37]">E-Coin Profit Position</h1>
        <p className="text-xs text-gray-400 mt-1">
          Activate your profit position with AI trading robots and share real results.
        </p>
      </div>

      <div className="bg-gradient-to-r from-[#D4AF37]/15 via-amber-950/30 to-emerald-900/20 border border-[#D4AF37]/25 rounded-2xl p-4 mb-6">
        <h2 className="text-base font-semibold text-[#D4AF37]">Stake. Trade. Earn. Grow.</h2>
        <p className="text-xs text-gray-300 mt-1">
          Selecione o mercado desejado para alocar a sua Margem de Lucros (PM) e adquirir Capacidade de Lucros (CS).
        </p>
      </div>

      <h3 className="text-sm font-semibold text-gray-300 mb-3">Select Your Trading Market</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {markets.map((m) => {
          const isECoin = m.ecosystem === 'ECOIN';
          const isEDollar = m.ecosystem === 'EDOLLAR';

          const cardBorder = isECoin
            ? 'border-[#D4AF37]/25 hover:border-[#D4AF37]/50'
            : isEDollar
            ? 'border-blue-500/25 hover:border-blue-500/50'
            : 'border-emerald-500/25 hover:border-emerald-500/50';

          const badgeStyle = isECoin
            ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
            : isEDollar
            ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
            : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';

          const buttonStyle = isECoin
            ? 'bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border-[#D4AF37]/40'
            : isEDollar
            ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/30'
            : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30';

          return (
            <div
              key={m.id}
              className={`bg-[#12181F] border ${cardBorder} rounded-2xl p-4 flex flex-col justify-between transition`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{m.icon}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${badgeStyle}`}
                  >
                    {m.badge}
                  </span>
                </div>
                <div className={`text-sm font-bold ${isECoin ? 'text-[#D4AF37]' : 'text-white'}`}>
                  {m.pair}
                </div>
                <div className="text-[11px] text-gray-400 mt-1 leading-tight">{m.desc}</div>
              </div>

              <Link
                href={`/eCoinShareHolder/ecnTradingDEXBot/bot/${m.id}`}
                className={`mt-4 block text-center py-2 border rounded-xl text-xs font-bold transition ${buttonStyle}`}
              >
                Configurar &amp; Activar &gt;
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}