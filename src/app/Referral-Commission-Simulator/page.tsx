"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fuel, ArrowUpRight, Layers, HelpCircle, ShieldCheck } from 'lucide-react';

// ============================================================================
// IMPORTS DOS AGREGADORES MODULARES (BARREL IMPORTS)
// ============================================================================
import EcGasCommissionSimulator from "./components/ecGasCommission";
import WithdrawalCommissionSimulator from "./components/WithdrawalCommission";

enum ProtocolTab {
  EC_GAS = "ecGas",
  WITHDRAWAL = "withdrawal"
}

export default function ReferralCommissionSimulator() {
  const [activeTab, setActiveTab] = useState<ProtocolTab>(ProtocolTab.EC_GAS);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-400">
      
      {/* GLOBAL HEADER INSTITUCIONAL */}
      <header className="w-full max-w-6xl mx-auto pt-12 pb-6 px-4 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-900 bg-slate-900/40 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
          <Layers size={11} className="text-amber-500" /> EdenKingDom Protocol Labs
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 bg-clip-text text-transparent font-mono">
           <span className="text-[#D4AF37]">
              e-Coin
            </span> Referral System Hub
        </h1>
        <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto font-medium">
          Simule, projete e audite o comportamento matemático das redes de incentivo multinível integradas nativamente ao ecossistema eCoin.
        </p>
      </header>

      {/* BANNER DE COMPARAÇÃO MACRO (PRE-SWITCH INSIGHT) */}
      <section className="w-full max-w-3xl mx-auto px-4 mb-8">
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 grid grid-cols-2 gap-4 divide-x divide-slate-900/60 text-center font-mono text-[10px]">
          <div className="space-y-1">
            <span className={`block font-bold uppercase ${activeTab === ProtocolTab.EC_GAS ? 'text-purple-400' : 'text-slate-600'}`}>
              ⚡ ecGas Engine
            </span>
            <span className="text-slate-500 block text-[9px] leading-tight font-sans">
              Comissões geradas no ato de compra/reabastecimento de ecGas para mineração ativa.
            </span>
          </div>
          <div className="space-y-1 pl-4">
            <span className={`block font-bold uppercase ${activeTab === ProtocolTab.WITHDRAWAL ? 'text-amber-400' : 'text-slate-600'}`}>
              💸 Withdrawal Fee
            </span>
            <span className="text-slate-500 block text-[9px] leading-tight font-sans">
              Recirculação de liquidez real oriunda da taxa fixa de 1% retida sobre saques on-chain.
            </span>
          </div>
        </div>
      </section>

      {/* SWITCH NAVIGATION DE ALTO PADRÃO (PREMIUM SLIDER TAB) */}
      <div className="w-full max-w-md mx-auto px-4 mb-16">
        <div className="relative bg-slate-900/40 border border-slate-900 p-1 rounded-xl flex items-center justify-between font-mono text-xs font-bold shadow-2xl">
          
          {/* Indicador Deslizante de Fundo */}
          <motion.div 
            className="absolute top-1 bottom-1 rounded-lg bg-slate-950 border border-slate-800 shadow-xl"
            initial={false}
            animate={{
              left: activeTab === ProtocolTab.EC_GAS ? "4px" : "50%",
              width: "calc(50% - 4px)"
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />

          <button 
            onClick={() => setActiveTab(ProtocolTab.EC_GAS)}
            className={`relative z-10 w-1/2 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wider ${
              activeTab === ProtocolTab.EC_GAS ? "text-purple-400 font-black" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <Fuel size={13} /> ecGas Model
          </button>

          <button 
            onClick={() => setActiveTab(ProtocolTab.WITHDRAWAL)}
            className={`relative z-10 w-1/2 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wider ${
              activeTab === ProtocolTab.WITHDRAWAL ? "text-amber-400 font-black" : "text-slate-500 hover:text-slate-300"
            }`}
          >
            <ArrowUpRight size={14} /> Withdrawal Model
          </button>

        </div>
      </div>

      {/* CONTEINER DE RENDERIZAÇÃO CONDICIONAL DINÂMICA (ANIMATED MODULE CONTAINER) */}
      <main className="px-4">
        <AnimatePresence mode="wait">
          {activeTab === ProtocolTab.EC_GAS ? (
            <motion.div
              key="ecGas-simulator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <EcGasCommissionSimulator />
            </motion.div>
          ) : (
            <motion.div
              key="withdrawal-simulator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <WithdrawalCommissionSimulator />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER DO HUB ORQUESTRADOR */}
      <footer className="w-full max-w-6xl mx-auto mt-24 border-t border-slate-900 py-8 px-4 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-slate-600">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>EdenKingDom Ecosystem Consensus Engine © 2026</span>
        </div>
        <div className="flex gap-4 tracking-wider">
          <span className="hover:text-slate-400 cursor-help flex items-center gap-1"><HelpCircle size={10}/> EVM Docs</span>
          <span>v2.1.0-stable</span>
        </div>
      </footer>

    </div>
  );
}