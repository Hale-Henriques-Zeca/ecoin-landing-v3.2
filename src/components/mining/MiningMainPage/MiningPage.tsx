"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, BarChart3, Wallet, 
  Settings, History, Gift, Coins, ShieldCheck, Award
} from "lucide-react";

import { useState, useEffect } from "react";
import { formatUnits } from "viem";
import { useRouter } from "next/navigation";

// Wagmi & Contracts
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";

// Contexts & Hooks
import { useTransactionState } from "@/hooks/useTransactionState";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useEcGas } from "@/hooks/useEcGas";
import { useRewardStreaming } from "@/hooks/useRewardStreaming";
import { useOverflowAnalytics } from "@/hooks/useOverflowAnalytics";

// Components
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AdminPage from "@/components/AdminPage";
import GasCapacityPanel from "@/components/GasCapacityPanel";
import MiningHistoryPanel from "@/components/MiningHistoryPanel";
import APRPanel from "@/components/APRPanel";
import ReferralCodePanel from "@/components/ReferralCodePanel";
import SimulatorRedirectCard from "@/components/Cards/SimulatorRedirectCard";
import ProfitSimulatorCard from "@/components/Cards/ProfitSimulatorCard";

// CTA & Footer
import { SmartPoolsCTA } from "@/components/CTA/SmartPoolsCTA/SmartPoolsCTA";
import { TeamLeaderCTA } from "@/components/CTA/TeamLeaderCTA/TeamLeaderCTA";

// Shareholder Sub-Tabs
import MiningTab from "@/components/mining/MiningTab";
import RecompensasTab from "@/components/mining/RecompensasTab";
import StakeTab from "@/components/mining/StakeTab";
import CommitmentSealTab from "@/components/mining/CommitmentSealTab";
import AnalyticsTab from "@/components/mining/AnalyticsTab";
import BottomNavigationMobile from "@/components/mining/BottomNavigationMobile";
import SocialFooter from "@/components/mining/SocialFooter";
import ReferralModal from "@/components/mining/ReferralModal";

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

