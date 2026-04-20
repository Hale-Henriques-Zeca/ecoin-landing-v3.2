"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
import ReferralModalContent from "@/components/ReferralModalContent";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDisconnect } from "wagmi";
import StreamingAdminPanel from "@/components/StreamingAdminPanel";
import { useStreamingStaking } from "@/hooks/useStreamingStaking";
import { controllerAbi } from "@/lib/abis/controllerAbi";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "viem";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import StakingSecurityPanel from "@/components/StakingSecurityPanel";
import RewardStreamIndicator from "@/components/RewardStreamIndicator";
import RewardVelocity from "@/components/RewardVelocity";
import ProtocolHealth1 from "@/components/ProtocolHealth1";
import LiveRewardCounter from "@/components/LiveRewardCounter";
import ClaimGasNotice from "@/components/ClaimGasNotice";
import {
  Cpu,
  Zap,
  BarChart3,
  ShieldCheck,
  Activity,
  TrendingUp,
  Globe,
  Database,
  Wallet,
  ArrowUpRight,
} from "lucide-react";
import { parseUnits } from "viem";
import { formatUnits } from "viem";




/* ─────────────────────────────────────────────
   SUB-COMPONENTS (design atoms)
───────────────────────────────────────────── */
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
  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md hover:border-white/20 transition-all group">
    <div className="flex justify-between items-start mb-3">
      {Icon && <Icon size={16} className={color} />}
      <span className="text-[9px] text-white/30 font-mono uppercase tracking-widest ml-auto">
        TRANSMISSÃO AO VIVO
      </span>
    </div>
    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
      {title}
    </p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-mono font-bold text-white">{value}</span>
      <span className={`text-[10px] font-bold ${color}`}>{unit}</span>
    </div>
  </div>
);

