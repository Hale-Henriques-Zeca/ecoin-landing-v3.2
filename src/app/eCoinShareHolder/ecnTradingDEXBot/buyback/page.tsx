"use client";

import React from "react";
import BuyBackOverview from "./components/BuyBackOverview";
import BuyBackBotStatus from "./components/BuyBackBotStatus";
import BuyBackPerformance from "./components/BuyBackPerformance";
import BuyBackHistory from "./components/BuyBackHistory";

export default function BuyBackPage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-white pt-20 pb-28 px-4 sm:px-6 flex flex-col items-center">
      
      {/* CABEÇALHO DA PÁGINA BUY-BACK */}
      <div className="w-full max-w-2xl mb-6 text-left">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
          <span className="text-[10px] font-mono text-[#00FF9C] uppercase tracking-widest">
            Neural Buy-Back & Burn Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Programa Buy-Back
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Acompanhe as recompras automáticas de eCoin, métricas de queimada e desempenho dos robôs em tempo real.
        </p>
      </div>

      {/* PAINEL INTEGRADO COM OS COMPONENTES DA PASTA */}
      <div className="w-full max-w-2xl space-y-6">
        <BuyBackOverview />
        <BuyBackBotStatus />
        <BuyBackPerformance />
        <BuyBackHistory />
      </div>

    </main>
  );
}