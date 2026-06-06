"use client";


import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, BarChart3, Wallet, 
  ArrowUpRight, RefreshCw, Settings, Database, 
   Activity, Play, Square, Fuel
} from "lucide-react";

import Link from "next/link";

import { usePublicClient } from "wagmi";

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
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";
import { erc20Abi } from "viem";

import AdminPage from "@/components/AdminPage";

import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";

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

import { formatUnits, parseUnits } from "viem";
import { RewardsChart } from "@/components/RewardsChart";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useEcGas } from "@/hooks/useEcGas";
import { useSwitchChain, useChainId } from "wagmi";
import { useRewardStreaming } from "@/hooks/useRewardStreaming";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";
import MiningPreviewPanel from "@/components/MiningPreviewPanel";
import GasCapacityPanel from "@/components/GasCapacityPanel";
import { useMiningFeeCollector } from "@/hooks/useMiningFeeCollector";
import LiveRewardCounter from "@/app/Savings/components/LiveRewardCounter";
import StakingSecurityPanel from "@/app/Savings/components/StakingSecurityPanel";
import RewardStreamIndicator from "@/app/Savings/components/RewardStreamIndicator";
import RewardVelocity from "@/app/Savings/components/RewardVelocity";
import MiningAnalyticsPanel from "@/components/MiningAnalyticsPanel";
import RewardVelocityGraph from "@/components/RewardVelocityGraph";
import MiningHistoryPanel from "@/components/MiningHistoryPanel";
import { useOverflowAnalytics } from "@/hooks/useOverflowAnalytics";
import APRPanel from "@/components/APRPanel";


function useSafeNumberInput(initial = "") {

  const [value, setValue] = useState(initial);

  const onChange = (input: string) => {

    const raw = input
      .replace(",", ".")
      .replace(/[^\d.]/g, "");

    if (/^\d*\.?\d*$/.test(raw)) {
      setValue(raw);
    }
  };

  const isValid =
    value &&
    !isNaN(Number(value));

  return {
    value,
    setValue,
    onChange,
    isValid,
  };
}


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
      const gas = useEcGas(address);
    
      const MINING_OWNER =
      process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();

      const feeCollector =
  useMiningFeeCollector();

      const { switchChain } = useSwitchChain();
      const chainId = useChainId();
    
    
      /* 🔐 WALLET */
      const [panelOpen, setPanelOpen] = useState(false);
    
    
       const [showModal, setShowModal] = useState(false);
      const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };
    
      /* ⛔ HYDRATION */
      const [mounted, setMounted] = useState(false);


const overflow =
  useOverflowAnalytics();
  
  const [isMining, setIsMining] = useState(false);
  const amountInput = useSafeNumberInput();

  const [gasToken, setGasToken] =
  useState<"USDT" | "EUSD">("USDT");

const setStakePercentage = (percent: number) => {

  const balance =
    Number(mining.walletBalance || 0);

  const value =
    (balance * percent) / 100;

  amountInput.setValue(
    value.toFixed(6)
  );
};

const setUnstakePercentage = (percent: number) => {

  const staked =
    Number(mining.userStake || 0);

  const value =
    (staked * percent) / 100;

  amountInput.setValue(
    value.toFixed(6)
  );
};

  const mining = useMiningStaking();

const publicClient = usePublicClient({ chainId: 56 });

const [chartData, setChartData] = useState([]);




const preview = gas.preview;

const previewUSDT =
  preview ? Number(formatUnits(preview[0], 18)) : 0;

const previewEUSD =
  preview ? Number(formatUnits(preview[1], 18)) : 0;

const remainingCapacity =
  preview ? Number(formatUnits(preview[2], 18)) : 0;

const usedCapacity =
  preview ? Number(formatUnits(preview[3], 18)) : 0;

const maxCapacity =
  preview ? Number(formatUnits(preview[4], 18)) : 0;

const gasBalance =
  remainingCapacity;  

 const stakeActive =
  Number(mining.userStake) > 0;  

const simulatedWillMine =
  remainingCapacity > 0 &&
  stakeActive;

 



const totalPending =
  preview
    ? Number(formatUnits(preview[0], 18)) +
      Number(formatUnits(preview[1], 18))
    : 0;





const { data: usdtEnabled } = useReadContract({
  address: CONTRACTS.ECGAS_SALE,
  abi: ecGasSaleAbi,
  functionName: "usdtEnabled",
});

const { data: eusdEnabled } = useReadContract({
  address: CONTRACTS.ECGAS_SALE,
  abi: ecGasSaleAbi,
  functionName: "eusdEnabled",
});


  const { data: totalStaked } = useReadContract({
  abi: miningStakingAbi,
  address: CONTRACTS.MINING_STAKING,
  functionName: "totalStaked",
  chainId: 56,
});

