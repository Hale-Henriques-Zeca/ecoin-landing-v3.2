"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { formatTokenAmount, getKpiMetricSize } from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";

type AdminHeaderAndMetricsProps = {
  isOwner: boolean;
  ecoinSaleEnabled?: boolean;
  isCurrentAddressInjector?: boolean;
  isRefreshing: boolean;
  onSyncAll: () => void;
  stakedBN: bigint;
  eligibleBN: bigint;
  bufferBN: bigint;
  contractBalBN: bigint;
  excessBN: bigint;
  totalStakers?: bigint;
  cyclesPerDay: number;
  streamPerCycleNum: number;
};

export function AdminHeaderAndMetrics({
  isOwner,
  ecoinSaleEnabled,
  isCurrentAddressInjector,
  isRefreshing,
  onSyncAll,
  stakedBN,
  eligibleBN,
  bufferBN,
  contractBalBN,
  excessBN,
  totalStakers,
  cyclesPerDay,
  streamPerCycleNum,
}: AdminHeaderAndMetricsProps) {
  const stakedStr = formatTokenAmount(stakedBN, 0, 2);
  const eligibleStr = formatTokenAmount(eligibleBN, 0, 2);
  const bufferStr = formatTokenAmount(bufferBN, 0, 4);
  const excessStr = formatTokenAmount(excessBN, 0, 4);

  return (
    <>
      {/* CABEÇALHO */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.5rem,6vw,2.75rem)] font-black text-white mb-1.5 tracking-tight leading-tight">
            <span className="text-[#D4AF37]">e</span>Coin{" "}
            <span className="text-[#D4AF37]">Protocol Admin</span>
          </h1>
          <p className="text-white/50 text-[11px] sm:text-xs md:text-sm font-mono leading-relaxed">
            ECoinMiningStakingECoin • EcGasSaleECoin (1.3x) • Treasury Vault
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
              ecoinSaleEnabled
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            ecGas Sale: {ecoinSaleEnabled ? "ATIVO" : "PAUSADO"}
          </span>

          <span
            className={`px-3 py-1.5 rounded-full border whitespace-nowrap ${
              isCurrentAddressInjector
                ? "bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#D4AF37]"
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

      {/* MÉTRICAS GLOBAIS ON-CHAIN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Total Staked (eCoin)
          </div>
          <div
            className={`${getKpiMetricSize(
              stakedStr
            )} leading-tight font-black text-[#D4AF37] font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {stakedStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono truncate">
            Stakers ativos:{" "}
            {totalStakers !== undefined ? Number(totalStakers) : 0}
          </div>
        </div>

        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Stake Elegível (Com Gás)
          </div>
          <div
            className={`${getKpiMetricSize(
              eligibleStr
            )} leading-tight font-black text-emerald-400 font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {eligibleStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono truncate">
            Multiplicador Gás: 1.3x (130%)
          </div>
        </div>

        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Reward Buffer (eCoin)
          </div>
          <div
            className={`${getKpiMetricSize(
              bufferStr
            )} leading-tight font-black text-blue-400 font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {bufferStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono tabular-nums truncate">
            Stream (1/{cyclesPerDay}d):{" "}
            {streamPerCycleNum.toLocaleString("en-US", {
              maximumFractionDigits: 4,
            })}{" "}
            eCoin
          </div>
        </div>

        <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden">
          <div className="text-white/40 text-[11px] sm:text-xs font-mono uppercase mb-2 truncate">
            Excedente Disponível (eCoin)
          </div>
          <div
            className={`${getKpiMetricSize(
              excessStr
            )} leading-tight font-black text-purple-400 font-mono tabular-nums whitespace-nowrap truncate transition-all duration-150`}
          >
            {excessStr}
          </div>
          <div className="text-[11px] text-white/40 mt-1.5 font-mono tabular-nums truncate">
            Saldo Contrato: {formatTokenAmount(contractBalBN, 0, 2)} eCoin
          </div>
        </div>
      </div>
    </>
  );
}