import { useCallback } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { publicClient } from "@/lib/publicClient";
import { unifiedReferralAbi } from "@/lib/abis/unifiedReferralAbi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { isAddress, zeroAddress } from "viem";
import { bsc } from "wagmi/chains";

export interface NetworkStats {
  l1Count: bigint;
  l2Count: bigint;
  l3Count: bigint;
  totalMembers: bigint;
}

export interface RewardsByLevel {
  l1Reward: bigint;
  l2Reward: bigint;
  l3Reward: bigint;
  totalEarned: bigint;
}

export interface MultiAssetTokens {
  ecoin: `0x${string}`;
  eusd: `0x${string}`;
  usdt: `0x${string}`;
  bnb: `0x${string}`;
}

export interface MultiAssetRewardsByLevel {
  ecoin: RewardsByLevel;
  eusd: RewardsByLevel;
  usdt: RewardsByLevel;
  bnb: RewardsByLevel;
}

export interface MultiAssetPendingRewards {
  ecoin: bigint;
  eusd: bigint;
  usdt: bigint;
  bnb: bigint;
}

export function useReferral() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const referralContract = CONTRACTS.REFERRAL as `0x${string}`;

  /* ===================== BIND (ADDRESS & CODE) ===================== */

  const bindInviter = useCallback(
    async (upline: string): Promise<`0x${string}`> => {
      if (!walletClient || !address) {
        throw new Error("Wallet not connected");
      }

      if (!isAddress(upline)) {
        throw new Error("Invalid inviter address");
      }

      if (upline.toLowerCase() === address.toLowerCase()) {
        throw new Error("Self referral not allowed");
      }

      const hash = await walletClient.writeContract({
        address: referralContract,
        abi: unifiedReferralAbi,
        functionName: "bindInviter",
        args: [upline as `0x${string}`],
        chain: bsc,
        account: address as `0x${string}`,
      });

      await publicClient.waitForTransactionReceipt({ hash });
      return hash;
    },
    [walletClient, address, referralContract]
  );

  const bindInviterByCode = useCallback(
    async (code: string): Promise<`0x${string}`> => {
      if (!walletClient || !address) {
        throw new Error("Wallet not connected");
      }

      const cleanCode = code.trim();
      if (!cleanCode) {
        throw new Error("Invalid referral code");
      }

      const hash = await walletClient.writeContract({
        address: referralContract,
        abi: unifiedReferralAbi,
        functionName: "bindInviterByCode",
        args: [cleanCode],
        chain: bsc,
        account: address as `0x${string}`,
      });

      await publicClient.waitForTransactionReceipt({ hash });
      return hash;
    },
    [walletClient, address, referralContract]
  );

  /* ===================== READ: NETWORK & INVITER ===================== */

  const getInviter = useCallback(
    async (userAddress?: `0x${string}`): Promise<string | null> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) return null;

      try {
        const inviter = (await publicClient.readContract({
          address: referralContract,
          abi: unifiedReferralAbi,
          functionName: "inviterOf",
          args: [target],
        })) as `0x${string}`;

        if (!inviter || inviter === zeroAddress) return null;
        return inviter;
      } catch (error) {
        console.error("getInviter error:", error);
        return null;
      }
    },
    [address, referralContract]
  );

  const getNetworkStats = useCallback(
    async (userAddress?: `0x${string}`): Promise<NetworkStats> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) {
        return { l1Count: 0n, l2Count: 0n, l3Count: 0n, totalMembers: 0n };
      }

      try {
        const [l1Count, l2Count, l3Count, totalMembers] = (await publicClient.readContract({
          address: referralContract,
          abi: unifiedReferralAbi,
          functionName: "getNetworkStats",
          args: [target],
        })) as [bigint, bigint, bigint, bigint];

        return { l1Count, l2Count, l3Count, totalMembers };
      } catch (error) {
        console.error("getNetworkStats error:", error);
        return { l1Count: 0n, l2Count: 0n, l3Count: 0n, totalMembers: 0n };
      }
    },
    [address, referralContract]
  );

  /* ===================== READ: REWARDS & SCORE ===================== */

  const getPendingRewards = useCallback(
    async (token: `0x${string}`, userAddress?: `0x${string}`): Promise<bigint> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) return 0n;

      try {
        return (await publicClient.readContract({
          address: referralContract,
          abi: unifiedReferralAbi,
          functionName: "getPendingReward",
          args: [target, token],
        })) as bigint;
      } catch (error) {
        console.error("getPendingRewards error:", error);
        return 0n;
      }
    },
    [address, referralContract]
  );

  const getAllPendingRewards = useCallback(
    async (
      tokens: MultiAssetTokens,
      userAddress?: `0x${string}`
    ): Promise<MultiAssetPendingRewards> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) {
        return { ecoin: 0n, eusd: 0n, usdt: 0n, bnb: 0n };
      }

      const [ecoin, eusd, usdt, bnb] = await Promise.all([
        getPendingRewards(tokens.ecoin, target),
        getPendingRewards(tokens.eusd, target),
        getPendingRewards(tokens.usdt, target),
        getPendingRewards(tokens.bnb, target),
      ]);

      return { ecoin, eusd, usdt, bnb };
    },
    [address, getPendingRewards]
  );

  const getRewardsByLevel = useCallback(
    async (token: `0x${string}`, userAddress?: `0x${string}`): Promise<RewardsByLevel> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) {
        return { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n };
      }

      try {
        const [l1Reward, l2Reward, l3Reward, totalEarned] = (await publicClient.readContract({
          address: referralContract,
          abi: unifiedReferralAbi,
          functionName: "getRewardsByLevel",
          args: [target, token],
        })) as [bigint, bigint, bigint, bigint];

        return {
          l1Reward,
          l2Reward,
          l3Reward,
          totalEarned: totalEarned ?? l1Reward + l2Reward + l3Reward,
        };
      } catch (error) {
        console.error("getRewardsByLevel error:", error);
        return { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n };
      }
    },
    [address, referralContract]
  );

  const getAllRewardsByLevel = useCallback(
    async (
      tokens: MultiAssetTokens,
      userAddress?: `0x${string}`
    ): Promise<MultiAssetRewardsByLevel> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      const empty: RewardsByLevel = { l1Reward: 0n, l2Reward: 0n, l3Reward: 0n, totalEarned: 0n };

      if (!target) {
        return { ecoin: empty, eusd: empty, usdt: empty, bnb: empty };
      }

      const [ecoin, eusd, usdt, bnb] = await Promise.all([
        getRewardsByLevel(tokens.ecoin, target),
        getRewardsByLevel(tokens.eusd, target),
        getRewardsByLevel(tokens.usdt, target),
        getRewardsByLevel(tokens.bnb, target),
      ]);

      return { ecoin, eusd, usdt, bnb };
    },
    [address, getRewardsByLevel]
  );

  const getTotalRewardsByToken = useCallback(
    async (token: `0x${string}`, userAddress?: `0x${string}`): Promise<bigint> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) return 0n;

      try {
        return (await publicClient.readContract({
          address: referralContract,
          abi: unifiedReferralAbi,
          functionName: "totalRewardsByToken",
          args: [target, token],
        })) as bigint;
      } catch (error) {
        console.error("getTotalRewardsByToken error:", error);
        return 0n;
      }
    },
    [address, referralContract]
  );

  const getRewardsBySource = useCallback(
    async (
      token: `0x${string}`,
      source: `0x${string}`,
      userAddress?: `0x${string}`
    ): Promise<bigint> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) return 0n;

      try {
        return (await publicClient.readContract({
          address: referralContract,
          abi: unifiedReferralAbi,
          functionName: "rewardsBySource",
          args: [target, token, source],
        })) as bigint;
      } catch (error) {
        console.error("getRewardsBySource error:", error);
        return 0n;
      }
    },
    [address, referralContract]
  );

  const getScore = useCallback(
    async (userAddress?: `0x${string}`): Promise<bigint> => {
      const target = userAddress ?? (address as `0x${string}` | undefined);
      if (!target) return 0n;

      try {
        const [totalRewardsRaw, stats] = await Promise.all([
          publicClient.readContract({
            address: referralContract,
            abi: unifiedReferralAbi,
            functionName: "totalRewards",
            args: [target],
          }) as Promise<bigint>,
          getNetworkStats(target),
        ]);

        // Mesma fórmula do UnifiedReferralV2: (totalRewards / 1e18) + (l1Count * 10)
        return totalRewardsRaw / 10n ** 18n + stats.l1Count * 10n;
      } catch (error) {
        console.error("getScore error:", error);
        return 0n;
      }
    },
    [address, referralContract, getNetworkStats]
  );

  /* ===================== CLAIM ===================== */

  const claimRewards = useCallback(
    async (token: `0x${string}`): Promise<`0x${string}`> => {
      if (!walletClient || !address) {
        throw new Error("Wallet not connected");
      }

      const hash = await walletClient.writeContract({
        address: referralContract,
        abi: unifiedReferralAbi,
        functionName: "claim",
        args: [token],
        chain: bsc,
        account: address as `0x${string}`,
      });

      await publicClient.waitForTransactionReceipt({ hash });
      return hash;
    },
    [walletClient, address, referralContract]
  );

  return {
    bindInviter,
    bindInviterByCode,
    getInviter,
    getNetworkStats,
    getPendingRewards,
    getPendingReward: getPendingRewards,
    getAllPendingRewards,
    getRewardsByLevel,
    getAllRewardsByLevel,
    getTotalRewardsByToken,
    getRewardsBySource,
    claimRewards,
    claim: claimRewards,
    getScore,
  };
}