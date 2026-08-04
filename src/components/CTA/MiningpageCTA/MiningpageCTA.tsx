"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export const MiningpageCTA: React.FC = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-950/95 border border-white/10 p-8 md:p-12 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Brilhos decorativos nas extremidades */}
          <div className="absolute -left-20 -top-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 text-center mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] block mb-2">
              EdenKingDom Verse Access
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Pronto para maximizar os seus rendimentos?
            </h3>
            <p className="text-gray-400 text-sm md:text-base font-light mt-2 max-w-lg mx-auto">
              Navegue pelo Hub principal ou explore as Smart Pools de mineração em tempo real.
            </p>
          </div>

          {/* BOTÕES DE AÇÃO FINAL */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Link
              href="/ecoin-hub"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-black font-black uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-none"
            >
              <Wallet size={16} />
              <span>Open eCoin Hub</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/Mining"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 hover:from-cyan-500 hover:to-teal-500 text-white font-black uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-none border border-cyan-500/30"
            >
              <Cpu size={16} className="text-cyan-300" />
              <span>Open eCoin Mining Smart Pools</span>
              <Sparkles size={16} className="text-cyan-300 animate-pulse" />
            </Link>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default MiningpageCTA;