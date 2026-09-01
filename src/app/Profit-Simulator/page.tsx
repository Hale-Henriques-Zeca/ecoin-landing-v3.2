"use client";

import React, { Suspense, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  SlidersHorizontal, 
  GitFork, 
  TableProperties, 
  Sparkles,
  TrendingUp
} from "lucide-react";

import { useSimulator } from "@/hooks/Profit-Simulator/useSimulator";
import InvestmentSimulator from "@/components/Simulators/components/InvestmentSimulator";
import DistributionChart from "@/components/Simulators/components/DistributionChart";
import ProfitTable from "@/components/Simulators/components/ProfitTable";
import { ANIMATION } from "@/lib/Profit-Simulator/constants";

function ProfitSimulatorContent() {
  const [mounted, setMounted] = useState(false);
  
  // Single Source of Truth para o Estado e Dados da Simulação
  const simulator = useSimulator();

  // 🗂️ ESTADO DE ABAS (Para eliminar o scroll longo)
  const [activeTab, setActiveTab] = useState<"simulador" | "distribuicao" | "matriz">("simulador");

  useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) return null;

  // Itens do menu estruturados com ícones semânticos
  const menuItems = [
    { id: "simulador", label: "Simulador", icon: SlidersHorizontal, color: "bg-[#D4AF37]" },
    { id: "distribuicao", label: "Fluxo On-Chain", icon: GitFork, color: "bg-blue-600" },
    { id: "matriz", label: "Matriz de Lucro", icon: TableProperties, color: "bg-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 pt-24 pb-28 lg:pb-12 px-4 lg:px-8 font-sans selection:bg-yellow-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0f1026,transparent)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* =========================================================================
            1. NAVIGATION BAR LATERAL (DESKTOP & LAPTOP)
           ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#090a14] border border-white/10 rounded-3xl p-4 h-fit sticky top-28 gap-2 shadow-2xl">
          <div className="px-3 py-2 mb-2 border-b border-white/10 flex items-center gap-2">
            <Calculator size={16} className="text-[#D4AF37]" />
            <span className="font-black tracking-wider text-xs text-white/90 uppercase font-mono">
              SIMULATOR ENGINE
            </span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            let activeStyle = "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)] font-bold";
            if (item.id === "distribuicao") activeStyle = "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] font-bold";
            if (item.id === "matriz") activeStyle = "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)] font-bold";

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as "simulador" | "distribuicao" | "matriz")}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  isActive ? activeStyle : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* =========================================================================
            2. CONTEÚDO DINÂMICO DA PÁGINA
           ========================================================================= */}
        <section className="flex-1 min-w-0 space-y-8">
          
          {/* HEADER PRINCIPAL / HERO */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.cardsDuration }}
            className="bg-[#090a14]/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/20 flex items-center gap-1.5 font-mono">
                  <Calculator size={14} /> Shareholder Intelligence Engine
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#D4AF37] bg-clip-text text-transparent mt-2">
                Profit & Dividend Simulator
              </h1>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-xl">
                Simule diferentes cenários de retenção de ações, capacidade operacional via selos (CS) e distribuição automatizada de dividendos.
              </p>
            </div>

            {/* Badge Live */}
            <div className="flex items-center gap-2 self-start sm:self-center bg-zinc-900 border border-white/10 px-3.5 py-1.5 rounded-full shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider font-mono">
                Simulation <span className="font-bold text-emerald-400">LIVE</span>
              </span>
            </div>
          </motion.header>

          {/* PAINEL DINÂMICO INTERATIVO COM FRAMER MOTION */}
          <AnimatePresence mode="wait">
            {/* ABA 1: PAINEL DE CONTROLE E INPUTS */}
            {activeTab === "simulador" && (
              <motion.div
                key="simulador-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: ANIMATION.cardsDuration }}
              >
                <InvestmentSimulator 
                  stake={simulator.state.stake}
                  ecGas={simulator.state.ecGas}
                  window={simulator.state.window}
                  setStake={simulator.setStake}
                  setEcGas={simulator.setEcGas}
                  setWindow={simulator.setWindow}
                />
              </motion.div>
            )}

            {/* ABA 2: GRÁFICO DE DISTRIBUIÇÃO ON-CHAIN */}
            {activeTab === "distribuicao" && (
              <motion.div
                key="distribuicao-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: ANIMATION.sankeyDuration }}
              >
                <DistributionChart
                  purchase={simulator.state.ecGas}
                  distribution={simulator.distribution} 
                />
              </motion.div>
            )}

            {/* ABA 3: MATRIZ GLOBAL DE PROSPECÇÃO */}
            {activeTab === "matriz" && (
              <motion.div
                key="matriz-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: ANIMATION.sankeyDuration }}
              >
                <ProfitTable
                  rows={simulator.rows}
                  currentEcGas={simulator.state.ecGas}
                  projectionWindow={simulator.state.window}
                  share={simulator.summary.share}
                  capacity={simulator.summary.capacity}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* RODAPÉ INSTITUCIONAL */}
          <div className="text-center text-zinc-600 text-[10px] pt-8 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2 font-mono">
            <span>© EdenKingDom Corporation — Shareholder Dividend Engine</span>
            <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
          </div>

        </section>
      </div>

      {/* =========================================================================
          3. BOTTOM NAVIGATION BAR (FLUTUANTE PARA MOBILE / SMARTPHONE)
         ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#090a14]/95 border-t border-white/10 backdrop-blur-xl z-50 px-3 py-2.5 flex items-center justify-around shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          let selectColor = "text-[#D4AF37]";
          if (item.id === "distribuicao") selectColor = "text-blue-500";
          if (item.id === "matriz") selectColor = "text-emerald-400";

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as "simulador" | "distribuicao" | "matriz")}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all cursor-pointer ${
                isActive ? selectColor : "text-white/40"
              }`}
            >
              <Icon size={18} className={isActive ? "scale-110 transition-transform" : ""} />
              <span className="text-[10px] font-bold tracking-tight font-mono">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}

export default function ProfitSimulatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020205] flex items-center justify-center text-[#D4AF37] font-mono text-xs">
        CARREGANDO MOTOR DE SIMULAÇÃO...
      </div>
    }>
      <ProfitSimulatorContent />
    </Suspense>
  );
}