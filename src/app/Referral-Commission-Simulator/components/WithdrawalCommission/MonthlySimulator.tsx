"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Layers, 
  TrendingUp, 
  Calendar, 
  HelpCircle, 
  ArrowRight, 
  ArrowDown, 
  Coins, 
  Percent,
  Gauge,
  Activity,
  Network
} from 'lucide-react';

// ============================================================================
// CONSTANTES DO PROTOCOLO (VALORES FIXOS DO SMART CONTRACT)
// ============================================================================
const FEE_PCT = 0.01;        // 1% Taxa de Saque
const TREASURY_PCT = 0.20;   // 20% da Taxa vai para o Tesouro
const REFERRAL_PCT = 0.30;   // 30% da Taxa vai para o Pool de Referência
const STAKING_PCT = 0.50;    // 50% da Taxa vai para o Pool de Staking

const L1_PCT = 0.70;         // 70% do Pool de Referência para L1
const L2_PCT = 0.25;         // 25% do Pool de Referência para L2
const L3_PCT = 0.05;         // 5% do Pool de Referência para L3

const PRESETS = [50000, 100000, 250000, 500000, 1000000, 5000000, 10000000];

// ============================================================================
// INTERFACES
// ============================================================================
interface MonthlyCalculation {
  volume: number;
  fee: number;
  treasury: number;
  referral: number;
  staking: number;
  l1: number;
  l2: number;
  l3: number;
}

