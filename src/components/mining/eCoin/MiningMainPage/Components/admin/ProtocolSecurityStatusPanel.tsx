"use client";

import React, { useState } from "react";
import { ShieldCheck, Activity } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits } from "viem";
import {
  treasuryAbi,
  formatTokenAmount,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import { AdminCard, AddressPill } from "./AdminSharedUI";

type ProtocolSecurityStatusPanelProps = {
  treasuryAddress?: `0x${string}`;
  ecoinTokenAddress?: `0x${string}`;
  stakingAddress: `0x${string}`;
  gasSaleAddress: `0x${string}`;
  dailyLimitBN: bigint;
  withdrawnTodayBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function ProtocolSecurityStatusPanel({
  treasuryAddress,
  ecoinTokenAddress,
  stakingAddress,
  gasSaleAddress,
  dailyLimitBN,
  withdrawnTodayBN,
  busyAction,
  onFeedback,
  executeTx,
}: ProtocolSecurityStatusPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [dailyLimit, setDailyLimit] = useState("");

  const dailyLimitRowStr = formatTokenAmount(dailyLimitBN, 0, 4);
  const withdrawnTodayRowStr = formatTokenAmount(withdrawnTodayBN, 0, 4);

  async function handleUpdateDailyLimit() {
    const trimmed = dailyLimit.trim().replace(",", ".");
    if (
      !treasuryAddress ||
      !trimmed ||
      Number.isNaN(Number(trimmed)) ||
      Number(trimmed) < 0
    ) {
      onFeedback({
        type: "error",
        message: "Insira um limite diário válido (0 ou superior).",
      });
      return;
    }
    await executeTx(
      "updateDailyLimit",
      `Limite diário do Treasury atualizado para ${trimmed} eCoin.`,
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
      title="Segurança & Status do Protocolo"
      subtitle="Parâmetros de governança e endereços on-chain"
      icon={ShieldCheck}
    >
      <div className="space-y-4">
        {treasuryAddress && (
          <>
            <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
                  Limite Diário Treasury:
                </span>
                <span
                  className={`shrink-0 ${getRowMetricSize(
                    dailyLimitRowStr
                  )} text-white tabular-nums whitespace-nowrap transition-all duration-150`}
                >
                  {dailyLimitRowStr}{" "}
                  <span className="whitespace-nowrap">eCoin</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
                  Sacado Hoje:
                </span>
                <span
                  className={`shrink-0 ${getRowMetricSize(
                    withdrawnTodayRowStr
                  )} text-amber-400 tabular-nums whitespace-nowrap transition-all duration-150`}
                >
                  {withdrawnTodayRowStr}{" "}
                  <span className="whitespace-nowrap">eCoin</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                inputMode="decimal"
                placeholder="Novo Limite Diário (eCoin)"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(e.target.value)}
                className="min-w-0 flex-1 bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3 text-white font-mono text-xs"
              />
              <button
                type="button"
                disabled={busyAction !== null}
                onClick={handleUpdateDailyLimit}
                className="shrink-0 py-3 sm:py-0 px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-black rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
              >
                {busyAction === "updateDailyLimit"
                  ? "A Atualizar..."
                  : "Atualizar"}
              </button>
            </div>
          </>
        )}

        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 space-y-2.5 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Token Oficial:</span>
            <AddressPill
              address={ecoinTokenAddress}
              accentClass="text-[#D4AF37]"
            />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Staking Contract:</span>
            <AddressPill
              address={stakingAddress}
              accentClass="text-emerald-400"
            />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">ecGas Sale Contract:</span>
            <AddressPill
              address={gasSaleAddress}
              accentClass="text-emerald-400"
            />
          </div>
          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-white/5 min-w-0">
            <span className="text-white/50 flex items-center gap-1.5 shrink-0">
              <Activity size={13} className="text-emerald-400 shrink-0" />
              <span>Estado Operacional:</span>
            </span>
            <span className="min-w-0 text-right text-emerald-400 font-bold truncate">
              {busyAction ? `PROCESSANDO (${busyAction})...` : "SINCRONIZADO"}
            </span>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}