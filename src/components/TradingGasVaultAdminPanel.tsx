"use client";

import { useState } from "react";

import {
  Fuel,
  ShieldCheck,
  Database,
} from "lucide-react";

import {
  useReadContract,
  useWriteContract,
} from "wagmi";

import { isAddress } from "viem";

import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";

const CONTRACT_ADDRESS =
  "0xEd0B789B53aeF5f90C6e5031cF812757476DEBDb";

export default function TradingGasVaultAdminPanel() {

  const { writeContractAsync } =
    useWriteContract();

  const [reserve, setReserve] =
    useState("");

  const [collector, setCollector] =
    useState("");

  /* ================= STATUS ================= */

  const { data: usdtEnabled } =
    useReadContract({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "usdtEnabled",
    });

  const { data: eusdEnabled } =
    useReadContract({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "eusdEnabled",
    });

  const { data: liquidityReserve } =
    useReadContract({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "liquidityReserve",
    });

  /* ================= ACTIONS ================= */

  async function activateUSDT() {
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "setUSDTEnabled",
      args: [true],
    });
  }

  async function pauseUSDT() {
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "setUSDTEnabled",
      args: [false],
    });
  }

  async function activateEUSD() {
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "setEUSDEnabled",
      args: [true],
    });
  }

  async function pauseEUSD() {
    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "setEUSDEnabled",
      args: [false],
    });
  }

  async function updateReserve() {

    if (!isAddress(reserve)) {
      alert("Invalid reserve address");
      return;
    }

    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "setLiquidityReserve",
      args: [reserve],
    });
  }

  async function updateCollector() {

    if (!isAddress(collector)) {
      alert("Invalid collector address");
      return;
    }

    await writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: TradingGasVaultAbi,
      functionName: "setCollector",
      args: [collector],
    });
  }

  return (
    <div className="space-y-8">

      {/* STATUS */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Fuel className="text-[#D4AF37]" />

          <h2 className="font-black text-xl">
            Trading Gas Vault
          </h2>

        </div>

        <div className="space-y-4">

          <div className="flex justify-between">

            <span>USDT Deposits</span>

            <span
              className={
                usdtEnabled
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {usdtEnabled
                ? "ACTIVE"
                : "PAUSED"}
            </span>

          </div>

          <div className="flex justify-between">

            <span>EUSD Deposits</span>

            <span
              className={
                eusdEnabled
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {eusdEnabled
                ? "ACTIVE"
                : "PAUSED"}
            </span>

          </div>

          <div className="flex justify-between">

            <span>Liquidity Reserve</span>

            <span className="text-xs text-white/60">

              {typeof liquidityReserve === "string"
                ? `${liquidityReserve.slice(
                    0,
                    6
                  )}...${liquidityReserve.slice(-4)}`
                : "Not Set"}

            </span>

          </div>

        </div>

      </div>

      {/* TOKEN CONTROL */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <ShieldCheck className="text-[#D4AF37]" />

          <h2 className="font-black text-xl">
            Deposit Token Controls
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={activateUSDT}
            className="bg-green-500 text-black font-black py-4 rounded-2xl"
          >
            Activate USDT
          </button>

          <button
            onClick={pauseUSDT}
            className="bg-red-500 text-black font-black py-4 rounded-2xl"
          >
            Pause USDT
          </button>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">

          <button
            onClick={activateEUSD}
            className="bg-blue-500 text-black font-black py-4 rounded-2xl"
          >
            Activate EUSD
          </button>

          <button
            onClick={pauseEUSD}
            className="bg-orange-500 text-black font-black py-4 rounded-2xl"
          >
            Pause EUSD
          </button>

        </div>

      </div>

      {/* RESERVE */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Database className="text-[#D4AF37]" />

          <h2 className="font-black text-xl">
            Liquidity Reserve
          </h2>

        </div>

        <input
          value={reserve}
          onChange={(e) =>
            setReserve(e.target.value)
          }
          placeholder="Reserve Address"
          className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 mb-4"
        />

        <button
          onClick={updateReserve}
          className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl"
        >
          Update Reserve
        </button>

      </div>

      {/* COLLECTOR */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h2 className="font-black text-xl mb-6">
          Fee Collector
        </h2>

        <input
          value={collector}
          onChange={(e) =>
            setCollector(e.target.value)
          }
          placeholder="Collector Address"
          className="w-full bg-black border border-white/10 rounded-2xl px-4 py-4 mb-4"
        />

        <button
          onClick={updateCollector}
          className="w-full bg-purple-500 text-black font-black py-4 rounded-2xl"
        >
          Update Collector
        </button>

      </div>

    </div>
  );
}