export default function MonthlySimulator() {
  // Estado do input principal (Volume Mensal) - Padrão: 100,000 USDT
  const [volumeInput, setVolumeInput] = useState<string>("100000");

  // Engine de Cálculo Centralizado
  const calculateMonthly = (vol: number): MonthlyCalculation => {
    const fee = vol * FEE_PCT;
    const treasury = fee * TREASURY_PCT;
    const referral = fee * REFERRAL_PCT;
    const staking = fee * STAKING_PCT;

    return {
      volume: vol,
      fee,
      treasury,
      referral,
      staking,
      l1: referral * L1_PCT,
      l2: referral * L2_PCT,
      l3: referral * L3_PCT
    };
  };

  // Processamento reativo do volume atual
  const currentMetrics = useMemo(() => {
    const parsed = parseFloat(volumeInput);
    return calculateMonthly(!isNaN(parsed) && parsed > 0 ? parsed : 0);
  }, [volumeInput]);

  // Network Health Indicator Blueprint
  const networkHealth = useMemo(() => {
    const vol = currentMetrics.volume;
    if (vol < 100000) return { label: "Low Activity Network", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    if (vol < 500000) return { label: "Growing Network", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    if (vol < 2000000) return { label: "High Performance Scale", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    return { label: "Enterprise Sovereign Scale", color: "text-purple-400 bg-purple-500/10 border-purple-500/20 font-black" };
  }, [currentMetrics.volume]);

  // Projeção de Escalonamento de Rede (Growth Projection)
  const growthMetrics = useMemo(() => {
    return {
      current: currentMetrics,
      double: calculateMonthly(currentMetrics.volume * 2),
      fiveX: calculateMonthly(currentMetrics.volume * 5),
      tenX: calculateMonthly(currentMetrics.volume * 10),
    };
  }, [currentMetrics]);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 text-slate-100">
      
      {/* HEADER PRINCIPAL */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-slate-100 via-slate-400 to-amber-400 bg-clip-text text-transparent">
          Monthly Referral Simulator
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Projete quanto poderá receber mensalmente com base no volume acumulado de saques da sua rede de afiliados.
        </p>
      </div>

      {/* 1. INPUT CONTROLS & 2. QUICK MONTHLY PRESETS */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Campo de Entrada Principal */}
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-wider block">
            Monthly Withdrawal Volume
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Calculator size={14} />
            </div>
            <input
              type="number"
              value={volumeInput}
              onChange={(e) => setVolumeInput(e.target.value)}
              placeholder="Ex: 100000"
              className="block w-full pl-9 pr-14 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[10px] font-mono font-bold text-slate-500">USDT/mo</span>
            </div>
          </div>
        </div>

        {/* Presets Rápidos de Volume */}
        <div className="space-y-2 lg:col-span-2">
          <label className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-wider block">
            Quick Network Volume Presets
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((amt) => {
              const label = amt >= 1000000 ? `${amt / 1000000}M` : `${amt / 1000}k`;
              const isSelected = parseFloat(volumeInput) === amt;
              return (
                <button
                  key={amt}
                  onClick={() => setVolumeInput(amt.toString())}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    isSelected 
                      ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-sm" 
                      : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8. NETWORK HEALTH INDICATOR BADGE (ADICIONADO) */}
      <div className="flex items-center justify-between bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-400">
          <Activity size={14} className="text-slate-500" />
          <span>Network Health Blueprint Status:</span>
        </div>
        <div className={`px-2.5 py-1 rounded-md text-[10px] uppercase font-bold border tracking-wider ${networkHealth.color}`}>
          {networkHealth.label}
        </div>
      </div>

      {/* 3. EXECUTIVE MONTHLY CARDS (CORRIGIDO SEMÂNTICA E INCLUSÃO DO STAKING) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: "Target Monthly Vol", value: formatCurrency(currentMetrics.volume), desc: "Network Total Claims", color: "border-slate-900 text-slate-200" },
          { title: "Generated Fees (1%)", value: formatCurrency(currentMetrics.fee), desc: "Total Retained On-Chain", color: "border-amber-500/10 text-amber-500/90" },
          { title: "Treasury Share (20%)", value: formatCurrency(currentMetrics.treasury), desc: "Protocol Growth Core", color: "border-slate-900 text-slate-400" },
          { title: "Total Referral Budget", value: formatCurrency(currentMetrics.referral), desc: "30% Allocated to Pool", color: "border-amber-500/20 text-amber-400 bg-amber-500/[0.01]" },
          { title: "Staking Pool (50%)", value: formatCurrency(currentMetrics.staking), desc: "Global Staker Rewards", color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.01]" }
        ].map((card, idx) => (
          <div key={idx} className={`bg-slate-950 p-4 rounded-xl border space-y-1 transition-all ${card.color}`}>
            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">{card.title}</span>
            <div className="text-sm md:text-lg font-black font-mono tracking-tight">{card.value} <span className="text-[9px] text-slate-600 font-normal">USDT</span></div>
            <span className="text-[9px] font-mono text-slate-600 block">{card.desc}</span>
          </div>
        ))}
      </div>

      {/* 4. MONTHLY DISTRIBUTION (VISUAL CADEIA COMPLETA CORRIGIDA) */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
          <Gauge size={14} className="text-slate-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Monthly Fee Distribution</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center font-mono text-xs relative">
          <div className="bg-slate-900/20 p-3 rounded-xl border border-slate-800 text-slate-400">
            <span className="text-[9px] text-slate-500 block uppercase">1. Monthly Withdrawal</span>
            <span className="font-bold text-slate-300">{formatCurrency(currentMetrics.volume)} USDT</span>
          </div>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-[9px] text-slate-500 block uppercase font-bold">2. Fee Pool (1%)</span>
            <span className="text-slate-200 font-black">{formatCurrency(currentMetrics.fee)} USDT</span>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900/80 text-slate-500">
            <span className="text-[9px] uppercase">Treasury (20%)</span>
            <span className="text-slate-400 font-bold block">{formatCurrency(currentMetrics.treasury)} USDT</span>
          </div>

          <div className="bg-amber-500/[0.03] p-3 rounded-xl border border-amber-500/20">
            <span className="text-[9px] text-amber-500 block uppercase font-bold">Referral Pool (30%)</span>
            <span className="text-amber-400 font-black">{formatCurrency(currentMetrics.referral)} USDT</span>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900/80 text-slate-500">
            <span className="text-[9px] uppercase">Staking (50%)</span>
            <span className="text-slate-400 font-bold block">{formatCurrency(currentMetrics.staking)} USDT</span>
          </div>
        </div>
      </div>

      {/* 5. REFERRAL MONTHLY BREAKDOWN (ENRIQUECIDO COM MÉTRICAS DE IMPACTO) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 px-1 text-slate-400">
          <Layers size={14} />
          <span className="text-xs font-black uppercase tracking-wider">Multi-Level Monthly Income Projections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* CARD L1 */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 text-slate-800 text-3xl font-black select-none pointer-events-none group-hover:text-amber-500/5 transition-colors">L1</div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👑</span>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-200">Level 1 Reward</h4>
                <div className="space-y-0.5 text-[9px] font-mono text-slate-500">
                  <p>Share of Pool: <span className="text-slate-300 font-bold">70.0%</span></p>
                  <p>Real Withdrawal Impact: <span className="text-amber-500/80 font-bold">0.210%</span></p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-900">
              <div className="text-2xl font-black font-mono text-amber-400">{formatCurrency(currentMetrics.l1)} <span className="text-xs font-normal text-slate-500">USDT / mo</span></div>
            </div>
          </div>

          {/* CARD L2 */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 text-slate-800 text-3xl font-black select-none pointer-events-none group-hover:text-slate-400/5 transition-colors">L2</div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🥈</span>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-200">Level 2 Reward</h4>
                <div className="space-y-0.5 text-[9px] font-mono text-slate-500">
                  <p>Share of Pool: <span className="text-slate-300 font-bold">25.0%</span></p>
                  <p>Real Withdrawal Impact: <span className="text-slate-300 font-bold">0.075%</span></p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-900">
              <div className="text-2xl font-black font-mono text-slate-300">{formatCurrency(currentMetrics.l2)} <span className="text-xs font-normal text-slate-500">USDT / mo</span></div>
            </div>
          </div>

          {/* CARD L3 */}
          <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-3 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 text-slate-800 text-3xl font-black select-none pointer-events-none group-hover:text-slate-600/5 transition-colors">L3</div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🥉</span>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-200">Level 3 Reward</h4>
                <div className="space-y-0.5 text-[9px] font-mono text-slate-500">
                  <p>Share of Pool: <span className="text-slate-300 font-bold">5.0%</span></p>
                  <p>Real Withdrawal Impact: <span className="text-slate-300 font-bold">0.015%</span></p>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-900">
              <div className="text-2xl font-black font-mono text-slate-500">{formatCurrency(currentMetrics.l3)} <span className="text-xs font-normal text-slate-500">USDT / mo</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. INCOME FORECAST (TABELA ADICIONADA COLUNA DE SUB-RECOMPENSAS) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 px-1 text-slate-400">
          <Calendar size={14} />
          <span className="text-xs font-black uppercase tracking-wider">Compound Income Timeline Forecast</span>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-900/30 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                <th className="p-4">Time Horizon</th>
                <th className="p-4">Total Referral Pool Allocation</th>
                <th className="p-4 text-right text-amber-400">Leader L1 Max Reward (70%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/50 text-slate-400">
              <tr>
                <td className="p-4 font-bold text-slate-200">Monthly Horizon</td>
                <td className="p-4">{formatCurrency(currentMetrics.referral)} USDT</td>
                <td className="p-4 text-right text-amber-400 font-bold">{formatCurrency(currentMetrics.l1)} USDT</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Quarterly Horizon</td>
                <td className="p-4">{formatCurrency(currentMetrics.referral * 3)} USDT</td>
                <td className="p-4 text-right text-amber-400 font-bold">{formatCurrency(currentMetrics.l1 * 3)} USDT</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Semiannual Horizon</td>
                <td className="p-4">{formatCurrency(currentMetrics.referral * 6)} USDT</td>
                <td className="p-4 text-right text-amber-400 font-bold">{formatCurrency(currentMetrics.l1 * 6)} USDT</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-200">Yearly Horizon</td>
                <td className="p-4 font-bold text-slate-300">{formatCurrency(currentMetrics.referral * 12)} USDT</td>
                <td className="p-4 text-right text-emerald-400 font-black bg-emerald-500/[0.01]">{formatCurrency(currentMetrics.l1 * 12)} USDT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. GROWTH PROJECTION & 9. ESCALONAMENTO SEMÂNTICO COM BARRAS VISUAIS TAILWIND */}
      <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <TrendingUp size={14} className="text-emerald-500" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">Network Scalability & Visual Comparison</h3>
        </div>

        <div className="space-y-4">
          {[
            { stage: "Current Network Stage", metrics: growthMetrics.current, w: "w-2/12", bg: "bg-slate-800 text-slate-400" },
            { stage: "Double Network Stage (2x)", metrics: growthMetrics.double, w: "w-4/12", bg: "bg-amber-500/10 text-amber-400 border border-amber-500/20" },
            { stage: "Five Times Growth Stage (5x)", metrics: growthMetrics.fiveX, w: "w-8/12", bg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
            { stage: "Enterprise Scale Horizon (10x)", metrics: growthMetrics.tenX, w: "w-full", bg: "bg-purple-500/20 text-purple-300 border border-purple-500/30" }
          ].map((bar, idx) => (
            <div key={idx} className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between items-center text-[11px]">
                <span className="font-bold text-slate-400">{bar.stage}</span>
                <span className="font-black text-slate-200">Vol: {formatCurrency(bar.metrics.volume)} USDT</span>
              </div>
              <div className="w-full bg-slate-950 rounded-lg h-8 overflow-hidden flex items-center relative border border-slate-900">
                <div className={`h-full ${bar.w} ${bar.bg} transition-all duration-500 rounded-r-md`} />
                <div className="absolute right-3 font-black text-[11px] text-emerald-400">
                  Pool: {formatCurrency(bar.metrics.referral)} USDT (L1: {formatCurrency(bar.metrics.l1)})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10. MONTHLY FORMULA COMPACTA E ARBORESCENTE */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-1.5 text-slate-500">
          <HelpCircle size={12} />
          <span className="text-[10px] font-mono font-black uppercase tracking-wider">Monthly Smart Contract Formula</span>
        </div>

        {/* Visual Pipeline Hierárquico Completo */}
        <div className="text-[10px] font-mono text-slate-400 space-y-2 border-b border-slate-900 pb-4">
          <div className="flex items-center gap-1.5"><span className="text-slate-600">↳</span> <span>[Volume] Monthly Claims Volume</span></div>
          <div className="flex items-center gap-1.5 pl-4"><span className="text-slate-600">↳</span> <span className="text-amber-500 font-bold">1% Fee Allocation</span></div>
          <div className="grid grid-cols-3 gap-2 pl-8 pt-1">
            <div className="bg-slate-900/40 p-1.5 rounded border border-slate-900">20% Treasury Core</div>
            <div className="bg-amber-500/[0.02] p-1.5 rounded border border-amber-500/20 text-amber-400 font-bold">30% Referral Pool</div>
            <div className="bg-slate-900/40 p-1.5 rounded border border-slate-900">50% Staking Engine</div>
          </div>
          <div className="flex items-center gap-1.5 pl-12 pt-1"><span className="text-slate-600">↳</span> <span className="text-slate-500">Referral Pool Splits:</span> <span className="text-slate-300">L1 (70%) • L2 (25%) • L3 (5%)</span></div>
        </div>

        <div className="flex items-center justify-center gap-3 text-[9px] font-mono font-bold text-slate-600">
          <span>Cascade Validation Check:</span>
          <span>L1 (0.210%) + L2 (0.075%) + L3 (0.015%)</span>
          <span>=</span>
          <span className="text-emerald-500">Σ 100% of Monthly Referral Allocation</span>
        </div>
      </div>

    </div>
  );
}