export default function ShareholdersPage() {
  const { isConnected, address } = useAccount();
  const gas = useEcGas(address);
  
  const MINING_OWNER = process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  // 🗂️ NAVEGAÇÃO COMPATÍVEL COM SHAREHOLDERS
  const [activeTab, setActiveTab] = useState<string>("shareholders");
  const overflow = useOverflowAnalytics();
  const amountInput = useSafeNumberInput();

  const mining = useMiningStaking();

  const preview = gas.preview;
  const remainingCapacity = preview ? Number(formatUnits(preview[2], 18)) : 0;
  const usedCapacity = preview ? Number(formatUnits(preview[3], 18)) : 0;
  const maxCapacity = preview ? Number(formatUnits(preview[4], 18)) : 0;
  const csBalance = remainingCapacity; 
  const stakeActive = Number(mining.userStake) > 0; 
  const simulatedWillMine = remainingCapacity > 0 && stakeActive;

  const [projectionWindow, setProjectionWindow] = useState<"24h" | "7d" | "30d">("7d");

  const { data: pending } = useReadContract({ 
    abi: miningStakingAbi, 
    address: CONTRACTS.MINING_STAKING, 
    functionName: "pendingRewards", 
    chainId: 56, 
    args: address ? [address] : undefined 
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;

  const totalRewardsUSD = pendingUSDT + pendingEUSD;
  const withdrawFeeUSD = totalRewardsUSD * 0.01;
  const withdrawNetUSD = totalRewardsUSD - withdrawFeeUSD;

  const streaming = useRewardStreaming(address);

  const stats = {
    totalStaked: `${mining.total} eCoin`,
    myStake: `${mining.userStake} eCoin`,
    pendingUSDT: `${streaming.visualUSDT.toFixed(6)} USDT`,
    pendingEUSD: `${streaming.visualEUSD.toFixed(6)} eUSD`,
    totalStakers: mining.totalStakers.toString(),
    share: `${mining.share.toFixed(8)}%`,
  };

  const isOwner = isConnected && address && MINING_OWNER && address.toLowerCase() === MINING_OWNER;
    
  useEffect(() => {
    if (!isConnected) return;
    if (chainId !== 56) { switchChain({ chainId: 56 }); }
  }, [isConnected, chainId]);

  const claimTx = useTransactionState();

  useEffect(() => { 
    if (mining.claimConfirmed) { 
      claimTx.setState("success"); 
      setTimeout(() => { claimTx.setState("idle"); }, 2000); 
    } 
  }, [mining.claimConfirmed]);

  const menuItems = [
    { id: "shareholders", label: "Participação CS", icon: Award },
    { id: "recompensas", label: "Dividendos", icon: Gift },
    { id: "stake", label: "Staking Pool", icon: Coins },
    { id: "cs_vault", label: "Selo de Compromisso (CS)", icon: ShieldCheck },
    { id: "analytics", label: "Métricas", icon: BarChart3 },
    { id: "historico", label: "Histórico", icon: History },
    { id: "portfolio", label: "Portfolio CS", icon: Wallet },
    { id: "config", label: "Configurações", icon: Settings },
  ];

  const handleClaimRewards = async () => {
    try {
      claimTx.setState("wallet");
      await mining.claim();
      claimTx.setState("submitted");
    } catch (error) {
      console.error("Erro ao resgatar dividendos:", error);
      claimTx.setState("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#070708] text-white pt-20 pb-28 lg:pb-12 px-4 md:px-8 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* NAVEGAÇÃO LATERAL DESKTOP */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0d0d0f] border border-white/5 rounded-3xl p-4 h-fit sticky top-24 gap-2">
          <div className="px-3 py-2 mb-4 border-b border-white/5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs">CS</div>
            <span className="font-black tracking-wider text-sm">SHAREHOLDERS</span>
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition-all duration-200 cursor-pointer ${
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

        {/* CONTAINER PRINCIPAL DE CONTEÚDO */}
        <section className="flex-1 min-w-0">
          
          {/* HEADER PRINCIPAL */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d0d0f]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
                Painel de <span className="text-[#D4AF37]">Shareholders</span>
              </h1>
              <p className="text-xs text-white/40 mt-1">Gestão de Selos de Compromisso (CS) & Distribuição de Dividendos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold">Protocol CS v2.0</span>
              </div>
              <ConnectButton />
            </div>
          </div>

          {/* RENDERING CONDICIONAL DAS ABAS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* TAB 1: SHAREHOLDERS / PARTICIPAÇÃO */}
              {activeTab === "shareholders" && (
                <MiningTab setActiveTab={setActiveTab} />
              )}

              {/* TAB 2: DIVIDENDOS / RECOMPENSAS */}
              {activeTab === "recompensas" && (
                <RecompensasTab
                  pendingUSDT={pendingUSDT}
                  pendingEUSD={pendingEUSD}
                  totalRewardsUSD={totalRewardsUSD}
                  withdrawFeeUSD={withdrawFeeUSD}
                  withdrawNetUSD={withdrawNetUSD}
                  claimTxState={claimTx.state}
                  onClaim={handleClaimRewards}
                />
              )}

              {/* TAB 3: STAKING */}
              {activeTab === "stake" && ( <StakeTab /> )}

              {/* TAB 4: SELO DE COMPROMISSO (CS) */}
              {activeTab === "cs_vault" && ( <CommitmentSealTab /> )}

              {/* TAB 5: ANALYTICS */}
              {activeTab === "analytics" && (
                <AnalyticsTab
                  stats={stats}
                  pendingUSDT={pendingUSDT}
                  pendingEUSD={pendingEUSD}
                  usedCapacity={usedCapacity}
                  maxCapacity={maxCapacity}
                  overflow={overflow}
                />
              )}

              {/* TAB 6: HISTÓRICO */}
              {activeTab === "historico" && (
                <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                  <MiningHistoryPanel />
                </div>
              )}

              {/* TAB 7: PORTFOLIO DE CAPACIDADE CS */}
              {activeTab === "portfolio" && (
                <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                  <GasCapacityPanel
                    gasBalance={csBalance}
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
                  <APRPanel
                    yearlyRewards={(pendingUSDT + pendingEUSD) * 365}
                    stakedAmount={Number(mining.userStake)}
                    window={projectionWindow}
                    setWindow={setProjectionWindow}
                  />
                  <TeamLeaderCTA/>
                  <SimulatorRedirectCard />
                  <ProfitSimulatorCard />
                  <ReferralCodePanel />
                  {isOwner && (
                    <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
                      <AdminPage />
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <SmartPoolsCTA />
          <SocialFooter />
          <ReferralModal />
        </section>
      </div>

      <BottomNavigationMobile
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </main>
  );
}