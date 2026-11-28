"use client";

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits, erc20Abi, maxUint256 } from "viem";
import { bsc } from "wagmi/chains";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eDollarMiningStakingAbi } from "@/lib/abis/eDollarMining/eDollarMiningStakingAbi";
import { publicClient } from "@/lib/publicClient";

const STAKING = CONTRACTS.MINING_STAKING as `0x${string}`;

export function useMiningStakingeDollar() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const queryClient = useQueryClient();

  const [now, setNow] = useState(Date.now());
  const [approveHash, setApproveHash] = useState<`0x${string}`>();
  const [stakeHash, setStakeHash] = useState<`0x${string}`>();
  const [claimHash, setClaimHash] = useState<`0x${string}`>();
  const [unstakeHash, setUnstakeHash] = useState<`0x${string}`>();

  // 🔁 AUTO REFRESH (LIVE DATA)
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ================= READ ================= */

  const { data: totalStaked } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "totalStaked",
    chainId: 56,
  });

  const { data: totalStakers } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: STAKING,
    functionName: "totalStakers",
  });

  const { data: rewardBufferUSDT } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: STAKING,
    functionName: "rewardBufferUSDT",
  });

  const { data: rewardBufferEUSD } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: STAKING,
    functionName: "rewardBufferEUSD",
  });

  const { data: userInfo } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: STAKING,
    functionName: "users",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: pending } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: STAKING,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: lastClaim } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: STAKING,
    functionName: "lastClaim",
    args: address ? [address] : undefined,
  });

  const { data: shareBP } = useReadContract({
    abi: eDollarMiningStakingAbi,
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
    if (!amount || !address || !publicClient) return;

    const bn = parseUnits(amount, 18);
    const ECOIN = CONTRACTS.ECOIN as `0x${string}`;

    const allowance = (await publicClient.readContract({
      address: ECOIN,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, STAKING],
    })) as bigint;

    if (allowance < bn) {
      setApproveHash(undefined);
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

    setStakeHash(undefined);
    const hash = await writeContractAsync({
      abi: eDollarMiningStakingAbi,
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
    if (!address) return;

    const bn = parseUnits(amount, 18);
    setUnstakeHash(undefined);

    const hash = await writeContractAsync({
      abi: eDollarMiningStakingAbi,
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

    setClaimHash(undefined);

    // Estimativa dinâmica com +25% de margem de segurança (custo real ~2.97M gas)
    let gasLimit = 3_600_000n;
    if (publicClient) {
      try {
        const estimated = await publicClient.estimateContractGas({
          abi: eDollarMiningStakingAbi,
          address: STAKING,
          functionName: "claim",
          account: address,
        });
        const buffered = (estimated * 125n) / 100n;
        gasLimit = buffered > 3_600_000n ? buffered : 3_600_000n;
      } catch {
        gasLimit = 3_600_000n;
      }
    }

    const hash = await writeContractAsync({
      abi: eDollarMiningStakingAbi,
      address: STAKING,
      functionName: "claim",
      account: address,
      chain: bsc,
      gas: gasLimit,
    });

    setClaimHash(hash);
    return hash;
  }

  async function getMiningSessions() {
    if (!address || !publicClient) return [];

    const totalSessions = await publicClient.readContract({
      address: STAKING,
      abi: eDollarMiningStakingAbi,
      functionName: "miningSession",
      args: [address],
    });

    const rows = [];
    for (let i = 0; i < Number(totalSessions); i++) {
      const session = await publicClient.readContract({
        address: STAKING,
        abi: eDollarMiningStakingAbi,
        functionName: "sessions",
        args: [address, BigInt(i)],
      });

      if (session.completed) {
        rows.push({
          id: i,
          ...session,
          startedAt: session.startedAt ?? 0n,
          endedAt: session.endedAt ?? 0n,
        });
      }
    }

    return rows.reverse();
  }

  const approveReceipt = useWaitForTransactionReceipt({ hash: approveHash });
  const stakeReceipt = useWaitForTransactionReceipt({ hash: stakeHash });
  const claimReceipt = useWaitForTransactionReceipt({ hash: claimHash });
  const unstakeReceipt = useWaitForTransactionReceipt({ hash: unstakeHash });

  useEffect(() => {
    if (stakeReceipt.isSuccess) queryClient.invalidateQueries();
  }, [stakeReceipt.isSuccess, queryClient]);

  useEffect(() => {
    if (claimReceipt.isSuccess) queryClient.invalidateQueries();
  }, [claimReceipt.isSuccess, queryClient]);

  useEffect(() => {
    if (unstakeReceipt.isSuccess) queryClient.invalidateQueries();
  }, [unstakeReceipt.isSuccess, queryClient]);

  /* ================= CALCULATIONS ================= */

  const total = totalStaked ? Number(formatUnits(totalStaked, 18)) : 0;
  const userStake = userInfo ? Number(formatUnits(userInfo[0], 18)) : 0;
  const pendingFormatted = pending
    ? Number(formatUnits(pending[0], 18)) + Number(formatUnits(pending[1], 18))
    : 0;

  const walletBalance = walletBalanceRaw
    ? Number(formatUnits(walletBalanceRaw, 18))
    : 0;

  const share = shareBP ? Number(shareBP) / 100 : 0;

  const totalRewardBuffer =
    Number(formatUnits(rewardBufferUSDT ?? 0n, 18)) +
    Number(formatUnits(rewardBufferEUSD ?? 0n, 18));

  const streamPerHour = totalRewardBuffer / 24;

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
    approvePending: approveReceipt.isLoading,
    approveConfirmed: approveReceipt.isSuccess,
    stakePending: stakeReceipt.isLoading,
    stakeConfirmed: stakeReceipt.isSuccess,
    stakeError: stakeReceipt.isError,
    claimPending: claimReceipt.isLoading,
    claimConfirmed: claimReceipt.isSuccess,
    claimError: claimReceipt.isError,
    unstakePending: unstakeReceipt.isLoading,
    unstakeConfirmed: unstakeReceipt.isSuccess,
    unstakeError: unstakeReceipt.isError,
  };
}