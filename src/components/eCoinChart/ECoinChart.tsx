"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useCandlestick } from './hooks/useCandlestick';
import { Activity, TrendingUp } from 'lucide-react';

export const ECoinChart: React.FC = () => {
  const candles = useCandlestick();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-950/95 rounded-3xl p-6 md:p-8 border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.12)] backdrop-blur-xl relative overflow-hidden"
    >
      {/* Linha decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-70" />

      {/* Brilho de fundo decorativo */}
      <div className="absolute -left-20 -top-20 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header do Gráfico */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
            <Activity size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Gráfico Candlestick <span className="text-[#D4AF37] font-mono text-sm">(Tempo Real)</span>
            </h3>
            <p className="text-xs text-gray-400 font-mono">E-Coin / USDT Price Action Stream</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
          <TrendingUp size={14} />
          <span>Live Sync</span>
        </div>
      </div>

      {/* Área de Visualização das Velas */}
      <div className="relative z-10 w-full h-64 bg-black/40 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
        <div className="flex-1 flex items-end gap-1.5 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-[#D4AF37]/20">
          {candles && candles.length > 0 ? (
            candles.map((candle, index) => {
              const isGreen = candle.close >= candle.open;
              return (
                <div key={index} className="flex flex-col items-center h-full justify-end group relative min-w-[12px]">
                  
                  {/* Tooltip Cinematográfico ao passar o mouse */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                    <div className="bg-black/90 border border-[#D4AF37]/40 text-[10px] text-gray-300 rounded-lg p-2 shadow-2xl backdrop-blur-md whitespace-nowrap font-mono">
                      <div className="text-[#D4AF37] font-bold mb-0.5">Vela #{index + 1}</div>
                      <div>Open: ${candle.open}</div>
                      <div>Close: ${candle.close}</div>
                    </div>
                  </div>

                  {/* Corpo da Vela */}
                  <div 
                    className={`w-2.5 rounded-sm transition-all duration-300 shadow-md ${
                      isGreen 
                        ? 'bg-emerald-500 shadow-emerald-500/20 group-hover:bg-emerald-400' 
                        : 'bg-rose-500 shadow-rose-500/20 group-hover:bg-rose-400'
                    }`} 
                    style={{ height: '70%' }}
                  />
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-mono text-gray-500">
              A aguardar dados de mercado...
            </div>
          )}
        </div>
      </div>

      {/* Rodapé interno do componente */}
      <div className="relative z-10 flex justify-between items-center mt-4 text-xs text-gray-500 font-mono">
        <span>Atualização em tempo real via RPC Node</span>
        <span className="text-[#D4AF37]">Binance Smart Chain</span>
      </div>
    </motion.div>
  );
};

export default ECoinChart;