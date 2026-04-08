"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { Pickaxe, ShieldCheck, Wallet, Zap, ChevronRight,  Network, ArrowRightLeft,  Activity,  Cpu, Coins } from "lucide-react";
import Link from "next/link";



// O componente que você já tem com o design da imagem
import MiningPage from "@/components/MiningPage";

export default function MiningPortal() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
 

  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

   const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => prev + Math.random() * 0.002);
    }, 100); // simula milissegundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      setPanelOpen(true);
    } else {
      setPanelOpen(false);
    }
  }, [isConnected]);

  if (!mounted) return null;



  

  

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ================= ESTADO: NÃO CONECTADO ================= */}
      {!isConnected && (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 py-20 overflow-hidden">
          
          {/* FUNDO DINÂMICO DE MINERAÇÃO */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 grayscale"
            style={{ backgroundImage: "url('/backgrounds/mining-bg.jpg')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />

          <div className="relative z-10 max-w-2xl w-full space-y-8">
            
            {/* TÍTULO E BADGE */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black tracking-[0.3em] uppercase">
                <Zap size={14} className="animate-pulse" /> Protocolo de lucros & recompensas em milissegundos
              </div>
              <h1 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight">
                POUPANÇA <span className="text-[#D4AF37]">NEURAL</span> <br />
                MINING TERMINAL
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Participe na distribuição global de taxas. Minere E-Coin em tempo real através da prova de participação (Staking) no ecossistema da E-Coin Neural Web3.
              </p>
            </motion.div>

            {/* LIVE COUNTER */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 inline-block">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">
              Live Earnings Simulation
            </p>

            <motion.div
              key={earnings}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold text-[#D4AF37]"
            >
              ${earnings.toFixed(4)}
            </motion.div>
          </div>
       
      
      {/* ================= DASHBOARD ================= */}
      

        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-semibold mb-12 text-center">
            📊 Ecosystem Metrics
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              { label: "Trading Volume", value: "$1.2M+" },
              { label: "Fees Generated", value: "$18,400" },
              { label: "Mining Pool", value: "$240,000" },
              { label: "Active Miners", value: "3,842" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-black/40 border border-white/10 p-6 rounded-2xl text-center"
              >
                <p className="text-xs text-gray-400 mb-2 uppercase">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-[#D4AF37]">
                  {item.value}
                </p>
              </motion.div>
            ))}

          </div>
        </div>
     

            {/* 🚀 BOTÃO DE ACESSO AO GUIA COMPLETO */}
      <div className="w-full max-w-xl mx-auto mt-10">
  <Link href="/Savings-Rewards-Flow-Info" className="group block">
    
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex items-center justify-between bg-gradient-to-r from-black/40 to-black/20 border border-white/5 p-4 rounded-2xl hover:border-[#D4AF37]/30 transition-all cursor-pointer"
    >
      <div className="flex flex-col text-left">
        <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">
          Entenda de onde vêm os fundos pagos na poupança neural da E-Coin
        </span>
        <span className="text-xs text-[#F5F5F5] font-semibold">
          Guia Completo de mineração
        </span>
      </div>

      <div className="bg-[#D4AF37]/10 p-2 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
        <ChevronRight size={16} />
      </div>
    </motion.div>

  </Link>
</div>

            {/* ÁREA DE CONEXÃO */}
            <div className="flex flex-col items-center gap-6">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="group relative px-12 py-4 rounded-full font-black text-black
                    bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5] hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.4)]"
                  >
                    ATURIZAR MINERAÇÃO NEURAL WEB3
                  </button>
                )}
              </ConnectButton.Custom>

              {/* INFO BOX */}
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                <div className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-md text-left">
                  <p className="text-[#D4AF37] font-bold text-xs mb-3 flex items-center gap-2 uppercase tracking-widest">
                    <ShieldCheck size={16} /> Protocolo Anti-Hack
                  </p>
                  <ul className="text-[11px] text-gray-400 space-y-2.5">
                    <li className="flex items-center gap-2">✅ Custódia própria via Smart Contract</li>
                    <li className="flex items-center gap-2">✅ Lucros & Recompensas diretas na Sua Wallet</li>
                    <li className="flex items-center gap-2 font-bold text-white">✅ Ativos protegidos pela Binance Smart Chain (BNB Chain) Network</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION PARA NOVOS USUÁRIOS */}
            <div className="space-y-4 pt-8 border-t border-white/5">
              <p className="text-xs text-gray-500 italic">
                Sem carteira? Não há mineração sem segurança. Prepare o seu cofre digital aqui:
              </p>
              
              <Link
                href="/Import-E-Coin-Token"
                className="
                  flex items-center justify-center gap-3
                  py-5 rounded-2xl font-black text-sm
                  bg-white/5 border border-white/10
                  text-white hover:bg-white/10 hover:border-[#D4AF37]
                  transition-all duration-300 uppercase tracking-[0.2em]
                  max-w-md mx-auto
                "
              >
                <Wallet size={18} className="text-[#D4AF37]" />
                OBTER CARTEIRA WEB3🔐
              </Link>

              <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
                2025: Independência financeira permanente (Ganhe a cada milissegundo) 🚀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= ESTADO: CONECTADO (TERMINAL DE MINERAÇÃO) ================= */}
      {isConnected && panelOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-24 lg:pt-32 pb-20"
        >
          {/* HEADER DE STATUS DA CARTEIRA */}
          <div className="max-w-[1400px] mx-auto px-6 mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              MINERADOR ATIVO: {address?.slice(0, 10)}...{address?.slice(-8)}
            </div>
          </div>

          {/* O SEU COMPONENTE REAL DE MINERAÇÃO (DESIGN DA IMAGEM) */}
          <MiningPage />

          {/* BOTÃO DE DESCONEXÃO E SEGURANÇA */}
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                disconnect();
                setPanelOpen(false);
              }}
              className="px-8 py-3 rounded-xl border border-red-500/20 text-red-500/50 hover:text-red-500 hover:border-red-500/50 text-[10px] font-black uppercase tracking-widest transition-all"
            >
              ENCERRAR SESSÃO DE MINERAÇÃO [SAFE EXIT]
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
