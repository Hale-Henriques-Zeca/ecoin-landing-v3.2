"use client";

import React, { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { Pickaxe, TrendingUp, Fuel, Users, ShieldCheck, Wallet, LogIn, LogOut, Zap, ChevronRight,  Network, ArrowRightLeft,  Activity,  Cpu, Coins } from "lucide-react";
import Link from "next/link";
// Wagmi & Contracts
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";

// Contexts & Hooks
import { useDexWallet } from "@/contexts/DexWalletContext";
import { useTransactionState } from "@/hooks/useTransactionState";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useEcGas } from "@/hooks/useEcGas";
import { useRewardStreaming } from "@/hooks/useRewardStreaming";
import { useOverflowAnalytics } from "@/hooks/useOverflowAnalytics";
import { useMiningFeeCollector } from "@/hooks/useMiningFeeCollector";



// O componente com o design da pagina de mining
import MiningPage from "@/components/MiningPage";


// =========================================================================
// 📊 COMPONENTE STATCARD PARA MÉTRICAS DO ECOSSISTEMA (PREMIUM DESIGN)
// =========================================================================
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color?: "green" | "blue" | "gold" | "purple";
}

function StatCard({ label, value, icon: Icon, color = "gold" }: StatCardProps) {
  const colorMap = {
    green: { 
      text: "text-emerald-400", 
      bgGlow: "from-emerald-500/10", 
      iconBg: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20", 
      hoverBorder: "hover:border-emerald-500/40", 
      shadow: "hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)]" 
    },
    blue: { 
      text: "text-cyan-400", 
      bgGlow: "from-cyan-500/10", 
      iconBg: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20", 
      hoverBorder: "hover:border-cyan-500/40", 
      shadow: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]" 
    },
    gold: { 
      text: "text-[#D4AF37]", 
      bgGlow: "from-[#D4AF37]/10", 
      iconBg: "from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/20", 
      hoverBorder: "hover:border-[#D4AF37]/40", 
      shadow: "hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]" 
    },
    purple: { 
      text: "text-fuchsia-400", 
      bgGlow: "from-fuchsia-500/10", 
      iconBg: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/20", 
      hoverBorder: "hover:border-fuchsia-500/40", 
      shadow: "hover:shadow-[0_15px_40px_rgba(217,70,239,0.15)]" 
    },
  };

  const currentTheme = colorMap[color];

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090b]/60 backdrop-blur-xl p-6 w-full min-h-[160px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.04] ${currentTheme.hoverBorder} ${currentTheme.shadow}`}>
      {/* Efeito de iluminação de fundo */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bgGlow} via-transparent to-transparent pointer-events-none`} />
      
      <div className="relative z-10 h-full flex flex-col justify-between text-left">
        <div className="flex items-center justify-between mb-4">
          {/* Ícone com Grid Premium */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentTheme.iconBg} flex items-center justify-center border`}>
            <Icon size={20} className={currentTheme.text} />
          </div>
          {/* Ponto Verde de Live / Conectado */}
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
        </div>
        
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">{label}</p>
          <h2 className={`text-xl md:text-2xl font-black tracking-tight font-mono ${currentTheme.text}`}>{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default function MiningPortal() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
 

  const [mounted, setMounted] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

   const [earnings, setEarnings] = useState(0);

     
     const MINING_OWNER = process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();
     const { data: hash, isPending } = useWriteContract();
     const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });
     const feeCollector = useMiningFeeCollector();
     const { switchChain } = useSwitchChain();
     const chainId = useChainId();
   
     // 🗂️ ESTADO DE NAVEGAÇÃO POR ÍCONES (Tab Ativa)
     const [activeTab, setActiveTab] = useState<string>("minacao");
     const [showModal, setShowModal] = useState(false);
     const overflow = useOverflowAnalytics();
     const [gasToken, setGasToken] = useState<"USDT" | "EUSD">("USDT");
   
     const mining = useMiningStaking();
   

   
     const { data: usdtEnabled } = useReadContract({
     address: CONTRACTS.ECGAS_SALE,
     abi: ecGasSaleAbi,
     functionName: "usdtEnabled"
   });
   
   const { data: eusdEnabled } = useReadContract({
     address: CONTRACTS.ECGAS_SALE,
     abi: ecGasSaleAbi,
     functionName: "eusdEnabled"
   });
   
   
     const isOwner = isConnected && address && MINING_OWNER && address.toLowerCase() === MINING_OWNER;
       
     useEffect(() => {
       if (!isConnected) return;
       if (chainId !== 56) { switchChain({ chainId: 56 }); }
     }, [isConnected, chainId]);
   
     const depositTx = useTransactionState();
     const claimTx = useTransactionState();
     const gasTx = useTransactionState();
   
     useEffect(() => { if (mining.stakePending) { depositTx.setState("confirming"); } }, [mining.stakePending]);
     useEffect(() => { if (mining.stakeConfirmed) { depositTx.setState("success"); setTimeout(() => { depositTx.setState("idle"); }, 2000); } }, [mining.stakeConfirmed]);
     useEffect(() => { if (mining.claimConfirmed) { claimTx.setState("success"); setTimeout(() => { claimTx.setState("idle"); }, 2000); } }, [mining.claimConfirmed]);



    const { data: totalStaked } = useReadContract({ abi: miningStakingAbi, address: CONTRACTS.MINING_STAKING, functionName: "totalStaked", chainId: 56 });
    const { data: totalStakers } = useReadContract({ abi: miningStakingAbi, address: CONTRACTS.MINING_STAKING, functionName: "totalStakers", chainId: 56 });
    const { data: pending } = useReadContract({ abi: miningStakingAbi, address: CONTRACTS.MINING_STAKING, functionName: "pendingRewards", chainId: 56, args: address ? [address] : undefined });
  
    const streaming = useRewardStreaming(address);
  
    const stats = {
      totalStaked: `${mining.total} eCoin`,
      myStake: `${mining.userStake} eCoin`,
      pendingUSDT: `${streaming.visualUSDT.toFixed(6)} USDT`,
      pendingEUSD: `${streaming.visualEUSD.toFixed(6)} eUSD`,
      totalStakers: mining.totalStakers.toString(),
      share: `${mining.share.toFixed(8)}%`,
    };

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
                Participe na distribuição global de taxas. Minere USDT e eDollar em tempo real através da prova de participação (Staking de eCoin) no ecossistema da E-Coin Neural Web3.
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
       
      
      {/* ================= DASHBOARD EXOSYSTEM METRICS CONNECTED ================= */}
<div className="max-w-5xl mx-auto mt-12">
  <h2 className="text-3xl font-black mb-12 text-center tracking-tight">
    📊 Ecosystem <span className="text-[#D4AF37]">Metrics</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { 
        label: "Trading Volume", 
        value: `$${(Number(mining.total) * 5.2).toLocaleString('en-US', { maximumFractionDigits: 2 })}+`, 
        icon: TrendingUp,
        color: "gold" as const
      },
      { 
        label: "Fees Generated", 
        value: `$${(overflow.totalUSDT + overflow.totalEUSD + 18400).toLocaleString('en-US', { maximumFractionDigits: 2 })}`, 
        icon: Fuel,
        color: "purple" as const
      },
      { 
        label: "Global Deposits", 
        value: stats.totalStaked, 
        icon: ShieldCheck,
        color: "green" as const
      },
      { 
        label: "Active Miners", 
        value: Number(stats.totalStakers).toLocaleString('en-US'), 
        icon: Users,
        color: "blue" as const
      },
    ].map((item, i) => (
      <StatCard
        key={`ecosystem-metric-${i}`}
        label={item.label}
        value={item.value}
        icon={item.icon}
        color={item.color}
      />
    ))}
  </div>
</div>
     

            {/* 🚀 BOTÃO DE ACESSO AO GUIA COMPLETO */}
      <div className="w-full max-w-xl mx-auto mt-10">
  <Link href="/ecoin-buyback-engine" className="group block">
    
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
        className="group relative px-8 py-4 rounded-xl font-bold text-[#D4AF37] 
                   bg-zinc-950 border border-[#D4AF37]/30 hover:border-[#D4AF37]
                   transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]
                   hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-[1.02]
                   flex items-center gap-3 overflow-hidden"
      >
        {/* Efeito de brilho sutil ao passar o mouse */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/10 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        {/* Ícone */}
        <div className="bg-[#D4AF37]/10 p-1.5 rounded-lg border border-[#D4AF37]/20">
           <LogIn size={20} className="text-[#D4AF37]" />
        </div>

        {/* Texto do Botão */}
        <span className="tracking-[0.2em] uppercase text-sm">
          Login
        </span>
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

          {/* BOTÃO DE DESCONEXÃO E SEGURANÇA [LOG OUT PREMIUM] */}
<div className="mt-16 text-center flex flex-col items-center justify-center">
  <button
    onClick={() => {
      disconnect();
      setPanelOpen(false);
    }}
    className="group relative px-8 py-4 rounded-xl font-bold text-red-400 
               bg-zinc-950 border border-red-500/20 hover:border-red-500
               transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.05)]
               hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:scale-[1.02]
               flex items-center gap-3 overflow-hidden"
  >
    {/* Efeito de brilho sutil vermelho ao passar o mouse */}
    <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    
    {/* Ícone de Saída (LogOut do lucide-react) */}
    <div className="bg-red-500/10 p-1.5 rounded-lg border border-red-500/20">
       <LogOut size={20} className="text-red-400" />
    </div>

    {/* Texto do Botão */}
    <span className="tracking-[0.2em] uppercase text-sm">
      Log Out
    </span>
  </button>
</div>
        </motion.div>
      )}
    </div>
  );
}
