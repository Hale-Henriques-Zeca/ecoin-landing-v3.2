"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { eDollarEcGasSaleAbi } from "@/lib/abis/eDollarMining/eDollarEcGasSaleAbi";
import { ExecuteTxFn } from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import { AdminCard } from "./StablecoinSharedUI";

type DepositTokenControlsPanelProps = {
  ecGasSaleAddress: `0x${string}`;
  usdtEnabled?: boolean;
  eusdEnabled?: boolean;
  busyAction: string | null;
  executeTx: ExecuteTxFn;
};

export function DepositTokenControlsPanel({
  ecGasSaleAddress,
  usdtEnabled,
  eusdEnabled,
  busyAction,
  executeTx,
}: DepositTokenControlsPanelProps) {
  const { writeContractAsync } = useWriteContract();

  async function handleSetUSDTEnabled(enabled: boolean) {
    await executeTx(
      enabled ? "enableUSDT" : "pauseUSDT",
      enabled
        ? "Pagamentos/Depósitos em USDT ativados."
        : "Pagamentos/Depósitos em USDT pausados.",
      () =>
        writeContractAsync({
          address: ecGasSaleAddress,
          abi: eDollarEcGasSaleAbi,
          functionName: "setUSDTEnabled",
          args: [enabled],
          chainId: bsc.id,
        })
    );
  }

  async function handleSetEUSDEnabled(enabled: boolean) {
    await executeTx(
      enabled ? "enableEUSD" : "pauseEUSD",
      enabled
        ? "Pagamentos/Depósitos em EUSD ativados."
        : "Pagamentos/Depósitos em EUSD pausados.",
      () =>
        writeContractAsync({
          address: ecGasSaleAddress,
          abi: eDollarEcGasSaleAbi,
          functionName: "setEUSDEnabled",
          args: [enabled],
          chainId: bsc.id,
        })
    );
  }

  return (
    <AdminCard
      title="Deposit Token Controls"
      subtitle="Ativação ou pausa de aceitação USDT e EUSD"
      icon={AlertTriangle}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 font-mono space-y-2 text-[11px] sm:text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50">Estado USDT:</span>
            <span
              className={`font-bold ${
                usdtEnabled === undefined
                  ? "text-white/60"
                  : usdtEnabled
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {usdtEnabled === undefined
                ? "ON-CHAIN"
                : usdtEnabled
                ? "ATIVO"
                : "PAUSADO"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50">Estado EUSD:</span>
            <span
              className={`font-bold ${
                eusdEnabled === undefined
                  ? "text-white/60"
                  : eusdEnabled
                  ? "text-blue-400"
                  : "text-orange-400"
              }`}
            >
              {eusdEnabled === undefined
                ? "ON-CHAIN"
                : eusdEnabled
                ? "ATIVO"
                : "PAUSADO"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null || usdtEnabled === true}
            onClick={() => handleSetUSDTEnabled(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "enableUSDT" ? "A Ativar..." : "Activate USDT"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null || usdtEnabled === false}
            onClick={() => handleSetUSDTEnabled(false)}
            className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "pauseUSDT" ? "A Pausar..." : "Pause USDT"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null || eusdEnabled === true}
            onClick={() => handleSetEUSDEnabled(true)}
            className="bg-blue-500 hover:bg-blue-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "enableEUSD" ? "A Ativar..." : "Activate EUSD"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null || eusdEnabled === false}
            onClick={() => handleSetEUSDEnabled(false)}
            className="bg-orange-500 hover:bg-orange-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "pauseEUSD" ? "A Pausar..." : "Pause EUSD"}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}