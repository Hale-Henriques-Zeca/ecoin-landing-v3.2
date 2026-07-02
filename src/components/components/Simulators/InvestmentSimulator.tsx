"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  TrendingUp, 
  Coins, 
  Fuel, 
  Clock, 
  Calendar, 
  Zap, 
  CheckCircle2, 
  RefreshCw,
  Layers
} from "lucide-react";

// ============================================================================
// CONFIGURAÇÕES DE ESCALA E COEFICIENTES DO PROTOCOLO (POLÍTICAS EDENKINGDOM)
// ============================================================================
const STAKE_PRESETS = [10000, 50000, 100000, 250000, 500000, 1000000];

// Limites Logarítmicos para o ecGas: 10^-3 (0.001) até 10^4 (10000)
const LOG_MIN = -3;
const LOG_MAX = 4;

const ECGAS_TO_USDT_PARITY = 1; 
const ROI_MAX_COEFFICIENT = 1.30; 

interface InvestmentSimulatorProps {
  stake: number;
  ecGas: number;
  window: "24h" | "7d" | "30d";
  setStake: (value: number) => void;
  setEcGas: (value: number) => void;
  setWindow: (window: "24h" | "7d" | "30d") => void;
}

export default function InvestmentSimulator({ 
  stake, 
  ecGas, 
  window, 
  setStake, 
  setEcGas, 
  setWindow 
}: InvestmentSimulatorProps) {
  
  // --------------------------------------------------------------------------
  // ESTADOS VISUAIS LOCAIS (UI APENAS)
  // --------------------------------------------------------------------------
  const [showStakeTooltip, setShowStakeTooltip] = useState<boolean>(false);
  const [showGasTooltip, setShowGasTooltip] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // LÓGICA DE FORMATAÇÃO DE INPUTS (Visual Premium)
  // --------------------------------------------------------------------------
  const formatNumber = (val: number): string => {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(val);
  };

  const parseFormattedInput = (valStr: string): number => {
    const sanitized = valStr.replace(/,/g, "");
    return sanitized === "" ? 0 : Number(sanitized);
  };

  // --------------------------------------------------------------------------
  // CONTROLO DE SLIDERS (Sincronizados com Props do Hook Pai)
  // --------------------------------------------------------------------------
  const stakeSliderValue = useMemo(() => {
    const index = STAKE_PRESETS.findIndex((v) => stake <= v);
    if (index === -1) return 100;
    if (index === 0) return 0;
    const prev = STAKE_PRESETS[index - 1];
    const curr = STAKE_PRESETS[index];
    const pctStep = 100 / (STAKE_PRESETS.length - 1);
    const internalPct = (stake - prev) / (curr - prev);
    return (index - 1) * pctStep + internalPct * pctStep;
  }, [stake]);

  const handleStakeSliderChange = (pct: number) => {
    const step = 100 / (STAKE_PRESETS.length - 1);
    const index = Math.floor(pct / step);
    if (index >= STAKE_PRESETS.length - 1) {
      setStake(STAKE_PRESETS[STAKE_PRESETS.length - 1]);
      return;
    }
    const prev = STAKE_PRESETS[index];
    const curr = STAKE_PRESETS[index + 1];
    const internalPct = (pct % step) / step;
    const computed = Math.round(prev + internalPct * (curr - prev));
    setStake(computed);
  };

  const ecGasSliderValue = useMemo(() => {
    if (ecGas <= 0) return 0;
    const currentLog = Math.log10(ecGas);
    return ((currentLog - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
  }, [ecGas]);

  const handleEcGasSliderChange = (pct: number) => {
    const logValue = LOG_MIN + (pct / 100) * (LOG_MAX - LOG_MIN);
    const computed = Math.pow(10, logValue);
    if (computed < 0.01) {
      setEcGas(Number(computed.toFixed(3)));
    } else {
      setEcGas(Number(computed.toFixed(2)));
    }
  };

  // Botão foca-se exclusivamente em disparar uma animação visual premium de atualização
  const handleTriggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleReset = () => {
    setStake(250000);
    setEcGas(1000);
    setWindow("7d");
  };

  // Cálculos rápidos locais apenas para visualização da barra inferior (Live Preview Strip)
  const previewCapacity = ecGas;
  const previewEstimatedReturn = ecGas * ECGAS_TO_USDT_PARITY * ROI_MAX_COEFFICIENT;

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900/20 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl space-y-8">
      
      {/* 1. HEADER REESTRUTURADO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            <TrendingUp size={14} /> Investment Decision
          </div>
          <h2 className="text-xl md:text-2xl font-black font-mono tracking-tight text-slate-100 uppercase">
            Investment Decision Center
          </h2>
          <p className="text-slate-500 text-xs font-sans">
            Simule o seu investimento e veja em tempo real como o protocolo distribuirá os fundos.
          </p>
        </div>
        <div className="flex items-center self-start md:self-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Protocol Ready
        </div>
      </div>

      {/* 2. STAKE SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
            <Coins size={14} className="text-amber-500" /> Stake (eCoin)
            <button 
              type="button"
              onMouseEnter={() => setShowStakeTooltip(true)}
              onMouseLeave={() => setShowStakeTooltip(false)}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              <HelpCircle size={12} />
            </button>
          </div>

          <AnimatePresence>
            {showStakeTooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute z-20 left-0 top-6 max-w-xs p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl text-[11px] text-slate-400 font-sans leading-relaxed"
              >
                Quantidade de <span className="text-amber-400 font-bold">eCoin</span> alocada em staking. Este valor calcula a sua participação proporcional no Reward Pool global.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Formatado Dinamicamente */}
        <div className="relative rounded-2xl bg-slate-950/60 border border-slate-900 p-4 flex items-center justify-between focus-within:border-amber-500/40 transition-colors">
          <input 
            type="text" 
            value={formatNumber(stake)}
            onChange={(e) => setStake(Math.max(0, parseFormattedInput(e.target.value)))}
            className="bg-transparent text-xl font-mono font-bold text-slate-100 outline-none w-full"
          />
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-900/60 border border-slate-800/80 px-2.5 py-1 rounded-md">eCoin</span>
        </div>

        {/* Slider */}
        <div className="space-y-1.5 px-1">
          <input 
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={stakeSliderValue}
            onChange={(e) => handleStakeSliderChange(Number(e.target.value))}
            className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-600 font-bold">
            <span>10K</span>
            <span>100K</span>
            <span>250K</span>
            <span>500K</span>
            <span>1M</span>
          </div>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {STAKE_PRESETS.map((val) => (
            <button
              type="button"
              key={`stake-btn-${val}`}
              onClick={() => setStake(val)}
              className={`py-1.5 px-2 rounded-lg font-mono text-[10px] font-bold border transition-all ${
                stake === val 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/5" 
                  : "bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
              }`}
            >
              {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ECGAS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-300 uppercase tracking-wide">
            <Fuel size={14} className="text-purple-500" /> Buy ecGas
            <button 
              type="button"
              onMouseEnter={() => setShowGasTooltip(true)}
              onMouseLeave={() => setShowGasTooltip(false)}
              className="text-slate-600 hover:text-slate-400 transition-colors"
            >
              <HelpCircle size={12} />
            </button>
          </div>

          <AnimatePresence>
            {showGasTooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="absolute z-20 left-0 top-6 max-w-xs p-3 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl text-[11px] text-slate-400 font-sans leading-relaxed"
              >
                Massa crítica de ecGas necessária para a mineração active. Estabelece a injeção de liquidez e fixa o teto de ROI máximo a 130%.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input com Paridade em Tempo Real */}
        <div className="relative rounded-2xl bg-slate-950/60 border border-slate-900 p-4 flex items-center justify-between focus-within:border-purple-500/40 transition-colors">
          <div className="flex flex-col w-full">
            <input 
              type="text" 
              value={formatNumber(ecGas)}
              onChange={(e) => setEcGas(Math.max(0, parseFormattedInput(e.target.value)))}
              className="bg-transparent text-xl font-mono font-bold text-slate-100 outline-none w-full"
            />
            <span className="text-[10px] font-mono text-slate-500 mt-0.5">
              ≈ {formatNumber(ecGas * ECGAS_TO_USDT_PARITY)} USDT
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 bg-slate-900/60 border border-slate-800/80 px-2.5 py-1 rounded-md self-center">ecGas</span>
        </div>

        {/* Slider Logarítmico Real */}
        <div className="space-y-1.5 px-1">
          <input 
            type="range"
            min="0"
            max="100"
            step="0.01"
            value={ecGasSliderValue}
            onChange={(e) => handleEcGasSliderChange(Number(e.target.value))}
            className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-600 font-bold">
            <span>0.001</span>
            <span>0.1</span>
            <span>10</span>
            <span>1,000</span>
            <span>10K</span>
          </div>
        </div>

        {/* Presets Logarítmicos Completos */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {[0.001, 0.01, 0.1, 1, 10, 100, 1000, 10000].map((val) => (
            <button
              type="button"
              key={`gas-btn-${val}`}
              onClick={() => setEcGas(val)}
              className={`py-1.5 px-1 rounded-lg font-mono text-[9px] font-bold border transition-all truncate ${
                ecGas === val 
                  ? "bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-lg shadow-purple-500/5" 
                  : "bg-slate-950/40 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800"
              }`}
            >
              {val >= 1000 ? `${val / 1000}K` : val}
            </button>
          ))}
        </div>
      </div>

      {/* 4. PROJECTION WINDOW */}
      <div className="space-y-3">
        <label className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-400 uppercase tracking-wide">
          <Clock size={13} /> Janela de Projeção Temporal
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
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
              Análise de fluxo micro e comportamento imediato de rede.
            </p>
          </button>

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
              Projeção padrão estruturada em ciclos macro semanais.
            </p>
          </button>

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
              Previsibilidade de acumulação de recompensas compostas.
            </p>
          </button>

        </div>
      </div>

      {/* 5. RUN SIMULATION BUTTON */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={handleTriggerAnimation}
          disabled={isAnimating}
          className="w-full relative overflow-hidden bg-slate-100 hover:bg-white text-slate-950 font-mono text-xs font-black tracking-widest uppercase py-4 px-6 rounded-xl transition-all shadow-xl disabled:opacity-50"
        >
          <div className="flex items-center justify-center gap-2">
            {isAnimating ? (
              <>
                <RefreshCw size={14} className="animate-spin text-purple-600" />
                <span>RECALCULATING CHANNELS...</span>
              </>
            ) : (
              <span>RUN SIMULATION</span>
            )}
          </div>
        </button>
        
        <button
          type="button"
          onClick={handleReset}
          title="Resetar parâmetros"
          className="px-4 border border-slate-900 hover:border-slate-800 rounded-xl text-slate-500 hover:text-slate-300 transition-colors bg-slate-950/20"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* 6. LIVE PREVIEW STRIP */}
      <div className="bg-slate-950/80 border border-slate-900/60 rounded-xl p-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] text-slate-500 shadow-inner">
        <div className="flex items-center gap-1">
          <span className="text-slate-600">Stake:</span> 
          <span className="text-amber-400 font-bold">{formatNumber(stake)} eCoin</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-800" />
        <div className="flex items-center gap-1">
          <span className="text-slate-600">ecGas:</span> 
          <span className="text-purple-400 font-bold">{formatNumber(ecGas)} UNITS</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-800 hidden sm:block" />
        <div className="flex items-center gap-1">
          <span className="text-slate-600">Capacity:</span> 
          <span className="text-blue-400 font-bold">{formatNumber(previewCapacity)} USDT</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-800 hidden sm:block" />
        <div className="flex items-center gap-1">
          <span className="text-slate-600">Est. Return (130%):</span> 
          <span className="text-emerald-400 font-bold">{formatNumber(previewEstimatedReturn)} USDT</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-800 hidden lg:block" />
        <div className="flex items-center gap-1">
          <CheckCircle2 size={11} className="text-emerald-500" />
          <span className="text-slate-400 font-medium">Simulation Ready</span>
        </div>
      </div>

    </div>
  );
}