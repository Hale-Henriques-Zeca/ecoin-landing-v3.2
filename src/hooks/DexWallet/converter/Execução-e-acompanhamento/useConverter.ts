
"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  useAccount,
  useWriteContract,
} from "wagmi";

import {
  isAddress,
  isHex,
  type Address,
  type Hex,
} from "viem";

import {
  DEX_INTERNAL_CONVERTER_ABI,
} from "@/lib/abis/Converter/abis";

import {
  CONVERTER_CONTRACTS,
  NATIVE_BNB,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import type {
  ConversionQuote,
} from "@/types/converter";

interface ExecuteTokenSwapParams {
  quote: ConversionQuote;
}

interface ExecuteBNBSwapParams {
  quote: ConversionQuote;
}

export function useConverter() {
  const {
    address,
    isConnected,
    chainId,
  } = useAccount();

  const {
    writeContractAsync,
    data: transactionHash,
    isPending,
    error,
    reset,
  } = useWriteContract();

  const [lastSubmittedHash, setLastSubmittedHash] =
    useState<Hex | undefined>();

  const validateQuote = useCallback(
    (quote: ConversionQuote) => {
      if (!isConnected || !address) {
        throw new Error("Connect your wallet first.");
      }

      if (chainId !== CONVERTER_CONTRACTS.chainId) {
        throw new Error("Please switch to BNB Smart Chain.");
      }

      if (
        CONVERTER_CONTRACTS.internalConverter === ZERO_ADDRESS
      ) {
        throw new Error("Converter contract is not configured.");
      }

      if (
        !isAddress(quote.tokenIn) ||
        !isAddress(quote.tokenOut)
      ) {
        throw new Error("Invalid conversion assets.");
      }

      if (
        !isHex(quote.providerId, { strict: true }) ||
        quote.providerId.length !== 66 ||
        quote.providerId === `0x${"0".repeat(64)}`
      ) {
        throw new Error("Invalid provider ID.");
      }

      if (
        !isHex(quote.routeData, { strict: true })
      ) {
        throw new Error("Invalid route data.");
      }

      if (
        quote.amountIn <= 0n ||
        quote.feeAmount <= 0n ||
        quote.netAmountIn !==
          quote.amountIn - quote.feeAmount ||
        quote.minimumAmountOut <= 0n
      ) {
        throw new Error("Invalid quote amounts.");
      }

      if (
        quote.deadline <=
        BigInt(Math.floor(Date.now() / 1000))
      ) {
        throw new Error("Quote expired. Request a new quote.");
      }

      if (
        quote.updatedAt <
        Math.floor(Date.now() / 1000) - 30
      ) {
        throw new Error("Quote is stale. Refresh it.");
      }

      if (quote.tokenIn === quote.tokenOut) {
        throw new Error("Input and output assets must differ.");
      }
    },
    [isConnected, address, chainId]
  );

  const executeTokenSwap = useCallback(
    async ({ quote }: ExecuteTokenSwapParams) => {
      validateQuote(quote);

      if (
        quote.tokenIn.toLowerCase() ===
        NATIVE_BNB.toLowerCase()
      ) {
        throw new Error(
          "Use executeBNBSwap for native BNB."
        );
      }

      const hash = await writeContractAsync({
        address: CONVERTER_CONTRACTS.internalConverter,
        abi: DEX_INTERNAL_CONVERTER_ABI,
        functionName: "swapToken",
        args: [
          quote.providerId,
          quote.tokenIn,
          quote.tokenOut,
          quote.amountIn,
          quote.minimumAmountOut,
          quote.deadline,
          quote.routeData,
        ],
      });

      setLastSubmittedHash(hash);

      return hash;
    },
    [validateQuote, writeContractAsync]
  );

  const executeBNBSwap = useCallback(
    async ({ quote }: ExecuteBNBSwapParams) => {
      validateQuote(quote);

      if (
        quote.tokenIn.toLowerCase() !==
        NATIVE_BNB.toLowerCase()
      ) {
        throw new Error(
          "BNB must be the input asset."
        );
      }

      const hash = await writeContractAsync({
        address: CONVERTER_CONTRACTS.internalConverter,
        abi: DEX_INTERNAL_CONVERTER_ABI,
        functionName: "swapBNB",
        args: [
          quote.providerId,
          quote.tokenOut,
          quote.minimumAmountOut,
          quote.deadline,
          quote.routeData,
        ],
        value: quote.amountIn,
      });

      setLastSubmittedHash(hash);

      return hash;
    },
    [validateQuote, writeContractAsync]
  );

  const executeConversion = useCallback(
    async ({ quote }: { quote: ConversionQuote }) => {
      if (
        quote.tokenIn.toLowerCase() ===
        NATIVE_BNB.toLowerCase()
      ) {
        return executeBNBSwap({ quote });
      }

      return executeTokenSwap({ quote });
    },
    [executeBNBSwap, executeTokenSwap]
  );

  return {
    executeConversion,
    executeTokenSwap,
    executeBNBSwap,
    validateQuote,

    transactionHash,
    lastSubmittedHash,

    isConnected,
    isPending,
    error,

    reset,
  };
}
