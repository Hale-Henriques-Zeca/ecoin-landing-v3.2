"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { parseUnits, erc20Abi } from "viem";
import { useDisconnect, useReadContract } from "wagmi";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { formatUnits } from "ethers";

// ICONS
import { Cpu, Fuel, Wallet, Settings, ShieldAlert, Gift } from "lucide-react";
import { FaTelegramPlane, FaTelegram, FaWhatsapp, FaTwitter, FaDiscord } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

// WAGMI & WEB3
import { useAccount, useWriteContract, useSwitchChain, useChainId, usePublicClient } from "wagmi";

// ABIS & COMPONENTS
import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";
import ReferralModalContent from "@/components/ReferralModalContent";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";

// BOTS & ADMIN COMPONENTS
import ForexAI from "@/components/ai-bots/ForexAI";
import TriangularAI from "@/components/ai-bots/TriangularAI";
import CrossAI from "@/components/ai-bots/CrossAI";
import TradingGasVaultAdminPanel from "@/components/TradingGasVaultAdminPanel";


const fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export default function AIDashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // 🗂️ ESTADO GLOBAL DE ABAS (Centraliza Robôs e Utilitários)
  const [activeTab, setActiveTab] = useState<string>("forex");
  const [stakeAmount, setStakeAmount] = useState("");

  /* ================= WALLET HOOKS ================= */
  const { disconnect } = useDisconnect();
  const { balances } = useDexWallet();
  const { address } = useAccount();

  const OWNER = process.env.NEXT_PUBLIC_TRADINGGASVAULT_OWNER;
  const isOwner =
    typeof OWNER === "string" &&
    typeof address === "string" &&
    OWNER.toLowerCase() === address.toLowerCase();

  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { data: user } = useSWR(
  address
    ? `http://localhost:4000/api/user/${address}`
    : null,
  fetcher
);
  const isBotRunning = user?.botActive;

  const CONTRACT_ADDRESS = "0xcD55717633ABBa6758616949fCa54d8C41972535"; 
  const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; 
  const EUSD_ADDRESS = "0xF7543E5B4735C58a176269202847360aaDfA83C1"; 
  const gasLevel = user?.ecGas ? Math.min((user.ecGas / 100000) * 100, 100) : 0;

  const [gasToken, setGasToken] = useState<"USDT" | "EUSD">("USDT");

  const { data: usdtEnabled } = useReadContract({
    address: CONTRACTS.TRADING_GAS_VAULT,
    abi: TradingGasVaultAbi,
    functionName: "usdtEnabled",
  });

  const { data: eusdEnabled } = useReadContract({
    address: CONTRACTS.TRADING_GAS_VAULT,
    abi: TradingGasVaultAbi,
    functionName: "eusdEnabled",
  });

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!isConnected) return;
    if (chainId !== 97) switchChain({ chainId: 97 });
  }, [isConnected, chainId, switchChain]);

  const toggleBot = async () => {
    if (!address) return;
    const endpoint = user?.botActive ? "stop" : "start";
    await fetch(`http://localhost:4000/api/user/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: address })
    });
  };

  const handleDeposit = async () => {
    
    try {
      if (!stakeAmount) return alert("Enter amount");
      setLoading(true);
      const amount = parseUnits(stakeAmount, 18);
      const tokenAddress = gasToken === "USDT" ? USDT_ADDRESS : EUSD_ADDRESS;

      const allowance = await publicClient.readContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address!, CONTRACT_ADDRESS],
      });

      if (allowance < amount) {
        const approveTx = await writeContractAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [CONTRACT_ADDRESS, amount],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveTx });
      }

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: TradingGasVaultAbi,
        functionName: gasToken === "USDT" ? "depositUSDT" : "depositEUSD",
        args: [amount],
        gas: BigInt(500000),
      });
    } catch (e: any) { alert(e.message); } finally { setLoading(false); }
  };

  if (!mounted) return null;

  // Definição estruturada dos menus baseada na sua lógica de 3 formatos
  const menuItems = [
    { id: "forex", label: "Forex AI", icon: Cpu },
    { id: "triangular", label: "Triangular AI", icon: Cpu },
    { id: "cross", label: "Cross AI", icon: Cpu },
    { id: "gas", label: "Gas Vault", icon: Fuel },
    { id: "carteira", label: "Portifolio", icon: Wallet },
    ...(isOwner ? [{ id: "admin", label: "Settings", icon: Settings }] : []),
  ];

  return (
    <div className="min-h-screen bg-[#040814] text-white pt-24 pb-24 lg:pb-12 px-4 lg:px-8 font-sans selection:bg-yellow-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0f172a,transparent)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* =========================================================================
            1. NAVIGATION BAR LATERAL (DESKTOP & TABLET)
           ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#090f20] border border-white/5 rounded-3xl p-4 h-fit sticky top-28 gap-2">
          <div className="px-3 py-2 mb-4 border-b border-white/5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-xs">AI</div>
            <span className="font-black tracking-wider text-xs text-white/90">ECN TRADING CORE</span>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            // Cores estilizadas por robô/seção para luxo visual
            let activeStyle = "bg-yellow-500 text-black shadow-[0_4px_20px_rgba(234,179,8,0.25)]";
            if (item.id === "triangular") activeStyle = "bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)]";
            if (item.id === "cross") activeStyle = "bg-purple-600 text-white shadow-[0_4px_20px_rgba(147,51,234,0.25)]";
            if (item.id === "gas") activeStyle = "bg-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.25)]";
            if (item.id === "carteira") activeStyle = "bg-slate-200 text-black shadow-[0_4px_20px_rgba(255,255,255,0.1)]";
            if (item.id === "admin") activeStyle = "bg-red-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.25)]";

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  isActive ? activeStyle : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* =========================================================================
            CONTEÚDO DINÂMICO PRINCIPAL
           ========================================================================= */}
        <section className="flex-1 min-w-0">
          
          {/* HEADER PRINCIPAL */}
          <div className="mb-8 bg-[#090f20]/70 border border-white/5 rounded-3xl p-6 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter italic flex items-center gap-2">
                <Cpu className="text-[#D4AF37]" size={22} /> 
                E-COIN NEURAL TRADING AI ROBOT
              </h1>
              <p className="text-gray-500 text-[10px] uppercase font-mono tracking-widest mt-0.5">
                Hybrid Neural: Multi-Market AI Trading Robot
              </p>
            </div>
            
            {address && (
              <span className="text-[10px] font-mono text-white/50 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                Connected: {address.slice(0, 6)}…{address.slice(-4)}
              </span>
            )}
          </div>

          <BlockchainDeviceAlert />

          {/* ANIMAÇÃO E ISOLAMENTO DE PAINÉIS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              
              {/* ROBÔ 1: FOREX AI */}
              {activeTab === "forex" && (
                <ForexAI user={user} isBotRunning={isBotRunning} toggleBot={toggleBot} />
              )}

              {/* ROBÔ 2: TRIANGULAR AI */}
              {activeTab === "triangular" && (
                <TriangularAI user={user} isBotRunning={isBotRunning} toggleBot={toggleBot} />
              )}

              {/* ROBÔ 3: CROSS EXCHANGE AI */}
              {activeTab === "cross" && (
                <CrossAI />
              )}

              {/* CONTROLE COMPARTILHADO DO GAS VAULT */}
              {activeTab === "gas" && (
                <div className={`relative bg-[#090f20] border rounded-[28px] p-6 backdrop-blur-xl transition-all duration-500 ${isBotRunning ? "border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.1)]" : "border-white/5"}`}>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <Fuel size={16} /> AI TRADING GAS VAULT (USDT/eDollar ⇄ ecGas)
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    {["USDT", "EUSD"].map((tk) => (
                      <button
                        key={tk}
                        onClick={() => setGasToken(tk as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          gasToken === tk ? "bg-emerald-500 text-black" : "bg-white/5 text-white/60 border border-white/5"
                        }`}
                      >
                        {tk}
                      </button>
                    ))}

                    <div className={`ml-auto px-3 py-1 rounded-full text-[9px] font-black tracking-widest ${
                      (gasToken === "USDT" && usdtEnabled) || (gasToken === "EUSD" && eusdEnabled)
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}>
                      {(gasToken === "USDT" && usdtEnabled) || (gasToken === "EUSD" && eusdEnabled) ? "ACTIVE" : "PAUSED"}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder={`Enter ${gasToken} amount...`}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white outline-none focus:border-emerald-500/50 transition"
                    />
                    <button
                      disabled={loading || (gasToken === "USDT" && !usdtEnabled) || (gasToken === "EUSD" && !eusdEnabled)}
                      onClick={handleDeposit}
                      className={`sm:w-64 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition ${
                        (gasToken === "USDT" && !usdtEnabled) || (gasToken === "EUSD" && !eusdEnabled)
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-500 to-teal-500 text-black hover:opacity-90"
                      }`}
                    >
                      {loading ? "Processing..." : `BUY ecGas WITH ${gasToken}`}
                    </button>
                  </div>

                  {/* PROGRESSED GAS LEVEL */}
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                    <div className="flex justify-between text-[10px] text-white/40 mb-2 font-mono uppercase">
                      <span>Nível de Combustível</span>
                      <span className={gasLevel > 30 ? "text-green-400" : "text-red-400"}>{gasLevel.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden mb-2">
                      <div className={`h-full transition-all duration-700 ${gasLevel > 60 ? "bg-green-500" : gasLevel > 30 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${gasLevel}%` }} />
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-400">{(user?.ecGas ?? 0).toLocaleString()} ecGas</span>
                  </div>
                </div>
              )}

              {/* CARTEIRA / PORTFOLIO */}
              {activeTab === "carteira" && (
                <div className="bg-[#090f20] border border-white/5 rounded-[28px] p-6 backdrop-blur-xl">
                  <EcoinWalletDashboard />
                </div>
              )}

              {/* PAINEL ADMINISTRADOR */}
              {activeTab === "admin" && isOwner && (
                <TradingGasVaultAdminPanel />
              )}

            </motion.div>
          </AnimatePresence>

          {/* BOTÃO CONVIDAR E REDES SOCIAIS */}
          <div className="text-center mt-12">
            <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F] text-black font-black uppercase tracking-widest text-xs py-3.5 px-10 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              🎁 Convidar Amigos
            </button>
          </div>

          <div className="mt-16 pt-6 border-t border-white/5 flex flex-col items-center gap-3 text-[#D4AF37] text-xs">
            <p className="text-gray-500 uppercase tracking-widest font-bold text-[10px]">Comunidade E-Coin Global</p>
            <div className="flex justify-center gap-5 text-xl">
              <a href="https://t.me/ecoin2026" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaTelegramPlane /></a>
              <a href="https://x.com/CoinE28810" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaTwitter /></a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaDiscord /></a>
              <a href="https://t.me/ecoin2025" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaTelegram /></a>
              <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noopener noreferrer" className="hover:text-white transition"><FaWhatsapp /></a>
            </div>
            <BsStars className="text-2xl mt-2 animate-pulse" />
          </div>

        </section>
      </div>

      {/* =========================================================================
          2. BOTTOM NAVIGATION BAR (FLUTUANTE PARA MOBILE / SMARTPHONE)
         ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#090f20]/95 border-t border-white/10 backdrop-blur-md z-50 px-2 py-2 flex items-center justify-around">
        {menuItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          let selectColor = "text-yellow-500";
          if (item.id === "triangular") selectColor = "text-blue-500";
          if (item.id === "cross") selectColor = "text-purple-500";
          if (item.id === "gas") selectColor = "text-emerald-500";

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${isActive ? selectColor : "text-white/40"}`}
            >
              <Icon size={18} className={isActive ? "scale-110 transition-transform" : ""} />
              <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* REFERRAL MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0a0a0a] p-6 rounded-2xl border border-[#D4AF37]/30 w-full max-w-sm">
            <h3 className="text-[#D4AF37] text-md font-bold mb-4 text-center uppercase tracking-wider">Referral System</h3>
            <ReferralModalContent />
          </div>
        </div>
      )}
    </div>
  );
}