"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Table, 
  Search, 
  Sliders, 
  HelpCircle, 
  ArrowDown, 
  ArrowRight,
  Calculator,
  ShieldCheck,
  Percent
} from 'lucide-react';

// ============================================================================
// CONSTANTES DO PROTOCOLO (VALORES FIXOS DO SMART CONTRACT EM BP & PCT)
// ============================================================================
const WITHDRAWAL_FEE_BP = 100;    // 100 BP = 1% Taxa de Saque
const FEE_PCT = 0.01;

const TREASURY_BP = 2000;         // 2000 BP = 20% da Fee
const TREASURY_PCT = 0.20;

const REFERRAL_BP = 3000;         // 3000 BP = 30% da Fee
const REFERRAL_PCT = 0.30;

const STAKING_BP = 5000;          // 5000 BP = 50% da Fee
const STAKING_PCT = 0.50;

// Sub-splits do Pool de Referência
const L1_PCT = 0.70;              // 70% do Pool de Ref (Real: 0.21% do Saque)
const L2_PCT = 0.25;              // 25% do Pool de Ref (Real: 0.075% do Saque)
const L3_PCT = 0.05;              // 5% do Pool de Ref (Real: 0.015% do Saque)

const REAL_L1_PCT = 0.0021;
const REAL_L2_PCT = 0.00075;
const REAL_L3_PCT = 0.00015;

const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000, 50000, 100000];

// ============================================================================
// INTERFACES
// ============================================================================
interface RowCalculation {
  withdrawal: number;
  fee: number;
  treasury: number;
  referral: number;
  staking: number;
  l1: number;
  l2: number;
  l3: number;
  userReceives: number;
  isCustom?: boolean;
}

