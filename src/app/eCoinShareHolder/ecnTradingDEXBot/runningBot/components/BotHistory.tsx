'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function BotHistory() {
  const transactions = [
    { id: 1, type: 'BUY', pair: 'E-Coin/USDT', price: '$0.582', amount: '1 200 eCoin', time: 'Há 2 min', status: 'SUCESSO' },
    { id: 2, type: 'SELL', pair: 'E-Coin/USDT', price: '$0.589', amount: '1 200 eCoin', time: 'Há 8 min', status: 'SUCESSO' },
    { id: 3, type: 'BUY', pair: 'E-Coin/USDT', price: '$0.579', amount: '2 500 eCoin', time: 'Há 15 min', status: 'SUCESSO' },
  ];

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div key={tx.id} className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${tx.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {tx.type === 'BUY' ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
            </div>
            <div>
              <span className="font-bold text-white block">{tx.type} — {tx.pair}</span>
              <span className="text-[10px] text-gray-400">{tx.time} @ {tx.price}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-white font-bold block">{tx.amount}</span>
            <span className="text-[10px] text-emerald-400">{tx.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}