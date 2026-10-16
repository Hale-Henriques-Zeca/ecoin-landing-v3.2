"use client";

import { useCallback, useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import type { Address } from "viem";
import { EDEN_ACTIVITY_RECORDED_EVENT } from "@/lib/contracts/edenActivityRegistry/edenActivityRegistry.abi";
import {
  EDEN_ACTIVITY_REGISTRY_ADDRESS,
  EDEN_ACTIVITY_REGISTRY_CHAIN_ID,
  EDEN_ACTIVITY_REGISTRY_START_BLOCK,
} from "@/lib/contracts/edenActivityRegistry/edenActivityRegistry.config";
import type { EdenActivityRecord } from "@/types/edenActivityRegistry/activity.types";

// Keep log requests small for RPC providers with strict eth_getLogs limits.
const BLOCK_CHUNK_SIZE = 50n;

type UseEdenActivityHistoryOptions = {
  userAddress?: Address;
  enabled?: boolean;
};

export function useEdenActivityHistory(options: UseEdenActivityHistoryOptions = {}) {
  const { address: connectedAddress } = useAccount();
  const user = options.userAddress ?? connectedAddress;
  const enabled = options.enabled ?? true;
  const publicClient = usePublicClient({ chainId: EDEN_ACTIVITY_REGISTRY_CHAIN_ID });
  const [activities, setActivities] = useState<EdenActivityRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function loadHistory() {
      setActivities([]);
      setError(null);

      if (!enabled || !user) {
        setIsLoading(false);
        return;
      }
      if (!publicClient) {
        setIsLoading(false);
        setError(new Error("Não existe um public client configurado para a BNB Smart Chain Mainnet (chainId 56)."));
        return;
      }
      if (EDEN_ACTIVITY_REGISTRY_START_BLOCK <= 0n) {
        setIsLoading(false);
        setError(new Error("Configure EDEN_ACTIVITY_REGISTRY_START_BLOCK com o bloco real de deployment do proxy."));
        return;
      }

      setIsLoading(true);
      try {
        const latestBlock = await publicClient.getBlockNumber();
        const found: EdenActivityRecord[] = [];

        for (let fromBlock = EDEN_ACTIVITY_REGISTRY_START_BLOCK; fromBlock <= latestBlock; fromBlock += BLOCK_CHUNK_SIZE) {
          if (cancelled) return;
          const candidateToBlock = fromBlock + BLOCK_CHUNK_SIZE - 1n;
          const toBlock = candidateToBlock > latestBlock ? latestBlock : candidateToBlock;
          const logs = await publicClient.getLogs({
            address: EDEN_ACTIVITY_REGISTRY_ADDRESS,
            event: EDEN_ACTIVITY_RECORDED_EVENT,
            args: { user },
            fromBlock,
            toBlock,
          });

          for (const log of logs) {
            const args = log.args;
            if (
              args.user === undefined || args.activityType === undefined || args.token === undefined ||
              args.amount === undefined || args.source === undefined || args.referenceId === undefined ||
              args.timestamp === undefined
            ) continue;

            found.push({
              user: args.user,
              activityType: args.activityType,
              token: args.token,
              amount: args.amount,
              source: args.source,
              referenceId: args.referenceId,
              timestamp: args.timestamp,
              blockNumber: log.blockNumber,
              transactionHash: log.transactionHash ?? null,
              logIndex: log.logIndex ?? null,
            });
          }
        }

        found.sort((a, b) => {
          if (a.blockNumber !== b.blockNumber) return a.blockNumber > b.blockNumber ? -1 : 1;
          return (b.logIndex ?? -1) - (a.logIndex ?? -1);
        });
        if (!cancelled) setActivities(found);
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause : new Error("Não foi possível carregar o histórico de actividades."));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadHistory();
    return () => { cancelled = true; };
  }, [enabled, user, publicClient, reloadKey]);

  return { activities, isLoading, error, refetch, userAddress: user };
}