export default function CommissionTable() {
  const [searchAmount, setSearchAmount] = useState<string>("1000");
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);

  // Engine de Cálculo Centralizado
  const calculateValues = (amount: number, isCustom = false): RowCalculation => {
    const fee = amount * FEE_PCT;
    const treasury = fee * TREASURY_PCT;
    const referral = fee * REFERRAL_PCT;
    const staking = fee * STAKING_PCT;
    
    return {
      withdrawal: amount,
      fee,
      treasury,
      referral,
      staking,
      l1: referral * L1_PCT,
      l2: referral * L2_PCT,
      l3: referral * L3_PCT,
      userReceives: amount - fee,
      isCustom
    };
  };

  // Mapeamento e ordenação reativa das linhas com tag de simulação manual
  const tableRows = useMemo(() => {
    const baseRows = QUICK_AMOUNTS.map(amt => calculateValues(amt, false));
    const parsedSearch = parseFloat(searchAmount);
    
    if (!isNaN(parsedSearch) && parsedSearch > 0 && !QUICK_AMOUNTS.includes(parsedSearch)) {
      const customRow = calculateValues(parsedSearch, true);
      return [...baseRows, customRow].sort((a, b) => a.withdrawal - b.withdrawal);
    }
    
    return baseRows;
  }, [searchAmount]);

  const currentScenario = useMemo(() => {
    const parsedSearch = parseFloat(searchAmount);
    return calculateValues(selectedAmount, !QUICK_AMOUNTS.includes(selectedAmount) && selectedAmount === parsedSearch);
  }, [selectedAmount, searchAmount]);

  const formatCurrency = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 text-slate-100">
      
      {/* HEADER PRINCIPAL */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-slate-100 via-slate-400 to-amber-400 bg-clip-text text-transparent">
          Withdrawal Commission Table
        </h2>
        <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto font-medium">
          Tabela referencial e regulamentadora das distribuições de taxas de saques atômicos do contrato.
        </p>
      </div>

      {/* 1. EXECUTIVE CARDS (COM BASE POINTS EXPANDIDOS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Base Withdrawal Fee", value: "1.00%", sub: `${WITHDRAWAL_FEE_BP} BP • On-Chain Fee`, color: "border-amber-500/20 text-amber-400 font-bold" },
          { label: "Treasury Split", value: "20.00%", sub: `${TREASURY_BP} BP of collected tax`, color: "border-slate-800 text-slate-300" },
          { label: "Referral Split", value: "30.00%", sub: `${REFERRAL_BP} BP of collected tax`, color: "border-amber-500/30 text-amber-400 bg-amber-500/[0.02]" },
          { label: "Staking Split", value: "50.00%", sub: `${STAKING_BP} BP of collected tax`, color: "border-slate-800 text-slate-300" },
        ].map((card, idx) => (
          <div key={idx} className={`bg-slate-950 p-4 rounded-xl border text-center space-y-1 shadow-sm transition-colors ${card.color}`}>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">{card.label}</span>
            <div className="text-lg md:text-2xl font-black font-mono">{card.value}</div>
            <span className="text-[9px] font-mono text-slate-600 block">{card.sub}</span>
          </div>
        ))}
      </div>

      {/* 2. SEARCH SIMULATOR & QUICK BUTTONS */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        <div className="space-y-2 lg:col-span-1">
          <label className="text-[11px] font-mono font-black text-slate-400 uppercase tracking-wider block">
            Simulate Custom Withdrawal
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search size={14} />
            </div>
            <input
              type="number"
              value={searchAmount}
              onChange={(e) => {
                setSearchAmount(e.target.value);
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val > 0) setSelectedAmount(val);
              }}
              placeholder="Ex: 2500"
              className="block w-full pl-9 pr-12 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all h-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-[10px] font-mono font-bold text-slate-500">USDT</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 lg:col-span-2">
          <label className="text-[11px] font-mono font-black text-slate-500 uppercase tracking-wider block">
            Quick Simulation Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {QUICK_AMOUNTS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setSearchAmount(amt.toString());
                  setSelectedAmount(amt);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  selectedAmount === amt 
                    ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-sm" 
                    : "bg-slate-950 border-slate-900 text-slate-400 hover:border-slate-700 hover:text-white"
                }`}
              >
                {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 3. OFFICIAL REFERENCE TABLE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Table size={14} />
            <span className="text-xs font-black uppercase tracking-wider">On-Chain Multi-Tier Distribution Matrix</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Clique em qualquer linha para inspecionar</span>
        </div>

        <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-900 bg-slate-900/30 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                  <th className="p-4 text-white">Withdrawal</th>
                  <th className="p-4 text-amber-400">Fee (1%)</th>
                  <th className="p-4">Treasury (20%)</th>
                  <th className="p-4 text-amber-500/80">Referral (30%)</th>
                  <th className="p-4">Staking (50%)</th>
                  <th className="p-4 text-amber-400 bg-amber-500/[0.01]">L1 (70%)</th>
                  <th className="p-4">L2 (25%)</th>
                  <th className="p-4">L3 (5%)</th>
                  <th className="p-4 text-right text-emerald-400">Net Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60">
                {tableRows.map((row, index) => {
                  const isSelected = selectedAmount === row.withdrawal;
                  return (
                    <tr 
                      key={index}
                      onClick={() => setSelectedAmount(row.withdrawal)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? "bg-amber-500/[0.06] text-white font-bold" 
                          : "text-slate-400 hover:bg-slate-900/40"
                      }`}
                    >
                      <td className={`p-4 flex items-center gap-1.5 font-black ${isSelected ? "text-amber-400" : "text-slate-200"}`}>
                        {row.isCustom && (
                          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[8px] px-1 py-0.2 rounded font-black tracking-tight uppercase animate-pulse">
                            ★ Custom
                          </span>
                        )}
                        {formatCurrency(row.withdrawal)}
                      </td>
                      <td className="p-4 font-bold text-amber-500/90">{formatCurrency(row.fee)}</td>
                      <td className="p-4 text-slate-400">{formatCurrency(row.treasury)}</td>
                      <td className="p-4 text-slate-400">{formatCurrency(row.referral)}</td>
                      <td className="p-4 text-slate-400">{formatCurrency(row.staking)}</td>
                      <td className="p-4 text-amber-400 bg-amber-500/[0.01]">{formatCurrency(row.l1)}</td>
                      <td className="p-4 text-slate-300">{formatCurrency(row.l2)}</td>
                      <td className="p-4 text-slate-500">{formatCurrency(row.l3)}</td>
                      <td className="p-4 text-right font-black text-emerald-400">
                        {formatCurrency(row.userReceives)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. LINHA SELECIONADA (PIPELINE VISUAL + MATEMÁTICA DE CONFIANÇA Σ) */}
      <div className="bg-slate-900/10 border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <Sliders size={14} className="text-amber-500" />
          <h3 className="text-xs font-black uppercase text-slate-200 tracking-wider">
            Selected Scenario: {currentScenario.isCustom ? "Manual Simulation" : "Standard Engine"} <span className="text-amber-400 font-mono text-sm pl-1">{formatCurrency(currentScenario.withdrawal)} USDT</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2 text-center text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-900">
            <span className="text-[9px] font-bold text-slate-500 block mb-1 uppercase">Gross Request</span>
            <div className="font-black text-white text-sm">{formatCurrency(currentScenario.withdrawal)}</div>
            <span className="text-[9px] text-slate-600">100% Vol</span>
          </div>

          <div className="bg-amber-500/5 p-3 rounded-xl border border-amber-500/20">
            <span className="text-[9px] font-bold text-amber-500 block mb-1 uppercase">Tax Retained</span>
            <div className="font-black text-amber-400 text-sm">{formatCurrency(currentScenario.fee)}</div>
            <span className="text-[9px] text-amber-600">1.00% (Fee)</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-900">
            <span className="text-[9px] font-bold text-slate-500 block mb-1 uppercase">To Treasury</span>
            <div className="font-black text-slate-300 text-sm">{formatCurrency(currentScenario.treasury)}</div>
            <span className="text-[9px] text-slate-600">20% of Tax</span>
          </div>

          <div className="bg-amber-500/[0.02] p-3 rounded-xl border border-slate-900">
            <span className="text-[9px] font-bold text-amber-400 block mb-1 uppercase">To Referral Pool</span>
            <div className="font-black text-amber-400 text-sm">{formatCurrency(currentScenario.referral)}</div>
            <span className="text-[9px] text-amber-600">30% of Tax</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-900">
            <span className="text-[9px] font-bold text-slate-500 block mb-1 uppercase">To Staking</span>
            <div className="font-black text-slate-300 text-sm">{formatCurrency(currentScenario.staking)}</div>
            <span className="text-[9px] text-slate-600">50% of Tax</span>
          </div>

          <div className="bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/20">
            <span className="text-[9px] font-bold text-emerald-400 block mb-1 uppercase">Net Disbursed</span>
            <div className="font-black text-emerald-400 text-sm">{formatCurrency(currentScenario.userReceives)}</div>
            <span className="text-[9px] text-emerald-600">99.00% Net</span>
          </div>
        </div>

        {/* Módulos de verificação de Impacto Real de Nível com Soma de Verificação Unificada */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-900/60 space-y-3 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex justify-between items-center px-2 border-l border-amber-500/40">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">L1 LEADER REWARD (70%)</span>
                <span className="text-[9px] text-slate-600">Impacto Global: 0.210% do Saque</span>
              </div>
              <span className="text-sm font-black text-amber-400">{formatCurrency(currentScenario.l1)} USDT</span>
            </div>
            
            <div className="flex justify-between items-center px-2 border-l border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">L2 LEADER REWARD (25%)</span>
                <span className="text-[9px] text-slate-600">Impacto Global: 0.075% do Saque</span>
              </div>
              <span className="text-sm font-black text-slate-300">{formatCurrency(currentScenario.l2)} USDT</span>
            </div>

            <div className="flex justify-between items-center px-2 border-l border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">L3 LEADER REWARD (5%)</span>
                <span className="text-[9px] text-slate-600">Impacto Global: 0.015% do Saque</span>
              </div>
              <span className="text-sm font-black text-slate-500">{formatCurrency(currentScenario.l3)} USDT</span>
            </div>
          </div>

          {/* Validação de Equilíbrio Unificado (Σ) */}
          <div className="flex items-center justify-between border-t border-slate-900 pt-2 text-[10px] text-slate-500 px-2">
            <span className="flex items-center gap-1 font-bold">
              <ShieldCheck size={11} className="text-emerald-500" />
              Referral Pool Total Integrity Audit:
            </span>
            <span className="font-bold">
              L1 + L2 + L3 = <span className="text-amber-400 font-black">{formatCurrency(currentScenario.l1 + currentScenario.l2 + currentScenario.l3)} USDT</span> (Σ = {formatCurrency(currentScenario.referral)} USDT)
            </span>
          </div>
        </div>

      </div>

      {/* 5. SMART FORMULA & MATHEMATICAL VALIDATION (BLUEPRINT COMPLETO) */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-1.5 text-slate-500">
          <HelpCircle size={12} />
          <span className="text-[10px] font-mono font-black uppercase tracking-wider">Contract Computational Blueprint & Math Verification</span>
        </div>

        {/* Fluxo de Transição Visual da Taxa e do Líquido */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3 text-[10px] font-mono font-bold text-slate-500">
          <span className="text-slate-300">Withdrawal Vol</span>
          <ArrowRight size={10} className="hidden lg:block text-slate-700" />
          <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-400 border border-slate-800">Fee = Vol × 1% (100 BP)</span>
          <ArrowRight size={10} className="hidden lg:block text-slate-700" />
          <span className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400 border border-slate-800">Net Received = Vol − Fee (99%)</span>
          <ArrowRight size={10} className="hidden lg:block text-slate-700" />
          <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Treasury = Fee × 20%</span>
          <ArrowRight size={10} className="hidden lg:block text-slate-700" />
          <span className="bg-slate-900 px-2 py-0.5 rounded text-amber-500 border border-slate-800">Referral = Fee × 30%</span>
          <ArrowRight size={10} className="hidden lg:block text-slate-700" />
          <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">Staking = Fee × 50%</span>
        </div>
        
        {/* Documentação das Fórmulas Oficiais no Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-900/80 text-[10px] font-mono text-slate-500">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wide">1. Primary Fee Math</span>
            <div className="bg-slate-900/40 p-2 rounded border border-slate-900 space-y-0.5 text-[9px] text-slate-400">
              <div>Fee = Withdrawal × 0.01</div>
              <div className="text-emerald-400/90">Net = Withdrawal − Fee</div>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wide">2. Protocol Tax Allocation</span>
            <div className="bg-slate-900/40 p-2 rounded border border-slate-900 space-y-0.5 text-[9px] text-slate-400">
              <div>Treasury = Fee × 0.20 (2000 BP)</div>
              <div>Referral = Fee × 0.30 (3000 BP)</div>
              <div>Staking = Fee × 0.50 (5000 BP)</div>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 font-bold block uppercase tracking-wide">3. Affiliate Reward Split</span>
            <div className="bg-slate-900/40 p-2 rounded border border-slate-900 space-y-0.5 text-[9px] text-slate-400">
              <div>L1 = Referral × 0.70 (Real: 0.210%)</div>
              <div>L2 = Referral × 0.25 (Real: 0.075%)</div>
              <div>L3 = Referral × 0.05 (Real: 0.015%)</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}