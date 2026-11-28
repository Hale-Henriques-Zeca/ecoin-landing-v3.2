"use client";

import React, { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits } from "viem";
import {
  treasuryAbi,
  formatTokenAmount,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import { AdminCard } from "./StablecoinSharedUI";

type SecurityControlsPanelProps = {
  treasuryAddress: `0x${string}`;
  dailyLimitBN: bigint;
  withdrawnTodayBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function SecurityControlsPanel({
  treasuryAddress,
  dailyLimitBN,
  withdrawnTodayBN,
  busyAction,
  onFeedback,
  executeTx,
}: SecurityControlsPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [dailyLimit, setDailyLimit] = useState("");

  const remainingTodayBN =
    dailyLimitBN > withdrawnTodayBN ? dailyLimitBN - withdrawnTodayBN : 0n;

  const dailyLimitStr = formatTokenAmount(dailyLimitBN, 0, 4);
  const withdrawnTodayStr = formatTokenAmount(withdrawnTodayBN, 0, 4);
  const remainingTodayStr = formatTokenAmount(remainingTodayBN, 0, 4);

  async function handleUpdateDailyLimit() {
    const trimmed = dailyLimit.trim().replace(",", ".");
    if (!trimmed || Number.isNaN(Number(trimmed)) || Number(trimmed) < 0) {
      onFeedback({
        type: "error",
        message: "Insira um limite diário válido (0 ou superior).",
      });
      return;
    }

    await executeTx(
      "updateDailyLimit",
      `Limite diário do Treasury atualizado para ${trimmed}.`,
      () =>
        writeContractAsync({
          address: treasuryAddress,
          abi: treasuryAbi,
          functionName: "setDailyWithdrawLimit",
          args: [parseUnits(trimmed, 18)],
          chainId: bsc.id,
        }),
      () => setDailyLimit("")
    );
  }

  return (
    <AdminCard
      title="Security Controls"
      subtitle="Limite diário de movimentação do Treasury"
      icon={ShieldCheck}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Daily Limit:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                dailyLimitStr
              )} text-white font-bold tabular-nums whitespace-nowrap`}
            >
              {dailyLimitStr}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Withdrawn Today:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                withdrawnTodayStr
              )} text-amber-400 tabular-nums whitespace-nowrap`}
            >
              {withdrawnTodayStr}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-white/5">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Disponível Hoje:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                remainingTodayStr
              )} text-emerald-400 font-bold tabular-nums whitespace-nowrap`}
            >
              {remainingTodayStr}
            </span>
          </div>
        </div>

        <input
          type="text"
          inputMode="decimal"
          placeholder="New Daily Limit"
          value={dailyLimit}
          onChange={(e) => setDailyLimit(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs sm:text-sm"
        />

        <button
          type="button"
          disabled={busyAction !== null}
          onClick={handleUpdateDailyLimit}
          className="w-full bg-[#D4AF37] hover:bg-amber-400 text-black font-black py-3.5 px-4 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
        >
          {busyAction === "updateDailyLimit"
            ? "A Atualizar..."
            : "Update Daily Limit"}
        </button>
      </div>
    </AdminCard>
  );
}