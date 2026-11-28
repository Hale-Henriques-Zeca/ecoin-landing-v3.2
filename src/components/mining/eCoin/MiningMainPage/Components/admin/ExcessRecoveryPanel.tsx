"use client";

import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { isAddress } from "viem";
import {
  miningStakingECoinAdminAbi,
  formatTokenAmount,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import { AdminCard } from "./AdminSharedUI";

type ExcessRecoveryPanelProps = {
  stakingAddress: `0x${string}`;
  contractBalBN: bigint;
  stakedBN: bigint;
  excessBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function ExcessRecoveryPanel({
  stakingAddress,
  contractBalBN,
  stakedBN,
  excessBN,
  busyAction,
  onFeedback,
  executeTx,
}: ExcessRecoveryPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [excessRecipient, setExcessRecipient] = useState("");

  const contractBalRowStr = formatTokenAmount(contractBalBN, 2, 6);
  const stakedRowStr = formatTokenAmount(stakedBN, 2, 4);
  const excessRowStr = formatTokenAmount(excessBN, 2, 4);

  async function handleWithdrawExcess() {
    const target = excessRecipient.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço de destino inválido para saque de excedente.",
      });
      return;
    }
    await executeTx(
      "withdrawExcess",
      "Excedente de eCoin transferido com sucesso.",
      () =>
        writeContractAsync({
          address: stakingAddress,
          abi: miningStakingECoinAdminAbi,
          functionName: "withdrawExcess",
          args: [target],
          chainId: bsc.id,
        }),
      () => setExcessRecipient("")
    );
  }

  return (
    <AdminCard
      title="Recuperação de Excedente (Staking)"
      subtitle="Saque exclusivo de liquidez acima do totalStaked"
      icon={AlertTriangle}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo Total Contrato:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                contractBalRowStr
              )} text-white tabular-nums whitespace-nowrap transition-all duration-150`}
            >
              {contractBalRowStr}{" "}
              <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Reservado (totalStaked):
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                stakedRowStr
              )} text-amber-400 tabular-nums whitespace-nowrap transition-all duration-150`}
            >
              {stakedRowStr} <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Excedente Sacável:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                excessRowStr
              )} text-emerald-400 font-bold tabular-nums whitespace-nowrap transition-all duration-150`}
            >
              {excessRowStr} <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
        </div>

        <input
          placeholder="Carteira de destino para withdrawExcess (0x...)"
          value={excessRecipient}
          onChange={(e) => setExcessRecipient(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-amber-500/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
        />

        <button
          type="button"
          disabled={busyAction !== null || excessBN === 0n}
          onClick={handleWithdrawExcess}
          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black py-3.5 sm:py-4 px-4 rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40 whitespace-nowrap"
        >
          {busyAction === "withdrawExcess"
            ? "A Sacar Excedente..."
            : "Sacar Excedente (withdrawExcess)"}
        </button>
      </div>
    </AdminCard>
  );
}