"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Wallet, ChevronRight, Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

import AIDashboardContent from "@/components/AIDashboardContent";

export default function AIDashboard() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

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
      {/* ================= NOT CONNECTED ================= */}
      {!isConnected && (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 py-20 overflow-hidden">
          
          {/* BACKGROUND IMAGE AI */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10 grayscale"
            style={{ backgroundImage: "url('/backgrounds/ai-bg.jpg')" }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />

          <div className="relative z-10 max-w-2xl w-full space-y-8">
            
            {/* TÍTULO PRINCIPAL */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black tracking-[0.3em] uppercase">
                <Cpu size={14} className="animate-pulse" /> High-Frequency AI Engine
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                E-COIN <span className="text-[#D4AF37]">WEB3 NEURAL AI</span> <br />
                TRADING ROBOT TERMINAL
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                O robô de negociação triangular de alta frequência mais rápido da Binance Spot Market, agora totalmente migrado para a infraestrutura Web3.
              </p>
            </motion.div>

{/* 🤖 BOTÃO DE ACESSO AO TERMINAL NEURAL AI */}
<div className="w-full max-w-xl mx-auto mt-10">
  <Link href="/ecnTradingAi-Robot-Profit-Flow-Info" className="group block">
    
    <motion.div 
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between bg-gradient-to-r from-[#D4AF37]/5 to-black/40 border border-[#D4AF37]/20 p-5 rounded-2xl hover:border-[#D4AF37]/60 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.05)]"
    >
      <div className="flex items-center gap-4 text-left">
        {/* Ícone de destaque */}
        <div className="bg-[#D4AF37]/10 p-3 rounded-xl border border-[#D4AF37]/20 group-hover:scale-110 transition-transform">
          <Bot size={24} className="text-[#D4AF37]" />
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-[0.2em]">
            E-COIN NEURAL TRADING AI ROBOT
          </span>
          <span className="text-sm text-white font-semibold tracking-tight">
            Descubra o poder da Arbitragem Triangular Interna
          </span>
          <span className="text-[11px] text-white/40 mt-1 italic">
            Veja como lucrar na Binance, OKX, KuCoin, Bybit, Bitget, Kraken, CoinBase, Huobi, MEXC, etc em milissegundos
          </span>
        </div>
      </div>

      <div className="bg-[#D4AF37]/10 p-3 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black group-hover:shadow-[0_0_15px_#D4AF37] transition-all">
        <ChevronRight size={20} />
      </div>
    </motion.div>

  </Link>
</div>
            {/* BOTÃO CONECTAR */}
            <div className="flex flex-col items-center gap-6">
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="group relative px-12 py-4 rounded-full font-black text-black
                    bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  >
                    CONNECT WEB3 WALLET
                  </button>
                )}
              </ConnectButton.Custom>

              {/* INFORMAÇÕES WEB3 NATIVE */}
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md text-left">
                  <p className="text-[#D4AF37] font-bold text-xs mb-2 flex items-center gap-2">
                    <ShieldCheck size={14} /> NEURAL WEB3 NATIVE ECOSYSTEM
                  </p>
                  <ul className="text-[11px] text-gray-400 space-y-2">
                    <li className="flex items-center gap-2">❌ Sem login tradicional</li>
                    <li className="flex items-center gap-2">❌ Sem e-mail ou passwords hackeáveis</li>
                    <li className="flex items-center gap-2 font-bold text-white">✅ Carteira = Tua Identidade Digital Única</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CALL TO ACTION PARA QUEM NÃO TEM CARTEIRA */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <p className="text-xs text-gray-500 italic">
                Ainda não tens uma carteira? No ecossistema E-Coin a tua segurança vem primeiro. Crie-a agora mesmo:
              </p>
              
              <Link
                href="/import-guide"
                className="
                  flex items-center justify-center gap-3
                  py-5 rounded-2xl font-black text-sm
                  bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5]
                  text-black hover:brightness-110 hover:gap-6
                  transition-all duration-300 uppercase tracking-[0.2em]
                  max-w-md mx-auto
                "
              >
                <Wallet size={18} />
                CRIAR & CONFIGURAR CARTEIRA 🔐
              </Link>

              <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                2025: Independência Financeira Eminente e permanente = (ganhando em mil segundos)🚀
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONNECTED ================= */}
      {isConnected && panelOpen && (
        <div className="pt-32 lg:pt-40 p-6 lg:p-12 max-w-[1400px] mx-auto">
          {/* WALLET INDICATOR */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono mb-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            WALLET ID: {address}
          </div>

          <AIDashboardContent address={address} />

          <div className="mt-20 text-center">
            <button
              onClick={() => {
                disconnect();
                setPanelOpen(false);
              }}
              className="px-8 py-3 rounded-xl border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              Encerrar Terminal [Disconnect]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
