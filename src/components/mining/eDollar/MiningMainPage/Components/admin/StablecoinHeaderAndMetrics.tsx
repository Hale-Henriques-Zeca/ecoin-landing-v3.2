"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { formatTokenAmount, getKpiMetricSize } from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";

type StablecoinHeaderAndMetricsProps = {
  isOwner: boolean;
  isCurrentAddressInjector?: boolean;
  isRefreshing: boolean;
  onSyncAll: () => void;
  treasuryUSDTBN: bigint;
  treasuryEUSDBN: bigint;
  treasuryECOINBN: bigint;
  totalStakedBN: bigint;
  gasRateBN: bigint;
};

export function StablecoinHeaderAndMetrics({
  isOwner,
  isCurrentAddressInjector,
  isRefreshing,
  onSyncAll,
  treasuryUSDTBN,
  treasuryEUSDBN,
  treasuryECOINBN,
  totalStakedBN,
  gasRateBN,
}: StablecoinHeaderAndMetricsProps) {
  const usdtStr = formatTokenAmount(treasuryUSDTBN, 2, 2);
  const eusdStr = formatTokenAmount(treasuryEUSDBN, 2, 2);
  const stakedStr = formatTokenAmount(totalStakedBN, 2, 2);
  const gasRateStr = formatTokenAmount(gasRateBN, 2, 4);

  return (
    <>
      {/* CABEÇALHO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.5rem,6vw,2.75rem)] font-black text-white mb-1.5 tracking-tight leading-tight">
            <span className="text-[#D4AF37]">e</span>Dollar{" "}
            <span className="text-[#ff007f]">Stablecoins</span>{" "}
            <span className="text-[#D4AF37]">Admin</span>
          </h1>
          <p className="text-white/50 text-[11px] sm:text-xs md:text-sm font-mono leading-relaxed">
            Treasury • Stable Mining (USDT / EUSD) • ecGas Sale • Security
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-mono">
          <span
            className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${
              isOwner
                ? "bg-[#D4AF37]/15 border-[#D4AF37]/40 text-[#F9D13E]"
                : "bg-blue-500/10 border-blue-500/30 text-blue-300"
            }`}
          >
            Perfil: {isOwner ? "OWNER" : "INJECTOR"}
          </span>

          <span
            className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${
              isCurrentAddressInjector
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-white/5 border-white/10 text-white/50"
            }`}
          >
            Injector:{" "}
            {isCurrentAddressInjector ? "AUTORIZADO" : "NÃO AUTORIZADO"}
          </span>

          <button
            type="button"
            onClick={onSyncAll}
            disabled={isRefreshing}
            title="Sincronizar todas as leituras on-chain"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 transition cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <RefreshCw
              size={12}
              className={isRefreshing ? "animate-spin text-[#D4AF37]" : ""}
            />
            <span>Sincronizar</span>
          </button>
        </div>
      </div>

      {/* KPIs GLOBAIS ON-CHAIN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Treasury USDT
          </div>
          <div
            className={`${getKpiMetricSize(
              usdtStr
            )} leading-tight font-black text-emerald-400 font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {usdtStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono truncate">
            Reserva institucional USDT
          </div>
        </div>

        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Treasury EUSD (eDollar)
          </div>
          <div
            className={`${getKpiMetricSize(
              eusdStr
            )} leading-tight font-black text-blue-400 font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {eusdStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono truncate">
            Treasury ECOIN: {formatTokenAmount(treasuryECOINBN, 0, 2)}
          </div>
        </div>

        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Total Staked
          </div>
          <div
            className={`${getKpiMetricSize(
              stakedStr
            )} leading-tight font-black text-[#D4AF37] font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {stakedStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono truncate">
            Pool Stable Mining ativo
          </div>
        </div>

        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            ecGas Rate
          </div>
          <div
            className={`${getKpiMetricSize(
              gasRateStr
            )} leading-tight font-black text-purple-400 font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {gasRateStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono truncate">
            Taxa de conversão de gás
          </div>
        </div>
      </div>
    </>
  );
}