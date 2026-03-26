"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  Zap,
  Globe,
  Terminal,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

// --- COMPONENTES AUXILIARES ---
const StatusBadge = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
      {status}
    </span>
  </div>
);

const DataCard = ({ label, value, subValue, icon: Icon, color }: any) => (
  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
    <div className="flex justify-between items-start mb-2">
      <Icon size={18} className={color} />
      <span className="text-[10px] text-white/40 font-mono">LIVE_FEED</span>
    </div>
    <div className="text-2xl font-bold text-white font-mono">{value}</div>
    <div className={`text-[10px] font-medium ${color}`}>{subValue}</div>
    <div className="text-[9px] text-white/20 mt-1 uppercase tracking-tighter">
      {label}
    </div>
  </div>
);

export default function Page() {
  const [logs, setLogs] = useState<string[]>([]);
  const [latency, setLatency] = useState(12);
  const [spread, setSpread] = useState(0.08);

  useEffect(() => {
    const messages = [
      "Scanning ETH/BTC orderbook...",
      "Opportunity detected: +0.14% spread",
      "Analyzing liquidity depth...",
      "Cycle optimization: USDT -> BTC -> ETH",
      "Skipped (fees too high)",
      "Neural link stable",
      "Executing validation...",
      "Waiting for volatility spike...",
    ];

    const interval = setInterval(() => {
      const msg = `[${new Date().toLocaleTimeString()}] ${
        messages[Math.floor(Math.random() * messages.length)]
      }`;

      setLogs((prev) => [msg, ...prev].slice(0, 12));
      setLatency(Math.floor(Math.random() * 7) + 8);
      setSpread(parseFloat((Math.random() * 0.14 + 0.01).toFixed(2)));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="text-[#D4AF37]" size={24} />
              <h1 className="text-3xl font-bold tracking-tighter italic">
                E-COIN NEURAL TRADING AI ROBOT
              </h1>
            </div>
            <p className="text-white/50 text-sm max-w-md">
              AI arbitrage system operating in real-time across crypto markets.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <StatusBadge status="Active & Scanning" />
            <div className="text-[10px] font-mono text-white/30">
              ENGINE_ID: EKD_V3_TRIANGULAR
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* DATA GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Latency" value={`${latency}ms`} subValue="Ultra Low" icon={Zap} color="text-yellow-400" />
              <DataCard label="Spread" value={`+${spread}%`} subValue="Scanning" icon={BarChart3} color="text-emerald-400" />
              <DataCard label="Efficiency" value="98.2%" icon={ShieldCheck} color="text-blue-400" />
              <DataCard label="AI Confidence" value="High" icon={Globe} color="text-purple-400" />
            </div>

            {/* FLOW */}
            <div className="bg-black/60 border border-white/5 rounded-3xl p-8">
              <h3 className="text-xs text-white/40 mb-6 uppercase">Execution Flow</h3>
              <div className="flex justify-around items-center">
                {["USDT", "BTC", "ETH", "USDT"].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-2">
                      {item}
                    </div>
                    <p className="text-[10px] text-white/40">{i === 0 ? "ENTRY" : i === 3 ? "EXIT" : "MID"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* REWARD */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl">
                <p className="text-xs text-emerald-400 uppercase">Next Cycle</p>
                <div className="text-4xl font-mono">02:14:55</div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                <p className="text-xs text-white/40 uppercase">Total Distributed</p>
                <div className="text-4xl font-mono text-[#D4AF37]">12.5M E-Coin</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* LOG */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-5 font-mono h-[400px] flex flex-col">
              <div className="mb-3 text-xs text-white/40">LIVE LOG</div>
              <div className="flex-1 overflow-y-auto space-y-2">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-white/60">
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* INSIGHT */}
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-3xl">
              <div className="text-xs text-[#D4AF37] mb-2">AI INSIGHTS</div>
              <p className="text-[11px] text-white/70">
                Market volatility increasing. Execution optimized for BTC cycles.
              </p>
            </div>
          </div>
        </div>

        {/* CARD DE ATIVAÇÃO NEURAL BOT */}
        <div className="mt-12 flex justify-center">
          <div className="w-[380px] bg-black/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-[32px] shadow-[0_0_40px_rgba(0,210,255,0.15)] text-center transition-all hover:border-yellow-500/50 group">
            
            <h3 className="text-blue-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-3 opacity-70">
              Neural Link: Stable
            </h3>
            <h2 className="text-white text-2xl font-bold mb-8 tracking-tight">
              Ativar Neural Bot 🤖
            </h2>

            <Link 
              href="/ecoin-ai-dashboard" 
              className="w-full bg-[#D4AF37] hover:bg-[#F3BA2F] text-black font-black py-5 rounded-2xl shadow-[0_8px_20px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest no-underline"
            >
              <span>Acessar Terminal</span>
              <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>

            <div className="mt-6 flex justify-center items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
              <p className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">
                Secure AI Protocol v3.0
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}