const { data: totalStakers } = useReadContract({
  abi: miningStakingAbi,
  address: CONTRACTS.MINING_STAKING,
  functionName: "totalStakers",
  chainId: 56,
});

const { data: userInfo } = useReadContract({
  abi: miningStakingAbi,
  address: CONTRACTS.MINING_STAKING,
  functionName: "users",
  chainId: 56,
  args: address ? [address] : undefined,
});

const { data: pending } = useReadContract({
  abi: miningStakingAbi,
  address: CONTRACTS.MINING_STAKING,
  functionName: "pendingRewards",
  chainId: 56,
  args: address ? [address] : undefined,
});



  // 🔥 Dual rewards (novo modelo)
const pendingUSDT =
  pending ? Number(formatUnits(pending[0], 18)) : 0;

const pendingEUSD =
  pending ? Number(formatUnits(pending[1], 18)) : 0;

const streaming =
  useRewardStreaming(address);

// Simulação de dados do contrato (ALINHADO)
const stats = {
  totalStaked: `${mining.total} eCoin`,
  myStake: `${mining.userStake} eCoin`,

  // 👇 AGORA SEPARADO
  pendingUSDT: `${streaming.visualUSDT.toFixed(6)} USDT`,
  pendingEUSD: `${streaming.visualEUSD.toFixed(6)} eUSD`,

  // 👇 opcional (se quiseres manter total combinado)
  pendingTotal: `${(pendingUSDT + pendingEUSD).toFixed(4)} TOTAL`,

  totalStakers: mining.totalStakers.toString(),
  share: `${mining.share.toFixed(6)}%🚀`,
};

  
    const isOwner =
    isConnected &&
    address &&
    MINING_OWNER &&
    address.toLowerCase() === MINING_OWNER;

    useEffect(() => {
  if (!isConnected) return;

  if (chainId !== 56) {
    switchChain({ chainId: 56 });
  }
}, [isConnected, chainId]);

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
<BlockchainDeviceAlert />

        {/* GRID DE ESTATÍSTICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Depósitos Globais" value={stats.totalStaked} icon={ShieldCheck} color="[#D4AF37]" />
          <StatCard label="Mineradores Ativos" value={stats.totalStakers} icon={TrendingUp} color="emerald-400" />
          <StatCard label="Meu Depósito" value={stats.myStake} icon={Coins} color="blue-400" />
          <StatCard label="Ganhos Estimados" value={stats.share} icon={Zap} color="purple-400" />
        </div>

{/* INÍCIO DO BOTÃO SAIBA MAIS */}
<div className="mt-8 flex justify-center w-full">
  <Link 
    href="ecoin-buyback-engine" 
    className="inline-block px-6 py-2 text-sm font-semibold text-cyan-400 border border-cyan-500/40 rounded-xl bg-cyan-500/5 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
  >
    Saiba mais de Smart Pools
  </Link>
</div>
{/* FIM DO BOTÃO SAIBA MAIS */}    

{/* SEPARADOR*/}
<div className="relative z-10 mt-14 mb-10 flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
  <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">
    📊 Fluxo de recompensas
  </span>
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
</div>

<div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
  <h3 className="text-white mb-4 font-bold">
    📊 Fluxo de recompensas
  </h3>

  <RewardVelocityGraph
    pendingUSDT={pendingUSDT}
  />
  <div className="mt-6">


  <MiningAnalyticsPanel
    totalRewards={pendingUSDT + pendingEUSD}
    totalGasUsed={usedCapacity}
    efficiency={
      maxCapacity > 0
        ? (usedCapacity / maxCapacity) * 100
        : 0
    }
    sessions={5}
    recycled={
  overflow.totalUSDT +
  overflow.totalEUSD
}
    apr={148.22}
  />

</div>
</div>

<div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8">

  <h3 className="text-white font-bold mb-4 flex items-center gap-2">
    <Fuel size={18} className="text-[#D4AF37]" />
    Gas Vault (ecGas)
  </h3>

<GasCapacityPanel
  gasBalance={gasBalance}

  maxCapacity={maxCapacity}
  usedCapacity={usedCapacity}
  remainingCapacity={remainingCapacity}

  willMine={simulatedWillMine}
  stakeActive={stakeActive}
/>


  {/* TOKEN SWITCH */}

<div
  translate="no"
  className="
    notranslate
    flex
    items-center
    gap-3
    mb-4
  "
