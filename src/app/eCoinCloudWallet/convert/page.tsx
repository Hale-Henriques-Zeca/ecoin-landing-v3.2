'use client';

import React, { useState } from 'react';
import { ArrowDownUp, ShieldCheck, Zap } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';
import { fetchAggregatedQuotes, QuoteResult } from '@/components/eCoinCloudWallet/services/converter/quoteAggregator';

export default function ConvertPage() {
  const [amountIn, setAmountIn] = useState('');
  const [tokenIn, setTokenIn] = useState('USDT');
  const [tokenOut, setTokenOut] = useState('eDollar');
  const [slippage, setSlippage] = useState(0.5);
  const [quotes, setQuotes] = useState<QuoteResult[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<QuoteResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculateQuotes = async (val: string) => {
    setAmountIn(val);
    if (!val || Number(val) <= 0) {
      setQuotes([]);
      return;
    }
    setLoading(true);
    try {
      const results = await fetchAggregatedQuotes(tokenIn, tokenOut, val, slippage);
      setQuotes(results);
      if (results.length > 0) setSelectedProvider(results[0]); // Seleciona a melhor por defeito
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    } finally {
      setLoading(false);
    }
  };

  const grossAmount = Number(amountIn) || 0;
  const feeAmount = grossAmount * 0.10; // 10% de taxa de serviço cobrada antes do swap
  const netAmountForSwap = grossAmount * 0.90;

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Swap Instantâneo" subtitle="Agregador DEX com taxa de serviço integrada de 10%" />
        
        <div className="max-w-md mx-auto w-full bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl relative overflow-hidden">
          
          {/* Input De */}
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">Pagar (De)</span>
              <span className="text-[10px] font-mono text-neutral-400">Saldo: 752,420.50</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                type="number" 
                placeholder="0.00" 
                value={amountIn}
                onChange={(e) => handleCalculateQuotes(e.target.value)}
                className="bg-transparent text-lg font-mono text-white font-bold w-2/3 focus:outline-none placeholder-neutral-700" 
              />
              <select 
                value={tokenIn}
                onChange={(e) => setTokenIn(e.target.value)}
                className="bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-white px-3 py-1.5 focus:outline-none"
              >
                <option value="USDT">USDT</option>
                <option value="BNB">BNB</option>
                <option value="eCoin">eCoin</option>
                <option value="eDollar">eDollar</option>
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
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">Receber Estimado (Para)</span>
              <span className="text-[10px] font-mono text-neutral-400">Saldo: 3,762.10</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                type="text" 
                placeholder="0.00" 
                value={selectedProvider ? selectedProvider.expectedOutput : ''} 
                disabled 
                className="bg-transparent text-lg font-mono text-[#00FF9C] font-bold w-2/3 focus:outline-none placeholder-neutral-700" 
              />
              <select 
                value={tokenOut}
                onChange={(e) => setTokenOut(e.target.value)}
                className="bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-white px-3 py-1.5 focus:outline-none"
              >
                <option value="eDollar">eDollar</option>
                <option value="eCoin">eCoin</option>
                <option value="USDT">USDT</option>
                <option value="BNB">BNB</option>
              </select>
            </div>
          </div>

          {/* Seleção de Provedores (PancakeSwap, 1inch, Liquidmesh) */}
          {quotes.length > 0 && (
            <div className="mb-4">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 block">Melhores Provedores (DEXs)</span>
              <div className="grid grid-cols-3 gap-2">
                {quotes.map((q) => (
                  <button
                    key={q.providerId}
                    onClick={() => setSelectedProvider(q)}
                    className={`p-2 rounded-xl border text-left transition-all font-mono text-[10px] ${
                      selectedProvider?.providerId === q.providerId
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-white/5 bg-black/20 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold text-white">{q.providerName}</div>
                    <div className="text-[#00FF9C] mt-1">{q.expectedOutput}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Informações da Cotação e Taxas */}
          <div className="bg-white/[0.01] border border-white/[0.03] rounded-xl p-3 flex flex-col gap-2 mb-5 font-mono text-[10px]">
            <div className="flex justify-between">
              <span className="text-neutral-500">Taxa de Serviço (10%)</span>
              <span className="text-[#D4AF37] font-bold">{feeAmount.toFixed(2)} {tokenIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Montante para o Swap</span>
              <span className="text-neutral-300 font-bold">{netAmountForSwap.toFixed(2)} {tokenIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Slippage Tolerance</span>
              <span className="text-[#00FF9C] font-bold">{slippage}% (Auto)</span>
            </div>
          </div>

          {/* Botão de Ação */}
          <button 
            disabled={loading || !selectedProvider}
            className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#bfa132] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 text-black font-mono font-black text-xs tracking-widest uppercase rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Zap size={14} />
            {loading ? 'A calcular rotas...' : 'Executar Conversão Segura'}
          </button>
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}