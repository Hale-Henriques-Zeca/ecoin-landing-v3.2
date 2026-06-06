"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { parseUnits, erc20Abi } from "viem";

// ICONS
import { Cpu, Fuel } from "lucide-react";
import { FaTelegramPlane, FaTelegram, FaWhatsapp, FaTwitter, FaDiscord } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

// WAGMI & WEB3
import { useAccount, useWriteContract, useSwitchChain, useChainId, usePublicClient } from "wagmi";

// ABIS & COMPONENTS
import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";
import ReferralModalContent from "@/components/ReferralModalContent";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";

// NOSSOS NOVOS COMPONENTES (Certifica-te de que o caminho de importação está correto)
import ForexAI from "@/components/ai-bots/ForexAI";
import TriangularAI from "@/components/ai-bots/TriangularAI";
import CrossAI from "@/components/ai-bots/CrossAI";

export default function AIDashboardContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // MODO COM 3 TABS AGORA
  const [mode, setMode] = useState<"forex" | "triangular" | "cross">("forex");
  const [stakeAmount, setStakeAmount] = useState("");

  const { isConnected, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const { data: user } = useSWR(address ? `http://localhost:4000/api/user/${address}` : null);
  const isBotRunning = user?.botActive;

  const CONTRACT_ADDRESS = "0x4642d050F13633D36C6dD2aCF6e68573eBE9AB84"; 
  const USDT_ADDRESS = "0x07E7DC0b28448F67C3c349C8A83C5165dB8A29E6"; 
  const gasLevel = user?.ecGas ? Math.min((user.ecGas / 100000) * 100, 100) : 0;

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
    if (chainId !== 97) return alert("⚠️ Switch to BSC Testnet");
    try {
      if (!stakeAmount) return alert("Enter amount");
      setLoading(true);
      const amount = parseUnits(stakeAmount, 18);

      const allowance = await publicClient.readContract({
        address: USDT_ADDRESS, abi: erc20Abi, functionName: "allowance", args: [address!, CONTRACT_ADDRESS],
      });

      if (allowance < amount) {
        const approveTx = await writeContractAsync({
          address: USDT_ADDRESS, abi: erc20Abi, functionName: "approve", args: [CONTRACT_ADDRESS, amount],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveTx });
      }

      await writeContractAsync({
        address: CONTRACT_ADDRESS, abi: TradingGasVaultAbi, functionName: "deposit", args: [amount], gas: BigInt(500000),
      });
    } catch (e: any) { alert(e.message); } finally { setLoading(false); }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 lg:pt-40 p-6 lg:p-12 font-sans selection:bg-yellow-500/30">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER & SWITCH DE TABS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic flex items-center gap-3">
              <Cpu className="text-[#D4AF37]" /> 
              E-COIN NEURAL TRADING AI ROBOT 
              <span className="text-[#D4AF37]">(ecnTrading)</span>
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-1">
              Hybrid Neural: Multi-Market AI Trading Robot
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 p-1.5 rounded-2xl flex gap-1 backdrop-blur-xl overflow-x-auto w-full lg:w-auto">
            <button 
              onClick={() => setMode("forex")}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${mode === "forex" ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "text-gray-500 hover:text-white"}`}
            >
              FOREX AI
            </button>
            <button 
              onClick={() => setMode("triangular")}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${mode === "triangular" ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" : "text-gray-500 hover:text-white"}`}
            >
              TRIANGULAR AI
            </button>
            <button 
              onClick={() => setMode("cross")}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${mode === "cross" ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]" : "text-gray-500 hover:text-white"}`}
            >
              CROSS EXCHANGE AI 
            </button>
          </div>
        </div>

        {/* RENDERIZAÇÃO DO COMPONENTE ESCOLHIDO */}
        <div className="mb-12">
          {mode === "forex" && <ForexAI user={user} isBotRunning={isBotRunning} toggleBot={toggleBot} />}
          {mode === "triangular" && <TriangularAI user={user} isBotRunning={isBotRunning} toggleBot={toggleBot} />}
          {mode === "cross" && <CrossAI />}
        </div>


        {/* ================= GAS VAULT E PORTFOLIO (SHARED) ================= */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 mt-16">
          <BlockchainDeviceAlert />

          {/* GAS CONTROL */}
          <div className={`relative bg-[#0f172a]/80 border rounded-[28px] p-6 backdrop-blur-xl transition-all duration-500 ${isBotRunning ? "border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)]" : "border-white/10"}`}>
            {isBotRunning && <div className="absolute inset-0 rounded-[28px] bg-emerald-500/5 blur-xl animate-pulse pointer-events-none" />}

            <div className="flex items-center justify-between mb-6 relative z-10">
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Fuel size={16} /> GLOBAL GAS VAULT (USDT ⇄ ecGas)
              </p>
              {address && (
                <span className="text-[10px] font-mono text-white/40 bg-black/50 px-3 py-1 rounded-full border border-white/5">
                  {address.slice(0, 6)}…{address.slice(-4)}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 relative z-10 mb-6">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="Enter USDT amount..."
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-lg text-white outline-none font-mono focus:border-[#D4AF37]/50 transition"
              />
              <button disabled={loading} onClick={handleDeposit} className="md:w-64 py-4 rounded-xl font-black bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F] text-black shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.02] transition">
                {loading ? "Processing..." : "DEPOSIT (USDT → GAS)"}
              </button>
            </div>

            {/* GAS BAR LEVEL */}
            <div className="relative z-10 bg-black/20 p-5 rounded-2xl border border-white/5">
              <div className="flex justify-between text-[10px] text-white/40 mb-2 font-mono uppercase font-bold">
                <span>Current Gas Level</span>
                <span className={gasLevel > 30 ? "text-green-400" : "text-red-400"}>{gasLevel.toFixed(0)}%</span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden mb-3">
                <div className={`h-full transition-all duration-700 ${gasLevel > 60 ? "bg-green-500" : gasLevel > 30 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${gasLevel}%` }} />
              </div>
              <div className="flex justify-between text-sm font-mono font-bold">
                <span className="text-blue-400">{(user?.ecGas ?? 0).toLocaleString()} ecGas</span>
                <span className="text-green-400">{((user?.ecGas ?? 0) / 1000).toFixed(2)} USDT</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-xl">
            <EcoinWalletDashboard />
          </div>
        </motion.div>

        {/* MODAL & FOOTER */}
        <div className="text-center mt-16">
          <button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F] text-black font-black uppercase tracking-widest text-sm py-4 px-12 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform">
            🎁 Convidar Amigos
          </button>
        </div>

        {showModal && (
          <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div onClick={(e) => e.stopPropagation()} className="bg-[#0a0a0a] p-8 rounded-3xl border border-[#D4AF37]/30 w-full max-w-md shadow-2xl">
              <h3 className="text-[#D4AF37] text-xl font-bold mb-6 text-center">Referral System Dashboard</h3>
              <ReferralModalContent />
            </div>
          </div>
        )}
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center gap-4 text-[#D4AF37]">
          <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Comunidade E-Coin Global</p>
          <div className="flex justify-center gap-6 text-2xl">
            <a href="https://t.me/ecoin2026" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition"><FaTelegramPlane /></a>
            <a href="https://x.com/CoinE28810" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition"><FaTwitter /></a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition"><FaDiscord /></a>
            <a href="https://t.me/ecoin2025" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition"><FaTelegram /></a>
            <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition"><FaWhatsapp /></a>
          </div>
          <BsStars className="text-3xl mt-4 animate-pulse text-[#D4AF37]" />
        </motion.div>
    
      </div>
    </div>
  );
}