>

  <button
    translate="no"
    onClick={() => setGasToken("USDT")}
    className={`
      notranslate
      px-4
      py-2
      rounded-xl
      font-bold
      transition-all
      ${
        gasToken === "USDT"
          ? "bg-green-500 text-black"
          : "bg-white/5 text-white/60 border border-white/10"
      }
    `}
  >
    USDT
  </button>

  <button
    translate="no"
    onClick={() => setGasToken("EUSD")}
    className={`
      notranslate
      px-4
      py-2
      rounded-xl
      font-bold
      transition-all
      ${
        gasToken === "EUSD"
          ? "bg-blue-500 text-black"
          : "bg-white/5 text-white/60 border border-white/10"
      }
    `}
  >
    eDollar
  </button>

  {/* STATUS */}

  <div
    translate="no"
    className={`
      notranslate
      ml-auto
      px-3
      py-1
      rounded-full
      text-[10px]
      font-black
      uppercase
      tracking-widest
      ${
        (gasToken === "USDT" && usdtEnabled) ||
        (gasToken === "EUSD" && eusdEnabled)
          ? "bg-green-500/20 text-green-400 border border-green-500/30"
          : "bg-red-500/20 text-red-400 border border-red-500/30"
      }
    `}
  >
    {(gasToken === "USDT" && usdtEnabled) ||
    (gasToken === "EUSD" && eusdEnabled)
      ? "ACTIVE"
      : "PAUSED"}
  </div>

</div>

{/* BUY INPUT */}

<div
  translate="no"
  className="
    notranslate
    flex
    flex-col
    sm:flex-row
    gap-3
  "
>

  <input
    translate="no"
    inputMode="decimal"
    autoComplete="off"
    autoCorrect="off"
    spellCheck={false}
    type="text"
    placeholder={gasToken}
    value={amountInput.value}
    onChange={(e) => amountInput.onChange(e.target.value)}
    className="
      notranslate
      flex-1
      bg-black/40
      border
      border-white/10
      rounded-xl
      px-4
      py-3
      text-white
      w-full
    "
  />

  <button
    translate="no"
    disabled={
      (gasToken === "USDT" && !usdtEnabled) ||
      (gasToken === "EUSD" && !eusdEnabled)
    }
    onClick={() => {

      if (!amountInput.isValid) {
        alert("Valor inválido");
        return;
      }

      const parsed =
        parseUnits(amountInput.value, 18);

      if (gasToken === "USDT") {

        gas.buyGasUSDT(parsed);

      } else {

        gas.buyGasEUSD(parsed);
      }
    }}
    className={`
      notranslate
      px-6
      py-3
      rounded-xl
      font-black
      whitespace-nowrap
      min-w-[180px]
      transition-all
      ${
        (gasToken === "USDT" && !usdtEnabled) ||
        (gasToken === "EUSD" && !eusdEnabled)
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-[#D4AF37] text-black hover:scale-[1.02]"
      }
    `}
  >
    {(gasToken === "USDT" && !usdtEnabled) ||
    (gasToken === "EUSD" && !eusdEnabled)
      ? "PAUSED"
      : `Comprar com ${gasToken}`}
  </button>

</div>

  <p className="text-[10px] text-white/30 mt-2">
  Fuel your ecGas (mining capacity) with USDT or eDollar - ecGas powers your mining payout capacity
  </p>

</div>



<div className="mb-8">
  <RewardVelocityPanel
  pendingUSDT={pendingUSDT}
/>
</div>



<div className="mb-12">
  <ProjectedRewardsPanel
  pendingUSDT={pendingUSDT}
/>
</div>

<div className="mb-8">

  <APRPanel
    yearlyRewards={
      (pendingUSDT + pendingEUSD) * 365
    }
    stakedAmount={
      Number(mining.userStake)
    }
  />

</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          
          {/* Live Components */}

<div className="lg:col-span-3 space-y-6">

  <LiveRewardCounter
    pendingUSDT={pendingUSDT}
    pendingEUSD={pendingEUSD}
  />

  <StakingSecurityPanel />

  <RewardStreamIndicator />

  <RewardVelocity
    pending={
      pendingUSDT +
      pendingEUSD
    }
    totalStaked={
      Number(formatUnits(
        totalStaked || 0n,
        18
      ))
    }
  />

</div>  

          {/* PAINEL DE RECOMPENSAS (CLAIM) */}
<div className="lg:col-span-4">
            <div className="bg-gradient-to-b from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-1xs font-bold text-white flex items-center gap-2">
                    <Gift size={20} className="text-[#D4AF37]" /> Recompensas da Mineração
                  </h2>
                  <Clock size={16} className="text-white/30" />
                </div>

                <div className="text-center py-10 border-y border-white/5 mb-8">
                  <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">Disponível para Saque</span>
                  <div className="space-y-2 mb-1">
  <div className="text-3xl font-black text-green-400">
    {pendingUSDT.toFixed(7)} USDT
  </div>

  <div className="text-2xl font-bold text-blue-400">
    {pendingEUSD.toFixed(7)} eDollar
  </div>
