"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  Search, 
  Download, 
  Info,
  Layers,
  Coins,
  ShieldCheck,
  Calendar,
  PieChart,
  DollarSign,
  Award
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

// Quick Filters expandidos para refletir micro-aportes e grandes acionistas
const QUICK_FILTERS = [0.001, 0.01, 0.1, 1, 5, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];

export default function ProfitTable({
  rows,
  currentEcGas,
  projectionWindow,
  share,
  capacity,
}: ProfitTableProps) {
  
  // --------------------------------------------------------------------------
  // ESTADOS INTERNOS CONTROLANDO FLUXO VISUAL
  // --------------------------------------------------------------------------
  const [selectedRowValue, setSelectedRowValue] = useState<number | null>(1000);
  const [searchValue, setSearchValue] = useState<string>("");

  // --------------------------------------------------------------------------
  // MÉTODO DE DOWNLOAD EM PDF (IMPRESSÃO NATIVA DO NAVEGADOR)
  // --------------------------------------------------------------------------
  const handleDownloadPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

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
  // FILTRAGEM DE PROJEÇÃO DINÂMICA
  // --------------------------------------------------------------------------
  const filteredRows = useMemo(() => {
    if (!searchValue) return rows;
    return rows.filter(r => r.ecGas.toString().includes(searchValue));
  }, [rows, searchValue]);

  // Captura os dados dinâmicos do lote selecionado para alimentar os Summary Cards e Scenario Panel
  const activeRowData = useMemo(() => {
    const customActive = filteredRows.find(r => r.custom);
    if (customActive) return customActive;

    return filteredRows.find(r => r.ecGas === selectedRowValue) || filteredRows[0] || null;
  }, [filteredRows, selectedRowValue]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-zinc-950/60 border border-[#D4AF37]/20 rounded-[2.5rem] p-6 md:p-10 shadow-2xl backdrop-blur-2xl space-y-8 select-none relative overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
      
      {/* Regras CSS para Otimização de Impressão / Exportação em PDF */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-border { border: 1px solid #ccc !important; background: #fff !important; color: #000 !important; }
          .print-text { color: #000 !important; }
        }
      `}</style>

      {/* SHIMMER GLOW BACKGROUND */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none no-print" />

      {/* 1. HEADER COM BOTÃO DE DOWNLOAD EM PDF */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/10 print:border-black/20 pb-6 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#D4AF37] print:text-amber-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Award size={14} /> Projeção de Dividendos de Acionista
          </div>
          <h3 className="text-xl md:text-2xl font-black font-mono tracking-tight text-white print:text-black uppercase">
            Relatório de Distribuição de Dividendos
          </h3>
          <p className="text-zinc-400 print:text-zinc-700 text-xs font-sans max-w-xl">
            Matriz de participação acionária baseada no volume de selos alocado. Selecione ou filtre lotes para auditar rendimentos.
          </p>
        </div>
        
        {/* Botão de Download PDF Direto */}
        <button
          onClick={handleDownloadPDF}
          className="no-print flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-yellow-400 text-black font-mono text-xs font-bold rounded-full transition-all duration-300 shadow-lg cursor-pointer shrink-0 self-start sm:self-center"
        >
          <Download size={16} />
          Baixar em PDF
        </button>
      </div>

      {/* 2. SUMMARY CARDS DA SESSÃO SELECIONADA */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 relative z-10">
        {[
          { label: "Capital Simulado", val: formatCurrency(activeRowData?.capital ?? currentEcGas), icon: Coins, color: "text-white print:text-black" },
          { label: "Dividendos Líquidos", val: formatCurrency(activeRowData?.profit ?? currentEcGas * 0.3), icon: TrendingUp, color: "text-emerald-400 print:text-emerald-700" },
          { label: "Retorno Total (130%)", val: formatCurrency(activeRowData?.totalReturn ?? currentEcGas * 1.3), icon: DollarSign, color: "text-[#D4AF37] print:text-amber-700" },
          { label: "Cota do Pool", val: formatPercentage(activeRowData?.share ?? share), icon: PieChart, color: "text-purple-400 print:text-purple-700" },
          { label: "Capacidade De Selos", val: formatGas(activeRowData?.capacity ?? capacity), icon: ShieldCheck, color: "text-amber-400 print:text-amber-700" },
          { label: "Janela de Projeção", val: projectionWindow === "24h" ? "24 Horas" : projectionWindow === "7d" ? "7 Dias" : "30 Dias", icon: Calendar, color: "text-zinc-400 print:text-zinc-700" }
        ].map((card, i) => (
          <div key={`summary-${i}`} className="bg-black/40 print:bg-gray-100 border border-white/5 print:border-gray-300 p-3.5 rounded-2xl space-y-1 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all">
            <div className="flex items-center justify-between text-zinc-500 print:text-zinc-700">
              <span className="text-[8px] font-mono font-black uppercase tracking-widest block">{card.label}</span>
              <card.icon size={12} className="opacity-60 group-hover:text-[#D4AF37] transition-colors" />
            </div>
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

      {/* 3. BARRA DE PESQUISA (OCULTA NA IMPRESSÃO) */}
      <div className="no-print flex flex-col md:flex-row items-stretch md:items-center gap-4 bg-black/40 border border-white/5 p-3 rounded-2xl relative z-10">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar lote de Selos específico (ex: 734)..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-zinc-950 border border-white/10 rounded-xl pl-10 pr-4 py-2 font-mono text-xs font-bold text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
        {searchValue && (
          <button 
            onClick={() => setSearchValue("")}
            className="px-3 py-2 bg-zinc-900 border border-white/10 rounded-xl font-mono text-[10px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Limpar Filtro
          </button>
        )}
      </div>

      {/* 4. ATALHOS RÁPIDOS DE LOTES (OCULTOS NA IMPRESSÃO) */}
      <div className="no-print space-y-2 relative z-10">
        <span className="block text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">
          Lotes de Ações Rápidos
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_FILTERS.map((amount) => {
            const isDisabled = searchValue.length > 0;
            const isSelected = selectedRowValue === amount && !isDisabled;
            return (
              <button
                key={`filter-${amount}`}
                disabled={isDisabled}
                onClick={() => setSelectedRowValue(amount)}
                className={`px-2.5 py-1.5 rounded-xl border font-mono text-[11px] font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10" 
                    : "bg-black/40 border-white/5 text-zinc-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none"
                }`}
              >
                {formatGas(amount)}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. TABELA DE PROJEÇÃO DE DIVIDENDOS */}
      <div className="w-full overflow-x-auto border border-white/10 print:border-gray-300 rounded-2xl bg-black/40 print:bg-white relative z-10">
        <table className="w-full border-collapse text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 print:border-gray-300 bg-zinc-950/80 print:bg-gray-100 text-zinc-500 print:text-zinc-800 font-black text-[9px] uppercase tracking-wider">
              <th className="p-4">Ações a reter</th>
              <th className="p-4">Selos a emitir</th>
              <th className="p-4 text-emerald-400 print:text-emerald-700">Dividendos (Lucros) Líquidos</th>
              <th className="p-4 text-[#D4AF37] print:text-amber-700">Retorno Acionista (130%)</th>
              <th className="p-4">Cota do Pool</th>
              <th className="p-4">Capacidade do Selo emitido</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 print:divide-gray-200">
            {filteredRows.map((row, idx) => {
              const isCustom = row.custom;
              const isSelected = selectedRowValue === row.ecGas || isCustom;

              return (
                <motion.tr
                  key={`row-${row.ecGas}-${idx}`}
                  onClick={() => !isCustom && setSelectedRowValue(row.ecGas)}
                  animate={{
                    backgroundColor: isSelected ? "rgba(212, 175, 55, 0.05)" : "rgba(0,0,0,0)",
                  }}
                  className={`cursor-pointer transition-colors relative ${isSelected ? "text-white print:text-black font-bold" : "text-zinc-400 print:text-zinc-700 hover:bg-white/5"}`}
                >
                  {/* Volume ecGas + Indicator Line */}
                  <td className="p-4 relative">
                    {isSelected && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="no-print absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] to-emerald-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]" 
                      />
                    )}
                    <div className="flex items-center gap-2 pl-1">
                      <span>{formatGas(row.ecGas)}</span>
                      {isCustom && (
                        <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[8px] font-black tracking-wider">
                          PERSONALIZADO
                        </span>
                      )}
                    </div>
                  </td>
                  
                  {/* Capital */}
                  <td className="p-4 text-zinc-300 print:text-zinc-800">{formatCurrency(row.capital)}</td>
                  
                  {/* Dividendos Líquidos */}
                  <td className="p-4 text-emerald-400 print:text-emerald-700 font-black">+{formatCurrency(row.profit)}</td>
                  
                  {/* Retorno Acionista */}
                  <td className="p-4 text-[#D4AF37] print:text-amber-700 font-black">{formatCurrency(row.totalReturn)}</td>
                  
                  {/* Cota do Pool */}
                  <td className="p-4 text-purple-400/90 print:text-purple-700 font-bold">{formatPercentage(row.share)}</td>
                  
                  {/* Capacidade Operacional */}
                  <td className="p-4 text-amber-400/90 print:text-amber-700 font-black">{formatGas(row.capacity)}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 6. PAINEL DE AUDITORIA DO CENÁRIO SELECIONADO */}
      <AnimatePresence mode="wait">
        {activeRowData && (
          <motion.div
            key={`scenario-${activeRowData.ecGas}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="bg-zinc-950/80 print:bg-white border border-white/10 print:border-gray-300 rounded-2xl p-6 space-y-5 shadow-2xl relative overflow-hidden z-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 print:border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#D4AF37] print:text-amber-700" />
                <span className="font-mono text-xs font-black uppercase text-white print:text-black tracking-wider">
                  Auditoria Acionária: {formatGas(activeRowData.ecGas)} Selos Alocados
                </span>
              </div>
              
              {/* Barra do ROI CAP */}
              <div className="flex items-center gap-3 bg-black/60 print:bg-gray-100 border border-white/5 print:border-gray-200 px-3 py-1.5 rounded-xl self-start sm:self-center">
                <span className="font-mono text-[9px] font-black text-zinc-500 print:text-zinc-700 uppercase tracking-widest">TETO ROI CAP</span>
                <div className="w-24 h-2 bg-zinc-900 print:bg-gray-300 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div className="w-full h-full bg-gradient-to-r from-[#D4AF37] to-emerald-400 rounded-full" />
                </div>
                <span className="font-mono text-xs font-black text-[#D4AF37] print:text-amber-700">130%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="block text-[8px] font-mono text-zinc-500 print:text-zinc-700 font-bold uppercase tracking-wider">ESTRUTURA DE APORTE</span>
                <div className="bg-black/40 print:bg-gray-50 p-3 rounded-xl border border-white/5 print:border-gray-200 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 print:text-zinc-700">
                    <span>Capital Base:</span>
                    <span className="text-white print:text-black font-bold">{formatCurrency(activeRowData.capital)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 print:text-zinc-700">
                    <span>Teto de Retorno:</span>
                    <span className="text-emerald-400 print:text-emerald-700 font-bold">130% Garantido</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[8px] font-mono text-zinc-500 print:text-zinc-700 font-bold uppercase tracking-wider">PROJEÇÃO DE DIVIDENDOS</span>
                <div className="bg-black/40 print:bg-gray-50 p-3 rounded-xl border border-white/5 print:border-gray-200 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 print:text-zinc-700">
                    <span>Dividendos Líquidos:</span>
                    <span className="text-emerald-400 print:text-emerald-700 font-bold">+{formatCurrency(activeRowData.profit)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 print:text-zinc-700">
                    <span>Retorno Bruto:</span>
                    <span className="text-[#D4AF37] print:text-amber-700 font-bold">{formatCurrency(activeRowData.totalReturn)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[8px] font-mono text-zinc-500 print:text-zinc-700 font-bold uppercase tracking-wider">FATIA NO ECOSSISTEMA</span>
                <div className="bg-black/40 print:bg-gray-50 p-3 rounded-xl border border-white/5 print:border-gray-200 space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 print:text-zinc-700">
                    <span>Cota da Piscina:</span>
                    <span className="text-purple-400 print:text-purple-700 font-bold">{formatPercentage(activeRowData.share)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400 print:text-zinc-700">
                    <span>Janela Temporal:</span>
                    <span className="text-zinc-300 print:text-zinc-800 font-bold">{projectionWindow}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. DISCLAIMER INSTITUCIONAL */}
      <div className="bg-black/40 print:bg-gray-100 border border-white/5 print:border-gray-300 rounded-xl p-4 flex items-start gap-3 relative z-10">
        <Info size={14} className="text-zinc-500 print:text-zinc-700 mt-0.5 shrink-0" />
        <p className="text-[10px] text-zinc-500 print:text-zinc-700 font-sans leading-relaxed">
          Os valores apresentados são projeções baseadas nos parâmetros atuais de simulação e no estado ao vivo do protocolo. Os dividendos reais distribuídos em USDT e eDollar dependem do volume de transações, taxas geradas e retenção de ações no contrato.
        </p>
      </div>

    </div>
  );
}