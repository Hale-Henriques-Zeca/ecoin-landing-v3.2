"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  RefreshCw, 
  ArrowUpDown, 
  Wallet, 
  History,
  ArrowLeftRight 
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ConverterAdminPanel from "@/components/ConverterAdminPanel";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import DesktopConversionHistory from "./DesktopConversionHistory";

interface DesktopBuyEcoinProps {
  isConnected: boolean;
  address?: string;
  disconnect: () => void;
  isOwner: boolean;
  fromToken: string;
  toToken: string;
  amount: string;
  setAmount: (val: string) => void;
  setFromToken: (token: any) => void;
  setToToken: (token: any) => void;
  invertPair: () => void;
  price: number;
  previewAmountOut: bigint;
  previewLoading: boolean;
  previewAllowed: boolean;
  calculation: { gross: number; feePercent: number; fee: number; net: number; output: number };
  handleSwap: () => void;
  txMining: boolean;
  status: string;
}

export default function DesktopBuyEcoin({
  isConnected,
  address,
  disconnect,
  isOwner,
  fromToken,
  toToken,
  amount,
  setAmount,
  invertPair,
  price,
  previewAmountOut,
  previewLoading,
  previewAllowed,
  calculation,
  handleSwap,
  txMining,
  status,
}: DesktopBuyEcoinProps) {
  const [activeTab, setActiveTab] = useState<string>("converter");

  const menuItems = [
    { id: "converter", label: "Converter / Swap", icon: ArrowLeftRight },
    { id: "historico", label: "Histórico", icon: History },
    { id: "carteira", label: "Portfolio & Ativos", icon: Wallet },
  ];

  return (
    <div translate="no" className="notranslate min-h-screen bg-[#020617] text-white pt-24 lg:pt-32 p-6 lg:p-12 font-sans selection:bg-yellow-500/30 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1a0a,transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,#0a1628,transparent)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-4 h-fit sticky top-28 gap-2">
          <div className="px-3 py-3 mb-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs shadow-inner">
              <Zap size={16} />
            </div>
            <div>
              <span className="font-black tracking-wider text-xs block">CORPORATE SWAP</span>
              <span className="text-[9px] text-gray-500 font-mono">E-COIN PROTOCOL</span>
            </div>
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-[0_4px_20px_rgba(234,179,8,0.25)] font-black" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 min-w-0 space-y-6">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/5 p-6 rounded-[28px] backdrop-blur-xl">
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tighter italic flex items-center gap-3">
                <Zap className="text-yellow-500" size={26} /> E-COIN CORPORATE SWAP TERMINAL
              </h1>
              <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">
                On-Chain Direct Liquidity Acquisition · Infinity CL Spot Price
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 px-5 py-3 rounded-2xl backdrop-blur-xl">
                <p className="text-[10px] text-yellow-500/60 uppercase tracking-widest font-mono">Live Price</p>
                <p className="text-lg font-mono font-black text-yellow-400">
                  1 E-Coin = <span className="text-white">{price > 0 ? price.toFixed(7) : "—"}</span> USDT
                </p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "converter" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[32px] backdrop-blur-xl relative">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-yellow-400">
                          <RefreshCw size={16} /> Comprar E-Coin com USDT
                        </h3>
                      </div>

                      <div className="bg-black/40 border border-yellow-500/20 rounded-2xl p-5 mb-3">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Pay with (USDT)</label>
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value.replace(",", "."))}
                          placeholder="0.000000"
                          className="w-full bg-transparent outline-none text-4xl font-mono font-black text-white placeholder:text-white/10 mt-2"
                        />
                      </div>

                      <div className="flex justify-center my-2">
                        <button onClick={invertPair} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20">
                          <ArrowUpDown size={18} />
                        </button>
                      </div>

                      <div className="bg-black/20 border border-white/5 rounded-2xl p-5">
                        <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Receive (Estimated E-Coin)</label>
                        <div className="text-4xl font-mono font-black text-green-400 mt-2">
                          {previewAmountOut > 0n ? Number(previewAmountOut) / 1e18 : "0.000000"}
                        </div>
                      </div>
                    </div>

                    {!isConnected ? (
                      <div className="flex justify-center bg-white/5 p-4 rounded-2xl border border-white/10">
                        <ConnectButton />
                      </div>
                    ) : (
                      <button
                        onClick={handleSwap}
                        disabled={!amount || txMining}
                        className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 disabled:opacity-30 cursor-pointer hover:brightness-110 transition-all"
                      >
                        {txMining ? "⛏️ A processar..." : "Comprar E-Coin Agora →"}
                      </button>
                    )}
                    {status && <p className="text-center text-xs font-mono text-yellow-400 animate-pulse">{status}</p>}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-7 rounded-[32px]">
                      <h3 className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                        <Wallet size={12} /> Wallet Node
                      </h3>
                      {isConnected ? (
                        <div className="space-y-4">
                          <p className="text-sm font-mono text-yellow-400">{address?.slice(0, 8)}…{address?.slice(-6)}</p>
                          <button onClick={disconnect} className="w-full py-2 bg-red-500/10 text-red-400 rounded-xl text-xs uppercase font-bold hover:bg-red-500/20 transition-all">Disconnect</button>
                        </div>
                      ) : (
                        <ConnectButton />
                      )}
                    </div>
                    
                  </div>
                 
                </div>
              )}

               {isConnected && isOwner && <ConverterAdminPanel />}

              {activeTab === "historico" && (
                <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6 lg:p-8 backdrop-blur-xl">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-yellow-400">
                    <History size={16} /> Histórico de Transações
                  </h3>
                  <DesktopConversionHistory history={[]} loading={false} onRefresh={() => {}} />
                </div>
              )}

              {activeTab === "carteira" && (
                <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6 lg:p-8 backdrop-blur-xl space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-yellow-400">
                    <Wallet size={16} /> Portfolio & Ativos On-Chain
                  </h3>
                  <EcoinWalletDashboard />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}