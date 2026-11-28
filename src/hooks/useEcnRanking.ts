"use client";

import { useState, useEffect, useCallback } from "react";
import { usePublicClient } from "wagmi";
import { bsc } from "wagmi/chains";
import { formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";
import {
  MainRankingTab,
  TraderSubMode,
  ReferralSubMode,
  PoolFilter,
  TimeWindowKey,
  RankingEntry,
  TIME_WINDOWS,
  shortenWallet,
  computeVipTier,
} from "@/components/ranking/rankingTypes";

const PAGE_LIMIT = 100n;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const enumerableStakingAbi = [
  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "getStakers",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [{ type: "address[]" }],
  },
  {
    name: "users",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "rewardDebtUSDT", type: "uint256" },
      { name: "rewardDebtEUSD", type: "uint256" },
      { name: "pendingUSDT", type: "uint256" },
      { name: "pendingEUSD", type: "uint256" },
    ],
  },
  {
    name: "preview",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { name: "pendingUSDT", type: "uint256" },
      { name: "pendingEUSD", type: "uint256" },
      { name: "remainingCapacity", type: "uint256" },
      { name: "usedCapacity", type: "uint256" },
      { name: "maxCapacity", type: "uint256" },
      { name: "willAccumulate", type: "bool" },
    ],
  },
  {
    name: "getUserClaims",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "usdtAmount", type: "uint256" },
          { name: "eusdAmount", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
] as const;

const enumerableECoinStakingAbi = [
  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "getStakers",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [{ type: "address[]" }],
  },
  {
    name: "users",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "rewardDebtECoin", type: "uint256" },
      { name: "pendingECoin", type: "uint256" },
    ],
  },
  {
    name: "preview",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [
      { name: "pendingECoin", type: "uint256" },
      { name: "remainingCapacity", type: "uint256" },
      { name: "usedCapacity", type: "uint256" },
      { name: "maxCapacity", type: "uint256" },
      { name: "willAccumulate", type: "bool" },
    ],
  },
  {
    name: "getUserClaims",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "ecoinAmount", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
] as const;

const enumerableReferralAbi = [
  {
    name: "getReferrers",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [{ type: "address[]" }],
  },
  {
    name: "getUserReferralRewards",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "source", type: "bytes32" },
          { name: "level", type: "uint8" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getUserReferralLinks",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "invitee", type: "address" },
          { name: "level", type: "uint8" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
] as const;

const enumerableGasSaleAbi = [
  {
    name: "getBuyers",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [{ type: "address[]" }],
  },
  {
    name: "getUserGasPurchases",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "offset", type: "uint256" },
      { name: "limit", type: "uint256" },
    ],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { name: "token", type: "address" },
          { name: "amount", type: "uint256" },
          { name: "capacityAdded", type: "uint256" },
          { name: "timestamp", type: "uint256" },
        ],
      },
    ],
  },
] as const;

function resolveReferralRewardSymbol(
  tokenAddress: string
): "eCoin" | "USDT" | "E-USD" | "BNB" {
  const normalized = tokenAddress.toLowerCase();
  if (normalized === ZERO_ADDRESS) return "BNB";

  const registry = CONTRACTS as Record<string, string | undefined>;
  const ecoinAddr = (registry.ECOIN ?? registry.E_COIN)?.toLowerCase();
  const eusdAddr = (registry.EUSD ?? registry.E_USD ?? registry.EDOLLAR)?.toLowerCase();

  if (ecoinAddr && normalized === ecoinAddr) return "eCoin";
  if (eusdAddr && normalized === eusdAddr) return "E-USD";
  return "USDT";
}

