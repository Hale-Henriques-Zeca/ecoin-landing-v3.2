"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Activity,
  BarChart3,
  Clock,
  Zap,
  Calendar,
  Layers,
  Gauge
} from "lucide-react";

type WindowType = "1m" | "1h" | "24h" | "7d" | "30d";

type Props = {
  yearlyRewards: number;
  stakedAmount: number;
  window: WindowType;
  setWindow: (window: WindowType) => void;
};

export default function APRPanel({
  yearlyRewards,
  stakedAmount,
  window,
  setWindow,
}: Props) {

  // --- CÁLCULOS FINANCEIROS DO PROTOCOLO ---
  const apr = stakedAmount > 0 ? (yearlyRewards / stakedAmount) * 100 : 0;
  const apy = apr * 2.15;

  // --- MAPEAMENTO DOS 5 ESTADOS DE VELOCIDADE E TEMPO (DIVIDENDOS & CS) ---
  const getVelocityData = () => {
    switch (window) {
      case "1m":
        return {
          velocity: "ADVANCED / SPEED",
          color: "text-red-400",
          desc: "Hiper-aceleração de dividendos. O teto de 130% de ROI é atingido e creditado minuto a minuto via CS."
        };

      case "1h":
        return {
          velocity: "EXTREME",
          color: "text-fuchsia-400",
          desc: "Fluxo ultra-rápido. Distribuição contínua com créditos dos 130% efetuados a cada hora aos shareholders."
        };

      case "24h":
        return {
          velocity: "HIGH",
          color: "text-purple-400",
          desc: "Fluxo acelerado. Pagamento e liquidação integral do teto de 130% de dividendos em 24 horas."
        };

      case "7d":
        return {
          velocity: "MEDIUM",
          color: "text-amber-400",
          desc: "Projeção semanal estruturada em micro-fluxo econômico com liquidações dos 130% a cada 7 dias."
        };

      case "30d":
        return {
          velocity: "LOW",
          color: "text-blue-400",
          desc: "Previsibilidade macro quando a produção de rendimentos é estável. Prazos mensais de acúmulo."
        };

      default:
        return {
          velocity: "MEDIUM",
          color: "text-slate-400",
          desc: "Janela de projeção indisponível."
        };
    }
  };

  const currentVelocity = getVelocityData();

  return (
    <div className="space-y-6">
      
      {/* 1. SELETOR DE TEMPO */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 text-3xl font-mono font-bold text-red-400 md:text-2xl font-black tracking-tighter">
          <Clock size={32} /> Janela Projetada & Tempo para Atingir o Teto de 130% ROI
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* CARD 1: Per Minutes */}
          <button
            type="button"
            onClick={() => setWindow("1m")}
            className={`p-4 rounded-xl border font-mono text-left space-y-1 transition-all ${
              window === "1m"
                ? "bg-gradient-to-br from-slate-900 to-red-950/20 border-red-500/40 shadow-xl shadow-red-500/5 ring-1 ring-red-500/20"
                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
            }`}
          >
            <div className={`text-xs font-black flex items-center gap-1.5 ${window === "1m" ? "text-red-400" : "text-slate-400"}`}>
              <Gauge size={13} /> Por Minutos
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Velocidade máxima global. Créditos imediatos processados a cada minuto.
            </p>
          </button>

          {/* CARD 2: Per Hours */}
          <button
            type="button"
            onClick={() => setWindow("1h")}
            className={`p-4 rounded-xl border font-mono text-left space-y-1 transition-all ${
              window === "1h"
                ? "bg-gradient-to-br from-slate-900 to-fuchsia-950/20 border-fuchsia-500/40 shadow-xl shadow-fuchsia-500/5 ring-1 ring-fuchsia-500/20"
                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
            }`}
          >
            <div className={`text-xs font-black flex items-center gap-1.5 ${window === "1h" ? "text-fuchsia-400" : "text-slate-400"}`}>
              <Zap size={13} /> Por Horas
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Fluxo dinâmico contínuo. Dividendos injetados hora a hora no painel do shareholder.
            </p>
          </button>

          {/* CARD 3: 24 Hours */}
          <button
            type="button"
            onClick={() => setWindow("24h")}
            className={`p-4 rounded-xl border font-mono text-left space-y-1 transition-all ${
              window === "24h"
                ? "bg-gradient-to-br from-slate-900 to-purple-950/20 border-purple-500/40 shadow-xl shadow-purple-500/5 ring-1 ring-purple-500/20"
                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
            }`}
          >
            <div className={`text-xs font-black flex items-center gap-1.5 ${window === "24h" ? "text-purple-400" : "text-slate-400"}`}>
              <Zap size={13} /> 24 Horas
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Fluxo Acelerado. Liquidação do teto completo de ROI em apenas 1 dia.
            </p>
          </button>

          {/* CARD 4: 7 Days */}
          <button
            type="button"
            onClick={() => setWindow("7d")}
            className={`p-4 rounded-xl border font-mono text-left space-y-1 transition-all ${
              window === "7d"
                ? "bg-gradient-to-br from-slate-900 to-amber-950/20 border-amber-500/40 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/20"
                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
            }`}
          >
            <div className={`text-xs font-black flex items-center gap-1.5 ${window === "7d" ? "text-amber-400" : "text-slate-400"}`}>
              <Calendar size={13} /> 7 Dias
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Fluxo semanal regularizado. Ciclos de dividendos fechados a cada 7 dias.
            </p>
          </button>

          {/* CARD 5: 30 Days */}
          <button
            type="button"
            onClick={() => setWindow("30d")}
            className={`p-4 rounded-xl border font-mono text-left space-y-1 transition-all ${
              window === "30d"
                ? "bg-gradient-to-br from-slate-900 to-blue-950/20 border-blue-500/40 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/20"
                : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800"
            }`}
          >
            <div className={`text-xs font-black flex items-center gap-1.5 ${window === "30d" ? "text-blue-400" : "text-slate-400"}`}>
              <Layers size={13} /> 30 Dias
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Previsibilidade e acúmulo de rendimentos com prazos mensais.
            </p>
          </button>

        </div>
      </div>

      {/* 2. PAINEL DE MÉTRICAS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-3xl border border-slate-900 bg-slate-950/40 backdrop-blur-xl p-6 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Bloco APR */}
          <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5 shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-emerald-400" />
              <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                APR de Dividendos Atual
              </span>
            </div>
            <h2 className="text-3xl font-black font-mono text-emerald-400 tracking-tight">
              {apr.toFixed(2)}%
            </h2>
          </div>

          {/* Bloco APY */}
          <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5 shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={16} className="text-cyan-400" />
              <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                APY Projetado de Shareholders
              </span>
            </div>
            <h2 className="text-3xl font-black font-mono text-cyan-400 tracking-tight">
              {apy.toFixed(2)}%
            </h2>
          </div>

          {/* Bloco Velocity */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-inner transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className={currentVelocity.color} />
              <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                Velocidade de Distribuição CS
              </span>
            </div>
            <h2 className={`text-2xl font-black font-mono tracking-tight ${currentVelocity.color}`}>
              {currentVelocity.velocity}
            </h2>
            <p className="text-[10px] text-slate-500 font-sans mt-1 leading-normal">
              {currentVelocity.desc}
            </p>
          </div>

        </div>
      </motion.div>

    </div>
  );
}