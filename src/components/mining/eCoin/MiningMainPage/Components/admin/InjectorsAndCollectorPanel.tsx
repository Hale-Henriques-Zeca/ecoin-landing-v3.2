"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { isAddress } from "viem";
import {
  miningStakingECoinAdminAbi,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import { AdminCard, AddressPill } from "./AdminSharedUI";

type InjectorsAndCollectorPanelProps = {
  stakingAddress: `0x${string}`;
  currentClaimCollector?: string;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function InjectorsAndCollectorPanel({
  stakingAddress,
  currentClaimCollector,
  busyAction,
  onFeedback,
  executeTx,
}: InjectorsAndCollectorPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [injectorAddress, setInjectorAddress] = useState("");
  const [claimCollectorInput, setClaimCollectorInput] = useState("");

  async function handleAuthorizeInjector(allowed: boolean) {
    const target = injectorAddress.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço de injector inválido.",
      });
      return;
    }
    await executeTx(
      allowed ? "authorizeInjector" : "removeInjector",
      allowed
        ? `Injector ${target.slice(0, 6)}...${target.slice(-4)} autorizado.`
        : `Permissão de injector removida para ${target.slice(
            0,
            6
          )}...${target.slice(-4)}.`,
      () =>
        writeContractAsync({
          address: stakingAddress,
          abi: miningStakingECoinAdminAbi,
          functionName: "setAuthorizedInjector",
          args: [target, allowed],
          chainId: bsc.id,
        }),
      () => setInjectorAddress("")
    );
  }

  async function handleUpdateClaimCollector() {
    const target = claimCollectorInput.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço do ClaimCollector inválido.",
      });
      return;
    }
    await executeTx(
      "setClaimCollector",
      "ClaimCollector atualizado com sucesso.",
      () =>
        writeContractAsync({
          address: stakingAddress,
          abi: miningStakingECoinAdminAbi,
          functionName: "setClaimCollector",
          args: [target],
          chainId: bsc.id,
        }),
      () => setClaimCollectorInput("")
    );
  }

  return (
    <AdminCard
      title="Injectors & Claim Collector"
      subtitle="Autorização de contratos injetores e coletor de taxas"
      icon={Settings}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 text-[11px] sm:text-xs font-mono flex items-center justify-between gap-2 min-w-0">
          <span className="text-white/50 shrink-0">ClaimCollector Atual:</span>
          <AddressPill
            address={currentClaimCollector}
            accentClass="text-[#D4AF37] font-bold"
          />
        </div>

        <input
          placeholder="Endereço do Injector (ex: EcGasSaleECoin 0x...)"
          value={injectorAddress}
          onChange={(e) => setInjectorAddress(e.target.value)}
          className="w-full bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3.5 text-white font-mono text-xs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={() => handleAuthorizeInjector(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "authorizeInjector"
              ? "A Autorizar..."
              : "Authorize Injector"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null}
            onClick={() => handleAuthorizeInjector(false)}
            className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "removeInjector"
              ? "A Remover..."
              : "Remove Injector"}
          </button>
        </div>

        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row gap-2">
          <input
            placeholder="Novo ClaimCollectorECoin (0x...)"
            value={claimCollectorInput}
            onChange={(e) => setClaimCollectorInput(e.target.value)}
            className="min-w-0 flex-1 bg-black border border-white/10 focus:border-[#D4AF37]/50 outline-none rounded-2xl px-4 py-3 text-white font-mono text-xs"
          />
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleUpdateClaimCollector}
            className="shrink-0 py-3 sm:py-0 px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-black rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "setClaimCollector"
              ? "A Atualizar..."
              : "Atualizar"}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}