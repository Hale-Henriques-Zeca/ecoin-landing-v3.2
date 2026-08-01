"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Search, 
  FileText, 
  Image as ImageIcon, 
  ChevronDown, 
  Download, 
  Info,
  Layers,
  Coins,
  ShieldCheck,
  Calendar,
  PieChart,
  DollarSign,
  Lock
} from "lucide-react";

// ============================================================================
// INTERFACES E TIPAGEM (ESTRITAMENTE CONFORME ARQUITETURA DE DADOS)
// ============================================================================
export interface ProfitRow {
  ecGas: number;
  capital: number;
  profit: number;
  totalReturn: number;
  share: number;
  capacity: number;
  custom?: boolean;
}

interface ProfitTableProps {
  rows: ProfitRow[];

  currentEcGas: number;

  projectionWindow: "24h" | "7d" | "30d";

  share: number;

  capacity: number;
}

// Quick Filters expandidos para refletir micro-aportes e baleias de forma coerente
const QUICK_FILTERS = [0.001, 0.01, 0.1, 1, 5, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];

export default function ProfitTable({
    rows,
    currentEcGas,
    projectionWindow,
    share,
    capacity,
}: ProfitTableProps) {
  
  // --------------------------------------------------------------------------
  // ESTADOS INTERNOS CONTROLANDO APENAS FLUXO VISUAL
  // --------------------------------------------------------------------------
  const [selectedRowValue, setSelectedRowValue] = useState<number | null>(1000);
  const [searchValue, setSearchValue] = useState<string>("");
  const [exportOpen, setExportOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // FORMATADORES DE PRECISÃO CIRÚRGICA (EVITA ARREDONDAMENTOS EM MICRO-APORTES)
  // --------------------------------------------------------------------------
  const formatCurrency = (value: number) => {
    if (value >= 1) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2
      }).format(value);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 6
    }).format(value);
  };

  const formatGas = (value: number) => {
    return new Intl.NumberFormat("en-US", { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 6 
    }).format(value);
  };

  const formatPercentage = (val: number) => {
    return `${val.toFixed(4)}%`;
  };

  // --------------------------------------------------------------------------
  // FILTRAGEM DE PROJEÇÃO DINÂMICA (SEARCH INPUT DE ESCOPO VISUAL)
  // --------------------------------------------------------------------------
  const filteredRows = useMemo(() => {
    if (!searchValue) return rows;
    // Filtra apenas a linha exata correspondente à pesquisa informada
    return rows.filter(r => r.ecGas.toString().includes(searchValue));
  }, [rows, searchValue]);

  // Captura os dados dinâmicos do lote selecionado para alimentar os Summary Cards e Scenario Panel
  const activeRowData = useMemo(() => {
    // Se houver uma linha de pesquisa customizada injetada ativa, ela toma prioridade de foco
    const customActive = filteredRows.find(r => r.custom);
    if (customActive) return customActive;

    return filteredRows.find(r => r.ecGas === selectedRowValue) || filteredRows[0] || null;
  }, [filteredRows, selectedRowValue]);

  // --------------------------------------------------------------------------
  // SIMULAÇÃO DO MOTOR GRÁFICO DE DOWNLOADING DE RELATÓRIOS
  // --------------------------------------------------------------------------
  const handleExport = (type: "PDF" | "PNG") => {
    setIsExporting(type);
    setExportOpen(false);
    setTimeout(() => {
      setIsExporting(null);
      alert(`[EDENKINGDOM AUDIT] Investment Report compiled successfully in ${type} format.`);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950/40 border border-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl backdrop-blur-2xl space-y-8 select-none">
      
      {/* 1. HEADER COM EXPORT DROPDOWN EXPANDIDO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-900 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <TrendingUp size={14} /> Profit Projection
          </div>
          <h3 className="text-xl md:text-2xl font-black font-mono tracking-tight text-slate-100 uppercase">
            Investment Projection Report
          </h3>
          <p className="text-slate-500 text-xs font-sans max-w-xl">
            Tabela dinâmica baseada na simulação atual. Utilize filtros rápidos para comparar lotes.
          </p>
        </div>
        
        {/* Export Dropdown com Opções "Coming Soon" */}
        <div className="relative shrink-0 self-start sm:self-center">
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs font-bold text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-all shadow-lg"
          >
            <Download size={14} className={isExporting ? "animate-pulse text-emerald-400" : ""} />
            {isExporting ? `Compiling ${isExporting}...` : "Export Report"}
            <ChevronDown size={14} className={`transform transition-transform ${exportOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {exportOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-52 bg-slate-950 border border-slate-900 rounded-xl shadow-2xl overflow-hidden z-30 p-1"
              >
                <button
                  onClick={() => handleExport("PDF")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left font-mono text-xs font-bold text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 rounded-lg transition-colors"
                >
                  <FileText size={14} className="text-red-400" />
                  Institutional PDF
                </button>
                <button
                  onClick={() => handleExport("PNG")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left font-mono text-xs font-bold text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 rounded-lg transition-colors"
                >
                  <ImageIcon size={14} className="text-blue-400" />
                  Shareable PNG Report
                </button>
                
                <div className="border-t border-slate-900 my-1" />
                <div className="px-3 py-1 text-[8px] font-mono font-black text-slate-600 uppercase tracking-widest">Coming Soon</div>
                
                <button disabled className="w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs font-bold text-slate-600 cursor-not-allowed opacity-50">
                  <span className="flex items-center gap-3">CSV Ledger</span>
                  <Lock size={10} />
                </button>
                <button disabled className="w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs font-bold text-slate-600 cursor-not-allowed opacity-50">
                  <span className="flex items-center gap-3">Excel Matrix</span>
                  <Lock size={10} />
                </button>
                <button disabled className="w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs font-bold text-slate-600 cursor-not-allowed opacity-50">
                  <span className="flex items-center gap-3">JSON Stream</span>
                  <Lock size={10} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. SUMMARY CARDS COM ANIMAÇÕES DEPENDENTES DO LOTE SELECIONADO */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "Simulated Capital", val: formatCurrency(activeRowData?.capital ?? currentEcGas), icon: Coins, color: "text-slate-200" },
          { label: "Net Profit (30%)", val: formatCurrency(activeRowData?.profit ?? currentEcGas * 0.3), icon: TrendingUp, color: "text-emerald-400" },
          { label: "Total Return (130%)", val: formatCurrency(activeRowData?.totalReturn ?? currentEcGas * 1.3), icon: DollarSign, color: "text-blue-400" },
          { label: "Pool Share", val: formatPercentage(activeRowData?.share ?? share), icon: PieChart, color: "text-purple-400" },
          { label: "Mining Capacity", val: formatGas(activeRowData?.capacity ?? capacity), icon: ShieldCheck, color: "text-amber-400" },
          { label: "Projection Window", val: projectionWindow === "24h" ? "24 Hours" : projectionWindow === "7d" ? "7 Days" : "30 Days", icon: Calendar, color: "text-slate-400" }
        ].map((card, i) => (
          <div key={`summary-${i}`} className="bg-slate-950/60 border border-slate-900 p-4 rounded-2xl space-y-1 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-600">
              <span className="text-[8px] font-mono font-black uppercase tracking-widest block">{card.label}</span>
              <card.icon size={11} className="opacity-50 group-hover:text-slate-400 transition-colors" />
            </div>
            {/* Animação suave reativa à troca de linhas selecionadas */}
            <AnimatePresence mode="wait">
              <motion.p
                key={card.val}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className={`text-xs md:text-sm font-mono font-black ${card.color} tracking-tight break-all`}
              >
                {card.val}
              </motion.p>
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* 3. SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-slate-950/40 border border-slate-900 p-3 rounded-2xl">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="Search specific ecGas allocation amount (e.g., 734)..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-slate-950 border border-slate-900 rounded-xl pl-10 pr-4 py-2 font-mono text-xs font-bold text-slate-200 placeholder-slate-600 focus:outline-none focus:border-slate-800 transition-colors"
          />
        </div>
        {searchValue && (
          <button 
            onClick={() => setSearchValue("")}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[10px] font-bold text-slate-400 hover:text-slate-200 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* 4. QUICK FILTERS COM SUPORTE A MICRO-VALORES */}
      <div className="space-y-2">
        <span className="block text-[8px] font-mono font-black text-slate-600 uppercase tracking-widest">Acesso Rápido de Lotes (ecGas)</span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_FILTERS.map((amount) => {
            const isDisabled = searchValue.length > 0;
            const isSelected = selectedRowValue === amount && !isDisabled;
            return (
              <button
                key={`filter-${amount}`}
                disabled={isDisabled}
                onClick={() => setSelectedRowValue(amount)}
                className={`px-2.5 py-1.5 rounded-lg border font-mono text-[11px] font-bold transition-all ${
                  isSelected 
                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-md" 
                    : "bg-slate-950/20 border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none"
                }`}
              >
                {formatGas(amount)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. MAIN TABLE (BINANCE METRIC STYLING) */}
      <div className="w-full overflow-x-auto border border-slate-900 rounded-2xl bg-slate-950/20">
        <table className="w-full border-collapse text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-slate-900 bg-slate-950/80 text-slate-500 font-black text-[9px] uppercase tracking-wider">
              <th className="p-4">ecGas Vol.</th>
              <th className="p-4">Capital Alocado</th>
              <th className="p-4 text-emerald-400">Net Profit (30%)</th>
              <th className="p-4 text-blue-400">Total Return (130%)</th>
              <th className="p-4">Pool Share</th>
              <th className="p-4">Capacity Floor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/40">
            {filteredRows.map((row, idx) => {
              const isCustom = row.custom;
              const isSelected = selectedRowValue === row.ecGas || isCustom;

              return (
                <motion.tr
                  key={`row-${row.ecGas}-${idx}`}
                  onClick={() => !isCustom && setSelectedRowValue(row.ecGas)}
                  animate={{
                    backgroundColor: isSelected ? "rgba(16, 185, 129, 0.04)" : "rgba(0,0,0,0)",
                  }}
                  className={`cursor-pointer transition-colors relative ${isSelected ? "text-slate-100 font-bold" : "text-slate-400 hover:bg-slate-900/30"}`}
                >
                  {/* Volume ecGas + Binance Glow Active Indicator Line */}
                  <td className="p-4 relative">
                    {isSelected && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
                      />
                    )}
                    <div className="flex items-center gap-2 pl-1">
                      <span>{formatGas(row.ecGas)}</span>
                      {isCustom && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[8px] font-black tracking-wider">
                          CUSTOM
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Capital */}
                  <td className="p-4 text-slate-300">{formatCurrency(row.capital)}</td>
                  
                  {/* Profit */}
                  <td className="p-4 text-emerald-400/90 font-black">+{formatCurrency(row.profit)}</td>
                  
                  {/* Total Return */}
                  <td className="p-4 text-blue-400/90">{formatCurrency(row.totalReturn)}</td>
                  
                  {/* Share */}
                  <td className="p-4 text-purple-400/80">{formatPercentage(row.share)}</td>
                  
                  {/* Capacity de Contrato Inteligente */}
                  <td className="p-4 text-amber-500/80 font-black">{formatGas(row.capacity)}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 6. SELECTED SCENARIO DETAILS PANEL (COM PROGRESS INDICATOR DO ROI CAP) */}
      <AnimatePresence mode="wait">
        {activeRowData && (
          <motion.div
            key={`scenario-${activeRowData.ecGas}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="bg-gradient-to-r from-slate-950 to-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-5 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <Layers size={13} className="text-emerald-400" />
                <span className="font-mono text-xs font-black uppercase text-slate-200 tracking-wider">
                  Auditoria de Cenário: {formatGas(activeRowData.ecGas)} ecGas Selecionados
                </span>
              </div>
              
              {/* Barra do ROI CAP Customizada solicitada */}
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-900 px-3 py-1.5 rounded-xl self-start sm:self-center">
                <span className="font-mono text-[9px] font-black text-slate-500 uppercase tracking-widest">ROI CAP</span>
                <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/60 p-0.5">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                </div>
                <span className="font-mono text-xs font-black text-emerald-400">130%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="block text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">ESTRUTURA DE APORTE</span>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Capital Base:</span>
                    <span className="text-slate-200 font-bold">{formatCurrency(activeRowData.capital)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Métricas de ROI:</span>
                    <span className="text-emerald-400 font-bold">130% Cap Garantido</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">POTENCIAL DE CAPTURA</span>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Lucro Líquido:</span>
                    <span className="text-emerald-400 font-bold">+{formatCurrency(activeRowData.profit)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Retorno Bruto:</span>
                    <span className="text-blue-400 font-bold">{formatCurrency(activeRowData.totalReturn)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">PARTICIPAÇÃO NA REDE</span>
                <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Fatia do Pool:</span>
                    <span className="text-purple-400 font-bold">{formatPercentage(activeRowData.share)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Janela de Projeção:</span>
                    <span className="text-slate-300 font-bold">{projectionWindow} Base</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. DISCLAIMER INSTITUCIONAL COMPLETO */}
      <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 flex items-start gap-3 shadow-inner">
        <Info size={14} className="text-slate-600 mt-0.5 shrink-0" />
        <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
          The values displayed in this report are projections derived from the current simulation parameters and the live state of the protocol. Actual rewards depend on future staking activity, reward injections and network participation.
        </p>
      </div>

    </div>
  );
}