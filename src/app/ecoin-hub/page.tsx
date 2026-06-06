"use client"

import React, { useState, useEffect } from 'react';
import { 
  Shield, Zap, Gift, Clock, TrendingUp, Lock, 
  Coins, Cpu, Fuel, Award, RefreshCw, ChevronRight 
} from 'lucide-react';
import { BsStars } from "react-icons/bs";
import { Snowfall } from "react-snowfall";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatUnits, parseUnits } from "viem";
import { erc20Abi } from "viem";

// WAGMI & HOOKS
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useDisconnect,
  useSwitchChain, 
  useChainId
} from "wagmi";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useEcGas } from "@/hooks/useEcGas";
import { useRewardStreaming } from "@/hooks/useRewardStreaming";
import { useMiningFeeCollector } from "@/hooks/useMiningFeeCollector";
import { useOverflowAnalytics } from "@/hooks/useOverflowAnalytics";
import { usePublicClient } from "wagmi";

// CONTRACTS & ABIS
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";

// COMPONENTS
import GasCapacityPanel from "@/components/GasCapacityPanel";
import ReferralModalContent from "@/components/ReferralModalContent";
import AdminPage from "@/components/AdminPage";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";
import { RewardsChart } from "@/components/RewardsChart";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";
import MiningPreviewPanel from "@/components/MiningPreviewPanel";
import LiveRewardCounter from "@/app/Savings/components/LiveRewardCounter";
import StakingSecurityPanel from "@/app/Savings/components/StakingSecurityPanel";
import RewardStreamIndicator from "@/app/Savings/components/RewardStreamIndicator";
import RewardVelocity from "@/app/Savings/components/RewardVelocity";
import MiningAnalyticsPanel from "@/components/MiningAnalyticsPanel";
import RewardVelocityGraph from "@/components/RewardVelocityGraph";
import MiningHistoryPanel from "@/components/MiningHistoryPanel";
import APRPanel from "@/components/APRPanel";


// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================
function useSafeNumberInput(initial = "") {
  const [value, setValue] = useState(initial);

  const onChange = (input: string) => {
    const raw = input.replace(",", ".").replace(/[^\d.]/g, "");
    if (/^\d*\.?\d*$/.test(raw)) {
      setValue(raw);
    }
  };

  const isValid = value && !isNaN(Number(value));

  return {
    value,
    setValue,
    onChange,
    isValid,
  };
}

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


// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function ECoinHub() {
  
  // ESTADOS DE SIMULAÇÃO (PoS Vivo)
  const [isStaking, setIsStaking] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [myStake, setMyStake] = useState(1250);
  const [totalNetworkStake, setTotalNetworkStake] = useState(4859203);
  const [rewardsEarned, setRewardsEarned] = useState(34.82);

  useEffect(() => {
    const interval = setInterval(() => {
      if (myStake > 0) {
        setRewardsEarned(prev => prev + 0.0001);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [myStake]);

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stakeAmount || isNaN(Number(stakeAmount))) return;
    
    setIsStaking(true);
    setTimeout(() => {
      setMyStake(prev => prev + parseFloat(stakeAmount));
      setTotalNetworkStake(prev => prev + parseFloat(stakeAmount));
      setStakeAmount('');
      setIsStaking(false);
    }, 1500);
  };

  // WEB3 & WAGMI STATES
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const gas = useEcGas(address);
  const feeCollector = useMiningFeeCollector();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const publicClient = usePublicClient({ chainId: 56 });
  const mining = useMiningStaking();
  const overflow = useOverflowAnalytics();
  const streaming = useRewardStreaming(address);

  const MINING_OWNER = process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();
  const isOwner = isConnected && address && MINING_OWNER && address.toLowerCase() === MINING_OWNER;

  // ESTADOS GERAIS
  const [gasToken, setGasToken] = useState<"USDT" | "EUSD">("USDT");
  const amountInput = useSafeNumberInput();
  
  // PARSE DATA DO PREVIEW DE GÁS
  const preview = gas.preview;
  const remainingCapacity = preview ? Number(formatUnits(preview[2], 18)) : 0;
  const usedCapacity = preview ? Number(formatUnits(preview[3], 18)) : 0;
  const maxCapacity = preview ? Number(formatUnits(preview[4], 18)) : 0;
  
  const stakeActive = Number(mining.userStake) > 0;  
  const simulatedWillMine = remainingCapacity > 0 && stakeActive;

  // LEITURA DE CONTRATOS
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

  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    chainId: 56,
    args: address ? [address] : undefined,
  });

  // DUAL REWARDS
  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;

  useEffect(() => {
    if (!isConnected) return;
    if (chainId !== 56) {
      switchChain({ chainId: 56 });
    }
  }, [isConnected, chainId]);

  return (
    <section className="pt-28 pb-10 px-4 min-h-screen">
      <div className="w-full max-w-6xl mx-auto p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans relative">
        
        {/* Efeitos de Luz de Fundo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* HEADER DO HUB */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 border-b border-slate-800 gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Proof of Stake (PoS) Validated Hub
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              eCoin Hub
            </h1>
          </div>
          
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl backdrop-blur-md">
            <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-semibold">Eco-Friendly Efficiency</p>
              <p className="text-sm font-bold text-emerald-400">99.9% mais limpo sem consumo de energia</p>
            </div>
          </div>
        </div>

        {/* ======================================= */}
        {/* TOP METRICS SECTION (Staking) */}
        {/* ======================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-10">
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-emerald-500/40">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Seu Active Stake</p>
              <Lock className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">{myStake.toLocaleString()} <span className="text-sm text-slate-500">eCoin</span></p>
            <p className="text-xs text-slate-400">Garantindo a segurança da rede</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-blue-500/40">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Recompensas Acumuladas</p>
              <Award className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-400 mb-1 font-mono">
              {rewardsEarned.toFixed(4)}
            </p>
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" /> Atualizando ao vivo
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl transition-all duration-300 hover:border-purple-500/40">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Taxa de Rendimento (APY)</p>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white mb-1">14.2%</p>
            <p className="text-xs text-purple-400 font-medium">Flexível baseado no Stake Global</p>
          </div>
        </div>


        {/* ======================================= */}
        {/* MAIN ACTION GRID (3 COLUNAS) */}
        {/* ======================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          
          {/* COLUNA 1: MÉTRICAS GLOBAIS E DELEGATE */}
          <div className="flex flex-col gap-6">
            
            {/* Global Metrics */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Métricas Globais da Rede</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Coins className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold">Total em Staking</p>
                      <p className="text-[10px] text-slate-500">Garantia depositada por validadores</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-white">{totalNetworkStake.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold">Poder de Processamento</p>
                      <p className="text-[10px] text-slate-500">vs ASICs Bitcoin</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2.5 py-1 rounded-full">Praticamente Zero</span>
                </div>
              </div>
            </div>

            {/* Delegate Form */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white">Delegar eCoin</h2>
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <form onSubmit={handleStake} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Quantia para Travar</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.00"
                      disabled={isStaking}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400">eCoin</span>
                  </div>
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-[11px] text-slate-500">Saldo: 4,500 eCoin</span>
                    <button type="button" onClick={() => setStakeAmount('4500')} className="text-[11px] text-emerald-400 font-bold hover:underline">
                      MAX
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800/80 p-3 rounded-xl space-y-1.5 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Bloqueio mínimo:</span>
                    <span className="text-white font-medium">Flexível</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Validação de Bloco:</span>
                    <span className="text-emerald-400 font-medium">~ 2.5s</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isStaking || !stakeAmount}
                  className={`w-full py-4 rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95
                    ${isStaking ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20"}`}
                >
                  {isStaking ? (
                    <><RefreshCw className="w-4 h-4 animate-spin" /> Validando...</>
                  ) : (
                    <><ChevronRight className="w-4 h-4" /> Iniciar Staking Seguros</>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* COLUNA 2: GAS VAULT */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col h-full">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Fuel size={18} className="text-[#D4AF37]" />
              Gas Vault (ecGas)
            </h3>

            <div className="mb-6">
              <GasCapacityPanel
                gasBalance={remainingCapacity}
                maxCapacity={maxCapacity}
                usedCapacity={usedCapacity}
                remainingCapacity={remainingCapacity}
                willMine={simulatedWillMine}
                stakeActive={stakeActive}
              />
            </div>

            {/* Token Switcher */}
            <div className="flex items-center gap-2 mb-4 bg-black/20 p-1.5 rounded-xl border border-white/5">
              <button
                onClick={() => setGasToken("USDT")}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${gasToken === "USDT" ? "bg-green-500 text-black shadow-md" : "text-white/50 hover:text-white"}`}
              >
                USDT
              </button>
              <button
                onClick={() => setGasToken("EUSD")}
                className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${gasToken === "EUSD" ? "bg-blue-500 text-black shadow-md" : "text-white/50 hover:text-white"}`}
              >
                eDollar
              </button>
            </div>

            {/* Status do Token Selecionado */}
            <div className={`mb-4 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest
              ${((gasToken === "USDT" && usdtEnabled) || (gasToken === "EUSD" && eusdEnabled)) ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
              {((gasToken === "USDT" && usdtEnabled) || (gasToken === "EUSD" && eusdEnabled)) ? "ACTIVE" : "PAUSED"}
            </div>

            {/* Buy Input */}
            <div className="flex flex-col gap-3 mt-auto">
              <input
                type="text"
                placeholder={`Valor em ${gasToken}`}
                value={amountInput.value}
                onChange={(e) => amountInput.onChange(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
              />
              <button
                disabled={(!usdtEnabled && gasToken === "USDT") || (!eusdEnabled && gasToken === "EUSD")}
                onClick={() => {
                  if (!amountInput.isValid) { alert("Valor inválido"); return; }
                  const parsed = parseUnits(amountInput.value, 18);
                  if (gasToken === "USDT") gas.buyGasUSDT(parsed);
                  else gas.buyGasEUSD(parsed);
                }}
                className={`w-full py-3 rounded-xl font-black text-sm transition-all ${
                  (!usdtEnabled && gasToken === "USDT") || (!eusdEnabled && gasToken === "EUSD")
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-[#D4AF37] text-black hover:scale-[1.02]"
                }`}
              >
                Comprar com {gasToken}
              </button>
            </div>
            <p className="text-[10px] text-white/30 mt-3 text-center leading-relaxed">
              Fuel your ecGas with USDT or eDollar - ecGas powers your mining payout capacity.
            </p>
          </div>

          {/* COLUNA 3: PAINEL DE CLAIM (SAQUE) */}
          <div className="bg-gradient-to-b from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 rounded-3xl p-6 backdrop-blur-xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Gift size={20} className="text-[#D4AF37]" /> Recompensas
                </h2>
                <Clock size={16} className="text-[#D4AF37]/50" />
              </div>

              <div className="text-center py-10 bg-black/20 rounded-2xl border border-[#D4AF37]/10 mb-8">
                <span className="text-[10px] text-white/50 uppercase tracking-widest block mb-4">Disponível para Saque</span>
                <div className="space-y-3">
                  <div className="text-3xl font-black text-green-400">
                    {pendingUSDT.toFixed(6)} <span className="text-sm text-green-400/50">USDT</span>
                  </div>
                  <div className="w-12 h-[1px] bg-white/10 mx-auto"></div>
                  <div className="text-2xl font-bold text-blue-400">
                    {pendingEUSD.toFixed(6)} <span className="text-sm text-blue-400/50">eUSD</span>
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
                disabled={!mining.canClaim || (pendingUSDT <= 0 && pendingEUSD <= 0)}
                className={`w-full py-4 rounded-xl font-black uppercase text-sm tracking-[0.1em] transition-all
                  ${!mining.canClaim || (pendingUSDT <= 0 && pendingEUSD <= 0)
                    ? "bg-black/40 text-white/20 border border-white/5 cursor-not-allowed"
                    : "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-[1.02]"
                  }`}
              >
                Sacar Lucros
              </button>
              <div className="flex items-center justify-center gap-2 text-[#D4AF37]/50 text-[10px] uppercase font-bold">
                <span>Cooldown de segurança: 10 Minutos</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}