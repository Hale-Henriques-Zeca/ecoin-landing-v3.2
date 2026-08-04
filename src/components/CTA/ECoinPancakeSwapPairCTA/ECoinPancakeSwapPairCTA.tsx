"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, ArrowRightLeft } from 'lucide-react';

export const ECoinPancakeSwapPairCTA: React.FC = () => {
  return (
    <section className="py-24 px-6 text-center relative overflow-hidden bg-[#020617]">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] bg-gradient-to-b from-zinc-900/95 to-black/95 border border-[#D4AF37]/40 p-10 text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-xl overflow-hidden group"
        >
          
          {/* Linha superior cinematográfica */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37]" />

          {/* Efeito de brilho de fundo */}
          <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            
            <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 mb-4 shadow-lg">
              <ArrowRightLeft size={24} className="animate-pulse" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] block mb-3">
              PancakeSwap Liquidity Pool
            </span>

            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 italic tracking-tight">
              Obter E-Coin convertendo USDT / E-Coin no Pair — PancakeSwap
            </h3>

            <p className="mb-8 text-gray-300 text-sm md:text-base font-light max-w-xl">
              The E-Coin pair is already pre-listed on PancakeSwap. Aceda diretamente ao par oficial com liquidez descentralizada.
            </p>

            <a
              href="https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D4AF37] via-yellow-500 to-[#D4AF37] text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-none"
            >
              <Sparkles size={16} />
              <span>Access USDT / E-Coin Pair</span>
              <ExternalLink size={16} />
            </a>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ECoinPancakeSwapPairCTA;