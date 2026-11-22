"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  BarChart3,
  Wallet,
  Settings,
  History,
  Gift,
  Coins,
  ShieldCheck,
} from "lucide-react";
import { formatUnits } from "viem";

// Wagmi & Contracts
import {
  useAccount,
  useReadContracts,
  useSwitchChain,
  useChainId,
} from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";

// Hooks
import { useTransactionStateeCoin } from "@/hooks/eCoinMining/useTransactionStateeCoin";
import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";

// Components
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AdminPage from "@/components/mining/eCoin/MiningMainPage/Components/AdminPage";
import GasCapacityPanel from "@/components/mining/eCoin/MiningMainPage/Components/GasCapacityPanel";
import MiningHistoryPanel from "@/components/mining/eCoin/MiningMainPage/Components/MiningHistoryPanel";
import ReferralCodePanel from "@/components/ReferralCodePanel/ReferralCodePanel";
import SimulatorRedirectCard from "@/components/Cards/SimulatorRedirectCard";
import ProfitSimulatorCard from "@/components/Cards/ProfitSimulatorCard";

// CTA & Footer
import { SmartPoolsCTA } from "@/components/CTA/SmartPoolsCTA/SmartPoolsCTA";
import { TeamLeaderCTA } from "@/components/CTA/TeamLeaderCTA/TeamLeaderCTA";

// Shareholder Sub-Tabs (eCoin)
import MiningTab from "@/components/mining/eCoin/MiningTab";
import RecompensasTab from "@/components/mining/eCoin/RecompensasTab";
import StakeTab from "@/components/mining/eCoin/StakeTab";
import CommitmentSealTab from "@/components/mining/eCoin/CommitmentSealTab";
import AnalyticsTab from "@/components/mining/eCoin/AnalyticsTab";
import SocialFooter from "@/components/mining/eCoin/SocialFooter";
import ReferralModal from "@/components/mining/eCoin/ReferralModal";

