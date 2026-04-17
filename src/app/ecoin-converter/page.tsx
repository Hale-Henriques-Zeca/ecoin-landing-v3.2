"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { parseUnits, formatUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "@/lib/abis/erc20Abi";
import { corporateSwapAbi } from "@/lib/abis/corporateSwapAbi";
import { priceEngineAbi } from "@/lib/abis/priceEngineAbi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi";
import ConverterAdminPanel from "@/components/ConverterAdminPanel";
import { useDexWallet } from "@/contexts/DexWalletContext";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import LiquidityWindow from "@/components/LiquidityWindow";
import ProtocolHealth from "@/components/ProtocolHealth";
import ProtocolSafety from "@/components/ProtocolSafety";
import { bsc } from "wagmi/chains";
import {
  Cpu,
  ShieldCheck,
  ArrowUpDown,
  Wallet,
  TrendingUp,
  Activity,
  Zap,
  RefreshCw,
} from "lucide-react";

// ─── STAT CARD ───────────────────────────────────────────────────────────────
const StatCard = ({
  title,
  value,
  unit,
  color,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  unit: string;
  color: string;
  icon?: any;
}) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md flex flex-col gap-2">
    {Icon && <Icon size={14} className={`${color} opacity-70`} />}
    <p className="text-[10px] text-white/40 uppercase tracking-widest">{title}</p>
    <div className="flex items-baseline gap-2">
      <span
  translate="no"
  className="notranslate text-2xl font-mono font-bold text-white"
>
  {value}
</span>
      <span
  translate="no"
  className={`notranslate text-[10px] font-bold ${color}`}
>
  {unit}
</span>
    </div>
  </div>
);

// ─── TOKEN TYPE ───────────────────────────────────────────────────────────────
type SwapToken = "ECOIN" | "USDT";

