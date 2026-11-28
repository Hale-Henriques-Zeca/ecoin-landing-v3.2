"use client";

import React from "react";
import { ExternalLink, ShieldCheck, Flame, Users, Zap } from "lucide-react";
import {
  RankingEntry,
  MainRankingTab,
  TraderSubMode,
  ReferralSubMode,
  getBscScanAddressUrl,
} from "./rankingTypes";

type RankingRowCardProps = {
  rank: number;
  entry: RankingEntry;
  mainTab: MainRankingTab;
  traderMode: TraderSubMode;
  referralMode?: ReferralSubMode;
  isCurrentUser?: boolean;
};

function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#F9D13E] via-[#D4AF37] to-amber-700 text-black font-black text-sm shadow-lg shadow-[#D4AF37]/30 border border-[#F9D13E]">
        1
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 text-black font-black text-sm shadow-md border border-white/60">
        2
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-900 text-white font-black text-sm shadow-md border border-amber-400/50">
        3
      </div>
    );
  }
  return (
    <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center text-white/60 font-mono font-bold text-xs sm:text-sm">
      {rank}
    </div>
  );
}

export function RankingRowCard({
  rank,
  entry,
  mainTab,
  traderMode,
  referralMode = "all",
  isCurrentUser,
}: RankingRowCardProps) {
  const bscScanUrl = getBscScanAddressUrl(entry.address, entry.lastTxHash);

  // Valor principal destacado à direita conforme o modo
  const primaryMetric = (() => {
    if (mainTab === "ecnTrader" && traderMode === "topMargin") {
      return {
        prefix: "",
        value: entry.stakedECoin.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        symbol: "eCoin",
        colorClass: "text-[#F9D13E]",
      };
    }
    if (mainTab === "ecnTrader" && traderMode === "liveProfit") {
      return {
        prefix: "+",
        value: entry.liveProfit.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        }),
        symbol: entry.rewardSymbol,
        colorClass: "text-emerald-400",
      };
    }
    if (mainTab === "referrals") {
      return {
        prefix: "+",
        value: entry.periodGain.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        symbol: entry.rewardSymbol,
        colorClass: "text-[#F9D13E]",
      };
    }
    return {
      prefix: "+",
      value: entry.periodGain.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      symbol: entry.rewardSymbol,
      colorClass: "text-white",
    };
  })();

  const referralBadgeLabel =
    referralMode === "level1"
      ? "Nível 1 · Direto"
      : referralMode === "level2"
      ? "Nível 2 · Indireto"
      : referralMode === "level3"
      ? "Nível 3 · Rede"
      : "3 Níveis (L1–L3)";

  return (
    <div
      className={`flex items-center justify-between gap-2.5 sm:gap-4 p-3 sm:p-4 rounded-2xl border transition ${
        isCurrentUser
          ? "bg-[#D4AF37]/15 border-[#D4AF37]/50"
          : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10"
      }`}
    >
      {/* ESQUERDA: MEDALHA + AVATAR + INFO + VIP + MÉTRICAS CONTEXTUAIS */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
        <RankMedal rank={rank} />

        {/* Avatar circular estilo eCoin */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-300 p-[1.5px]">
          <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-black text-xs text-[#F9D13E]">
            {entry.address.slice(2, 4).toUpperCase()}
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-white font-bold text-xs sm:text-sm font-mono truncate">
              {entry.displayName}
            </span>
            {isCurrentUser && (
              <span className="px-1.5 py-0.5 rounded bg-[#D4AF37] text-black font-black text-[9px] uppercase shrink-0">
                TU
              </span>
            )}
          </div>

          {/* BADGES POR ABA */}
          {mainTab === "referrals" ? (
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-full font-black bg-[#ff007f]/20 text-pink-300 border border-[#ff007f]/30 inline-flex items-center gap-1">
                <Users size={10} />
                {referralBadgeLabel}
              </span>

              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black font-black">
                {entry.vipTier}
              </span>

              <span className="text-white/70 whitespace-nowrap">
                Convidados:{" "}
                <strong className="text-white">
                  {entry.directReferralsCount ?? 0}
                </strong>
              </span>

              <span className="text-emerald-400/90 whitespace-nowrap">
                (L1: {entry.l1Count ?? 0} · L2: {entry.l2Count ?? 0} · L3:{" "}
                {entry.l3Count ?? 0})
              </span>
            </div>
          ) : mainTab === "ecGas" ? (
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded-full font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
                <Zap size={10} />
                ecGas Power
              </span>

              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black font-black">
                {entry.vipTier}
              </span>

              <span className="text-white/60 whitespace-nowrap">
                Capacidade Ativa
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-mono">
              <span
                className={`px-2 py-0.5 rounded-full font-black ${
                  entry.poolType === "ECOIN"
                    ? "bg-amber-500/20 text-[#F9D13E] border border-amber-500/30"
                    : "bg-[#ff007f]/20 text-pink-300 border border-[#ff007f]/30"
                }`}
              >
                {entry.poolType === "ECOIN" ? "eCoin Pool" : "Stable Pool"}
              </span>

              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black font-black">
                {entry.vipTier}
              </span>

              <span className="text-white/60 whitespace-nowrap">
                Stake:{" "}
                <strong className="text-white">
                  {entry.stakedECoin.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}{" "}
                  eCoin
                </strong>
              </span>

              <span className="text-emerald-400 whitespace-nowrap">
                ({entry.poolSharePercent.toFixed(2)}% Pool)
              </span>
            </div>
          )}
        </div>
      </div>

      {/* DIREITA: VALOR + DETALHE SECUNDÁRIO + BOTÃO DIRETO BSCSCAN */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <div
          className={`font-mono font-black text-xs sm:text-base tabular-nums whitespace-nowrap ${primaryMetric.colorClass}`}
        >
          {primaryMetric.prefix}
          {primaryMetric.value}{" "}
          <span className="text-[10px] sm:text-xs font-normal text-white/70">
            {primaryMetric.symbol}
          </span>
        </div>

        {/* Sub-detalhe no modo Top Margin */}
        {mainTab === "ecnTrader" && traderMode === "topMargin" && (
          <div className="text-[10px] font-mono text-emerald-400/90 flex items-center gap-1 whitespace-nowrap">
            <Flame size={11} />
            <span>
              Live: +{entry.liveProfit.toFixed(2)} {entry.rewardSymbol}
            </span>
          </div>
        )}

        {/* Sub-detalhe por nível na aba Referências (visão Geral L1–L3) */}
        {mainTab === "referrals" && referralMode === "all" && (
          <div className="text-[10px] font-mono text-white/60 whitespace-nowrap">
            L1: +{(entry.l1Gain ?? 0).toFixed(2)} · L2: +
            {(entry.l2Gain ?? 0).toFixed(2)} · L3: +
            {(entry.l3Gain ?? 0).toFixed(2)}
          </div>
        )}

        <a
          href={bscScanUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Verificar contrato e transações na BscScan"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-[10px] font-mono text-white/70 hover:text-[#F9D13E] transition whitespace-nowrap"
        >
          <ShieldCheck size={11} className="text-[#D4AF37]" />
          <span>BscScan</span>
          <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}