import React, { useState } from 'react';
import { 
  Cpu, 
  TrendingUp, 
  Layers, 
  ArrowUpRight, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  Coins, 
  ExternalLink, 
  BarChart2 
} from 'lucide-react';
import Link from "next/link";

export default function NeuralArbitragePanel() {
  const [activeTab, setActiveTab] = useState(1);

  // Mock data estilo Binance/TradingView
  const eCoinPrice = 1.2456;
  const priceChange = +5.84;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-b from-gray-950 to-black text-gray-100 rounded-2xl border border-yellow-500/20 shadow-2xl shadow-yellow-500/5 font-sans">
      
      {/* HEADER DO PAINEL */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider bg-gradient-to-r from-yellow-400 via-amber-200 to-yellow-500 bg-clip-text text-transparent uppercase">
            eCoin Buy Back and Sell Back Smart AI Reward Pool & Neural Arbitrage AI robot
          </h1>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Quantum-Secured Neural Engine Active
          </p>
        </div>

        {/* MINI TICKER ESTILO BINANCE */}
        <div className="flex items-center gap-6 bg-gray-900/80 border border-gray-800 px-4 py-2 rounded-xl">
          <div>
            <span className="text-xs text-gray-400 block font-medium">eCoin / USDT</span>
            <span className="text-lg font-mono font-bold text-yellow-400">${eCoinPrice.toFixed(4)}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400 block font-medium">24h Change</span>
            <span className="text-sm font-mono font-bold text-emerald-400 flex items-center justify-end gap-1">
              <TrendingUp className="w-3 h-3" /> +{priceChange}%
            </span>
          </div>
        </div>
      </div>

      {/* SWITCH DE TRÊS VIAS (CONTROLE PRINCIPAL) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-gray-900/50 p-1.5 rounded-xl border border-gray-800 mb-8">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeTab === 1
              ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 scale-[1.02]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <Coins className="w-4 h-4" />
          1. Smart AI Reward Pools (Buy/Sell Back)
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeTab === 2
              ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 scale-[1.02]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <Cpu className="w-4 h-4" />
          2. Neural Cross Exchange Arbitrage
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`flex items-center justify-center gap-3 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
            activeTab === 3
              ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 scale-[1.02]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          3. Neural Triangular Internal Arbitrage
        </button>
      </div>

      {/* CONTEÚDO DAS INTERFACES */}
      <div className="bg-gray-950 rounded-xl border border-gray-800 p-6 min-h-[400px]">
        
        {/* INTERFACE 1: AI SMART REWARD POOLS */}

{activeTab === 1 && (

  <div className="space-y-6 animate-fadeIn">

    {/* HEADER */}

    <div className="flex justify-between items-center">

      <h3 className="text-xl font-bold text-white flex items-center gap-2">

        <Coins className="text-cyan-400 w-5 h-5" />

        eCoin Smart AI Reward Pools

      </h3>

      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">

        Streaming Liquidity Active

      </span>

    </div>

    {/* METRICS */}

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

      <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">

        <span className="text-xs text-gray-500 block mb-1 uppercase">

          Reward Stream Rate

        </span>

        <span className="text-xl font-mono text-emerald-400 font-bold">

          24H Dynamic

        </span>

      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">

        <span className="text-xs text-gray-500 block mb-1 uppercase">

          Active Reward Buffers

        </span>

        <span className="text-xl font-mono text-cyan-400 font-bold">

           eCoin  & eDollar 

        </span>

      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">

        <span className="text-xs text-gray-500 block mb-1 uppercase">

          Smart Pool TVL

        </span>

        <span className="text-xl font-mono text-white font-bold">

          $42,850,192.00

        </span>

      </div>

      <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-800">

        <span className="text-xs text-gray-500 block mb-1 uppercase">

          AI Liquidity Stability

        </span>

        <span className="text-xl font-mono text-yellow-400 font-bold">

          99.4%

        </span>

      </div>

    </div>

    {/* STREAM ENGINE */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div className="lg:col-span-2 bg-gray-900/20 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between">

        <div className="border-b border-gray-800 pb-3 mb-4 flex items-center justify-between">

          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">

            AI Reward Streaming Engine

          </span>

          <BarChart2 className="w-4 h-4 text-cyan-400" />

        </div>

        {/* STREAM GRAPH */}

        <div className="h-48 flex items-end gap-2 px-2 border-b border-gray-800 pb-2">

          <div className="w-full bg-cyan-500/20 h-1/3 rounded-t border-t-2 border-cyan-500"></div>

          <div className="w-full bg-emerald-500/20 h-1/2 rounded-t border-t-2 border-emerald-500"></div>

          <div className="w-full bg-yellow-500/20 h-3/4 rounded-t border-t-2 border-yellow-400"></div>

          <div className="w-full bg-cyan-500/30 h-2/3 rounded-t border-t-2 border-cyan-400"></div>

          <div className="w-full bg-emerald-500/40 h-5/6 rounded-t border-t-2 border-emerald-300 animate-pulse"></div>

        </div>

        <p className="text-xs text-gray-500 mt-3 italic text-center">

          Protocol rewards are dynamically streamed from ecosystem fees,

          ecGas purchases, treasury recycling and smart liquidity injections.

        </p>

      </div>

      {/* ACTION PANEL */}

      <div className="bg-gray-900/60 border border-gray-800 p-5 rounded-xl flex flex-col justify-between">

        <div>

          <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">

            Access Protocol Infrastructure

          </h4>

          <div className="space-y-3">

            <a
              href="/ecoin-hub"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-between transition"
            >
              <span>Open eCoin Hub</span>
              <Zap className="w-4 h-4" />
            </a>

            <a
              href="/Savings"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-between transition"
            >
              <span>Open Savings Pools</span>
              <RefreshCw className="w-4 h-4" />
            </a>

          </div>

        </div>

        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">

          <p className="text-xs text-cyan-300 leading-relaxed">

            AI Smart Pools are sustained by protocol fee recycling,

            ecGas liquidity generation, reward streaming buffers,

            treasury injections and automated arbitrage balancing.

          </p>

        </div>

      </div>

    </div>

{/* CTA BUTTON */}
<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
            href="/ecoin-buyback-engine"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full
            bg-[#D4AF37] text-white font-semibold
            hover:bg-[#D4AF37] hover:text-black
            transition-all duration-300 shadow-lg"
          >
            Explorar o eCoin Buy & Sell Back AI Smart Reward Pools Info →
          </Link>
    
</div>
  </div>

)}

        {/* INTERFACE 2: CROSS EXCHANGE ARBITRAGE */}
        {activeTab === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="text-yellow-500 w-5 h-5" /> Neural Cross Exchange Arbitrage AI Robot
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Multi-Node Active
              </span>
            </div>

            {/* Ilustração das Exchanges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-gray-900/30 p-4 rounded-xl border border-gray-800">
              <div className="p-4 bg-black/40 rounded-lg text-center border border-gray-800">
                <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Source: Binance</span>
                <span className="text-lg font-mono text-white font-bold">$1.2420</span>
              </div>
              <div className="flex flex-col items-center justify-center text-yellow-500 py-2">
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest animate-pulse mb-1">Neural Routing Profit</span>
                <div className="flex items-center gap-2 font-mono font-bold text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-500/30">
                  <ArrowUpRight className="w-4 h-4" /> +0.0236 USDT / unit
                </div>
              </div>
              <div className="p-4 bg-black/40 rounded-lg text-center border border-gray-800">
                <span className="text-xs text-gray-400 uppercase font-bold block mb-1">Target: eCoin DEX</span>
                <span className="text-lg font-mono text-white font-bold">$1.2656</span>
              </div>
            </div>

            {/* Logs em tempo real estilo bot profissional */}
<div className="bg-black p-4 rounded-lg border border-gray-800 font-mono text-xs space-y-2 h-40 overflow-y-auto shadow-inner">
  <p className="text-gray-500">[02:14:10] Scanning Order Books for latency disparities: Binance CEX ↔ Bybit CEX...</p>
  <p className="text-purple-400">[02:14:11] Connected to Binance WebSockets & Bybit V5 API. Latency: 12ms.</p>
  <p className="text-emerald-400">[02:14:12] Spread Disparity found: Binance ($1.2420) vs Bybit ($1.2656). Capitalizing imbalance.</p>
  <p className="text-yellow-500">[02:14:13] Neural API Bridge locked. Execution routing: Buy Binance Spot / Sell Bybit Spot.</p>
  <p className="text-emerald-500 font-bold">[02:14:14] Cross-Exchange Arbitrage Completed! Net Profit: +4,250 USDT. Exchange Fees Settled.</p>
</div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button className="bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold py-3 px-6 rounded-lg border border-gray-700 text-sm transition">
                Configure API Endpoints
              </button>
              <a 
                href="https://binance.com"
                target="_blank"
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-3 px-6 rounded-lg text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10"
              >
                Launch Professional Robot Suite <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* INTERFACE 3: TRIANGULAR ARBITRAGE */}
        {activeTab === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="text-yellow-500 w-5 h-5" /> Neural Triangular Internal Arbitrage AI Robot
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                High Frequency (HFT)
              </span>
            </div>

            <p className="text-sm text-gray-400">
              This advanced neural engine exploits micro-price discrepancies inside the internal pool order books, shifting liquidity seamlessly across three pair-nodes simultaneously without leaving the ecosystem.
            </p>

            {/* Ilustração do Triângulo de Arbitragem */}
            <div className="relative bg-gray-900/20 rounded-xl p-8 border border-gray-800/60 max-w-md mx-auto flex flex-col items-center justify-center h-64">
              <div className="absolute top-6 bg-gray-900 border border-yellow-500/50 px-3 py-1.5 rounded text-xs font-mono font-bold">
                Node A: eCoin / USDT
              </div>
              <div className="absolute bottom-6 left-6 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded text-xs font-mono text-gray-300">
                Node B: eCoin / ETH
              </div>
              <div className="absolute bottom-6 right-6 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded text-xs font-mono text-gray-300">
                Node C: ETH / USDT
              </div>
              
              {/* Centro de IA */}
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/20 z-10 animate-pulse">
                <ShieldCheck className="w-8 h-8 text-black" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-900">
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Zap className="text-yellow-500 w-4 h-4 flex-shrink-0" />
                <span>Execution speeds average &lt; 14ms using optimized matrix algorithms.</span>
              </div>
              <div className="flex justify-end">
                <a 
                  href="https://binance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-gradient-to-r from-gray-900 to-gray-800 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg text-sm border border-gray-700 flex items-center justify-center gap-2 transition"
                >
                  View Binance Internal Order Book <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}