"use client";

import React from "react";
import { Cpu, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function CrossAI() {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER DA INTERFACE */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <Cpu className="text-purple-500 w-8 h-8" /> 
          Neural Cross Exchange Arbitrage AI Robot
        </h3>
        <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
          Multi-Node Active
        </span>
      </div>

      {/* ILUSTRAÇÃO DAS EXCHANGES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-gray-900/40 p-6 rounded-3xl border border-gray-800 backdrop-blur-md">
        <div className="p-6 bg-black/60 rounded-2xl text-center border border-gray-800/50 shadow-inner">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-widest block mb-2">Source: Binance</span>
          <span className="text-3xl font-mono text-white font-black">$1.2420</span>
        </div>
        
        <div className="flex flex-col items-center justify-center text-purple-500 py-4">
          <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest animate-pulse mb-3">Neural Routing Profit</span>
          <div className="flex items-center gap-2 font-mono font-bold text-emerald-400 bg-emerald-950/40 px-5 py-2 rounded-full border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <ArrowUpRight className="w-5 h-5" /> +0.0236 USDT / E-Coin
          </div>
        </div>
        
        <div className="p-6 bg-black/60 rounded-2xl text-center border border-gray-800/50 shadow-inner">
          <span className="text-xs text-gray-500 uppercase font-bold tracking-widest block mb-2">Target: Bybit</span>
          <span className="text-3xl font-mono text-white font-black">$1.2656</span>
        </div>
      </div>

      {/* LOGS EM TEMPO REAL */}
      <div className="bg-[#050505] p-6 rounded-3xl border border-gray-800 font-mono text-[11px] md:text-xs space-y-3 h-64 overflow-y-auto shadow-2xl relative">
        <div className="sticky top-0 bg-[#050505] pb-2 mb-2 border-b border-white/5 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-gray-500 tracking-widest uppercase">Live Cross-Arbitrage Logs</span>
        </div>
        <p className="text-gray-500">[02:14:10] Scanning Order Books for latency disparities: Binance CEX ↔ Bybit CEX...</p>
        <p className="text-purple-400">[02:14:11] Connected to Binance WebSockets & Bybit V5 API. Latency: 12ms.</p>
        <p className="text-emerald-400">[02:14:12] Spread Disparity found: Binance ($1.2420) vs Bybit ($1.2656). Capitalizing imbalance.</p>
        <p className="text-yellow-500">[02:14:13] Neural API Bridge locked. Execution routing: Buy Binance Spot / Sell Bybit Spot.</p>
        <p className="text-emerald-500 font-bold bg-emerald-500/10 p-2 rounded border border-emerald-500/20">[02:14:14] Cross-Exchange Arbitrage Completed! Net Profit: +4,250 USDT. Exchange Fees Settled.</p>
      </div>

      {/* BOTÕES DE AÇÃO */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end mt-4">
        <button className="bg-gray-900/50 hover:bg-gray-800 text-gray-300 font-bold py-4 px-8 rounded-2xl border border-gray-700 text-sm transition backdrop-blur-md">
          Configure API Endpoints
        </button>
        <a 
          href="https://binance.com"
          target="_blank"
          rel="noopener noreferrer" 
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all"
        >
          Launch Professional Robot Suite <ArrowUpRight className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
}