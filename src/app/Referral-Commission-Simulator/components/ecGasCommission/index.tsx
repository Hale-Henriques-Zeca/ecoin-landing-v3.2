"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  TrendingUp,
  LayoutDashboard,
  GitFork,
  ShieldCheck,
  Sparkles,
  Layers,
  Users,
  Calculator
} from "lucide-react";

import Hero from "./Hero";
import CommissionCard from "./CommissionCard";
import ReferralChart from "./ReferralChart";
import CommissionTable from "./CommissionTable";
import MonthlySimulator from "./MonthlySimulator";
import NetworkSimulator from "./NetworkSimulator";
import ReferralProgramOverview from "./ReferralProgramOverview";

type TabType =
  | "hero"
  | "regras"
  | "fluxo"
  | "tabela"
  | "simulador-mensal"
  | "simulador-rede";

export default function ShareCommissionSimulator() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Estados do motor de Subscrição Societária (Share Capital)
  const [totalCapitalSubscribed, setTotalCapitalSubscribed] = useState(25000.00);
  const [shareCommission, setShareCommission] = useState(1875.00);

  // Estados dedicados para o gráfico de distribuição de cotas (ReferralChart)
  const [simulatedSubscription, setSimulatedSubscription] = useState(10000);
  const [simulatedPool, setSimulatedPool] = useState(2000);
  const [lvl1Profit, setLvl1Profit] = useState(1400);
  const [lvl2Profit, setLvl2Profit] = useState(400);
  const [lvl3Profit, setLvl3Profit] = useState(200);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 6 Abas Organizadas
  const menuItems: {
    id: TabType;
    label: string;
    subtitle: string;
    icon: React.ElementType;
    activeStyle: string;
    mobileColor: string;
  }[] = [
    {
      id: "hero",
      label: "Apresentação",
      subtitle: "Visão geral e métricas do programa",
      icon: LayoutDashboard,
      activeStyle: "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] font-bold",
      mobileColor: "text-[#D4AF37]"
    },
    {
      id: "regras",
      label: "Visão Geral",
      subtitle: "Regras e diretrizes do ecossistema",
      icon: ShieldCheck,
      activeStyle: "bg-yellow-600 text-white shadow-[0_4px_20px_rgba(202,138,4,0.3)] font-bold",
      mobileColor: "text-yellow-400"
    },
    {
      id: "fluxo",
      label: "Fluxo",
      subtitle: "Gráfico de distribuição de cotas",
      icon: GitFork,
      activeStyle: "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] font-bold",
      mobileColor: "text-blue-400"
    },
    {
      id: "tabela",
      label: "Cotas",
      subtitle: "Matriz percentual por níveis",
      icon: Layers,
      activeStyle: "bg-indigo-600 text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] font-bold",
      mobileColor: "text-indigo-400"
    },
    {
      id: "simulador-mensal",
      label: "Mensal",
      subtitle: "Projeção de rendimentos societários",
      icon: Calculator,
      activeStyle: "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] font-bold",
      mobileColor: "text-emerald-400"
    },
    {
      id: "simulador-rede",
      label: "Rede",
      subtitle: "Expansão multinível e equipe",
      icon: Users,
      activeStyle: "bg-teal-600 text-white shadow-[0_4px_20px_rgba(13,148,136,0.3)] font-bold",
      mobileColor: "text-teal-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 font-sans pt-6 pb-28 lg:pb-12 px-2 lg:px-6 selection:bg-amber-500/20 selection:text-amber-400">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1a1208,transparent)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* =========================================================================
            1. NAVIGATION BAR LATERAL (DESKTOP & LAPTOP) — 6 ABAS
           ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-72 bg-[#090a14] border border-white/10 rounded-3xl p-3.5 h-fit sticky top-28 gap-1.5 shadow-2xl">
          <div className="px-3 py-2 mb-1 border-b border-white/10 flex items-center gap-2">
            <Briefcase size={16} className="text-[#D4AF37]" />
            <span className="font-black tracking-wider text-xs text-white/90 uppercase font-mono">
              SHARE CAPITAL ENGINE
            </span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col text-left w-full px-3.5 py-2.5 rounded-xl text-xs tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? item.activeStyle
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 font-bold uppercase">
                  <Icon size={15} />
                  <span>{item.label}</span>
                </div>
                <span
                  className={`text-[10px] mt-0.5 font-sans font-normal ${
                    isActive
                      ? item.id === "hero"
                        ? "text-[#020205]/90"
                        : "text-white/90"
                      : "text-slate-500"
                  }`}
                >
                  {item.subtitle}
                </span>
              </button>
            );
          })}
        </aside>

        {/* =========================================================================
            2. CONTEÚDO DINÂMICO
           ========================================================================= */}
        <section className="flex-1 min-w-0 space-y-8">
          <AnimatePresence mode="wait">
            
            {/* ABA 1: HERO + CARDS DE MÉTRICAS UNIFICADOS */}
            {activeTab === "hero" && (
              <motion.div
                key="tab-hero"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="space-y-8"
              >
                <Hero />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
                  <CommissionCard
                    title="Total Comissões Societárias"
                    value={shareCommission}
                    percentage={7.50}
                    subtitle="Rendimento por subscrição distribuído no Nível 1"
                    color="#D4AF37"
                    icon={Briefcase}
                    currency="USDT"
                    delay={0.1}
                  />

                  <CommissionCard
                    title="Volume de Capital Subscrito"
                    value={totalCapitalSubscribed}
                    percentage={15.00}
                    subtitle="Ações adquiridas pela rede de afiliados"
                    color="#3B82F6"
                    icon={TrendingUp}
                    currency="USDT"
                    delay={0.2}
                  />
                </div>
              </motion.div>
            )}

            {/* ABA 2: REGRAS / VISÃO GERAL */}
            {activeTab === "regras" && (
              <motion.div
                key="tab-regras"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ReferralProgramOverview />
              </motion.div>
            )}

            {/* ABA 3: GRÁFICO DE DISTRIBUIÇÃO */}
            {activeTab === "fluxo" && (
              <motion.div
                key="tab-fluxo"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ReferralChart
                  purchase={simulatedSubscription}
                  pool={simulatedPool}
                  l1={lvl1Profit}
                  l2={lvl2Profit}
                  l3={lvl3Profit}
                />
              </motion.div>
            )}

            {/* ABA 4: TABELA DE COMISSÕES */}
            {activeTab === "tabela" && (
              <motion.div
                key="tab-tabela"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <CommissionTable />
              </motion.div>
            )}

            {/* ABA 5: SIMULADOR MENSAL */}
            {activeTab === "simulador-mensal" && (
              <motion.div
                key="tab-simulador-mensal"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <MonthlySimulator />
              </motion.div>
            )}

            {/* ABA 6: SIMULADOR DE REDE */}
            {activeTab === "simulador-rede" && (
              <motion.div
                key="tab-simulador-rede"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <NetworkSimulator />
              </motion.div>
            )}

          </AnimatePresence>

          {/* RODAPÉ MÓDULO */}
          <div className="text-center text-zinc-600 text-[10px] pt-8 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2 font-mono">
            <ShieldCheck size={12} className="text-emerald-500" />
            <span>EdenKingDom Shareholder Consensus Engine</span>
            <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
          </div>
        </section>
      </div>

      {/* =========================================================================
          3. BOTTOM NAVIGATION BAR (HORIZONTALLY SCROLLABLE PARA MOBILE)
         ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#090a14]/95 border-t border-white/10 backdrop-blur-xl z-50 px-2 py-2 overflow-x-auto flex items-center gap-1 shadow-2xl [scrollbar-width:none]">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[72px] px-2 py-1.5 rounded-xl transition-all cursor-pointer ${
                isActive ? `${item.mobileColor} bg-white/5` : "text-white/40"
              }`}
            >
              <Icon size={18} className={isActive ? "scale-110 transition-transform" : ""} />
              <span className="text-[9px] font-bold tracking-tight font-mono uppercase whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}