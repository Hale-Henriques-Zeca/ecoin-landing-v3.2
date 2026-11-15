
"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { bsc } from "wagmi/chains";

import { CONTRACTS } from "@/lib/contracts";

import { BuyeCoinCorporateSwapAbi } from "@/lib/abis/BuyeCoinCorporateSwapAbi";

import { poolManagerDiagnosticAbi } from "@/lib/abis/poolManagerDiagnosticAbi";

export default function CorporateSwapDiagnostics() {
  // =====================================================
  // 1. MOUNT GUARD
  // =====================================================

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // =====================================================
  // 2. CONTRACT ADDRESSES
  // =====================================================

  const swapAddress = CONTRACTS.CORPORATE_SWAP;

  const poolManagerAddress =
    CONTRACTS.PANCAKE_INFINITY_POOL_MANAGER;

  const poolId =
    CONTRACTS.PANCAKE_INFINITY_POOL_ID;

  // =====================================================
  // 3. READ PANCAKESWAP POOL KEY
  // =====================================================

  const {
    data: poolKey,
    error: poolKeyError,
    isLoading: poolKeyLoading,
    isSuccess: poolKeySuccess,
  } = useReadContract({
    address: poolManagerAddress,
    abi: poolManagerDiagnosticAbi,
    functionName: "poolIdToPoolKey",
    args: [poolId],
    chainId: bsc.id,
    query: {
      enabled: mounted,
    },
  });

  // =====================================================
  // 4. READ PANCAKESWAP SLOT0
  // =====================================================

  const {
    data: slot0,
    error: slot0Error,
    isLoading: slot0Loading,
    isSuccess: slot0Success,
  } = useReadContract({
    address: poolManagerAddress,
    abi: poolManagerDiagnosticAbi,
    functionName: "getSlot0",
    args: [poolId],
    chainId: bsc.id,
    query: {
      enabled: mounted,
    },
  });

  // =====================================================
  // 5. READ CORPORATE SWAP POOL ID
  // =====================================================

  const {
    data: contractPoolId,
    error: contractPoolIdError,
    isLoading: contractPoolIdLoading,
  } = useReadContract({
    address: swapAddress,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "poolId",
    chainId: bsc.id,
    query: {
      enabled: mounted,
    },
  });

  // =====================================================
  // 6. READ CORPORATE SWAP USDT
  // =====================================================

  const {
    data: contractUSDT,
    error: contractUSDTError,
  } = useReadContract({
    address: swapAddress,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "USDT",
    chainId: bsc.id,
    query: {
      enabled: mounted,
    },
  });

  // =====================================================
  // 7. READ CORPORATE SWAP ECOIN
  // =====================================================

  const {
    data: contractECOIN,
    error: contractECOINError,
  } = useReadContract({
    address: swapAddress,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "ECOIN",
    chainId: bsc.id,
    query: {
      enabled: mounted,
    },
  });

  // =====================================================
  // 8. READ PAUSE STATUS
  // =====================================================

  const {
    data: contractPaused,
    error: contractPausedError,
  } = useReadContract({
    address: swapAddress,
    abi: BuyeCoinCorporateSwapAbi,
    functionName: "paused",
    chainId: bsc.id,
    query: {
      enabled: mounted,
    },
  });

  // =====================================================
  // 9. VALIDATE POOL CONFIGURATION
  // =====================================================

  const poolIdMatches =
    contractPoolId !== undefined &&
    contractPoolId.toLowerCase() === poolId.toLowerCase();

  // =====================================================
  // 10. DIAGNOSTIC DATA
  // =====================================================

  const diagnosticData = {
    network: "BNB SMART CHAIN MAINNET",

    addresses: {
      corporateSwap: swapAddress,
      pancakePoolManager: poolManagerAddress,
    },

    configuredPoolId: poolId,

    corporateSwapConfiguration: {
      USDT: contractUSDT ?? null,
      ECOIN: contractECOIN ?? null,
      poolId: contractPoolId ?? null,
      paused: contractPaused ?? null,
    },

    poolValidation: {
      poolIdMatches,
      poolKey,
      slot0,
    },

    errors: {
      poolKey: poolKeyError?.message ?? null,
      slot0: slot0Error?.message ?? null,
      contractPoolId: contractPoolIdError?.message ?? null,
      contractUSDT: contractUSDTError?.message ?? null,
      contractECOIN: contractECOINError?.message ?? null,
      contractPaused: contractPausedError?.message ?? null,
    },
  };

  // =====================================================
  // 11. MOUNT GUARD
  // =====================================================

  if (!mounted) return null;

  // =====================================================
  // 12. STATUS COMPONENT
  // =====================================================

  const Status = ({
    label,
    loading,
    error,
    success,
  }: {
    label: string;
    loading?: boolean;
    error?: Error | null;
    success?: boolean;
  }) => {
    const color = loading
      ? "text-yellow-400"
      : error
        ? "text-red-400"
        : success
          ? "text-green-400"
          : "text-gray-500";

    const status = loading
      ? "LOADING"
      : error
        ? "ERROR"
        : success
          ? "CONNECTED"
          : "WAITING";

    return (
      <div className="flex items-center justify-between gap-3">
        <span className="text-gray-400">{label}</span>
        <span className={`${color} font-bold`}>
          {status}
        </span>
      </div>
    );
  };

  // =====================================================
  // 13. RENDER
  // =====================================================

  return (
    <div className="bg-black border border-green-500/20 rounded-2xl p-6 space-y-5">

      {/* HEADER */}

      <div className="flex items-center justify-between gap-3">

        <h3 className="text-green-400 text-xs font-black uppercase tracking-widest">
          CorporateSwap Diagnostics
        </h3>

        <span className="text-[9px] text-green-500 font-mono">
          READ ONLY · BSC MAINNET
        </span>

      </div>

      {/* CONNECTION STATUS */}

      <div className="space-y-3 text-[10px] font-mono">

        <Status
          label="PANCAKESWAP POOL KEY"
          loading={poolKeyLoading}
          error={poolKeyError}
          success={poolKeySuccess}
        />

        <Status
          label="PANCAKESWAP SLOT0"
          loading={slot0Loading}
          error={slot0Error}
          success={slot0Success}
        />

        <Status
          label="CORPORATE SWAP POOL ID"
          loading={contractPoolIdLoading}
          error={contractPoolIdError}
          success={contractPoolId !== undefined}
        />

      </div>

      {/* POOL ID VALIDATION */}

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">

        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
          Pool ID Validation
        </p>

        {contractPoolId === undefined ? (
          <p className="text-yellow-400 text-xs">
            Waiting for CorporateSwap configuration...
          </p>
        ) : poolIdMatches ? (
          <p className="text-green-400 text-xs font-bold">
            ✓ CONFIGURED POOL ID MATCHES
          </p>
        ) : (
          <p className="text-red-400 text-xs font-bold">
            ✕ POOL ID MISMATCH
          </p>
        )}

      </div>

      {/* DIAGNOSTIC JSON */}

      <div>

        <div className="flex items-center justify-between mb-2">

          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Diagnostic Output
          </p>

          <span className="text-[9px] text-green-500">
            JSON
          </span>

        </div>

        <pre className="text-[10px] leading-relaxed text-green-400 whitespace-pre-wrap break-all overflow-x-auto bg-black/60 p-4 rounded-xl border border-white/5 max-h-[500px] overflow-y-auto">
          {JSON.stringify(
            diagnosticData,
            (_key, value) =>
              typeof value === "bigint"
                ? value.toString()
                : value,
            2
          )}
        </pre>

      </div>

      {/* FOOTER */}

      <p className="text-[10px] text-gray-500 font-mono">
        Diagnostic module only. No token approvals, transfers,
        swaps or contract modifications.
      </p>

    </div>
  );
}