const TOKEN_CONFIG = {
  ECOIN: { address: CONTRACTS.ECOIN, decimals: 18 },
  USDT:  { address: CONTRACTS.USDT,  decimals: 18 },
} as const;

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function EBCConvertPanel() {

  /* ═══════════════ WALLET HOOKS (ALWAYS AT TOP) ═══════════════ */
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { balances, isOwner } = useDexWallet();

  /* ═══════════════ CONTRACT HOOKS ═══════════════ */
  const { writeContractAsync } = useWriteContract();

  const { data: ecoinPrice } = useReadContract({
    address: CONTRACTS.PRICE_ENGINE,
    abi: priceEngineAbi,
    functionName: "ecoinPriceUSDT",
  });

  /* ═══════════════ LOCAL STATE ═══════════════ */
  const [mounted, setMounted]       = useState(false);
  const [fromToken, setFromToken]   = useState<SwapToken>("USDT");
  const [toToken, setToToken]       = useState<SwapToken>("ECOIN");
  const [amount, setAmount]         = useState("");
  const [txHash, setTxHash]         = useState<`0x${string}` | null>(null);
  const [status, setStatus]         = useState<string>("");

  /* ═══════════════ EFFECTS ═══════════════ */
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (fromToken === toToken) {
      if (fromToken === "ECOIN") setToToken("USDT");
      else setToToken("ECOIN");
    }
  }, [fromToken, toToken]);

  /* ═══════════════ TX RECEIPT WATCH ═══════════════ */
  const { isLoading: txMining, isSuccess: txSuccess } =
    useWaitForTransactionReceipt({ hash: txHash ?? undefined });

  useEffect(() => {
    if (!txHash) return;
    if (txMining)   setStatus("⛏️ Confirmando transação...");
    if (txSuccess)  setStatus("✅ Conversão concluída!");
  }, [txHash, txMining, txSuccess]);

  /* ═══════════════ HELPERS ═══════════════ */
  function safeFormatUnits(value: unknown, decimals: number) {
    if (typeof value === "bigint") return Number(formatUnits(value, decimals));
    return 0;
  }

  const price = safeFormatUnits(ecoinPrice, 18);

  function invertPair() {
    setFromToken(toToken);
    setToToken(fromToken);
  }

  /* ═══════════════ PARSED AMOUNT ═══════════════ */
  const parsedAmount = useMemo(() => {
    if (!amount) return 0n;
    try { return parseUnits(amount, TOKEN_CONFIG[fromToken].decimals); }
    catch { return 0n; }
  }, [amount, fromToken]);

  /* ═══════════════ PREVIEW CONTRACT READ ═══════════════ */
  type PreviewConvertReturn = { amountOut: bigint; feeUSDT: bigint; allowed: boolean };

  const { data: previewData, isLoading: previewLoading } = useReadContract({
    address: CONTRACTS.SWAP,
    abi: corporateSwapAbi,
    functionName: "previewConvert",
    args: [
      TOKEN_CONFIG[fromToken].address,
      TOKEN_CONFIG[toToken].address,
      parsedAmount,
    ],
    query: { enabled: parsedAmount > 0n && isConnected },
  });

  const previewTuple    = previewData as [bigint, bigint, boolean] | undefined;
  const previewAmountOut = previewTuple?.[0] ?? 0n;
  const previewFeeUSDT   = previewTuple?.[1] ?? 0n;
  const previewAllowed   = previewTuple?.[2] === true;

  /* ═══════════════ CALCULATION ═══════════════ */
  const calculation = useMemo(() => {
    const empty = { gross: 0, feePercent: 0, fee: 0, net: 0, output: 0 };
    if (!amount || !price) return empty;
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return empty;
    const isExit   = fromToken === "ECOIN";
    const feePercent = isExit ? 2.5 : 0.5;
    const fee      = amt * (feePercent / 100);
    const net      = amt - fee;
    const output   = isExit ? net * price : net / price;
    return { gross: amt, feePercent, fee, net, output };
  }, [amount, price, fromToken]);

  /* ═══════════════ SWAP ACTION ═══════════════ */
  async function handleSwap() {
    if (!amount || !isConnected) return;
    const tokenIn   = TOKEN_CONFIG[fromToken].address;
    const tokenOut  = TOKEN_CONFIG[toToken].address;
    const parsed    = parseUnits(amount, TOKEN_CONFIG[fromToken].decimals);
    const minAmountOut = previewAmountOut - (previewAmountOut * 50n) / 10000n;
    await writeContractAsync({
      address: tokenIn, abi: erc20Abi, functionName: "approve",
      args: [CONTRACTS.SWAP, parsed], account: address, chain: bsc,
    });
    await writeContractAsync({
      address: CONTRACTS.SWAP, abi: corporateSwapAbi, functionName: "convert",
      args: [tokenIn, tokenOut, parsed, minAmountOut], account: address, chain: bsc,
    });
  }

  /* ═══════════════ MOUNT GUARD ═══════════════ */
  if (!mounted) return null;

  /* ═══════════════════════════════════════════════════════════════
                               UI
  ═══════════════════════════════════════════════════════════════ */
  return (
    <div translate="no" className=" notranslate min-h-screen bg-[#020617] text-white pt-32 lg:pt-40 p-6 lg:p-12 font-sans selection:bg-yellow-500/30">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1a0a,transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_80%,#0a1628,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6"
        >
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic flex items-center gap-3">
              <Zap className="text-yellow-500" size={28} />
              E-COIN CONVERT TERMINAL
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-1">
              On-Chain Direct Conversion · Official Global Price
            </p>
          </div>

          {/* PRICE BADGE */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 border border-yellow-500/30 px-5 py-3 rounded-2xl backdrop-blur-xl">
              <p className="text-[10px] text-yellow-500/60 uppercase tracking-widest font-mono mb-0.5">Live Price</p>
              <p
  translate="no"
  className="notranslate text-lg font-mono font-black text-yellow-400"
>
                1 E-Coin = <span className="text-white">{price > 0 ? price.toFixed(6) : "—"}</span> USDT
              </p>
            </div>
            {isConnected && (
              <div className="bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-2xl text-[10px] font-mono text-green-400 uppercase tracking-widest">
                • Connected
              </div>
            )}
          </div>
        </motion.div>

        {/* ── STAT STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard title="E-Coin Price" value={price > 0 ? price.toFixed(4) : "—"} unit="USDT" color="text-yellow-500" icon={TrendingUp} />
          <StatCard title="Entry Fee" value="0.5" unit="%" color="text-green-400" icon={Activity} />
          <StatCard title="Exit Fee" value="2.5" unit="%" color="text-orange-400" icon={Zap} />
          <StatCard title="Network" value="BSC" unit="Chain" color="text-blue-400" icon={Cpu} />
        </motion.div>

        {/* ── MAIN GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >

          {/* ╔══════════════════════════════════╗
              ║   LEFT COL — SWAP ENGINE         ║
              ╚══════════════════════════════════╝ */}
          <div className="lg:col-span-2 space-y-6">

            {/* SWAP PANEL */}
            <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[32px] backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-yellow-400">
                  <RefreshCw size={16} />
                  Converter eCoin
                </h3>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  previewLoading
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : previewAllowed && amount
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-white/5 text-white/30 border border-white/10"
                }`}>
                  {previewLoading ? "• SCANNING" : previewAllowed && amount ? "• READY" : "• STANDBY"}
                </div>
              </div>

              {/* FROM BOX */}
              <div className="bg-black/40 border border-yellow-500/20 rounded-2xl p-5 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">From</label>
                  <select
                  translate="no"
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value as SwapToken)}
                    className="notranslate bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-black text-xs px-3 py-1.5 rounded-xl outline-none cursor-pointer"
                  >
                    <option value="ECOIN">E-Coin</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <input
  translate="no"
  lang="en"
  inputMode="decimal"
  autoComplete="off"
  spellCheck={false}
  value={amount}
  onChange={(e) => {
    const value = e.target.value.replace(",", ".");
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  }}
  onPaste={(e) => e.preventDefault()}
                  placeholder="0.000000"
                  className="w-full bg-transparent outline-none text-4xl font-mono font-black text-white placeholder:text-white/10"
                />
              </div>

              {/* INVERT BUTTON */}
              <div className="flex justify-center my-2">
                <button
                  onClick={invertPair}
                  className="group w-11 h-11 flex items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20 hover:border-yellow-500/60 transition-all"
                >
                  <ArrowUpDown size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* TO BOX */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 mt-3">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] text-white/40 uppercase tracking-widest font-mono">To (Estimado)</label>
                  <select
                  translate="no"
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value as SwapToken)}
                    className=" notranslate bg-white/5 border border-white/10 text-white/60 font-black text-xs px-3 py-1.5 rounded-xl outline-none cursor-pointer"
                  >
                    {fromToken === "ECOIN" && <option value="USDT">USDT</option>}
                    {fromToken === "USDT"  && <option value="ECOIN">E-Coin</option>}
                  </select>
                </div>
                <div
  translate="no"
  className={`notranslate text-4xl font-mono font-black ${
    previewAmountOut > 0n ? "text-green-400" : "text-white/20"
  }`}
>
                  {previewAmountOut > 0n
                    ? Number(formatUnits(previewAmountOut, TOKEN_CONFIG[toToken].decimals)).toFixed(6)
                    : "0.000000"}
                </div>
              </div>
            </div>

            {/* FEE BREAKDOWN */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[24px] space-y-3">
              <h4 className="text-[10px] text-white/30 uppercase tracking-widest font-mono mb-4">Fee Breakdown</h4>
              <div className="flex justify-between text-sm">
                <span className="text-white/50 font-mono">Gross</span>
                <span
  translate="no"
  className="notranslate text-white font-mono font-bold"
>
  {calculation.gross.toFixed(6)} {fromToken}
</span>
              </div>
              <div className="w-full h-px bg-white/5" />
              <div className="flex justify-between text-sm">
                <span className="text-red-400/80 font-mono">Fee ({calculation.feePercent}%)</span>
                <span translate="no"
  className="notranslate text-red-400 font-mono font-bold">−{calculation.fee.toFixed(6)} {fromToken}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-400/80 font-mono">Net Amount</span>
                <span translate="no"
  className="notranslate text-green-400 font-mono font-bold">{calculation.net.toFixed(6)} {fromToken}</span>
              </div>
            </div>

            {/* LIQUIDITY WINDOW */}
            <div className="rounded-[24px] overflow-hidden border border-white/5">
              <LiquidityWindow />
            </div>

            {/* PROTOCOL SAFETY */}
            <div className="rounded-[24px] overflow-hidden border border-white/5">
              <ProtocolSafety />
            </div>

            {/* ── ACTION BUTTON ── */}
            {!isConnected ? (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:brightness-110 transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-3"
                  >
                    <Wallet size={18} /> Connect Wallet
                  </button>
                )}
              </ConnectButton.Custom>
            ) : (
              <button
                onClick={handleSwap}
                disabled={!amount || !previewAllowed || parsedAmount === 0n}
                className="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:brightness-110 transition-all shadow-lg shadow-yellow-500/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {txMining ? "⛏️ Confirming..." : "Converter Agora →"}
              </button>
            )}

            {!previewAllowed && amount && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-red-400 shrink-0" />
                <p className="text-red-400 text-xs font-mono">Pair not allowed or protocol phase restricted</p>
              </div>
            )}

            {status && (
              <p className="text-center text-xs font-mono text-yellow-400 animate-pulse">{status}</p>
            )}
          </div>

          {/* ╔══════════════════════════════════╗
              ║   RIGHT COL — WALLET PANEL       ║
              ╚══════════════════════════════════╝ */}
          <div className="space-y-6">

            {/* WALLET NODE CARD */}
            <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-7 rounded-[32px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

              <h3 className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                <Wallet size={12} /> Wallet Node
              </h3>

              {!isConnected ? (
                <div className="space-y-4">
                  <p className="text-[11px] text-gray-500 italic font-mono">
                    Connect your wallet to access conversion and balance data.
                  </p>
                  <ConnectButton label="Connect Wallet" showBalance />
                </div>
              ) : (
                <div className="space-y-5">
                  {/* ADDRESS */}
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">Address</p>
                    <p className="text-sm font-mono font-bold text-yellow-400">
                      {address?.slice(0, 8)}…{address?.slice(-6)}
                    </p>
                  </div>

                  {/* DISCONNECT */}
                  <button
                    onClick={() => disconnect()}
                    className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    Disconnect
                  </button>

                  {/* WALLET DASHBOARD */}
                  <div className="rounded-xl overflow-hidden border border-white/5">
                    <EcoinWalletDashboard />
                  </div>
                </div>
              )}
            </div>

            {/* PROTOCOL CONSOLE */}
            <div className="bg-black border border-white/10 p-6 rounded-[32px] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

              <div className="flex items-center justify-between mb-5 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-yellow-500 animate-pulse" : "bg-gray-700"}`} />
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Protocol Node</span>
                </div>
                <span className="text-[9px] font-mono text-blue-500/40">BSC MAINNET</span>
              </div>

              <div className="space-y-3 font-mono text-[11px] text-gray-400">
                <div className="flex justify-between">
                  <span className="text-white/30">Entry Fee</span>
                  <span className="text-green-400 font-bold">0.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/30">Exit Fee</span>
                  <span className="text-orange-400 font-bold">2.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/30">Slippage Guard</span>
                  <span className="text-blue-400 font-bold">0.5%</span>
                </div>
                <div className="w-full h-px bg-white/5 my-2" />
                <div className="p-3 bg-orange-500/5 border border-orange-500/15 rounded-xl">
                  <p className="text-[9px] text-orange-500 flex items-center gap-2 font-black uppercase tracking-tighter">
                    <ShieldCheck size={10} /> 10% Convert fee to Staking Reward
                  </p>
                </div>
              </div>
            </div>

            {/* ADMIN PANEL */}
            {isConnected && isOwner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="rounded-[24px] overflow-hidden border border-yellow-500/20">
                  <ConverterAdminPanel />
                </div>
                <div className="rounded-[24px] overflow-hidden border border-white/5">
                  <ProtocolHealth />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── GLOBAL INFRA STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 transition-opacity"
        >
          {[
            { label: "Node Latency", value: "12ms",   color: "text-blue-400" },
            { label: "Burn Rate",    value: "1.2K/HR", color: "text-orange-400" },
            { label: "Total TVL",    value: "$2.4M",   color: "text-green-400" },
            { label: "Uptime",       value: "99.98%",  color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[9px] text-gray-600 uppercase mb-1 font-mono tracking-widest">{stat.label}</p>
              <p
  translate="no"
  className={`notranslate text-xs font-bold font-mono ${stat.color}`}
>
  {stat.value}
</p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}