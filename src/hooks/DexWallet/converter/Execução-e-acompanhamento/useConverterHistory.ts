"use client";

import useSWR from "swr";

import {
  useAccount,
} from "wagmi";

import type {
  Address,
  Hex,
} from "viem";

export interface ConverterHistoryItem {
  id: string;
  transactionHash: Hex;
  user: Address;

  providerId: Hex;

  tokenIn: Address;
  tokenOut: Address;

  amountIn: string;
  feeAmount: string;
  amountOut: string;

  blockNumber: string;
  timestamp: number;

  status: "success" | "failed";
}

interface ConverterHistoryResponse {
  success: boolean;
  items: ConverterHistoryItem[];
  total: number;
  error?: string;
}

async function fetchConverterHistory(
  url: string
): Promise<ConverterHistoryResponse> {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const result =
    (await response.json()) as ConverterHistoryResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.error || "Unable to load conversion history."
    );
  }

  return result;
}

interface UseConverterHistoryParams {
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useConverterHistory({
  page = 1,
  limit = 10,
  enabled = true,
}: UseConverterHistoryParams = {}) {
  const {
    address,
    isConnected,
  } = useAccount();

  const query =
    enabled && isConnected && address
      ? `/api/converter/history?wallet=${address}&page=${page}&limit=${limit}`
      : null;

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<ConverterHistoryResponse>(
    query,
    fetchConverterHistory,
    {
      revalidateOnFocus: true,
      refreshInterval: 30_000,
      dedupingInterval: 5000,
      shouldRetryOnError: false,
    }
  );

  return {
    history: Array.isArray(data?.items) ? data.items : [],
    total: data?.total ?? 0,
    page,
    limit,

    error,
    isLoading,
    isValidating,

    hasHistory: Array.isArray(data?.items)
      ? data.items.length > 0
      : false,

    refreshHistory: mutate,
  };
}