"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Wallet, Users, ShieldCheck, ArrowDownRight, Layers, BarChart3, Coins } from "lucide-react";
import { formatUnits } from "viem";
import {
  useReferral,
  MultiAssetRewardsByLevel,
  MultiAssetPendingRewards,
  NetworkStats,
} from "@/hooks/useReferral";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { CONTRACTS } from "@/lib/contracts/contracts";

const EMPTY_LEVELS: MultiAssetRewardsByLevel = {
  ecoin: { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n },
  eusd: { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n },
  usdt: { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n },
  bnb: { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n },
};

const EMPTY_PENDING: MultiAssetPendingRewards = {
  ecoin: 0n,
  eusd: 0n,
  usdt: 0n,
  bnb: 0n,
};

const EMPTY_STATS: NetworkStats = {
  l1Count: 0n,
  l2Count: 0n,
  l3Count: 0n,
  totalMembers: 0n,
};

export default function ReferralDashboard() {
  const tokens = useMemo(
    () => ({
      usdt: CONTRACTS.USDT as `0x${string}`,
      eusd: CONTRACTS.EDOLLAR as `0x${string}`,
      ecoin: CONTRACTS.ECOIN as `0x${string}`,
      bnb: "0x0000000000000000000000000000000000000000" as `0x${string}`,
    }),
    []
  );

  const { address, isConnected } = useDexWallet();
  const {
    getInviter,
    getNetworkStats,
    getAllPendingRewards,
    getAllRewardsByLevel,
    claimRewards,
  } = useReferral();

  const [inviter, setInviter] = useState<string | null>(null);
  const [networkStats, setNetworkStats] = useState<NetworkStats>(EMPTY_STATS);
  const [rewardsByLevel, setRewardsByLevel] = useState<MultiAssetRewardsByLevel>(EMPTY_LEVELS);
  const [pending, setPending] = useState<MultiAssetPendingRewards>(EMPTY_PENDING);
  const [loading, setLoading] = useState(false);

  const loadDashboardData = useCallback(async () => {
    if (!isConnected || !address) return;

    const userAddr = address as `0x${string}`;

    try {
      const [upline, stats, allLevels, allPending] = await Promise.all([
        getInviter(userAddr),
        getNetworkStats(userAddr),
        getAllRewardsByLevel(tokens, userAddr),
        getAllPendingRewards(tokens, userAddr),
      ]);

      setInviter(upline);
      setNetworkStats(stats);
      setRewardsByLevel(allLevels);
      setPending(allPending);
    } catch (err) {
      console.error("Erro ao carregar dashboard de referral:", err);
    }
  }, [
    address,
    isConnected,
    getInviter,
    getNetworkStats,
    getAllRewardsByLevel,
    getAllPendingRewards,
    tokens,
  ]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (!isConnected) {
    return (
      <div className="rounded-xl border border-[#D4AF37]/20 bg-black/50 p-6 text-center">
        <p className="text-xs text-gray-400">
          Conecte a sua wallet para visualizar o vault de recompensas.
        </p>
      </div>
    );
  }

  const formatWei = (val: bigint) => {
    const num = Number(formatUnits(val, 18));
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    });
  };

  // Totais globais acumulados por ativo (L1 + L2 + L3) — cada ativo mantém o seu próprio total
  const globalTotals = {
    ecoin:
      rewardsByLevel.ecoin.l1Reward +
      rewardsByLevel.ecoin.l2Reward +
      rewardsByLevel.ecoin.l3Reward,
    eusd:
      rewardsByLevel.eusd.l1Reward +
      rewardsByLevel.eusd.l2Reward +
      rewardsByLevel.eusd.l3Reward,
    usdt:
      rewardsByLevel.usdt.l1Reward +
      rewardsByLevel.usdt.l2Reward +
      rewardsByLevel.usdt.l3Reward,
    bnb:
      rewardsByLevel.bnb.l1Reward +
      rewardsByLevel.bnb.l2Reward +
      rewardsByLevel.bnb.l3Reward,
  };

  // Verificação exclusiva para ativar/desativar o botão Claim All
  const hasPendingRewards =
    pending.usdt > 0n ||
    pending.eusd > 0n ||
    pending.ecoin > 0n ||
    pending.bnb > 0n;

  const handleClaimAll = async () => {
    try {
      setLoading(true);
      if (pending.ecoin > 0n) await claimRewards(tokens.ecoin);
      if (pending.eusd > 0n) await claimRewards(tokens.eusd);
      if (pending.usdt > 0n) await claimRewards(tokens.usdt);
      if (pending.bnb > 0n) await claimRewards(tokens.bnb);

      await loadDashboardData();
    } catch (err) {
      console.error("Falha ao reivindicar recompensas:", err);
    } finally {
      setLoading(false);
    }
  };

  const levelCards = [
    {
      level: "Nível 1",
      subtitle: "Directos",
      members: networkStats.l1Count,
      accentBorder: "border-[#D4AF37]/25",
      badgeColor: "text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30",
      values: {
        ecoin: rewardsByLevel.ecoin.l1Reward,
        eusd: rewardsByLevel.eusd.l1Reward,
        usdt: rewardsByLevel.usdt.l1Reward,
        bnb: rewardsByLevel.bnb.l1Reward,
      },
    },
    {
      level: "Nível 2",
      subtitle: "Indirectos",
      members: networkStats.l2Count,
      accentBorder: "border-blue-500/25",
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      values: {
        ecoin: rewardsByLevel.ecoin.l2Reward,
        eusd: rewardsByLevel.eusd.l2Reward,
        usdt: rewardsByLevel.usdt.l2Reward,
        bnb: rewardsByLevel.bnb.l2Reward,
      },
    },
    {
      level: "Nível 3",
      subtitle: "Terceiro Nível",
      members: networkStats.l3Count,
      accentBorder: "border-emerald-500/25",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      values: {
        ecoin: rewardsByLevel.ecoin.l3Reward,
        eusd: rewardsByLevel.eusd.l3Reward,
        usdt: rewardsByLevel.usdt.l3Reward,
        bnb: rewardsByLevel.bnb.l3Reward,
      },
    },
  ];

  return (
    <div className="relative rounded-xl border border-[#D4AF37]/20 bg-black/50 backdrop-blur-xl p-4 space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/30">
            <Users size={18} className="text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-none">Referral Vault V2</h3>
            <p className="text-[10px] text-white/40 mt-1">Multi-Level Neural Affiliate Engine</p>
          </div>
        </div>
        <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
      </div>

      {/* WALLET & UPLINE SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-white/10 bg-black/40 p-2.5 flex items-center justify-between gap-2">
          <span className="text-white/40 flex items-center gap-1 uppercase text-[9px] font-semibold shrink-0">
            <Wallet size={12} className="text-[#D4AF37]" /> Wallet
          </span>
          <span translate="no" className="notranslate text-white/80 truncate font-mono text-[11px]">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "—"}
          </span>
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5 flex items-center justify-between gap-2">
          <span className="text-white/40 uppercase text-[9px] font-semibold shrink-0">Upline L1</span>
          <span translate="no" className="notranslate text-blue-300 truncate font-mono text-[11px]">
            {inviter && inviter !== "0x0000000000000000000000000000000000000000"
              ? `${inviter.slice(0, 6)}...${inviter.slice(-4)}`
              : "Sem Upline"}
          </span>
        </div>
      </div>

      {/* SECÇÃO A: RECOMPENSAS POR NÍVEL (12 INDICADORES) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
            <Layers size={12} className="text-[#D4AF37]" />
            <span>A. Recompensas por Nível</span>
          </div>
          <span className="text-[10px] font-mono text-white/40">
            Rede Total: {networkStats.totalMembers.toString()} membros
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {levelCards.map((card) => (
            <div
              key={card.level}
              className={`rounded-lg border ${card.accentBorder} bg-black/40 p-3 space-y-2`}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <div>
                  <span className="text-xs font-bold text-white block leading-none">
                    {card.level}
                  </span>
                  <span className="text-[9px] uppercase text-white/45">{card.subtitle}</span>
                </div>
                <span
                  className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded border ${card.badgeColor}`}
                >
                  {card.members.toString()} refs
                </span>
              </div>

              <div className="space-y-1 text-[11px] font-mono">
                <div className="flex items-center justify-between">
                  <span translate="no" className="notranslate text-white/50 text-[10px]">
                    E-Coin
                  </span>
                  <span translate="no" className="notranslate font-bold text-[#D4AF37]">
                    {formatWei(card.values.ecoin)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span translate="no" className="notranslate text-white/50 text-[10px]">
                    eDollar
                  </span>
                  <span translate="no" className="notranslate font-bold text-blue-400">
                    {formatWei(card.values.eusd)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span translate="no" className="notranslate text-white/50 text-[10px]">
                    USDT
                  </span>
                  <span translate="no" className="notranslate font-bold text-emerald-400">
                    {formatWei(card.values.usdt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span translate="no" className="notranslate text-white/50 text-[10px]">
                    BNB
                  </span>
                  <span translate="no" className="notranslate font-bold text-yellow-400">
                    {formatWei(card.values.bnb)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECÇÃO B: TOTAL GLOBAL ACUMULADO POR MOEDA (L1 + L2 + L3) */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
          <BarChart3 size={12} className="text-[#00C3FF]" />
          <span>B. Total Global Acumulado (L1 + L2 + L3)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              E-Coin
            </p>
            <p translate="no" className="notranslate text-sm font-black text-[#D4AF37] mt-0.5 font-mono">
              {formatWei(globalTotals.ecoin)}
            </p>
          </div>

          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              eDollar
            </p>
            <p translate="no" className="notranslate text-sm font-black text-blue-400 mt-0.5 font-mono">
              {formatWei(globalTotals.eusd)}
            </p>
          </div>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              USDT
            </p>
            <p translate="no" className="notranslate text-sm font-black text-emerald-400 mt-0.5 font-mono">
              {formatWei(globalTotals.usdt)}
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              BNB
            </p>
            <p translate="no" className="notranslate text-sm font-black text-yellow-400 mt-0.5 font-mono">
              {formatWei(globalTotals.bnb)}
            </p>
          </div>
        </div>
      </div>

      {/* SECÇÃO C: RECOMPENSAS DISPONÍVEIS PARA RESGATE */}
      <div className="space-y-2.5 pt-1 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
          <Coins size={12} className="text-[#00FF9C]" />
          <span>C. Recompensas Disponíveis para Resgate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="rounded-lg border border-[#D4AF37]/30 bg-black/50 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              E-Coin
            </p>
            <p translate="no" className="notranslate text-sm font-black text-[#D4AF37] mt-0.5 font-mono">
              {formatWei(pending.ecoin)}
            </p>
          </div>

          <div className="rounded-lg border border-blue-500/30 bg-black/50 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              eDollar
            </p>
            <p translate="no" className="notranslate text-sm font-black text-blue-400 mt-0.5 font-mono">
              {formatWei(pending.eusd)}
            </p>
          </div>

          <div className="rounded-lg border border-emerald-500/30 bg-black/50 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              USDT
            </p>
            <p translate="no" className="notranslate text-sm font-black text-emerald-400 mt-0.5 font-mono">
              {formatWei(pending.usdt)}
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/30 bg-black/50 p-2.5">
            <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">
              BNB
            </p>
            <p translate="no" className="notranslate text-sm font-black text-yellow-400 mt-0.5 font-mono">
              {formatWei(pending.bnb)}
            </p>
          </div>
        </div>

        {/* BOTÃO CLAIM ALL */}
        <button
          disabled={!hasPendingRewards || loading}
          onClick={handleClaimAll}
          className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
            !hasPendingRewards
              ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
              : "bg-gradient-to-r from-[#00FF9C] via-[#D4AF37] to-[#00C3FF] text-black hover:brightness-110 active:scale-[0.98] shadow-lg shadow-[#00FF9C]/10"
          }`}
        >
          <ArrowDownRight size={16} />
          {loading ? "A Processar Claim..." : "Claim All Rewards"}
        </button>
      </div>
    </div>
  );
}