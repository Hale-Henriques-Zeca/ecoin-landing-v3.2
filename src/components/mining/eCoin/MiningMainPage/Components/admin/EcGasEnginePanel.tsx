"use client";

import React, { useState } from "react";
import { Fuel } from "lucide-react";
import { useWriteContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { isAddress } from "viem";
import {
  ecGasSaleECoinAdminAbi,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import { AdminCard, AddressPill } from "./AdminSharedUI";

type EcGasEnginePanelProps = {
  gasSaleAddress: `0x${string}`;
  ecoinSaleEnabled?: boolean;
  currentGasCollector?: string;
  currentGasMining?: string;
  currentActivityRegistry?: string;
  busyAction: string | null;
  onFeedback: (fb: AdminFeedbackState) => void;
  executeTx: ExecuteTxFn;
};

export function EcGasEnginePanel({
  gasSaleAddress,
  ecoinSaleEnabled,
  currentGasCollector,
  currentGasMining,
  currentActivityRegistry,
  busyAction,
  onFeedback,
  executeTx,
}: EcGasEnginePanelProps) {
  const { writeContractAsync } = useWriteContract();
  const [gasCollectorInput, setGasCollectorInput] = useState("");
  const [gasMiningInput, setGasMiningInput] = useState("");
  const [activityRegistryInput, setActivityRegistryInput] = useState("");

  async function handleSetECoinEnabled(enabled: boolean) {
    await executeTx(
      enabled ? "enableECoinSale" : "disableECoinSale",
      enabled
        ? "Venda de ecGas com eCoin ativada."
        : "Venda de ecGas com eCoin pausada.",
      () =>
        writeContractAsync({
          address: gasSaleAddress,
          abi: ecGasSaleECoinAdminAbi,
          functionName: "setECoinEnabled",
          args: [enabled],
          chainId: bsc.id,
        })
    );
  }

  async function handleSetGasCollector() {
    const target = gasCollectorInput.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço de Collector inválido.",
      });
      return;
    }
    await executeTx(
      "setGasCollector",
      "Collector do EcGasSaleECoin atualizado.",
      () =>
        writeContractAsync({
          address: gasSaleAddress,
          abi: ecGasSaleECoinAdminAbi,
          functionName: "setCollector",
          args: [target],
          chainId: bsc.id,
        }),
      () => setGasCollectorInput("")
    );
  }

  async function handleSetGasMining() {
    const target = gasMiningInput.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço do contrato de Mining inválido.",
      });
      return;
    }
    await executeTx(
      "setGasMining",
      "Contrato de Mining vinculado ao EcGasSaleECoin.",
      () =>
        writeContractAsync({
          address: gasSaleAddress,
          abi: ecGasSaleECoinAdminAbi,
          functionName: "setMining",
          args: [target],
          chainId: bsc.id,
        }),
      () => setGasMiningInput("")
    );
  }

  async function handleSetActivityRegistry() {
    const target = activityRegistryInput.trim();
    if (!isAddress(target)) {
      onFeedback({
        type: "error",
        message: "Endereço do ActivityRegistry inválido.",
      });
      return;
    }
    await executeTx(
      "setActivityRegistry",
      "ActivityRegistry atualizado no EcGasSaleECoin.",
      () =>
        writeContractAsync({
          address: gasSaleAddress,
          abi: ecGasSaleECoinAdminAbi,
          functionName: "setActivityRegistry",
          args: [target],
          chainId: bsc.id,
        }),
      () => setActivityRegistryInput("")
    );
  }

  return (
    <AdminCard
      title="ecGas Sale Engine (EcGasSaleECoin)"
      subtitle="Controlo de venda de capacidade 1.3x e integrações"
      icon={Fuel}
    >
      <div className="space-y-4">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 space-y-2.5 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50 shrink-0">Status Venda eCoin:</span>
            <span
              className={`whitespace-nowrap font-bold ${
                ecoinSaleEnabled ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {ecoinSaleEnabled ? "ATIVADA (1.3x)" : "PAUSADA"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Collector:</span>
            <AddressPill address={currentGasCollector} />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Mining Staking:</span>
            <AddressPill address={currentGasMining} />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Activity Registry:</span>
            <AddressPill address={currentActivityRegistry} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            type="button"
            disabled={busyAction !== null || Boolean(ecoinSaleEnabled)}
            onClick={() => handleSetECoinEnabled(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "enableECoinSale"
              ? "A Ativar..."
              : "Ativar Venda eCoin"}
          </button>

          <button
            type="button"
            disabled={busyAction !== null || ecoinSaleEnabled === false}
            onClick={() => handleSetECoinEnabled(false)}
            className="bg-red-500 hover:bg-red-400 text-black font-black py-3.5 px-3 rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "disableECoinSale"
              ? "A Pausar..."
              : "Pausar Venda eCoin"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            placeholder="Novo Collector (0x...)"
            value={gasCollectorInput}
            onChange={(e) => setGasCollectorInput(e.target.value)}
            className="min-w-0 flex-1 bg-black border border-white/10 focus:border-purple-500/50 outline-none rounded-2xl px-4 py-3 text-white font-mono text-xs"
          />
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleSetGasCollector}
            className="shrink-0 py-3 sm:py-0 px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "setGasCollector"
              ? "A Guardar..."
              : "Set Collector"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            placeholder="Novo Mining Contract (0x...)"
            value={gasMiningInput}
            onChange={(e) => setGasMiningInput(e.target.value)}
            className="min-w-0 flex-1 bg-black border border-white/10 focus:border-purple-500/50 outline-none rounded-2xl px-4 py-3 text-white font-mono text-xs"
          />
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleSetGasMining}
            className="shrink-0 py-3 sm:py-0 px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "setGasMining" ? "A Guardar..." : "Set Mining"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            placeholder="Novo ActivityRegistry (0x...)"
            value={activityRegistryInput}
            onChange={(e) => setActivityRegistryInput(e.target.value)}
            className="min-w-0 flex-1 bg-black border border-white/10 focus:border-purple-500/50 outline-none rounded-2xl px-4 py-3 text-white font-mono text-xs"
          />
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={handleSetActivityRegistry}
            className="shrink-0 py-3 sm:py-0 px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-[11px] sm:text-xs uppercase cursor-pointer disabled:opacity-40 whitespace-nowrap"
          >
            {busyAction === "setActivityRegistry"
              ? "A Guardar..."
              : "Set Registry"}
          </button>
        </div>
      </div>
    </AdminCard>
  );
}