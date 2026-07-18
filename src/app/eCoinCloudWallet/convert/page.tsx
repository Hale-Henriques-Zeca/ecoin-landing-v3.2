'use client';

import React from 'react';
import { ArrowDownUp, Info, HelpCircle } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function ConvertPage() {
  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Swap Instantâneo" subtitle="Converta os seus ativos digitais com taxa zero do sistema" />
        
        <div className="max-w-md mx-auto w-full bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden">
          {/* Input De */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">De</span>
              <span className="text-[10px] font-mono text-neutral-400 cursor-pointer hover:text-[#D4AF37]">Saldo: 752,420.50</span>
            </div>
            <div className="flex items-center justify-between">
              <input type="number" placeholder="0.00" className="bg-transparent text-lg font-mono text-white font-bold w-2/3 focus:outline-none placeholder-neutral-700" />
              <select className="bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-white px-3 py-1.5 focus:outline-none">
                <option>eCoin</option>
                <option>eDollar</option>
                <option>BTC</option>
                <option>BNB</option>
                <option>SOL</option>
                <option>POL</option>
                <option>TRX</option>
                <option>USDT</option>
              </select>
            </div>
          </div>

          {/* Divider Switch Icon */}
          <div className="flex justify-center my-[-12px] relative z-10">
            <button className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 text-[#D4AF37] hover:text-[#00FF9C] flex items-center justify-center transition-colors shadow-lg active:scale-95">
              <ArrowDownUp size={14} />
            </button>
          </div>

          {/* Input Para */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 mt-2 mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">Para</span>
              <span className="text-[10px] font-mono text-neutral-400">Saldo: 3,762.10</span>
            </div>
            <div className="flex items-center justify-between">
              <input type="number" placeholder="0.00" disabled className="bg-transparent text-lg font-mono text-white font-bold w-2/3 focus:outline-none placeholder-neutral-700" />
              <select className="bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-white px-3 py-1.5 focus:outline-none">
                <option>eDollar</option>
                <option>eCoin</option>
                <option>BTC</option>
                <option>BNB</option>
                <option>SOL</option>
                <option>POL</option>
                <option>TRX</option>
                <option>USDT</option>
              </select>
            </div>
          </div>

          {/* Informações da Cotação */}
          <div className="bg-white/[0.01] border border-white/[0.03] rounded-xl p-3 flex flex-col gap-2 mb-5">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-neutral-500">Preço de Referência</span>
              <span className="text-neutral-300 font-bold">1 eCoin &approx; 10 eDollar</span>
            </div>
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-neutral-500">Slippage Tolerance</span>
              <span className="text-[#00FF9C] font-bold">0.5% (Auto)</span>
            </div>
          </div>

          {/* Botão de Ação */}
          <button className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#bfa132] hover:brightness-110 active:scale-[0.99] text-black font-mono font-black text-xs tracking-widest uppercase rounded-xl transition-all">
            Executar Conversão
          </button>
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}