"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits, maxUint256, erc20Abi } from "viem";
import { bsc } from "wagmi/chains";
import { useQueryClient } from "@tanstack/react-query";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";
import { publicClient } from "@/lib/publicClient";

const STAKING = CONTRACTS.eCoin_Mining_Staking_eCoin as `0x${string}`;
const ECOIN = CONTRACTS.ECOIN as `0x${string}`;

export interface MiningSessionItem {
  id: number;
  startedAt: bigint;
  endedAt: bigint;
  gasPurchased: bigint;
  gasConsumed: bigint;
  claimedECoin: bigint;
  completed: boolean;
}

export function useMiningStakingeCoin() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const queryClient = useQueryClient();

  const [now, setNow] = useState(() => Date.now());

  const [approveHash, setApproveHash] = useState<`0x${string}`>();
  const [stakeHash, setStakeHash] = useState<`0x${string}`>();
  const [claimHash, setClaimHash] = useState<`0x${string}`>();
  const [unstakeHash, setUnstakeHash] = useState<`0x${string}`>();
  const [pingHash, setPingHash] = useState<`0x${string}`>();

  // 🔁 AUTO REFRESH (LIVE TIMERS & COOLDOWNS)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= READ (ECoinMiningStakingECoin) ================= */

  const { data: totalStaked } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "totalStaked",
    chainId: 56,
  });

  const { data: totalEligibleStaked } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "totalEligibleStaked",
    chainId: 56,
  });

  const { data: totalStakers } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "totalStakers",
    chainId: 56,
  });

  const { data: rewardBufferECoinRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "rewardBufferECoin",
    chainId: 56,
  });

  const { data: userInfo } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "users",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const { data: isMiningActiveRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "isMiningActive",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const { data: gasCapacityRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "gasCapacity",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const { data: gasConsumedRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "gasConsumed",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const { data: pendingRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
    chainId: 56,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: previewRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "preview",
    args: address ? [address] : undefined,
    chainId: 56,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: rewardRatesRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "rewardRates",
    args: address ? [address] : undefined,
    chainId: 56,
    query: {
      enabled: !!address,
      refetchInterval: 10000,
    },
  });

  const { data: projectedRewardsRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "projectedRewards",
    args: address ? [address] : undefined,
    chainId: 56,
    query: {
      enabled: !!address,
      refetchInterval: 10000,
    },
  });

  const { data: lastClaim } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "lastClaim",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address },
  });

  const { data: stakeTimestamp } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "stakeTimestamp",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address },
  });

  const { data: shareBP } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "userShareBP",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address },
  });

  const { data: walletBalanceRaw } = useReadContract({
    abi: erc20Abi,
    address: ECOIN,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: 56,
    query: { enabled: !!address },
  });

  /* ================= WRITE ================= */

  async function stake(amount: string) {
    if (!amount || !address || !publicClient) return;

    const bn = parseUnits(amount, 18);
    if (bn <= 0n) return;

    const allowance = (await publicClient.readContract({
      address: ECOIN,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, STAKING],
    })) as bigint;

    // 1. APPROVE (aguarda confirmação on-chain antes de executar stake)
    if (allowance < bn) {
      const appHash = await writeContractAsync({
        address: ECOIN,
        abi: erc20Abi,
        functionName: "approve",
        args: [STAKING, maxUint256],
        account: address,
        chain: bsc,
      });

      setApproveHash(appHash);
      await publicClient.waitForTransactionReceipt({ hash: appHash });
    }

    // 2. STAKE
    const hash = await writeContractAsync({
      abi: eCoinMiningStakingAbi,
      address: STAKING,
      functionName: "stake",
      args: [bn],
      account: address,
      chain: bsc,
    });

    setStakeHash(hash);
    return hash;
  }

  async function stakeFor(beneficiary: `0x${string}`, amount: string) {
    if (!amount || !address || !beneficiary || !publicClient) return;

    const bn = parseUnits(amount, 18);
    if (bn <= 0n) return;

    const allowance = (await publicClient.readContract({
      address: ECOIN,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, STAKING],
    })) as bigint;

    if (allowance < bn) {
      const appHash = await writeContractAsync({
        address: ECOIN,
        abi: erc20Abi,
        functionName: "approve",
        args: [STAKING, maxUint256],
        account: address,
        chain: bsc,
      });

      setApproveHash(appHash);
      await publicClient.waitForTransactionReceipt({ hash: appHash });
    }

    const hash = await writeContractAsync({
      abi: eCoinMiningStakingAbi,
      address: STAKING,
      functionName: "stakeFor",
      args: [beneficiary, bn],
      account: address,
      chain: bsc,
    });

    setStakeHash(hash);
    return hash;
  }

  async function unstake(amount: string) {
    if (!amount || !address) return;

    const bn = parseUnits(amount, 18);
    if (bn <= 0n) return;

    const hash = await writeContractAsync({
      abi: eCoinMiningStakingAbi,
      address: STAKING,
      functionName: "unstake",
      args: [bn],
      account: address,
      chain: bsc,
    });

    setUnstakeHash(hash);
    return hash;
  }

  async function claim() {
    if (!address) return;

    const hash = await writeContractAsync({
      abi: eCoinMiningStakingAbi,
      address: STAKING,
      functionName: "claim",
      account: address,
      chain: bsc,
      gas: 1200000n,
    });

    setClaimHash(hash);
    return hash;
  }

  async function pingStream() {
    if (!address) return;

    const hash = await writeContractAsync({
      abi: eCoinMiningStakingAbi,
      address: STAKING,
      functionName: "pingStream",
      account: address,
      chain: bsc,
    });

    setPingHash(hash);
    return hash;
  }

  async function getMiningSessions(): Promise<MiningSessionItem[]> {
    if (!address || !publicClient) return [];

    const totalSessions = (await publicClient.readContract({
      address: STAKING,
      abi: eCoinMiningStakingAbi,
      functionName: "miningSession",
      args: [address],
    })) as bigint;

    const rows: MiningSessionItem[] = [];
    const maxIndex = Number(totalSessions);

    for (let i = 0; i <= maxIndex; i++) {
      const rawSession = await publicClient.readContract({
        address: STAKING,
        abi: eCoinMiningStakingAbi,
        functionName: "sessions",
        args: [address, BigInt(i)],
      });

      const isArray = Array.isArray(rawSession);
      const startedAt = isArray
        ? (rawSession[0] as bigint)
        : (rawSession as { startedAt: bigint }).startedAt;
      const endedAt = isArray
        ? (rawSession[1] as bigint)
        : (rawSession as { endedAt: bigint }).endedAt;
      const gasPurchased = isArray
        ? (rawSession[2] as bigint)
        : (rawSession as { gasPurchased: bigint }).gasPurchased;
      const gasConsumed = isArray
        ? (rawSession[3] as bigint)
        : (rawSession as { gasConsumed: bigint }).gasConsumed;
      const claimedECoin = isArray
        ? (rawSession[4] as bigint)
        : (rawSession as { claimedECoin: bigint }).claimedECoin;
      const completed = isArray
        ? Boolean(rawSession[5])
        : Boolean((rawSession as { completed: boolean }).completed);

      if (completed) {
        rows.push({
          id: i,
          startedAt: startedAt ?? 0n,
          endedAt: endedAt ?? 0n,
          gasPurchased: gasPurchased ?? 0n,
          gasConsumed: gasConsumed ?? 0n,
          claimedECoin: claimedECoin ?? 0n,
          completed,
        });
      }
    }

    return rows.reverse();
  }

  /* ================= RECEIPTS & INVALIDATION ================= */

  const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash });
  const stakeReceipt = useWaitForTransactionReceipt({ hash: stakeHash });
  const claimReceipt = useWaitForTransactionReceipt({ hash: claimHash });
  const unstakeReceipt = useWaitForTransactionReceipt({ hash: unstakeHash });
  const pingReceipt = useWaitForTransactionReceipt({ hash: pingHash });

  useEffect(() => {
    if (stakeReceipt.isSuccess) {
      queryClient.invalidateQueries();
    }
  }, [stakeReceipt.isSuccess, queryClient]);

  useEffect(() => {
    if (claimReceipt.isSuccess) {
      queryClient.invalidateQueries();
    }
  }, [claimReceipt.isSuccess, queryClient]);

  useEffect(() => {
    if (unstakeReceipt.isSuccess) {
      queryClient.invalidateQueries();
    }
  }, [unstakeReceipt.isSuccess, queryClient]);

  useEffect(() => {
    if (pingReceipt.isSuccess) {
      queryClient.invalidateQueries();
    }
  }, [pingReceipt.isSuccess, queryClient]);

  /* ================= NORMALIZED CALCULATIONS (EXACT CONTRACT _update LOGIC) ================= */

  const total = totalStaked
    ? Number(formatUnits(totalStaked as bigint, 18))
    : 0;

  const eligibleTotal = totalEligibleStaked
    ? Number(formatUnits(totalEligibleStaked as bigint, 18))
    : 0;

  const userInfoTuple = userInfo as
    | readonly [bigint, bigint, bigint]
    | undefined;
  const userStake = userInfoTuple
    ? Number(formatUnits(userInfoTuple[0], 18))
    : 0;

  const isMiningActive = Boolean(isMiningActiveRaw);

  // Contabilização exata idêntica ao _update() do contrato:
  // Recompensas ainda não contabilizadas são limitadas por remaining = gasCapacity - gasConsumed
  const storedPendingBN = userInfoTuple ? (userInfoTuple[2] ?? 0n) : 0n;
  const rawPendingBN = (pendingRaw as bigint | undefined) ?? 0n;
  const gasCapacityBN = (gasCapacityRaw as bigint | undefined) ?? 0n;
  const gasConsumedBN = (gasConsumedRaw as bigint | undefined) ?? 0n;

  const unclaimedAccumulatedBN =
    rawPendingBN > storedPendingBN ? rawPendingBN - storedPendingBN : 0n;

  const remainingGasBN =
    isMiningActive && gasCapacityBN > gasConsumedBN
      ? gasCapacityBN - gasConsumedBN
      : 0n;

  const acceptedECoinBN =
    unclaimedAccumulatedBN <= remainingGasBN
      ? unclaimedAccumulatedBN
      : remainingGasBN;

  const realPendingECoinBN = storedPendingBN + acceptedECoinBN;
  const pendingECoin = Number(formatUnits(realPendingECoinBN, 18));
  const rawUncappedPendingECoin = Number(formatUnits(rawPendingBN, 18));

  const walletBalance = walletBalanceRaw
    ? Number(formatUnits(walletBalanceRaw as bigint, 18))
    : 0;

  const share = shareBP ? Number(shareBP) / 100 : 0;

  // Buffer exclusivo em eCoin (streamRate = 1h -> 1/24 do rewardBufferECoin)
  const rewardBufferECoin = rewardBufferECoinRaw
    ? Number(formatUnits(rewardBufferECoinRaw as bigint, 18))
    : 0;

  const streamPerHour = rewardBufferECoin / 24;

  // Taxas on-chain de rewardRates(address)
  const ratesTuple = rewardRatesRaw as
    | readonly [bigint, bigint, bigint, bigint]
    | undefined;
  const rates = {
    ecoinPerSecond: ratesTuple ? Number(formatUnits(ratesTuple[0], 18)) : 0,
    ecoinPerMinute: ratesTuple ? Number(formatUnits(ratesTuple[1], 18)) : 0,
    ecoinPerHour: ratesTuple ? Number(formatUnits(ratesTuple[2], 18)) : 0,
    ecoinPerDay: ratesTuple ? Number(formatUnits(ratesTuple[3], 18)) : 0,
  };

  // Projeções on-chain de projectedRewards(address)
  const projectionsTuple = projectedRewardsRaw as
    | readonly [bigint, bigint, bigint]
    | undefined;
  const projections = {
    next24hECoin: projectionsTuple
      ? Number(formatUnits(projectionsTuple[0], 18))
      : 0,
    next7dECoin: projectionsTuple
      ? Number(formatUnits(projectionsTuple[1], 18))
      : 0,
    next30dECoin: projectionsTuple
      ? Number(formatUnits(projectionsTuple[2], 18))
      : 0,
  };

  // Preview normalizado (pendingECoin respeitando maxCapacity)
  const previewTuple = previewRaw as
    | readonly [bigint, bigint, bigint, bigint, boolean]
    | undefined;
  const previewData = {
    pendingECoin,
    remainingCapacity: previewTuple
      ? Number(formatUnits(previewTuple[1], 18))
      : 0,
    usedCapacity: previewTuple ? Number(formatUnits(previewTuple[2], 18)) : 0,
    maxCapacity: previewTuple ? Number(formatUnits(previewTuple[3], 18)) : 0,
    willAccumulate: previewTuple ? Boolean(previewTuple[4]) : false,
  };

  // ⏱️ REGRAS DO CONTRATO PARA CLAIM:
  // 1) CLAIM_COOLDOWN = 10 minutes (600s) após lastClaim
  // 2) MIN_STAKE_TIME = 5 minutes (300s) após stakeTimestamp
  const nowSec = now / 1000;
  const cooldownPassed = lastClaim
    ? nowSec > Number(lastClaim) + 600
    : true;
  const minStakeTimePassed = stakeTimestamp
    ? nowSec >= Number(stakeTimestamp) + 300
    : true;
  const canClaim = cooldownPassed && minStakeTimePassed && pendingECoin > 0;

  const stakeActive = userStake > 0;

  return {
    total,
    totalEligibleStaked: eligibleTotal,
    totalStakers: Number(totalStakers ?? 0),

    walletBalance,
    userStake,
    stakeActive,
    isMiningActive,

    pending: pendingECoin,
    pendingECoin,
    rawUncappedPendingECoin,
    share,

    streamPerHour,
    rewardBuffer: rewardBufferECoin,
    rewardBufferECoin,

    rates,
    projections,
    previewData,

    canClaim,
    cooldownPassed,
    minStakeTimePassed,

    stake,
    stakeFor,
    unstake,
    claim,
    pingStream,
    getMiningSessions,

    approvePending: approveReceipt.isLoading,
    approveConfirmed: approveReceipt.isSuccess,

    stakePending: stakeReceipt.isLoading,
    stakeConfirmed: stakeReceipt.isSuccess,

    claimPending: claimReceipt.isLoading,
    claimConfirmed: claimReceipt.isSuccess,

    unstakePending: unstakeReceipt.isLoading,
    unstakeConfirmed: unstakeReceipt.isSuccess,

    pingPending: pingReceipt.isLoading,
    pingConfirmed: pingReceipt.isSuccess,
  };
}