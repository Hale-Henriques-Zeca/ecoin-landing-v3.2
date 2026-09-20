"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { formatUnits } from "viem";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { 
  Eye, 
  EyeOff, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Repeat, 
  PieChart, 
  Share2, 
  RefreshCw,
  Sparkles,
  Wallet,
  ShieldCheck
} from "lucide-react";

type Timeframe = "7D" | "1M" | "3M" | "1A";

export default function EcoinWalletDashboard() {
  const { balances, hideBalance, toggleHideBalance, refresh, isLoading } = useDexWallet();
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("7D");
  const [activeTab, setActiveTab] = useState<"portfolio" | "bots">("portfolio");

  // Definição dos tokens e suas cores de alocação estilo Binance
  const tokens = [
    {
      name: "eCoin",
      symbol: "E-Coin",
      balance: balances.ecoin,
      decimals: 18,
      icon: "/crypto/ecoin1.png",
      price: 1.0,
      color: "#D4AF37", // Ouro VIP
      change24h: "+5.4%",
    },
    {
      name: "eDollar",
      symbol: "E-USD",
      balance: balances.eusd,
      decimals: 18,
      icon: "/crypto/edollar.png",
      price: 1.0,
      color: "#00FF9C", // Verde Esmeralda
      change24h: "+0.01%",
    },
    {
      name: "USDT",
      symbol: "USDT",
      balance: balances.usdt,
      decimals: 18,
      icon: "/crypto/usdt2.png",
      price: 1.0,
      color: "#00E5FF", // Ciano Neon
      change24h: "0.00%",
    },
    {
      name: "BNB",
      symbol: "BNB",
      balance: balances.bnb,
      decimals: 18,
      icon: "/crypto/bnb1.png",
      price: 600.0,
      color: "#F0B90B", // Amarelo Binance
      change24h: "+2.1%",
    },
  ];

  // Cálculo do total em USD
  const totalUSD = tokens.reduce((sum, token) => {
    const amount = Number(formatUnits(token.balance, token.decimals));
    return sum + amount * token.price;
  }, 0);

  // MOCK PnL baseado no timeframe (para simulação gráfica idêntica à Binance)
  const pnlData = {
    "7D": { profit: "+$8.73", percent: "+632.00%", positive: true },
    "1M": { profit: "+$24.50", percent: "+1,240.50%", positive: true },
    "3M": { profit: "+$89.10", percent: "+2,110.00%", positive: true },
    "1A": { profit: "+$310.40", percent: "+5,400.00%", positive: true },
  };

  const currentPnL = pnlData[selectedTimeframe];

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#0B0E14] text-white rounded-3xl border border-[#D4AF37]/20 p-5 md:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden select-none">
      
      {/* Luzes de Fundo Cinemáticas */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00FF9C]/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER DE ABAS ESTILO BINANCE */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-800/80 mb-6">
        <div className="flex gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`relative pb-2 transition-colors ${
              activeTab === "portfolio" ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Portfólio
            {activeTab === "portfolio" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full"
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab("bots")}
            className={`relative pb-2 transition-colors ${
              activeTab === "bots" ? "text-white" : "text-gray-500 hover:text-gray-300"
            }`}
          >
            Bots em tempo real
            {activeTab === "bots" && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full"
              />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className="p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition"
            title="Atualizar Saldos"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-[#D4AF37]" : ""}`} />
          </button>
          <button
            onClick={toggleHideBalance}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition"
          >
            {hideBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* RESUMO DO VALOR TOTAL & PNL */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold tracking-wider uppercase">
          <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Valor Total do Ativo</span>
        </div>

        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            {hideBalance ? "••••••••" : `$${totalUSD.toFixed(2)}`}
          </h1>
          <span className="text-xs text-gray-500 font-mono">USD</span>
        </div>

        {/* PnL Variável */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-xs text-gray-400 border-b border-dashed border-gray-600">
            Variação do ativo
          </span>
          <Share2 className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white transition" />
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-[#00FF9C]">
          <TrendingUp className="w-4 h-4" />
          <span>{hideBalance ? "••••" : currentPnL.profit}</span>
          <span className="text-xs font-mono px-2 py-0.5 bg-[#00FF9C]/10 border border-[#00FF9C]/20 rounded-full">
            {currentPnL.percent}
          </span>
        </div>
      </div>

      {/* GRÁFICO VECTORIAL DE TENDÊNCIA PNL (SIMULATION) */}
      <div className="relative w-full h-28 my-4">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF9C" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00FF9C" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Área preenchida com gradiente */}
          <path
            d="M 0,70 Q 100,85 200,65 T 380,15 L 380,100 L 0,100 Z"
            fill="url(#chartGradient)"
          />

          {/* Linha principal da curva */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M 0,70 Q 100,85 200,65 T 380,15"
            fill="none"
            stroke="#00FF9C"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Ponto Final Pulsação com Data Marker */}
          <g transform="translate(380, 15)">
            <circle r="6" fill="#00FF9C" className="animate-ping opacity-75" />
            <circle r="4" fill="#00FF9C" stroke="#0B0E14" strokeWidth="2" />
          </g>
        </svg>

        {/* Datas no Gráfico */}
        <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-1 px-1">
          <span className="bg-black/40 px-1.5 py-0.5 rounded border border-gray-800">09/10/2026</span>
          <span className="bg-black/40 px-1.5 py-0.5 rounded border border-gray-800">09/17/2026</span>
        </div>
      </div>

      {/* SELETOR DE TIMEFRAME (7D, 1M, 3M, 1A) */}
      <div className="grid grid-cols-4 gap-2 bg-[#121820] p-1 rounded-xl border border-gray-800 mb-8">
        {(["7D", "1M", "3M", "1A"] as Timeframe[]).map((tf) => (
          <button
            key={tf}
            onClick={() => setSelectedTimeframe(tf)}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              selectedTimeframe === tf
                ? "bg-[#1E2632] text-white shadow-md border border-gray-700"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tf === "7D" ? "7 D" : tf === "1M" ? "1 M" : tf === "3M" ? "3 M" : "1 A"}
          </button>
        ))}
      </div>

      {/* SEÇÃO DE ALOCAÇÃO DE ATIVOS (DONUT CHART & BREAKDOWN) */}
      <div className="space-y-4 mb-8 pt-4 border-t border-gray-800/80">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
            <PieChart className="w-3.5 h-3.5 text-[#D4AF37]" />
            Alocação de ativos
          </h3>
          <Share2 className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer transition" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#121820]/60 p-4 rounded-2xl border border-gray-800">
          
          {/* Anel Donut Visual SVG */}
          <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#1B222C"
                strokeWidth="3.8"
              />
              {/* Renderização dinâmica dos segmentos do donut */}
              {tokens.reduce(
                (acc, token, index) => {
                  const amount = Number(formatUnits(token.balance, token.decimals));
                  const value = amount * token.price;
                  const pct = totalUSD > 0 ? (value / totalUSD) * 100 : 0;

                  if (pct <= 0) return acc;

                  const strokeDasharray = `${pct} ${100 - pct}`;
                  const strokeDashoffset = acc.offset;

                  acc.rendered.push(
                    <circle
                      key={token.symbol}
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke={token.color}
                      strokeWidth="3.8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={-strokeDashoffset}
                      className="transition-all duration-1000 ease-out"
                    />
                  );

                  acc.offset += pct;
                  return acc;
                },
                { offset: 0, rendered: [] as React.ReactNode[] }
              ).rendered}
            </svg>

            <div className="absolute text-center">
              <Sparkles className="w-4 h-4 text-[#D4AF37] mx-auto mb-0.5" />
              <span className="text-[10px] text-gray-400 font-medium block">Total Ativos</span>
              <span className="text-xs font-bold text-white font-mono">{tokens.length}</span>
            </div>
          </div>

          {/* Legenda de Alocação em % */}
          <div className="space-y-2">
            {tokens.map((token) => {
              const amount = Number(formatUnits(token.balance, token.decimals));
              const value = amount * token.price;
              const pct = totalUSD > 0 ? ((value / totalUSD) * 100).toFixed(2) : "0.00";

              return (
                <div key={token.symbol} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: token.color }} />
                    <span className="text-gray-300 font-medium">{token.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LISTA PREMIUM DE ATIVOS */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
          Seus Ativos
        </h3>

        {tokens.map((token, i) => {
          const amount = Number(formatUnits(token.balance, token.decimals));
          const value = amount * token.price;
          const pct = totalUSD > 0 ? (value / totalUSD) * 100 : 0;

          return (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="group relative bg-[#121820]/90 border border-gray-800/80 hover:border-[#D4AF37]/50 rounded-2xl p-4 transition-all duration-200 hover:bg-[#161E28]"
            >
              <div className="flex items-center justify-between">
                
                {/* ÍCONE E NOME */}
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl bg-black/40 p-1 border border-gray-800 group-hover:border-[#D4AF37]/40 transition">
                    <Image
                      src={token.icon}
                      alt={token.symbol}
                      width={32}
                      height={32}
                      className="rounded-lg object-contain"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition">
                        {token.name}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-white/5 text-gray-400 rounded">
                        {token.symbol}
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      ${token.price.toLocaleString()} <span className="text-[#00FF9C] text-[10px]">{token.change24h}</span>
                    </div>
                  </div>
                </div>

                {/* SALDO E VALOR USD */}
                <div className="text-right">
                  <div className="text-sm font-bold text-white font-mono">
                    {hideBalance ? "••••" : amount.toFixed(4)}
                  </div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">
                    {hideBalance ? "••••" : `$${value.toFixed(2)}`}
                  </div>
                </div>
              </div>

              {/* BARRA DE PROCRESSÃO DE ALOCAÇÃO INDIVIDUAL */}
              <div className="w-full bg-black/40 h-1 rounded-full mt-3 overflow-hidden border border-gray-800/50">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: token.color,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* BOTÕES DE AÇÃO RÁPIDA VIP */}
      <div className="grid grid-cols-3 gap-3 mt-8 pt-4 border-t border-gray-800/80">
        <button className="flex items-center justify-center gap-2 py-3 bg-[#D4AF37] hover:bg-[#b8952d] text-black font-extrabold text-xs rounded-xl transition active:scale-95 shadow-lg shadow-[#D4AF37]/20">
          <ArrowDownLeft className="w-4 h-4" />
          Depositar
        </button>

        <button className="flex items-center justify-center gap-2 py-3 bg-[#1E2632] hover:bg-[#283242] text-white font-bold text-xs rounded-xl border border-gray-700 transition active:scale-95">
          <ArrowUpRight className="w-4 h-4 text-gray-400" />
          Sacar
        </button>

        <button className="flex items-center justify-center gap-2 py-3 bg-[#1E2632] hover:bg-[#283242] text-white font-bold text-xs rounded-xl border border-gray-700 transition active:scale-95">
          <Repeat className="w-4 h-4 text-[#00FF9C]" />
          Convert
        </button>
      </div>

      {/* LEGENDA INFERIOR DE PROTOCOLO SEGURA */}
      <div className="mt-6 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#00FF9C]" />
        <span>Apenas são apresentados os ativos da rede BSC integrados ao ecnTrading DEX.</span>
      </div>
    </div>
  );
}