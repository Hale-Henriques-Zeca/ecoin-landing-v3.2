"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowRightLeft } from 'lucide-react';

export const PancakePanel: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-950/95 border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-xl overflow-hidden group"
    >
      {/* Linha de luz superior */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Efeito de brilho de fundo dinâmico */}
      <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Bloco de Informações */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-lg shrink-0">
            <ArrowRightLeft size={24} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37]">
                DEX Liquidity Pool
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono bg-pink-500/10 text-pink-400 border border-pink-500/20">
                PancakeSwap
              </span>
            </div>
            <h4 className="text-xl font-black text-white tracking-tight mb-1">
              E-Coin / USDT
            </h4>
            <p className="text-xs md:text-sm text-gray-400 font-light max-w-lg">
              Negocie diretamente na PancakeSwap com liquidez descentralizada e execução instantânea na rede BEP-20.
            </p>
          </div>
        </div>

        {/* Botão de Swap Cinematográfico */}
        <a 
          href="https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964&outputCurrency=0x55d398326f99059fF775485246999027B3197955" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 via-pink-500 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.3)] hover:shadow-none shrink-0 border border-pink-500/20"
        >
          <Sparkles size={16} />
          <span>Swap na PancakeSwap</span>
          <ExternalLink size={16} />
        </a>

      </div>
    </motion.div>
  );
};

export default PancakePanel;