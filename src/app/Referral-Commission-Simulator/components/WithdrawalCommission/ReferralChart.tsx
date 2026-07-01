"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitMerge, 
  ArrowDown, 
  Layers, 
  TrendingUp, 
  Clock, 
  Cpu, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Wallet,
  Coins,
  Variable
} from 'lucide-react';

// ============================================================================
// PONTOS BASE E CONSTANTES DO PROTOCOLO (CENTRALIZAÇÃO E ESTRUTURAÇÃO DE DADOS)
// ============================================================================
const CONFIG = {
  LABELS: {
    WITHDRAWAL: "Withdrawal Request",
    FEE_ENGINE: "Fee Engine",
    DIST_HUB: "Distribution Hub",
    TREASURY: "Treasury Vault",
    REFERRAL_POOL: "Referral Reward Pool",
    STAKING: "Staking Buffer",
    L1: "Leader Level 1",
    L2: "Leader Level 2",
    L3: "Leader Level 3",
  },
  PCT: {
    CLAIM_FEE: "1.00%",
    TREASURY: "20%",
    REFERRAL: "30%",
    STAKING: "50%",
    L1: "70%",
    L2: "25%",
    L3: "5%",
    REAL_L1: "0.210%",
    REAL_L2: "0.075%",
    REAL_L3: "0.015%",
  },
  SANKEY_WIDTHS: {
    BASE_FEE_POOL: "100%", // A partir da Fee (100% da taxa)
    TREASURY: "20%",
    REFERRAL: "30%",
    STAKING: "50%"
  }
};

// ==========================================
// VARIANTES DE ANIMAÇÃO SEQUENCIAL FLOW
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
};