const StatusBadge = ({
  active,
  labelOn,
  labelOff,
}: {
  active: boolean;
  labelOn: string;
  labelOff: string;
}) => (
  <div
    className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
      active
        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        : "bg-red-500/10 border-red-500/20 text-red-400"
    }`}
  >
    <div
      className={`w-2 h-2 rounded-full ${
        active ? "bg-emerald-500 animate-pulse" : "bg-red-500"
      }`}
    />
    {active ? labelOn : labelOff}
  </div>
);



/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ECoinOnChainStaking() {
  /* ================= WALLET HOOKS (SEMPRE NO TOPO) ================= */
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

 


  const setPercentage = (percent: number) => {
  if (!balance) return;

  const value = (balance * percent) / 100;

  // limita a 6 casas (boa prática UX)
  stakeInput.setValue(value.toFixed(6));
};

  const STAKING_OWNER =
    process.env.NEXT_PUBLIC_STAKING_OWNER?.toLowerCase();

  /* 🔐 WALLET */
  const [panelOpen, setPanelOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  /* ⛔ HYDRATION */
  const [mounted, setMounted] = useState(false);

  /* 📊 STAKING STATES */
  const stakeInput = useSafeNumberInput();

  const staking = useStreamingStaking();

  const { data: isActive } = useReadContract({
    abi: controllerAbi,
    address: CONTRACTS.PROTOCOL_CONTROLLER,
    functionName: "stakingRewardsActive",
  });

  const { data: stakingLiquidity } = useReadContract({
    abi: erc20Abi,
    address: CONTRACTS.ECOIN,
    functionName: "balanceOf",
    args: [CONTRACTS.STREAMING_STAKING],
    chainId: 56,
  });

  const { data: allowance } = useReadContract({
    abi: erc20Abi,
    address: CONTRACTS.ECOIN,
    functionName: "allowance",
    args: address ? [address, CONTRACTS.STREAMING_STAKING] : undefined,
    chainId: 56,
    query: { enabled: !!address },
  });

  const { data: userBalance } = useReadContract({
  abi: erc20Abi,
  address: CONTRACTS.ECOIN,
  functionName: "balanceOf",
  args: address ? [address] : undefined,
  chainId: 56,
  query: { enabled: !!address },
});

 const balance = userBalance ? Number(formatUnits(userBalance, 18)) : 0;

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
    STAKING_OWNER &&
    address.toLowerCase() === STAKING_OWNER;

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */


  console.log("pending:", staking.pending, typeof staking.pending);
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-yellow-500/30 overflow-hidden">
      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/images/ECOIN-STAKING.png')" }}
        />
        <div className="absolute inset-0 bg-[#020617]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(212,175,55,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
        {/* Subtle golden line */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(212,175,55,0.04),transparent)]" />
      </div>

      {/* ── CONTENT WRAPPER ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20"
      >
        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Cpu className="text-[#D4AF37]" size={26} />
              <h1 className="text-3xl font-black tracking-tighter italic text-white">
               Terminal de Mineração de eCoin
              </h1>
            </div>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-1">
             Fluxo de caixa em tempo real · Na BlockChain · Via Binance Smart Chain (BNB Chain)
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <StatusBadge
              active={!!isActive}
              labelOn="Staking Active"
              labelOff="Staking Paused"
            />
            <div className="text-[10px] font-mono text-white/30">
             ID_DO_MOTOR: EdenKingDom_MINERCore_V1_BNB Chain
            </div>

            {/* CONNECT / ADDRESS */}
            {!isConnected ? (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button
                    onClick={openConnectModal}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-black hover:brightness-110 transition"
                  >
                    <Wallet size={14} /> CONECTAR CARTEIRA INICIAR A POUPANÇA
                  </button>
                )}
              </ConnectButton.Custom>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-3 py-1 rounded-full">
                  {address?.slice(0, 6)}…{address?.slice(-4)}
                </span>
                <button
                  onClick={() => {
                    disconnect();
                    setPanelOpen(false);
                  }}
                  className="text-[10px] text-red-400 border border-red-500/30 hover:border-red-400 px-3 py-1 rounded-full transition"
                >
                  Desconectar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── TOP STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard
            title="Investido Global"
            value={staking.total || "—"}
            unit="eCoin"
            color="text-[#D4AF37]"
            icon={Globe}
          /> 
          <StatCard
            title="Seu investimento"
            value={isConnected ? staking.userStake || "0" : "—"}
            unit="eCoin"
            color="text-blue-400"
            icon={TrendingUp}
          />
          <StatCard
            title="Lucros"
            value={isConnected ? staking.pending || "0" : "—"}
            unit="eCoin"
            color="text-emerald-400"
            icon={Zap}
          />
          <StatCard
            title="Sua (%)"
            value={isConnected ? staking.share?.toFixed(2) ?? "0" : "—"}
            unit="%"
            color="text-purple-400"
            icon={Database}
          />
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ────────────────────────────────────────
              LEFT COLUMN — Main Staking Panel
          ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* HERO MESSAGE */}
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[32px] p-8">
              <p className="text-[10px] font-mono text-[#D4AF37]/60 uppercase tracking-[0.3em] mb-3">
                Protocolo de Mineração da eCoin via WEB3
              </p>
              <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                eCoin —{" "}
                <span className="text-[#D4AF37]">Fluxo de caixa em tempo real na blockchain🚀</span>
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                As recompensas são calculadas na BlockChain no fluxo de caixa continuamente{" "}
                <span className="text-yellow-400 font-semibold">
                  Sem retornos fixos. Sem períodos. Sem taxa anual efetiva (APY) garantida.
                </span>
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-[#D4AF37]/30 via-transparent to-transparent" />
              <p className="text-[10px] text-gray-500 mt-3 italic">
                Pool de Preparação para a listagem da eCoin nas grandes
                corretoras globais.
              </p>
            </div>

            {/* STREAMING ANALYTICS */}
            {isConnected && panelOpen && (
              <AnimatePresence>
                <motion.div
                  key="staking-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-5"
                >
                  {/* Live Components */}
                  <LiveRewardCounter pending={staking.pending} />
                  <StakingSecurityPanel />
                  <RewardStreamIndicator />
                  <RewardVelocity
                  pending={staking.pending}
                  totalStaked={staking.total}
                  />
                  <ProtocolHealth1
                  liquidity={stakingLiquidity ? Number(stakingLiquidity) / 1e18 : 0}
                  pending={staking.pending}
                  />

                  {/* STREAMING INFO PANEL */}
                  <div className="bg-black/60 border border-white/10 rounded-[28px] p-6 space-y-5">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                      Mineração ao Vivo na BlockChain
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Seu investimento</p>
                        <p className="text-xl font-bold text-white font-mono">
                          {staking.userStake}
                        </p>
                        <p className="text-[9px] text-[#D4AF37]/60">eCoin</p>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Por Sacar</p>
                        <p className="text-xl font-bold text-emerald-400 font-mono">
                          {staking.pending}
                        </p>
                        <p className="text-[9px] text-emerald-400/60">eCoin</p>
                      </div>
                    </div>

                    {/* Fee breakdown */}
                    {staking.pending > 0 && (
                      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 space-y-2 text-xs">
                        <div className="flex justify-between text-gray-400">
                          <span>Remuneração Bruta</span>
                          <span>{staking.pending} eCoin</span>
                        </div>
                        <div className="flex justify-between text-red-400">
                          <span>Taxa de Saque (1%)</span>
                         <span>
                          -{(staking.pending * 0.01).toFixed(6)} eCoin
                          </span>
                        </div>
                        <div className="h-px bg-white/5" />
                        <div className="flex justify-between text-emerald-400 font-bold">
                          <span>Você recebe</span>
                          <span>
                            {(staking.pending * 0.99).toFixed(6)} eCoin
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Share bar */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-2">
                        <span>Sua Percentagem de Ganhos por segundos </span>
                        <span className="text-[#D4AF37]">
                          {staking.share.toFixed(2)}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/5 border border-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#3B82F6] transition-all duration-700"
                          style={{ width: `${staking.share}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-yellow-400 text-center font-mono">
                     Sem períodos fixos · Sem taxa anual de juros fixa · Recompensas contínuas em fluxo de caixa em tempo real 🚀
                    </p>
                  </div>

                  {/* Liquidity Monitor */}
                  <div className="bg-black/40 border border-yellow-500/20 rounded-2xl p-5 space-y-3">
                    <p className="text-[10px] font-mono text-yellow-500/60 uppercase tracking-widest">
                     Monitor de Liquidez
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Liquidez de Mineração na Poupança</span>
                        <span className="text-yellow-400 font-mono">
                          {stakingLiquidity
                            ? Number(stakingLiquidity) / 1e18
                            : 0}{" "}
                          eCoin
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Seu Saque pendente</span>
                        <span className="text-green-400 font-mono">
                          {staking.pending}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">lastro de Crescimento 📈</span>
                        <span className="text-white font-mono">
                          {stakingLiquidity && Number(staking.pending) > 0
                            ? (
                                (Number(stakingLiquidity) /
                                  (Number(staking.pending) * 1e18)) *
                                100
                              ).toFixed(2)
                            : "∞"}
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Protocol Safety */}
                  <ClaimGasNotice />

                  {/* CLAIM */}
                  <button
                    disabled={staking.pending === 0}
                    onClick={staking.claim}
                    className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
                      Number(staking.pending) === 0
                        ? "border border-gray-700 text-gray-600 cursor-not-allowed"
                        : "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/5"
                    }`}
                  >
                    Sacar Lucros
                  </button>
                  {Number(staking.pending) === 0 && (
                    <p className="text-yellow-400 text-xs text-center font-mono">
                      Nada a sacar ainda. Lucros a acumular…
                    </p>
                  )}

                  {/* STAKE INPUT */}
 <div className="bg-[#0f172a]/80 border border-blue-500/20 rounded-[28px] p-6 backdrop-blur-xl">
 <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                        Poupar/Remover a Poupança Para a Mineração da eCoin
                      </p>
                      {address && (
                        <span className="text-[9px] font-mono text-white/30">
                          {address.slice(0, 6)}…{address.slice(-4)}
                        </span>
                      )}
                      </div> 
 <input
  translate="no"
  inputMode="decimal"
  autoComplete="off"
  autoCorrect="off"
  spellCheck={false}
  value={stakeInput.value}
  onChange={(e) => stakeInput.onChange(e.target.value)}
  placeholder="Insira o valor a Poupar…"
  className="notranslate w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xl text-white outline-none mb-5 font-mono placeholder:text-white/20"
/>

<div className="grid grid-cols-6 gap-2 mb-4">
  {[1, 10, 25, 50, 75, 100].map((p) => (
    <button
      key={p}
      onClick={() => setPercentage(p)}
      className="text-[10px] py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
    >
      {p}%
    </button>
  ))}
</div>

<div className="grid grid-cols-2 gap-4">
<button
onClick={async () => {
  try {
    if (!stakeInput.isValid) {
      alert("Valor inválido");
      return;
    }

    

    await staking.stake(stakeInput.value);
  } catch (e: any) {
    alert(e?.message || "Erro no Poupar");
  }
}}
className="py-4 rounded-2xl font-black text-black bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F] hover:brightness-110 transition uppercase tracking-wider text-xs"
>
POUPAR
</button>


<button
  onClick={async () => {
  try {
    if (!stakeInput.isValid) {
      alert("Valor inválido");
      return;
    }

   

    await staking.unstake(stakeInput.value);
  } catch (e: any) {
    alert(e?.message || "Erro no unstake");
  }
}}
className="py-4 rounded-2xl font-black text-red-400 border border-red-500/30 hover:border-red-400 hover:bg-red-500/5 transition uppercase tracking-wider text-xs"
>
 REMOVER POUPANÇA
</button>
</div>
</div>

                  {/* WALLET DASHBOARD */}

                  <div className="bg-white/5 border border-white/10 rounded-[28px] p-6">
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                      Visão geral da carteira
                    </p>
                    <EcoinWalletDashboard />
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Open staking stream button (connected but panel closed) */}
            {isConnected && !panelOpen && (
              <button
                onClick={() => setPanelOpen(true)}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:brightness-110 transition"
              >
               ABRIR O PAINEL DE POUPANÇA
              </button>
            )}

            {/* Admin Panel */}
            {isOwner && (
              <div className="mt-4">
                <StreamingAdminPanel />
              </div>
            )}
          </div>

          {/* ────────────────────────────────────────
              RIGHT COLUMN — Live Console + Info
          ──────────────────────────────────────── */}
          <div className="space-y-6">
            {/* LIVE STREAM CONSOLE */}
            <div className="bg-black border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col h-[420px] relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">
                    Console de fluxo de caixa
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#D4AF37]/40">
                  BNB CHAIN 56
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3 font-mono text-[10px]">
                {isConnected && panelOpen ? (
                  <>
                    <div className="flex flex-col gap-1 border-l-2 border-[#D4AF37]/20 pl-3 py-1">
                      <span className="text-[#D4AF37]/80">
                        [{new Date().toLocaleTimeString()}] Fluxo de lucros ativo…
                      </span>
                      <span className="text-[8px] text-gray-600 uppercase">
                       Acumulação contínua de fluxo de caixa
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-emerald-500/20 pl-3 py-1">
                      <span className="text-emerald-400/80">
                        Pool de poupança verificada on-chain ✓
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-blue-500/20 pl-3 py-1">
                      <span className="text-blue-400/80">
                        Nó BSC: CONECTADO · Latência: ~12ms
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-purple-500/20 pl-3 py-1">
                      <span className="text-purple-400/80">
                        Link Neural: Estável · Protocolo saudável
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 border-l-2 border-white/10 pl-3 py-1">
                      <span className="text-white/40">
                        Lucros pendentes: calculando…
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                    <Cpu size={36} className="text-white/10" />
                    <p className="text-gray-600 italic text-[11px]">
                      Sistema em Standby.
                      <br />
                      Conecte a carteira para iniciar a Poupança.
                    </p>
                  </div>
                )}
              </div>
              <div className="px-5 py-3 bg-[#D4AF37]/5 border-t border-[#D4AF37]/10">
                <p className="text-[9px] text-[#D4AF37]/50 flex items-center gap-2 font-mono uppercase tracking-tighter">
                  <ShieldCheck size={10} /> Sem épocas · Fluxo contínuo na blockchain
                </p>
              </div>
            </div>

            {/* AI INSIGHT CARD */}
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-3xl p-5">
              <div className="text-[10px] text-[#D4AF37] mb-2 font-mono uppercase tracking-widest">
                Análise do Protocolo de IA
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
               Os lucros fluem continuamente, sem período de bloqueio. Sua participação determina sua fatia do fluxo de caixa global. O protocolo é otimizado para a preparação de listagem em bolsas de valores globais.
              </p>
            </div>

            {/* REFERRAL NODE */}
            <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-[32px] p-6">
              <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4">
                Nó de Referência
              </p>
              <div className="space-y-3">
                
                <p className="text-[10px] text-gray-400 leading-relaxed italic">
                  Ganhe comissões de toda a rede de referidos no protocolo.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] hover:brightness-110 transition"
                >
                  🎁 Convidar Amigos
                </button>
              </div>
            </div>

            {/* GLOBAL INFRA */}
            <div className="bg-white/5 border border-white/10 rounded-[28px] p-5 grid grid-cols-2 gap-4 opacity-60 hover:opacity-100 transition-opacity">
              {[
                { label: "Latência do nó", value: "12ms", color: "text-blue-400" },
                { label: "TVL", value: "$2.4M", color: "text-green-400" },
                { label: "Taxa de queima", value: "1.2K/HR", color: "text-orange-400" },
                { label: " Saúde do IA", value: "98.4%", color: "text-purple-400" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <p className="text-[8px] text-gray-600 uppercase mb-1 font-mono">
                    {item.label}
                  </p>
                  <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* COMMUNITY FOOTER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-black/40 border border-white/5 rounded-[28px] p-5 text-center"
            >
              <p className="text-[10px] text-gray-500 mb-4 font-mono uppercase tracking-widest">
                Comunidade eCoin
              </p>
              <div className="flex justify-center gap-4 text-xl text-[#D4AF37]">
                <a
                  href="https://t.me/ecoin2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaTelegramPlane />
                </a>
                <a
                  href="https://x.com/CoinE28810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaDiscord />
                </a>
                <a
                  href="https://t.me/ecoin2025"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaTelegram />
                </a>
                <a
                  href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  <FaWhatsapp />
                </a>
              </div>
              <BsStars className="text-2xl mt-4 mx-auto animate-pulse text-[#D4AF37]" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── REFERRAL MODAL ── */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0a] p-8 rounded-[32px] border border-[#00FF9C]/20 w-[380px] shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00FF9C] animate-pulse" />
              <h3 className="text-[#00FF9C] text-lg font-bold tracking-tight">
                Painel de controle do sistema de referências
              </h3>
            </div>
            <ReferralModalContent />
          </motion.div>
        </div>
      )}
    </div>
  );
}