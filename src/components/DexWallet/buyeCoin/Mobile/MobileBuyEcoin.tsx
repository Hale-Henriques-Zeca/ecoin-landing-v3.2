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
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import ConverterAdminPanel from "@/components/ConverterAdminPanel";
import MobileConversionHistory from "./MobileConversionHistory";

interface MobileBuyEcoinProps {
  isConnected: boolean;
  address?: string;
  disconnect: () => void;
  isOwner?: boolean;
  fromToken?: string;
  toToken?: string;
  amount: string;
  setAmount: (val: string) => void;
  setFromToken?: (token: any) => void;
  setToToken?: (token: any) => void;
  invertPair?: () => void;
  price: number;
  previewAmountOut: bigint;
  previewLoading?: boolean;
  previewAllowed?: boolean;
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

const TOKEN_ICONS = {
  usdt: "/crypto/usdt2.png",
  ecoin: "/crypto/ecoin1.png",
};

function getDynamicNumberSize(valueStr: string): string {
  const len = valueStr.length;
  if (len <= 9) return "text-2xl";
  if (len <= 12) return "text-xl";
  if (len <= 15) return "text-lg";
  if (len <= 19) return "text-base";
  return "text-sm";
}

export default function MobileBuyEcoin({
  isConnected,
  address,
  isOwner,
  disconnect,
  amount,
  setAmount,
  price,
  previewAmountOut,
  previewLoading,
  calculation,
  handleSwap,
  txMining,
  status,
}: MobileBuyEcoinProps) {
  const [activeTab, setActiveTab] = useState<string>("converter");
  const [tradeMode, setTradeMode] = useState<"buy" | "sell">("buy");

  const menuItems = [
    { id: "converter", label: "Converter", icon: ArrowLeftRight },
    { id: "historico", label: "Histórico", icon: History },
    { id: "carteira", label: "Portfolio", icon: Wallet },
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

  const inputFontSize = getDynamicNumberSize(amount || "0.00");
  const outputFontSize = getDynamicNumberSize(estimatedEcoinOut);

  return (
    <main
      translate="no"
      className="notranslate min-h-[100dvh] bg-[#020617] text-white pb-28 pt-4 px-4 relative selection:bg-yellow-500/30 overflow-x-hidden"
    >
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1a0a,transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,#0a1628,transparent)] pointer-events-none" />

      {/* HEADER MOBILE */}
      <div className="flex justify-between items-center gap-2 mb-5 pt-2 relative z-10 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs">
            <Zap size={15} />
          </div>
          <div className="min-w-0">
            <h1 className="text-[clamp(12px,3.6vw,14px)] font-black italic tracking-wider leading-none whitespace-nowrap">
              ecnSWAP
            </h1>
            <p className="text-[clamp(8px,2.2vw,9px)] text-gray-500 font-mono uppercase tracking-wider mt-1 truncate">
              BSC · Binance Smart Chain
            </p>
          </div>
        </div>

        <div className="shrink-0 whitespace-nowrap bg-yellow-500/10 border border-yellow-500/30 px-2.5 py-1.5 rounded-xl text-[clamp(9px,2.7vw,11px)] font-mono font-bold text-yellow-400 leading-none">
          1 E-Coin ={" "}
          <span className="text-white">
            {price > 0 ? price.toFixed(7) : "—"}
          </span>{" "}
          USDT
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
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
              <div className="rounded-[28px] overflow-hidden border border-white/10 bg-[#0b0e14]/90 backdrop-blur-2xl shadow-2xl">
                {/* SWITCH SUPERIOR BUY (VERDE) / SELL (VERMELHO) */}
                <div className="grid grid-cols-2 bg-black/50 relative border-b border-white/5">
                  {/* TAB BUY */}
                  <button
                    type="button"
                    onClick={() => setTradeMode("buy")}
                    className={`relative py-4 px-4 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                      tradeMode === "buy"
                        ? "bg-gradient-to-b from-emerald-500/20 to-[#0b0e14] text-emerald-400 shadow-[inset_0_2px_0_0_#10b981]"
                        : "text-white/35 bg-white/[0.01]"
                    }`}
                  >
                    <TrendingUp
                      size={16}
                      className={
                        tradeMode === "buy"
                          ? "text-emerald-400"
                          : "text-white/30"
                      }
                    />
                    <span>Buy</span>
                    {tradeMode === "buy" && (
                      <motion.div
                        layoutId="mobileActiveTradeIndicator"
                        className="absolute bottom-0 left-5 right-5 h-[2px] bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981]"
                      />
                    )}
                  </button>

                  {/* TAB SELL */}
                  <button
                    type="button"
                    onClick={() => setTradeMode("sell")}
                    className={`relative py-4 px-4 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-wider transition-all duration-300 border-l border-white/5 ${
                      tradeMode === "sell"
                        ? "bg-gradient-to-b from-rose-500/20 to-[#0b0e14] text-rose-400 shadow-[inset_0_2px_0_0_#f43f5e]"
                        : "text-white/35 bg-white/[0.01]"
                    }`}
                  >
                    <TrendingDown
                      size={16}
                      className={
                        tradeMode === "sell"
                          ? "text-rose-400"
                          : "text-white/30"
                      }
                    />
                    <span>Sell</span>
                    {tradeMode === "sell" && (
                      <motion.div
                        layoutId="mobileActiveTradeIndicator"
                        className="absolute bottom-0 left-5 right-5 h-[2px] bg-rose-500 rounded-full shadow-[0_0_10px_#f43f5e]"
                      />
                    )}
                  </button>
                </div>

                {/* CORPO DO CONVERSOR MOBILE */}
                <div className="p-5">
                  <AnimatePresence mode="wait">
                    {tradeMode === "buy" ? (
                      /* ==================== INTERFACE BUY (USDT -> E-COIN) ==================== */
                      <motion.div
                        key="mobile-buy-panel"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* BOX 1: SPEND (USDT) */}
                        <div className="bg-black/40 border border-white/10 focus-within:border-emerald-500/50 rounded-2xl p-4 transition-colors">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                              Spend · Pagar com
                            </span>
                            <div className="flex items-center gap-1.5">
                              {[10, 50, 100].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => setAmount(String(preset))}
                                  className="px-2 py-0.5 rounded-md bg-white/5 active:bg-emerald-500/25 text-[10px] font-mono text-white/60 active:text-emerald-300 transition-colors"
                                >
                                  ${preset}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <input
                              type="text"
                              inputMode="decimal"
                              value={amount}
                              onChange={(e) =>
                                setAmount(e.target.value.replace(",", "."))
                              }
                              placeholder="0.00"
                              className={`flex-1 min-w-0 bg-transparent outline-none ${inputFontSize} leading-tight font-mono font-black text-white placeholder:text-white/20 transition-all duration-150`}
                            />

                            {/* BADGE MOEDA USDT */}
                            <div className="shrink-0 flex items-center gap-2 bg-white/[0.06] border border-white/10 px-3 py-2 rounded-xl">
                              <img
                                src={TOKEN_ICONS.usdt}
                                alt="USDT"
                                className="w-6 h-6 rounded-full object-cover shadow-md"
                              />
                              <div className="text-left">
                                <span className="block text-xs font-black tracking-wide text-white leading-none">
                                  USDT
                                </span>
                                <span className="block text-[8px] font-mono text-white/40 mt-0.5">
                                  BEP-20
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* BOX 2: RECEIVE (E-COIN) */}
                        <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                              Receive ≈ · Você recebe
                            </span>
                            {previewLoading && (
                              <span className="text-[9px] font-mono text-emerald-400 animate-pulse">
                                Cotando pool...
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-3">
                            <div
                              className={`flex-1 min-w-0 ${outputFontSize} leading-tight font-mono font-black text-emerald-400 break-all transition-all duration-150`}
                            >
                              {estimatedEcoinOut}
                            </div>

                            {/* BADGE MOEDA E-COIN */}
                            <div className="shrink-0 flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded-xl">
                              <img
                                src={TOKEN_ICONS.ecoin}
                                alt="E-Coin"
                                className="w-6 h-6 rounded-full object-cover shadow-md"
                              />
                              <div className="text-left">
                                <span className="block text-xs font-black tracking-wide text-yellow-400 leading-none">
                                  E-Coin
                                </span>
                                <span className="block text-[8px] font-mono text-yellow-500/60 mt-0.5">
                                  BEP-20
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* COTAÇÃO RESUMIDA */}
                        <div className="flex items-center justify-between px-1 text-[11px] font-mono text-white/45">
                          <span>
                            1 E-Coin ≈{" "}
                            {price > 0 ? price.toFixed(7) : "—"} USDT
                          </span>
                          {calculation.feePercent <= 0 && (
                            <span>
                              Taxa do Protocolo: {calculation.feePercent}%
                            </span>
                          )}
                        </div>

                        {/* BOTÕES DE AÇÃO COMPRA */}
                        {!isConnected ? (
                          <div className="pt-1">
                            <ConnectButton.Custom>
                              {({ openConnectModal }) => (
                                <button
                                  type="button"
                                  onClick={openConnectModal}
                                  className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-600 text-black shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                  <Wallet size={16} /> Connect Wallet
                                </button>
                              )}
                            </ConnectButton.Custom>
                          </div>
                        ) : (
                          <div className="space-y-2.5 pt-1">
                            <button
                              type="button"
                              onClick={handleSwap}
                              disabled={
                                !amount || Number(amount) <= 0 || txMining
                              }
                              className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-emerald-500 to-teal-600 text-black shadow-lg shadow-emerald-500/20 disabled:opacity-30 active:scale-[0.98] transition-all"
                            >
                              {txMining
                                ? "⛏️ A processar..."
                                : "Comprar E-Coin com USDT →"}
                            </button>

                            <div className="flex items-center justify-between gap-2 pt-0.5">
                              {address && (
                                <span className="text-[10px] font-mono text-yellow-400/80 px-2.5 py-2 rounded-xl bg-black/40 border border-white/5">
                                  {address.slice(0, 6)}…{address.slice(-4)}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={disconnect}
                                className="flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 text-red-400 active:bg-red-500/20 transition-all"
                              >
                                Disconnect Wallet
                              </button>
                            </div>
                          </div>
                        )}

                        {status && (
                          <p className="text-center text-xs font-mono text-yellow-400 animate-pulse pt-1">
                            {status}
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      /* ==================== INTERFACE SELL (E-COIN -> USDT) ==================== */
                      <motion.div
                        key="mobile-sell-panel"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        {/* BANNER EM DESENVOLVIMENTO */}
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-3.5 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                            <Wrench size={16} />
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
                                Módulo de Venda Direta em Desenvolvimento
                              </span>
                              <span className="px-2 py-0.5 text-[8px] font-mono uppercase rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                Em Breve
                              </span>
                            </div>
                            <p className="text-[11px] text-white/75 leading-relaxed">
                              Por questões de rapidez e liquidez imediata,
                              você pode vender os seus{" "}
                              <strong className="text-white">E-Coins</strong>{" "}
                              agora mesmo dentro da sua própria carteira Web3 ou
                              diretamente no mercado DEX via{" "}
                              <strong className="text-rose-300">
                                PancakeSwap
                              </strong>{" "}
                              — basta conectar a sua carteira e confirmar o
                              swap.
                            </p>
                          </div>
                        </div>

                        {/* PREVIEW INVERSO: E-COIN -> USDT */}
                        <div className="space-y-2.5 opacity-90">
                          <div className="bg-black/40 border border-white/10 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                                Spend · Vender
                              </span>
                              <span className="text-[9px] font-mono text-rose-400/80">
                                Via DEX / Carteira
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-lg font-mono font-black text-white/45">
                                E-Coin → USDT
                              </span>
                              <div className="shrink-0 flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-3 py-2 rounded-xl">
                                <img
                                  src={TOKEN_ICONS.ecoin}
                                  alt="E-Coin"
                                  className="w-6 h-6 rounded-full object-cover shadow-md"
                                />
                                <div className="text-left">
                                  <span className="block text-xs font-black tracking-wide text-yellow-400 leading-none">
                                    E-Coin
                                  </span>
                                  <span className="block text-[8px] font-mono text-yellow-500/60 mt-0.5">
                                    BEP-20
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                              Receive ≈ · Receber em
                            </span>
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-lg font-mono font-black text-rose-400/85">
                                Liquidez Instantânea
                              </span>
                              <div className="shrink-0 flex items-center gap-2 bg-white/[0.06] border border-white/10 px-3 py-2 rounded-xl">
                                <img
                                  src={TOKEN_ICONS.usdt}
                                  alt="USDT"
                                  className="w-6 h-6 rounded-full object-cover shadow-md"
                                />
                                <div className="text-left">
                                  <span className="block text-xs font-black tracking-wide text-white leading-none">
                                    USDT
                                  </span>
                                  <span className="block text-[8px] font-mono text-white/40 mt-0.5">
                                    BEP-20
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CTA PANCAKESWAP */}
                        <div className="pt-1 space-y-2.5">
                          <a
                            href={PANCAKESWAP_SELL_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 px-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 text-white shadow-lg shadow-rose-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          >
                            <span>Vender Agora na PancakeSwap DEX</span>
                            <ExternalLink size={16} />
                          </a>

                          <p className="text-center text-[10px] font-mono text-white/40 flex items-center justify-center gap-1">
                            <ShieldCheck
                              size={13}
                              className="text-rose-400 shrink-0"
                            />
                            Par pré-configurado: E-Coin / USDT (BNB Smart Chain)
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {isConnected && isOwner && <ConverterAdminPanel />}

            {activeTab === "historico" && (
              <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-5 backdrop-blur-xl">
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-yellow-400">
                  <History size={14} /> Histórico de Transações
                </h3>
                <MobileConversionHistory
                  history={[]}
                  loading={false}
                  onRefresh={() => {}}
                />
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

      {/* NAVEGAÇÃO INFERIOR MOBILE */}
      <nav
        aria-label="Navegação móvel"
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0f]/95 backdrop-blur-xl border-t border-white/10 px-6 py-3 flex items-center justify-around shadow-2xl"
      >
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
              <div
                className={`p-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#D4AF37]/15 shadow-sm shadow-[#D4AF37]/30"
                    : ""
                }`}
              >
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