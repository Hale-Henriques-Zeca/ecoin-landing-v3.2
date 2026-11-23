'use client';

import React, { useState } from 'react';
import { Coins, DollarSign } from 'lucide-react';

// Componentes alinhados ao Ecossistema eCoin & BuyBack
import ECoinUserStaking from './eCoin/UserStaking';
import ECoinUserShare from './eCoin/UserShare';
import ECoinUserProfitCapacity from './eCoin/UserProfitCapacity';

// Componentes partilhados do Ecossistema eDollar & USDT
import EDollarUserStaking from './eDollar/UserStaking';
import EDollarUserShare from './eDollar/UserShare';
import EDollarUserProfitCapacity from './eDollar/UserProfitCapacity';

type EcosystemMode = 'ECOIN' | 'EDOLLAR';
type StableSymbolicMode = 'EDOLLAR' | 'USDT';

export default function Metrics() {
  const [ecosystem, setEcosystem] = useState<EcosystemMode>('ECOIN');
  const [stableSymbol, setStableSymbol] = useState<StableSymbolicMode>('EDOLLAR');

  const isECoin = ecosystem === 'ECOIN';

  return (
    <section className="rounded-3xl border border-gray-800/90 bg-[#0B0E14]/70 backdrop-blur-xl p-4 md:p-5 space-y-4 shadow-2xl">
      {/* Barra de Switch entre Ecossistemas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-800/80">
        {/* Switch Principal: eCoin vs eDollar/USDT */}
        <div className="inline-flex p-1 rounded-2xl bg-[#12181F] border border-gray-800 self-start">
          <button
            type="button"
            onClick={() => setEcosystem('ECOIN')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              isECoin
                ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black shadow-md shadow-[#D4AF37]/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Ecossistema eCoin</span>
          </button>

          <button
            type="button"
            onClick={() => setEcosystem('EDOLLAR')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              !isECoin
                ? 'bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Ecossistema eDollar / USDT</span>
          </button>
        </div>

        {/* Distinção Simbólica à Direita */}
        {isECoin ? (
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
              ⚡ eCoin Bot &amp; BuyBack Bot
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-[10px] text-gray-500 uppercase mr-1 hidden md:inline">
              Modo Simbólico:
            </span>
            <button
              type="button"
              onClick={() => setStableSymbol('EDOLLAR')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer ${
                stableSymbol === 'EDOLLAR'
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                  : 'bg-[#12181F] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              $ eDollar (E-USD)
            </button>
            <button
              type="button"
              onClick={() => setStableSymbol('USDT')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition cursor-pointer ${
                stableSymbol === 'USDT'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-[#12181F] text-gray-400 border-gray-800 hover:text-white'
              }`}
            >
              ₮ USDT Stable
            </button>
          </div>
        )}
      </div>

      {/* Renderização Condicional dos Métricos */}
      {isECoin ? (
        <>
          <ECoinUserStaking />

          <div className="pt-2 border-t border-gray-800/80 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ECoinUserShare />
            <ECoinUserProfitCapacity />
          </div>
        </>
      ) : (
        <>
          <EDollarUserStaking />

          <div className="pt-2 border-t border-gray-800/80 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <EDollarUserShare />
            <EDollarUserProfitCapacity />
          </div>
        </>
      )}
    </section>
  );
}