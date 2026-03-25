"use client";

import StayInLoopSection from "@/sections/StayInLoopSection";
import EventsShowcase from "@/sections/EventsShowcase";
import EcoinAISection from "@/sections/EcoinAISection";
import BuyBackEngineChart from "@/app/BuyBackEngineChart";
import BuildersShowcase from "@/sections/BuildersShowcase";
import EKDSmartFinanceTool from "@/components/EKDSmartFinanceTool";
import EFTEBuySellPanel from "@/components/EFTEBuySellPanel";
import CompoundCalculatorPanel from "@/components/CompoundCalculatorPanel";
import ECoinDevelopmentNotice from "@/components/ECoinDevelopmentNotice";
import NowSection from "@/sections/NowSection";
import Ecosystem from "@/sections/Ecosystem";
import CareersPage from "@/app/CareersPage";
import Security from "@/sections/Security";
import Roadmap from "@/sections/Roadmap";
import Footer from "@/components/Footer";
import ECoinOnChainStaking from "@/components/ECoinOnChainStaking";
import Hero from "@/sections/Hero";
import EcoinCarousel from "@/components/EcoinCarousel";
import LiquidityPanel from "@/components/LiquidityPanel";
import ECoinHubPage from "@/components/ECoinHubPage";
import BuyBackSmartPoolSection from "@/components/BuyBackSmartPoolSection";
import ECoinBuybackInfo from "@/components/ECoinBuybackinfo";
import BuyBackSmartPoolDashboard from "@/components/BuyBackSmartPoolDashboard";
import ECoinPriceSyncInfo from "@/components/ECoinPriceSyncInfo";
import EBCConvertSection from "@/components/EBCConvertSection"
import CryptoGrowthSimulator from "@/components/CryptoGrowthSimulator";
import ECoinCashOutInfo from "@/components/ECoinCashOutInfo";
import Chart from "@/components/Chart";
import ECoinBenefitsInfo from "@/components/ECoinBenefitsInfo";
import ECoinRewardsInfo from "@/components/ECoinRewardsInfo";
import ECoinFutureSimulatorInfo from "@/components/ECoinFutureSimulatorInfo"
import ECoinTreasuryFlowInfo from "@/components/ECoinTreasuryFlowInfo"
import AITradingCard from "@/components/AITradingCard"



export default function Home() {
  return (
    <>
      <Hero />
      <ECoinDevelopmentNotice />
      
       <EcoinCarousel />
       <AITradingCard />
       <div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
  Vantagens da E-Coin
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>
        <ECoinBenefitsInfo />
      <EBCConvertSection />
      <ECoinRewardsInfo />
      <ECoinOnChainStaking />
      <Chart /> 
      {/* SEPARADOR*/}
<div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
  EFTE (E-Exchange) redirection panel 
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>
      <EFTEBuySellPanel />
      <ECoinHubPage />
      <EcoinAISection />
      
      
<EKDSmartFinanceTool />
<ECoinCashOutInfo />
<LiquidityPanel />
<ECoinTreasuryFlowInfo />
{/* SEPARADOR*/}
<div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
 What if you invested in E-Coin Earlier?
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>
<CryptoGrowthSimulator />
{/* SEPARADOR*/}
<div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
 What if you invested in E-Coin today?
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>
<ECoinFutureSimulatorInfo />
{/* SEPARADOR*/}
<div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
    Percentage calculator
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>
<CompoundCalculatorPanel />
{/* SEPARADOR*/}
<div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
    E-Coin (EdenKingDom Coin) Chart
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>

      <BuyBackEngineChart /> 
      
      <BuyBackSmartPoolDashboard />
      <ECoinPriceSyncInfo />
      <BuyBackSmartPoolSection />
      <ECoinBuybackInfo />
      
      <NowSection />
<StayInLoopSection />
<EventsShowcase />
<BuildersShowcase />
      <Ecosystem />
      <CareersPage />
      <Security />
      <Roadmap />
      <Footer />
    </>
  );
}

