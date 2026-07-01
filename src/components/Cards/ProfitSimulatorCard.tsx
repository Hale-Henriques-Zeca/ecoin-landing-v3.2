"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, Activity, Zap } from "lucide-react";
import { ANIMATION } from "@/lib/Profit-Simulator/constants";

export default function ProfitSimulatorCard() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSimulatorRedirect = () => {
    setIsRedirecting(true);
    router.push("/Profit-Simulator");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATION.cardsDuration }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* CONTAINER ULTRA-PREMIUM COM BORDA NEON POR INDUÇÃO E ANIMAÇÃO GLOW */}
      <div className="relative overflow-hidden bg-slate-950/40 backdrop-blur-xl border border-slate-800/80 hover:border-emerald-500/40 rounded-3xl p-6 shadow-[2px_4px_30px_rgba(0,0,0,0.4)] group transition-all duration-500">
        
        {/* Camada de Malha de Linhas Digitais de Fundo (Cyber Grid Effect) */}
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none" />
        
        {/* Scanner de Luz de Fundo Ciano/Esmeralda Dinâmico */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 group-hover:scale-125 transition-all duration-700" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            
            {/* Caixa de Ícone Estilo Núcleo Quântico */}
            <div className="relative p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-emerald-400 shrink-0 shadow-inner group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all duration-500">
              <Cpu size={26} className="animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
              
              {/* Micro Mini-Tag Flutuante */}
              <div className="absolute -bottom-1 -right-1 bg-slate-950 px-1 py-0.5 rounded-md border border-emerald-500/30">
                <Activity size={8} className="text-emerald-400 animate-pulse" />
              </div>
            </div>

            {/* Bloco de Textos com Tipografia Científica Balanceada */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Zap size={8} className="fill-emerald-400" /> QUANTUM ENGINE ALFA
              </div>
              
              <h3 className="text-base font-extrabold tracking-wide text-white group-hover:text-emerald-500/90 transition-colors duration-300">
                Profit Simulator & Engine Célula
              </h3>
              
              <p className="text-xs text-slate-400 max-w-xl leading-relaxed font-sans">
                Execute simulações matemáticas avançadas de staking e queima de <span className="text-emerald-400 font-semibold tracking-wide">ecGas</span>. Descubra a sua quota-parte do <span className="text-slate-200 font-medium">Smart AI Reward Pool</span> através do nosso modelo preditivo determinístico puro.
              </p>
            </div>
          </div>

          {/* Botão de Ação Estilo Aço Escuro com Borda Ativa Neon */}
          <button
            onClick={handleSimulatorRedirect}
            disabled={isRedirecting}
            className="relative flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-white text-xs font-bold uppercase tracking-widest border border-slate-800 hover:border-emerald-500/50 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 min-w-[190px] shadow-lg overflow-hidden shrink-0 self-end md:self-center group/btn"
          >
            {/* Efeito Reflexivo Gloss que passa pelo botão no hover */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 group-hover/btn:animate-[shine_0.8s_ease-in-out]" />

            {isRedirecting ? (
              <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="group-hover/btn:text-emerald-400 transition-colors duration-300">Analisar Métricas</span>
                <ArrowRight size={14} className="text-slate-400 group-hover/btn:text-emerald-400 group-hover/btn:translate-x-1 transition-all duration-300" />
              </>
            )}
          </button>
        </div>

      </div>
    </motion.div>
  );
}