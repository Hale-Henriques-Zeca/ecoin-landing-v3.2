"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Wallet,
  History,
  ArrowLeftRight,
  ExternalLink,
  Wrench,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Coins,
  DollarSign,
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
  calculation: {
    gross: number;
    feePercent: number;
    fee: number;
    net: number;
    output: number;
  };
  handleSwap: () => void;
  txMining: boolean;
  status: string;
}

const PANCAKESWAP_SELL_URL =
  "https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964";

export default function DesktopBuyEcoin({
  isConnected,
  address,
  disconnect,
  isOwner,
  amount,
  setAmount,
  price,
  previewAmountOut,
  previewLoading,
  calculation,
  handleSwap,
  txMining,
  status,
}: DesktopBuyEcoinProps) {
  const [activeTab, setActiveTab] = useState<string>("converter");
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");

  const menuItems = [
    { id: "converter", label: "Converter / Swap", icon: ArrowLeftRight },
    { id: "historico", label: "Histórico", icon: History },
    { id: "carteira", label: "Portfolio & Ativos", icon: Wallet },
  ];

  const estimatedEcoinOut =
    previewAmountOut > 0n
      ? (Number(previewAmountOut) / 1e18).toLocaleString("en-US", {
          maximumFractionDigits: 4,
        })
      : calculation.output > 0
      ? calculation.output.toLocaleString("en-US", {
          maximumFractionDigits: 4,
        })
      : "0.00";

  return (
    <div
      translate="no"
      className="notranslate min-h-screen bg-[#020617] text-white pt-24 lg:pt-32 p-6 lg:p-12 font-sans selection:bg-yellow-500/30 relative overflow-x-hidden"
    >
      {/* Ambient Background Glows */}
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
              <span className="font-black tracking-wider text-xs block">
                CORPORATE SWAP
              </span>
              <span className="text-[9px] text-gray-500 font-mono">
                E-COIN PROTOCOL
              </span>
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
          {/* HEADER TERMINAL */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/5 p-6 rounded-[28px] backdrop-blur-xl"
          >
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tighter italic flex items-center gap-3">
                <Zap className="text-yellow-500" size={26} /> E-COIN CORPORATE
                SWAP TERMINAL
              </h1>
              <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mt-1">
                On-Chain Direct Liquidity Acquisition · Infinity CL Spot Price
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500/10 border border-yellow-500/30 px-5 py-3 rounded-2xl backdrop-blur-xl">
                <p className="text-[10px] text-yellow-500/60 uppercase tracking-widest font-mono">
                  Live Price
                </p>
                <p className="text-lg font-mono font-black text-yellow-400">
                  1 E-Coin ={" "}
                  <span className="text-white">
                    {price > 0 ? price.toFixed(7) : "—"}
                  </span>{" "}
                  USDT
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
                  {/* COLUNA ESQUERDA: CARD PRINCIPAL BUY / SELL */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-[32px] overflow-hidden border border-white/10 bg-[#0b0e14]/90 backdrop-blur-2xl shadow-2xl">
                      {/* SWITCH SUPERIOR ESTILO EXCHANGE (BUY VERDE / SELL VERMELHO) */}
                      <div className="grid grid-cols-2 bg-black/50 relative border-b border-white/5">
                        {/* TAB BUY */}
                        <button
                          type="button"
                          onClick={() => setTradeMode("buy")}
                          className={`relative py-5 px-6 flex items-center justify-center gap-2.5 text-base font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                            tradeMode === "buy"
                              ? "bg-gradient-to-b from-emerald-500/20 to-[#0b0e14] text-emerald-400 shadow-[inset_0_2px_0_0_#10b981]"
                              : "text-white/35 hover:text-white/60 bg-white/[0.01]"
                          }`}
                        >
                          <TrendingUp
                            size={18}
                            className={
                              tradeMode === "buy"
                                ? "text-emerald-400"
                                : "text-white/30"
                            }
                          />
                          <span>Buy</span>
                          {tradeMode === "buy" && (
                            <motion.div
                              layoutId="activeTradeIndicator"
                              className="absolute bottom-0 left-6 right-6 h-[2px] bg-emerald-400 rounded-full shadow-[0_0_12px_#10b981]"
                            />
                          )}
                        </button>

                        {/* TAB SELL */}
                        <button
                          type="button"
                          onClick={() => setTradeMode("sell")}
                          className={`relative py-5 px-6 flex items-center justify-center gap-2.5 text-base font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border-l border-white/5 ${
                            tradeMode === "sell"
                              ? "bg-gradient-to-b from-rose-500/20 to-[#0b0e14] text-rose-400 shadow-[inset_0_2px_0_0_#f43f5e]"
                              : "text-white/35 hover:text-white/60 bg-white/[0.01]"
                          }`}
                        >
                          <TrendingDown
                            size={18}
                            className={
                              tradeMode === "sell"
                                ? "text-rose-400"
                                : "text-white/30"
                            }
                          />
                          <span>Sell</span>
                          {tradeMode === "sell" && (
                            <motion.div
                              layoutId="activeTradeIndicator"
                              className="absolute bottom-0 left-6 right-6 h-[2px] bg-rose-500 rounded-full shadow-[0_0_12px_#f43f5e]"
                            />
                          )}
                        </button>
                      </div>

                      {/* CORPO DO CONVERSOR */}
                      <div className="p-8">
                        <AnimatePresence mode="wait">
                          {tradeMode === "buy" ? (
                            /* ==================== INTERFACE BUY (USDT -> E-COIN) ==================== */
                            <motion.div
                              key="buy-panel"
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 12 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-5"
                            >
                              {/* BOX 1: SPEND (USDT) */}
                              <div className="bg-black/40 border border-white/10 focus-within:border-emerald-500/50 rounded-2xl p-5 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                                    Spend · Pagar com
                                  </span>
                                  <div className="flex items-center gap-2">
                                    {[10, 50, 100, 500].map((preset) => (
                                      <button
                                        key={preset}
                                        type="button"
                                        onClick={() =>
                                          setAmount(String(preset))
                                        }
                                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-[11px] font-mono text-white/60 hover:text-emerald-300 transition-colors cursor-pointer"
                                      >
                                        ${preset}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                  <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) =>
                                      setAmount(
                                        e.target.value.replace(",", ".")
                                      )
                                    }
                                    placeholder="0.00"
                                    className="w-full bg-transparent outline-none text-3xl lg:text-4xl font-mono font-black text-white placeholder:text-white/15"
                                  />

                                  {/* BADGE MOEDA USDT */}
                                  <div className="shrink-0 flex items-center gap-2.5 bg-white/[0.06] border border-white/10 px-4 py-2.5 rounded-2xl">
                                    <div className="w-7 h-7 rounded-full bg-[#26A17B] flex items-center justify-center text-white shadow-md">
                                      <DollarSign size={16} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-left">
                                      <span className="block text-sm font-black tracking-wide text-white leading-none">
                                        USDT
                                      </span>
                                      <span className="block text-[9px] font-mono text-white/40 mt-0.5">
                                        BEP-20
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* BOX 2: RECEIVE (E-COIN) */}
                              <div className="bg-black/30 border border-white/5 rounded-2xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                                    Receive ≈ · Você recebe
                                  </span>
                                  {previewLoading && (
                                    <span className="text-[10px] font-mono text-emerald-400 animate-pulse">
                                      Cotando pool...
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                  <div className="text-3xl lg:text-4xl font-mono font-black text-emerald-400 truncate">
                                    {estimatedEcoinOut}
                                  </div>

                                  {/* BADGE MOEDA E-COIN */}
                                  <div className="shrink-0 flex items-center gap-2.5 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2.5 rounded-2xl">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-black shadow-md">
                                      <Coins size={15} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-left">
                                      <span className="block text-sm font-black tracking-wide text-yellow-400 leading-none">
                                        E-Coin
                                      </span>
                                      <span className="block text-[9px] font-mono text-yellow-500/60 mt-0.5">
                                        BSC
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* TAXA DE CONVERSÃO */}
                              <div className="flex items-center justify-between px-2 text-xs font-mono text-white/45">
                                <span>
                                  1 E-Coin ≈{" "}
                                  {price > 0 ? price.toFixed(7) : "—"} USDT
                                </span>
                                {calculation.feePercent <= 0 && (
                                  <span>
                                    Taxa do Protocolo:{" "}
                                    {calculation.feePercent}%
                                  </span>
                                )}
                              </div>

                              {/* BOTÃO DE COMPRA */}
                              <div className="pt-2">
                                {!isConnected ? (
                                  <div className="flex justify-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <ConnectButton />
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={handleSwap}
                                    disabled={!amount || Number(amount) <= 0 || txMining}
                                    className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-600 text-black shadow-lg shadow-emerald-500/20 disabled:opacity-30 cursor-pointer hover:brightness-110 transition-all"
                                  >
                                    {txMining
                                      ? "⛏️ A processar compra..."
                                      : "Comprar E-Coin com USDT →"}
                                  </button>
                                )}
                              </div>

                              {status && (
                                <p className="text-center text-xs font-mono text-yellow-400 animate-pulse pt-1">
                                  {status}
                                </p>
                              )}
                            </motion.div>
                          ) : (
                            /* ==================== INTERFACE SELL (E-COIN -> USDT) ==================== */
                            <motion.div
                              key="sell-panel"
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -12 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-5"
                            >
                              {/* BANNER DE AVISO: EM DESENVOLVIMENTO */}
                              <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                                  <Wrench size={18} />
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                                      Módulo de Venda Direta em Desenvolvimento
                                    </span>
                                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                      Em Breve
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/75 leading-relaxed">
                                    Por questões de rapidez e liquidez imediata,
                                    você pode vender os seus{" "}
                                    <strong className="text-white">
                                      E-Coins
                                    </strong>{" "}
                                    agora mesmo dentro da sua própria carteira
                                    Web3 ou diretamente no mercado DEX via{" "}
                                    <strong className="text-rose-300">
                                      PancakeSwap
                                    </strong>{" "}
                                    — basta conectar a sua carteira e confirmar
                                    o swap.
                                  </p>
                                </div>
                              </div>

                              {/* PREVIEW INVERSO: SPEND E-COIN -> RECEIVE USDT */}
                              <div className="space-y-3 opacity-85">
                                {/* BOX 1: SPEND (E-COIN) */}
                                <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                                      Spend · Vender
                                    </span>
                                    <span className="text-[10px] font-mono text-rose-400/80">
                                      Via DEX / Carteira
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-2xl lg:text-3xl font-mono font-black text-white/40">
                                      E-Coin → USDT
                                    </span>

                                    <div className="shrink-0 flex items-center gap-2.5 bg-yellow-500/10 border border-yellow-500/30 px-4 py-2.5 rounded-2xl">
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-black">
                                        <Coins size={15} strokeWidth={2.5} />
                                      </div>
                                      <div className="text-left">
                                        <span className="block text-sm font-black tracking-wide text-yellow-400 leading-none">
                                          E-Coin
                                        </span>
                                        <span className="block text-[9px] font-mono text-yellow-500/60 mt-0.5">
                                          BSC
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* BOX 2: RECEIVE (USDT) */}
                                <div className="bg-black/30 border border-white/5 rounded-2xl p-5">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                                      Receive ≈ · Receber em
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-2xl lg:text-3xl font-mono font-black text-rose-400/80">
                                      Liquidez Instantânea
                                    </span>

                                    <div className="shrink-0 flex items-center gap-2.5 bg-white/[0.06] border border-white/10 px-4 py-2.5 rounded-2xl">
                                      <div className="w-7 h-7 rounded-full bg-[#26A17B] flex items-center justify-center text-white">
                                        <DollarSign
                                          size={16}
                                          strokeWidth={2.5}
                                        />
                                      </div>
                                      <div className="text-left">
                                        <span className="block text-sm font-black tracking-wide text-white leading-none">
                                          USDT
                                        </span>
                                        <span className="block text-[9px] font-mono text-white/40 mt-0.5">
                                          BEP-20
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* CTA PRINCIPAL: REDIRECIONAMENTO PARA PANCAKESWAP */}
                              <div className="pt-2 space-y-3">
                                <a
                                  href={PANCAKESWAP_SELL_URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-5 px-6 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white shadow-lg shadow-rose-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-3 cursor-pointer"
                                >
                                  <span>
                                    Vender Agora na PancakeSwap DEX
                                  </span>
                                  <ExternalLink size={18} />
                                </a>

                                <p className="text-center text-[11px] font-mono text-white/40 flex items-center justify-center gap-1.5">
                                  <ShieldCheck
                                    size={14}
                                    className="text-rose-400"
                                  />
                                  Par pré-configurado: E-Coin / USDT (BNB Smart
                                  Chain)
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* COLUNA DIREITA: WALLET NODE & INFO */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-7 rounded-[32px]">
                      <h3 className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                        <Wallet size={12} /> Wallet Node
                      </h3>
                      {isConnected ? (
                        <div className="space-y-4">
                          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
                            <span className="text-[10px] font-mono uppercase text-white/40 block mb-1">
                              Connected Address
                            </span>
                            <p className="text-sm font-mono text-yellow-400">
                              {address?.slice(0, 8)}…{address?.slice(-6)}
                            </p>
                          </div>
                          <button
                            onClick={disconnect}
                            className="w-full py-2.5 bg-red-500/10 text-red-400 rounded-xl text-xs uppercase font-bold hover:bg-red-500/20 transition-all cursor-pointer"
                          >
                            Disconnect
                          </button>
                        </div>
                      ) : (
                        <ConnectButton />
                      )}
                    </div>

                    {/* CARD AUXILIAR DE EXECUÇÃO RÁPIDA */}
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[28px] space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                        Roteamento de Liquidez
                      </span>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {tradeMode === "buy"
                          ? "Compras executadas diretamente via contrato oficial com liquidez on-chain e liquidação instantânea em E-Coin."
                          : "Para vendas imediatas, utilize o roteador descentralizado da PancakeSwap conectando sua carteira MetaMask, Trust Wallet ou Rabby."}
                      </p>
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
                  <DesktopConversionHistory
                    history={[]}
                    loading={false}
                    onRefresh={() => {}}
                  />
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