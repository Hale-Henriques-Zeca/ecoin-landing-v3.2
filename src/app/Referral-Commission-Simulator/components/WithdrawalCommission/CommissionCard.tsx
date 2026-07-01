"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Percent, 
  Building, 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  ChevronDown,
  Info,
  Sliders,
  CheckCircle2,
  GitFork,
  Boxes,
  Zap,
  Cpu,
  Wallet
} from 'lucide-react';

// ==========================================
// CONSTANTES DE PONTOS BASE (REFLEXO DO SOLIDITY)
// ==========================================
const BP = 10_000;

const CLAIM_FEE_BP = 100;       // 1%
const TREASURY_BP = 2000;       // 20% do fee pool
const REFERRAL_BP = 3000;       // 30% do fee pool
const STAKING_BP = 5000;        // 50% do fee pool (Remainder)

const L1_BP = 7000;             // 70% do referral pool
const L2_BP = 2500;             // 25% do referral pool
const L3_BP = 500;              // 5% do referral pool

// VALOR BASE DO BLUEPRINT DE REFERÊNCIA
const REFERENCE_AMOUNT = 1000;

// ==========================================
// ENGINE DE CÁLCULO DINÂMICO
// ==========================================
const calculateBlueprint = (amount: number) => {
  const feeRetida = (amount * CLAIM_FEE_BP) / BP;
  const liquidoRecebido = amount - feeRetida;
  
  const treasuryShare = (feeRetida * TREASURY_BP) / BP;
  const referralShare = (feeRetida * REFERRAL_BP) / BP;
  const stakingShare = (feeRetida * STAKING_BP) / BP;
  
  const l1Share = (referralShare * L1_BP) / BP;
  const l2Share = (referralShare * L2_BP) / BP;
  const l3Share = (referralShare * L3_BP) / BP;

  return {
    amount,
    feeRetida,
    liquidoRecebido,
    treasuryShare,
    referralShare,
    stakingShare,
    l1Share,
    l2Share,
    l3Share
  };
};

// ==========================================
// VARIANTES DE ANIMAÇÃO SEQUENCIAL PREMIUM
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const flowStepVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 80 } }
};

