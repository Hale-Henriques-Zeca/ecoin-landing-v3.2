"use client";

import React, { useState } from "react";
import { Fuel } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits } from "viem";
import { eDollarEcGasSaleAbi } from "@/lib/abis/eDollarMining/eDollarEcGasSaleAbi";
import {
  formatTokenAmount,
  sanitizeDecimalInput,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import { AdminCard } from "./StablecoinSharedUI";

type EcGasEnginePanelProps = {
  ecGasSaleAddress: `0x${string}`;
  gasRateBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function EcGasEnginePanel({
  ecGasSaleAddress,
  gasRateBN,
  busyAction,
  onFeedback,
  executeTx,
}: EcGasEnginePanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [rate, setRate] = useState("");

  const gasRateStr = formatTokenAmount(gasRateBN, 2, 6);

  async function handleUpdateGasRate() {
    const cleanRate = sanitizeDecimalInput(rate);
    if (!cleanRate) {
      onFeedback({
        type: "error",
        message: "Insira uma taxa ecGas Rate válida maior que zero.",
      });
      return;
    }

    await executeTx(
      "updateGasRate",
      `Taxa ecGas Rate atualizada para ${cleanRate}.`,
      () =>
        writeContractAsync({
          address: ecGasSaleAddress,
          abi: eDollarEcGasSaleAbi,
          functionName: "setRate",
          args: [parseUnits(cleanRate, 18)],
          chainId: bsc.id,
        }),
      () => setRate("")
    );
  }

  return (
    <AdminCard
      title="ecGas Engine"
      subtitle="Calibração da taxa de conversão de capacidade"
      icon={Fuel}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Rate Atual On-Chain:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                gasRateStr
              )} text-purple-400 font-bold tabular-nums whitespace-nowrap`}
            >
              {gasRateStr}
            </span>
          </div>
        </div>

        <input
          type="text"
          inputMode="decimal"
          placeholder="New ecGas Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-purple-500/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs sm:text-sm"
        />

        <button
          type="button"
          disabled={busyAction !== null}
          onClick={handleUpdateGasRate}
          className="w-full bg-purple-500 hover:bg-purple-400 text-black font-black py-3.5 px-4 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
        >
          {busyAction === "updateGasRate" ? "A Atualizar Rate..." : "Update Rate"}
        </button>
      </div>
    </AdminCard>
  );
}