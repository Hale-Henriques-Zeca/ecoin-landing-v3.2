"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';

export const SmartPoolsCTA: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 flex justify-center w-full"
    >
      <Link 
        href="ecoin-buyback-engine"
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-black to-zinc-950 border border-cyan-500/40 text-cyan-400 font-black uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.35)] hover:border-cyan-400 hover:text-white transition-all duration-300 backdrop-blur-xl overflow-hidden"
      >
        {/* Linha de luz superior cinematográfica */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Efeito de brilho de fundo interno */}
        <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/20 transition-colors pointer-events-none" />

        {/* Ícone com animação */}
        <div className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
          <Layers size={16} />
        </div>

        {/* Texto do Botão */}
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-400 animate-pulse" />
          <span>Saiba mais de Smart Pools</span>
        </span>

        {/* Seta de ação com deslocamento */}
        <ArrowRight size={16} className="relative z-10 transform group-hover:translate-x-1 transition-transform text-cyan-400 group-hover:text-white" />
      </Link>
    </motion.div>
  );
};

export default SmartPoolsCTA;