export default function CommissionCard() {
  // Executa os cálculos dinâmicos baseados nas regras de BP
  const data = calculateBlueprint(REFERENCE_AMOUNT);

  // Formatação de strings limpas para exibição
  const formatPercent = (bpValue: number) => `${(bpValue / 100).toFixed(2)}%`;
  const formatRealPercent = (baseBp: number, splitBp: number) => {
    const realBp = (baseBp * splitBp) / BP;
    return `${(realBp / 100).toFixed(3)}%`;
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto space-y-12 text-slate-100"
    >
      
      {/* HEADER PRINCIPAL DO EXECUTIVE DASHBOARD */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-slate-200 via-slate-400 to-amber-400 bg-clip-text text-transparent">
          Withdrawal Commission Overview
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Mecanismo fixo e regras permanentes programadas no Smart Contract para a retenção e distribuição das taxas de saque.
        </p>
      </motion.div>

      {/* 1. EXECUTIVE CARDS (DERIVADOS DIRETAMENTE DE CONSTANTES BP) */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: WITHDRAWAL FEE */}
        <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/30 transition-all shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/10"><Percent size={16} /></span>
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{CLAIM_FEE_BP} BP</span>
          </div>
          <h4 className="text-3xl font-black text-white">{formatPercent(CLAIM_FEE_BP)}</h4>
          <p className="text-xs font-bold text-slate-300 mt-1">Withdrawal Fee</p>
          <span className="text-[10px] text-slate-500 block mt-2">Automatic Claim Fee</span>
        </div>

        {/* CARD 2: TREASURY RESERVE */}
        <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 bg-slate-800 text-slate-400 rounded-lg"><Building size={16} /></span>
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{TREASURY_BP} BP</span>
          </div>
          <h4 className="text-3xl font-black text-white">{formatPercent(TREASURY_BP)}</h4>
          <p className="text-xs font-bold text-slate-300 mt-1">Treasury Vault</p>
          <span className="text-[10px] text-slate-500 block mt-2">Protocol Reserve</span>
        </div>

        {/* CARD 3: REFERRAL POOL (DESTAQUE VISUAL PREMIUM) */}
        <div className="bg-gradient-to-b from-amber-500/5 to-slate-900/30 border border-amber-500/20 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-lg shadow-amber-500/[0.02]">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/[0.03] rounded-full blur-xl pointer-events-none" />
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30"><Coins size={16} /></span>
            <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase">{REFERRAL_BP} BP ⭐</span>
          </div>
          <h4 className="text-3xl font-black text-amber-400">{formatPercent(REFERRAL_BP)}</h4>
          <p className="text-xs font-bold text-slate-200 mt-1">Referral Pool</p>
          <span className="text-[10px] text-amber-500/60 block mt-2">Affiliate Rewards Core</span>
        </div>

        {/* CARD 4: STAKING BUFFER */}
        <div className="bg-slate-900/30 border border-slate-800/80 p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <span className="p-2 bg-slate-800 text-slate-400 rounded-lg"><ShieldCheck size={16} /></span>
            <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase">{STAKING_BP} BP</span>
          </div>
          <h4 className="text-3xl font-black text-white">{formatPercent(STAKING_BP)}</h4>
          <p className="text-xs font-bold text-slate-300 mt-1">Staking Buffer</p>
          <span className="text-[10px] text-slate-500 block mt-2">Mining Rewards Injector</span>
        </div>

      </motion.div>

      {/* 2. FEE DISTRIBUTION FLOW (MAPA HORIZONTAL ANIMADO) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sliders size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Withdrawal Fee Distribution Flow</h3>
        </div>

        <motion.div 
          variants={containerVariants}
          className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
        >
          <motion.div variants={flowStepVariants} className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center min-w-[140px] z-10 w-full md:w-auto">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Taxa Coletada</span>
            <span className="text-sm font-black text-amber-400">100% da Fee</span>
          </motion.div>

          <ArrowRight className="text-slate-700 hidden md:block" size={18} />
          <ChevronDown className="text-slate-700 block md:hidden" size={18} />

          {/* DESTINO 1 */}
          <motion.div variants={flowStepVariants} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-center min-w-[140px] w-full md:w-auto group hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Treasury Vault</span>
            <span className="text-lg font-black text-white">{formatPercent(TREASURY_BP)}</span>
          </motion.div>

          <ArrowRight className="text-slate-700 hidden md:block" size={18} />
          <ChevronDown className="text-slate-700 block md:hidden" size={18} />

          {/* DESTINO 2: REFERRAL COM DESTAQUE ⭐ */}
          <motion.div variants={flowStepVariants} className="bg-gradient-to-b from-amber-500/10 to-slate-950 border border-amber-500/40 rounded-xl p-4 text-center min-w-[140px] w-full md:w-auto group hover:border-amber-500 shadows-amber-500/20 transition-all ring-1 ring-amber-500/20">
            <span className="text-[10px] font-mono text-amber-400 block uppercase mb-1 font-black tracking-wide">Referral Pool ⭐</span>
            <span className="text-lg font-black text-amber-400">{formatPercent(REFERRAL_BP)}</span>
          </motion.div>

          <ArrowRight className="text-slate-700 hidden md:block" size={18} />
          <ChevronDown className="text-slate-700 block md:hidden" size={18} />

          {/* DESTINO 3 */}
          <motion.div variants={flowStepVariants} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-center min-w-[140px] w-full md:w-auto group hover:border-slate-700 transition-colors">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Staking Buffer</span>
            <span className="text-lg font-black text-white">{formatPercent(STAKING_BP)}</span>
          </motion.div>

        </motion.div>
      </motion.div>

      {/* 3. REFERRAL SPLIT CARDS (REGRAS DE SUBCONTRATO E FRAÇÕES REAIS) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <GitFork size={14} className="text-amber-500" />
          <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Referral Split Rules</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* L1 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden group hover:border-amber-500/30 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white">👑 Leader Level 1</span>
              <span className="text-xs font-mono font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10">{formatPercent(L1_BP)}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Fração distribuída sobre o montante alocado ao Referral Pool.</p>
            <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Percentagem Real:</span>
              <span className="text-xs font-mono font-black text-white">{formatRealPercent(REFERRAL_BP, L1_BP)} do saque</span>
            </div>
          </div>

          {/* L2 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-300">🥈 Leader Level 2</span>
              <span className="text-xs font-mono font-extrabold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{formatPercent(L2_BP)}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Fração distribuída sobre o montante alocado ao Referral Pool.</p>
            <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Percentagem Real:</span>
              <span className="text-xs font-mono font-black text-slate-300">{formatRealPercent(REFERRAL_BP, L2_BP)} do saque</span>
            </div>
          </div>

          {/* L3 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-amber-700">🥉 Leader Level 3</span>
              <span className="text-xs font-mono font-extrabold text-amber-800 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-900/20">{formatPercent(L3_BP)}</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Fração distribuída sobre o montante alocado ao Referral Pool.</p>
            <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Percentagem Real:</span>
              <span className="text-xs font-mono font-black text-amber-700">{formatRealPercent(REFERRAL_BP, L3_BP)} do saque</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 4. COMPARISON / REFERENCE EXAMPLE BLUEPRINT (CALCULADOS DINAMICAMENTE) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Info size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">What happens with {REFERENCE_AMOUNT.toLocaleString()} USDT? (Distribution Blueprint)</h3>
        </div>

        <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="border-l-2 border-amber-500 pl-3">
              <span className="text-[10px] uppercase font-mono block text-slate-500">Passo 01</span>
              <h5 className="text-xs font-black text-white uppercase tracking-wider">Retenção de Taxa</h5>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Withdrawal Bruto:</span>
                <span className="font-mono font-bold text-white">{data.amount.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between text-amber-400 font-medium">
                <span>Fee Retida ({formatPercent(CLAIM_FEE_BP)}):</span>
                <span className="font-mono">{data.feeRetida.toFixed(2)} USDT</span>
              </div>
              <div className="pt-2 border-t border-slate-800/60 flex justify-between text-emerald-400 font-black">
                <span>Líquido Recebido:</span>
                <span className="font-mono">{data.liquidoRecebido.toFixed(2)} USDT</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-slate-700 pl-3">
              <span className="text-[10px] uppercase font-mono block text-slate-500">Passo 02</span>
              <h5 className="text-xs font-black text-white uppercase tracking-wider">Divisão de Destino</h5>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Treasury ({formatPercent(TREASURY_BP)}):</span>
                <span className="font-mono text-slate-200">{data.treasuryShare.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Referral Pool ({formatPercent(REFERRAL_BP)}):</span>
                <span className="font-mono font-bold">{data.referralShare.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between">
                <span>Staking ({formatPercent(STAKING_BP)}):</span>
                <span className="font-mono text-slate-200">{data.stakingShare.toFixed(2)} USDT</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-amber-600 pl-3">
              <span className="text-[10px] uppercase font-mono block text-slate-500">Passo 03</span>
              <h5 className="text-xs font-black text-white uppercase tracking-wider">Distribuição Afiliados</h5>
            </div>
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2 text-xs">
              <div className="flex justify-between text-slate-200">
                <span>L1 Reward ({formatPercent(L1_BP)}):</span>
                <span className="font-mono font-bold">{data.l1Share.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>L2 Reward ({formatPercent(L2_BP)}):</span>
                <span className="font-mono">{data.l2Share.toFixed(2)} USDT</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>L3 Reward ({formatPercent(L3_BP)}):</span>
                <span className="font-mono">{data.l3Share.toFixed(2)} USDT</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 5. CONTRACT POLICY ACCREDITATION (COM OS DOIS NOVOS CARDS ADICIONADOS) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Boxes size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Contract Policy</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { text: "Upgradeable Proxy", desc: "UUPS Compliant" },
            { text: "Reentrancy Protected", desc: "Guard Locked" },
            { text: "Automatic Distribution", desc: "Zero Delay" },
            { text: "Immutable Percentages", desc: "BP Anchored" },
            { text: "No Manual Intervention", desc: "Fully Trustless" },
            { text: "On-chain Execution", desc: "100% Real-time" },
            { text: "Transparent Distribution", desc: "Public Audit" }
          ].map((policy, idx) => (
            <div key={idx} className="bg-slate-900/20 border border-slate-800/60 p-3 rounded-xl space-y-1 hover:border-slate-800 transition-colors">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={12} className="shrink-0" />
                <span className="text-[10px] font-black text-slate-200 truncate">{policy.text}</span>
              </div>
              <span className="text-[9px] text-slate-500 block font-medium">{policy.desc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 6. SMART CONTRACT FORMULA (FLUXOGRAMA DINÂMICO COMPLETO COM TRANSFERÊNCIA AUTOMÁTICA) */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest block">
          Smart Contract Complete Formula Tree
        </span>
        
        <motion.div 
          variants={containerVariants}
          className="flex flex-col items-center justify-center space-y-2 text-[10px] font-mono font-bold text-slate-400"
        >
          
          <motion.div variants={flowStepVariants} className="bg-slate-900 px-4 py-1.5 rounded border border-slate-800 text-white flex items-center gap-1">
            <Zap size={10} className="text-amber-500" /> user.processClaim() Execution
          </motion.div>
          <ChevronDown size={12} className="text-slate-800" />
          
          <motion.div variants={flowStepVariants} className="bg-slate-900 px-4 py-1.5 rounded border border-slate-800 text-amber-400">
            CLAIM_FEE_BP ({CLAIM_FEE_BP} / {BP} BP) = {formatPercent(CLAIM_FEE_BP)} Taxa Retida
          </motion.div>
          <ChevronDown size={12} className="text-slate-800" />
          
          <motion.div variants={flowStepVariants} className="grid grid-cols-3 gap-2 w-full max-w-xl">
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-slate-300">
              <span className="block text-slate-500 font-sans text-[8px] uppercase">{TREASURY_BP} BP</span>
              Treasury Vault ({formatPercent(TREASURY_BP)})
            </div>
            <div className="bg-amber-500/5 p-2 rounded border border-amber-500/25 text-amber-400 font-extrabold ring-1 ring-amber-500/20">
              <span className="block text-amber-600 font-sans text-[8px] uppercase">{REFERRAL_BP} BP</span>
              Referral Pool ({formatPercent(REFERRAL_BP)})
            </div>
            <div className="bg-slate-900/60 p-2 rounded border border-slate-800 text-slate-300">
              <span className="block text-slate-500 font-sans text-[8px] uppercase">Remainder</span>
              Staking Buffer ({formatPercent(STAKING_BP)})
            </div>
          </motion.div>
          
          <div className="w-1/3 flex justify-center">
            <div className="w-px h-6 bg-amber-500/20" />
          </div>
          
          <motion.div variants={flowStepVariants} className="bg-slate-900/80 px-4 py-2 rounded-xl border border-amber-500/30 text-amber-400 max-w-md w-full space-y-1">
            <span className="block text-slate-500 font-sans text-[8px] uppercase tracking-wider font-black">_payReferral3Levels Sub-split</span>
            <div className="flex justify-between text-[9px] pt-1 font-bold text-slate-300">
              <span>L1: {L1_BP} BP ({formatPercent(L1_BP)})</span>
              <span>L2: {L2_BP} BP ({formatPercent(L2_BP)})</span>
              <span>L3: {L3_BP} BP ({formatPercent(L3_BP)})</span>
            </div>
          </motion.div>

          <ChevronDown size={12} className="text-slate-800" />

          {/* SINALIZAÇÃO ADICIONAL DE DESTINO FINAL NAS CARTEIRAS */}
          <motion.div variants={flowStepVariants} className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-1.5 rounded border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
            <Wallet size={11} /> Automatic Transfer → Affiliate Wallets
          </motion.div>

        </motion.div>
      </motion.div>

    </motion.div>
  );
}