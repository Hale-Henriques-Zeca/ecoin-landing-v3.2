"use client";

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { erc20Abi } from "viem";
import { bsc, bscTestnet } from "wagmi/chains";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { maxUint256 } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";
import { publicClient } from "@/lib/publicClient";


const STAKING = CONTRACTS.MINING_STAKING as `0x${string}`;



export function useMiningStaking() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [now, setNow] = useState(Date.now());

  const queryClient = useQueryClient();

  const [approveHash, setApproveHash] =
  useState<`0x${string}`>();

const [stakeHash, setStakeHash] =
  useState<`0x${string}`>();

const [claimHash, setClaimHash] =
  useState<`0x${string}`>();

const [unstakeHash, setUnstakeHash] =
  useState<`0x${string}`>();



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

    const hash =
  await writeContractAsync({
    address: ECOIN,
    abi: erc20Abi,
    functionName: "approve",
    args: [STAKING, maxUint256],
    account: address,
    chain: bsc,
  });

setApproveHash(hash);

    console.log("WAITING APPROVAL...");

    console.log(
 "Approval submitted"
);

    console.log("APPROVE CONFIRMED");
  }

  // =========================
  // STAKE
  // =========================

  console.log("STAKING...");

  const hash =
  await writeContractAsync({
    abi: miningStakingAbi,
    address: STAKING,
    functionName: "stake",
    args: [bn],
    account: address,
    chain: bsc,
  });

setStakeHash(hash);

return hash;
}

  async function unstake(amount: string) {

  if (!address)
    return;

  const bn =
    parseUnits(amount, 18);

  const hash =
    await writeContractAsync({
      abi: miningStakingAbi,
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

  if (!address)
    return;

  const hash =
    await writeContractAsync({
      abi: miningStakingAbi,
      address: STAKING,
      functionName: "claim",
      account: address,
      chain: bsc,
      gas: 1200000n,
    });

  setClaimHash(hash);

  return hash;
}





async function getMiningSessions() {

  if (!address) return [];

  const totalSessions =
    await publicClient.readContract({
      address: STAKING,
      abi: miningStakingAbi,
      functionName: "miningSession",
      args: [address],
    });

  const rows = [];

  for (let i = 0; i <= Number(totalSessions); i++) {

    const session =
      await publicClient.readContract({
        address: STAKING,
        abi: miningStakingAbi,
        functionName: "sessions",
        args: [address, BigInt(i)],
      });

    rows.push({
      id: i,
      ...session,
    });
  }

  return rows.reverse();
}





const approveReceipt =
  useWaitForTransactionReceipt({
    hash: approveHash,
  });

const stakeReceipt =
  useWaitForTransactionReceipt({
    hash: stakeHash,
  });

const claimReceipt =
  useWaitForTransactionReceipt({
    hash: claimHash,
  });

const unstakeReceipt =
  useWaitForTransactionReceipt({
    hash: unstakeHash,
  });




  useEffect(() => {

  if (!stakeReceipt.isSuccess)
    return;

  queryClient.invalidateQueries();

}, [
  stakeReceipt.isSuccess
]);



useEffect(() => {

  if (!claimReceipt.isSuccess)
    return;

  queryClient.invalidateQueries();

}, [
  claimReceipt.isSuccess
]);


useEffect(() => {

  if (!unstakeReceipt.isSuccess)
    return;

  queryClient.invalidateQueries();

}, [
  unstakeReceipt.isSuccess
]);

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
  getMiningSessions,

  approvePending:
    approveReceipt.isLoading,

  approveConfirmed:
    approveReceipt.isSuccess,

  stakePending:
    stakeReceipt.isLoading,

  stakeConfirmed:
    stakeReceipt.isSuccess,

  claimPending:
    claimReceipt.isLoading,

  claimConfirmed:
    claimReceipt.isSuccess,

  unstakePending:
    unstakeReceipt.isLoading,

  unstakeConfirmed:
    unstakeReceipt.isSuccess,
};
}