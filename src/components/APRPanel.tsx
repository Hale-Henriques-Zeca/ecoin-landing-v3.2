"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Activity,
  BarChart3,
  Clock,
  Zap,
  Calendar,
  Layers
} from "lucide-react";

type Props = {
  yearlyRewards: number;
  stakedAmount: number;
  window: "24h" | "7d" | "30d";
  setWindow: (window: "24h" | "7d" | "30d") => void;
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

  // --- ESTADOS RELACIONADOS DIRETAMENTE À JANELA SELECIONADA ---
  const getVelocityData = () => {
    switch (window) {
      case "24h":
        // Se o APR for crítico/massivo, ativa o modo de horas (EXTREME)
        if (apr > 200) {
          return {
            velocity: "EXTREME",
            color: "text-red-500 font-extrabold animate-pulse",
            desc: "Fluxo ultra-acelerado! O teto de 130% de ROI é atingido em poucas horas devido à atividade crítica da rede."
          };
        }
        // Padrão estável para 24h (HIGH)
        return {
          velocity: "HIGH",
          color: "text-purple-400",
          desc: "Fluxo altamente dinâmico. Pagamento imediato e consolidação dos 130% de ROI em apenas 1 dia."
        };

      case "7d":
        return {
          velocity: "MEDIUM",
          color: "text-amber-400",
          desc: "Fluxo micro-estruturado. Distribuição linear com conclusão dos 130% de ROI no ciclo de 1 semana."
        };

      case "30d":
        return {
          velocity: "LOW",
          color: "text-blue-400",
          desc: "Fluxo macro-acumulativo. Recompensas compostas estáveis com consolidação dos 130% de ROI em 30 dias."
        };

      default:
        return {
          velocity: "MEDIUM",
          color: "text-slate-400",
          desc: "Projection window unavailable."
        };
    }
  };

  const currentVelocity = getVelocityData();

  return (
    <div className="space-y-6">
      
      {/* 1. SELETOR REESTRUTURADO (PROJECTION WINDOW) */}
      <div className="space-y-3">
        <label className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">
          <Clock size={13} /> Janela de Projeção Temporal & tempo de duração para atingir os 130% do Profit (ROI)
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Opção 24h */}
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
              <Zap size={13} /> 24 Hours
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Análise de fluxo Alto e comportamento imediato da economia no ecossistema, pagamentos imediatos dos 130%.
            </p>
          </button>

          {/* Opção 7d */}
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
              <Calendar size={13} /> 7 Days
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Projeção padrão estruturada em fluxo micro economia no ecossistema, pagamentos semanais dos 130%.
            </p>
          </button>

          {/* Opção 30d */}
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
              <Layers size={13} /> 30 Days
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-tight">
              Previsibilidade de acumulação de recompensas compostas quando o nivel de produção for relativamente macro, Pagamentos mensais dos 130%.
            </p>
          </button>

        </div>
      </div>

      {/* 2. PAINEL DE MÉTRICAS DA REDE (APR, APY, VELOCITY) */}
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
                AI Current APR
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
                AI Projected APY
              </span>
            </div>
            <h2 className="text-3xl font-black font-mono text-cyan-400 tracking-tight">
              {apy.toFixed(2)}%
            </h2>
          </div>

          {/* Bloco Velocity */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-inner transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className={currentVelocity.color.split(" ")[0]} />
              <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">
                AI Reward Velocity
              </span>
            </div>
            <h2 className={`text-3xl font-black font-mono tracking-tight ${currentVelocity.color}`}>
              {currentVelocity.velocity}
            </h2>
            <p className="text-[10px] text-slate-500 font-sans mt-2 leading-normal min-h-[32px]">
              {currentVelocity.desc}
            </p>
          </div>

        </div>
      </motion.div>

    </div>
  );
}