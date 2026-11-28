"use client";

import React, { useState } from "react";
import { Wallet } from "lucide-react";
import { useWriteContract, usePublicClient } from "wagmi";
import { bsc } from "wagmi/chains";
import { parseUnits, isAddress, erc20Abi } from "viem";
import {
  treasuryAbi,
  StablecoinTokenSymbol,
  formatTokenAmount,
  sanitizeDecimalInput,
  getRowMetricSize,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import { AdminCard } from "./StablecoinSharedUI";

type TreasuryVaultPanelProps = {
  treasuryAddress: `0x${string}`;
  usdtAddress: `0x${string}`;
  eusdAddress: `0x${string}`;
  ecoinAddress: `0x${string}`;
  treasuryUSDTBN: bigint;
  treasuryEUSDBN: bigint;
  treasuryECOINBN: bigint;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function TreasuryVaultPanel({
  treasuryAddress,
  usdtAddress,
  eusdAddress,
  ecoinAddress,
  treasuryUSDTBN,
  treasuryEUSDBN,
  treasuryECOINBN,
  busyAction,
  onFeedback,
  executeTx,
}: TreasuryVaultPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({ chainId: bsc.id });

  const [token, setToken] = useState<StablecoinTokenSymbol>("USDT");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");

  const tokenAddress =
    token === "USDT"
      ? usdtAddress
      : token === "EUSD"
      ? eusdAddress
      : ecoinAddress;

  const usdtRowStr = formatTokenAmount(treasuryUSDTBN, 2, 4);
  const eusdRowStr = formatTokenAmount(treasuryEUSDBN, 2, 4);
  const ecoinRowStr = formatTokenAmount(treasuryECOINBN, 2, 4);

  async function handleApproveToken() {
    const cleanAmount = sanitizeDecimalInput(amount);
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: `Insira uma quantidade válida em ${token} para aprovação.`,
      });
      return;
    }

    await executeTx(
      "approveTreasuryToken",
      `Aprovação de ${cleanAmount} ${token} para o Treasury concluída.`,
      () =>
        writeContractAsync({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "approve",
          args: [treasuryAddress, parseUnits(cleanAmount, 18)],
          chainId: bsc.id,
        })
    );
  }

  async function handleDepositTreasury() {
    const cleanAmount = sanitizeDecimalInput(amount);
    if (!cleanAmount) {
      onFeedback({
        type: "error",
        message: `Insira uma quantidade válida em ${token} para depósito.`,
      });
      return;
    }

    const parsed = parseUnits(cleanAmount, 18);

    await executeTx(
      "depositTreasury",
      `Depósito de ${cleanAmount} ${token} no Treasury concluído.`,
      async () => {
        const approveHash = await writeContractAsync({
          address: tokenAddress,
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
          args: [tokenAddress, parsed],
          chainId: bsc.id,
        });
      },
      () => setAmount("")
    );
  }

  async function handleWithdrawTreasury() {
    const cleanAmount = sanitizeDecimalInput(amount);
    const target = wallet.trim();

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
        message: `Insira uma quantidade válida em ${token} para saque.`,
      });
      return;
    }

    await executeTx(
      "withdrawTreasury",
      `Saque de ${cleanAmount} ${token} enviado para ${target.slice(
        0,
        6
      )}...${target.slice(-4)}.`,
      () =>
        writeContractAsync({
          address: treasuryAddress,
          abi: treasuryAbi,
          functionName: "withdraw",
          args: [tokenAddress, target, parseUnits(cleanAmount, 18)],
          chainId: bsc.id,
        }),
      () => {
        setAmount("");
        setWallet("");
      }
    );
  }

  return (
    <AdminCard
      title="Treasury Vault"
      subtitle="Gestão multi-ativo (USDT, EUSD e ECOIN)"
      icon={Wallet}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo USDT:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                usdtRowStr
              )} text-emerald-400 font-bold tabular-nums whitespace-nowrap`}
            >
              {usdtRowStr} <span className="whitespace-nowrap">USDT</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo EUSD:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                eusdRowStr
              )} text-blue-400 font-bold tabular-nums whitespace-nowrap`}
            >
              {eusdRowStr} <span className="whitespace-nowrap">EUSD</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-white/50 truncate">
              Saldo ECOIN:
            </span>
            <span
              className={`shrink-0 ${getRowMetricSize(
                ecoinRowStr
              )} text-[#D4AF37] font-bold tabular-nums whitespace-nowrap`}
            >
              {ecoinRowStr} <span className="whitespace-nowrap">ECOIN</span>
            </span>
          </div>
        </div>

        <select
          value={token}
          onChange={(e) => setToken(e.target.value as StablecoinTokenSymbol)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs sm:text-sm cursor-pointer"
        >
          <option value="USDT">USDT</option>
          <option value="EUSD">EUSD</option>
          <option value="ECOIN">ECOIN</option>
        </select>

        <input
          type="text"
          inputMode="decimal"
          placeholder={`Amount (${token})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs sm:text-sm"
        />

        <input
          placeholder="Wallet destino para saque (0x...)"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleApproveToken}
            className="bg-blue-500 hover:bg-blue-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "approveTreasuryToken"
              ? "A Aprovar..."
              : `Approve ${token}`}
          </button>

          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleDepositTreasury}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "depositTreasury"
              ? "A Depositar..."
              : `Approve & Deposit`}
          </button>
        </div>

        <button
          type="button"
          disabled={busyAction !== null}
          onClick={handleWithdrawTreasury}
          className="w-full bg-red-500 hover:bg-red-400 text-black font-black py-3.5 px-4 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
        >
          {busyAction === "withdrawTreasury"
            ? "A Sacar..."
            : `Withdraw ${token}`}
        </button>
      </div>
    </AdminCard>
  );
}