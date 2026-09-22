'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Cpu, 
  Database, 
  Coins, 
  Bot, 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  Sparkles,
  Layers,
  Zap,
  ArrowRightLeft
} from 'lucide-react';

const ECOSYSTEM_STEPS = [
  { text: "Inicializando Ecossistema EdenKingDom (EKD)...", icon: Globe, color: "#D4AF37" },
  { text: "Conectando à BNB Smart Chain & Smart Contracts...", icon: Database, color: "#F0B90B" },
  { text: "Mapeando Liquidez eCoin, eDollar & EFTE DEX...", icon: Coins, color: "#00FF9C" },
  { text: "Sincronizando Robôs de IA Neural & Arbitragem...", icon: Cpu, color: "#00E5FF" },
  { text: "Carregando BuyBack Engine, Staking & Simulators...", icon: TrendingUp, color: "#A855F7" },
  { text: "Auditando Segurança dos Vaults & Cash Out Gateway...", icon: ShieldCheck, color: "#FF007F" },
  { text: "Ecossistema eCoin Geral Pronto!", icon: Sparkles, color: "#00FF9C" },
];

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simula o progresso cinemático de carregamento global do ecossistema
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 1.2;
        const step = Math.min(
          Math.floor((next / 100) * ECOSYSTEM_STEPS.length),
          ECOSYSTEM_STEPS.length - 1
        );
        setCurrentStep(step);
        return next;
      });
    }, 35);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = ECOSYSTEM_STEPS[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0B0E14] text-white p-6 overflow-hidden select-none">
      {/* Luzes do Background em Efeitos Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#00FF9C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#FF007F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header info */}
      <div className="w-full max-w-5xl flex justify-between items-center pt-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF9C] animate-ping" />
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D4AF37]">
            EdenKingDom Global Protocol
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          eCoin Ecosystem • Mainnet v3.0
        </span>
      </div>

      {/* Núcleo Orbital Cinemático Global */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center my-auto z-10">
        
        {/* Anel Externo 1 - Rotação Lenta Suave */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/30"
        />

        {/* Anel Externo 2 - Gradient Multicolor em Rotação Anti-Horária */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-t-[#00FF9C] border-r-[#00E5FF] border-b-[#FF007F] border-l-[#A855F7] opacity-50 blur-[1px]"
        />

        {/* Anel Intermediário de Pulsação de Rede */}
        <motion.div
          animate={{ scale: [0.94, 1.04, 0.94], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-10 rounded-full border border-[#D4AF37]/40 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-cyan-500/5"
        />

        {/* Anel de Pontos Futurista */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-16 rounded-full border border-dotted border-cyan-400/40"
        />

        {/* ================= BADGES FLUTUANTES DO ECOSSISTEMA GERAL ================= */}
        
        {/* 1. eCoin Core */}
        <motion.div 
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-3 bg-[#12181F]/90 border border-[#D4AF37]/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/10 backdrop-blur-md"
        >
          <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] font-black tracking-wider text-[#D4AF37]">eCoin CORE</span>
        </motion.div>

        {/* 2. BNB Smart Chain */}
        <motion.div 
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute -right-6 top-16 bg-[#12181F]/90 border border-[#F0B90B]/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#F0B90B]/10 backdrop-blur-md"
        >
          <Zap className="w-3.5 h-3.5 text-[#F0B90B]" />
          <span className="text-[10px] font-black tracking-wider text-white">BNB CHAIN</span>
        </motion.div>

        {/* 3. eDollar Liquidity Pool */}
        <motion.div 
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute -right-4 bottom-16 bg-[#12181F]/90 border border-[#00FF9C]/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#00FF9C]/10 backdrop-blur-md"
        >
          <Coins className="w-3.5 h-3.5 text-[#00FF9C]" />
          <span className="text-[10px] font-black tracking-wider text-white">eDollar POOL</span>
        </motion.div>

        {/* 4. EFTE DEX & Exchange */}
        <motion.div 
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -bottom-3 bg-[#12181F]/90 border border-[#FF007F]/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#FF007F]/10 backdrop-blur-md"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-[#FF007F]" />
          <span className="text-[10px] font-black tracking-wider text-white">EFTE DEX</span>
        </motion.div>

        {/* 5. Neural AI Arbitrage */}
        <motion.div 
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
          className="absolute -left-6 bottom-16 bg-[#12181F]/90 border border-[#00E5FF]/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#00E5FF]/10 backdrop-blur-md"
        >
          <Bot className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span className="text-[10px] font-black tracking-wider text-white">NEURAL AI</span>
        </motion.div>

        {/* 6. BuyBack Engine & Staking */}
        <motion.div 
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
          className="absolute -left-4 top-16 bg-[#12181F]/90 border border-[#A855F7]/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#A855F7]/10 backdrop-blur-md"
        >
          <Layers className="w-3.5 h-3.5 text-[#A855F7]" />
          <span className="text-[10px] font-black tracking-wider text-white">BUYBACK & VAULTS</span>
        </motion.div>

        {/* Núcleo Central Brilhante */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#18202C] via-[#0D1117] to-[#0B0E14] border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_0_35px_rgba(212,175,55,0.4)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.4, opacity: 0, rotate: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ActiveIcon 
                className="w-9 h-9 sm:w-10 sm:h-10 transition-colors duration-500" 
                style={{ color: ECOSYSTEM_STEPS[currentStep].color }} 
              />
            </motion.div>
          </AnimatePresence>

          <span className="text-xs font-black mt-1 text-white font-mono tracking-wider">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Terminal de Diagnóstico Global & Barra de Progresso Bottom */}
      <div className="w-full max-w-sm z-10 flex flex-col items-center">
        {/* Status Text Animado */}
        <div className="h-8 mb-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 text-center"
            >
              <span className="text-xs font-bold text-gray-200 font-mono tracking-tight">
                {ECOSYSTEM_STEPS[currentStep].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Barra de Progresso Neon Tri-Color */}
        <div className="w-full bg-[#12181F] h-2.5 rounded-full p-0.5 border border-white/10 relative overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#00FF9C] to-[#00E5FF] shadow-[0_0_15px_rgba(0,255,156,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Rodapé de Segurança e Copyright do Ecossistema */}
        <div className="flex items-center justify-between w-full mt-4 text-[10px] text-gray-400 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00FF9C]" />
            <span>EdenKingDom Neural Security</span>
          </div>
          <span className="text-gray-500 font-mono">EdenKingDom Group Since © 2025 to {new Date().getFullYear()} EdenKingDom Corporation — Built from Genesis, Designed for Eternity.</span>
        </div>
      </div>
    </div>
  );
}