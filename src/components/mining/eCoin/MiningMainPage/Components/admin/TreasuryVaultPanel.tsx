"use client";

import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { useWriteContract, usePublicClient } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits, isAddress, erc20Abi } from "viem";
import {
  treasuryAbi,
  formatTokenAmount,
  sanitizeDecimalInput,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import { AdminCard } from "./AdminSharedUI";

type TreasuryVaultPanelProps = {
  treasuryAddress: `0x${string}`;
  ecoinTokenAddress?: `0x${string}`;
  treasuryBN: bigint;
  remainingDailyBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function TreasuryVaultPanel({
  treasuryAddress,
  ecoinTokenAddress,
  treasuryBN,
  remainingDailyBN,
  busyAction,
  onFeedback,
  executeTx,
}: TreasuryVaultPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({ chainId: bsc.id });

  const [treasuryAmount, setTreasuryAmount] = useState("");
  const [treasuryWallet, setTreasuryWallet] = useState("");

  const treasuryRowStr = formatTokenAmount(treasuryBN, 2, 4);
  const remainingDailyRowStr = formatTokenAmount(remainingDailyBN, 0, 4);

  async function handleDepositTreasury() {
    const cleanAmount = sanitizeDecimalInput(treasuryAmount);
    if (!ecoinTokenAddress) {
      onFeedback({
        type: "error",
        message: "Endereço do token eCoin não configurado.",
      });
      return;
    }
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira um valor válido em eCoin para depósito.",
      });
      return;
    }
    const parsed = parseUnits(cleanAmount, 18);

    await executeTx(
      "depositTreasury",
      `Depósito de ${cleanAmount} eCoin no Treasury concluído.`,
      async () => {
        const approveHash = await writeContractAsync({
          address: ecoinTokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [treasuryAddress, parsed],
          chainId: bsc.id,
        });
        if (publicClient) {
          await publicClient.waitForTransactionReceipt({ hash: approveHash });
        }
        return writeContractAsync({
          address: treasuryAddress,
          abi: treasuryAbi,
          functionName: "deposit",
          args: [ecoinTokenAddress, parsed],
          chainId: bsc.id,
        });
      },
      () => setTreasuryAmount("")
    );
  }

  async function handleWithdrawTreasury() {
    const cleanAmount = sanitizeDecimalInput(treasuryAmount);
    const target = treasuryWallet.trim();
    if (!ecoinTokenAddress) return;
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Carteira de destino inválida para saque do Treasury.",
      });
      return;
    }
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: "Insira um valor válido em eCoin para saque.",
      });
      return;
    }
    const parsed = parseUnits(cleanAmount, 18);

    await executeTx(
      "withdrawTreasury",
      `Saque de ${cleanAmount} eCoin do Treasury concluído.`,
      () =>
        writeContractAsync({
          address: treasuryAddress,
          abi: treasuryAbi,
          functionName: "withdraw",
          args: [ecoinTokenAddress, target, parsed],
          chainId: bsc.id,
        }),
      () => {
        setTreasuryAmount("");
        setTreasuryWallet("");
      }
    );
  }

  return (
    <AdminCard
      title="Treasury Vault (eCoin)"
      subtitle="Depósito e saque institucional protegido por limite diário"
      icon={Wallet}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo Treasury eCoin:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                treasuryRowStr
              )} text-emerald-400 font-bold tabular-nums whitespace-nowrap transition-all duration-150`}
            >
              {treasuryRowStr} <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Disponível p/ Saque Hoje:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                remainingDailyRowStr
              )} text-blue-300 tabular-nums whitespace-nowrap`}
            >
              {remainingDailyRowStr}{" "}
              <span className="whitespace-nowrap">eCoin</span>
            </span>
          </div>
        </div>

        <input
          type="text"
          inputMode="decimal"
          placeholder="Quantidade em eCoin"
          value={treasuryAmount}
          onChange={(e) => setTreasuryAmount(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
        />

        <input
          placeholder="Carteira destino para saque (0x...)"
          value={treasuryWallet}
          onChange={(e) => setTreasuryWallet(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleDepositTreasury}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "depositTreasury"
              ? "A Depositar..."
              : "Approve & Deposit"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleWithdrawTreasury}
            className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "withdrawTreasury"
              ? "A Sacar..."
              : "Withdraw eCoin"}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}