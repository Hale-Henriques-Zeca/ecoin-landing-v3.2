'use client';

import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function OfficialAssetsList() {
  const officialAssets = [
    { symbol: 'BNB', name: 'BNB Chain Native', balance: '0.245', valueUsd: '$142.10', icon: '🟡', isNative: true },
    { symbol: 'USDT', name: 'Tether USD (BEP-20)', balance: '150.00', valueUsd: '$150.00', icon: '💵', fee: '1% Protocol Fee' },
    { symbol: 'EUSD', name: 'eDollar Stablecoin', balance: '80.00', valueUsd: '$80.00', icon: '🟢', fee: '1% Protocol Fee' },
    { symbol: 'ECOIN', name: 'eCoin Protocol Token', balance: '25,000.00', valueUsd: '$1,250.00', icon: '⚡', fee: '1% Protocol Fee' },
  ];

  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 font-mono space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <h3 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
          <ShieldCheck size={16} className="text-[#00FF9C]" /> Ativos Oficiais do Ecossistema (4)
        </h3>
        <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded font-bold">
          Auto-Registrados
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {officialAssets.map((asset) => (
          <div key={asset.symbol} className="bg-black/40 border border-white/5 p-4 rounded-xl flex justify-between items-center hover:border-white/20 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{asset.icon}</span>
              <div>
                <span className="text-sm font-bold text-white block">{asset.symbol}</span>
                <span className="text-[10px] text-neutral-500">{asset.name}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-white block">{asset.balance}</span>
              <span className="text-[10px] text-[#00FF9C] font-bold">{asset.valueUsd}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}