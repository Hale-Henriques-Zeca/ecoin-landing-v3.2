"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Wallet,
  Globe,
  ArrowRight,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function ProgramOverview() {
  
  // BENEFÍCIOS & VANTAGENS WEB3
  const keyBenefits = [
    { title: "Distribuição Automática", desc: "Os bônus são liquidados na mesma transação de compra." },
    { title: "Sem Intervenção Manual", desc: "Nenhum administrador processa ou retém os seus fundos." },
    { title: "Contrato Inteligente", desc: "Código aberto, auditado e executado na máquina virtual da blockchain." },
    { title: "Transparência Total", desc: "Cada fluxo de faturamento pode ser verificado publicamente no explorer." },
    { title: "Regra Imutável", desc: "O plano de marketing de 3 níveis nunca poderá ser alterado por terceiros." },
    { title: "Arquitetura Descentralizada", desc: "Pagamentos peer-to-peer direto para a sua carteira Web3." },
  ];

  // ETAPAS DE EXPANSÃO GEOMÉTRICA
  const growthSteps = [
    { level: "Você", count: "1 Ativo", style: "from-amber-500 to-yellow-400 text-slate-950 font-black" },
    { level: "Nível L1", count: "10 Líderes", style: "bg-slate-900 border-amber-500/30 text-amber-400" },
    { level: "Nível L2", count: "50 Parceiros", style: "bg-slate-900 border-slate-700 text-slate-300" },
    { level: "Nível L3", count: "250 Afiliados", style: "bg-slate-900 border-amber-900 text-amber-700" },
    { level: "Duplicação", count: "1,000+ Usuários", style: "bg-slate-900/50 border-slate-800 text-slate-400" },
    { level: "Escala Absoluta", count: "5,000+ Conexões", style: "bg-slate-900/30 border-slate-900 text-slate-500" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 text-slate-100 rounded-3xl border border-slate-800/80 shadow-2xl p-6 md:p-10 backdrop-blur-xl space-y-12 relative overflow-hidden">
      
      {/* GLOW DE FUNDO PREMIUM */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. HERO HEADER */}
      <div className="text-center border-b border-slate-800/60 pb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent"
        >
          Referral Program Overview
        </motion.h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 font-medium">
          Tudo o que você precisa saber sobre a arquitetura, regras e o ecossistema de recompensas ecGas.
        </p>
      </div>

      {/* 2. SMART CONTRACT HIGHLIGHTS (ESTRUTURA DE EXTRAÇÃO) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl text-center flex flex-col justify-center"
        >
          <span className="text-2xl md:text-3xl font-black text-white block tracking-tight">20%</span>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1 block">Referral Pool</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="bg-slate-900/40 border border-amber-500/20 p-5 rounded-2xl text-center flex flex-col justify-center"
        >
          <span className="text-2xl md:text-3xl font-black text-amber-400 block tracking-tight">70%</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1 block">Leader L1</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl text-center flex flex-col justify-center"
        >
          <span className="text-2xl md:text-3xl font-black text-slate-300 block tracking-tight">20%</span>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1 block">Leader L2</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
          className="bg-slate-900/40 border border-amber-950 p-5 rounded-2xl text-center flex flex-col justify-center"
        >
          <span className="text-2xl md:text-3xl font-black text-amber-700 block tracking-tight">10%</span>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1 block">Leader L3</span>
        </motion.div>
      </div>

      {/* 3. ROADMAP VISUAL: VETOR DE CRESCIMENTO LINEAR */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
          <TrendingUp size={14} className="text-amber-500" /> Escalabilidade Geométrica da Rede
        </h3>
        
        <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 grid grid-cols-2 md:grid-cols-6 gap-3 relative">
          {growthSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center relative group">
              <div className={`w-full py-3 px-2 rounded-xl text-center border shadow-inner ${step.style} transition-transform group-hover:scale-[1.03]`}>
                <div className="text-[10px] font-black uppercase tracking-wider opacity-80">{step.level}</div>
                <div className="text-xs font-extrabold mt-0.5 whitespace-nowrap">{step.count}</div>
              </div>
              {idx < growthSteps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-700">
                  <ArrowRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 text-center font-medium">
          A compressão dinâmica garante que o volume transacionado em até 3 níveis de profundidade reflita diretamente no seu faturamento recorrente.
        </p>
      </div>

      {/* 4. SEÇÃO DE BENEFÍCIOS TÉCNICOS & DESCENTRALIZAÇÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* CARD ESQUERDO: RESUMO EXECUTIVO DO CONTRATO */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between space-y-6 lg:col-span-1">
          <div className="space-y-3">
            <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck size={22} />
            </div>
            <h4 className="text-lg font-black text-white tracking-tight">Smart Contract Integrado</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Toda a engenharia financeira do ecGas opera em camadas descentralizadas imutáveis. Uma vez disparada a assinatura do stake ou adesão, o ecossistema redistribui a quota imediatamente sem passar por custódias centrais.
            </p>
          </div>
          
          <div className="border-t border-slate-800/80 pt-4 space-y-2 text-[11px] font-bold text-slate-400">
            <div className="flex justify-between"><span>Consenso:</span> <span className="text-slate-200">Blockchain Network</span></div>
            <div className="flex justify-between"><span>Execução:</span> <span className="text-emerald-400">Instantâneo / On-Chain</span></div>
            <div className="flex justify-between"><span>Segurança:</span> <span className="text-slate-200">Código Imutável</span></div>
          </div>
        </div>

        {/* GRID DIREITO: BENEFÍCIOS PARALELOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:col-span-2">
          {keyBenefits.map((benefit, idx) => (
            <div key={idx} className="bg-slate-900/30 border border-slate-800/60 p-4 rounded-xl flex items-start gap-3">
              <CheckCircle2 size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-black uppercase text-slate-200 tracking-wider">{benefit.title}</h5>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 5. FLUXOGRAMA COMPLETO DE PROCESSO RECENTRALIZADO */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6">
        <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2 mb-6 justify-center">
          <Cpu size={14} className="text-amber-500" /> Fluxo Arquitetural Completo do Cashflow
        </span>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-2.5 text-[11px] font-bold text-slate-400">
          <div className="bg-slate-900 py-1.5 px-3 rounded-lg border border-slate-800 text-center w-full lg:w-auto">User Purchase</div>
          <ChevronRight size={14} className="text-slate-700 rotate-90 lg:rotate-0" />
          
          <div className="bg-slate-900 py-1.5 px-3 rounded-lg border border-slate-800 text-center w-full lg:w-auto">Volume Global (100%)</div>
          <ChevronRight size={14} className="text-slate-700 rotate-90 lg:rotate-0" />
          
          <div className="bg-amber-500/10 py-1.5 px-3 rounded-lg border border-amber-500/20 text-amber-400 text-center w-full lg:w-auto font-black">Referral Pool (20%)</div>
          <ChevronRight size={14} className="text-amber-500/30 rotate-90 lg:rotate-0" />
          
          {/* DIVISÃO INTERNA EXPRESSA */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex flex-col md:flex-row gap-2 w-full lg:w-auto text-left">
            <div className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900"><span className="text-amber-400">L1:</span> 70%</div>
            <div className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900"><span className="text-slate-300">L2:</span> 20%</div>
            <div className="px-2 py-0.5 rounded bg-slate-950 border border-slate-900"><span className="text-amber-700">L3:</span> 10%</div>
          </div>
          
          <ChevronRight size={14} className="text-slate-700 rotate-90 lg:rotate-0" />
          <div className="bg-emerald-500/10 py-1.5 px-3 rounded-lg border border-emerald-500/20 text-emerald-400 text-center w-full lg:w-auto font-black flex items-center justify-center gap-1">
            <Wallet size={12} /> Direct Wallet Payment
          </div>
        </div>
      </div>

      {/* 6. FINAL CARD / CALL TO ACTION COM SUPORTE WEB3 */}
      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-8 rounded-3xl text-slate-950 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
        {/* TEXTO INFORMATIVO */}
        <div className="space-y-2 text-center md:text-left z-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-950/80 block">Pronto para Expandir sua Rede?</span>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-slate-950">Conecte sua carteira e inicie a simulação real</h3>
          <p className="text-xs text-amber-950/80 font-bold max-w-md">
            Integre sua estrutura ao dashboard de liderança ecGas e acompanhe em tempo real o fluxo de rendimento.
          </p>
        </div>

        {/* BOTÃO WEB3 SIMULADO */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="bg-slate-950 text-white font-black text-xs px-6 py-4 rounded-xl flex items-center gap-2.5 shadow-xl border border-slate-900 shrink-0 group transition-all"
        >
          <Wallet size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          Connect Web3 Wallet
          <ArrowRight size={14} className="text-slate-400" />
        </motion.button>

        {/* MARCA D'ÁGUA DE FUNDO */}
        <div className="absolute right-0 bottom-0 opacity-10 translate-y-1/3 translate-x-1/4 pointer-events-none">
          <Layers size={240} className="text-slate-950" />
        </div>
      </motion.div>

    </div>
  );
}