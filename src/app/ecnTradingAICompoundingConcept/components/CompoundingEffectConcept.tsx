'use client';

import React from 'react';
import { Sparkles, Zap, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import ProfitSimulatorCard from '@/components/Cards/ProfitSimulatorCard';
import SimulatorRedirectCard from '@/components/Cards/SimulatorRedirectCard';
import ECoinPancakeSwapPairCTA from '@/components/CTA/ECoinPancakeSwapPairCTA/ECoinPancakeSwapPairCTA';
import EPayAgentCTA from '@/components/CTA/EPayAgentCTA/EPayAgentCTA';


export default function CompoundingEffectConcept() {
  // Dados da tabela de efeito composto de 30 dias (100% fiel à solicitação)
  const compoundData = [
    { day: 1, val: "$0.01", day2: 16, val2: "$327.68" },
    { day: 2, val: "$0.02", day2: 17, val2: "$665.36" },
    { day: 3, val: "$0.04", day2: 18, val2: "$1,310.72" },
    { day: 4, val: "$0.08", day2: 19, val2: "$2,621.44" },
    { day: 5, val: "$0.16", day2: 20, val2: "$5,242.88" },
    { day: 6, val: "$0.32", day2: 21, val2: "$10,485.76" },
    { day: 7, val: "$0.64", day2: 22, val2: "$20,971.52" },
    { day: 8, val: "$1.28", day2: 23, val2: "$41,943.04" },
    { day: 9, val: "$2.64", day2: 24, val2: "$83,886.08" },
    { day: 10, val: "$5.12", day2: 25, val2: "$167,772.16" },
    { day: 11, val: "$10.24", day2: 26, val2: "$355,544.32" },
    { day: 12, val: "$20.48", day2: 27, val2: "$671,088.64" },
    { day: 13, val: "$40.96", day2: 28, val2: "$1,342,177.18" },
    { day: 14, val: "$81.92", day2: 29, val2: "$2,664,353.56" },
    { day: 15, val: "$163.84", day2: 30, val2: "$5,368,709.12" },
  ];

  return (
    <div className="space-y-12 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* SEÇÃO 1: CICLO DE CRESCIMENTO COM ecGas (130% POR CICLO) */}
      <div className="bg-black border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8">
        <div className="bg-white/5 p-6 border-b border-white/10 text-center flex flex-col items-center justify-center gap-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs sm:text-sm">
              Ciclo de Crescimento com Profit Capacity (PC)
            </h4>
        </div>
          <p className="text-xs text-gray-400 max-w-xl">
          Com apenas <span className="text-white font-bold">5 USDT</span> iniciais em 10 sessões de mineração com recompra de Profit Capacity (PC)
          </p>
        </div>

        {/* Grid de Ciclos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coluna 1 (Ciclos 1 a 5) */}
          <div className="space-y-3">
            {/* Ciclo 1 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-xs flex items-center justify-center border border-[#D4AF37]/40">
                  1
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Nível 1: Início (Com Profit Capacity (PC) de 5 USDT)</span>
                  <span className="text-sm font-bold text-white">5.00 USDT ➔ <span className="text-emerald-400">6.50 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 2 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  2
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">6.50 USDT ➔ <span className="text-emerald-400">8.45 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 3 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  3
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">8.45 USDT ➔ <span className="text-emerald-400">10.98 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 4 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  4
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">10.98 USDT ➔ <span className="text-emerald-400">14.27 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 5 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  5
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">14.27 USDT ➔ <span className="text-emerald-400">18.55 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>
          </div>

          {/* Coluna 2 (Ciclos 6 a 10) */}
          <div className="space-y-3">
            {/* Ciclo 6 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  6
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">18.55 USDT ➔ <span className="text-emerald-400">24.11 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 7 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  7
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">24.11 USDT ➔ <span className="text-emerald-400">31.34 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 8 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  8
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">31.34 USDT ➔ <span className="text-emerald-400">40.74 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 9 */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/20">
                  9
                </span>
                <div>
                  <span className="text-xs text-gray-400 block">Re-compra de Profit Capacity (PC)</span>
                  <span className="text-sm font-bold text-white">40.74 USDT ➔ <span className="text-emerald-400">52.96 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-1 rounded font-bold">130%</span>
            </div>

            {/* Ciclo 10 */}
            <div className="p-4 bg-amber-500/10 border border-[#D4AF37]/40 rounded-2xl flex items-center justify-between">
      0       <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#D4AF37] text-black font-extrabold text-xs flex items-center justify-center">
                  10
                </span>
                <div>
                  <span className="text-xs text-[#D4AF37] font-semibold block">10ª Sessão Concluída</span>
                  <span className="text-sm font-extrabold text-white">52.96 USDT ➔ <span className="text-[#D4AF37]">68.85 USDT</span></span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-black bg-[#D4AF37] px-2.5 py-1 rounded-full uppercase">130%</span>
            </div>
          </div>
        </div>

        {/* Caixa Informativa de Destaque 130% */}
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-[#D4AF37]/30 rounded-2xl text-center">
          <p className="text-xs sm:text-sm font-bold text-[#D4AF37]">
            O múltiplo ou a percentagem final sempre é e será 130% de toda compra de Profit Capacity (PC).
          </p>
        </div>

        {/* Texto Explicativo de Rodapé */}
        <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl text-xs text-gray-300 leading-relaxed text-center sm:text-left">
          Então este é como fazer crescer o seu retorno ou capacidade de Lucro (PC) até um número grande começando de <strong className="text-white">5 USDT</strong> em que apenas em 10 sessões de Trading com a ecnTrading AI Bot gerariam mais de <strong className="text-[#D4AF37]">68 USDT</strong>. Nem robôs de trading comuns fazem isso. Não fique por de trás, este bot ecnTrading da moeda eCoin veio para criar valor do seu token, liquidez e mudanças de vida pessoal do mundo crypto. Acordamos pra isto. <strong className="text-[#D4AF37]">eCoin pra sempre.</strong>
        </div>
      </div>

      {/* SEÇÃO 2: VELOCIDADE E CORRETORAS - A PRÓXIMA MARAVILHA DO MUNDO */}
      <section className="px-6 py-12 sm:py-16 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 text-black rounded-[2.5rem] shadow-2xl">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#D4AF37] rounded-full text-xs font-black uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-current" /> High-Frequency AI Trading
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
            A PRÓXIMA MARAVILHA DO MUNDO
          </h2>
          <p className="text-lg sm:text-2xl font-extrabold max-w-4xl mx-auto leading-relaxed">
            Veja o poder do nosso eCoin Neural Trading Bot (ecnTrading Bot): enquanto a tabela mostra o acúmulo de $0.01 por dia, o nosso <span className="underline decoration-black decoration-wavy">E-Coin Neural Trading AI Robot faz $0.1 por cada MILISEGUNDO por ti</span>. Não em segundos, minutos, nem horas. Imagine o poder desse Bot.
          </p>
        </div>
      </section>

      {/* SEÇÃO 3: TABELA DE CRESCIMENTO DIÁRIO (30 DIAS) */}
      <div className="bg-slate-950 border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
              Projeção Matemática de Reinvestimento (1 a 30 Dias)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Escala de multiplicação progressiva e acúmulo constante
            </p>
          </div>
          <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold rounded-lg">
            Modelo 100% Exponencial
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-mono">
            <thead>
              <tr className="text-slate-500 border-b border-slate-800 uppercase text-[10px]">
                <th className="p-3">Dia</th>
                <th className="p-3 text-emerald-400">Acúmulo</th>
                <th className="p-3 border-l border-slate-800">Dia</th>
                <th className="p-3 text-emerald-400">Acúmulo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {compoundData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3 font-bold text-slate-400">Dia {item.day}</td>
                  <td className="p-3 font-bold text-white">{item.val}</td>
                  <td className="p-3 font-bold text-slate-400 border-l border-slate-800">Dia {item.day2}</td>
                  <td className="p-3 font-bold text-[#D4AF37]">{item.val2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CARDS E CTAS DE ATALHO */}
      <div className="space-y-6 pt-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center">
          Ferramentas e Simuladores de Rendimento
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfitSimulatorCard />
          <SimulatorRedirectCard />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <ECoinPancakeSwapPairCTA />
          <EPayAgentCTA />
        </div>
      </div>

    </div>
  );
}