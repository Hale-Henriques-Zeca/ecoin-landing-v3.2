"use client";

import React, { useState } from "react";
import { Coins } from "lucide-react";
import { useWriteContract, usePublicClient } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits, erc20Abi } from "viem";
import { miningStakingAdminAbi } from "@/lib/abis/eDollarMining/miningStakingAdminAbi";
import {
  formatTokenAmount,
  sanitizeDecimalInput,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import { AdminCard } from "./StablecoinSharedUI";

type MiningRewardsPanelProps = {
  miningStakingAddress: `0x${string}`;
  usdtAddress: `0x${string}`;
  eusdAddress: `0x${string}`;
  rewardUSDTBN: bigint;
  rewardEUSDBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function MiningRewardsPanel({
  miningStakingAddress,
  usdtAddress,
  eusdAddress,
  rewardUSDTBN,
  rewardEUSDBN,
  busyAction,
  onFeedback,
  executeTx,
}: MiningRewardsPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({ chainId: bsc.id });
  const [rewardAmount, setRewardAmount] = useState("");

  const rewardUSDTStr = formatTokenAmount(rewardUSDTBN, 2, 6);
  const rewardEUSDStr = formatTokenAmount(rewardEUSDBN, 2, 6);

  async function handleInjectUSDTRewards() {
    const cleanAmount = sanitizeDecimalInput(rewardAmount);
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira uma quantidade válida em USDT para injeção.",
      });
      return;
    }

    const parsed = parseUnits(cleanAmount, 18);

    await executeTx(
      "injectUSDT",
      `Injeção de ${cleanAmount} USDT no Mining Staking concluída.`,
      async () => {
        const approveHash = await writeContractAsync({
          address: usdtAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [miningStakingAddress, parsed],
          chainId: bsc.id,
        });

        if (publicClient) {
          await publicClient.waitForTransactionReceipt({ hash: approveHash });
        }

        return writeContractAsync({
          address: miningStakingAddress,
          abi: miningStakingAdminAbi,
          functionName: "injectUSDT",
          args: [parsed],
          chainId: bsc.id,
        });
      },
      () => setRewardAmount("")
    );
  }

  async function handleInjectEUSDRewards() {
    const cleanAmount = sanitizeDecimalInput(rewardAmount);
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira uma quantidade válida em EUSD para injeção.",
      });
      return;
    }

    const parsed = parseUnits(cleanAmount, 18);

    await executeTx(
      "injectEUSD",
      `Injeção de ${cleanAmount} EUSD no Mining Staking concluída.`,
      async () => {
        const approveHash = await writeContractAsync({
          address: eusdAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [miningStakingAddress, parsed],
          chainId: bsc.id,
        });

        if (publicClient) {
          await publicClient.waitForTransactionReceipt({ hash: approveHash });
        }

        return writeContractAsync({
          address: miningStakingAddress,
          abi: miningStakingAdminAbi,
          functionName: "injectEUSD",
          args: [parsed],
          chainId: bsc.id,
        });
      },
      () => setRewardAmount("")
    );
  }

  return (
    <AdminCard
      title="Mining Rewards"
      subtitle="Injeção de dividendos USDT e EUSD (Approve + Inject)"
      icon={Coins}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 space-y-2.5 font-mono">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Reward Buffer USDT:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                rewardUSDTStr
              )} text-emerald-400 font-bold tabular-nums whitespace-nowrap`}
            >
              {rewardUSDTStr} <span className="whitespace-nowrap">USDT</span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Reward Buffer EUSD:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                rewardEUSDStr
              )} text-blue-400 font-bold tabular-nums whitespace-nowrap`}
            >
              {rewardEUSDStr} <span className="whitespace-nowrap">EUSD</span>
            </span>
          </div>
        </div>

        <input
          type="text"
          inputMode="decimal"
          placeholder="Reward Amount (USDT ou EUSD)"
          value={rewardAmount}
          onChange={(e) => setRewardAmount(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs sm:text-sm"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleInjectUSDTRewards}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "injectUSDT" ? "A Injetar USDT..." : "Inject USDT"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleInjectEUSDRewards}
            className="bg-blue-500 hover:bg-blue-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "injectEUSD" ? "A Injetar EUSD..." : "Inject EUSD"}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}