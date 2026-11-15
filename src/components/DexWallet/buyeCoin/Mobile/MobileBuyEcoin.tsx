"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowUpDown, Wallet, History, ArrowLeftRight } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import MobileConversionHistory from "./MobileConversionHistory";

interface MobileBuyEcoinProps {
  isConnected: boolean;
  address?: string;
  disconnect: () => void;
  isOwner?: boolean;
  amount: string;
  setAmount: (val: string) => void;
  price: number;
  previewAmountOut: bigint;
  handleSwap: () => void;
  txMining: boolean;
  status: string;
  invertPair?: () => void;
}

export default function MobileBuyEcoin({
  isConnected,
  address,
  disconnect,
  amount,
  setAmount,
  price,
  previewAmountOut,
  handleSwap,
  txMining,
  status,
  invertPair,
}: MobileBuyEcoinProps) {
  const [activeTab, setActiveTab] = useState<string>("converter");

  const menuItems = [
    { id: "converter", label: "Converter", icon: ArrowLeftRight },
    { id: "historico", label: "Histórico", icon: History },
    { id: "carteira", label: "Portfolio", icon: Wallet },
  ];

  return (
    <main className="min-h-[100dvh] bg-[#020617] text-white pb-28 pt-4 px-4 relative selection:bg-yellow-500/30">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1a0a,transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,#0a1628,transparent)] pointer-events-none" />

      <div className="flex justify-between items-center mb-6 pt-2 relative z-10 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">
            <Zap size={16} />
          </div>
          <div>
            <h1 className="text-sm font-black italic tracking-wider">E-COIN SWAP</h1>
            <p className="text-[9px] text-gray-500 font-mono uppercase tracking-widest">BSC Mainnet</p>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-yellow-400">
          1 E-Coin = {price > 0 ? price.toFixed(7) : "—"} USDT
        </div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {activeTab === "converter" && (
              <div className="space-y-4">
                
                <div className="bg-white/[0.03] border border-white/10 p-5 rounded-3xl backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Pagar com USDT</label>
                    <span className="text-[10px] text-yellow-400 font-mono">Balance: —</span>
                  </div>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(",", "."))}
                    placeholder="0.00"
                    className="w-full bg-transparent text-3xl font-mono font-black mt-1 outline-none text-white placeholder:text-white/20"
                  />
                </div>

                {invertPair && (
                  <div className="flex justify-center -my-2 relative z-20">
                    <button
                      onClick={invertPair}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 active:scale-95 transition-all shadow-md"
                    >
                      <ArrowUpDown size={16} />
                    </button>
                  </div>
                )}

                <div className="bg-black/40 border border-white/5 p-5 rounded-3xl backdrop-blur-xl">
                  <label className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Receber E-Coin (Estimado)</label>
                  <div className="text-3xl font-mono font-black text-green-400 mt-2 truncate">
                    {previewAmountOut > 0n ? Number(previewAmountOut) / 1e18 : "0.000000"}
                  </div>
                </div>

                {!isConnected ? (
                  <div className="pt-2">
                    <ConnectButton.Custom>
                      {({ openConnectModal }) => (
                        <button
                          onClick={openConnectModal}
                          className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                          <Wallet size={16} /> Connect Wallet
                        </button>
                      )}
                    </ConnectButton.Custom>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleSwap}
                      disabled={!amount || txMining}
                      className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg shadow-yellow-500/20 disabled:opacity-30 active:scale-[0.98] transition-all"
                    >
                      {txMining ? "⛏️ A processar..." : "Comprar E-Coin Agora →"}
                    </button>
                    
                    <button
                      onClick={disconnect}
                      className="w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 text-red-400 active:bg-red-500/20 transition-all"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                )}

                {status && (
                  <p className="text-center text-xs font-mono text-yellow-400 animate-pulse pt-2">{status}</p>
                )}
              </div>
            )}

            {activeTab === "historico" && (
              <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-5 backdrop-blur-xl">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-yellow-400">
                  <History size={14} /> Histórico de Transações
                </h3>
                <MobileConversionHistory history={[]} loading={false} onRefresh={() => {}} />
              </div>
            )}

            {activeTab === "carteira" && (
              <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-5 backdrop-blur-xl space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-yellow-400">
                  <Wallet size={14} /> Portfolio & Ativos On-Chain
                </h3>
                <EcoinWalletDashboard />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <nav aria-label="Navegação móvel" className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0f]/95 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex items-center justify-around shadow-2xl">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? "text-[#D4AF37]" : "text-white/40 hover:text-white"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${isActive ? "bg-[#D4AF37]/15 shadow-sm shadow-[#D4AF37]/30" : ""}`}>
                <Icon size={18} />
              </div>
              <span className="text-[9px] font-bold tracking-wider uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

    </main>
  );
}