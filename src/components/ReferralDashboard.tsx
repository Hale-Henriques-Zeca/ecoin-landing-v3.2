"use client";

import { useEffect, useState } from "react";
import { Wallet, Users, ShieldCheck } from "lucide-react";
import { useReferral } from "@/hooks/useReferral";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { CONTRACTS } from "@/lib/contracts/contracts";

type Rewards = {
  usdt: bigint;
  eusd: bigint;
  ecoin: bigint;
  bnb: bigint;
};

export default function ReferralDashboard() {
  const USDT = CONTRACTS.USDT as `0x${string}`;
  const EUSD = CONTRACTS.EDOLLAR as `0x${string}`;
  const ECOIN = CONTRACTS.ECOIN as `0x${string}`;
  const BNB = (CONTRACTS.WBNB || CONTRACTS.BNB || "0x0000000000000000000000000000000000000000") as `0x${string}`;

  const { address, isConnected } = useDexWallet();
  const { getInviter, getPendingRewards, claimRewards } = useReferral();

  const [inviter, setInviter] = useState<string | null>(null);
  const [pending, setPending] = useState<Rewards>({ usdt: 0n, eusd: 0n, ecoin: 0n, bnb: 0n });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) return;
    async function load() {
      const inviterData = await getInviter();
      setInviter(inviterData);

      const usdtRewards = await getPendingRewards(USDT);
      const eusdRewards = await getPendingRewards(EUSD);
      const ecoinRewards = await getPendingRewards(ECOIN);
      const bnbRewards = await getPendingRewards(BNB);

      setPending({ usdt: usdtRewards, eusd: eusdRewards, ecoin: ecoinRewards, bnb: bnbRewards });
    }
    load();
  }, [isConnected]);

  if (!isConnected) {
    return <p className="text-xs text-gray-400 text-center py-4">Conecte a wallet para ver as recompensas.</p>;
  }

  const pendingUSDT = Number(pending.usdt) / 1e18;
  const pendingEUSD = Number(pending.eusd) / 1e18;
  const pendingECOIN = Number(pending.ecoin) / 1e18;
  const pendingBNB = Number(pending.bnb) / 1e18;
  const total = pendingUSDT + pendingEUSD + pendingECOIN + pendingBNB;

  return (
    <div className="relative rounded-xl border border-[#D4AF37]/20 bg-black/50 backdrop-blur-xl p-3.5 sm:p-4 space-y-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
            <Users size={16} className="text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white leading-none">Referral Vault</h3>
            <p className="text-[9px] text-white/40 mt-0.5">Neural affiliate engine</p>
          </div>
        </div>
        <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
      </div>

      {/* WALLET & UPLINE SUMMARY */}
      <div className="grid grid-cols-1 gap-2 text-[11px]">
        <div className="rounded-lg border border-white/10 bg-black/30 p-2 flex items-center justify-between gap-2">
          <span className="text-white/40 flex items-center gap-1 uppercase text-[9px] shrink-0">
            <Wallet size={12} className="text-[#D4AF37]" /> Wallet
          </span>
          <span translate="no" className="notranslate text-white/70 truncate font-mono">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "—"}
          </span>
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2 flex items-center justify-between gap-2">
          <span className="text-white/40 uppercase text-[9px] shrink-0">Upline</span>
          <span translate="no" className="notranslate text-blue-300 truncate font-mono">
            {inviter && inviter !== "0x0000000000000000000000000000000000000000"
              ? `${inviter.slice(0, 6)}...${inviter.slice(-4)}`
              : "Nenhum"}
          </span>
        </div>
      </div>

      {/* REWARDS GRID (4 MOEDAS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40">USDT</p>
          <p translate="no" className="notranslate text-xs font-black text-emerald-400 mt-0.5">
            {pendingUSDT.toFixed(4)}
          </p>
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-2">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40">eDollar</p>
          <p translate="no" className="notranslate text-xs font-black text-blue-400 mt-0.5">
            {pendingEUSD.toFixed(4)}
          </p>
        </div>

        <div className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-2">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40">eCoin</p>
          <p translate="no" className="notranslate text-xs font-black text-[#D4AF37] mt-0.5">
            {pendingECOIN.toFixed(4)}
          </p>
        </div>

        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-2">
          <p translate="no" className="notranslate text-[9px] uppercase text-white/40">BNB</p>
          <p translate="no" className="notranslate text-xs font-black text-yellow-400 mt-0.5">
            {pendingBNB.toFixed(4)}
          </p>
        </div>
      </div>

      {/* BOTÃO CLAIM */}
      <button
        disabled={total <= 0 || loading}
        onClick={async () => {
          try {
            setLoading(true);
            if (pendingUSDT > 0) await claimRewards(USDT);
            if (pendingEUSD > 0) await claimRewards(EUSD);
            if (pendingECOIN > 0) await claimRewards(ECOIN);
            if (pendingBNB > 0) await claimRewards(BNB);
            setPending({ usdt: 0n, eusd: 0n, ecoin: 0n, bnb: 0n });
          } finally {
            setLoading(false);
          }
        }}
        className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
          total <= 0
            ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5"
            : "bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black hover:brightness-110 active:scale-98"
        }`}
      >
        {loading ? "A Processar..." : "Claim Rewards"}
      </button>
    </div>
  );
}