</div>
                </div>
              </div>

              <div className="space-y-4">
                <button
  onClick={async () => {

  try {

    await mining.claim();

    alert("Claim realizado com sucesso!");

  } catch (err) {

    console.error(err);

    alert("Erro no claim");
  }
}}
  disabled={
  !mining.canClaim ||
  (pendingUSDT <= 0 && pendingEUSD <= 0)
}
  className={`w-full py-5 rounded-2xl font-black uppercase text-sm tracking-[0.2em] transition-all
    ${
      !mining.canClaim || mining.pending === 0
        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
        : "bg-white text-black hover:scale-[1.02]"
    }`}
>
  SACAR LUCROS
</button>
                <div className="flex items-center justify-center gap-2 text-white/30 text-[10px] uppercase font-bold">
                  <span>Cooldown: 10 Minutos</span>
                </div>
              </div>
            </div>
          </div>
          
        
          {/* PAINEL DE AÇÃO (STAKE/UNSTAKE) */}
<div className="lg:col-span-5 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ArrowUpCircle size={120} className="text-[#D4AF37]" />
              </div>

              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap size={20} className="text-[#D4AF37]" /> Gerenciar Mineração
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Quantia a Gerenciar</label>
                  <div className="relative">
                    <input
  translate="no"
  inputMode="decimal"
  autoComplete="off"
  autoCorrect="off"
  spellCheck={false}
  type="text"
  placeholder="0.00"
  value={amountInput.value}
  onChange={(e) => amountInput.onChange(e.target.value)}
  className="
    notranslate
    w-full
    bg-black/40
    border
    border-white/10
    rounded-2xl
    px-6
    py-4
    text-white
    text-xl
    font-bold
    focus:outline-none
    focus:border-[#D4AF37]/50
    transition-all
  "
/>
                   <button
  onClick={() => setStakePercentage(100)}
  className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-[#D4AF37] text-black px-3 py-1 rounded-md hover:bg-white transition-all"
>
  MÁX
</button>
                  </div>
                </div>

<div className="space-y-3">

  <div>

    <p className="text-[10px] text-white/40 mb-2 uppercase">
     % a Depositar
    </p>

    <div className="grid grid-cols-6 gap-2">

      {[1, 10, 25, 50, 75, 100].map((p) => (

        <button
          key={`stake-${p}`}
          onClick={() => setStakePercentage(p)}
          className="text-[10px] py-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
        >
          {p}%
        </button>

      ))}

    </div>

  </div>

  <div>

    <p className="text-[10px] text-white/40 mb-2 uppercase">
       % a Remover
    </p>

    <div className="grid grid-cols-6 gap-2">

      {[1, 10, 25, 50, 75, 100].map((p) => (

        <button
          key={`unstake-${p}`}
          onClick={() => setUnstakePercentage(p)}
          className="text-[10px] py-2 rounded-lg bg-red-500/10 border border-red-500/20 hover:border-red-400 hover:text-red-400 transition"
        >
          {p}%
        </button>

      ))}

    </div>

  </div>

</div>
                <div className="grid grid-cols-2 gap-4">
                  <button
  onClick={() => {

  if (!amountInput.isValid) {
    alert("Valor inválido");
    return;
  }

  mining.stake(amountInput.value);
}}
  className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-white text-black font-black py-4 rounded-2xl transition-all uppercase text-sm tracking-widest"
>
  <ArrowUpCircle size={18} /> Depositar
</button>


                  <button
  onClick={() => {

  if (!amountInput.isValid) {
    alert("Valor inválido");
    return;
  }

  mining.unstake(amountInput.value);
}}
  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-black py-4 rounded-2xl transition-all uppercase text-sm tracking-widest"
>
  <ArrowDownCircle size={18} /> Remover
</button>
                </div>
                
                <p className="text-[10px] text-center text-white/30 italic">
                  * Tempo mínimo de permanência: 5 minutos (MIN_DEPOSIT_TIME).
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

<div className="lg:col-span-12">
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <MiningHistoryPanel />
    </div>
  </div>
{/* Admin Panel */}
{isOwner && (
  <div className="lg:col-span-12">
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <AdminPage />
    </div>
  </div>
)}
                    

{/* WALLET DASHBOARD */}
  <div className="lg:col-span-12">
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
      <EcoinWalletDashboard />
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
