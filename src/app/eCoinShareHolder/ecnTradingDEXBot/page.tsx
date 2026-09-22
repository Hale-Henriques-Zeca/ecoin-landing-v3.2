'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Zap, 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  PieChart, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { BOT_MARKETS } from './lib/ecnTrading/markets';
import EcnTradingAICompoundingConceptCTA from '@/components/CTA/EcnTradingAICompoundingConceptCTA/EcnTradingAICompoundingConceptCTA';

export default function EcnTradingDEXPage() {
  return (
    <div className="space-y-6">
      {/* CTA no Topo */}
      <EcnTradingAICompoundingConceptCTA />

      {/* Card de Visão Geral do Patrimônio e Lucros */}
      <div className="bg-gradient-to-br from-[#12181F] to-[#0D1219] border border-[#D4AF37]/30 rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" />
            Patrimônio Alocado
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] animate-pulse" />
            LIVE
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl md:text-4xl font-black tracking-tight text-white">$158,240.00</span>
          <span className="text-xs md:text-sm font-bold text-[#00FF9C] flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
            +6.26%
          </span>
        </div>

        {/* Métrica Dividida */}
        <div className="grid grid-cols-2 gap-2.5 md:gap-4 pt-3 border-t border-gray-800/80">
          <div className="bg-[#0B0E14]/80 p-2.5 md:p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 mb-1">
              <PieChart className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Participação Pool (PPP)</span>
            </div>
            <span className="text-sm md:text-lg font-extrabold text-[#D4AF37]">5.47%</span>
          </div>

          <div className="bg-[#0B0E14]/80 p-2.5 md:p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-[#00FF9C]" />
              <span>Capacidade CS Restante</span>
            </div>
            <span className="text-sm md:text-lg font-extrabold text-[#00FF9C]">62.5%</span>
          </div>
        </div>
      </div>

      {/* Mercados de Trading Bot */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-[#D4AF37]" />
            Mercados de Trading Bot
          </h2>
          <Link 
            href="/eCoinShareHolder/ecnTradingDEXBot/bot"
            className="text-[11px] text-[#D4AF37] hover:underline font-semibold flex items-center"
          >
            Ver Todos
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BOT_MARKETS.map((market) => (
            <Link
              key={market.id}
              href={`/eCoinShareHolder/ecnTradingDEXBot/bot/${market.id}`}
              className="group bg-[#12181F] border border-gray-800 hover:border-[#D4AF37]/50 p-3.5 rounded-2xl transition-all active:scale-[0.98] flex flex-col justify-between relative overflow-hidden"
            >
              {market.badge && (
                <span className="absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 rounded">
                  {market.badge}
                </span>
              )}

              <div>
                <div className="text-2xl mb-2">{market.icon}</div>
                <h3 className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {market.pair}
                </h3>
                <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                  {market.description}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-800/60">
                <span className="text-[10px] font-bold text-[#00FF9C]">Criar Bot</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bots em Execução */}
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#00FF9C]/10 border border-[#00FF9C]/30 rounded-lg text-[#00FF9C]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Robôs Ativos (2)</h3>
              <p className="text-[10px] text-gray-400">Lucro Acumulado Hoje: +$6,773.00</p>
            </div>
          </div>
          <Link
            href="/eCoinShareHolder/ecnTradingDEXBot/runningBot"
            className="px-3 py-1.5 bg-[#00FF9C]/10 border border-[#00FF9C]/30 text-[#00FF9C] text-[11px] font-bold rounded-xl hover:bg-[#00FF9C]/20 transition"
          >
            Monitorar
          </Link>
        </div>

        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-ping" />
              <span className="text-xs font-extrabold text-white">E-Coin/USDT</span>
            </div>
            <span className="text-[10px] text-gray-400 block mt-0.5">Capital: $100,000 USDT</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-black text-[#00FF9C]">+$5,931.00</span>
            <span className="text-[10px] text-gray-400 block">+5.93%</span>
          </div>
        </div>
      </div>

      {/* Ações Financeiras Rápidas */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/eCoinShareHolder/ecnTradingDEXBot/profit"
          className="flex items-center gap-3 p-3 bg-[#12181F] border border-gray-800 hover:border-[#D4AF37]/30 rounded-xl transition active:scale-95"
        >
          <div className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Realized Profit</span>
            <span className="text-[10px] text-gray-400">Resgatar Lucros</span>
          </div>
        </Link>

        <Link
          href="/eCoinShareHolder/ecnTradingDEXBot/assets"
          className="flex items-center gap-3 p-3 bg-[#12181F] border border-gray-800 hover:border-[#D4AF37]/30 rounded-xl transition active:scale-95"
        >
          <div className="p-2 bg-[#00FF9C]/10 text-[#00FF9C] rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Minhas Assets</span>
            <span className="text-[10px] text-gray-400">Saldos & Deposit</span>
          </div>
        </Link>
      </div>

      {/* CTA no Rodapé */}
      <EcnTradingAICompoundingConceptCTA />
    </div>
  );
}