"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Crown, 
  Award, 
  Medal, 
  Network, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  DollarSign,
  Users,
  Coins
} from 'lucide-react';

interface SimulationData {
  level1Volume: number;
  level2Volume: number;
  level3Volume: number;
  level1Pool: number;
  level2Pool: number;
  level3Pool: number;
  level1Reward: number;
  level2Reward: number;
  level3Reward: number;
  totalPeople: number;
  totalVolume: number;
  totalPool: number;
  totalReward: number;
}

export default function NetworkSimulator() {
  // STATES WITH ANTI-NEGATIVE HYDRATION
  const [level1, setLevel1] = useState<number>(20);
  const [level2, setLevel2] = useState<number>(80);
  const [level3, setLevel3] = useState<number>(300);
  const [purchase, setPurchase] = useState<number>(100);

  // QUICK BUTTONS DATA
  const purchaseShortcuts = [1, 10, 100, 500, 1000];
  const networkShortcuts = [10, 25, 50, 100, 250];

  // OPTIMIZED CORE ENGINE (useMemo)
  const simulation = useMemo<SimulationData>(() => {
    const safeL1 = Math.max(0, level1);
    const safeL2 = Math.max(0, level2);
    const safeL3 = Math.max(0, level3);
    const safePurchase = Math.max(0, purchase);

    // Volumes por nível
    const level1Volume = safeL1 * safePurchase;
    const level2Volume = safeL2 * safePurchase;
    const level3Volume = safeL3 * safePurchase;

    // Fração de 20% enviada ao Pool de cada nível
    const level1Pool = level1Volume * 0.20;
    const level2Pool = level2Volume * 0.20;
    const level3Pool = level3Volume * 0.20;

    // Distribuição de Recompensa (70% / 20% / 10%)
    const level1Reward = level1Pool * 0.70;
    const level2Reward = level2Pool * 0.20;
    const level3Reward = level3Pool * 0.10;

    // Totais Consolidados
    const totalPeople = safeL1 + safeL2 + safeL3;
    const totalVolume = level1Volume + level2Volume + level3Volume;
    const totalPool = level1Pool + level2Pool + level3Pool;
    const totalReward = level1Reward + level2Reward + level3Reward;

    return {
      level1Volume,
      level2Volume,
      level3Volume,
      level1Pool,
      level2Pool,
      level3Pool,
      level1Reward,
      level2Reward,
      level3Reward,
      totalPeople,
      totalVolume,
      totalPool,
      totalReward
    };
  }, [level1, level2, level3, purchase]);

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Atalho para preenchimento em efeito cascata/duplicação na rede
  const handleNetworkShortcut = (factor: number) => {
    setLevel1(factor);
    setLevel2(factor * 4); // Matriz de duplicação padrão (4x)
    setLevel3(factor * 15); // Expansão geométrica no 3º nível
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 text-slate-100 rounded-3xl border border-slate-800/80 shadow-2xl p-6 md:p-10 backdrop-blur-xl space-y-10">
      
      {/* 1. HERO HEADER */}
      <div className="text-center border-b border-slate-800/60 pb-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-black tracking-wider uppercase bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent"
        >
          Network Growth Simulator
        </motion.h2>
        <p className="text-slate-400 text-sm md:text-base mt-2 font-medium">
          Simule o poder geométrico de duplicação e veja o impacto financeiro do crescimento da sua rede.
        </p>
      </div>

      {/* SEÇÃO DE INTERAÇÃO: INPUTS E ATALHOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2. INPUTS */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2 mb-2">
            <Layers size={14} className="text-amber-500" /> Parâmetros de Crescimento de Rede
          </h3>

          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Crown size={14} className="text-amber-400" /> Líderes Nível 1
            </label>
            <input 
              type="number" min={0} value={level1 === 0 ? '' : level1}
              onChange={(e) => setLevel1(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 font-bold text-right text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Award size={14} className="text-slate-400" /> Parceiros Nível 2
            </label>
            <input 
              type="number" min={0} value={level2 === 0 ? '' : level2}
              onChange={(e) => setLevel2(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 font-bold text-right text-white focus:outline-none focus:border-slate-400"
            />
          </div>

          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/60 grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Medal size={14} className="text-amber-700" /> Afiliados Nível 3
            </label>
            <input 
              type="number" min={0} value={level3 === 0 ? '' : level3}
              onChange={(e) => setLevel3(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 font-bold text-right text-white focus:outline-none focus:border-amber-700"
            />
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 grid grid-cols-2 gap-4 items-center">
            <label className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <DollarSign size={14} /> Compra por Pessoa
            </label>
            <input 
              type="number" min={0} value={purchase === 0 ? '' : purchase}
              onChange={(e) => setPurchase(Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg py-2 px-3 font-black text-right text-amber-400 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* 3. QUICK BUTTONS */}
        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div>
            <span className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2">Atalhos para Compra Mensal</span>
            <div className="flex flex-wrap gap-2">
              {purchaseShortcuts.map((val) => (
                <motion.button
                  key={val} whileTap={{ scale: 0.95 }} onClick={() => setPurchase(val)}
                  className={`text-xs px-3 py-2 rounded-lg font-bold transition-all ${
                    purchase === val ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ${val}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-xs font-black uppercase text-slate-500 tracking-wider mb-2">Multiplicadores Rápidos de Rede</span>
            <div className="flex flex-wrap gap-2">
              {networkShortcuts.map((val) => (
                <motion.button
                  key={val} whileTap={{ scale: 0.95 }} onClick={() => handleNetworkShortcut(val)}
                  className={`text-xs px-3 py-2 rounded-lg font-bold transition-all ${
                    level1 === val ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Base {val}x
                </motion.button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-2">Aplica uma matriz matemática estimada em profundidade linear.</p>
          </div>
        </div>

      </div>

      {/* 4. RESULTADOS DE COMISSÃO POR NÍVEL (COM RASTREAMENTO DO FLUXO FINANCEIRO) */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Resultados Consolidados por Profundidade</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* CARD RES-L1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, translateY: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-lg"
          >
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1"><Crown size={12}/> Level 1</span>
              <span className="text-xs bg-slate-950 px-2 py-0.5 rounded text-slate-400 font-bold">{level1} Pessoas</span>
            </div>
            <div className="my-4 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Volume Total:</span> <span>{formatUSD(simulation.level1Volume)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium bg-slate-950/40 p-1.5 rounded border border-slate-900">
                <span>Referral Pool (20%):</span> <span className="font-bold text-slate-300">{formatUSD(simulation.level1Pool)}</span>
              </div>
              <div className="pt-1">
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sua Recompensa (70%):</span>
                <div className="text-2xl font-black text-white tracking-tight mt-0.5">{formatUSD(simulation.level1Reward)}</div>
              </div>
            </div>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider block border-t border-slate-800/60 pt-2">Ganhos Diretos de Rede</span>
          </motion.div>

          {/* CARD RES-L2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, translateY: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-lg"
          >
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1"><Award size={12}/> Level 2</span>
              <span className="text-xs bg-slate-950 px-2 py-0.5 rounded text-slate-400 font-bold">{level2} Pessoas</span>
            </div>
            <div className="my-4 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Volume Total:</span> <span>{formatUSD(simulation.level2Volume)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium bg-slate-950/40 p-1.5 rounded border border-slate-900">
                <span>Referral Pool (20%):</span> <span className="font-bold text-slate-300">{formatUSD(simulation.level2Pool)}</span>
              </div>
              <div className="pt-1">
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sua Recompensa (20%):</span>
                <div className="text-2xl font-black text-white tracking-tight mt-0.5">{formatUSD(simulation.level2Reward)}</div>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block border-t border-slate-800/60 pt-2">Ganhos Indiretos N2</span>
          </motion.div>

          {/* CARD RES-L3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, translateY: -4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-lg"
          >
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1"><Medal size={12}/> Level 3</span>
              <span className="text-xs bg-slate-950 px-2 py-0.5 rounded text-slate-400 font-bold">{level3} Pessoas</span>
            </div>
            <div className="my-4 space-y-2">
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>Volume Total:</span> <span>{formatUSD(simulation.level3Volume)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium bg-slate-950/40 p-1.5 rounded border border-slate-900">
                <span>Referral Pool (20%):</span> <span className="font-bold text-slate-300">{formatUSD(simulation.level3Pool)}</span>
              </div>
              <div className="pt-1">
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Sua Recompensa (10%):</span>
                <div className="text-2xl font-black text-white tracking-tight mt-0.5">{formatUSD(simulation.level3Reward)}</div>
              </div>
            </div>
            <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block border-t border-slate-800/60 pt-2">Ganhos Indiretos N3</span>
          </motion.div>

        </div>

        {/* ULTRA CARD TOTAL DISTRIBUÍDO */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 p-6 rounded-2xl text-slate-950 font-black shadow-xl flex justify-between items-center"
        >
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-amber-950/70 block">Seu Bônus Estimado de Rede</span>
            <span className="text-lg font-extrabold text-slate-900">Total Mensal Recorrente</span>
          </div>
          <span className="text-3xl md:text-4xl font-black tracking-tight">{formatUSD(simulation.totalReward)}</span>
        </motion.div>
      </div>

      {/* 5. BARRA VISUAL DE ABSORÇÃO COM AS PERCENTAGENS FIXADAS */}
      <div className="space-y-3 bg-slate-900/30 p-5 rounded-2xl border border-slate-800/80">
        <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">Distribuição Proporcional de Bônus</span>
        
        <div className="space-y-3">
          {/* Bar L1 */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-bold">
              <span className="flex items-center gap-1.5">👑 Nível L1 <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded">70%</span></span> 
              <span>{formatUSD(simulation.level1Reward)}</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-900">
              <motion.div 
                initial={{ width: 0 }} whileInView={{ width: `${simulation.totalReward > 0 ? (simulation.level1Reward / simulation.totalReward) * 100 : 0}%` }} 
                className="bg-amber-500 h-full transition-all rounded-full" 
              />
            </div>
          </div>

          {/* Bar L2 */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-bold">
              <span className="flex items-center gap-1.5">🥈 Nível L2 <span className="text-[10px] text-slate-400 bg-slate-400/10 px-1.5 py-0.2 rounded">20%</span></span> 
              <span>{formatUSD(simulation.level2Reward)}</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-900">
              <motion.div 
                initial={{ width: 0 }} whileInView={{ width: `${simulation.totalReward > 0 ? (simulation.level2Reward / simulation.totalReward) * 100 : 0}%` }} 
                className="bg-slate-400 h-full transition-all rounded-full" 
              />
            </div>
          </div>

          {/* Bar L3 */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1 font-bold">
              <span className="flex items-center gap-1.5">🥉 Nível L3 <span className="text-[10px] text-amber-700 bg-amber-700/10 px-1.5 py-0.2 rounded">10%</span></span> 
              <span>{formatUSD(simulation.level3Reward)}</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-900">
              <motion.div 
                initial={{ width: 0 }} whileInView={{ width: `${simulation.totalReward > 0 ? (simulation.level3Reward / simulation.totalReward) * 100 : 0}%` }} 
                className="bg-amber-700 h-full transition-all rounded-full" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* 6. ÁRVORE DA REDE (SITEMAP VISUAL PREMIUM) */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden">
        <span className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2 mb-6 justify-center">
          <Network size={14} className="text-amber-500" /> Fluxograma Hierárquico de Expansão
        </span>

        <div className="flex flex-col items-center justify-center space-y-5 text-sm font-bold">
          
          {/* Raiz: Você */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="bg-gradient-to-r from-amber-500 to-yellow-400 px-6 py-2.5 rounded-xl text-slate-950 shadow-md font-black z-10 flex items-center gap-2"
          >
            <Users size={16} /> Você Ativo
          </motion.div>

          <div className="w-0.5 h-6 bg-slate-800" />

          {/* L1 Link e Bloco */}
          <div className="flex flex-col items-center w-full">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 border border-amber-500/30 px-5 py-3 rounded-xl text-center w-64 shadow-lg">
              <div className="text-amber-400 text-xs font-black tracking-wider">👑 LEVEL L1</div>
              <div className="text-white text-base font-extrabold mt-0.5">{level1} Líderes</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Volume de {formatUSD(simulation.level1Volume)}</div>
            </motion.div>
          </div>

          <div className="w-0.5 h-6 bg-slate-800" />

          {/* L2 Link e Bloco */}
          <div className="flex flex-col items-center w-full">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 border border-slate-700 px-5 py-3 rounded-xl text-center w-64 shadow-lg">
              <div className="text-slate-300 text-xs font-black tracking-wider">🥈 LEVEL L2</div>
              <div className="text-white text-base font-extrabold mt-0.5">{level2} Parceiros</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Volume de {formatUSD(simulation.level2Volume)}</div>
            </motion.div>
          </div>

          <div className="w-0.5 h-6 bg-slate-800" />

          {/* L3 Link e Bloco */}
          <div className="flex flex-col items-center w-full">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-slate-900 border border-amber-900 px-5 py-3 rounded-xl text-center w-64 shadow-lg">
              <div className="text-amber-700 text-xs font-black tracking-wider">🥉 LEVEL L3</div>
              <div className="text-white text-base font-extrabold mt-0.5">{level3} Afiliados</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Volume de {formatUSD(simulation.level3Volume)}</div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* 7. RESUMO FINANCEIRO COMPACTO (FALANDO A LINGUAGEM DO INVESTIDOR) */}
      <motion.div 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4"
      >
        <h3 className="text-xs font-black uppercase text-slate-300 tracking-wider flex items-center gap-2 border-b border-slate-800/60 pb-3">
          <FileText size={16} className="text-slate-400" /> Network Financial Summary
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6 text-sm">
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Total Usuários Rede</span>
            <span className="font-extrabold text-white">{simulation.totalPeople} ativos</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Compra Média</span>
            <span className="font-extrabold text-white">{formatUSD(purchase)}</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Volume Total Gerado</span>
            <span className="font-black text-amber-400">{formatUSD(simulation.totalVolume)}</span>
          </div>
          <div className="border-l-2 border-slate-800 pl-3">
            <span className="block text-[11px] text-slate-500 uppercase font-bold">Pool Acumulado (20%)</span>
            <span className="font-extrabold text-slate-300">{formatUSD(simulation.totalPool)}</span>
          </div>
          <div className="border-l-2 border-amber-500/40 pl-3">
            <span className="block text-[11px] text-amber-500 uppercase font-bold">Retorno Líquido L1</span>
            <span className="font-extrabold text-white">{formatUSD(simulation.level1Reward)}</span>
          </div>
          <div className="border-l-2 border-slate-600 pl-3">
            <span className="block text-[11px] text-slate-400 uppercase font-bold">Retorno Líquido L2</span>
            <span className="font-extrabold text-white">{formatUSD(simulation.level2Reward)}</span>
          </div>
          <div className="border-l-2 border-amber-900 pl-3">
            <span className="block text-[11px] text-amber-700 uppercase font-bold">Retorno Líquido L3</span>
            <span className="font-extrabold text-white">{formatUSD(simulation.level3Reward)}</span>
          </div>
          <div className="border-l-2 border-emerald-500 bg-emerald-500/5 py-1 px-3 rounded-r-lg">
            <span className="block text-[11px] text-emerald-500 uppercase font-black">Bônus Geral Consolidado</span>
            <span className="font-black text-emerald-400 text-base">{formatUSD(simulation.totalReward)}</span>
          </div>
        </div>
      </motion.div>

      {/* 8. SMART CONTRACT FORMULA */}
      <div className="pt-2">
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
            <ShieldCheck size={14} className="text-emerald-400" /> Regra Algorítmica do Contrato Inteligente
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-xs font-bold text-slate-300">
            
            <div className="bg-slate-900 py-2 px-4 rounded-xl border border-slate-800 w-full md:w-auto">
              Compras Globais <span className="text-slate-500 text-[10px] block font-normal mt-0.5">Faturamento Líquido</span>
            </div>
            
            <ChevronRight size={16} className="text-slate-700 rotate-90 md:rotate-0" />
            
            <div className="bg-slate-900 py-2 px-4 rounded-xl border border-slate-800 w-full md:w-auto">
              Volume da Rede <span className="text-slate-400 text-[10px] block font-black mt-0.5">100%</span>
            </div>
            
            <ChevronRight size={16} className="text-slate-700 rotate-90 md:rotate-0" />
            
            <div className="bg-amber-500/10 py-2 px-4 rounded-xl border border-amber-500/20 w-full md:w-auto text-amber-400">
              Referral Pool <span className="text-[10px] block font-black mt-0.5">Extração de 20%</span>
            </div>
            
            <ChevronRight size={16} className="text-amber-500/30 rotate-90 md:rotate-0" />
            
            <div className="flex flex-col gap-1 w-full md:w-auto text-left">
              <div className="bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 text-[11px] flex justify-between gap-4">
                <span>👑 Líder 1 (L1)</span> <span className="text-amber-400 font-bold">70% do Bônus</span>
              </div>
              <div className="bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 text-[11px] flex justify-between gap-4">
                <span>🥈 Líder 2 (L2)</span> <span className="text-slate-400 font-bold">20% do Bônus</span>
              </div>
              <div className="bg-slate-900/80 py-1.5 px-3 rounded-lg border border-slate-800 text-[11px] flex justify-between gap-4">
                <span>🥉 Líder 3 (L3)</span> <span className="text-amber-700 font-bold">10% do Bônus</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}