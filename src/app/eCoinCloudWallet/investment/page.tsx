'use client';

import React from 'react';
import { Cpu, Bot, TrendingUp, ChevronRight } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function InvestmentPage() {
  const products = [
    { name: 'Cloud Mining Vault V2', type: 'Mineração Alocada', apy: '18.5% APY', status: 'Ativo', icon: Cpu, reward: 'USDT' },
    { name: 'AI Arbitrage Engine Bybit/Binance', type: 'Trading Algorítmico', apy: '32.4% APY', status: 'Ativo', icon: Bot, reward: 'EUSD & USDT' },
    { name: 'Liquid Staking Hub', type: 'Validação de Rede', apy: '8.2% APY', status: 'Disponível', icon: TrendingUp, reward: 'eCoin' },
  ];

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Módulos de Investimento" subtitle="Potencialize o rendimento passivo do seu ecossistema digital" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {products.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.name} className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-[#D4AF37]">
                      <IconComponent size={18} />
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20">
                      {item.apy}
                    </span>
                  </div>

                  <h3 className="text-xs font-black text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wide mt-0.5">{item.type}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase">Recompensa em: <b className="text-white">{item.reward}</b></span>
                  <button className="text-[9px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-0.5 hover:text-white transition-colors">
                    Gerir <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}