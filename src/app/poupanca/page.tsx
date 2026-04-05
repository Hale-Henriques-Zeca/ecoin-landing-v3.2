"use client";


import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, BarChart3, Wallet, 
  ArrowUpRight, RefreshCw, Settings, Database, 
   Activity, Play, Square, Fuel
} from "lucide-react";

import {
  FaTelegramPlane,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { BsStars } from "react-icons/bs";
import { Snowfall } from "react-snowfall";
import ReferralModalContent from "@/components/ReferralModalContent";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "viem";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

import { useState, useEffect } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Coins, 
  ArrowUpCircle, 
  ArrowDownCircle,
  Gift,
  AlertCircle
} from "lucide-react";


// Componente de Card de Estatística
const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl flex items-center gap-4 hover:border-[#D4AF37]/30 transition-all">
    <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs text-white/50 uppercase tracking-widest">{label}</p>
      <p className="text-xl font-black text-white">{value}</p>
    </div>
  </div>
);

export default function MiningPage() {

  const { isConnected, address } = useAccount();
      const { disconnect } = useDisconnect();
    
      const TRADINGGASVAULT_OWNER =
      process.env.NEXT_PUBLIC_TRADINGGASVAULT_OWNER?.toLowerCase();
    
    
      /* 🔐 WALLET */
      const [panelOpen, setPanelOpen] = useState(false);
    
    
       const [showModal, setShowModal] = useState(false);
      const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };
    
      /* ⛔ HYDRATION */
      const [mounted, setMounted] = useState(false);



  const [amount, setAmount] = useState("");
  const [isMining, setIsMining] = useState(false);

  // Simulação de dados do contrato
  const stats = {
    totalStaked: "1,250,000 E-COIN",
    myStake: "15,400 E-COIN",
    pendingRewards: "124.55 E-COIN",
    totalStakers: "842",
    apy: "24.5% dia"
  };

  // quando a wallet conectar, abre o painel automaticamente
  useEffect(() => {
    if (isConnected) {
      setPanelOpen(true);
    } else {
      setPanelOpen(false);
    }
  }, [isConnected]);
  
  
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null;
  
    const isOwner =
    isConnected &&
    address &&
    TRADINGGASVAULT_OWNER &&
    address.toLowerCase() === TRADINGGASVAULT_OWNER;

  return (
    <main className="min-h-screen bg-black pt-24 pb-12 px-6">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER DA PÁGINA */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
              POUPANÇA <span className="text-[#D4AF37]">NEURAL</span>
            </h1>
            <p className="text-white/60 max-w-xl">
              Mineração contínua via Staking. Deposite seus tokens E-Coin e receba recompensas geradas pelo ecossistema Web3 em tempo real.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#D4AF37] uppercase font-bold">Contrato Ativo: v2.0.19</span>
          </div>
        </div>

        {/* GRID DE ESTATÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total em Stake" value={stats.totalStaked} icon={ShieldCheck} color="[#D4AF37]" />
          <StatCard label="Mineradores Ativos" value={stats.totalStakers} icon={TrendingUp} color="emerald-400" />
          <StatCard label="Meu Depósito" value={stats.myStake} icon={Coins} color="blue-400" />
          <StatCard label="Ganhos Estimados" value={stats.apy} icon={Zap} color="orange-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PAINEL DE AÇÃO (STAKE/UNSTAKE) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ArrowUpCircle size={120} className="text-[#D4AF37]" />
              </div>

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap size={20} className="text-[#D4AF37]" /> Gerenciar Mineração
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Quantia para Stake</label>
                  <div className="relative">
                    <input 
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl font-bold focus:outline-none focus:border-[#D4AF37]/50 transition-all"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-[#D4AF37] text-black px-3 py-1 rounded-md hover:bg-white transition-all">
                      MÁX
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-white text-black font-black py-4 rounded-2xl transition-all uppercase text-sm tracking-widest">
                    <ArrowUpCircle size={18} /> Stake
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-4 rounded-2xl transition-all uppercase text-sm tracking-widest">
                    <ArrowDownCircle size={18} /> Unstake
                  </button>
                </div>
                
                <p className="text-[10px] text-center text-white/30 italic">
                  * Tempo mínimo de permanência: 5 minutos (MIN_STAKE_TIME).
                </p>
              </div>
            </div>

            {/* INFORMAÇÕES DO CONTRATO */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 flex gap-4">
              <AlertCircle className="text-blue-400 shrink-0" />
              <div className="text-xs text-blue-100/70 leading-relaxed">
                <strong className="text-blue-400 block mb-1 uppercase tracking-tighter">Regras de Mineração</strong>
                O contrato utiliza o algoritmo de 1e24 (scaled) para distribuição contínua. As recompensas são injetadas por injetores autorizados e distribuídas proporcionalmente ao seu stake.
              </div>
            </div>
          </div>

          {/* PAINEL DE RECOMPENSAS (CLAIM) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Gift size={20} className="text-[#D4AF37]" /> Recompensas da Mineração
                  </h2>
                  <Clock size={16} className="text-white/30" />
                </div>

                <div className="text-center py-10 border-y border-white/5 mb-8">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">Disponível para Saque</span>
                  <div className="text-5xl font-black text-[#D4AF37] mb-1">{stats.pendingRewards}</div>
                  <span className="text-xs font-mono text-white/20">E-COIN TOKEN</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-white text-black font-black py-5 rounded-2xl transition-all uppercase text-sm tracking-[0.2em] hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  RECOLHER LUCROS
                </button>
                <div className="flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase font-bold">
                  <span>Cooldown: 10 Minutos</span>
                </div>
              </div>
            </div>
          </div>

        
        </div>
        {/* INVITE */}
                    <div className="text-center mt-16">
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black font-bold py-3 px-10 rounded-full"
                      >
                        🎁 Convidar Amigos
                      </button>
                    </div>
              
                    {showModal && (
                      <div
                        onClick={() => setShowModal(false)}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                      >
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#0a0a0a] p-8 rounded-2xl border border-[#00FF9C]/30 w-[360px]"
                        >
                          <h3 className="text-[#00FF9C] text-xl mb-4">
                            Referral System Dashboard
                          </h3>
              
                          <ReferralModalContent />
                        </div>
                      </div>
                    )}
        
                   {/* 🌐 FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
         className="mt-12 flex flex-col items-center gap-3 text-[#D4AF37]"
        >
          <p className="text-sm mb-3 text-gray-400">
             Conecte-se à comunidade E-Coin
          </p>
        
          <div className="flex justify-center gap-5 text-2xl">
                    <a href="https://t.me/ecoin2026" target="_blank" rel="noopener noreferrer">
                      <FaTelegramPlane />
                    </a>
                    <a href="https://x.com/CoinE28810" target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                      <FaDiscord />
                    </a>
                    <a href="https://t.me/ecoin2025" target="_blank" rel="noopener noreferrer">
                      <FaTelegram />
                    </a>
                    <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                    </a>
                  </div>
        
          <BsStars className="text-3xl mt-5 animate-pulse text-[#D4AF37]" />
        </motion.div>
      </div>
    </main>
  );
}
