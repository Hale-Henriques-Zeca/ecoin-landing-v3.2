import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Layers, 
  Calendar, 
  Zap,
  Crown,
  Award,
  Medal,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function MonthlySimulator() {
  // 1. ESTADOS COM TRATAMENTO DE SEGURANÇA
  const [purchase, setPurchase] = useState<number>(100);
  const [downlines, setDownlines] = useState<number>(250);

  const downlineShortcuts = [10, 50, 100, 250, 500, 1000];
  const purchaseShortcuts = [1, 10, 100, 1000];

  // 2. MOTOR DE CÁLCULO OTIMIZADO (useMemo & Safe Values)
  const simulation = useMemo(() => {
    const safePurchase = Math.max(0, purchase);
    const safeDownlines = Math.max(0, downlines);

    const volume = safePurchase * safeDownlines;
    const pool = volume * 0.20;
    
    const l1 = pool * 0.70;
    const l2 = pool * 0.20;
    const l3 = pool * 0.10;
    const totalDistributed = l1 + l2 + l3;

    const daily = volume / 30;
    const weekly = volume / 4;
    const yearly = volume * 12;

    const yearlyPool = yearly * 0.20;
    const yearlyL1 = yearlyPool * 0.70;
    const yearlyL2 = yearlyPool * 0.20;
    const yearlyL3 = yearlyPool * 0.10;

    return {
      volume,
      pool,
      l1,
      l2,
      l3,
      totalDistributed,
      daily,
      weekly,
      yearly,
      yearlyPool,
      yearlyL1,
      yearlyL2,
      yearlyL3,
      safePurchase,
      safeDownlines
    };
  }, [purchase, downlines]);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Variantes de animação padrão para os cards
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 text-slate-100 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden p-6 md:p-10 backdrop-blur-xl space-y-10">
      
      {/* 1. HERO HEADER */}
      <div className="text-center border-b border-slate-800/60 pb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent"
        >
          Monthly Referral Simulator
        </motion.h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 font-medium">
          Simule o fluxo de faturamento mensal e a distribuição automatizada de comissões.
        </p>
      </div>

      {/* SEÇÃO PRINCIPAL DE ENTRADAS E MÉTRICAS RÁPIDAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* 2. INPUTS & 3. QUICK BUTTONS */}
        <div className="space-y-6">
          
          {/* INPUT: COMPRA */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 shadow-inner">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-2">
              <DollarSign size={14} /> Cada Downline Compra (USD / Mês)
            </label>
            <input
              type="number"
              min={0}
              value={purchase === 0 ? '' : purchase}
              onChange={(e) => setPurchase(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-2xl font-black text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
              placeholder="0"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {purchaseShortcuts.map((val) => (
                <motion.button
                  key={val}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPurchase(val)}
                  className={`text-xs px-3.5 py-2 rounded-lg font-bold transition-all ${
                    purchase === val
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  ${val}
                </motion.button>
              ))}
            </div>
          </div>

          {/* INPUT: DOWNLINES */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 shadow-inner">
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-2">
              <Users size={14} /> Quantidade de Downlines (Sua Rede)
            </label>
            <input
              type="number"
              min={0}
              value={downlines === 0 ? '' : downlines}
              onChange={(e) => setDownlines(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-2xl font-black text-white focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
              placeholder="0"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {downlineShortcuts.map((val) => (
                <motion.button
                  key={val}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDownlines(val)}
                  className={`text-xs px-3.5 py-2 rounded-lg font-bold transition-all ${
                    downlines === val
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {val} Líderes
                </motion.button>
              ))}
            </div>
          </div>

        </div>

        {/* 4. QUICK SUMMARY TEMPORAL */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-6 space-y-4 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-4">
              <Calendar size={16} className="text-amber-500" /> Métrica Ativa de Fluxo de Volume
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Métricas lineares baseadas na constância mensal de compras configuradas ao lado.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-center">
              <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Volume Diário</span>
              <span className="text-base font-extrabold text-slate-200">{formatUSD(simulation.daily)}</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-center">
              <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Volume Semanal</span>
              <span className="text-base font-extrabold text-slate-200">{formatUSD(simulation.weekly)}</span>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-center border-b-2 border-b-amber-500/50">
              <span className="block text-[10px] text-amber-500 uppercase font-bold tracking-wider mb-1">Volume Mensal</span>
              <span className="text-base font-black text-amber-400">{formatUSD(simulation.volume)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 5. REFERRAL POOL & CARD DE DESTAQUE */}
      <motion.div 
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ y: -4, scale: 1.01 }}
        className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 p-6 rounded-2xl border border-slate-800 relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <TrendingUp size={120} className="text-amber-500" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Faturamento Total Bruto</span>
            <span className="text-3xl font-black text-white tracking-tight">{formatUSD(simulation.volume)}</span>
          </div>
          <div className="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
            <div className="flex sm:justify-end items-center gap-2 mb-1">
              <Zap size={16} className="text-amber-400" />
              <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Referral Pool Global (20%)</span>
            </div>
            <span className="text-3xl font-black text-amber-400 tracking-tight">{formatUSD(simulation.pool)}</span>
          </div>
        </div>
      </motion.div>

      {/* 6. LEADER CARDS & 7. DISTRIBUTION BARS */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers size={14} className="text-slate-400" /> Níveis de Liderança & Barras de Absorção
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* L1 CARD */}
          <motion.div 
            variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4 }}
            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2.5 rounded-xl text-amber-400 border border-amber-500/20">
                  <Crown size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 text-sm uppercase">Nível L1</h4>
                  <span className="text-[11px] text-slate-500 font-medium">70% do Pool</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-md border border-amber-500/20">14% Total</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white block">{formatUSD(simulation.l1)}</span>
              {/* Barra de Distribuição */}
              <div className="w-full bg-slate-950 h-2 rounded-full mt-2 overflow-hidden border border-slate-900">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full w-[70%]" />
              </div>
            </div>
          </motion.div>

          {/* L2 CARD */}
          <motion.div 
            variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4 }}
            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-slate-400/10 p-2.5 rounded-xl text-slate-300 border border-slate-400/20">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 text-sm uppercase">Nível L2</h4>
                  <span className="text-[11px] text-slate-500 font-medium">20% do Pool</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-slate-400/10 text-slate-300 rounded-md border border-slate-400/20">4% Total</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white block">{formatUSD(simulation.l2)}</span>
              {/* Barra de Distribuição */}
              <div className="w-full bg-slate-950 h-2 rounded-full mt-2 overflow-hidden border border-slate-900">
                <div className="bg-gradient-to-r from-slate-400 to-slate-200 h-full w-[20%]" />
              </div>
            </div>
          </motion.div>

          {/* L3 CARD */}
          <motion.div 
            variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ y: -4 }}
            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 flex flex-col justify-between space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-amber-700/20 p-2.5 rounded-xl text-amber-600 border border-amber-700/20">
                  <Medal size={20} />
                </div>
                <div>
                  <h4 className="font-black text-slate-100 text-sm uppercase">Nível L3</h4>
                  <span className="text-[11px] text-slate-500 font-medium">10% do Pool</span>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 bg-amber-700/20 text-amber-600 rounded-md border border-amber-700/20">2% Total</span>
            </div>
            <div>
              <span className="text-2xl font-black text-white block">{formatUSD(simulation.l3)}</span>
              {/* Barra de Distribuição */}
              <div className="w-full bg-slate-950 h-2 rounded-full mt-2 overflow-hidden border border-slate-900">
                <div className="bg-gradient-to-r from-amber-700 to-amber-600 h-full w-[10%]" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 10. REFORÇO VISUAL DO TOTAL DISTRIBUÍDO */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center px-6 gap-2 text-center sm:text-left"
        >
          <div>
            <span className="text-xs font-black uppercase text-slate-400 tracking-widest block">Total Redistribuído na Rede</span>
            <span className="text-[10px] text-slate-500 font-medium">Liquidação imediata de bônus via Smart Contract</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-400 tracking-wide">{formatUSD(simulation.totalDistributed)}</span>
            <span className="text-xs text-slate-500 font-bold">100% Pool</span>
          </div>
        </motion.div>
      </div>

      {/* 8. ANNUAL PROJECTION (CARDS PREMIUM DE CINCO COLUNAS) */}
      <div className="pt-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
          <Layers size={16} /> Annual Projection (Escalabilidade Anual de Ganhos)
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <motion.div whileHover={{ y: -4 }} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 text-center shadow-lg">
            <span className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Volume Anual</span>
            <span className="text-base font-black text-slate-200 block tracking-tight">{formatUSD(simulation.yearly)}</span>
            <span className="text-[10px] text-slate-500 mt-1 block border-t border-slate-950 pt-1">Mês: {formatUSD(simulation.volume)}</span>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 border-l-2 border-l-amber-500 text-center shadow-lg">
            <span className="block text-[10px] uppercase font-black text-amber-500 mb-1.5">Referral Pool</span>
            <span className="text-base font-black text-amber-400 block tracking-tight">{formatUSD(simulation.yearlyPool)}</span>
            <span className="text-[10px] text-slate-500 mt-1 block border-t border-slate-950 pt-1">20% Total</span>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-slate-900/30 p-4 rounded-xl border border-slate-900 text-center shadow-md">
            <span className="block text-[10px] uppercase font-black text-amber-400/80 mb-1.5">👑 L1 Anual</span>
            <span className="text-base font-bold text-white block tracking-tight">{formatUSD(simulation.yearlyL1)}</span>
            <span className="text-[10px] text-amber-500/50 font-semibold mt-1 block border-t border-slate-950/40 pt-1">70% de Entrada</span>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-slate-900/30 p-4 rounded-xl border border-slate-900 text-center shadow-md">
            <span className="block text-[10px] uppercase font-black text-slate-400 mb-1.5">🥈 L2 Anual</span>
            <span className="text-base font-bold text-white block tracking-tight">{formatUSD(simulation.yearlyL2)}</span>
            <span className="text-[10px] text-slate-500 font-semibold mt-1 block border-t border-slate-950/40 pt-1">20% de Entrada</span>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-slate-900/30 p-4 rounded-xl border border-slate-900 text-center shadow-md">
            <span className="block text-[10px] uppercase font-black text-amber-700 mb-1.5">🥉 L3 Anual</span>
            <span className="text-base font-bold text-white block tracking-tight">{formatUSD(simulation.yearlyL3)}</span>
            <span className="text-[10px] text-amber-700/60 font-semibold mt-1 block border-t border-slate-950/40 pt-1">10% de Entrada</span>
          </motion.div>

        </div>
      </div>

      {/* 9. FINANCIAL SUMMARY FINAL */}
      <motion.div 
        variants={cardVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 shadow-xl"
      >
        <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-4">
          <FileText size={16} className="text-slate-400" /> Financial Summary (Relatório de Simulação)
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-sm">
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Aporte Individual</span>
            <span className="font-extrabold text-white">{formatUSD(simulation.safePurchase)} /mês</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Total Downlines</span>
            <span className="font-extrabold text-white">{simulation.safeDownlines} ativos</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Volume Consolidado</span>
            <span className="font-extrabold text-amber-400">{formatUSD(simulation.volume)}</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Pool de Disparos</span>
            <span className="font-extrabold text-white">{formatUSD(simulation.pool)}</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Retorno L1 Mês</span>
            <span className="font-extrabold text-slate-300">{formatUSD(simulation.l1)}</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Retorno L2 Mês</span>
            <span className="font-extrabold text-slate-300">{formatUSD(simulation.l2)}</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Retorno L3 Mês</span>
            <span className="font-extrabold text-slate-300">{formatUSD(simulation.l3)}</span>
          </div>
          <div className="border-l-2 border-emerald-500 pl-3">
            <span className="block text-[11px] text-emerald-500 uppercase font-bold">Total Distribuído</span>
            <span className="font-black text-emerald-400">{formatUSD(simulation.totalDistributed)}</span>
          </div>
        </div>
      </motion.div>

      {/* 11. SMART CONTRACT FORMULA */}
      <div className="pt-2">
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            <ShieldCheck size={14} className="text-emerald-400" /> Lógica Operacional Imutável do Contrato
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs font-bold text-slate-300">
            
            <div className="bg-slate-900 py-2 px-4 rounded-xl border border-slate-800 w-full md:w-auto">
              Purchase <span className="text-slate-500 text-[10px] block font-normal">Input Consumidor</span>
            </div>
            
            <ChevronRight size={16} className="text-slate-700 rotate-90 md:rotate-0" />
            
            <div className="bg-slate-900 py-2 px-4 rounded-xl border border-slate-800 w-full md:w-auto">
              Volume <span className="text-slate-400 text-[10px] block font-black">100%</span>
            </div>
            
            <ChevronRight size={16} className="text-slate-700 rotate-90 md:rotate-0" />
            
            <div className="bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/20 w-full md:w-auto text-amber-400">
              Referral Pool <span className="text-[10px] block font-black">20% Tax Cut</span>
            </div>
            
            <ChevronRight size={16} className="text-amber-500/30 rotate-90 md:rotate-0" />
            
            {/* Split das lideranças */}
            <div className="flex flex-col gap-1 w-full md:w-auto text-left">
              <div className="bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 text-[11px] flex justify-between gap-4">
                <span>👑 L1</span> <span className="text-amber-400">70% do Pool</span>
              </div>
              <div className="bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 text-[11px] flex justify-between gap-4">
                <span>🥈 L2</span> <span className="text-slate-400">20% do Pool</span>
              </div>
              <div className="bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 text-[11px] flex justify-between gap-4">
                <span>🥉 L3</span> <span className="text-amber-700">10% do Pool</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}