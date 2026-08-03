"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useECoinPrice } from './hooks/useECoinPrice';
import { formatPrice } from './utils/formatPrice';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

export const PricePanel: React.FC = () => {
  const { price, change24h } = useECoinPrice();
  const isPositive = change24h >= 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-950/95 border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-xl overflow-hidden group"
    >
      {/* Linha de luz superior com efeito cinematográfico */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Efeito de brilho de fundo dinâmico */}
      <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Bloco de Identificação e Preço */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
              <Zap size={14} className="animate-pulse" />
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-400">
              E-Coin Price Real-Time
            </span>
          </div>

          <div className="text-3xl md:text-5xl font-black text-white tracking-tight font-mono drop-shadow-md">
            ${formatPrice(price)} <span className="text-lg md:text-2xl text-[#D4AF37] font-sans font-semibold">USD</span>
          </div>
        </div>

        {/* Bloco de Variação (24h) com Badge Estilizado */}
        <div className="flex items-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border text-sm md:text-base font-mono font-bold shadow-lg ${
            isPositive 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-rose-500/10'
          }`}>
            {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            <span>{isPositive ? '+' : ''}{change24h}%</span>
            <span className="text-xs font-normal text-gray-400 ml-1">(24h)</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default PricePanel;