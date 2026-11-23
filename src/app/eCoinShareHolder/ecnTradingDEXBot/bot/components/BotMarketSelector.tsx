'use client';

import React, { useState } from 'react';
import EcoinBotCard from './EcoinBotCard';
import BuyBackBotCard from './BuyBackBotCard';
import EDollarBotCard from './EDollarBotCard';
import EcoinUSDTBotCard from './USDTBotCard';

type MarketFilter = 'ALL' | 'ECOIN' | 'EDOLLAR' | 'USDT';

export default function BotMarketSelector() {
  const [filter, setFilter] = useState<MarketFilter>('ALL');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'ALL', label: 'Todos os Mercados' },
          { id: 'ECOIN', label: 'eCoin & BuyBack' },
          { id: 'EDOLLAR', label: 'eDollar (E-USD)' },
          { id: 'USDT', label: 'USDT (Stable)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id as MarketFilter)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              filter === tab.id
                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                : 'bg-[#12181F] text-gray-400 border-gray-800 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* 1. eCoin */}
        {(filter === 'ALL' || filter === 'ECOIN') && (
          <EcoinBotCard
            id="ecoin-usdt"
            pair="E-COIN / USDT"
            description="Arbitragem algorítmica exclusiva em eCoin com capacidade CS em eCoin."
            icon="👑"
            isHot
          />
        )}

        {/* 2. BuyBack (Alinhado com eCoin) */}
        {(filter === 'ALL' || filter === 'ECOIN') && (
          <BuyBackBotCard
            id="buyback-ecoin"
            pair="BUYBACK / E-COIN"
            description="Motor inteligente de recompra e sustentação de liquidez com capacidade CS em eCoin."
            icon="🔄"
            isHot
          />
        )}

        {/* 3. eDollar */}
        {(filter === 'ALL' || filter === 'EDOLLAR') && (
          <EDollarBotCard
            id="edollar-usdt"
            pair="E-USD / USDT"
            description="Liquidez sintética eDollar com teto de lucro CS em E-USD."
            icon="💠"
            isHot
          />
        )}

        {/* 4. USDT */}
        {(filter === 'ALL' || filter === 'USDT') && (
          <EcoinUSDTBotCard
            id="usdt-eusd"
            pair="USDT / E-USD"
            description="Execução de alta frequência em paridade dólar com selo CS em USDT."
            icon="💵"
            isHot
          />
        )}
      </div>
    </div>
  );
}