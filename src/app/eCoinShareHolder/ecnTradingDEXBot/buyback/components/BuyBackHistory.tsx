'use client';

import React from 'react';
import { History, ExternalLink, Flame } from 'lucide-react';

export default function BuyBackHistory() {
  const transactions = [
    { id: '1', hash: '0x3a8...e412', amount: '12,500 eCoin', usdt: '$4,375.00', time: 'Há 12 min' },
    { id: '2', hash: '0x9b1...c890', amount: '25,000 eCoin', usdt: '$8,750.00', time: 'Há 45 min' },
    { id: '3', hash: '0x7e4...f102', amount: '8,000 eCoin', usdt: '$2,800.00', time: 'Há 2h' },
  ];

  return (
    <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <History className="w-4 h-4 text-[#D4AF37]" />
          Histórico de Queima & Recompra
        </h3>
      </div>

      <div className="space-y-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-[#0B0E14] p-2.5 rounded-xl border border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">{tx.amount}</span>
                <span className="text-[10px] text-gray-400 font-mono">{tx.hash}</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#00FF9C] block">{tx.usdt}</span>
              <span className="text-[10px] text-gray-500">{tx.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}