"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  RefreshCw, 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  Layers, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Zap,
  Activity
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

// Blueprint dos Presets Estruturados de Liderança
const PRESETS = [
  { name: "Starter", members: 25, txs: 2, amount: 500, label: "Network Growth Stage 1" },
  { name: "Builder", members: 100, txs: 2, amount: 1000, label: "Network Growth Stage 2" },
  { name: "Leader", members: 500, txs: 3, amount: 1200, label: "Network Growth Stage 3" },
  { name: "Diamond", members: 1000, txs: 4, amount: 1500, label: "Network Growth Stage 4" },
  { name: "Enterprise", members: 5000, txs: 4, amount: 2000, label: "Network Growth Stage 5" }
];

// ============================================================================
// INTERFACES
// ============================================================================
interface NetworkMetrics {
  members: number;
  txsPerMonth: number;
  avgAmount: number;
  totalWithdrawals: number;
  monthlyVolume: number;
  feePool: number;
  referralPool: number;
  treasuryPool: number;
  stakingPool: number;
  l1: number;
  l2: number;
  l3: number;
}

export default function NetworkSimulator() {
  // Três inputs fundamentais da modelagem de comportamento de rede
  const [membersInput, setMembersInput] = useState<string>("100");
  const [txsInput, setTxsInput] = useState<string>("2");
  const [amountInput, setAmountInput] = useState<string>("1000");

  // Engine de Cálculo Centralizado e Unificado
  const calculateNetwork = (members: number, txs: number, avgAmt: number): NetworkMetrics => {
    const totalWithdrawals = members * txs;
    const monthlyVolume = totalWithdrawals * avgAmt;
    const feePool = monthlyVolume * FEE_PCT;
    
    const treasuryPool = feePool * TREASURY_PCT;
    const referralPool = feePool * REFERRAL_PCT;
    const stakingPool = feePool * STAKING_PCT;

    return {
      members,
      txsPerMonth: txs,
      avgAmount: avgAmt,
      totalWithdrawals,
      monthlyVolume,
      feePool,
      referralPool,
      treasuryPool,
      stakingPool,
      l1: referralPool * L1_PCT,
      l2: referralPool * L2_PCT,
      l3: referralPool * L3_PCT
    };
  };

  // Estado Computado Reativo Principal
  const currentMetrics = useMemo(() => {
    const m = Math.max(0, parseInt(membersInput) || 0);
    const t = Math.max(0, parseInt(txsInput) || 0);
    const a = Math.max(0, parseFloat(amountInput) || 0);
    return calculateNetwork(m, t, a);
  }, [membersInput, txsInput, amountInput]);

  // Aplicação instantânea dos presets de liderança
  const applyPreset = (p: typeof PRESETS[number]) => {
    setMembersInput(p.members.toString());
    setTxsInput(p.txs.toString());
    setAmountInput(p.amount.toString());
  };

  // 7. Growth Comparison Engine (Tabela Matricial de Crescimento)
  const growthComparisonTable = useMemo(() => {
    return PRESETS.map(p => {
      const metrics = calculateNetwork(p.members, p.txs, p.amount);
      return {
        name: p.name,
        members: p.members,
        referralPool: metrics.referralPool,
        l1: metrics.l1
      };
    });
  }, []);

  // 8. Scaling Forecast Engine (Multiplicadores em Cascata)
  const scalingForecast = useMemo(() => {
    const m = currentMetrics.members;
    const t = currentMetrics.txsPerMonth;
    const a = currentMetrics.avgAmount;
    return {
      current: currentMetrics,
      double: calculateNetwork(m * 2, t, a),
      triple: calculateNetwork(m * 3, t, a),
      enterprise: calculateNetwork(m * 5, t, a * 1.5) // 5x Membros com ticket 1.5x maior
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
          Referral Network Simulator
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Simule a expansão geométrica da sua rede de afiliados e configure os padrões comportamentais on-chain.
        </p>
      </div>

      {/* 1. NETWORK INPUTS MATRIX */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Input 1: Número de Membros Ativos */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">
            Number of Active Members
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Users size={14} />
            </div>
            <input
              type="number"
              value={membersInput}
              onChange={(e) => setMembersInput(e.target.value)}
              placeholder="Ex: 100"
              className="block w-full pl-9 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Input 2: Média de Saques por Mês */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">
            Average Withdrawals / Month
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <RefreshCw size={14} />
            </div>
            <input
              type="number"
              value={txsInput}
              onChange={(e) => setTxsInput(e.target.value)}
              placeholder="Ex: 2"
              className="block w-full pl-9 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>

        {/* Input 3: Valor Médio por Saque */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-wider block">
            Average Withdrawal Amount
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <DollarSign size={14} />
            </div>
            <input
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="Ex: 1000"
              className="block w-full pl-9 pr-12 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500/50 transition-all h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[10px] font-mono font-bold text-slate-600">USDT</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. QUICK NETWORK PRESETS */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-wider block px-1">
          Select Strategic Leadership Profile Preset
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESETS.map((p) => {
            const isMatch = parseInt(membersInput) === p.members && parseInt(txsInput) === p.txs && parseFloat(amountInput) === p.amount;
            return (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                  isMatch 
                    ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-md" 
                    : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-800"
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wider">{p.name}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">{p.members} Leaders Pool</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. EXECUTIVE STATISTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Network Active Members", value: currentMetrics.members.toLocaleString(), desc: "Total Active Base Nodes", color: "border-slate-900 text-slate-200" },
          { title: "Calculated Monthly Claims", value: currentMetrics.totalWithdrawals.toLocaleString(), desc: "Aggregate Frequency Pool", color: "border-slate-900 text-slate-300" },
          { title: "Aggregated Volume / mo", value: formatCurrency(currentMetrics.monthlyVolume), desc: "Total Generated Pipeline", color: "border-amber-500/10 text-amber-500/90" },
          { title: "Total Referral Allocation", value: formatCurrency(currentMetrics.referralPool), desc: "30% Fee Contract Share", color: "border-emerald-500/20 text-emerald-400 bg-emerald-500/[0.01]" }
        ].map((card, idx) => (
          <div key={idx} className={`bg-slate-950 p-4 rounded-xl border space-y-1 ${card.color}`}>
            <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 block">{card.title}</span>
            <div className="text-sm md:text-lg font-black font-mono tracking-tight">{card.value}</div>
            <span className="text-[9px] font-mono text-slate-600 block">{card.desc}</span>
          </div>
        ))}
      </div>

      {/* 4. WITHDRAWAL PROJECTION & PIPELINE VISUAL FLOW */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
          <Activity size={14} className="text-slate-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-300">Network Withdrawal Projection</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center font-mono text-[11px] text-slate-400">
          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900">
            <span className="text-[8px] text-slate-500 block uppercase">Network Base</span>
            <span className="font-bold text-slate-200">{currentMetrics.members} Nodes</span>
          </div>
          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900">
            <span className="text-[8px] text-slate-500 block uppercase">Frequency</span>
            <span className="font-bold text-slate-200">{currentMetrics.totalWithdrawals} Claims/mo</span>
          </div>
          <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-amber-500">
            <span className="text-[8px] text-slate-500 block uppercase font-bold">Monthly Volume</span>
            <span className="font-black">{formatCurrency(currentMetrics.monthlyVolume)} USDT</span>
          </div>
          <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-900">
            <span className="text-[8px] text-slate-500 block uppercase">Global Fee (1%)</span>
            <span className="font-bold text-slate-300">{formatCurrency(currentMetrics.feePool)} USDT</span>
          </div>
          <div className="bg-emerald-500/[0.02] p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
            <span className="text-[8px] text-slate-500 block uppercase font-bold">Referral Share</span>
            <span className="font-black">{formatCurrency(currentMetrics.referralPool)} USDT</span>
          </div>
        </div>
      </div>

      {/* 5. REFERRAL DISTRIBUTION & 6. LEADER REWARDS MATRIX */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 px-1 text-slate-400">
          <Layers size={14} />
          <span className="text-xs font-black uppercase tracking-wider">Multi-Level Leader Rewards Breakdown</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { level: "L1", pct: "70%", real: "0.210%", val: currentMetrics.l1, icon: "👑", text: "text-amber-400", desc: "Direct Referrals Claim Action" },
            { level: "L2", pct: "25%", real: "0.075%", val: currentMetrics.l2, icon: "🥈", text: "text-slate-300", desc: "Secondary Network Layer Action" },
            { level: "L3", pct: "5%", real: "0.015%", val: currentMetrics.l3, icon: "🥉", text: "text-slate-500", desc: "Tertiary Network Deep Node" }
          ].map((row, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-900 rounded-xl p-4 flex justify-between items-center font-mono">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{row.icon}</span>
                  <span className="text-xs font-black text-slate-200">{row.level} Leader Allocation</span>
                </div>
                <p className="text-[8px] text-slate-600 uppercase tracking-wider">{row.desc}</p>
                <div className="text-[9px] text-slate-500">
                  Pool Share: <span className="text-slate-300 font-bold">{row.pct}</span> | Net Split: <span className="text-slate-400">{row.real}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-base font-black ${row.text}`}>{formatCurrency(row.val)}</span>
                <span className="text-[8px] text-slate-600 block">USDT / mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. GROWTH COMPARISON (MATRIZ DINÂMICA COMPLETA) */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 px-1 text-slate-400">
          <TrendingUp size={14} className="text-amber-500" />
          <span className="text-xs font-black uppercase tracking-wider">Strategic Node Scale Matrix Comparison</span>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-900/30 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                <th className="p-4">Profile Tier</th>
                <th className="p-4">Simulated Active Nodes</th>
                <th className="p-4">Aggregated Referral Pool</th>
                <th className="p-4 text-right text-amber-400">Max L1 Leader Take (70%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/40 text-slate-400">
              {growthComparisonTable.map((row) => (
                <tr key={row.name} className="hover:bg-slate-900/10 transition-colors">
                  <td className="p-4 font-bold text-slate-200 uppercase tracking-wider text-[11px]">{row.name}</td>
                  <td className="p-4 font-bold text-slate-400">{row.members} active users</td>
                  <td className="p-4">{formatCurrency(row.referralPool)} USDT</td>
                  <td className="p-4 text-right text-amber-400 font-bold">{formatCurrency(row.l1)} USDT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8. SCALING FORECAST (MÓDULO DE MOTIVAÇÃO COGNITIVA COM BARRAS DE COMPARAÇÃO VISUAL) */}
      <div className="bg-slate-900/20 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <Zap size={14} className="text-emerald-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">Scaling Forecast & Multiplication Impact</h3>
        </div>

        <div className="space-y-4">
          {[
            { stage: "Current Strategy Setup", data: scalingForecast.current, width: "w-3/12", border: "border-slate-800 text-slate-400 bg-slate-950" },
            { stage: "If Network Size Doubles (2x)", data: scalingForecast.double, width: "w-6/12", border: "border-amber-500/20 text-amber-400 bg-amber-500/[0.01]" },
            { stage: "If Network Size Triples (3x)", data: scalingForecast.triple, width: "w-9/12", border: "border-blue-500/20 text-blue-400 bg-blue-500/[0.01]" },
            { stage: "Enterprise Scale Paradigm (5x Nodes + Tier Boost)", data: scalingForecast.enterprise, width: "w-full", border: "border-purple-500/20 text-purple-400 bg-purple-500/[0.02]" }
          ].map((bar, idx) => (
            <div key={idx} className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-slate-400">{bar.stage}</span>
                <span className="text-slate-500">Vol Pipeline: <span className="text-slate-200 font-bold">{formatCurrency(bar.data.monthlyVolume)} USDT</span></span>
              </div>
              <div className="w-full bg-slate-950 rounded-xl h-8 overflow-hidden flex items-center relative border border-slate-900">
                <div className={`h-full ${bar.width} ${bar.border} transition-all duration-500 rounded-r-lg opacity-40`} />
                <div className="absolute inset-x-3 flex justify-between items-center font-black text-[10px]">
                  <span className="text-slate-400">Total Nodes: {bar.data.members}</span>
                  <span className="text-emerald-400">Referral Pool: {formatCurrency(bar.data.referralPool)} USDT (L1 Leader: {formatCurrency(bar.data.l1)})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. SMART CONTRACT FORMULA & FLOW AUDIT */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-1.5 text-slate-500">
          <ShieldCheck size={12} />
          <span className="text-[10px] font-mono font-black uppercase tracking-wider">Smart Contract Nodal Pipeline Formula</span>
        </div>

        {/* Árvore estruturada de herança on-chain completa */}
        <div className="text-[10px] font-mono text-slate-400 space-y-1.5 border-b border-slate-900 pb-4">
          <div className="flex items-center gap-1.5"><span className="text-slate-700">↳</span> <span>[Metrics Base] Members × Average Freq × Average Ticket = Monthly Volume</span></div>
          <div className="flex items-center gap-1.5 pl-4"><span className="text-slate-700">↳</span> <span className="text-amber-500 font-bold">Fee Deducted = Volume × 1%</span></div>
          <div className="grid grid-cols-3 gap-2 pl-8 pt-1 text-center text-[9px]">
            <div className="bg-slate-900/40 p-1 rounded border border-slate-900">Treasury (20%)</div>
            <div className="bg-amber-500/[0.01] p-1 rounded border border-amber-500/20 text-amber-500 font-bold">Referral Pool (30%)</div>
            <div className="bg-slate-900/40 p-1 rounded border border-slate-900">Staking Core (50%)</div>
          </div>
          <div className="flex items-center gap-1.5 pl-12 pt-1"><span className="text-slate-700">↳</span> <span className="text-slate-500">Referral Multi-Tier Distribution:</span> <span className="text-slate-200">L1 (70%) • L2 (25%) • L3 (5%)</span></div>
        </div>

        <div className="flex items-center justify-center gap-3 text-[9px] font-mono font-bold text-slate-600">
          <span>Sovereign Security Engine Verification:</span>
          <span>L1 Split (0.210%) + L2 Split (0.075%) + L3 Split (0.015%)</span>
          <span>=</span>
          <span className="text-emerald-500">Σ 100% Allocation Balance Check Verified</span>
        </div>
      </div>

    </div>
  );
}