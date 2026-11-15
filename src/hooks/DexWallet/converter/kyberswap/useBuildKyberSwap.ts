
"use client";

import { useCallback, useState } from "react";
import type { Address } from "viem";

import type {
  KyberBuiltSwap,
  KyberQuoteResult,
} from "@/lib/DexWallet/converter/kyberswap/types";

interface UseBuildKyberSwapParams {
  quote: KyberQuoteResult | null;
  sender?: Address;
  recipient?: Address;
  slippageTolerance?: number;
  enabled?: boolean;
}

interface BuildApiResponse {
  swap: {
    chain: KyberBuiltSwap["chain"];
    sender: Address;
    recipient: Address;
    tokenIn: Address;
    tokenOut: Address;
    amountIn: string;
    amountOut: string;
    routerAddress: Address;
    transactionValue: string;
    data: KyberBuiltSwap["data"];
    slippageTolerance: number;
    builtAt: number;
  };
}

interface UseBuildKyberSwapReturn {
  builtSwap: KyberBuiltSwap | null;
  isBuilding: boolean;
  error: string | null;
  build: () => Promise<KyberBuiltSwap | null>;
  clear: () => void;
}

const BUILD_ENDPOINT = "/api/dex/kyberswap/route/build";

export function useBuildKyberSwap({
  quote,
  sender,
  recipient,
  slippageTolerance = 50,
  enabled = true,
}: UseBuildKyberSwapParams): UseBuildKyberSwapReturn {
  const [builtSwap, setBuiltSwap] =
    useState<KyberBuiltSwap | null>(null);

  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clear = useCallback(() => {
    setBuiltSwap(null);
    setError(null);
  }, []);

  const build = useCallback(async (): Promise<KyberBuiltSwap | null> => {
    if (!enabled || !quote || !sender || !recipient) {
      setError("Quote, sender and recipient are required.");
      return null;
    }

    if (quote.netAmount <= 0n) {
      setError("Invalid net input amount.");
      return null;
    }

    if (
      BigInt(quote.routeSummary.amountIn) !== quote.netAmount
    ) {
      setError("Quote amount does not match the net input.");
      return null;
    }

    if (
      !Number.isInteger(slippageTolerance) ||
      slippageTolerance < 1 ||
      slippageTolerance > 500
    ) {
      setError("Slippage must be between 1 and 500 basis points.");
      return null;
    }

    setIsBuilding(true);
    setError(null);
    setBuiltSwap(null);

    try {
      const response = await fetch(BUILD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          quote: {
            ...quote,
            grossAmount: quote.grossAmount.toString(),
            feeAmount: quote.feeAmount.toString(),
            netAmount: quote.netAmount.toString(),
            amountOut: quote.amountOut.toString(),
          },
          sender,
          recipient,
          slippageTolerance,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(
          body?.error || body?.message || "Unable to build KyberSwap transaction.",
        );
      }

      const item = (body as BuildApiResponse).swap;

      if (!item) {
        throw new Error("The build API returned an empty transaction.");
      }

      const amountIn = BigInt(item.amountIn);
      const amountOut = BigInt(item.amountOut);
      const transactionValue = BigInt(item.transactionValue);

      if (
        amountIn !== quote.netAmount ||
        amountOut <= 0n ||
        transactionValue < 0n
      ) {
        throw new Error("The built transaction contains invalid amounts.");
      }

      if (
        item.routerAddress.toLowerCase() !==
        quote.routerAddress.toLowerCase()
      ) {
        throw new Error("The execution router changed after the quote.");
      }

      if (
        item.sender.toLowerCase() !== sender.toLowerCase() ||
        item.recipient.toLowerCase() !== recipient.toLowerCase()
      ) {
        throw new Error("The transaction sender or recipient changed.");
      }

      if (
        item.tokenIn.toLowerCase() !== quote.tokenIn.toLowerCase() ||
        item.tokenOut.toLowerCase() !== quote.tokenOut.toLowerCase()
      ) {
        throw new Error("The built transaction uses different tokens.");
      }

      if (!/^0x([0-9a-fA-F]{2})+$/.test(item.data)) {
        throw new Error("Invalid transaction calldata.");
      }

      const result: KyberBuiltSwap = {
        ...item,
        amountIn,
        amountOut,
        transactionValue,
      };

      setBuiltSwap(result);
      return result;
    } catch (err) {
      setBuiltSwap(null);
      setError(
        err instanceof Error
          ? err.message
          : "Unexpected build error.",
      );
      return null;
    } finally {
      setIsBuilding(false);
    }
  }, [
    enabled,
    quote,
    sender,
    recipient,
    slippageTolerance,
  ]);

  return {
    builtSwap,
    isBuilding,
    error,
    build,
    clear,
  };
}
