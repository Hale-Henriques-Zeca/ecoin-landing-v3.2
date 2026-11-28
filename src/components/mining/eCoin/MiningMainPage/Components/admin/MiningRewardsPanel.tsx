"use client";

import React, { useState } from "react";
import { Coins, ArrowUpRight, RefreshCw } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits, formatUnits, erc20Abi } from "viem";
import {
  miningStakingECoinAdminAbi,
  formatTokenAmount,
  sanitizeDecimalInput,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import { AdminCard } from "./AdminSharedUI";

type MiningRewardsPanelProps = {
  stakingAddress: `0x${string}`;
  ecoinTokenAddress?: `0x${string}`;
  bufferBN: bigint;
  contractBalBN: bigint;
  adminWalletBalance?: bigint;
  cyclesPerDay: number;
  streamSeconds: number;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function MiningRewardsPanel({
  stakingAddress,
  ecoinTokenAddress,
  bufferBN,
  contractBalBN,
  adminWalletBalance,
  cyclesPerDay,
  streamSeconds,
  busyAction,
  onFeedback,
  executeTx,
}: MiningRewardsPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [rewardAmount, setRewardAmount] = useState("");

  const bufferRowStr = formatTokenAmount(bufferBN, 2, 6);
  const contractBalRowStr = formatTokenAmount(contractBalBN, 2, 6);
  const adminWalletStr = formatTokenAmount(adminWalletBalance, 2, 4);
  const adminWalletRawDecimal = adminWalletBalance
    ? formatUnits(adminWalletBalance, 18)
    : "";

  async function handleFundStakingContract() {
    const cleanAmount = sanitizeDecimalInput(rewardAmount);
    if (!ecoinTokenAddress || !cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira uma quantidade válida em eCoin maior que zero.",
      });
      return;
    }
    const parsed = parseUnits(cleanAmount, 18);
    await executeTx(
      "fundStaking",
      `${cleanAmount} eCoin transferidos para o contrato de Staking.`,
      () =>
        writeContractAsync({
          address: ecoinTokenAddress,
          abi: erc20Abi,
          functionName: "transfer",
          args: [stakingAddress, parsed],
          chainId: bsc.id,
        }),
      () => setRewardAmount("")
    );
  }

  async function handleInjectInstantECoin() {
    const cleanAmount = sanitizeDecimalInput(rewardAmount);
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira uma quantidade válida em eCoin maior que zero.",
      });
      return;
    }
    const parsed = parseUnits(cleanAmount, 18);
    await executeTx(
      "injectInstant",
      `Injeção instantânea de ${cleanAmount} eCoin concluída.`,
      () =>
        writeContractAsync({
          address: stakingAddress,
          abi: miningStakingECoinAdminAbi,
          functionName: "injectInstantECoin",
          args: [parsed],
          chainId: bsc.id,
        }),
      () => setRewardAmount("")
    );
  }

  async function handleAddECoinBuffer() {
    const cleanAmount = sanitizeDecimalInput(rewardAmount);
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira uma quantidade válida em eCoin maior que zero.",
      });
      return;
    }
    const parsed = parseUnits(cleanAmount, 18);
    await executeTx(
      "addBuffer",
      `${cleanAmount} eCoin adicionados ao Reward Buffer.`,
      () =>
        writeContractAsync({
          address: stakingAddress,
          abi: miningStakingECoinAdminAbi,
          functionName: "addECoinBuffer",
          args: [parsed],
          chainId: bsc.id,
        }),
      () => setRewardAmount("")
    );
  }

  async function handlePingStream() {
    await executeTx(
      "pingStream",
      "Ciclo pingStream() executado com sucesso.",
      () =>
        writeContractAsync({
          address: stakingAddress,
          abi: miningStakingECoinAdminAbi,
          functionName: "pingStream",
          chainId: bsc.id,
        })
    );
  }

  return (
    <AdminCard
      title="Mining Rewards & Stream (eCoin)"
      subtitle="Gestão de liquidez, buffer de 24h e injeção direta"
      icon={Coins}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 space-y-2.5 font-mono">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Buffer Atual (1/{cyclesPerDay}d):
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                bufferRowStr
              )} text-blue-400 font-bold tabular-nums whitespace-nowrap transition-all duration-150`}
            >
              {bufferRowStr} <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo Total no Contrato:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                contractBalRowStr
              )} text-emerald-400 font-bold tabular-nums whitespace-nowrap transition-all duration-150`}
            >
              {contractBalRowStr}{" "}
              <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-white/5">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo Carteira Admin:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                adminWalletStr
              )} text-[#D4AF37] font-bold tabular-nums whitespace-nowrap`}
            >
              {adminWalletStr} <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            placeholder="Quantidade em eCoin (ex: 1000)"
            value={rewardAmount}
            onChange={(e) => setRewardAmount(e.target.value)}
            className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl pl-4 pr-16 py-3.5 sm:py-4 text-white font-mono text-xs sm:text-sm"
          />
          {adminWalletRawDecimal && Number(adminWalletRawDecimal) > 0 && (
            <button
              type="button"
              onClick={() => setRewardAmount(adminWalletRawDecimal)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/30 text-[#F9D13E] font-mono font-bold text-[10px] uppercase cursor-pointer"
            >
              MAX
            </button>
          )}
        </div>

        <button
          type="button"
          disabled={busyAction !== null}
          onClick={handleFundStakingContract}
          className="w-full bg-white/10 hover:bg-white/15 text-white font-black py-3.5 px-4 rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 text-center"
        >
          <ArrowUpRight size={16} className="text-[#D4AF37] shrink-0" />
          <span>
            {busyAction === "fundStaking"
              ? "A Transferir Liquidez..."
              : "1. Enviar Liquidez eCoin ao Contrato Staking"}
          </span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleInjectInstantECoin}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 sm:py-4 px-3 rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "injectInstant"
              ? "A Injetar..."
              : "Inject Instant eCoin"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleAddECoinBuffer}
            className="bg-blue-500 hover:bg-blue-400 text-black font-black py-3.5 sm:py-4 px-3 rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "addBuffer"
              ? "A Adicionar..."
              : "Add eCoin Buffer"}
          </button>
        </div>

        <button
          type="button"
          disabled={busyAction !== null}
          onClick={handlePingStream}
          className="w-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#D4AF37] font-black py-3.5 px-4 rounded-2xl text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
        >
          <RefreshCw
            size={15}
            className={`shrink-0 ${
              busyAction === "pingStream" ? "animate-spin" : ""
            }`}
          />
          <span>
            {busyAction === "pingStream"
              ? "A Executar pingStream()..."
              : `Executar pingStream() (Ciclo ${Math.round(
                  streamSeconds / 60
                )}m)`}
          </span>
        </button>
      </div>
    </AdminCard>
  );
}