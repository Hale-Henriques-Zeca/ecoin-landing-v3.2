"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  ShieldCheck, 
  Cpu, 
  Leaf, 
  Award, 
  Network, 
  ArrowDown, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Terminal, 
  RefreshCw, 
  XCircle, 
  Users, 
  FileText, 
  Code 
} from 'lucide-react';

// ============================================================================
// CONSTANTES CRIPTOGRÁFICAS E CONFIGURAÇÕES
// ============================================================================
const FEE_PCT = "1%";
const TREASURY_PCT = "20%";
const REFERRAL_PCT = "30%";
const STAKING_PCT = "50%";

const L1_PCT = "70%";
const L2_PCT = "25%";
const L3_PCT = "5%";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

export default function ProgramOverview() {
  return (
    <motion.div 
      className="w-full max-w-6xl mx-auto space-y-12 text-slate-100 pb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      
      {/* HEADER INSTITUCIONAL */}
      <motion.div variants={itemVariants} className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-950 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
          <Compass size={12} /> Protocol Architecture
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-slate-100 via-slate-400 to-amber-400 bg-clip-text text-transparent">
          Withdrawal Referral Program
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          A fundação filosófica, mecânica econômica e garantias criptográficas que asseguram a sustentabilidade vitalícia do ecossistema de rede.
        </p>
      </motion.div>

      {/* 1 & 8. EXECUTIVE OVERVIEW DASHBOARD WITH PROPORTION BARS */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Global Withdrawal Fee", value: FEE_PCT, desc: "Fixed Smart Contract Tax" },
            { title: "Treasury Allocation", value: TREASURY_PCT, desc: "Ecosystem Infrastructure" },
            { title: "Referral Core Pool", value: REFERRAL_PCT, desc: "Multi-Tier Leader Rewards" },
            { title: "Staking Core Pool", value: STAKING_PCT, desc: "Liquidity Mining Injection" }
          ].map((card, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-1 font-mono">
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block font-bold">{card.title}</span>
              <div className="text-lg md:text-2xl font-black tracking-tight text-slate-200">{card.value}</div>
              <span className="text-[9px] text-slate-600 block leading-tight">{card.desc}</span>
            </div>
          ))}
        </div>

        {/* Proportional Macro Distribution Bar */}
        <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl space-y-2 font-mono text-[9px]">
          <span className="text-slate-500 uppercase font-bold tracking-wider">Fee Distribution Proportional Weight</span>
          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800">
            <div className="h-full bg-slate-600 transition-all" style={{ width: '20%' }} title="Treasury: 20%" />
            <div className="h-full bg-amber-500 transition-all" style={{ width: '30%' }} title="Referral: 30%" />
            <div className="h-full bg-emerald-500 transition-all" style={{ width: '50%' }} title="Staking: 50%" />
          </div>
          <div className="flex gap-4 text-slate-500 font-bold justify-between sm:justify-start">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-slate-600 inline-block"/> Treasury (20%)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500 inline-block"/> Referral Pool (30%)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500 inline-block"/> Staking Pool (50%)</span>
          </div>
        </div>
      </motion.div>

      {/* 6. PROGRAM PHILOSOPHY (NOW WITH 4 CARDS) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
          <Cpu size={14} className="text-slate-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">Program Philosophy & Tokenomics Drive</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Protocol Sustainability", desc: "A taxa de saque de 1% não é um custo arbitrário, mas sim um motor de recirculação líquida real. 20% dela garante fundos permanentes para o Tesouro agir globalmente.", icon: <ShieldCheck size={18} />, color: "text-blue-400" },
            { title: "Strategic Leader Incentives", desc: "Destinar 30% da arrecadação diretamente para o Pool de Referência incentiva construtores de rede a expandirem a base ativa de forma orgânica e altamente escalável.", icon: <Award size={18} />, color: "text-amber-400" },
            { title: "Mining & Staking Fuel", desc: "A maior fatia (50%) retorna diretamente para o Pool Central de Staking, retroalimentando e estendendo a liquidez vitalícia dos contratos de mineração de longo prazo.", icon: <Leaf size={18} />, color: "text-emerald-400" },
            { title: "Economic Circularity", desc: "Cada saque efetuado fortalece o protocolo em vez de enfraquecê-lo, criando um ciclo onde a atividade financia continuamente a infraestrutura e recompensas.", icon: <RefreshCw size={17} />, color: "text-purple-400" }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/50 border border-slate-900 p-5 rounded-2xl space-y-2">
              <div className={`${item.color} bg-slate-900/50 w-fit p-2 rounded-xl border border-slate-800`}>{item.icon}</div>
              <h4 className="text-xs font-bold text-slate-200 uppercase font-mono">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 1. PROTOCOL LIFECYCLE (THE LOOP NARRATIVE) */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
          <RefreshCw size={13} className="text-purple-400" /> Protocol Economic Lifecycle
        </h3>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          O ecossistema opera sob uma engenharia fechada de auto-reforço. Entenda como o fluxo de capital gera tração perpétua:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 font-mono text-[9px] font-bold text-slate-400 pt-2">
          {["User Withdraws", "1% Protocol Fee", "Treasury & Rewards Distributed", "Staking Liquidity Boosted", "Stronger Ecosystem", "More Active Users"].map((step, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="bg-slate-900 border border-slate-850 px-3 py-2 rounded-lg text-slate-300 shadow-sm">
                {step}
              </div>
              {idx < arr.length - 1 && <span className="text-slate-700 text-xs hidden sm:inline">→</span>}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* 2. VALUE COMPARATIVE: REAL VALUE VS TOKEN PRINTING */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-red-950 bg-red-950/[0.02] p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-mono font-black text-red-400 uppercase flex items-center gap-2">
            <XCircle size={14} /> Traditional Inflationary Models (MLM)
          </h4>
          <ul className="space-y-2 font-sans text-xs text-slate-500 list-inside list-disc">
            <li>Emite tokens sintéticos sem colateral para pagar redes.</li>
            <li>Cria pressão de venda artificial contínua e inevitável.</li>
            <li>Diluição agressiva do suprimento e colapso de valor a longo prazo.</li>
            <li>Dependência matemática de nova injeção extrema de capital externo.</li>
          </ul>
        </div>
        <div className="border border-emerald-950 bg-emerald-950/[0.02] p-5 rounded-2xl space-y-3">
          <h4 className="text-xs font-mono font-black text-emerald-400 uppercase flex items-center gap-2">
            <CheckCircle2 size={14} /> Withdrawal Commission Blueprint
          </h4>
          <ul className="space-y-2 font-sans text-xs text-slate-400 list-inside list-disc">
            <li>Utiliza **taxas líquidas de saques reais** já consolidados.</li>
            <li>Distribuição imediata e direta de frações nativas e colateralizadas.</li>
            <li>**Zero inflação:** Nenhuma moeda nova é emitida para satisfazer a rede.</li>
            <li>Modelo auto-sustentável amparado na atividade orgânica da blockchain.</li>
          </ul>
        </div>
      </motion.div>

      {/* 3. WHO BENEFITS? ALL PARTICIPANTS MATRICES */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-center gap-1.5 px-1 text-slate-400">
          <Users size={14} className="text-slate-400" />
          <span className="text-xs font-black uppercase tracking-wider font-mono">Symmetric Value Distribution: Who Benefits?</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[11px]">
          {[
            { role: "Standard User", action: "Receives 99%", note: "Acesso a saques limpos e protegidos sob uma taxa previsível e fixa." },
            { role: "Network Leader", action: "Receives Referral Pool", note: "Monetiza as três camadas da rede com liquidação automática direta em conta." },
            { role: "Core Treasury", action: "Funds Infrastructure", note: "Garante capital estratégico para auditorias e escalabilidade do ecossistema." },
            { role: "Liquidity Stakers", action: "Receive Staking Yield", note: "Recebem injeção constante de 50% das taxas, ampliando o ROI de mineração." }
          ].map((p, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-1.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase block">{p.role}</span>
              <div className="text-slate-200 font-black tracking-wide uppercase">{p.action}</div>
              <p className="text-[10px] text-slate-600 font-sans leading-tight">{p.note}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. THREE-LEVEL REFERRAL SYSTEM */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
          <Network size={14} className="text-amber-500" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">Multi-Tier Network Architecture</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {[
            { level: "Level 1", pct: L1_PCT, type: "Direct Affiliates", desc: "Membros diretamente indicados pelo seu código. Recebe a maior fatia de distribuição (70% do pool de referência) devido ao impacto de liderança direta.", border: "border-amber-500/20 bg-amber-500/[0.01]" },
            { level: "Level 2", pct: L2_PCT, type: "Indirect Network", desc: "Utilizadores trazidos pelos seus afiliados de Nível 1. Permite-lhe alavancar o crescimento geométrico da rede sem depender unicamente de ações de recrutamento próprias (25% do pool).", border: "border-slate-800" },
            { level: "Level 3", pct: L3_PCT, type: "Extended Nodes", desc: "A camada profunda da sua organização. Beneficia-se da capilaridade e da replicação em massa do comportamento de rede nas subcamadas mais distantes (5% do pool).", border: "border-slate-800" }
          ].map((tier, idx) => (
            <div key={idx} className={`border p-5 rounded-xl space-y-2 relative font-mono ${tier.border}`}>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{tier.level} • {tier.type}</span>
                <span className="text-base font-black text-amber-400">{tier.pct}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">{tier.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4 & 5. DISTRIBUTION PRINCIPLES & SUSTAINABILITY LOGIC */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400" /> Immutable Distribution Principles
          </h4>
          <ul className="space-y-3 font-mono text-[11px] text-slate-400">
            <li className="flex gap-2.5"><span className="text-emerald-500 font-bold">✓</span> <span><strong>100% Automated:</strong> Sem processamento manual ou janelas de espera. O processamento ocorre no ato exato do saque.</span></li>
            <li className="flex gap-2.5"><span className="text-emerald-500 font-bold">✓</span> <span><strong>Fixed Percentages:</strong> As frações matemáticas são estáticas e blindadas no código do contrato inteligente.</span></li>
            <li className="flex gap-2.5"><span className="text-emerald-500 font-bold">✓</span> <span><strong>On-Chain Execution:</strong> Toda a divisão do pipeline de taxas é transparente e auditável publicamente no ledger.</span></li>
            <li className="flex gap-2.5"><span className="text-emerald-500 font-bold">✓</span> <span><strong>Zero Counterparty Risk:</strong> O saldo de recompensa é enviado direto para a carteira de crédito do líder.</span></li>
          </ul>
        </div>

        <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-4">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
            <Leaf size={13} className="text-blue-400" /> Mathematical Balance Security
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Nenhum bônus é gerado por estimativas subjetivas. Toda a arquitetura assenta-se sobre balanços estritos e fechamento criptográfico real.
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 font-mono text-[10px] text-slate-400 leading-relaxed">
            <span className="text-slate-200 font-bold block mb-1">Fechamento de Caixa Criptográfico:</span>
            A soma das alocações fracionadas (20% Tesouro + 30% Referral + 50% Staking) é matematicamente igual a 100% da taxa coletada pela máquina da EVM. Não há passivos ocultos.
          </div>
        </div>
      </motion.div>

      {/* 5. SEPARATED TECH ROBUSTNESS (SMART CONTRACT PROPERTIES) */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
          <Code size={13} className="text-amber-400" /> Smart Contract Architecture Properties
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-[9px] text-slate-400">
          {[
            "Upgradeable Proxy", "ReentrancyGuard", "OpenZeppelin Base", 
            "SafeERC20 Hooks", "Ownable Roles", "EVM Native Split"
          ].map((prop, idx) => (
            <div key={idx} className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-850 text-center font-bold">
              <span className="text-amber-400/80 block mb-0.5">▪</span> {prop}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7. PROTOCOL TECHNICAL GUARANTEES GRID */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
          <Lock size={13} className="text-slate-400" /> Hardcoded Cryptographic Guarantees
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[10px]">
          {[
            { name: "Reentrancy Guard Protection", status: "Active Secured", desc: "Bloqueio nativo contra ataques de chamada recursiva nos saques." },
            { name: "Immutable Split Matrix", status: "Hardcoded", desc: "Impossibilidade de alteração arbitrária das frações e regras de comissão." },
            { name: "Zero Manual Interventions", status: "100% On-Chain", desc: "Lógica matemática autoexecutável independente de governança humana." },
            { name: "Public Ledger Auditability", status: "Open Source", desc: "Verificação aberta em tempo real através dos block explorers públicos." },
            { name: "Sovereign Liquidity Control", status: "Non-Custodial", desc: "O protocolo nunca retém ou bloqueia as recompensas geradas legitimamente." },
            { name: "Mathematical Balance Check", status: "Zero Variance", desc: "Consistência de balanço verificada por asserções em nível de bytecode." }
          ].map((g, idx) => (
            <div key={idx} className="bg-slate-900/40 p-3 rounded-xl border border-slate-900 flex justify-between items-start gap-4">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-300 block">{g.name}</span>
                <span className="text-slate-600 block text-[9px] font-sans leading-tight">{g.desc}</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-bold uppercase tracking-wider shrink-0">{g.status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7 & 8. PIPELINE VISUAL FLOW DIAGRAM WITH MATH VALIDATION */}
      <motion.div variants={itemVariants} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
          <Terminal size={14} className="text-slate-500" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 font-mono">Consolidated On-Chain Flow Architecture</h3>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 font-mono text-[10px] text-slate-400 text-center max-w-3xl mx-auto">
          
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-slate-200 font-bold w-full sm:w-auto">
            User Individual Withdrawal Event (100%)
          </div>
          
          <ArrowDown size={14} className="text-slate-700" />
          
          <div className="grid grid-cols-2 gap-4 w-full text-center">
            <div className="bg-slate-900/40 border border-slate-900 p-2.5 rounded-xl">
              <span className="text-slate-500 block text-[9px]">LÍQUIDO SACADO</span>
              <span className="text-slate-300 font-bold">99% Net Disbursed to User Wallet</span>
            </div>
            <div className="bg-amber-500/[0.02] border border-amber-500/20 p-2.5 rounded-xl text-amber-500 font-bold">
              <span className="text-amber-600 block text-[9px]">TAXA DE PROTOCOLO</span>
              <span>1% Core Contract Fee Collected</span>
            </div>
          </div>

          <div className="w-full flex justify-end pr-[25%]"><ArrowDown size={14} className="text-slate-700" /></div>

          <div className="grid grid-cols-3 gap-2 w-full text-[9px]">
            <div className="bg-slate-900/40 p-2 rounded border border-slate-900">
              <span className="text-slate-600 block">TREASURY POOL (20%)</span>
              <span className="text-slate-400 font-bold">0.20% Global Weight</span>
            </div>
            <div className="bg-amber-500/10 p-2 rounded border border-amber-500/30 text-amber-400 font-bold">
              <span className="text-amber-500/60 block">REFERRAL POOL (30%)</span>
              <span className="text-amber-400">0.30% Global Weight</span>
            </div>
            <div className="bg-slate-900/40 p-2 rounded border border-slate-900">
              <span className="text-slate-600 block">STAKING POOL (50%)</span>
              <span className="text-slate-400 font-bold">0.50% Global Weight</span>
            </div>
          </div>

          <div className="w-full flex justify-center"><ArrowDown size={14} className="text-amber-600/50" /></div>

          {/* Cascade Split with Mathematical Self-Validation */}
          <div className="bg-slate-950 border border-amber-500/20 p-3 rounded-xl w-full space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-amber-500 font-black uppercase text-[9px] tracking-wider">Referral Pool Cascade Split (100% of Allocation)</span>
              <span className="text-[8px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-900 uppercase">
                {L1_PCT} + {L2_PCT} + {L3_PCT} = 100% Verified Matrix
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[9px]">
              <div className="bg-slate-900/60 p-2 rounded border border-slate-850">
                <span className="text-slate-500 block">L1 SHARE (70%)</span>
                <span className="text-amber-400 font-black">0.210% Net Net Split</span>
                <span className="text-slate-600 block text-[8px] mt-0.5">Instant Wallet Credit</span>
              </div>
              <div className="bg-slate-900/40 p-2 rounded border border-slate-900">
                <span className="text-slate-500 block">L2 SHARE (25%)</span>
                <span className="text-slate-300 font-bold">0.075% Net Net Split</span>
                <span className="text-slate-600 block text-[8px] mt-0.5">Instant Wallet Credit</span>
              </div>
              <div className="bg-slate-900/40 p-2 rounded border border-slate-900">
                <span className="text-slate-500 block">L3 SHARE (5%)</span>
                <span className="text-slate-400 font-bold">0.015% Net Net Split</span>
                <span className="text-slate-600 block text-[8px] mt-0.5">Instant Wallet Credit</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* 4 & 9. PROTOCOL PROFILE SUMMARY / SPECS SUMMARY */}
      <motion.div variants={itemVariants} className="bg-slate-950/60 border border-slate-900 p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
          <FileText size={13} /> Protocol Specification Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px]">
          {[
            { label: "Target Network", val: "BNB Smart Chain (EVM)" },
            { label: "Execution Logic", val: "100% On-Chain Engine" },
            { label: "Settlement Rule", val: "Instant Block Settlement" },
            { label: "Security Framework", val: "OpenZeppelin Standards" }
          ].map((spec, i) => (
            <div key={i} className="border-l border-slate-800 pl-3 py-1 space-y-0.5">
              <span className="text-slate-600 block text-[9px] font-bold uppercase">{spec.label}</span>
              <span className="text-slate-300 font-black block">{spec.val}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 10. FINAL INSPIRATIONAL STATEMENT */}
      <motion.div 
        variants={itemVariants} 
        className="bg-gradient-to-b from-slate-950 to-slate-900/60 border border-slate-800 rounded-3xl p-8 text-center space-y-4 max-w-4xl mx-auto shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <h4 className="text-sm font-mono font-black uppercase tracking-wider text-slate-300">
          The Withdrawal Commission Paradigm
        </h4>
        <p className="text-xs md:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Ao fundir <span className="text-slate-200 font-bold">Segurança Criptográfica</span>, <span className="text-slate-200 font-bold">Transparência On-Chain</span>, <span className="text-slate-200 font-bold">Automação Célere</span> e <span className="text-slate-200 font-bold">Sustentabilidade Macroeconômica</span>, o protocolo elimina a necessidade de confiança em intermediários. Criamos um ecossistema perfeitamente equilibrado que recompensa a liderança legítima enquanto expande e perpetua a liquidez global da plataforma.
        </p>
        <div className="text-[10px] font-mono text-amber-400/90 font-black uppercase tracking-widest pt-2 space-y-1">
          <div>Built for Scale. Governed by Mathematics.</div>
          <div className="text-slate-500 text-[9px]">Powered by Real Economic Activity.</div>
        </div>
      </motion.div>

    </motion.div>
  );
}