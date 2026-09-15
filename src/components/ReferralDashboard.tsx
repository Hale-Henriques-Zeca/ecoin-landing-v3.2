"use client";

import { useEffect, useState, useCallback } from "react";
import { Wallet, Users, ShieldCheck, ArrowDownRight, Layers } from "lucide-react";
import { useReferral } from "@/hooks/useReferral";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { CONTRACTS } from "@/lib/contracts/contracts";

type RewardsState = {
  usdt: bigint;
  eusd: bigint;
  ecoin: bigint;
  bnb: bigint;
};

type LevelBreakdown = {
  l1: bigint;
  l2: bigint;
  l3: bigint;
};

export default function ReferralDashboard() {
  const USDT = CONTRACTS.USDT as `0x${string}`;
  const EUSD = CONTRACTS.EDOLLAR as `0x${string}`;
  const ECOIN = CONTRACTS.ECOIN as `0x${string}`;
  const BNB = "0x0000000000000000000000000000000000000000" as `0x${string}`;

  const { address, isConnected } = useDexWallet();
  const { getInviter, getPendingReward, getRewardsByLevel, claim } = useReferral();

  const [inviter, setInviter] = useState<string | null>(null);
  const [pending, setPending] = useState<RewardsState>({ usdt: 0n, eusd: 0n, ecoin: 0n, bnb: 0n });
  const [ecoinLevels, setEcoinLevels] = useState<LevelBreakdown>({ l1: 0n, l2: 0n, l3: 0n });
  const [loading, setLoading] = useState(false);

  const loadDashboardData = useCallback(async () => {
    if (!isConnected || !address) return;

    try {
      const [upline, usdtRew, eusdRew, ecoinRew, bnbRew, levels] = await Promise.all([
        getInviter(address),
        getPendingReward(address, USDT),
        getPendingReward(address, EUSD),
        getPendingReward(address, ECOIN),
        getPendingReward(address, BNB),
        getRewardsByLevel(address, ECOIN)
      ]);

      setInviter(upline);
      setPending({ usdt: usdtRew, eusd: eusdRew, ecoin: ecoinRew, bnb: bnbRew });
      setEcoinLevels({
        l1: levels.l1Reward,
        l2: levels.l2Reward,
        l3: levels.l3Reward
      });
    } catch (err) {
      console.error("Erro ao carregar dashboard de referral:", err);
    }
  }, [address, isConnected, getInviter, getPendingReward, getRewardsByLevel, USDT, EUSD, ECOIN, BNB]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (!isConnected) {
    return (
      <div className="rounded-xl border border-[#D4AF37]/20 bg-black/50 p-6 text-center">
        <p className="text-xs text-gray-400">Conecte a sua wallet para visualizar o vault de recompensas.</p>
      </div>
    );
  }

  const formatWei = (val: bigint) => (Number(val) / 1e18).toFixed(4);

  const totalPendingDecimal =
    Number(pending.usdt) / 1e18 +
    Number(pending.eusd) / 1e18 +
    Number(pending.ecoin) / 1e18 +
    Number(pending.bnb) / 1e18;

  const handleClaimAll = async () => {
    try {
      setLoading(true);
      if (pending.usdt > 0n) await claim(USDT);
      if (pending.eusd > 0n) await claim(EUSD);
      if (pending.ecoin > 0n) await claim(ECOIN);
      if (pending.bnb > 0n) await claim(BNB);

      await loadDashboardData();
    } catch (err) {
      console.error("Falha ao reivindicar recompensas:", err);
    } finally {
      setLoading(false);
    }
  };

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

      {/* REWARDS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2.5">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">USDT</p>
          <p translate="no" className="notranslate text-sm font-black text-emerald-400 mt-0.5">
            {formatWei(pending.usdt)}
          </p>
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2.5">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">eDollar</p>
          <p translate="no" className="notranslate text-sm font-black text-blue-400 mt-0.5">
            {formatWei(pending.eusd)}
          </p>
        </div>

        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-2.5">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">eCoin</p>
          <p translate="no" className="notranslate text-sm font-black text-[#D4AF37] mt-0.5">
            {formatWei(pending.ecoin)}
          </p>
        </div>

        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2.5">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40 font-semibold">BNB</p>
          <p translate="no" className="notranslate text-sm font-black text-yellow-400 mt-0.5">
            {formatWei(pending.bnb)}
          </p>
        </div>
      </div>

      {/* BREAKDOWN ECOIN BY LEVEL */}
      <div className="rounded-lg border border-white/5 bg-black/30 p-2.5 text-[10px] space-y-1.5">
        <div className="flex items-center gap-1 text-white/60 font-semibold uppercase">
          <Layers size={11} className="text-[#D4AF37]" />
          <span>eCoin Earnings Level Breakdown</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono">
          <div className="bg-white/5 rounded p-1">
            <span className="text-white/40 block text-[8px]">L1 DIRECT</span>
            <span className="text-[#D4AF37] font-bold">{formatWei(ecoinLevels.l1)}</span>
          </div>
          <div className="bg-white/5 rounded p-1">
            <span className="text-white/40 block text-[8px]">L2 INDIRECT</span>
            <span className="text-blue-400 font-bold">{formatWei(ecoinLevels.l2)}</span>
          </div>
          <div className="bg-white/5 rounded p-1">
            <span className="text-white/40 block text-[8px]">L3 RELATIVE</span>
            <span className="text-emerald-400 font-bold">{formatWei(ecoinLevels.l3)}</span>
          </div>
        </div>
      </div>

      {/* BOTÃO CLAIM */}
      <button
        disabled={totalPendingDecimal <= 0 || loading}
        onClick={handleClaimAll}
        className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
          totalPendingDecimal <= 0
            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
            : "bg-gradient-to-r from-[#00FF9C] via-[#D4AF37] to-[#00C3FF] text-black hover:brightness-110 active:scale-[0.98] shadow-lg shadow-[#00FF9C]/10"
        }`}
      >
        <ArrowDownRight size={16} />
        {loading ? "A Processar Claim..." : "Claim All Rewards"}
      </button>
    </div>
  );
}