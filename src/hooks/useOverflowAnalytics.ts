"use client";

import { useEffect, useState } from "react";

import {
  usePublicClient,
} from "wagmi";

import {
  formatUnits,
  parseAbiItem,
} from "viem";

import { CONTRACTS }
from "@/lib/contracts/contracts";

export function useOverflowAnalytics() {

  const publicClient =
    usePublicClient({
      chainId: 56,
    });

  const [totalUSDT, setTotalUSDT] =
    useState(0);

  const [totalEUSD, setTotalEUSD] =
    useState(0);

  useEffect(() => {

    async function load() {

      if (!publicClient) return;

      try {

        // 🔥 bloco actual
        const currentBlock =
          await publicClient.getBlockNumber();

        // 🔥 últimos 5000 blocos
        const fromBlock =
          currentBlock - 5000n;

        const logs =
          await publicClient.getLogs({

          address:
            CONTRACTS.MINING_STAKING,

          event: parseAbiItem(
            "event RewardOverflowReturned(address indexed user,uint256 usdtOverflow,uint256 eusdOverflow)"
          ),

          fromBlock,

          toBlock: currentBlock,
        });

        let usdt = 0;
        let eusd = 0;

        for (const log of logs) {

          usdt += Number(
            formatUnits(
              log.args.usdtOverflow || 0n,
              18
            )
          );

          eusd += Number(
            formatUnits(
              log.args.eusdOverflow || 0n,
              18
            )
          );
        }

        setTotalUSDT(usdt);
        setTotalEUSD(eusd);

      } catch (err) {

        console.error(err);
      }
    }

    load();

  }, [publicClient]);

  return {
    totalUSDT,
    totalEUSD,
  };
}