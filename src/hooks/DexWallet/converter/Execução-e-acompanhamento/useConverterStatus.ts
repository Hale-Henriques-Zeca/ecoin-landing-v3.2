
"use client";

import {
  useWaitForTransactionReceipt,
} from "wagmi";

import type {
  Hex,
} from "viem";

interface UseConverterStatusParams {
  hash?: Hex;
}

export function useConverterStatus({
  hash,
}: UseConverterStatusParams) {
  const {
    data: receipt,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
      retry: 3,
    },
  });

  const status =
    !hash
      ? "idle"
      : isLoading
        ? "confirming"
        : isSuccess && receipt?.status === "success"
          ? "success"
          : isError || receipt?.status === "reverted"
            ? "failed"
            : "pending";

  return {
    receipt,
    hash,
    status,

    isIdle: status === "idle",
    isPending: status === "pending",
    isConfirming: status === "confirming",
    isSuccess: status === "success",
    isFailed: status === "failed",

    error,
    refetch,
  };
}
