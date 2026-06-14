"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, BarChart3, Wallet, 
  ArrowUpRight, RefreshCw, Settings, Database, 
  Activity, Play, Square, Fuel, Gift, Coins, History, TrendingUp, ShieldCheck, Zap, AlertCircle, ArrowDownCircle, ArrowUpCircle, Menu, Home, Newspaper, Users, User
} from "lucide-react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { formatUnits, parseUnits } from "viem";
import { Snowfall } from "react-snowfall";

// Icons
import { FaTelegramPlane, FaTelegram, FaWhatsapp, FaTwitter, FaDiscord } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

// Wagmi & Contracts
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useDisconnect, useSwitchChain, useChainId } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";

// Contexts & Hooks
import { useDexWallet } from "@/contexts/DexWalletContext";
import { useTransactionState } from "@/hooks/useTransactionState";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useEcGas } from "@/hooks/useEcGas";
import { useRewardStreaming } from "@/hooks/useRewardStreaming";
import { useOverflowAnalytics } from "@/hooks/useOverflowAnalytics";
import { useMiningFeeCollector } from "@/hooks/useMiningFeeCollector";

// Components
import ReferralModalContent from "@/components/ReferralModalContent";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AdminPage from "@/components/AdminPage";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";
import TxButton from "@/components/TxButton";
import { RewardsChart } from "@/components/RewardsChart";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";
import MiningPreviewPanel from "@/components/MiningPreviewPanel";
import GasCapacityPanel from "@/components/GasCapacityPanel";
import LiveRewardCounter from "@/app/Savings/components/LiveRewardCounter";
import StakingSecurityPanel from "@/app/Savings/components/StakingSecurityPanel";
import RewardStreamIndicator from "@/app/Savings/components/RewardStreamIndicator";
import RewardVelocity from "@/app/Savings/components/RewardVelocity";
import MiningAnalyticsPanel from "@/components/MiningAnalyticsPanel";
import RewardVelocityGraph from "@/components/RewardVelocityGraph";
import MiningHistoryPanel from "@/components/MiningHistoryPanel";
import APRPanel from "@/components/APRPanel";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import ReferralCodePanel from "@/components/ReferralCodePanel";

function useSafeNumberInput(initial = "") {
  const [value, setValue] = useState(initial);
  const onChange = (input: string) => {
    const raw = input.replace(",", ".").replace(/[^\d.]/g, "");
    if (/^\d*\.?\d*$/.test(raw)) {
      setValue(raw);
    }
  };
  const normalizedValue = value.replace(",", ".").trim() || "0";
  const isValid = value && !isNaN(Number(normalizedValue));
  return { value, normalizedValue, setValue, onChange, isValid };
}

const StatCard = ({ label, value, icon: Icon }: any) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl flex items-center gap-4 hover:border-[#D4AF37]/30 transition-all w-full">
    <div className={`p-3 rounded-xl bg-white/5 text-[#D4AF37]`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest">{label}</p>
      <p className="text-lg sm:text-xl font-black text-white">{value}</p>
    </div>
  </div>
);

export default function MiningPage() {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const gas = useEcGas(address);
  
  const MINING_OWNER = process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();
  const { data: hash, isPending } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });
  const feeCollector = useMiningFeeCollector();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  // 🗂️ ESTADO DE NAVEGAÇÃO POR ÍCONES (Tab Ativa)
  const [activeTab, setActiveTab] = useState<string>("minacao");
  const [showModal, setShowModal] = useState(false);
  const overflow = useOverflowAnalytics();
  const amountInput = useSafeNumberInput();
  const [gasToken, setGasToken] = useState<"USDT" | "EUSD">("USDT");

  const mining = useMiningStaking();

  const setStakePercentage = (percent: number) => {
    const balance = Number(mining.walletBalance || 0);
    const value = (balance * percent) / 100;
    amountInput.setValue(value.toString());
  };

  const setUnstakePercentage = (percent: number) => {
    const staked = Number(mining.userStake || 0);
    const value = (staked * percent) / 100;
    amountInput.setValue(value.toString());
  };

  const preview = gas.preview;
  const previewUSDT = preview ? Number(formatUnits(preview[0], 18)) : 0;
  const previewEUSD = preview ? Number(formatUnits(preview[1], 18)) : 0;
  const remainingCapacity = preview ? Number(formatUnits(preview[2], 18)) : 0;
  const usedCapacity = preview ? Number(formatUnits(preview[3], 18)) : 0;
  const maxCapacity = preview ? Number(formatUnits(preview[4], 18)) : 0;
  const gasBalance = remainingCapacity;  
  const stakeActive = Number(mining.userStake) > 0;  
  const simulatedWillMine = remainingCapacity > 0 && stakeActive;
  const totalPending = preview ? Number(formatUnits(preview[0], 18)) + Number(formatUnits(preview[1], 18)) : 0;

  const { data: usdtEnabled } = useReadContract({
  address: CONTRACTS.ECGAS_SALE,
  abi: ecGasSaleAbi,
  functionName: "usdtEnabled"
});

