'use client';

import React from 'react';
import { Coins, ArrowUpRight, Search, TrendingUp, TrendingDown } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function AssetsPage() {
  const assets = [
    { name: 'eCoin', symbol: 'ECOIN', balance: '752,420.50', fiat: '$7,524.20', price: '$0.010', change: '+14.85%', up: true },
    { name: 'eDollar', symbol: 'EUSD', balance: '3,762.10', fiat: '$3,762.10', price: '$1.00', change: '0.00%', up: true },
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.145000', fiat: '$9,425.00', price: '$65,000.00', change: '+3.20%', up: true },
    { name: 'Ethereum', symbol: 'ETH', balance: '1.620000', fiat: '$5,670.00', price: '$3,500.00', change: '-1.45%', up: false },
    { name: 'Binance Coin', symbol: 'BNB', balance: '5.400000', fiat: '$3,132.00', price: '$580.00', change: '+0.85%', up: true },
    { name: 'Tether', symbol: 'USDT', balance: '145.00', fiat: '$145.00', price: '$1.00', change: '-0.05%', up: false },
  ];

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Carteira de Ativos" subtitle="Gestão global do seu portfólio digital" />
        
        <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
          {/* Top Actions */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Pesquisar token..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/50"
              />
            </div>
            <div className="text-right w-full md:w-auto">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">Balanço Estimado</span>
              <span className="text-xl font-mono font-black text-white">$29,658.30 <span className="text-xs text-[#D4AF37]">USD</span></span>
            </div>
          </div>

          {/* Table list */}
          <div className="flex flex-col gap-2">
            {assets.map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between p-4 bg-white/[0.01] border border-white/[0.02] hover:border-white/10 rounded-xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#D4AF37]">
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{asset.name}</span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">{asset.symbol}</span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center">
                  <span className="font-mono text-xs font-bold text-white">{asset.price}</span>
                  <span className={`inline-flex items-center gap-0.5 font-mono text-[10px] ${asset.up ? 'text-[#00FF9C]' : 'text-red-400'}`}>
                    {asset.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {asset.change}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-black text-white block">{asset.balance}</span>
                  <span className="font-mono text-[10px] text-neutral-500">{asset.fiat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}