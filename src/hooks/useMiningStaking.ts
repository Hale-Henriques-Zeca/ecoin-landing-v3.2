"use client";

import { useAccount, useReadContract, useWriteContract, usePublicClient } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { erc20Abi } from "viem";
import { bsc } from "wagmi/chains";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const STAKING = CONTRACTS.MINING_STAKING as `0x${string}`;



export function useMiningStaking() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient({
  chainId: 56
});

  const [now, setNow] = useState(Date.now());

  const queryClient = useQueryClient();



  // 🔁 AUTO REFRESH (LIVE DATA)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000); // 5s

    return () => clearInterval(interval);
  }, []);

  /* ================= READ ================= */

  const { data: totalStaked } = useReadContract({
  abi: miningStakingAbi,
  address: CONTRACTS.MINING_STAKING,
  functionName: "totalStaked",
  chainId: 56,
});

  const { data: totalStakers } = useReadContract({
    abi: miningStakingAbi,
    address: STAKING,
    functionName: "totalStakers",
  });

  const { data: rewardBufferUSDT } = useReadContract({
  abi: miningStakingAbi,
  address: STAKING,
  functionName: "rewardBufferUSDT",
});

const { data: rewardBufferEUSD } = useReadContract({
  abi: miningStakingAbi,
  address: STAKING,
  functionName: "rewardBufferEUSD",
});

  const { data: userInfo } = useReadContract({
    abi: miningStakingAbi,
    address: STAKING,
    functionName: "users",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: pending } = useReadContract({
  abi: miningStakingAbi,
  address: STAKING,
  functionName: "pendingRewards",
  args: address ? [address] : undefined,

  query: {
    enabled: !!address,
    refetchInterval: 5000,
  },
});

  const { data: lastClaim } = useReadContract({
    abi: miningStakingAbi,
    address: STAKING,
    functionName: "lastClaim",
    args: address ? [address] : undefined,
  });

  const { data: shareBP } = useReadContract({
    abi: miningStakingAbi,
    address: STAKING,
    functionName: "userShareBP",
    args: address ? [address] : undefined,
  });

 

  const { data: walletBalanceRaw } = useReadContract({
  abi: erc20Abi,
  address: CONTRACTS.ECOIN,
  functionName: "balanceOf",
  args: address ? [address] : undefined,
  query: { enabled: !!address },
});

  /* ================= WRITE ================= */

  async function stake(amount: string) {

  if (!amount || !address) return;

  const bn = parseUnits(amount, 18);

  const ECOIN =
    CONTRACTS.ECOIN as `0x${string}`;

  if (!publicClient) return;

  const allowance =
    await publicClient.readContract({
      address: ECOIN,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, STAKING],
    }) as bigint;

  // =========================
  // APPROVE
  // =========================

  if (allowance < bn) {

    console.log("APPROVING...");

    const approveHash =
      await writeContractAsync({
        address: ECOIN,
        abi: erc20Abi,
        functionName: "approve",
        args: [STAKING, bn],
        account: address,
        chain: bsc,
      });

    console.log("WAITING APPROVAL...");

    await publicClient.waitForTransactionReceipt({
      hash: approveHash,
    });

    console.log("APPROVE CONFIRMED");
  }

  // =========================
  // STAKE
  // =========================

  console.log("STAKING...");

  return writeContractAsync({
    abi: miningStakingAbi,
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
     abi: miningStakingAbi,
      address: STAKING,
      functionName: "unstake",
      args: [bn],
      account: address,
      chain: bsc,
    });
  }

 async function claim() {

  if (!address || !publicClient) return;

  console.log("CLAIM STARTING...");

  const hash = await writeContractAsync({
  abi: miningStakingAbi,
  address: STAKING,
  functionName: "claim",
  account: address,
  chain: bsc,

  gas: 1200000n,
});

  console.log("WAITING CLAIM RECEIPT...");

  const receipt =
    await publicClient.waitForTransactionReceipt({
      hash,
    });

  console.log("CLAIM CONFIRMED");

  // 🔥 REFRESH FRONTEND
  await queryClient.invalidateQueries();

  return receipt;
}

  /* ================= CALCULATIONS ================= */

  const total = totalStaked ? Number(formatUnits(totalStaked, 18)) : 0;
  const userStake = userInfo ? Number(formatUnits(userInfo[0], 18)) : 0;
  const pendingFormatted =
  pending
    ? Number(formatUnits(pending[0], 18)) +
      Number(formatUnits(pending[1], 18))
    : 0;

  const walletBalance =
  walletBalanceRaw
    ? Number(formatUnits(walletBalanceRaw, 18))
    : 0;

  const share = shareBP ? Number(shareBP) / 100 : 0;

  // 🔥 STREAM REAL
  const totalRewardBuffer =
  Number(formatUnits(rewardBufferUSDT ?? 0n, 18)) +
  Number(formatUnits(rewardBufferEUSD ?? 0n, 18));

const streamPerHour =
  totalRewardBuffer / 24;

  // ⏱️ COOLDOWN
  const canClaim = lastClaim
    ? now / 1000 > Number(lastClaim) + 600
    : true;

  return {
    total,
    totalStakers: Number(totalStakers ?? 0),
    walletBalance,
    userStake,
    pending: pendingFormatted,
    share,
    streamPerHour,
    rewardBuffer: totalRewardBuffer,
    canClaim,
    stake,
    unstake,
    claim,
  };
}