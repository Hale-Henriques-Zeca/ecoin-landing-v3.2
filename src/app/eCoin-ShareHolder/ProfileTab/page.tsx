"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  User,
  ShieldAlert,
  Crown,
  Share2,
  Calculator,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { useAccount } from "wagmi";

// Componentes
import { TeamLeaderCTA } from "@/components/CTA/TeamLeaderCTA/TeamLeaderCTA";
import SimulatorRedirectCard from "@/components/Cards/SimulatorRedirectCard";
import ProfitSimulatorCard from "@/components/Cards/ProfitSimulatorCard";
import ReferralCodePanel from "@/components/ReferralCodePanel";
import AdminPage from "@/components/AdminPage";

type TabType =
  | "lideranca"
  | "indicacao"
  | "simulador-lucro"
  | "hub-simuladores"
  | "admin";

export default function ProfileTabPage() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("lideranca");

  // 🛡️ Verificação de Owner/Admin
  const MINING_OWNER = process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();
  const isOwner = Boolean(
    isConnected && address && MINING_OWNER && address.toLowerCase() === MINING_OWNER
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Lista de Abas Dinâmicas (inclui Admin apenas se for Owner)
  const menuItems: {
    id: TabType;
    label: string;
    subtitle: string;
    icon: React.ElementType;
    activeStyle: string;
    mobileColor: string;
  }[] = [
    {
      id: "lideranca",
      label: "Liderança",
      subtitle: "Programa de Líderes de Equipe",
      icon: Crown,
      activeStyle: "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] font-bold",
      mobileColor: "text-[#D4AF37]"
    },
    {
      id: "indicacao",
      label: "Indicação",
      subtitle: "Gestão do código de convite",
      icon: Share2,
      activeStyle: "bg-amber-600 text-white shadow-[0_4px_20px_rgba(217,119,6,0.3)] font-bold",
      mobileColor: "text-amber-500"
    },
    {
      id: "simulador-lucro",
      label: "Simulador Lucro",
      subtitle: "Projeção individual de ganhos",
      icon: Calculator,
      activeStyle: "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] font-bold",
      mobileColor: "text-emerald-400"
    },
    {
      id: "hub-simuladores",
      label: "Hub Simuladores",
      subtitle: "Atalhos para motores de cálculo",
      icon: SlidersHorizontal,
      activeStyle: "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] font-bold",
      mobileColor: "text-blue-400"
    },
    ...(isOwner
      ? [
          {
            id: "admin" as TabType,
            label: "Painel Admin",
            subtitle: "Gestão do ecossistema e contratos",
            icon: ShieldAlert,
            activeStyle: "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.3)] font-bold",
            mobileColor: "text-purple-400"
          }
        ]
      : [])
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pt-6 pb-28 lg:pb-12 px-2 lg:px-6 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b_0%,transparent_50%)] pointer-events-none" />

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
            <User size={16} className="text-[#D4AF37]" />
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Perfil</span>
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
            Configurações & <span className="text-[#D4AF37]">Perfil</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Gerencie seu código de indicação, simuladores de ganhos e ferramentas avançadas da sua conta.
          </p>
        </motion.div>

        {/* =========================================================================
            LAYOUT PRINCIPAL: SIDEBAR + CONTEÚDO DAS ABAS
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 1. NAVEGAÇÃO LATERAL (DESKTOP & LAPTOP) */}
          <aside className="hidden lg:flex flex-col w-72 bg-[#090a14] border border-white/10 rounded-3xl p-3.5 h-fit sticky top-28 gap-1.5 shadow-2xl">
            <div className="px-3 py-2 mb-1 border-b border-white/10 flex items-center gap-2">
              <User size={16} className="text-[#D4AF37]" />
              <span className="font-black tracking-wider text-xs text-white/90 uppercase font-mono">
                PAINEL DO USUÁRIO
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
                        ? item.id === "lideranca"
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
              
              {/* ABA 1: LIDERANÇA DE EQUIPE */}
              {activeTab === "lideranca" && (
                <motion.div
                  key="tab-lideranca"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ReferralCodePanel />
                </motion.div>
              )}

              {/* ABA 2: CÓDIGO DE INDICAÇÃO */}
              {activeTab === "indicacao" && (
                <motion.div
                  key="tab-indicacao"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <TeamLeaderCTA />
                </motion.div>
              )}

              {/* ABA 3: SIMULADOR DE LUCRO */}
              {activeTab === "simulador-lucro" && (
                <motion.div
                  key="tab-simulador-lucro"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <ProfitSimulatorCard />
                </motion.div>
              )}

              {/* ABA 4: HUB DE SIMULADORES */}
              {activeTab === "hub-simuladores" && (
                <motion.div
                  key="tab-hub-simuladores"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <SimulatorRedirectCard />
                </motion.div>
              )}

              {/* ABA 5: PAINEL ADMINISTRATIVO (EXCLUSIVO OWNER) */}
              {activeTab === "admin" && isOwner && (
                <motion.div
                  key="tab-admin"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <ShieldAlert size={18} />
                    <h2 className="text-sm font-bold uppercase tracking-wider">Painel do Administrador</h2>
                  </div>
                  <div className="bg-[#0d0d0f] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl shadow-[#D4AF37]/5">
                    <AdminPage />
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* RODAPÉ MÓDULO */}
            <div className="text-center text-zinc-600 text-[10px] pt-8 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2 font-mono">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>EdenKingDom User Account Engine</span>
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