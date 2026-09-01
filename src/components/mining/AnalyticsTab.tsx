"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  Award,
  ShieldCheck,
  Users,
  BarChart3,
  Wallet,
  LayoutDashboard,
  ArrowLeft,
  Sparkles
} from "lucide-react";

import StatCard from "@/components/mining/StatCard";
import MiningAnalyticsPanel from "@/components/MiningAnalyticsPanel";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

interface AnalyticsTabProps {
  stats?: {
    myStake?: string | number;
    share?: string | number;
    totalStaked?: string | number;
    totalStakers?: string | number;
  };
  pendingUSDT?: number;
  pendingEUSD?: number;
  usedCapacity?: number;
  maxCapacity?: number;
  overflow?: {
    totalUSDT?: number;
    totalEUSD?: number;
  };
}

type TabType = "metricas" | "analytics" | "carteira";

export default function AnalyticsTab({
  stats = {},
  pendingUSDT = 0,
  pendingEUSD = 0,
  usedCapacity = 0,
  maxCapacity = 0,
  overflow = { totalUSDT: 0, totalEUSD: 0 },
}: AnalyticsTabProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("metricas");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Cálculos das Métricas
  const totalRewards = pendingUSDT + pendingEUSD;
  const efficiency = maxCapacity > 0 ? (usedCapacity / maxCapacity) * 100 : 0;
  const recycled = (overflow.totalUSDT || 0) + (overflow.totalEUSD || 0);

  // Mapeamento das Abas de Navegação
  const menuItems: {
    id: TabType;
    label: string;
    subtitle: string;
    icon: React.ElementType;
    activeStyle: string;
    mobileColor: string;
  }[] = [
    {
      id: "metricas",
      label: "Métricas & Quotas",
      subtitle: "Visão geral de retenção e cotas",
      icon: LayoutDashboard,
      activeStyle: "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] font-bold",
      mobileColor: "text-[#D4AF37]"
    },
    {
      id: "analytics",
      label: "Painel Analytics",
      subtitle: "Rendimentos, APR e eficiência",
      icon: BarChart3,
      activeStyle: "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] font-bold",
      mobileColor: "text-blue-400"
    },
    {
      id: "carteira",
      label: "Carteira eCoin",
      subtitle: "Saldo e gestão financeira",
      icon: Wallet,
      activeStyle: "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] font-bold",
      mobileColor: "text-emerald-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pt-6 pb-28 lg:pb-12 px-2 lg:px-6 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0f172a_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto space-y-6 relative z-10">
        
        {/* 🧭 CABEÇALHO SUPERIOR COM BOTÃO DE VOLTAR AO HUB */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between border-b border-white/10 pb-4 px-2"
        >
          <button
            onClick={() => router.push("/eCoin-ShareHolder")}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={18} className="text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider">Voltar ao Hub</span>
          </button>

          <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
            <BarChart3 size={16} className="text-[#D4AF37]" />
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Analytics</span>
          </div>
        </motion.div>

        {/* 📝 TÍTULO E SUBTÍTULO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-1 px-2"
        >
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Analytics & <span className="text-[#D4AF37]">Rendimentos</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Acompanhe o desempenho de retenção, cálculo de APR e métricas da sua carteira eCoin.
          </p>
        </motion.div>

        {/* =========================================================================
            LAYOUT PRINCIPAL: SIDEBAR + CONTEÚDO DAS ABAS
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 1. NAVEGAÇÃO LATERAL (DESKTOP & LAPTOP) */}
          <aside className="hidden lg:flex flex-col w-72 bg-[#090a14] border border-white/10 rounded-3xl p-3.5 h-fit sticky top-28 gap-1.5 shadow-2xl">
            <div className="px-3 py-2 mb-1 border-b border-white/10 flex items-center gap-2">
              <BarChart3 size={16} className="text-[#D4AF37]" />
              <span className="font-black tracking-wider text-xs text-white/90 uppercase font-mono">
                ANALYTICS ENGINE
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
                        ? item.id === "metricas"
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

          {/* 2. CONTEÚDO DINÂMICO DA ABA SELECIONADA */}
          <section className="flex-1 min-w-0 w-full space-y-8">
            <AnimatePresence mode="wait">
              
              {/* ABA 1: MÉTRICAS E STAT CARDS */}
              {activeTab === "metricas" && (
                <motion.div
                  key="tab-metricas"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  <StatCard
                    label="Minha Retenção"
                    value={stats.myStake ?? "0 eCoin"}
                    icon={Coins}
                    color="gold"
                  />
                  <StatCard
                    label="Quota de Dividendos"
                    value={stats.share ?? "0.00%"}
                    icon={Award}
                    color="purple"
                  />
                  <StatCard
                    label="Retenção Global"
                    value={stats.totalStaked ?? "0 eCoin"}
                    icon={ShieldCheck}
                    color="green"
                  />
                  <StatCard
                    label="Acionistas Ativos"
                    value={stats.totalStakers ?? "0"}
                    icon={Users}
                    color="blue"
                  />
                </motion.div>
              )}

              {/* ABA 2: PAINEL ANALYTICS */}
              {activeTab === "analytics" && (
                <motion.div
                  key="tab-analytics"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <MiningAnalyticsPanel
                    totalRewards={totalRewards}
                    totalGasUsed={usedCapacity}
                    efficiency={efficiency}
                    sessions={5}
                    recycled={recycled}
                    apr={148.22}
                  />
                </motion.div>
              )}

              {/* ABA 3: DASHBOARD DA CARTEIRA ECOIN */}
              {activeTab === "carteira" && (
                <motion.div
                  key="tab-carteira"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6"
                >
                  <EcoinWalletDashboard />
                </motion.div>
              )}

            </AnimatePresence>

            {/* RODAPÉ MÓDULO */}
            <div className="text-center text-zinc-600 text-[10px] pt-8 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2 font-mono">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>EdenKingDom Analytics & Wallet Engine</span>
              <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
            </div>
          </section>
        </div>

      </div>

      {/* =========================================================================
          3. NAVEGAÇÃO INFERIOR FLUTUANTE (MOBILE & SMARTPHONE)
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