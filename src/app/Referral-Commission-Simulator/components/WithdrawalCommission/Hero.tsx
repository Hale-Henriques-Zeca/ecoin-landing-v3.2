"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ArrowDownRight, 
  Building, 
  Percent, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Coins,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export default function Hero() {
  // STATES: Valor do saque e tipo de Token suportado no contrato
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("1000");
  const [selectedToken, setSelectedToken] = useState<'USDT' | 'EUSD'>('USDT');

  // CÁLCULOS EXATOS BASEADOS NO SMART CONTRACT (BP = 10_000)
  const metrics = useMemo(() => {
    const amount = parseFloat(withdrawalAmount) || 0;
    
    // uint256 fee = (amount * CLAIM_FEE_BP) / BP; (1%)
    const fee = (amount * 100) / 10000;
    const netAmount = amount - fee;

    // uint256 treasuryPart = (amount * 2000) / BP; (20% da taxa)
    const treasury = (fee * 2000) / 10000;
    
    // uint256 referralPart = (amount * 3000) / BP; (30% da taxa)
    const referralPool = (fee * 3000) / 10000;
    
    // uint256 stakingPart = amount - treasuryPart - referralPart; (50% da taxa)
    const stakingBuffer = fee - treasury - referralPool;

    // Divisão do Referral de 3 Níveis (70%, 25%, 5% do pool de referência)
    const l1 = (referralPool * 7000) / 10000;
    const l2 = (referralPool * 2500) / 10000;
    const l3 = (referralPool * 500) / 10000;

    // Percentuais reais em relação ao valor bruto do saque
    const l1RealPercent = 0.21;
    const l2RealPercent = 0.075;
    const l3RealPercent = 0.015;

    return {
      fee,
      netAmount,
      treasury,
      referralPool,
      stakingBuffer,
      l1,
      l2,
      l3,
      l1RealPercent,
      l2RealPercent,
      l3RealPercent
    };
  }, [withdrawalAmount]);

  const formatCrypto = (val: number) => {
    return val.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 text-slate-100 rounded-3xl border border-slate-800/80 shadow-2xl p-6 md:p-10 backdrop-blur-xl space-y-10 relative overflow-hidden">
      
      {/* GLOW DE FUNDO DA ENGINE */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* MELHORIA 3: BADGES DO SMART CONTRACT NO TOPO */}
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <Cpu size={10} className="text-amber-500" /> Upgradeable Contract (UUPS)
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <FileCheck2 size={10} /> Verified Formula
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <Sparkles size={10} className="text-blue-400" /> Automatic Distribution
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <ShieldCheck size={10} className="text-purple-400" /> Immutable Rules
        </div>
      </div>

      {/* HEADER PRINCIPAL */}
      <div className="text-center space-y-2 border-b border-slate-800/60 pb-6">
        <h1 className="text-3xl md:text-5xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
          Withdrawal Referral Simulator
        </h1>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Entenda com precisão cirúrgica como a taxa de 1% retida no processamento de saques (Claims) é distribuída de forma automatizada pelo Smart Contract.
        </p>
      </div>

      {/* INPUT DO VALOR & SELETOR DE TOKEN */}
      <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider block flex items-center gap-2">
            <Wallet size={14} className="text-amber-500" /> Withdrawal Amount (Valor do Saque)
          </label>
          <div className="relative">
            <input 
              type="number"
              min={0}
              placeholder="Ex: 1000"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-24 font-black text-amber-400 focus:outline-none focus:border-amber-500 transition-all text-xl"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-slate-500">
              {selectedToken}
            </span>
          </div>
        </div>

        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider block">
            Contract Asset Token
          </label>
          <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {(['USDT', 'EUSD'] as const).map((token) => (
              <button
                key={token}
                onClick={() => setSelectedToken(token)}
                className={`py-2 rounded-lg text-xs font-black transition-all ${
                  selectedToken === token 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {token}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* SEÇÃO INTERMEDIÁRIA: TAXA DE 1% DETECTADA + MELHORIA 1: FÓRMULA MATEMÁTICA EXPRESSA */}
      <div className="bg-slate-900/20 border-y border-slate-800/80 p-5 space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2">
          <span className="text-xs font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
            <Percent size={14} className="text-amber-500" /> Withdrawal Fee Contract Policy (CLAIM_FEE_BP)
          </span>
          <span className="text-xl font-black text-white">
            1.00% <span className="text-slate-500 text-sm ml-2">➔</span> <span className="text-amber-400 font-extrabold">{formatCrypto(metrics.fee)} {selectedToken}</span>
          </span>
        </div>
        
        {/* Sub-painel com a equação detalhada em tempo real */}
        <div className="bg-slate-950/80 rounded-lg p-3 text-left border border-slate-900 text-[11px] font-mono text-slate-500 flex flex-wrap items-center gap-2">
          <span className="text-amber-500/80 font-bold">Fórmula Base Fee:</span> 
          <span>{formatCrypto(parseFloat(withdrawalAmount) || 0)} {selectedToken}</span> 
          <span>×</span> 
          <span>1% (100 / 10,000 BP)</span> 
          <span>=</span> 
          <span className="text-white font-bold">{formatCrypto(metrics.fee)} {selectedToken} (Total Fee Pool)</span>
        </div>
      </div>

      {/* SEÇÃO 1: PRIMEIRA DIVISÃO DA TAXA (TREASURY, REFERRAL, STAKING) */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
          <Layers size={14} className="text-slate-500" /> 1. Fee Distribution Breakdown
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* TREASURY VAULT */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-colors space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider flex items-center gap-1.5">
                <Building size={12} /> Treasury Vault
              </span>
              <span className="text-xs font-black text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">20%</span>
            </div>
            <div>
              <span className="text-lg font-black text-white block">
                {formatCrypto(metrics.treasury)} <span className="text-[10px] text-slate-500 font-medium">{selectedToken}</span>
              </span>
              <span className="text-[9px] font-mono text-slate-600 block mt-1">
                {formatCrypto(metrics.fee)} × 20%
              </span>
            </div>
          </div>

          {/* REFERRAL POOL */}
          <div className="bg-gradient-to-r from-amber-500/5 to-slate-900/30 border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between group hover:border-amber-500/30 transition-colors space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-amber-400 font-black uppercase tracking-wider flex items-center gap-1.5">
                <Coins size={12} /> Referral Pool
              </span>
              <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">30%</span>
            </div>
            <div>
              <span className="text-lg font-black text-amber-400 block">
                {formatCrypto(metrics.referralPool)} <span className="text-[10px] text-amber-600 font-medium">{selectedToken}</span>
              </span>
              <span className="text-[9px] font-mono text-slate-600 block mt-1">
                {formatCrypto(metrics.fee)} × 30%
              </span>
            </div>
          </div>

          {/* STAKING BUFFER */}
          <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-colors space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={12} /> Staking Buffer
              </span>
              <span className="text-xs font-black text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">50%</span>
            </div>
            <div>
              <span className="text-lg font-black text-white block">
                {formatCrypto(metrics.stakingBuffer)} <span className="text-[10px] text-slate-500 font-medium">{selectedToken}</span>
              </span>
              <span className="text-[9px] font-mono text-slate-600 block mt-1">
                {formatCrypto(metrics.fee)} × 50%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* SEÇÃO 2: REFERRAL DISTRIBUTION + MELHORIA 2: EXIBIÇÃO DUPLA DAS PERCENTAGENS (POOL VS WITHDRAWAL) */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
          <ArrowDownRight size={14} /> 2. _payReferral3Levels Internal Execution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* LEVEL 1 */}
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
              <div>
                <span className="text-xs font-black text-white block">👑 Leader Level L1</span>
                <span className="text-[10px] text-slate-500 font-medium">Indicação Direta</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-black text-amber-400 block">70% do Referral</span>
                <span className="text-[9px] font-bold text-slate-400 block">{metrics.l1RealPercent}% do Saque</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-white">{formatCrypto(metrics.l1)}</span>
              <span className="text-[10px] font-mono text-slate-600">{formatCrypto(metrics.referralPool)} × 70%</span>
            </div>
          </div>

          {/* LEVEL 2 */}
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
              <div>
                <span className="text-xs font-black text-slate-200 block">🥈 Leader Level L2</span>
                <span className="text-[10px] text-slate-500 font-medium">Segundo Nível</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-black text-slate-300 block">25% do Referral</span>
                <span className="text-[9px] font-bold text-slate-400 block">{metrics.l2RealPercent}% do Saque</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-slate-300">{formatCrypto(metrics.l2)}</span>
              <span className="text-[10px] font-mono text-slate-600">{formatCrypto(metrics.referralPool)} × 25%</span>
            </div>
          </div>

          {/* LEVEL 3 */}
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
              <div>
                <span className="text-xs font-black text-amber-700 block">🥉 Leader Level L3</span>
                <span className="text-[10px] text-slate-500 font-medium">Terceiro Nível</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-black text-amber-700 block">5% do Referral</span>
                <span className="text-[9px] font-bold text-slate-500 block">{metrics.l3RealPercent}% do Saque</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xl font-black text-amber-800">{formatCrypto(metrics.l3)}</span>
              <span className="text-[10px] font-mono text-slate-600">{formatCrypto(metrics.referralPool)} × 5%</span>
            </div>
          </div>

        </div>
      </div>

      {/* SEÇÃO 3: WITHDRAWAL SUMMARY CARD */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-inner">
        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block mb-4 text-center md:text-left">
          3. Final Settlement Summary
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-0.5">
            <span className="text-xs font-medium text-slate-400 block">Total Solicitado (Claim)</span>
            <span className="text-lg font-extrabold text-slate-200">{formatCrypto(parseFloat(withdrawalAmount) || 0)} {selectedToken}</span>
          </div>
          <div className="space-y-0.5 border-y md:border-y-0 md:border-x border-slate-800/80 py-3 md:py-0 md:px-6">
            <span className="text-xs font-medium text-amber-500 block">Taxa Retida (1%)</span>
            <span className="text-lg font-extrabold text-amber-400">-{formatCrypto(metrics.fee)} {selectedToken}</span>
          </div>
          <div className="space-y-0.5 md:pl-6 flex flex-col justify-center">
            <span className="text-xs font-black text-emerald-400 block uppercase tracking-wider">User Net Receives (Líquido)</span>
            <span className="text-2xl font-black text-white bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/10 inline-block w-fit mt-1 mx-auto md:mx-0">
              {formatCrypto(metrics.netAmount)} {selectedToken}
            </span>
          </div>
        </div>
      </div>

      {/* SEÇÃO 4: FLUXOGRAMA DE CONTRATO INTELIGENTE COMPLETO NO RODAPÉ */}
      <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 text-center">
        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block mb-4">
          Visual Execution Map
        </span>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 text-[10px] font-bold text-slate-400">
          
          <div className="bg-slate-900 px-3 py-1 rounded border border-slate-800">Withdrawal ({selectedToken})</div>
          <ChevronRight size={12} className="text-slate-800 rotate-90 lg:rotate-0" />
          
          <div className="bg-slate-900 px-3 py-1 rounded border border-slate-800 text-amber-400">1% Taxa Calculada</div>
          <ChevronRight size={12} className="text-slate-800 rotate-90 lg:rotate-0" />
          
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900/40 p-1.5 rounded-lg border border-slate-800/60">
            <span className="text-slate-500">Split:</span>
            <span className="text-white">20% Treasury</span>
            <span className="text-amber-400 font-black">30% Referral</span>
            <span className="text-white">50% Staking</span>
          </div>
          
          <ChevronRight size={12} className="text-amber-500/30 rotate-90 lg:rotate-0" />
          
          <div className="bg-slate-900 px-3 py-1 rounded border border-amber-500/20 text-slate-300 flex gap-2">
            <span>L1 (70%)</span>
            <span className="text-slate-600">|</span>
            <span>L2 (25%)</span>
            <span className="text-slate-600">|</span>
            <span>L3 (5%)</span>
          </div>
          
        </div>
      </div>

    </div>
  );
}