const pulseGlow = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function ReferralChart() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full max-w-5xl mx-auto space-y-12 text-slate-100"
    >
      
      {/* HEADER PRINCIPAL */}
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-slate-200 via-slate-400 to-amber-400 bg-clip-text text-transparent">
          Withdrawal Referral Flow
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Visualização gráfica completa e sequencial da jornada de taxas dentro do ecossistema do Smart Contract.
        </p>
      </motion.div>

      {/* 1. WITHDRAWAL PIPELINE (FLUXO INICIAL DE ENTRADA) */}
      <motion.div variants={itemVariants} className="flex flex-col items-center justify-center py-4 relative">
        <div className="absolute top-0 w-px h-full bg-gradient-to-b from-amber-500/30 via-slate-800 to-transparent left-1/2 -translate-x-1/2 pointer-events-none" />
        
        {/* Bloco Entrada */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center z-10 w-64 shadow-md group hover:border-slate-700 transition-colors">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 block uppercase mb-1">{CONFIG.LABELS.WITHDRAWAL}</span>
          <h4 className="text-sm font-black text-white uppercase tracking-wider">Withdrawal Requested</h4>
          <span className="text-xs font-mono font-extrabold text-slate-400">100% Capital</span>
        </div>

        <ArrowDown size={16} className="text-amber-500 my-3 z-10 animate-bounce" />

        {/* Bloco Retenção */}
        <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl text-center z-10 w-64 shadow-md group hover:border-amber-500/40 transition-colors">
          <span className="text-[9px] font-mono font-bold tracking-widest text-amber-500 block uppercase mb-1">{CONFIG.LABELS.FEE_ENGINE}</span>
          <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">Retenção de Taxa</h4>
          <span className="text-xs font-mono font-extrabold text-white">{CONFIG.PCT.CLAIM_FEE} Fixed Fee</span>
        </div>

        <ArrowDown size={16} className="text-slate-700 my-3 z-10" />

        {/* Bloco Pool Central */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center z-10 w-64 shadow-md">
          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 block uppercase mb-1">{CONFIG.LABELS.DIST_HUB}</span>
          <h4 className="text-sm font-black text-slate-300 uppercase tracking-wider">Fee Accumulator Pool</h4>
          <span className="text-xs font-mono text-slate-500">Pronto para Divisão</span>
        </div>
      </motion.div>

      {/* 2. FEE DISTRIBUTION (FLUXO HORIZONTAL EM FORQUILHA) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Layers size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Protocol Fee Distribution</h3>
        </div>

        <div className="bg-slate-900/10 border border-slate-800/80 rounded-2xl p-6 relative">
          
          <div className="flex justify-center mb-6">
            <div className="bg-slate-900 border border-slate-700 px-6 py-2 rounded-xl text-xs font-mono font-black text-amber-400 shadow-xl relative">
              Collected Fee (100% of tax)
              <motion.div variants={pulseGlow} animate="animate" className="absolute -inset-px border border-amber-500 rounded-xl blur-sm pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            
            {/* TREASURY */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl text-center flex flex-col justify-between items-center group hover:border-slate-700 transition-colors">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase block mb-2">Protocol Buffer</span>
              <div className="text-xl font-black text-white font-mono">{CONFIG.PCT.TREASURY}</div>
              <div className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wide">{CONFIG.LABELS.TREASURY}</div>
            </div>

            {/* REFERRAL POOL (DESTAQUE CORE) */}
            <div className="bg-gradient-to-b from-amber-500/10 to-slate-950 border border-amber-500/30 p-4 rounded-xl text-center flex flex-col justify-between items-center group hover:border-amber-500/50 transition-all shadow-md shadow-amber-500/[0.01]">
              <span className="text-[9px] font-mono font-black tracking-wider text-amber-400 uppercase block mb-2 flex items-center gap-1"><Sparkles size={10} /> Active Pool</span>
              <div className="text-2xl font-black text-amber-400 font-mono">{CONFIG.PCT.REFERRAL}</div>
              <div className="text-[11px] font-black text-slate-200 mt-1 uppercase tracking-wider">{CONFIG.LABELS.REFERRAL_POOL}</div>
            </div>

            {/* STAKING BUFFER */}
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl text-center flex flex-col justify-between items-center group hover:border-slate-700 transition-colors">
              <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase block mb-2">Liquidity Injector</span>
              <div className="text-xl font-black text-white font-mono">{CONFIG.PCT.STAKING}</div>
              <div className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wide">{CONFIG.LABELS.STAKING}</div>
            </div>

          </div>

          <div className="absolute inset-0 top-12 bottom-1/2 left-1/4 right-1/4 border-t border-x border-slate-800/60 hidden md:block -z-10" />
        </div>
      </motion.div>

      {/* 3. REFERRAL SPLIT (ESTRUTURA DE NÍVEIS COM LIGAÇÕES VISUAIS) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <GitMerge size={14} className="text-amber-500" />
          <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Referral Split Cascade</h3>
        </div>

        <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center relative overflow-hidden">
          
          <div className="w-full max-w-md relative space-y-4">
            
            {/* Linha Tronco Principal da Cascata */}
            <div className="absolute top-4 bottom-12 left-6 w-px bg-gradient-to-b from-amber-500/50 via-slate-700 to-slate-900/10 pointer-events-none" />
            
            {/* L1 CARD */}
            <div className="flex items-center gap-4 pl-2 group relative">
              {/* Conector Horizontal Linha Sutil */}
              <div className="absolute top-1/2 left-6 w-2 h-px bg-amber-500/40 pointer-events-none" />
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs text-amber-400 font-bold font-mono z-10 group-hover:border-amber-500/50 transition-colors">L1</div>
              <div className="flex-1 bg-slate-950/80 border border-slate-900 p-3.5 rounded-xl flex justify-between items-center z-10">
                <div>
                  <span className="text-xs font-black text-white block">{CONFIG.LABELS.L1}</span>
                  <span className="text-[10px] text-slate-500 font-medium block">Direto / Primeiro Nível</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-amber-400 block">{CONFIG.PCT.L1}</span>
                  <span className="text-[9px] font-mono text-slate-500 block">do Pool</span>
                </div>
              </div>
            </div>

            {/* L2 CARD */}
            <div className="flex items-center gap-4 pl-2 group relative">
              <div className="absolute top-1/2 left-6 w-2 h-px bg-slate-700 pointer-events-none" />
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold font-mono z-10 group-hover:border-slate-600 transition-colors">L2</div>
              <div className="flex-1 bg-slate-950/80 border border-slate-900 p-3.5 rounded-xl flex justify-between items-center z-10">
                <div>
                  <span className="text-xs font-black text-slate-300 block">{CONFIG.LABELS.L2}</span>
                  <span className="text-[10px] text-slate-500 font-medium block">Segundo Nível Indireto</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-slate-300 block">{CONFIG.PCT.L2}</span>
                  <span className="text-[9px] font-mono text-slate-500 block">do Pool</span>
                </div>
              </div>
            </div>

            {/* L3 CARD (DETALHE E SEVERIDADE DE BUG CORRIGIDOS: REWARD 3) */}
            <div className="flex items-center gap-4 pl-2 group relative">
              <div className="absolute top-1/2 left-6 w-2 h-px bg-slate-800 pointer-events-none" />
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs text-slate-600 font-bold font-mono z-10">L3</div>
              <div className="flex-1 bg-slate-950/80 border border-slate-900 p-3.5 rounded-xl flex justify-between items-center z-10">
                <div>
                  <span className="text-xs font-black text-slate-400 block">{CONFIG.LABELS.L3}</span>
                  <span className="text-[10px] text-slate-500 font-medium block">Terceiro Nível Indireto</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono text-amber-700 block">{CONFIG.PCT.L3}</span>
                  <span className="text-[9px] font-mono text-slate-500 block">do Pool</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* 4. REAL WITHDRAWAL PERCENTAGES (TABELA DE CORRELAÇÃO DIRETA) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <TrendingUp size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Real Reward Impact on Withdrawal</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { lvl: "Level 1 Reward", pool: CONFIG.PCT.L1, real: CONFIG.PCT.REAL_L1, border: "hover:border-amber-500/30" },
            { lvl: "Level 2 Reward", pool: CONFIG.PCT.L2, real: CONFIG.PCT.REAL_L2, border: "hover:border-slate-700" },
            { lvl: "Level 3 Reward", pool: CONFIG.PCT.L3, real: CONFIG.PCT.REAL_L3, border: "hover:border-slate-700" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-slate-900/30 border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3 transition-all ${item.border}`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-white font-mono">{item.lvl}</span>
                <span className="text-[10px] font-mono text-slate-500">Pool Split: {item.pool}</span>
              </div>
              <div className="pt-2 border-t border-slate-800/60 flex items-baseline justify-between">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">Impacto Real:</span>
                <span className="text-lg font-mono font-black text-amber-400">{item.real}</span>
              </div>
              <span className="text-[9px] text-slate-500 block -mt-2 font-medium">Líquido calculado diretamente sobre o volume total do saque.</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 5. PROPORTIONAL SCALE BREAKDOWN (FIDELIDADE DE ESCALA REAL REFORMULADA) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Layers size={14} className="text-amber-500" />
          <h3 className="text-xs font-black uppercase text-amber-400 tracking-wider">Scale & Volume Breakdown (Fidelidade Proporcional)</h3>
        </div>

        <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 space-y-6">
          
          {/* BARRA 1: SAQUE BRUTO COMPLETO */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-white">Gross Volume Withdrawal Request</span>
              <span className="font-mono text-slate-400">100.00% (Base Total)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-slate-500" />
            </div>
          </div>

          {/* BARRA 2: TAXA REAIS RETIDA (1%) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-amber-500">Retained Protocol Tax Engine (Escala de Impacto Real de Fluxo)</span>
              <span className="font-mono text-amber-400">{CONFIG.PCT.CLAIM_FEE}</span>
            </div>
            {/* Alinhamento sem indução ao erro do usuário */}
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900 flex">
              <motion.div initial={{ width: 0 }} animate={{ width: "1.2%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-amber-500 min-w-[5px]" />
              <div className="flex-1 bg-slate-900/40 text-[9px] text-slate-600 px-2 flex items-center font-mono">99% Creditado de Volta ao User</div>
            </div>
          </div>

          {/* ESCALA DE SUB-SPLIT DE PROPORÇÃO DA FEE POOL (100% DA FEE CAPITALISED) */}
          <div className="pt-4 border-t border-slate-800/60 space-y-4">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">↳ Sub-Split das Proporções Internas da Taxa (100% Interno)</span>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TREASURY SUB-BAR */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-medium text-slate-400">
                  <span>Protocol Reserve</span>
                  <span>{CONFIG.PCT.TREASURY}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: CONFIG.SANKEY_WIDTHS.TREASURY }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full bg-slate-600" />
                </div>
              </div>

              {/* REFERRAL SUB-BAR */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-bold text-amber-400">
                  <span>Affiliate Allocator</span>
                  <span>{CONFIG.PCT.REFERRAL}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: CONFIG.SANKEY_WIDTHS.REFERRAL }} transition={{ duration: 0.8, delay: 0.3 }} className="h-full bg-amber-400" />
                </div>
              </div>

              {/* STAKING SUB-BAR */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-medium text-slate-400">
                  <span>Staking Buffer</span>
                  <span>{CONFIG.PCT.STAKING}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: CONFIG.SANKEY_WIDTHS.STAKING }} transition={{ duration: 0.8, delay: 0.4 }} className="h-full bg-slate-600" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 6. MATH & SC FORMULAS (DADOS EXATOS DO MOTOR MATEMÁTICO) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Variable size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Smart Contract Mathematical Model</h3>
        </div>
        
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-[11px] text-slate-400">
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            <div className="text-slate-500 text-[9px] font-bold mb-1">FEE CALCULATION</div>
            <div className="text-white font-bold">fee = withdrawal × 1%</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            <div className="text-slate-500 text-[9px] font-bold mb-1">CORE PROTOCOL SPLITS</div>
            <div className="text-slate-300">treasury = fee × 20%</div>
            <div className="text-amber-400 font-bold">referral = fee × 30%</div>
            <div className="text-slate-300">staking = fee × 50%</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            <div className="text-slate-500 text-[9px] font-bold mb-1">REFERRAL LEVELS CALC</div>
            <div className="text-slate-300">L1 = referral × 70%</div>
            <div className="text-slate-300">L2 = referral × 25%</div>
            <div className="text-slate-300">L3 = referral × 5%</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
            <div className="text-slate-500 text-[9px] font-bold mb-1">GLOBAL COMPOUND REAL</div>
            <div className="text-amber-400 font-bold">L1 = Gross × 0.210%</div>
            <div className="text-slate-300">L2 = Gross × 0.075%</div>
            <div className="text-slate-300">L3 = Gross × 0.015%</div>
          </div>
        </div>
      </motion.div>

      {/* 7. CONTRACT EXECUTION TIMELINE (ATOMICIDADE ADICIONADA) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Clock size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Execution Pipeline Timeline</h3>
        </div>

        <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {[
              { step: "01", title: "Claim Call", desc: "User solicita o saque dos lucros minerados.", icon: <Cpu size={12} /> },
              { step: "02", title: "Fee Lock", desc: "Contrato retém a taxa fixa imutável de 1%.", icon: <ShieldCheck size={12} /> },
              { step: "03", title: "Split Engine", desc: "Divisão automática em Vault, Referral e Staking.", icon: <Layers size={12} /> },
              { step: "04", title: "Affiliate Run", desc: "Sub-split divide o lote de afiliados nos 3 níveis.", icon: <GitMerge size={12} /> },
              { step: "05", title: "Settlement", desc: "Treasury, Referral e Staking atualizados de forma atômica.", icon: <Wallet size={12} />, high: true }
            ].map((node, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-900 flex flex-col justify-between space-y-3 group hover:border-slate-800 transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">{node.step}</span>
                  <span className="text-slate-600 text-xs">{node.icon}</span>
                </div>
                <div>
                  <h5 className={`text-xs font-black uppercase tracking-wide block mb-1 ${node.high ? 'text-amber-400' : 'text-slate-200'}`}>{node.title}</h5>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 8. SMART CONTRACT PIPELINE WITH _DISTRIBUTE (MAIS PRÓXIMO DO BAIXO NÍVEL DA EVM/SOL) */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <span className="text-[10px] font-mono font-black uppercase text-slate-600 tracking-widest block flex items-center justify-center gap-1.5">
          <Coins size={12} className="text-amber-500" /> Low-Level Smart Contract Pipeline Summary
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono font-bold text-slate-400 max-w-4xl mx-auto pt-2">
          <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-white">claim()</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-amber-500">1% Fee Retained</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900/50 px-2.5 py-1 rounded border border-amber-500/40 text-slate-200 font-extrabold">_distribute()</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">Treasury</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-amber-400">Referral Pool</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">Staking</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900/80 px-2.5 py-1 rounded border border-amber-500/20 text-amber-500">_payReferral3Levels()</span>
          <ArrowRight size={10} className="text-slate-700" />
          <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-white">transfer()</span>
        </div>
      </motion.div>

    </motion.div>
  );
}