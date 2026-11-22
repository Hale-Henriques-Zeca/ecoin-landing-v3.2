'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Database, 
  Coins, 
  TrendingUp, 
  Lock, 
  Sparkles 
} from 'lucide-react';

const AI_STEPS = [
  { text: "Iniciando Núcleo IA ecnTrading...", icon: Cpu, color: "#D4AF37" },
  { text: "Conectando à BNB Smart Chain...", icon: Database, color: "#F0B90B" },
  { text: "Mapeando Liquidez eCoin & eDollar...", icon: Coins, color: "#00FF9C" },
  { text: "Sincronizando Robôs de Arbitragem...", icon: Bot, color: "#00E5FF" },
  { text: "Auditando Segurança dos Smart Contracts...", icon: ShieldCheck, color: "#FF007F" },
  { text: "Ambiente ecnTrading DEX Pronto!", icon: Sparkles, color: "#00FF9C" },
];

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simula o progresso cinemático de carregamento da IA
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + 1.5;
        // Atualiza a etapa com base no progresso
        const step = Math.min(
          Math.floor((next / 100) * AI_STEPS.length),
          AI_STEPS.length - 1
        );
        setCurrentStep(step);
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = AI_STEPS[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0B0E14] text-white p-6 overflow-hidden select-none">
      {/* Background Neon Grid / Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#00FF9C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#FF007F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header info */}
      <div className="w-full flex justify-between items-center pt-2 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF9C] animate-ping" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
            ecnTrading AI Engine
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-gray-400">
          v2.4.0 • Mainnet
        </span>
      </div>

      {/* Núcleo Orbital Cinemático Futurista */}
      <div className="relative w-72 h-72 flex items-center justify-center my-auto z-10">
        
        {/* Anel Externo 1 - Rotação Horária */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-[#D4AF37]/30"
        />

        {/* Anel Externo 2 - Rotação Anti-Horária com Brilho */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-2 rounded-full border-2 border-t-[#00FF9C] border-r-transparent border-b-[#FF007F] border-l-transparent opacity-60 blur-[1px]"
        />

        {/* Anel Intermediário Pulsação */}
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-8 rounded-full border border-[#D4AF37]/50 bg-gradient-to-tr from-[#D4AF37]/5 to-transparent"
        />

        {/* Anel de Partículas / Dotted Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-14 rounded-full border border-dotted border-cyan-500/40"
        />

        {/* Badges Flutuantes em Órbita Solnex-style */}
        
        {/* Badge 1: BLOCKCHAIN / BNB */}
        <motion.div 
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 bg-[#12181F]/90 border border-[#F0B90B]/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#F0B90B]/10 backdrop-blur-md"
        >
          <Zap className="w-3 h-3 text-[#F0B90B]" />
          <span className="text-[10px] font-black tracking-wider text-white">BNB CHAIN</span>
        </motion.div>

        {/* Badge 2: eCoin CORE */}
        <motion.div 
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -right-4 top-16 bg-[#12181F]/90 border border-[#D4AF37]/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/10 backdrop-blur-md"
        >
          <Lock className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[10px] font-black tracking-wider text-[#D4AF37]">eCoin CORE</span>
        </motion.div>

        {/* Badge 3: eDollar POOL */}
        <motion.div 
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          className="absolute -bottom-2 bg-[#12181F]/90 border border-[#00FF9C]/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#00FF9C]/10 backdrop-blur-md"
        >
          <Coins className="w-3 h-3 text-[#00FF9C]" />
          <span className="text-[10px] font-black tracking-wider text-white">eDollar POOL</span>
        </motion.div>

        {/* Badge 4: AI TRADING BOT */}
        <motion.div 
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
          className="absolute -left-4 bottom-16 bg-[#12181F]/90 border border-[#00E5FF]/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#00E5FF]/10 backdrop-blur-md"
        >
          <Bot className="w-3 h-3 text-[#00E5FF]" />
          <span className="text-[10px] font-black tracking-wider text-white">AI BOT</span>
        </motion.div>

        {/* Badge 5: ecnTrading DEX */}
        <motion.div 
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute -left-2 top-14 bg-[#12181F]/90 border border-purple-500/50 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-purple-500/10 backdrop-blur-md"
        >
          <TrendingUp className="w-3 h-3 text-purple-400" />
          <span className="text-[10px] font-black tracking-wider text-white">ecnDEX</span>
        </motion.div>

        {/* Núcleo Central Brilhante */}
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-[#18202C] to-[#0B0E14] border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
          <motion.div
            key={currentStep}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveIcon 
              className="w-8 h-8 transition-colors duration-500" 
              style={{ color: AI_STEPS[currentStep].color }} 
            />
          </motion.div>

          <span className="text-[11px] font-black mt-1 text-white font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Terminal de Diagnóstico de IA & Progresso Bottom */}
      <div className="w-full max-w-xs z-10 flex flex-col items-center">
        {/* Status Text animado */}
        <div className="h-8 mb-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-center"
            >
              <span className="text-xs font-bold text-gray-200 font-mono tracking-tight">
                {AI_STEPS[currentStep].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Barra de Progresso Neon */}
        <div className="w-full bg-[#12181F] h-2 rounded-full p-0.5 border border-gray-800 relative overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#00FF9C] to-[#00E5FF] shadow-[0_0_12px_rgba(0,255,156,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Sub-legenda de Segurança */}
        <div className="flex items-center gap-1.5 mt-4 text-[10px] text-gray-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00FF9C]" />
          <span>Protegido por Smart Contracts & Neural AI Security</span>
        </div>
      </div>
    </div>
  );
}