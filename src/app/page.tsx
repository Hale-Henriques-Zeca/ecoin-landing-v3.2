"use client";

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

// --- SUB-COMPONENTE AUXILIAR PARA LIMPEZA DE CÓDIGO ---
const SectionDivider = ({ label }: { label: string }) => (
  <div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
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
      {/* ==========================================
          PHASE 1: HERO & LIVE AWARENESS
         ========================================== */}
      <Hero />
      <BlockchainDeviceAlert />
      <EcoinCarousel />
      <AITradingCard />
      <ECoinDevelopmentNotice />
      
      {/* ==========================================
          PHASE 2: MARKET, LIQUIDITY & UTILITIES
         ========================================== */}
      <LiquidityPanel />
      <Chart /> 

      <SectionDivider label="Vantagens da E-Coin" />
      <ECoinBenefitsInfo />

      <SectionDivider label="EFTE (E-Exchange) redirection panel" />
      <EFTEBuySellPanel />
    
      <EcoinAISection />
      <EKDSmartFinanceTool />
      <ECoinCashOutInfo />

      {/* ==========================================
          PHASE 3: SIMULATORS & MATHEMATICAL PROOF
         ========================================== */}
      <SectionDivider label="What if you invested in E-Coin Earlier?" />
      <CryptoGrowthSimulator />

      <SectionDivider label="What if you invested in E-Coin today?" />
      <ECoinFutureSimulatorInfo />

      <SectionDivider label="Percentage calculator" />
      <CompoundCalculatorPanel />

      {/* ==========================================
          PHASE 4: QUANT ALGORITHMS & LIQUIDITY POOLS
         ========================================== */}
      <SectionDivider label="E-Coin (EdenKingDom Coin) Chart" />
      <BuyBackEngineChart /> 
      <BuyBackSmartPoolDashboard />
      <ECoinPriceSyncInfo />

      <SectionDivider label="eCoin Neural Arbitrage Panel" />
      <NeuralArbitragePanel />
      
      {/* ==========================================
          PHASE 5: ECOSYSTEM, TRUST & RETENTION
         ========================================== */}
      <NowSection />
      <StayInLoopSection />
      <EventsShowcase />
      <BuildersShowcase />
      <Ecosystem />
      <CareersPage />
      <Security />
      <Roadmap />
      
      {/* ==========================================
          FOOTER
         ========================================== */}
      <Footer />
    </>
  );
}