export function useEcnRanking(params: {
  mainTab: MainRankingTab;
  traderMode: TraderSubMode;
  referralMode: ReferralSubMode;
  poolFilter: PoolFilter;
  timeWindow: TimeWindowKey;
}) {
  const { mainTab, traderMode, referralMode, poolFilter, timeWindow } = params;
  const publicClient = usePublicClient({ chainId: bsc.id });

  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchOnChainRanking = useCallback(async () => {
    setIsLoading(true);
    try {
      const stableStakingAddr = CONTRACTS.MINING_STAKING as `0x${string}`;
      const ecoinStakingAddr =
        CONTRACTS.eCoin_Mining_Staking_eCoin as `0x${string}`;
      const referralAddr = CONTRACTS.UNIFIED_REFERRAL as `0x${string}`;
      const gasStableAddr = CONTRACTS.ECGAS_SALE as `0x${string}`;
      const gasECoinAddr = CONTRACTS.ECGAS_SALE_ECOIN as `0x${string}` | undefined;

      if (!publicClient) {
        setEntries([]);
        return;
      }

      const windowObj =
        TIME_WINDOWS.find((w) => w.key === timeWindow) ?? TIME_WINDOWS[0];
      const cutoffSec = BigInt(
        Math.floor(Date.now() / 1000) - windowObj.days * 86_400
      );

      /* ================= ABA 4: REFERÊNCIAS (3 NÍVEIS: L1, L2, L3) ================= */
      if (mainTab === "referrals" && referralAddr) {
        const referrers = (await publicClient
          .readContract({
            address: referralAddr,
            abi: enumerableReferralAbi,
            functionName: "getReferrers",
            args: [0n, 200n],
          })
          .catch(() => [])) as `0x${string}`[];

        if (referrers.length === 0) {
          setEntries([]);
          return;
        }

        const refResults = await publicClient.multicall({
          contracts: referrers.flatMap((user) => [
            {
              address: referralAddr,
              abi: enumerableReferralAbi,
              functionName: "getUserReferralRewards" as const,
              args: [user, 0n, PAGE_LIMIT] as const,
            },
            {
              address: referralAddr,
              abi: enumerableReferralAbi,
              functionName: "getUserReferralLinks" as const,
              args: [user, 0n, PAGE_LIMIT] as const,
            },
          ]),
        });

        const refList: RankingEntry[] = [];

        referrers.forEach((user, idx) => {
          const rewards = (refResults[idx * 2]?.result ?? []) as ReadonlyArray<{
            token: string;
            amount: bigint;
            source: `0x${string}`;
            level: number;
            timestamp: bigint;
          }>;
          const links = (refResults[idx * 2 + 1]?.result ?? []) as ReadonlyArray<{
            invitee: string;
            level: number;
            timestamp: bigint;
          }>;

          let l1Gain = 0;
          let l2Gain = 0;
          let l3Gain = 0;

          const symbolVolume: Record<"eCoin" | "USDT" | "E-USD" | "BNB", number> = {
            USDT: 0,
            "E-USD": 0,
            eCoin: 0,
            BNB: 0,
          };

          // Leitura em ordem reversa: para assim que sair da janela temporal
          for (const r of rewards) {
            if (r.timestamp < cutoffSec) break;
            const amt = Number(formatUnits(r.amount, 18));

            if (r.level === 1) l1Gain += amt;
            else if (r.level === 2) l2Gain += amt;
            else if (r.level === 3) l3Gain += amt;

            const matchesActiveLevel =
              referralMode === "all" ||
              (referralMode === "level1" && r.level === 1) ||
              (referralMode === "level2" && r.level === 2) ||
              (referralMode === "level3" && r.level === 3);

            if (matchesActiveLevel) {
              const sym = resolveReferralRewardSymbol(r.token);
              symbolVolume[sym] += amt;
            }
          }

          let l1Count = 0;
          let l2Count = 0;
          let l3Count = 0;

          for (const l of links) {
            if (l.timestamp < cutoffSec) break;
            if (l.level === 1) l1Count += 1;
            else if (l.level === 2) l2Count += 1;
            else if (l.level === 3) l3Count += 1;
          }

          const periodGain =
            referralMode === "level1"
              ? l1Gain
              : referralMode === "level2"
              ? l2Gain
              : referralMode === "level3"
              ? l3Gain
              : l1Gain + l2Gain + l3Gain;

          const periodLinks =
            referralMode === "level1"
              ? l1Count
              : referralMode === "level2"
              ? l2Count
              : referralMode === "level3"
              ? l3Count
              : l1Count + l2Count + l3Count;

          // Determina o símbolo predominante das comissões no filtro ativo
          const dominantSymbol = (
            Object.entries(symbolVolume) as [
              "eCoin" | "USDT" | "E-USD" | "BNB",
              number,
            ][]
          ).reduce(
            (best, current) => (current[1] > best[1] ? current : best),
            ["USDT", 0] as ["eCoin" | "USDT" | "E-USD" | "BNB", number]
          )[0];

          if (periodGain > 0 || periodLinks > 0) {
            refList.push({
              address: user,
              displayName: shortenWallet(user),
              stakedECoin: 0,
              poolSharePercent: 0,
              liveProfit: 0,
              periodGain,
              rewardSymbol: dominantSymbol,
              poolType: dominantSymbol === "eCoin" ? "ECOIN" : "STABLE",
              vipTier: computeVipTier(periodGain * 10, "R-VIP"),
              directReferralsCount: periodLinks,
              l1Count,
              l2Count,
              l3Count,
              l1Gain,
              l2Gain,
              l3Gain,
            });
          }
        });

        refList.sort(
          (a, b) =>
            b.periodGain - a.periodGain ||
            (b.directReferralsCount ?? 0) - (a.directReferralsCount ?? 0)
        );
        setEntries(refList);
        setLastUpdated(new Date());
        return;
      }

      /* ================= ABA 5: ECGAS POWER & VIP ================= */
      if (mainTab === "ecGas") {
        const gasContracts = [gasStableAddr, gasECoinAddr].filter(
          (a): a is `0x${string}` => Boolean(a)
        );

        const buyerArrays = await Promise.all(
          gasContracts.map((addr) =>
            publicClient
              .readContract({
                address: addr,
                abi: enumerableGasSaleAbi,
                functionName: "getBuyers",
                args: [0n, 200n],
              })
              .catch(() => [] as `0x${string}`[])
          )
        );

        const uniqueBuyers = Array.from(new Set(buyerArrays.flat()));
        if (uniqueBuyers.length === 0) {
          setEntries([]);
          return;
        }

        const purchaseResults = await publicClient.multicall({
          contracts: uniqueBuyers.flatMap((user) =>
            gasContracts.map((addr) => ({
              address: addr,
              abi: enumerableGasSaleAbi,
              functionName: "getUserGasPurchases" as const,
              args: [user, 0n, PAGE_LIMIT] as const,
            }))
          ),
        });

        const gasList: RankingEntry[] = [];
        const stride = gasContracts.length;

        uniqueBuyers.forEach((user, idx) => {
          let totalGasPeriod = 0;
          for (let c = 0; c < stride; c++) {
            const items = (purchaseResults[idx * stride + c]?.result ??
              []) as ReadonlyArray<{
              token: string;
              amount: bigint;
              capacityAdded: bigint;
              timestamp: bigint;
            }>;
            for (const p of items) {
              if (p.timestamp < cutoffSec) break;
              totalGasPeriod += Number(formatUnits(p.amount, 18));
            }
          }

          if (totalGasPeriod > 0) {
            gasList.push({
              address: user,
              displayName: shortenWallet(user),
              stakedECoin: totalGasPeriod,
              poolSharePercent: 0,
              liveProfit: 0,
              periodGain: totalGasPeriod,
              rewardSymbol: "USDT",
              poolType: "STABLE",
              vipTier: computeVipTier(totalGasPeriod * 5, "ECN-VIP"),
            });
          }
        });

        gasList.sort((a, b) => b.periodGain - a.periodGain);
        setEntries(gasList);
        setLastUpdated(new Date());
        return;
      }

      /* ================= ABAS 1, 2 E 3: ECNTRADER (STAKING POOLS) ================= */
      const [stableStakers, ecoinStakers, totalStakedStableRaw, totalStakedECoinRaw] =
        await Promise.all([
          (poolFilter === "ALL" || poolFilter === "STABLE") && stableStakingAddr
            ? (publicClient
                .readContract({
                  address: stableStakingAddr,
                  abi: enumerableStakingAbi,
                  functionName: "getStakers",
                  args: [0n, 200n],
                })
                .catch(() => []) as Promise<`0x${string}`[]>)
            : Promise.resolve([]),
          (poolFilter === "ALL" || poolFilter === "ECOIN") && ecoinStakingAddr
            ? (publicClient
                .readContract({
                  address: ecoinStakingAddr,
                  abi: enumerableECoinStakingAbi,
                  functionName: "getStakers",
                  args: [0n, 200n],
                })
                .catch(() => []) as Promise<`0x${string}`[]>)
            : Promise.resolve([]),
          stableStakingAddr
            ? (publicClient
                .readContract({
                  address: stableStakingAddr,
                  abi: enumerableStakingAbi,
                  functionName: "totalStaked",
                })
                .catch(() => 0n) as Promise<bigint>)
            : Promise.resolve(0n),
          ecoinStakingAddr
            ? (publicClient
                .readContract({
                  address: ecoinStakingAddr,
                  abi: enumerableECoinStakingAbi,
                  functionName: "totalStaked",
                })
                .catch(() => 0n) as Promise<bigint>)
            : Promise.resolve(0n),
        ]);

      const totalStakedStable = Number(formatUnits(totalStakedStableRaw, 18));
      const totalStakedECoin = Number(formatUnits(totalStakedECoinRaw, 18));

      const built: RankingEntry[] = [];

      // Pool Stablecoins (USDT / E-USD)
      if (stableStakers.length > 0 && stableStakingAddr) {
        const stableRes = await publicClient.multicall({
          contracts: stableStakers.flatMap((user) => [
            {
              address: stableStakingAddr,
              abi: enumerableStakingAbi,
              functionName: "users" as const,
              args: [user] as const,
            },
            {
              address: stableStakingAddr,
              abi: enumerableStakingAbi,
              functionName: "preview" as const,
              args: [user] as const,
            },
            {
              address: stableStakingAddr,
              abi: enumerableStakingAbi,
              functionName: "getUserClaims" as const,
              args: [user, 0n, PAGE_LIMIT] as const,
            },
          ]),
        });

        stableStakers.forEach((user, idx) => {
          const uData = stableRes[idx * 3]?.result as
            | readonly [bigint, bigint, bigint, bigint, bigint]
            | undefined;
          const pData = stableRes[idx * 3 + 1]?.result as
            | readonly [bigint, bigint, bigint, bigint, bigint, boolean]
            | undefined;
          const claims = (stableRes[idx * 3 + 2]?.result ?? []) as ReadonlyArray<{
            usdtAmount: bigint;
            eusdAmount: bigint;
            timestamp: bigint;
          }>;

          const staked = uData ? Number(formatUnits(uData[0], 18)) : 0;
          const liveUSDT = pData ? Number(formatUnits(pData[0], 18)) : 0;
          const liveEUSD = pData ? Number(formatUnits(pData[1], 18)) : 0;
          const liveProfit = liveUSDT + liveEUSD;

          let periodClaimed = 0;
          for (const c of claims) {
            if (c.timestamp < cutoffSec) break;
            periodClaimed +=
              Number(formatUnits(c.usdtAmount, 18)) +
              Number(formatUnits(c.eusdAmount, 18));
          }

          built.push({
            address: user,
            displayName: shortenWallet(user),
            stakedECoin: staked,
            poolSharePercent:
              totalStakedStable > 0 ? (staked / totalStakedStable) * 100 : 0,
            liveProfit,
            periodGain: periodClaimed + liveProfit,
            rewardSymbol: liveEUSD > liveUSDT ? "E-USD" : "USDT",
            poolType: "STABLE",
            vipTier: computeVipTier(staked, "ECN-VIP"),
          });
        });
      }

      // Pool eCoin
      if (ecoinStakers.length > 0 && ecoinStakingAddr) {
        const ecoinRes = await publicClient.multicall({
          contracts: ecoinStakers.flatMap((user) => [
            {
              address: ecoinStakingAddr,
              abi: enumerableECoinStakingAbi,
              functionName: "users" as const,
              args: [user] as const,
            },
            {
              address: ecoinStakingAddr,
              abi: enumerableECoinStakingAbi,
              functionName: "preview" as const,
              args: [user] as const,
            },
            {
              address: ecoinStakingAddr,
              abi: enumerableECoinStakingAbi,
              functionName: "getUserClaims" as const,
              args: [user, 0n, PAGE_LIMIT] as const,
            },
          ]),
        });

        ecoinStakers.forEach((user, idx) => {
          const uData = ecoinRes[idx * 3]?.result as
            | readonly [bigint, bigint, bigint]
            | undefined;
          const pData = ecoinRes[idx * 3 + 1]?.result as
            | readonly [bigint, bigint, bigint, bigint, boolean]
            | undefined;
          const claims = (ecoinRes[idx * 3 + 2]?.result ?? []) as ReadonlyArray<{
            ecoinAmount: bigint;
            timestamp: bigint;
          }>;

          const staked = uData ? Number(formatUnits(uData[0], 18)) : 0;
          const liveProfit = pData ? Number(formatUnits(pData[0], 18)) : 0;

          let periodClaimed = 0;
          for (const c of claims) {
            if (c.timestamp < cutoffSec) break;
            periodClaimed += Number(formatUnits(c.ecoinAmount, 18));
          }

          built.push({
            address: user,
            displayName: shortenWallet(user),
            stakedECoin: staked,
            poolSharePercent:
              totalStakedECoin > 0 ? (staked / totalStakedECoin) * 100 : 0,
            liveProfit,
            periodGain: periodClaimed + liveProfit,
            rewardSymbol: "eCoin",
            poolType: "ECOIN",
            vipTier: computeVipTier(staked, "ECN-VIP"),
          });
        });
      }

      // Ordenação final dos 3 modos de ecnTrader
      let sorted = [...built];
      if (traderMode === "topMargin") {
        // 1. Estático pelo principal em staking
        sorted = sorted
          .filter((i) => i.stakedECoin > 0)
          .sort((a, b) => b.stakedECoin - a.stakedECoin);
      } else if (traderMode === "liveProfit") {
        // 2. Dinâmico — sai automaticamente assim que o utilizador saca o lucro
        sorted = sorted
          .filter((i) => i.liveProfit > 0.0001)
          .sort((a, b) => b.liveProfit - a.liveProfit);
      } else {
        // 3. Top Gainers na janela selecionada (90d, 30d, 15d, 7d, 1d)
        sorted = sorted
          .filter((i) => i.periodGain > 0 || i.stakedECoin > 0)
          .sort((a, b) => b.periodGain - a.periodGain);
      }

      setEntries(sorted);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [publicClient, mainTab, traderMode, referralMode, poolFilter, timeWindow]);

  useEffect(() => {
    void fetchOnChainRanking();
  }, [fetchOnChainRanking]);

  return {
    entries,
    isLoading,
    lastUpdated,
    refetch: fetchOnChainRanking,
  };
}