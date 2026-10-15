"use client";

import { useAccount, useReadContract } from "wagmi";
import type { Address } from "viem";
import {
  EDEN_ACTIVITY_REGISTRY_ABI,
} from "@/lib/contracts/edenActivityRegistry/edenActivityRegistry.abi";
import {
  EDEN_ACTIVITY_REGISTRY_ADDRESS,
  EDEN_ACTIVITY_REGISTRY_CHAIN_ID,
} from "@/lib/contracts/edenActivityRegistry/edenActivityRegistry.config";

export function useEdenActivityCount(userAddress?: Address) {
  const { address: connectedAddress } = useAccount();
  const user = userAddress ?? connectedAddress;

  const result = useReadContract({
    address: EDEN_ACTIVITY_REGISTRY_ADDRESS,
    abi: EDEN_ACTIVITY_REGISTRY_ABI,
    functionName: "activityCount",
    args: user ? [user] : undefined,
    chainId: EDEN_ACTIVITY_REGISTRY_CHAIN_ID,
    query: {
      enabled: Boolean(user),
      refetchInterval: 30_000,
    },
  });

  return {
    count: result.data ?? 0n,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    refetch: result.refetch,
    userAddress: user,
  };
}
