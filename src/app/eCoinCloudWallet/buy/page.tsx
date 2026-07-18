'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Landmark, 
  ShieldCheck, 
  Coins, 
  ArrowRightLeft, 
  Info, 
  DollarSign,
  Lock
} from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function BuySellPage() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [fiatAmount, setFiatAmount] = useState<string>('100');
  const [cryptoAmount, setCryptoAmount] = useState<string>('10000');
  const [selectedGateway, setSelectedGateway] = useState<string>('paypal');

  // Cotação simulada fixa: 1 ECOIN = 0.010 USD
  const handleFiatChange = (val: string) => {
    setFiatAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setCryptoAmount((num / 0.010).toFixed(2));
    } else {
      setCryptoAmount('');
    }
  };

  const handleCryptoChange = (val: string) => {
    setCryptoAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setFiatAmount((num * 0.010).toFixed(2));
    } else {
      setFiatAmount('');
    }
  };

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader 
          title="Fiat Gateway" 
          subtitle="Compre ou liquide os seus ativos digitais diretamente com moedas fiduciárias" 
        />

        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          
          {/* Coluna do Formulário (8 de 12 colunas) */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl flex flex-col">
            
            {/* Abas Alternadoras (Comprar / Vender) */}
            <div className="flex bg-black/40 p-1 rounded-xl border border-white/5 mb-6">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2.5 rounded-lg font-mono text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === 'buy'
                    ? 'bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20 shadow-md'
                    : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                }`}
              >
                Comprar Crypto
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-2.5 rounded-lg font-mono text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === 'sell'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-md'
                    : 'text-neutral-400 hover:text-white bg-transparent border border-transparent'
                }`}
              >
                Vender Crypto
              </button>
            </div>

            {/* Input de Moeda Fiduciária (Enviar/Receber Dinheiro Real) */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  {activeTab === 'buy' ? 'Você Paga' : 'Você Recebe'}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Moeda Base: USD</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 w-2/3">
                  <span className="text-neutral-500 font-mono text-sm font-bold">$</span>
                  <input 
                    type="number" 
                    value={fiatAmount}
                    onChange={(e) => handleFiatChange(e.target.value)}
                    placeholder="0.00" 
                    className="bg-transparent text-lg font-mono text-white font-bold w-full focus:outline-none placeholder-neutral-700" 
                  />
                </div>
                <div className="bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-white px-3 py-1.5 font-bold">
                  USD
                </div>
              </div>
            </div>

            {/* Ícone de Interbloqueio Reativo */}
            <div className="flex justify-center my--2 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 text-[#D4AF37] flex items-center justify-center shadow-lg">
                <ArrowRightLeft size={12} />
              </div>
            </div>

            {/* Input de Criptoativo */}
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 mt-2 mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  {activeTab === 'buy' ? 'Você Recebe' : 'Você Entrega'}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Saldo: 752,420.50</span>
              </div>
              <div className="flex items-center justify-between">
                <input 
                  type="number" 
                  value={cryptoAmount}
                  onChange={(e) => handleCryptoChange(e.target.value)}
                  placeholder="0.00" 
                  className="bg-transparent text-lg font-mono text-white font-bold w-2/3 focus:outline-none placeholder-neutral-700" 
                />
                <select className="bg-neutral-900 border border-white/10 rounded-lg text-xs font-mono text-white px-2 py-1.5 focus:outline-none font-bold text-[#D4AF37]">
                  <option value="ECOIN">ECOIN</option>
                  <option value="EUSD">EUSD</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>

            {/* Seletor de Métodos de Pagamento */}
            <div className="mb-6">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-2.5">
                Forma de Liquidação / Pagamento
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Gateway PayPal (Ativo) */}
                <div 
                  onClick={() => setSelectedGateway('paypal')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between bg-black/40 ${
                    selectedGateway === 'paypal' 
                      ? 'border-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.1)]' 
                      : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#003087]/20 border border-[#003087]/40 flex items-center justify-center font-black italic text-sm text-[#0070ba]">
                      P
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">PayPal Express</span>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase">Aprovação Instantânea</span>
                    </div>
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${selectedGateway === 'paypal' ? 'border-[#D4AF37]' : 'border-neutral-700'}`}>
                    {selectedGateway === 'paypal' && <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />}
                  </div>
                </div>

                {/* Cartão de Crédito (Brevemente) */}
                <div className="p-3.5 rounded-xl border border-white/[0.02] bg-white/[0.01] flex items-center justify-between opacity-40 cursor-not-allowed select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400">
                      <CreditCard size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-400 block">Cartão Visa/Mastercard</span>
                      <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">Em Breve</span>
                    </div>
                  </div>
                </div>

                {/* Transferência Bancária (Brevemente) */}
                <div className="p-3.5 rounded-xl border border-white/[0.02] bg-white/[0.01] flex items-center justify-between opacity-40 cursor-not-allowed select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400">
                      <Landmark size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-400 block">Bank Wire (SEPA/Swift)</span>
                      <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">Em Breve</span>
                    </div>
                  </div>
                </div>

                {/* Cripto Direto / Alternativos */}
                <div className="p-3.5 rounded-xl border border-white/[0.02] bg-white/[0.01] flex items-center justify-between opacity-40 cursor-not-allowed select-none">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-400">
                      <Coins size={14} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-400 block">PIX & Local Transfers</span>
                      <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider font-bold">Em Breve</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Dinâmico de Checkout */}
            <button className={`w-full h-11 text-black font-mono font-black text-xs tracking-widest uppercase rounded-xl transition-all active:scale-[0.99] flex items-center justify-center gap-2 ${
              activeTab === 'buy' 
                ? 'bg-[#00FF9C] hover:brightness-110 shadow-[0_0_15px_rgba(0,255,156,0.15)]' 
                : 'bg-red-400 hover:bg-red-500 text-white'
            }`}>
              <Lock size={12} />
              {activeTab === 'buy' ? 'Pagar com PayPal' : 'Solicitar Resgate via PayPal'}
            </button>
          </div>

          {/* Painel Informativo Lateral (4 de 12 colunas) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Detalhes da Ordem */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5 border-b border-white/5 pb-2.5">
                Resumo da Cotação
              </h3>
              
              <div className="flex flex-col gap-2.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Taxa de Conversão</span>
                  <span className="text-neutral-200">1 ECOIN = 0.010 USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Taxa do Provedor (PayPal)</span>
                  <span className="text-neutral-200">3.4% + $0.30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Taxa do Protocolo eCoin</span>
                  <span className="text-[#00FF9C] font-bold">0.00% (Isento)</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-2.5 mt-1 text-xs">
                  <span className="text-neutral-400 font-bold">Total Estimado</span>
                  <span className="text-[#D4AF37] font-black">${fiatAmount} USD</span>
                </div>
              </div>
            </div>

            {/* Segurança & Compliance Disclaimer */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 flex gap-3 items-start">
              <ShieldCheck size={18} className="text-[#00FF9C] shrink-0 mt-0.5" />
              <div className="font-mono text-[10px] text-neutral-400 leading-normal">
                <span className="text-white font-bold block mb-1">Processamento Criptografado</span>
                As suas transações fiduciárias são processadas em ambiente seguro diretamente na API do PayPal. A eCoin Cloud Wallet não armazena dados de cartões ou contas bancárias externas.
              </div>
            </div>

            {/* Nota sobre os canais em adesão */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex gap-3 items-start">
              <Info size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="font-mono text-[10px] text-neutral-500 leading-normal">
                <span className="text-neutral-300 font-bold block mb-1">Canais em Homologação</span>
                Novos trilhos bancários internacionais estão aguardando liberação regulatória da camada de liquidação. Assim que ativos, as transações serão integradas automaticamente.
              </div>
            </div>

          </div>

        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}