"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSimulator } from "@/hooks/Profit-Simulator/useSimulator";
import InvestmentSimulator from "@/components/components/Simulators/InvestmentSimulator";
import DistributionChart from "@/components/components/Simulators/DistributionChart";
import ProfitTable from "@/components/components/Simulators/ProfitTable";
import { ANIMATION } from "@/lib/Profit-Simulator/constants";

export default function ProfitSimulatorPage() {
  // 1. INVOCAR O CÉREBRO (Única Source of Truth para o Estado e Dados)
  const simulator = useSimulator();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ====================================================================
            HEADER / HERO SECTION
           ==================================================================== */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION.cardsDuration }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-6 gap-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-emerald-500 uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                Investment Intelligence Engine
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mt-2">
              Profit Simulator
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Simule diferentes cenários de staking, ecGas e distribuição automatizada antes de efetuar qualquer operação no ecossistema.
            </p>
          </div>

          {/* Badge de Conexão Live simulada */}
          <div className="flex items-center gap-2 self-start sm:self-center bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Simulation <span className="font-bold text-slate-400">LIVE</span>
            </span>
          </div>
        </motion.header>

        {/* ====================================================================
            LAYOUT DOS COMPONENTES VISUAIS PRINCIPAIS
           ==================================================================== */}
        <div className="flex flex-col gap-8">
          
          {/* COMPONENTE 1: Painel de Controlo e Inputs do Simulador (Largura Total) */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.cardsDuration, delay: 0.1 }}
          >
            <InvestmentSimulator 
              stake={simulator.state.stake}
              ecGas={simulator.state.ecGas}
              window={simulator.state.window}
              setStake={simulator.setStake}
              setEcGas={simulator.setEcGas}
              setWindow={simulator.setWindow}
            />
          </motion.section>

          {/* COMPONENTE 2: Gráfico Sankey / Distribuição do ecGas Queimado */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.sankeyDuration, delay: 0.2 }}
          >
            <DistributionChart
            purchase={simulator.state.ecGas}
            distribution={simulator.distribution} />
          </motion.section>

          {/* COMPONENTE 3: Matriz Global de Prospecção (ProfitTable) */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION.sankeyDuration, delay: 0.3 }}
          >
            <ProfitTable
    rows={simulator.rows}
    currentEcGas={simulator.state.ecGas}
    projectionWindow={simulator.state.window}
    share={simulator.summary.share}
    capacity={simulator.summary.capacity}
/>
          </motion.section>

        </div>
      </div>
    </main>
  );
}