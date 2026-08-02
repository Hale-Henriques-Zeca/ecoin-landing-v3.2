import React from 'react';
import { PricePanel } from './PricePanel';
import { StatsGrid } from './StatsGrid';
import { ECoinChart } from './ECoinChart';
import { PancakePanel } from './PancakePanel';
import { Sparkles, Shield, Cpu, Activity } from 'lucide-react';

export const Chart: React.FC = () => {
  return (
    <section className="relative max-w-5xl mx-auto p-6 md:p-10 space-y-8 bg-[#030712] text-white rounded-[2.5rem] border border-[#D4AF37]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
      
      {/* Background futurista com efeitos corporativos de alta tecnologia */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Header Institucional Superior */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-amber-600/10 border border-[#D4AF37]/30 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Activity size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D4AF37]">
                EdenKingDom Terminal
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Feed
              </span>
            </div>
            <h2 className="text-2xl font-black italic tracking-tight text-white">
              E-Coin <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-200">Analytics & Market</span>
            </h2>
          </div>
        </div>

        {/* Badges de Selos Enterprise */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300">
            <Shield size={14} className="text-[#D4AF37]" />
            <span className="font-medium">Audited Protocol</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300">
            <Cpu size={14} className="text-cyan-400" />
            <span className="font-medium">BSC Node Active</span>
          </div>
        </div>
      </div>

      {/* Componentes Principais com Grid Estruturado */}
      <div className="relative z-10 space-y-6">
        <div className="transition-all duration-300 hover:scale-[1.01]">
          <PricePanel />
        </div>

        <div className="transition-all duration-300">
          <StatsGrid />
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <ECoinChart />
        </div>

        <div className="transition-all duration-300">
          <PancakePanel />
        </div>
      </div>

      {/* Rodapé do Painel */}
      <div className="relative z-10 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-2">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-[#D4AF37]" />
          <span>Ecosystem Liquidity Stream — Secured by Smart Contract Infrastructure</span>
        </div>
        <div className="text-[#D4AF37] font-semibold">
          BEP-20 Standard
        </div>
      </div>

    </section>
  );
};

export default Chart;