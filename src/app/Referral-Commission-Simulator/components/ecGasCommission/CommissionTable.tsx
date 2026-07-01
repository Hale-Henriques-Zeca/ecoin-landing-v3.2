"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Coins, 
  Crown, 
  Award, 
  Medal, 
  Percent, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';

// INTERFACES
interface CommissionRow {
  purchase: number;
  pool: number;
  l1: number;
  l2: number;
  l3: number;
  total: number;
  isCustom?: boolean;
}

export default function CommissionTable() {
  // CONSTANTES & ATALHOS DE VALORES BASE
  const defaultValues = [1, 10, 50, 100, 250, 500, 1000, 5000, 10000];

  // STATES: Valor pesquisado pelo usuário e linha selecionada por clique
  const [searchQuery, setSearchQuery] = useState<string>("100");
  const [selectedPurchase, setSelectedPurchase] = useState<number | null>(100);

  // FUNÇÃO REUTILIZÁVEL DE CÁLCULO CORE (REGRAS DO SMART CONTRACT)
  const calculateMetrics = (purchaseVal: number): CommissionRow => {
    const pool = purchaseVal * 0.20;
    const l1 = pool * 0.70;
    const l2 = pool * 0.20;
    const l3 = pool * 0.10;
    const total = l1 + l2 + l3; // Equivale a 100% do pool distribuído

    return {
      purchase: purchaseVal,
      pool,
      l1,
      l2,
      l3,
      total
    };
  };

  // MOTOR DE COMPILAÇÃO DA TABELA (DADOS DINÂMICOS + BUSCA)
  const tableData = useMemo<CommissionRow[]>(() => {
    // 1. Gerar as linhas padrão
    const rows = defaultValues.map(val => calculateMetrics(val));

    // 2. Se houver um valor customizado válido na pesquisa que não esteja na lista, injetar no topo ou meio
    const parsedSearch = parseFloat(searchQuery);
    if (!isNaN(parsedSearch) && parsedSearch > 0 && !defaultValues.includes(parsedSearch)) {
      const customRow = { ...calculateMetrics(parsedSearch), isCustom: true };
      // Inserir ordenadamente na tabela para manter consistência visual
      const insertIndex = rows.findIndex(r => r.purchase > parsedSearch);
      if (insertIndex === -1) {
        rows.push(customRow);
      } else {
        rows.splice(insertIndex, 0, customRow);
      }
    }

    return rows;
  }, [searchQuery]);

  const formatUSD = (val: number) => {
    if (val === 0) return '$0.00';
    if (val < 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }).format(val);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleShortcutClick = (val: number) => {
    setSearchQuery(val.toString());
    setSelectedPurchase(val);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 text-slate-100 rounded-3xl border border-slate-800/80 shadow-2xl p-6 md:p-10 backdrop-blur-xl space-y-8">
      
      {/* 1. HERO HEADER */}
      <div className="text-center border-b border-slate-800/60 pb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent"
        >
          Referral Commission Table
        </motion.h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 font-medium">
          Consulte rapidamente quanto o Smart Contract distribui automaticamente para qualquer valor de compra na rede.
        </p>
      </div>

      {/* 2. CARDS SUPERIORES: INDICADORES DOS PERCENTUAIS FIXOS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Coins size={18} />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Referral Pool</span>
            <span className="text-lg font-black text-white">20% Global</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
            <Crown size={18} />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Leader Nível L1</span>
            <span className="text-lg font-black text-amber-400">70% do Pool</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-400/10 text-slate-300 border border-slate-700">
            <Award size={18} />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Leader Nível L2</span>
            <span className="text-lg font-black text-slate-300">20% do Pool</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-900/20 text-amber-700 border border-amber-900/30">
            <Medal size={18} />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider">Leader Nível L3</span>
            <span className="text-lg font-black text-amber-700">10% do Pool</span>
          </div>
        </div>
      </div>

      {/* 3. BARRA DE PESQUISA INTERATIVA & QUICK BUTTONS */}
      <div className="bg-slate-900/20 border border-slate-800/60 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* INPUT DE BUSCA */}
        <div className="space-y-1.5 md:col-span-1">
          <label className="text-xs font-black uppercase text-slate-400 tracking-wider block flex items-center gap-1.5">
            <Search size={12} className="text-amber-500" /> Pesquisar Compra Customizada
          </label>
          <div className="relative">
            <input 
              type="number"
              min={0}
              placeholder="Ex: 100"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const parsed = parseFloat(e.target.value);
                setSelectedPurchase(!isNaN(parsed) && parsed > 0 ? parsed : null);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-4 pr-12 font-black text-amber-400 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-all text-left"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">USD</span>
          </div>
        </div>

        {/* QUICK BUTTONS */}
        <div className="space-y-1.5 md:col-span-2">
          <span className="block text-xs font-black uppercase text-slate-500 tracking-wider">Simulações Rápidas de Faturamento</span>
          <div className="flex flex-wrap gap-1.5">
            {defaultValues.map((val) => (
              <motion.button
                key={val}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShortcutClick(val)}
                className={`text-xs px-3 py-2 rounded-lg font-black tracking-tight transition-all ${
                  selectedPurchase === val 
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                    : 'bg-slate-900 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                ${val}
              </motion.button>
            ))}
          </div>
        </div>

      </div>

      {/* 4. TABELA DINÂMICA DE REFERÊNCIA OFICIAL */}
      <div className="border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl bg-slate-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-wider">
                <th className="py-4 px-5">Compra Ativo</th>
                <th className="py-4 px-4 text-center">Referral Pool (20%)</th>
                <th className="py-4 px-4 text-center text-amber-400 flex items-center justify-center gap-1">👑 Leader L1 (70%)</th>
                <th className="py-4 px-4 text-center text-slate-300">🥈 Leader L2 (20%)</th>
                <th className="py-4 px-4 text-center text-amber-700">🥉 Leader L3 (10%)</th>
                <th className="py-4 px-5 text-right">Total Distribuído</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-xs md:text-sm font-bold">
              <AnimatePresence mode="popLayout">
                {tableData.map((row) => {
                  const isHighlighted = selectedPurchase === row.purchase;
                  
                  return (
                    <motion.tr 
                      key={row.purchase}
                      initial={row.isCustom ? { opacity: 0, bg: "rgba(245, 158, 11, 0.1)" } : false}
                      animate={{ 
                        opacity: 1, 
                        backgroundColor: isHighlighted 
                          ? "rgba(245, 158, 11, 0.04)" 
                          : row.isCustom 
                            ? "rgba(16, 185, 129, 0.02)" 
                            : "transparent"
                      }}
                      exit={{ opacity: 0, x: -20 }}
                      onClick={() => setSelectedPurchase(row.purchase)}
                      className={`cursor-pointer transition-colors hover:bg-slate-900/30 group ${
                        isHighlighted ? 'border-y-2 border-amber-500/40 relative z-10 shadow-lg' : ''
                      } ${row.isCustom ? 'border-l-2 border-emerald-500' : ''}`}
                    >
                      {/* COMPRA */}
                      <td className="py-3.5 px-5 font-black text-slate-100 flex items-center gap-2">
                        <span className={isHighlighted ? 'text-amber-400' : 'text-slate-300'}>
                          {formatUSD(row.purchase)}
                        </span>
                        {row.isCustom && (
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-black uppercase tracking-widest">
                            Custom
                          </span>
                        )}
                      </td>

                      {/* POOL */}
                      <td className="py-3.5 px-4 text-center text-slate-400 font-medium">
                        {formatUSD(row.pool)}
                      </td>

                      {/* L1 */}
                      <td className={`py-3.5 px-4 text-center font-extrabold ${isHighlighted ? 'text-amber-400 text-base' : 'text-white'}`}>
                        {formatUSD(row.l1)}
                      </td>

                      {/* L2 */}
                      <td className="py-3.5 px-4 text-center text-slate-300">
                        {formatUSD(row.l2)}
                      </td>

                      {/* L3 */}
                      <td className="py-3.5 px-4 text-center text-amber-700">
                        {formatUSD(row.l3)}
                      </td>

                      {/* TOTAL REWARD */}
                      <td className="py-3.5 px-5 text-right font-black">
                        <span className={`px-2.5 py-1 rounded-lg ${
                          isHighlighted 
                            ? 'bg-amber-500 text-slate-950' 
                            : 'bg-slate-900/80 text-emerald-400 border border-slate-800'
                        }`}>
                          {formatUSD(row.total)}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. SEÇÃO DE DETALHE / HISTÓRICO EXPANDIDO DA LINHA SELECIONADA */}
      {selectedPurchase !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500/10 via-slate-900/40 to-slate-900/40 border border-amber-500/20 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">Cenário Selecionado Atualmente</span>
            <p className="text-slate-300 text-xs mt-1">
              Uma única adesão/venda direta de <span className="font-black text-white">{formatUSD(tableData.find(r => r.purchase === selectedPurchase)?.purchase || selectedPurchase)}</span> dispersa instantaneamente nas carteiras da rede:
            </p>
          </div>
          <div className="flex gap-4 text-xs font-black">
            <div className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-center">
              <span className="block text-[9px] text-slate-500 font-bold uppercase">L1 Recorrente</span>
              <span className="text-amber-400">{formatUSD(tableData.find(r => r.purchase === selectedPurchase)?.l1 || 0)}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-center">
              <span className="block text-[9px] text-slate-500 font-bold uppercase">L2 Indireto</span>
              <span className="text-slate-300">{formatUSD(tableData.find(r => r.purchase === selectedPurchase)?.l2 || 0)}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-center">
              <span className="block text-[9px] text-slate-500 font-bold uppercase">L3 Indireto</span>
              <span className="text-amber-700">{formatUSD(tableData.find(r => r.purchase === selectedPurchase)?.l3 || 0)}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 6. COMMISSION FORMULA FLOWCHART */}
      <div className="pt-2">
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            <ShieldCheck size={14} className="text-emerald-400" /> Algoritmo Linear de Fluxo de Caixa (Commission Formula)
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 text-xs font-bold text-slate-300">
            
            {/* ETAPA 1 */}
            <div className="bg-slate-900 py-2.5 px-4 rounded-xl border border-slate-800 w-full lg:w-auto min-w-[120px]">
              Compra do Usuário
              <span className="text-slate-500 text-[10px] block font-normal mt-0.5">Entrada Bruta (100%)</span>
            </div>
            
            <ChevronRight size={16} className="text-slate-700 rotate-90 lg:rotate-0" />
            
            {/* ETAPA 2 */}
            <div className="bg-amber-500/10 py-2.5 px-4 rounded-xl border border-amber-500/20 w-full lg:w-auto text-amber-400 min-w-[150px]">
              Referral Pool
              <span className="text-[10px] block font-black mt-0.5">Extração Fixa de 20%</span>
            </div>
            
            <ChevronRight size={16} className="text-amber-500/30 rotate-90 lg:rotate-0" />
            
            {/* ETAPA 3: SPLIT DOS TRÊS NÍVEIS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full lg:w-auto">
              <div className="bg-slate-900/80 py-2 px-3 rounded-xl border border-slate-800 text-left min-w-[160px] flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Nível 1 (L1)</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-white font-black">70% do Pool</span>
                  <span className="text-[10px] text-amber-400">14.0% Global</span>
                </div>
              </div>
              
              <div className="bg-slate-900/80 py-2 px-3 rounded-xl border border-slate-800 text-left min-w-[160px] flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Nível 2 (L2)</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-white font-black">20% do Pool</span>
                  <span className="text-[10px] text-slate-400">4.0% Global</span>
                </div>
              </div>

              <div className="bg-slate-900/80 py-2 px-3 rounded-xl border border-slate-800 text-left min-w-[160px] flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Nível 3 (L3)</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-white font-black">10% do Pool</span>
                  <span className="text-[10px] text-amber-700">2.0% Global</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}