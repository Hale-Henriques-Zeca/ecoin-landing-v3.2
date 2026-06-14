"use client";

import { Suspense, useState, useEffect } from "react"; 
import BonusCard from "./components/BonusCard";
import BonusTable from "./components/BonusTable";
import LevelTree from "./components/LevelTree";
import InfoBox from "./components/InfoBox";

// ICONS (Lucide para manter o luxo e padronização visual)
import { Users, BarChart3, ShieldCheck, Megaphone, AudioLines, Trophy } from "lucide-react";

import LeaderMarketingStudio from "@/components/LeaderMarketingStudio";
import EcoinLeaderMarketingEngine from "@/components/EcoinLeaderMarketingEngine";
import EcoinLeaderBoard from "@/components/EcoinLeaderBoard";
import ReferralBindPanel from "@/components/ReferralBindPanel";
import ReferralDashboard from "@/components/ReferralDashboard";
import EcoinCommunityMap from "@/components/EcoinCommunityMap";
import EMarketingPage from "@/components/EMarketingPage";
import EcoinPreparationPhasePanel from "@/components/EcoinPreparationPhasePanel";
import EcoinNetworkAnalytics from "@/components/EcoinNetworkAnalytics";
import AskAIAudioEngine from "@/components/AskAIAudioEngine";
import PremiumDocumentVoice from "@/components/PremiumDocumentVoice";
import DocumentVoicePlayer from "@/components/DocumentVoicePlayer";
import EcoinAdvantages from "@/components/EcoinAdvantages";
import { BsStars } from "react-icons/bs";

