"use client";

import { useAccount, useReadContract, useWriteContract, usePublicClient } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "viem";
import { bsc } from "wagmi/chains";
import { useEffect, useState } from "react";

const STAKING = CONTRACTS.MINING_STAKING as `0x${string}`;

export function useMiningStaking() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({ chainId: 56 });

  const [now, setNow] = useState(Date.now());

  // 🔁 AUTO REFRESH (LIVE DATA)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000); // 5s

    return () => clearInterval(interval);
  }, []);

  /* ================= READ ================= */

  const { data: totalStaked } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "totalStaked",
  });

  const { data: totalStakers } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "totalStakers",
  });

  const { data: rewardBuffer } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "rewardBuffer",
  });

  const { data: userInfo } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "users",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: pending } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: lastClaim } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "lastClaim",
    args: address ? [address] : undefined,
  });

  const { data: shareBP } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "userShareBP",
    args: address ? [address] : undefined,
  });

  const { data: expected } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: STAKING,
    functionName: "userExpectedReward",
    args: address ? [address] : undefined,
  });

  /* ================= WRITE ================= */

  async function stake(amount: string) {
    if (!amount || !address) return;

    const bn = parseUnits(amount, 18);
    const ECOIN = CONTRACTS.ECOIN as `0x${string}`;

    if (!publicClient) return;

    const allowance = await publicClient.readContract({
      address: ECOIN,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, STAKING],
    }) as bigint;

    if (allowance < bn) {
      await writeContractAsync({
        address: ECOIN,
        abi: erc20Abi,
        functionName: "approve",
        args: [STAKING, bn],
        account: address,
        chain: bsc,
      });
    }

    return writeContractAsync({
      abi: CONTRACTS.MINING_STAKING_ABI,
      address: STAKING,
      functionName: "stake",
      args: [bn],
      account: address,
      chain: bsc,
    });
  }

  async function unstake(amount: string) {
    const bn = parseUnits(amount, 18);
    return writeContractAsync({
      abi: CONTRACTS.MINING_STAKING_ABI,
      address: STAKING,
      functionName: "unstake",
      args: [bn],
      account: address,
      chain: bsc,
    });
  }

  async function claim() {
    return writeContractAsync({
      abi: CONTRACTS.MINING_STAKING_ABI,
      address: STAKING,
      functionName: "claim",
      account: address,
      chain: bsc,
    });
  }

  /* ================= CALCULATIONS ================= */

  const total = totalStaked ? Number(formatUnits(totalStaked, 18)) : 0;
  const userStake = userInfo ? Number(formatUnits(userInfo[0], 18)) : 0;
  const pendingFormatted = pending ? Number(formatUnits(pending, 18)) : 0;

  const share = shareBP ? Number(shareBP) / 100 : 0;

  // 🔥 STREAM REAL
  const streamPerHour = rewardBuffer
    ? Number(formatUnits(rewardBuffer, 18)) / 24
    : 0;

  // ⏱️ COOLDOWN
  const canClaim = lastClaim
    ? now / 1000 > Number(lastClaim) + 600
    : true;

  return {
    total,
    totalStakers: Number(totalStakers ?? 0),
    userStake,
    pending: pendingFormatted,
    share,
    expected: expected ? Number(formatUnits(expected, 18)) : 0,
    streamPerHour,
    rewardBuffer: rewardBuffer
      ? Number(formatUnits(rewardBuffer, 18))
      : 0,
    canClaim,
    stake,
    unstake,
    claim,
  };
}