const { data: eusdEnabled } = useReadContract({
  address: CONTRACTS.ECGAS_SALE,
  abi: ecGasSaleAbi,
  functionName: "eusdEnabled"
});

  const { data: totalStaked } = useReadContract({ abi: miningStakingAbi, address: CONTRACTS.MINING_STAKING, functionName: "totalStaked", chainId: 56 });
  const { data: totalStakers } = useReadContract({ abi: miningStakingAbi, address: CONTRACTS.MINING_STAKING, functionName: "totalStakers", chainId: 56 });
  const { data: pending } = useReadContract({ abi: miningStakingAbi, address: CONTRACTS.MINING_STAKING, functionName: "pendingRewards", chainId: 56, args: address ? [address] : undefined });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;
  const streaming = useRewardStreaming(address);

  const stats = {
    totalStaked: `${mining.total} eCoin`,
    myStake: `${mining.userStake} eCoin`,
    pendingUSDT: `${streaming.visualUSDT.toFixed(6)} USDT`,
    pendingEUSD: `${streaming.visualEUSD.toFixed(6)} eUSD`,
    totalStakers: mining.totalStakers.toString(),
    share: `${mining.share.toFixed(4)}%`,
  };

  const isOwner = isConnected && address && MINING_OWNER && address.toLowerCase() === MINING_OWNER;
    
  useEffect(() => {
    if (!isConnected) return;
    if (chainId !== 56) { switchChain({ chainId: 56 }); }
  }, [isConnected, chainId]);

  const depositTx = useTransactionState();
  const claimTx = useTransactionState();
  const gasTx = useTransactionState();

  useEffect(() => { if (mining.stakePending) { depositTx.setState("confirming"); } }, [mining.stakePending]);
  useEffect(() => { if (mining.stakeConfirmed) { depositTx.setState("success"); setTimeout(() => { depositTx.setState("idle"); }, 2000); } }, [mining.stakeConfirmed]);
  useEffect(() => { if (mining.claimConfirmed) { claimTx.setState("success"); setTimeout(() => { claimTx.setState("idle"); }, 2000); } }, [mining.claimConfirmed]);
  useEffect(() => { if (gas.gasPending) { gasTx.setState("confirming"); } }, [gas.gasPending]);
  useEffect(() => { if (gas.gasConfirmed) { gasTx.setState("success"); setTimeout(() => { gasTx.setState("idle"); }, 2000); } }, [gas.gasConfirmed]);

  // Definição Completa dos Itens de Menu Nativos
  const menuItems = [
    { id: "minacao", label: "Mineração", icon: Cpu },
    { id: "recompensas", label: "Recompensas", icon: Gift },
    { id: "stake", label: "Stake", icon: Coins },
    { id: "gas", label: "Gas Vault", icon: Fuel },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "historico", label: "Histórico", icon: History },
    { id: "Portfolio", label: "Portfolio", icon: Wallet },
    { id: "config", label: "Configurações", icon: Settings },
  ];

  return (
    <main className="min-h-screen bg-[#070708] text-white pt-20 pb-28 lg:pb-12 px-4 md:px-8 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* =========================================================================
            1. LATERAL NAVIGATION (APENAS LAPTOP & DESKTOP)
           ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0d0d0f] border border-white/5 rounded-3xl p-4 h-fit sticky top-24 gap-2">
          <div className="px-3 py-2 mb-4 border-b border-white/5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs">E</div>
            <span className="font-black tracking-wider text-sm">E-COIN SYSTEM</span>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 ${
                  isActive 
                    ? "bg-[#D4AF37] text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)]" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* =========================================================================
            CONTAINER PRINCIPAL DE CONTEÚDO
           ========================================================================= */}
        <section className="flex-1 min-w-0">
          
          {/* HEADER DO WEBSITE */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d0d0f]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
                Dashboard de <span className="text-[#D4AF37]">Mineração</span>
              </h1>
              <p className="text-xs text-white/40 mt-1">Poupança da Mineração Neural de IA eCoin</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold">v2.0.19</span>
              </div>
              <ConnectButton />
            </div>
          </div>

          <BlockchainDeviceAlert />

          {/* RENDERING CONDICIONAL DAS SEÇÕES */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              
              {/* TAB 1: MINERAÇÃO (HOME / VISÃO GERAL) */}
{activeTab === "minacao" && (
  <>
    {/* GRID DE ÍCONES EXCLUSIVA PARA CELULARES */}
    <div className="block lg:hidden">
      <div className="grid grid-cols-2 gap-3 mb-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={`mobile-grid-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className="bg-[#0d0d0f] border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-all text-center group"
            >
              <div className="p-3 rounded-xl bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                <Icon size={26} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-white/80">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>

    

    {/* 🌟 CORREÇÃO AQUI: Mudamos de 'hidden lg:grid' para 'grid grid-cols-1 lg:grid-cols-12 gap-6' */}
    {/* O gráfico e o contador live vão empilhar no mobile e ficar lado a lado no desktop */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white/80 mb-4">📊 Fluxo de Recompensas (USDT)</h3>
        <RewardVelocityGraph pendingUSDT={pendingUSDT} />
      </div>
      <div className="lg:col-span-5 flex flex-col gap-4">
        <LiveRewardCounter pendingUSDT={pendingUSDT} pendingEUSD={pendingEUSD} />
        <RewardStreamIndicator />
      </div>
    </div>
  </>
)}

              {/* TAB 2: RECOMPENSAS */}
              {activeTab === "recompensas" && (
                <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#D4AF37]/10 to-[#0d0d0f] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-md font-bold uppercase tracking-wider flex items-center gap-2 text-[#D4AF37]">
                      <Gift size={20} /> Recompensas Disponíveis
                    </h2>
                  </div>
                  <div className="text-center py-8 border-y border-white/5 mb-6">
                    <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">Pronto para Retirada</span>
                    <div className="space-y-2">
                      <div className="text-3xl font-black text-emerald-400">{pendingUSDT.toFixed(7)} USDT</div>
                      <div className="text-2xl font-bold text-blue-400">{pendingEUSD.toFixed(7)} eDollar</div>
                    </div>
                  </div>
                  <TxButton
                    state={claimTx.state}
                    idleText="SACAR RECOMPENSAS"
                    className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#D4AF37] text-black hover:bg-white transition-all"
                    onClick={async () => {
                      try {
                        claimTx.setState("wallet");
                        await mining.claim();
                        claimTx.setState("submitted");
                      } catch {
                        claimTx.setState("error");
                      }
                    }}
                  />
                  <div className="text-center text-[10px] text-white/30 mt-3">Cooldown Ativo de 10 minutos.</div>
                </div>
              )}

              {/* TAB 3: STAKE */}
              {activeTab === "stake" && (
                <div className="max-w-2xl mx-auto bg-[#0d0d0f] border border-white/5 rounded-3xl p-6 md:p-8">
                  <h2 className="text-md font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-[#D4AF37]">
                    <Zap size={20} /> Gerenciar Depósito de eCoin
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Quantia a Enviar</label>
                      <div className="relative">
                        <input
                          inputMode="decimal"
                          type="text"
                          placeholder="0.00"
                          value={amountInput.value}
                          onChange={(e) => amountInput.onChange(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-lg font-bold focus:outline-none focus:border-[#D4AF37]/50"
                        />
                        <button onClick={() => setStakePercentage(100)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-[#D4AF37] text-black px-2.5 py-1 rounded">MAX</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">% a Depositar</p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[25, 50, 100].map((p) => (
                            <button key={`st-${p}`} onClick={() => setStakePercentage(p)} className="text-[10px] py-2 rounded bg-white/5 border border-white/5 hover:border-[#D4AF37] transition">{p}%</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">% a Remover</p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[25, 50, 100].map((p) => (
                            <button key={`un-${p}`} onClick={() => setUnstakePercentage(p)} className="text-[10px] py-2 rounded bg-red-500/5 border border-red-500/10 hover:border-red-500 transition text-red-400">{p}%</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <TxButton
                        state={depositTx.state}
                        idleText="DEPOSITAR"
                        className="bg-[#D4AF37] text-black font-black py-4 rounded-xl text-xs tracking-wider uppercase hover:bg-white transition-all"
                        onClick={async () => {
                          try {
                            depositTx.setState("wallet");
                            await mining.stake(amountInput.normalizedValue);
                            depositTx.setState("submitted");
                          } catch { depositTx.setState("error"); }
                        }}
                      />
                      <button
                        onClick={() => {
                          if (!amountInput.isValid) { alert("Valor inválido"); return; }
                          mining.unstake(amountInput.normalizedValue);
                        }}
                        className="bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-xs tracking-wider uppercase hover:bg-white/10 transition-all"
                      >
                        REMOVER
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GAS VAULT */}
              {activeTab === "gas" && (
                <div className="max-w-2xl mx-auto bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 text-[#D4AF37]">
                    <Fuel size={18} /> Gas Vault (ecGas)
                  </h3>
                  
                  <div className="flex gap-2 my-4">
                    {["USDT", "EUSD"].map((tk) => (
                      <button
                        key={tk}
                        onClick={() => setGasToken(tk as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${gasToken === tk ? "bg-[#D4AF37] text-black" : "bg-white/5 text-white/60"}`}
                      >
                        {tk}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={`Valor em ${gasToken}`}
                      value={amountInput.value}
                      onChange={(e) => amountInput.onChange(e.target.value)}
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white"
                    />
                    <TxButton
                      state={gasTx.state}
                      idleText="COMPRAR GAS"
                      className="px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl text-xs uppercase"
                      onClick={async () => {
                        try {
                          if (!amountInput.isValid) return;
                          gasTx.setState("wallet");
                          const parsed = parseUnits(amountInput.normalizedValue, 18);
                          if (gasToken === "USDT") { await gas.buyGasUSDT(parsed); } 
                          else { await gas.buyGasEUSD(parsed); }
                          gasTx.setState("submitted");
                        } catch { gasTx.setState("error"); }
                      }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: ANALYTICS */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* 🌟 CORREÇÃO AQUI: Mudamos de 'hidden lg:grid' para 'grid grid-cols-2 lg:grid-cols-4 gap-4' */}
    {/* Agora os cards de status aparecem em 2 colunas no mobile e 4 colunas no desktop */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Depósitos Globais" value={stats.totalStaked} icon={ShieldCheck} />
      <StatCard label="Mineradores Ativos" value={stats.totalStakers} icon={TrendingUp} />
      <StatCard label="Meu Depósito" value={stats.myStake} icon={Coins} />
      <StatCard label="Ganhos Estimados" value={stats.share} icon={Zap} />
    </div>
                  <MiningAnalyticsPanel
                    totalRewards={pendingUSDT + pendingEUSD}
                    totalGasUsed={usedCapacity}
                    efficiency={maxCapacity > 0 ? (usedCapacity / maxCapacity) * 100 : 0}
                    sessions={5}
                    recycled={overflow.totalUSDT + overflow.totalEUSD}
                    apr={148.22}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RewardVelocity pending={pendingUSDT + pendingEUSD} totalStaked={Number(formatUnits(totalStaked || 0n, 18))} />
                    <APRPanel yearlyRewards={(pendingUSDT + pendingEUSD) * 365} stakedAmount={Number(mining.userStake)} />
                  </div>
                  <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                  <EcoinWalletDashboard />
                </div>
                </div>
              )}

              {/* TAB 6: HISTÓRICO */}
              {activeTab === "historico" && (
                <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                  <MiningHistoryPanel />
                </div>
              )}

              {/* TAB 7: Portfolio */}
              {activeTab === "Portfolio" && (
                <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                  <GasCapacityPanel
                    gasBalance={gasBalance}
                    maxCapacity={maxCapacity}
                    usedCapacity={usedCapacity}
                    remainingCapacity={remainingCapacity}
                    willMine={simulatedWillMine}
                    stakeActive={stakeActive}
                  />
                </div>
              )}

              {/* TAB 8: CONFIGURAÇÕES */}
              {activeTab === "config" && (
                <div className="space-y-6">
                  <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                    <ReferralCodePanel />
                  </div>
                  {isOwner && (
                    <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                      <AdminPage />
                    </div>
                  )}
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          

          {/* SMART POOLS CALL TO ACTION */}
          <div className="mt-8 flex justify-center w-full">
            <Link href="ecoin-buyback-engine" className="inline-block px-6 py-2.5 text-xs font-semibold text-cyan-400 border border-cyan-500/20 rounded-xl bg-cyan-500/5 hover:bg-cyan-500 hover:text-white transition-all duration-300">
              Saiba mais de Smart Pools
            </Link>
          </div>
          
          

          {/* SOCIAL FOOTER */}
          <div className="mt-12 pt-6 border-t border-white/5 flex flex-col items-center gap-4 text-white/40 text-xs">
            <p>Conecte-se à comunidade E-Coin</p>
            <div className="flex gap-6 text-lg text-[#D4AF37]">
              <a href="https://t.me/ecoin2026" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
              <a href="https://x.com/CoinE28810" target="_blank" rel="noreferrer"><FaTwitter /></a>
              <a href="https://discord.com" target="_blank" rel="noreferrer"><FaDiscord /></a>
              <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            </div>
            <button onClick={() => setShowModal(true)} className="mt-2 bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black text-xs font-bold py-2.5 px-6 rounded-full uppercase tracking-wider">
              🎁 Convidar Amigos
            </button>
          </div>
        </section>
      </div>

      {/* =========================================================================
          2. BOTTOM NAVIGATION MOBILE (ALINHADA À SUA IMAGEM DE REFERÊNCIA)
         ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0f]/95 border-t border-white/10 backdrop-blur-md z-50 px-2 py-2 flex items-center justify-around">
        
        {/* Botão Início (Volta para a tela de ícones/Mineração) */}
        <button
          onClick={() => setActiveTab("minacao")}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${activeTab === "minacao" ? "text-[#D4AF37]" : "text-white/40"}`}
        >
          <Home size={20} className={activeTab === "minacao" ? "scale-110" : ""} />
          <span className="text-[9px] font-medium tracking-tight">Início</span>
        </button>

        {/* Botão Notícias (Redireciona ou ativa os Analytics) */}
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${activeTab === "analytics" ? "text-[#D4AF37]" : "text-white/40"}`}
        >
          <Newspaper size={20} className={activeTab === "analytics" ? "scale-110" : ""} />
          <span className="text-[9px] font-medium tracking-tight">Notícias</span>
        </button>

        {/* Botão Referral (Abre o Modal diretamente ou vai para Configs) */}
        <button
          onClick={() => { setActiveTab("config"); setShowModal(true); }}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${showModal ? "text-[#D4AF37]" : "text-white/40"}`}
        >
          <Users size={20} className={showModal ? "scale-110" : ""} />
          <span className="text-[9px] font-medium tracking-tight">Referral</span>
        </button>

        {/* Botão Perfil (Abre as Configurações da Conta) */}
        <button
          onClick={() => setActiveTab("config")}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${activeTab === "config" ? "text-[#D4AF37]" : "text-white/40"}`}
        >
          <User size={20} className={activeTab === "config" ? "scale-110" : ""} />
          <span className="text-[9px] font-medium tracking-tight">Perfil</span>
        </button>
      </nav>

      {/* REFERRAL MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0d0d0f] p-6 rounded-2xl border border-[#00FF9C]/30 w-full max-w-sm">
            <h3 className="text-[#00FF9C] text-md font-bold uppercase tracking-wider mb-4">Referral System Dashboard</h3>
            <ReferralModalContent />
          </div>
        </div>
      )}
    </main>
  );
}