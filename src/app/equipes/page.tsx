"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import LevelTree from "./components/LevelTree";
import BonusTable from "./components/BonusTable";
import BonusCard from "./components/BonusCard";
import InfoBox from "./components/InfoBox";

// ICONS (Lucide & React Icons)
import {
  Users,
  BarChart3,
  ShieldCheck,
  Megaphone,
  Trophy,
  Download,
  Flame,
  ArrowDownUp,
  Coins,
  ShieldAlert,
} from "lucide-react";
import { BsStars } from "react-icons/bs";

// COMPONENTES DE LIDERANÇA & REDE
import EcoinLeaderMarketingEngine from "@/components/EcoinLeaderMarketingEngine";
import EcoinLeaderBoard from "@/components/EcoinLeaderBoard";
import ReferralBindPanel from "@/components/ReferralBindPanel";
import ReferralDashboard from "@/components/ReferralDashboard";
import EcoinCommunityMap from "@/components/EcoinCommunityMap";
import EMarketingPage from "@/components/EMarketingPage";
import EcoinNetworkAnalytics from "@/components/EcoinNetworkAnalytics";
import EcoinAdvantages from "@/components/EcoinAdvantages";

function EquipesContent() {
  const [mounted, setMounted] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // 🗂️ ESTADO GLOBAL DE ABAS
  const [activeTab, setActiveTab] = useState<
    "estrutura" | "economia" | "marketing" | "analytics"
  >("estrutura");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Função de Impressão e Exportação para PDF (Windows, Mac, Android e iOS)
  const handleDownloadPDF = () => {
    window.print();
  };

  // Itens do menu estruturados com ícones semânticos
  const menuItems = [
    { id: "estrutura", label: "Minha Rede", icon: Users, color: "text-[#D4AF37]" },
    { id: "economia", label: "Tokenomics", icon: ShieldCheck, color: "text-blue-500" },
    { id: "marketing", label: "Marketing AI", icon: Megaphone, color: "text-purple-500" },
    { id: "analytics", label: "Analytics", icon: BarChart3, color: "text-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-gray-300 pt-20 pb-24 lg:pb-12 px-4 lg:px-8 font-sans selection:bg-yellow-500/30">
      {/* Estilos Globais de Impressão CSS */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #000000 !important;
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
          .print-area {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* Fundo Gradiente sutil */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0f1026,transparent)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* =========================================================================
            1. NAVIGATION BAR LATERAL (DESKTOP & TABLET - NO PRINT)
           ========================================================================= */}
        <aside className="no-print hidden lg:flex flex-col w-64 bg-[#090a14] border border-white/5 rounded-3xl p-4 h-fit sticky top-28 gap-2 shadow-2xl">
          <div className="px-3 py-2 mb-2 border-b border-white/5 flex items-center gap-2">
            <Trophy size={16} className="text-[#D4AF37]" />
            <span className="font-black tracking-wider text-xs text-white/90">
              LIDERANÇA WEB3
            </span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            let activeStyle =
              "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)]";
            if (item.id === "economia")
              activeStyle =
                "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)]";
            if (item.id === "marketing")
              activeStyle =
                "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.25)]";
            if (item.id === "analytics")
              activeStyle =
                "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)]";

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  isActive
                    ? activeStyle
                    : "text-white/50 hover:bg-white/5 hover:text-white"
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
          {/* HEADER PRINCIPAL + BOTÃO PDF (NO PRINT PARA NAVEGAÇÃO) */}
          <div className="bg-[#090a14]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-wide font-mono">
                Líder de Equipes & Acionistas — E-Coin
              </h1>
              <p className="text-gray-400 text-xs md:text-sm max-w-2xl mt-1">
                Arquitetura On-Chain de Distribuição de Bonificações via{" "}
                <span className="text-[#D4AF37] font-semibold">
                  Smart Contracts EVM
                </span>{" "}
                (3 Níveis de Afiliados).
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="no-print w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-bold font-mono text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Download size={16} />
              Exportar PDF On-Chain
            </button>
          </div>

          {/* =========================================================================
              CONTEÚDO DA ABA 1: ESTRUTURA E REDE (3 NÍVEIS REAL)
             ========================================================================= */}
          {activeTab === "estrutura" && (
            <div ref={printRef} className="print-area space-y-10 animate-fadeIn">
              {/* Visão de Explicação Anti-Drain & Regras */}
              <InfoBox />

              {/* Cartões Resumo dos 3 Contratos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <BonusCard
                  title="Venda de Selos"
                  percent="20.00%"
                  levels="3 Níveis"
                  items={[
                    "Nível 1 (L1): 14.00% do valor total",
                    "Nível 2 (L2): 4.00% do valor total",
                    "Nível 3 (L3): 2.00% do valor total",
                    "Pool Staking: 30% alocado direto",
                  ]}
                  color="from-[#D4AF37]/20 via-[#111] to-[#050505]"
                  badgeText="Unified Mining"
                />

                <BonusCard
                  title="Trading Engine"
                  percent="20.00%"
                  levels="3 Níveis"
                  items={[
                    "Nível 1 (L1): 15.00% da taxa cobrada",
                    "Nível 2 (L2): 3.00% da taxa cobrada",
                    "Nível 3 (L3): 2.00% da taxa cobrada",
                    "Reserva Liquidez: 30% injeção",
                  ]}
                  color="from-cyan-500/20 via-[#111] to-[#050505]"
                  badgeText="Trading Profit & ecGas"
                />

                <BonusCard
                  title="Mining Claim Fee"
                  percent="0.30%"
                  levels="3 Níveis"
                  items={[
                    "Taxa Fixa de Saque: 1.00%",
                    "Nível 1 (L1): 0.210% (70% do pool)",
                    "Nível 2 (L2): 0.075% (25% do pool)",
                    "Nível 3 (L3): 0.015% (5% do pool)",
                  ]}
                  color="from-fuchsia-500/20 via-[#111] to-[#050505]"
                  badgeText="Claim Collector"
                />
              </div>

              {/* Árvore Hierárquica */}
              <LevelTree />

              {/* Tabela On-Chain Detalhada */}
              <BonusTable />

              {/* Painéis Interativos de Vinculação e Painel Pessoal */}
              <div className="w-full grid md:grid-cols-2 gap-8 no-print">
                <ReferralBindPanel />
                <ReferralDashboard />
              </div>

              {/* Leaderboard dos Melhores Líderes */}
              <div className="no-print">
                <EcoinLeaderBoard />
              </div>
            </div>
          )}

          {/* =========================================================================
              CONTEÚDO DA ABA 2: ECONOMIA REAL (TOKENOMICS & EXACT CONTRACT FEES)
             ========================================================================= */}
          {activeTab === "economia" && (
            <div className="space-y-12 animate-fadeIn">
              <EcoinAdvantages />

              {/* EFTE DEX & DADOS DE CONTRATOS */}
              <div className="w-full space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-mono">
                    🌐 Arquitetura Tokenomics & CashFlow On-Chain
                  </h2>
                  <p className="text-gray-400 max-w-3xl mx-auto text-xs md:text-sm">
                    Recompensas geradas por utilidade real de rede, sem emissão desenfreada de tokens sem lastro.
                  </p>
                </div>

                {/* TABELA REAL DE DISTRIBUIÇÃO DOS RECURSOS POR CONTRATO */}
                <div className="bg-[#090a14] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
                    <Coins className="text-[#D4AF37]" size={20} />
                    Matriz de Alocação por Contrato (Basis Points BP)
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-xs sm:text-sm text-left">
                      <thead>
                        <tr className="bg-[#111] text-[#D4AF37] font-mono border-b border-white/10">
                          <th className="py-3 px-4">Contrato Origem</th>
                          <th className="py-3 px-4">Referral Pool (3 Níveis)</th>
                          <th className="py-3 px-4">Staking Pool</th>
                          <th className="py-3 px-4">Liquidez / Vault</th>
                          <th className="py-3 px-4">Protocol Treasury</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-gray-300">
                        <tr>
                          <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                            <Flame size={14} className="text-amber-500" /> UnifiedMiningCollector (Selos)
                          </td>
                          <td className="py-3.5 px-4 text-emerald-400 font-mono font-bold">20.0%</td>
                          <td className="py-3.5 px-4 text-blue-400 font-mono">30.0%</td>
                          <td className="py-3.5 px-4 text-cyan-400 font-mono">20.0%</td>
                          <td className="py-3.5 px-4 text-white/60 font-mono">30.0%</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                            <ArrowDownUp size={14} className="text-cyan-500" /> TradingFeeCollector (ecGas)
                          </td>
                          <td className="py-3.5 px-4 text-emerald-400 font-mono font-bold">20.0%</td>
                          <td className="py-3.5 px-4 text-blue-400 font-mono">30.0%</td>
                          <td className="py-3.5 px-4 text-cyan-400 font-mono">30.0%</td>
                          <td className="py-3.5 px-4 text-white/60 font-mono">20.0%</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                            <Coins size={14} className="text-fuchsia-500" /> ECoinMiningFeeCollector (Claim)
                          </td>
                          <td className="py-3.5 px-4 text-emerald-400 font-mono font-bold">30.0% (da taxa 1%)</td>
                          <td className="py-3.5 px-4 text-blue-400 font-mono">50.0% (Buffer)</td>
                          <td className="py-3.5 px-4 text-cyan-400 font-mono">0.0%</td>
                          <td className="py-3.5 px-4 text-white/60 font-mono">20.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* PAINEL PROTEÇÃO ANTI-DRAIN */}
                <div className="bg-gradient-to-r from-red-950/30 via-[#0a0a0a] to-red-950/30 border border-red-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 shrink-0">
                    <ShieldAlert size={28} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400 font-mono uppercase tracking-wide">
                      Mecanismo de Proteção e Liquidez (EUSD Reserve Protection)
                    </h4>
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                      Se o saldo da reserva em EUSD do contrato cair abaixo do limite de segurança de{" "}
                      <strong className="text-white font-mono">10.000 EUSD</strong>, o Smart Contract ativa automaticamente a redução dinâmica de 50% (`dynamicReductionBP = 5000`) nas distribuições extraordinárias, garantindo solubilidade contínua para a rede.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              CONTEÚDO DA ABA 3: ESTÚDIO DE MARKETING & CONTEÚDOS AI
             ========================================================================= */}
          {activeTab === "marketing" && (
            <div className="space-y-12 animate-fadeIn no-print">
              <EcoinLeaderMarketingEngine />
              <EMarketingPage />
            </div>
          )}

          {/* =========================================================================
              CONTEÚDO DA ABA 4: ANALYTICS & MAPEAMENTO DA COMUNIDADE
             ========================================================================= */}
          {activeTab === "analytics" && (
            <div className="space-y-12 animate-fadeIn no-print">
              <EcoinNetworkAnalytics />
              <EcoinCommunityMap />
            </div>
          )}

          {/* RODAPÉ */}
          <footer className="text-center text-gray-600 text-[10px] pt-12 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2 font-mono">
            <span>
              © EdenKingDom Corporation — E-Coin Protocol & Unified Collector Network
            </span>
            <BsStars className="text-yellow-600 animate-pulse" />
          </footer>
        </section>
      </div>

      {/* =========================================================================
          3. BOTTOM NAVIGATION BAR (FLUTUANTE PARA MOBILE / SMARTPHONE - NO PRINT)
         ========================================================================= */}
      <nav className="no-print lg:hidden fixed bottom-0 left-0 right-0 bg-[#090a14]/95 border-t border-white/10 backdrop-blur-md z-50 px-2 py-2 flex items-center justify-around shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
                isActive ? item.color : "text-white/40"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "scale-110 transition-transform" : ""}
              />
              <span className="text-[10px] font-bold tracking-tight font-mono">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function EquipesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-xs">
          CARREGANDO PAINEL ON-CHAIN DE EQUIPES...
        </div>
      }
    >
      <EquipesContent />
    </Suspense>
  );
}