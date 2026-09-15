"use client";

import { useEffect, useState } from "react";

import { useReadContract } from "wagmi";

import { CONTRACTS } from "@/lib/contracts";

import { formatUnits } from "viem";

export function useRewardStreaming(
  address?: `0x${string}`
) {

  /* ===================================================== */
  /*                     READ CONTRACTS                     */
  /* ===================================================== */

  const { data: rewardRates } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: CONTRACTS.MINING_STAKING,
    functionName: "rewardRates",
    args: address ? [address] : undefined,
  });

  const { data: projected } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: CONTRACTS.MINING_STAKING,
    functionName: "projectedRewards",
    args: address ? [address] : undefined,
  });

  const { data: pending } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
  });

  const { data: preview } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: CONTRACTS.MINING_STAKING,
    functionName: "preview",
    args: address ? [address] : undefined,
  });

  /* ===================================================== */
  /*                    REWARD RATES                        */
  /* ===================================================== */

  const usdtPerSecond =
    rewardRates
      ? Number(formatUnits(rewardRates[0], 18))
      : 0;

  const eusdPerSecond =
    rewardRates
      ? Number(formatUnits(rewardRates[1], 18))
      : 0;

  const usdtPerMinute =
    rewardRates
      ? Number(formatUnits(rewardRates[2], 18))
      : 0;

  const eusdPerMinute =
    rewardRates
      ? Number(formatUnits(rewardRates[3], 18))
      : 0;

  const usdtPerHour =
    rewardRates
      ? Number(formatUnits(rewardRates[4], 18))
      : 0;

  const eusdPerHour =
    rewardRates
      ? Number(formatUnits(rewardRates[5], 18))
      : 0;

  const usdtPerDay =
    rewardRates
      ? Number(formatUnits(rewardRates[6], 18))
      : 0;

  const eusdPerDay =
    rewardRates
      ? Number(formatUnits(rewardRates[7], 18))
      : 0;

  /* ===================================================== */
  /*                 PROJECTED REWARDS                      */
  /* ===================================================== */

  const projected24hUSDT =
    projected
      ? Number(formatUnits(projected[0], 18))
      : 0;

  const projected24hEUSD =
    projected
      ? Number(formatUnits(projected[1], 18))
      : 0;

  const projected7dUSDT =
    projected
      ? Number(formatUnits(projected[2], 18))
      : 0;

  const projected7dEUSD =
    projected
      ? Number(formatUnits(projected[3], 18))
      : 0;

  const projected30dUSDT =
    projected
      ? Number(formatUnits(projected[4], 18))
      : 0;

  const projected30dEUSD =
    projected
      ? Number(formatUnits(projected[5], 18))
      : 0;

  /* ===================================================== */
  /*                   PENDING REWARDS                      */
  /* ===================================================== */

  const pendingUSDT =
    pending
      ? Number(formatUnits(pending[0], 18))
      : 0;

  const pendingEUSD =
    pending
      ? Number(formatUnits(pending[1], 18))
      : 0;

  /* ===================================================== */
  /*                  PREVIEW / STATUS                      */
  /* ===================================================== */

  const previewUSDT =
    preview
      ? Number(formatUnits(preview[0], 18))
      : 0;

  const previewEUSD =
    preview
      ? Number(formatUnits(preview[1], 18))
      : 0;

  const remainingCapacity =
    preview
      ? Number(formatUnits(preview[2], 18))
      : 0;

  const usedCapacity =
    preview
      ? Number(formatUnits(preview[3], 18))
      : 0;

  const maxCapacity =
    preview
      ? Number(formatUnits(preview[4], 18))
      : 0;

  const willMine =
    preview
      ? preview[5]
      : false;

  /* ===================================================== */
  /*                    VISUAL ENGINE                       */
  /* ===================================================== */

  const [visualUSDT, setVisualUSDT] =
    useState(0);

  const [visualEUSD, setVisualEUSD] =
    useState(0);

  /* ===================================================== */
  /*               SYNC REAL BLOCKCHAIN                     */
  /* ===================================================== */

  useEffect(() => {
    setVisualUSDT(pendingUSDT);
  }, [pendingUSDT]);

  useEffect(() => {
    setVisualEUSD(pendingEUSD);
  }, [pendingEUSD]);

  /* ===================================================== */
  /*               INTERPOLATION ENGINE                     */
  /* ===================================================== */

  useEffect(() => {

    if (!willMine) return;

    const interval = setInterval(() => {

      setVisualUSDT(prev =>
        prev + usdtPerSecond
      );

      setVisualEUSD(prev =>
        prev + eusdPerSecond
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [
    usdtPerSecond,
    eusdPerSecond,
    willMine
  ]);

  /* ===================================================== */
  /*                   CALCULATIONS                         */
  /* ===================================================== */

  const totalPending =
    pendingUSDT + pendingEUSD;

  const totalProjected24h =
    projected24hUSDT + projected24hEUSD;

  const totalProjected7d =
    projected7dUSDT + projected7dEUSD;

  const totalProjected30d =
    projected30dUSDT + projected30dEUSD;

    

  /* ===================================================== */
  /*                       RETURN                           */
  /* ===================================================== */

  return {

    /* REAL */
    pendingUSDT,
    pendingEUSD,

    /* VISUAL */
    visualUSDT,
    visualEUSD,

    /* VELOCITY */
    usdtPerSecond,
    eusdPerSecond,

    usdtPerMinute,
    eusdPerMinute,

    usdtPerHour,
    eusdPerHour,

    usdtPerDay,
    eusdPerDay,

    /* PROJECTED */
    projected24hUSDT,
    projected24hEUSD,

    projected7dUSDT,
    projected7dEUSD,

    projected30dUSDT,
    projected30dEUSD,

    /* TOTALS */
    totalPending,
    totalProjected24h,
    totalProjected7d,
    totalProjected30d,

    /* PREVIEW */
    previewUSDT,
    previewEUSD,

    remainingCapacity,
    usedCapacity,
    maxCapacity,

    /* STATUS */
    willMine,

  };

}