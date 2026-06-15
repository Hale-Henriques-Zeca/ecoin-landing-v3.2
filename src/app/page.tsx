"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, X, ChevronRight, Menu } from "lucide-react";

// 1. SECTIONS (Macro Layout & Landing Structure)
import Hero from "@/sections/Hero";
import EcoinAISection from "@/sections/EcoinAISection";
import NowSection from "@/sections/NowSection";
import StayInLoopSection from "@/sections/StayInLoopSection";
import EventsShowcase from "@/sections/EventsShowcase";
import BuildersShowcase from "@/sections/BuildersShowcase";
import Ecosystem from "@/sections/Ecosystem";
import Security from "@/sections/Security";
import Roadmap from "@/sections/Roadmap";

// 2. COMPONENTS (Trading Panels, Calculators & Intelligence UI)
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";
import EcoinCarousel from "@/components/EcoinCarousel";
import AITradingCard from "@/components/AITradingCard";
import ECoinDevelopmentNotice from "@/components/ECoinDevelopmentNotice";
import LiquidityPanel from "@/components/LiquidityPanel";
import Chart from "@/components/Chart";
import EFTEBuySellPanel from "@/components/EFTEBuySellPanel";
import EKDSmartFinanceTool from "@/components/EKDSmartFinanceTool";
import NeuralArbitragePanel from "@/components/NeuralArbitragePanel";
import BuyBackSmartPoolDashboard from "@/components/BuyBackSmartPoolDashboard";
import CryptoGrowthSimulator from "@/components/CryptoGrowthSimulator";
import CompoundCalculatorPanel from "@/components/CompoundCalculatorPanel";
import Footer from "@/components/Footer";

// 3. INFO COMPONENTS (Data Display & Bulletins)
import ECoinBenefitsInfo from "@/components/ECoinBenefitsInfo";
import ECoinCashOutInfo from "@/components/ECoinCashOutInfo";
import ECoinFutureSimulatorInfo from "@/components/ECoinFutureSimulatorInfo";
import ECoinPriceSyncInfo from "@/components/ECoinPriceSyncInfo";

// 4. APP SUB-PAGES / CHARTS (Complex Module Embeds)
import BuyBackEngineChart from "@/app/BuyBackEngineChart";
import CareersPage from "@/app/CareersPage";

const SectionDivider = ({ label, id }: { label: string; id?: string }) => (
  <div id={id} className="relative z-10 mt-14 mb-10 flex items-center gap-4 scroll-mt-28">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80 font-medium text-center">
      {label}
    </span>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  </div>
);

export default function Home() {
  return (
    <>
    {/* PHASE 0: HERO */}
      <div id="Hero" className="scroll-mt-28">
      <Hero />
      <BlockchainDeviceAlert />
      </div>

      {/* PHASE 1: HERO & LIVE AWARENESS */}
      <div id="EcoinCarousel" className="scroll-mt-28">
        
        <EcoinCarousel />
        </div>

        <div id="AITradingCard" className="scroll-mt-28">
        <AITradingCard />
        </div>

        <div id="ECoinDevelopmentNotice" className="scroll-mt-28">
        <ECoinDevelopmentNotice />
        </div>
      
      
      {/* PHASE 2: MARKET, LIQUIDITY & UTILITIES */}
      <div id="LiquidityPanel" className="scroll-mt-28">
        <LiquidityPanel />
      </div>

        <div id="Chart" className="scroll-mt-28">
        <Chart />
        </div> 
        
        <div id="advantages" className="scroll-mt-28">
        <SectionDivider label="Vantagens da E-Coin" />
        <ECoinBenefitsInfo />
        </div>

        <div id="efte" className="scroll-mt-28">
        <SectionDivider label="EFTE (E-Exchange) redirection panel" />
        <EFTEBuySellPanel />
      </div>
    
      <div id="ecoin-ai-section" className="scroll-mt-28">
        <EcoinAISection />
      </div>

      <div id="Converter" className="scroll-mt-28">
        <EKDSmartFinanceTool />
      </div>

      <div id="cashout-gateway" className="scroll-mt-28">
        <SectionDivider label="💳 E-Coin Cash Out Gateway" />
        <ECoinCashOutInfo />
      </div>

      {/* PHASE 3: SIMULATORS & MATHEMATICAL PROOF */}
      <div id="growth-simulator" className="scroll-mt-28">
        <SectionDivider label="What if you invested in E-Coin Earlier?" />
        <CryptoGrowthSimulator />
      </div>

      <div id="future-value" className="scroll-mt-28">
        <SectionDivider label="What if you invested in E-Coin today?" />
        <ECoinFutureSimulatorInfo />
      </div>

      <div id="percentage-calculator" className="scroll-mt-28">
        <SectionDivider label="Percentage calculator" />
        <CompoundCalculatorPanel />
      </div>

      {/* PHASE 4: QUANT ALGORITHMS & LIQUIDITY POOLS */}
      <div id="buyback-engine" className="scroll-mt-28">
        <SectionDivider label="E-Coin (EdenKingDom Coin) Chart" />
        <BuyBackEngineChart /> 
      </div>

      <div id="control-board" className="scroll-mt-28">
        <BuyBackSmartPoolDashboard />
      </div>

      <div id="neural-arbitrage" className="scroll-mt-28">
        <SectionDivider label="eCoin Neural Arbitrage Panel" />
        <NeuralArbitragePanel />
      </div>
      
      {/* PHASE 5: ECOSYSTEM, TRUST & RETENTION */}
      <div id="now-section" className="scroll-mt-28">
        <SectionDivider label="What’s happening now" />
        <NowSection />
      </div>

      <div id="stay-loop" className="scroll-mt-28">
        <SectionDivider label="Stay in the loop" />
        <StayInLoopSection />
      </div>

      <div id="global-events" className="scroll-mt-28">
        <SectionDivider label="Global Events & Conferences" />
        <EventsShowcase />
      </div>

      <div id="builders-creators" className="scroll-mt-28">
        <SectionDivider label="Proof That Builders & Creators Grow Here" />
        <BuildersShowcase />
      </div>

      <div id="ecosistema-ekd" className="scroll-mt-28">
        <SectionDivider label="ECOSSISTEMA EDENKINGDOM" />
        <Ecosystem />
      </div>

      <div id="careers-ekd" className="scroll-mt-28">
        <SectionDivider label="Work at EKD Corporation" />
        <CareersPage />
      </div>

      <div id="seguranca-ecoin" className="scroll-mt-28">
        <SectionDivider label="SEGURANÇA • E-COIN" />
        <Security />
      </div>

      <div id="roadmap-ecoin" className="scroll-mt-28">
        <SectionDivider label="ROADMAP • 2025 → 2027" />
        <Roadmap />
      </div>
      
      <Footer />

      {/* MENUS E BOTÃO FLUTUANTE PREMIUM CONTROL BOARD */}
      <FloatingDashboardMenu />
    </>
  );
}

