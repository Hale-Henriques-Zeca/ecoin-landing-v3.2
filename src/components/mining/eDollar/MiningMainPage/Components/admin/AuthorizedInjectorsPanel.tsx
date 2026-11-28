"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { isAddress } from "viem";
import { miningStakingAdminAbi } from "@/lib/abis/eDollarMining/miningStakingAdminAbi";
import { AdminFeedbackState, ExecuteTxFn } from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import { AdminCard } from "./StablecoinSharedUI";

type AuthorizedInjectorsPanelProps = {
  miningStakingAddress: `0x${string}`;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function AuthorizedInjectorsPanel({
  miningStakingAddress,
  busyAction,
  onFeedback,
  executeTx,
}: AuthorizedInjectorsPanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [injector, setInjector] = useState("");

  async function handleAuthorizeInjector(allowed: boolean) {
    const target = injector.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço de Injector inválido.",
      });
      return;
    }

    await executeTx(
      allowed ? "authorizeInjector" : "removeInjector",
      allowed
        ? `Injector ${target.slice(0, 6)}...${target.slice(-4)} autorizado.`
        : `Permissão de Injector removida para ${target.slice(
            0,
            6
          )}...${target.slice(-4)}.`,
      () =>
        writeContractAsync({
          address: miningStakingAddress,
          abi: miningStakingAdminAbi,
          functionName: "setAuthorizedInjector",
          args: [target, allowed],
          chainId: bsc.id,
        }),
      () => setInjector("")
    );
  }

  return (
    <AdminCard
      title="Authorized Injectors"
      subtitle="Gestão de carteiras e contratos autorizados a injetar"
      icon={Settings}
    >
      <div className="space-y-4">
        <input
          placeholder="Injector Address (0x...)"
          value={injector}
          onChange={(e) => setInjector(e.target.value)}
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
              : "Authorize"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null}
            onClick={() => handleAuthorizeInjector(false)}
            className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "removeInjector" ? "A Remover..." : "Remove"}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}