function EquipesContent() {
  const [mounted, setMounted] = useState(false);
  
  // 🗂️ ESTADO GLOBAL DE ABAS (Categorias de Liderança)
  const [activeTab, setActiveTab] = useState<"estrutura" | "economia" | "marketing" | "analytics">("estrutura");

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  // Itens do menu estruturados com ícones semânticos
  const menuItems = [
    { id: "estrutura", label: "Minha Rede", icon: Users, color: "bg-[#D4AF37]" },
    { id: "economia", label: "Tokenomics", icon: ShieldCheck, color: "bg-blue-600" },
    { id: "marketing", label: "Marketing AI", icon: Megaphone, color: "bg-purple-600" },
    { id: "analytics", label: "Analytics", icon: BarChart3, color: "bg-emerald-600" },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-gray-300 pt-24 pb-24 lg:pb-12 px-4 lg:px-8 font-sans selection:bg-yellow-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0f1026,transparent)] pointer-events-none" />

      

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* =========================================================================
            1. NAVIGATION BAR LATERAL (DESKTOP & TABLET)
           ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#090a14] border border-white/5 rounded-3xl p-4 h-fit sticky top-28 gap-2">
          <div className="px-3 py-2 mb-4 border-b border-white/5 flex items-center gap-2">
            <Trophy size={16} className="text-[#D4AF37]" />
            <span className="font-black tracking-wider text-xs text-white/90">LIDERANÇA WEB3</span>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            let activeStyle = "bg-yellow-500 text-black shadow-[0_4px_20px_rgba(234,179,8,0.25)]";
            if (item.id === "economia") activeStyle = "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)]";
            if (item.id === "marketing") activeStyle = "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.25)]";
            if (item.id === "analytics") activeStyle = "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)]";

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
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
            CONTEÚDO DINÂMICO DA PÁGINA
           ========================================================================= */}
        <section className="flex-1 min-w-0 space-y-8">
          
          {/* HEADER PRINCIPAL */}
          <div className="bg-[#090a14]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-xl text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] tracking-wide">
              Líder de Equipes — E-Coin
            </h1>
            <p className="text-gray-400 text-xs md:text-sm max-w-2xl mt-2">
              Estrutura oficial de bonificações da Pré-Venda e Staking via telegram bot da moeda corporativa{" "}
              <span className="text-[#D4AF37] font-semibold">E-Coin</span>.
            </p>
          </div>

          {/* CONTEÚDO DA ABA 1: ESTRUTURA E REDE */}
          {activeTab === "estrutura" && (
            <div className="space-y-12 animate-fadeIn">
              <InfoBox />
              <BonusTable />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                <BonusCard
                  title="Pré-Venda via telegram bot"
                  percent="9%"
                  levels="7 níveis"
                  color="from-[#D4AF37] to-[#8d6f24]"
                  items={[
                    "5.10% — 1º nível",
                    "1.10% — 2º nível",
                    "1.00% — 3º nível",
                    "0.90% — 4º nível",
                    "0.50% — 5º nível",
                    "0.30% — 6º nível",
                    "0.10% — 7º nível",
                  ]}
                />
                <BonusCard
                  title="Staking via telegram bot"
                  percent="1%"
                  levels="2 níveis"
                  color="from-[#444] to-[#222]"
                  items={[
                    "0.90% — 1º nível",
                    "0.10% — 2º nível",
                  ]}
                />
              </div>

              <div className="w-full max-w-3xl mx-auto">
                <LevelTree />
              </div>

              <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
                <ReferralBindPanel />
                <ReferralDashboard />
              </div>

              <EcoinLeaderBoard />
            </div>
          )}

          {/* CONTEÚDO DA ABA 2: ECONOMIA REAL (E-SWAP & STAKING ENGINE) */}
          {activeTab === "economia" && (
            <div className="space-y-16 animate-fadeIn">
              <EcoinAdvantages />

              {/* EFTE DEX (E-Swap) */}
              <div className="w-full max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#D4AF37]">
                    🌐 EFTE DEX - E-Coin Converter (E-Swap) — Economia do Protocolo
                  </h2>
                  <p className="text-gray-400 max-w-3xl mx-auto text-sm">
                    A E-Swap não distribui recompensas artificiais. Todo o rendimento do staking nasce do uso real do protocolo.
                  </p>
                </div>

                <div className="bg-[#0D0D0D]/80 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-lg text-gray-200 font-medium">Quanto mais a rede é usada, mais valor circula.</p>
                  <p className="text-gray-400 text-sm mt-2">O staking recebe recompensas continuamente através de CashFlow real gerado pelas transações.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#3B82F6]">💰 O conceito de CashFlow On-Chain</h3>
                  <p className="text-gray-400 text-sm">
                    Sempre que alguém utiliza a DEX, parte das taxas geradas é automaticamente redirecionada para o sistema de recompensas através de contratos inteligentes auditáveis.
                  </p>
                </div>

                {/* TAXAS DO PROTOCOLO */}
                <div className="bg-[#0D0D0D]/80 border border-gray-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-[#D4AF37]">💱 Taxas de Conversão da E-Swap</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-800 rounded-xl overflow-hidden text-sm">
                      <thead className="bg-[#111]">
                        <tr>
                          <th className="px-4 py-3 text-left text-[#D4AF37]">Transação</th>
                          <th className="px-4 py-3 text-left text-[#D4AF37]">Taxa</th>
                          <th className="px-4 py-3 text-left text-[#D4AF37]">Descrição</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        <tr>
                          <td className="px-4 py-3">USDT / EUSD → E-Coin</td>
                          <td className="px-4 py-3 text-[#22C55E]">0.5%</td>
                          <td className="px-4 py-3 text-gray-400">Entrada de liquidez no protocolo</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">E-Coin → USDT / EUSD</td>
                          <td className="px-4 py-3 text-[#F59E0B]">2.5%</td>
                          <td className="px-4 py-3 text-gray-400">Saída de liquidez do protocolo</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3">Claim de Staking</td>
                          <td className="px-4 py-3 text-[#22C55E]">1%</td>
                          <td className="px-4 py-3 text-gray-400">Taxa de distribuição de recompensas</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DISTRIBUIÇÃO DAS TAXAS */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#3B82F6]">📊 Como as taxas são distribuídas</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                    <li>20% → Treasury do protocolo</li>
                    <li>30% → Buyback automático de E-Coin</li>
                    <li>20% → Liquidity Vault</li>
                    <li>10% → Reward Pool de Staking</li>
                    <li>20% → Reserva estratégica</li>
                  </ul>
                </div>
              </div>

              {/* STAKING REWARD ENGINE */}
              <section className="relative overflow-hidden rounded-2xl border border-gray-800 bg-black/40 p-6 md:p-10">
                <h3 className="text-xl font-semibold text-[#D4AF37] mb-4">💰 Staking Reward Engine</h3>
                <p className="text-gray-400 text-sm mb-6">
                  O protocolo utiliza um modelo de <strong>reward streaming buffer</strong> que leva 40% pagos no claiming de volta ao Reward Pool para um novo Círculo de redistribuição gradual.
                </p>

                {/* SINALIZADORES DE FLUXO */}
                <div className="flex flex-col items-center space-y-3 mb-8 text-xs font-mono">
                  <div className="bg-black/50 border border-white/10 rounded-xl px-6 py-2.5">Protocol Fees</div>
                  <div className="text-[#D4AF37]">↓</div>
                  <div className="bg-black/50 border border-white/10 rounded-xl px-6 py-2.5">Reward Buffer</div>
                  <div className="text-[#D4AF37]">↓</div>
                  <div className="bg-black/50 border border-white/10 rounded-xl px-6 py-2.5">Streaming Rewards</div>
                  <div className="text-[#D4AF37]">↓</div>
                  <div className="bg-black/50 border border-[#D4AF37]/40 rounded-xl px-6 py-2.5 text-[#D4AF37]">Stakers</div>
                </div>

                <h4 className="text-md font-semibold text-[#4ade80] mb-2">1️⃣ Claim Fee Redistribution</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse text-xs border border-gray-800">
                    <thead>
                      <tr className="bg-[#D4AF37]/10 text-[#D4AF37]">
                        <th className="border border-gray-700 px-4 py-2 text-left">Destino</th>
                        <th className="border border-gray-700 px-4 py-2 text-left">Percentagem</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-400">
                      <tr><td className="border border-gray-700 px-4 py-2">Referral Rewards</td><td className="border border-gray-700 px-4 py-2">30%</td></tr>
                      <tr><td className="border border-gray-700 px-4 py-2">Gas Pool</td><td className="border border-gray-700 px-4 py-2">20%</td></tr>
                      <tr><td className="border border-gray-700 px-4 py-2">Reward Buffer</td><td className="border border-gray-700 px-4 py-2">40%</td></tr>
                      <tr><td className="border border-gray-700 px-4 py-2">Treasury</td><td className="border border-gray-700 px-4 py-2">10%</td></tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-md font-semibold text-[#facc15] mb-2">2️⃣ Staking Security Layer</h4>
                <ul className="text-gray-400 list-disc list-inside space-y-1 text-sm">
                  <li>Reward streaming buffer para evitar spikes</li>
                  <li>Claim cooldown de 10 minutos</li>
                  <li>Proteção contra flash staking e execução 100% on-chain</li>
                </ul>
              </section>
            </div>
          )}

          {/* CONTEÚDO DA ABA 3: ESTÚDIO DE MARKETING & CONTEÚDOS AI */}
          {activeTab === "marketing" && (
            <div className="space-y-12 animate-fadeIn">
              <EcoinLeaderMarketingEngine />
              <EMarketingPage />
            </div>
          )}

          {/* CONTEÚDO DA ABA 4: ANALYTICS & MAPEAMENTO */}
          {activeTab === "analytics" && (
            <div className="space-y-12 animate-fadeIn">
              <EcoinNetworkAnalytics />
              <EcoinCommunityMap />
            </div>
          )}

          {/* RODAPÉ */}
          <div className="text-center text-gray-600 text-[10px] pt-12 border-t border-white/5 uppercase tracking-widest flex items-center justify-center gap-2">
            <span>© EdenKingDom Corporation — E-Coin & E-Coin Converter (E-Swap) Network</span>
            <BsStars className="text-yellow-600 animate-pulse" />
          </div>

        </section>
      </div>

      {/* =========================================================================
            2. BOTTOM NAVIGATION BAR (FLUTUANTE PARA MOBILE / SMARTPHONE)
           ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#090a14]/95 border-t border-white/10 backdrop-blur-md z-50 px-2 py-2 flex items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          let selectColor = "text-yellow-500";
          if (item.id === "economia") selectColor = "text-blue-500";
          if (item.id === "marketing") selectColor = "text-purple-500";
          if (item.id === "analytics") selectColor = "text-emerald-500";

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${isActive ? selectColor : "text-white/40"}`}
            >
              <Icon size={18} className={isActive ? "scale-110 transition-transform" : ""} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}

export default function EquipesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono text-xs">CARREGANDO PAINEL DE EQUIPES...</div>}>
      <EquipesContent />
    </Suspense>
  );
}