// --- SUB-COMPONENTE DO BOTÃO FLUTUANTE INTELIGENTE (DRAGGABLE) ---
function FloatingDashboardMenu() {
  const [isOpen, setIsOpen] = useState(false);


 
        
  // Lista dos teus títulos exatos e os mapeamentos para os IDs injetados acima
  const menuItems = [
    { label: "Home", target: "Hero" },
    { label: "AI", target: "ecoin-ai-section" },
    { label: "eCoin Neural AI Arbitrage Panel", target: "neural-arbitrage" },
    { label: "Converter", target: "Converter" },
    { label: "Vantagens da E-Coin", target: "advantages" },
    { label: "Liquidez da E-Coin", target: "LiquidityPanel" },
    { label: "Gráfico & Preço da E-Coin", target: "Chart" },
    { label: "Percentage calculator", target: "percentage-calculator" },
    { label: "Carousel", target: "EcoinCarousel" },
    { label: "Trading AI", target: "AITradingCard" },
    { label: "Development Notice", target: "ECoinDevelopmentNotice" },
    { label: "eCoin Cash Out Gateway", target: "cashout-gateway" },
    { label: "EFTE (E-Exchange)", target: "efte" },
    { label: "Crypto Growth Simulator", target: "growth-simulator" },
    { label: "Explore the eCoin Future Value", target: "future-value" },
    { label: "eCoin Buy-Back Engine", target: "buyback-engine" },
    { label: "ECGPSE CONTROL BOARD", target: "control-board" },
    { label: "What’s happening now", target: "now-section" },
    { label: "Stay in the loop", target: "stay-loop" },
    { label: "Global Events & Conferences", target: "global-events" },
    { label: "Proof That Builders & Creators Grow Here", target: "builders-creators" },
    { label: "ECOSSISTEMA EDENKINGDOM", target: "ecosistema-ekd" },
    { label: "Work at EKD Corporation", target: "careers-ekd" },
    { label: "SEGURANÇA", target: "seguranca-ecoin" },
    { label: "ROADMAP", target: "roadmap-ecoin" },
  ];

  const handleScrollTo = (id: string) => {
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false); // Fecha o menu imediatamente após o clique
    }
  };

  return (
    <>
      {/* BACKDROP: Fecha o menu se clicar fora da lista na zona escura */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* PAINEL CENTRAL DE SELEÇÃO EXECUTIVA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="fixed inset-x-4 bottom-24 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 md:max-w-md bg-[#0d0d0f] border border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            {/* Cabeçalho do Menu */}
            <div className="p-4 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Compass className="animate-spin-slow" size={18} />
                <span className="text-xs font-black uppercase tracking-widest text-white">Navegação Rápida</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 text-white/60 hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Lista com scroll interno limpo */}
            <div className="max-h-[50vh] md:max-h-[400px] overflow-y-auto p-2 space-y-1 no-scrollbar">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScrollTo(item.target)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-black/40 hover:bg-[#D4AF37]/10 border border-white/5 hover:border-[#D4AF37]/20 text-left transition-all group"
                >
                  <span className="text-xs font-medium text-white/80 group-hover:text-[#D4AF37] transition">
                    {item.label}
                  </span>
                  <ChevronRight size={14} className="text-white/30 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTÃO FLUTUANTE PREMIUM (Arrastável/Draggable) */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={{ left: 10, right: window?.innerWidth - 70, top: 10, bottom: window?.innerHeight - 70 }}
        whileDrag={{ scale: 1.1 }}
        initial={{ x: 0, y: 0 }}
        className="fixed bottom-6 right-6 z-50 cursor-grab active:cursor-grabbing touch-none"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#f3d065] text-black shadow-[0_4px_20px_rgba(212,175,55,0.4)] border border-[#D4AF37] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.div>
    </>
  );
}