export default function ShareholdersPage() {
  const { isConnected, address } = useAccount();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();

  const mining = useMiningStakingeCoin();
  const claimTx = useTransactionStateeCoin();

  // 🗂️ NAVEGAÇÃO COMPATÍVEL COM SHAREHOLDERS
  const [activeTab, setActiveTab] = useState<string>("shareholders");
  const [visualECoin, setVisualECoin] = useState<number>(0);

  // Endereço do Owner/Upline lido diretamente de CONTRACTS (sem .env)
  const contractsRecord = CONTRACTS as Record<string, string | undefined>;
  const configOwnerAddress = (
    contractsRecord.MINING_OWNER ??
    contractsRecord.OWNER ??
    contractsRecord.ADMIN ??
    ""
  ).toLowerCase();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  const baseContracts = [
    {
      ...contractConfig,
      functionName: "owner",
    },
    {
      ...contractConfig,
      functionName: "totalStaked",
    },
    {
      ...contractConfig,
      functionName: "totalStakers",
    },
    {
      ...contractConfig,
      functionName: "totalEligibleStaked",
    },
  ] as const;

  const userContracts = address
    ? ([
        {
          ...contractConfig,
          functionName: "users",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "userShareBP",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "pendingRewards",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "preview",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "rewardRates",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "isMiningActive",
          args: [address],
        },
      ] as const)
    : ([] as const);

  const { data: contractReads } = useReadContracts({
    contracts: [...baseContracts, ...userContracts],
    query: {
      refetchInterval: 10000,
    },
  });

  // Leituras Globais do ECoinMiningStakingECoin
  const onChainOwner =
    contractReads?.[0]?.status === "success"
      ? String(contractReads[0].result).toLowerCase()
      : "";

  const totalStaked =
    contractReads?.[1]?.status === "success"
      ? Number(formatUnits((contractReads[1].result as bigint) ?? 0n, 18))
      : Number(mining.total ?? 0);

  const totalStakers =
    contractReads?.[2]?.status === "success"
      ? Number(contractReads[2].result ?? 0)
      : Number(mining.totalStakers ?? 0);

  // Leituras do Usuário no ECoinMiningStakingECoin
  const rawUserInfo =
    address && contractReads?.[4]?.status === "success"
      ? (contractReads[4].result as readonly [bigint, bigint, bigint])
      : undefined;
  const userStake = rawUserInfo
    ? Number(formatUnits(rawUserInfo[0] ?? 0n, 18))
    : Number(mining.userStake ?? 0);

  const userShareBP =
    address && contractReads?.[5]?.status === "success"
      ? Number(contractReads[5].result ?? 0)
      : 0;
  const userSharePercent =
    userShareBP > 0 ? userShareBP / 100 : Number(mining.share ?? 0);

  const pendingECoin =
    address && contractReads?.[6]?.status === "success"
      ? Number(formatUnits((contractReads[6].result as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin ?? 0);

  // preview(address) -> (pendingECoin, remainingCapacity, usedCapacity, maxCapacity, willAccumulate)
  const rawPreview =
    address && contractReads?.[7]?.status === "success"
      ? (contractReads[7].result as readonly [
          bigint,
          bigint,
          bigint,
          bigint,
          boolean
        ])
      : undefined;

  const remainingCapacity = rawPreview
    ? Number(formatUnits(rawPreview[1] ?? 0n, 18))
    : Number(mining.previewData?.remainingCapacity ?? 0);

  const usedCapacity = rawPreview
    ? Number(formatUnits(rawPreview[2] ?? 0n, 18))
    : Number(mining.previewData?.usedCapacity ?? 0);

  const maxCapacity = rawPreview
    ? Number(formatUnits(rawPreview[3] ?? 0n, 18))
    : Number(mining.previewData?.maxCapacity ?? 0);

  // rewardRates(address) -> (ecoinPerSecond, ecoinPerMinute, ecoinPerHour, ecoinPerDay)
  const rawRates =
    address && contractReads?.[8]?.status === "success"
      ? (contractReads[8].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;
  const ecoinPerSecond = rawRates
    ? Number(formatUnits(rawRates[0] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerSecond ?? 0);

  const isMiningActive =
    address && contractReads?.[9]?.status === "success"
      ? Boolean(contractReads[9].result)
      : rawPreview
      ? Boolean(rawPreview[4])
      : Boolean(mining.isMiningActive);

  const stakeActive = userStake > 0;
  const simulatedWillMine = isMiningActive && remainingCapacity > 0 && stakeActive;

  // Stream visual em tempo real baseado em pendingECoin + ecoinPerSecond on-chain
  useEffect(() => {
    setVisualECoin(pendingECoin);

    if (!isMiningActive || ecoinPerSecond <= 0) return;

    const timer = setInterval(() => {
      setVisualECoin((prev) => prev + ecoinPerSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingECoin, ecoinPerSecond, isMiningActive]);

  // Verificação de Owner via CONTRACTS ou OwnableUpgradeable.owner()
  const resolvedOwner = configOwnerAddress || onChainOwner;
  const isOwner = Boolean(
    isConnected &&
      address &&
      resolvedOwner &&
      address.toLowerCase() === resolvedOwner
  );

  const stats = {
    totalStaked: `${totalStaked.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} eCoin`,
    myStake: `${userStake.toLocaleString("en-US", {
      maximumFractionDigits: 4,
    })} eCoin`,
    pendingECoin: `${visualECoin.toFixed(6)} eCoin`,
    totalStakers: totalStakers.toString(),
    share: `${userSharePercent.toFixed(4)}%`,
  };

  useEffect(() => {
    if (!isConnected) return;
    if (chainId !== 56) {
      switchChain({ chainId: 56 });
    }
  }, [isConnected, chainId, switchChain]);

  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState("success");
      const timer = setTimeout(() => {
        claimTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining.claimConfirmed]);

  // 📌 MAPA DE NAVEGAÇÃO COM ROTAS DEDICADAS
  const menuItems = [
    {
      id: "shareholders",
      label: "Participação",
      icon: Cpu,
      href: "/eCoinShareHolder/ParticipationTab",
    },
    {
      id: "recompensas",
      label: "DIVIDENDOS",
      icon: Gift,
      href: "/eCoinShareHolder/ProfitTab",
    },
    {
      id: "stake",
      label: "AÇÕES",
      icon: Coins,
      href: "/eCoinShareHolder/StakeTab",
    },
    {
      id: "cs_vault",
      label: "SELOS",
      icon: ShieldCheck,
      href: "/eCoinShareHolder/CommitmentSealTab",
    },
    {
      id: "analytics",
      label: "Métricas",
      icon: BarChart3,
      href: "/eCoinShareHolder/AnalyticsTab",
    },
    {
      id: "historico",
      label: "HISTÓRICO",
      icon: History,
      href: "/eCoinShareHolder/HistoryTab",
    },
    {
      id: "portfolio",
      label: "PORTFOLIO",
      icon: Wallet,
      href: "/eCoinShareHolder/PortfolioTab",
    },
    {
      id: "config",
      label: "CONFIGURAÇÕES",
      icon: Settings,
      href: "/eCoinShareHolder/ProfileTab",
    },
  ];

  const handleClaimRewards = async () => {
    try {
      claimTx.setState("wallet");
      await mining.claim();
      claimTx.setState("submitted");
    } catch (error) {
      console.error("Erro ao resgatar recompensas em eCoin:", error);
      claimTx.setState("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#070708] text-white pt-20 pb-28 lg:pb-12 px-4 md:px-8 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        {/* 💻 NAVEGAÇÃO LATERAL (EXCLUSIVA DESKTOP) */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0d0d0f] border border-white/5 rounded-3xl p-4 h-fit sticky top-24 gap-2">
          <div className="px-3 py-2 mb-4 border-b border-white/5 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-bold text-xs">
              CS
            </div>
            <span className="font-black tracking-wider text-sm">
              SHAREHOLDERS
            </span>
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
        <section className="flex-1 min-w-0 space-y-6">
          {/* HEADER PRINCIPAL */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d0d0f]/60 p-6 rounded-3xl border border-white/5 backdrop-blur-md">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter">
                Painel de <span className="text-[#D4AF37]">Shareholders</span>
              </h1>
              <p className="text-xs text-white/40 mt-1">
                Gestão de Selos de Compromisso (CS) & Mineração Exclusiva em
                eCoin
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isMiningActive
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-amber-400"
                  }`}
                />
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase font-bold">
                  eCoin Mining v2.0
                </span>
              </div>
              <ConnectButton />
            </div>
          </div>

          {/* 📱 GRADE DE ÍCONES PARA DISPOSITIVOS MÓVEIS (REDIRECIONAMENTO POR LINK) */}
          <div className="grid lg:hidden grid-cols-2 gap-3 sm:gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#0d0d0f]/80 hover:bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 rounded-3xl transition-all duration-300 active:scale-95 text-center group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 group-hover:bg-[#D4AF37]/10 flex items-center justify-center mb-3 text-[#D4AF37] transition-all duration-300">
                    <Icon
                      size={26}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="text-xs font-black tracking-wider text-white/90 uppercase group-hover:text-[#D4AF37]">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* 💻 RENDERING CONDICIONAL DAS ABAS (MANTIDO EM DESKTOP) */}
          <div className="hidden lg:block">
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

                {/* TAB 2: DIVIDENDOS / RECOMPENSAS (EXCLUSIVO eCoin) */}
                {activeTab === "recompensas" && (
                  <RecompensasTab
                    pendingECoin={visualECoin}
                    remainingCapacity={remainingCapacity}
                    usedCapacity={usedCapacity}
                    maxCapacity={maxCapacity}
                    isMiningActive={isMiningActive}
                    claimTxState={claimTx.state}
                    onClaim={handleClaimRewards}
                  />
                )}

                {/* TAB 3: STAKING */}
                {activeTab === "stake" && <StakeTab />}

                {/* TAB 4: SELO DE COMPROMISSO (CS) */}
                {activeTab === "cs_vault" && <CommitmentSealTab />}

                {/* TAB 5: ANALYTICS */}
                {activeTab === "analytics" && (
                  <AnalyticsTab
                    stats={stats}
                    pendingECoin={pendingECoin}
                    usedCapacity={usedCapacity}
                    maxCapacity={maxCapacity}
                    overflowECoin={0}
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
                      gasBalance={remainingCapacity}
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
                    <TeamLeaderCTA />
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
          </div>

          <SmartPoolsCTA />
          <SocialFooter />
          <ReferralModal />
        </section>
      </div>
    </main>
  );
}