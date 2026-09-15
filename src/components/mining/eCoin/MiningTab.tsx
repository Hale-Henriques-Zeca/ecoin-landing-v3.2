"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ArrowLeft, Pickaxe, TrendingUp, Gauge, Zap, BarChart2, ShieldCheck, Sparkles } from "lucide-react";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { useMiningStaking } from "@/hooks/useMiningStaking";

// Sub-componentes
import RewardVelocityGraph from "@/components/RewardVelocityGraph";
import LiveRewardCounter from "@/app/eCoin-ShareHolder/components/LiveRewardCounter";
import RewardStreamIndicator from "@/app/eCoin-ShareHolder/components/RewardStreamIndicator";
import APRPanel from "@/components/APRPanel";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";

// Tipo sincronizado com as 5 janelas temporais do APRPanel
type WindowType = "1m" | "1h" | "24h" | "7d" | "30d";

// Abas internas do módulo MiningTab
type SubTabType = "velocidade" | "apr" | "distribuicao" | "projetados";

interface MiningTabProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  menuItems?: Array<{ id: string; label: string; icon: LucideIcon }>;
  pendingUSDT?: number;
  pendingEUSD?: number;
  userStake?: number | string;
}

export default function MiningTab({
  setActiveTab,
  menuItems,
  pendingUSDT: propPendingUSDT,
  pendingEUSD: propPendingEUSD,
  userStake: propUserStake,
}: MiningTabProps) {
  const router = useRouter();
  const { address } = useAccount();
  const mining = useMiningStaking();

  const [mounted, setMounted] = useState(false);
  const [internalTab, setInternalTab] = useState<SubTabType>("velocidade");

  // Estado interno de projeção suportando as 5 janelas temporais ("1m" | "1h" | "24h" | "7d" | "30d")
  const [projectionWindow, setProjectionWindow] = useState<WindowType>("7d");

  // Busca autônoma de pendências no contrato caso não venham via Props
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    chainId: 56,
    args: address ? [address] : undefined,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchedPendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const fetchedPendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;
  const fetchedUserStake = Number(mining.userStake || 0);

  // Valores Finais (Props com Fallback para Hook/Contrato)
  const currentPendingUSDT = propPendingUSDT ?? fetchedPendingUSDT;
  const currentPendingEUSD = propPendingEUSD ?? fetchedPendingEUSD;
  const currentUserStake = propUserStake ?? fetchedUserStake;

  if (!mounted) return null;

  // Itens do menu interno de abas
  const internalMenuItems: {
    id: SubTabType;
    label: string;
    subtitle: string;
    icon: React.ElementType;
    activeStyle: string;
    mobileColor: string;
  }[] = [
    {
      id: "velocidade",
      label: "Live Rewards",
      subtitle: "Gráfico e contador ao vivo",
      icon: TrendingUp,
      activeStyle: "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] font-bold",
      mobileColor: "text-[#D4AF37]"
    },
    {
      id: "apr",
      label: "Painel APR",
      subtitle: "Rentabilidade por janela de tempo",
      icon: Gauge,
      activeStyle: "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] font-bold",
      mobileColor: "text-emerald-400"
    },
    {
      id: "distribuicao",
      label: "Velocidade Fluxo",
      subtitle: "Ritmo de distribuição dos blocos",
      icon: Zap,
      activeStyle: "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] font-bold",
      mobileColor: "text-blue-400"
    },
    {
      id: "projetados",
      label: "Projeção Ganhos",
      subtitle: "Estimativa futura de rendimentos",
      icon: BarChart2,
      activeStyle: "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.3)] font-bold",
      mobileColor: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pt-6 pb-28 lg:pb-12 px-2 lg:px-6 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0f172a_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto space-y-6 relative z-10">
        
        {/* 🧭 CABEÇALHO SUPERIOR */}
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
            <Pickaxe size={16} className="text-[#D4AF37]" />
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Mineração</span>
          </div>
        </motion.div>

        {/* GRID OPCIONAL PASSADO VIA PROPS PARA NAVEGAÇÃO EXTERNA (MOBILE) */}
        {menuItems && menuItems.length > 0 && (
          <div className="block lg:hidden mb-4 px-2">
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={`mobile-grid-${item.id}`}
                    onClick={() => setActiveTab?.(item.id)}
                    className="bg-[#0d0d0f] border border-white/10 p-3 rounded-2xl flex items-center gap-3 active:scale-95 transition-all group cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 truncate">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            LAYOUT PRINCIPAL: SIDEBAR + CONTEÚDO DAS ABAS
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 1. NAVEGAÇÃO LATERAL (DESKTOP & LAPTOP) */}
          <aside className="hidden lg:flex flex-col w-72 bg-[#090a14] border border-white/10 rounded-3xl p-3.5 h-fit sticky top-28 gap-1.5 shadow-2xl">
            <div className="px-3 py-2 mb-1 border-b border-white/10 flex items-center gap-2">
              <Pickaxe size={16} className="text-[#D4AF37]" />
              <span className="font-black tracking-wider text-xs text-white/90 uppercase font-mono">
                PAINEL DE MINERAÇÃO
              </span>
            </div>

            {internalMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = internalTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setInternalTab(item.id)}
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
                        ? item.id === "velocidade"
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
              
              {/* ABA 1: VELOCIDADE E LIVE REWARDS */}
              {internalTab === "velocidade" && (
                <motion.div
                  key="tab-velocidade"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  <div className="lg:col-span-7 bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                    <RewardVelocityGraph pendingUSDT={currentPendingUSDT} />
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <LiveRewardCounter
                      pendingUSDT={currentPendingUSDT}
                      pendingEUSD={currentPendingEUSD}
                    />
                    <RewardStreamIndicator />
                  </div>
                </motion.div>
              )}

              {/* ABA 2: PAINEL APR */}
              {internalTab === "apr" && (
                <motion.div
                  key="tab-apr"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <APRPanel
                    yearlyRewards={(currentPendingUSDT + currentPendingEUSD) * 365}
                    stakedAmount={Number(currentUserStake)}
                    window={projectionWindow}
                    setWindow={setProjectionWindow}
                  />
                </motion.div>
              )}

              {/* ABA 3: PAINEL DE VELOCIDADE DE DISTRIBUIÇÃO */}
              {internalTab === "distribuicao" && (
                <motion.div
                  key="tab-distribuicao"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <RewardVelocityPanel pendingUSDT={currentPendingUSDT} />
                </motion.div>
              )}

              {/* ABA 4: DIVIDENDOS PROJETADOS */}
              {internalTab === "projetados" && (
                <motion.div
                  key="tab-projetados"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ProjectedRewardsPanel pendingUSDT={currentPendingUSDT} />
                </motion.div>
              )}

            </AnimatePresence>

            {/* RODAPÉ MÓDULO */}
            <div className="text-center text-zinc-600 text-[10px] pt-8 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2 font-mono">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>EdenKingDom Staking Core Engine</span>
              <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
            </div>
          </section>
        </div>

      </div>

      {/* =========================================================================
          3. NAVEGAÇÃO INFERIOR FLUTUANTE (MOBILE & SMARTPHONE)
         ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#090a14]/95 border-t border-white/10 backdrop-blur-xl z-50 px-2 py-2 overflow-x-auto flex items-center gap-1 shadow-2xl [scrollbar-width:none]">
        {internalMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = internalTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setInternalTab(item.id)}
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