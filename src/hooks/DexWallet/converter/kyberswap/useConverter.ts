
"use client";

import { useCallback, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import {
  isAddress,
  isHex,
  type Address,
  type Hex,
} from "viem";

import {
  EDENKINGDOM_CONVERTER_ROUTER_ABI,
} from "@/lib/abis/Converter/EdenKingDomConverterRouterABI";

import {
  CONVERTER_CONTRACTS,
  NATIVE_BNB,
  ZERO_ADDRESS,
} from "@/lib/DexWallet/converter/contracts";

import type { ConversionQuote } from "@/types/converter";

/**
 * Dados combinados:
 * - ConversionQuote: cotação original convertida para bigint.
 * - Build API: dados da transacção construída pelo KyberSwap.
 *
 * Atenção:
 * O build/route.ts actual ainda não devolve spender.
 * Este campo deverá ser acrescentado à API antes da execução.
 */
export interface BuiltConversionQuote
  extends Omit<ConversionQuote, "routeData"> {
  chainId: number;

  sender: Address;
  recipient: Address;

  kyberRouterAddress: Address;
  spender: Address;

  data: Hex;
  transactionValue: string;

  amountOut: string;

  builtAt: number;
  quoteExpiresAt: number;
}

interface ExecuteSwapParams {
  quote: BuiltConversionQuote;
}

const MAX_BUILD_AGE_MS = 30_000;

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function isValidDecimalString(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

export function useConverter() {
  const {
    address,
    isConnected,
    chainId,
  } = useAccount();

  const routerAddress =
    CONVERTER_CONTRACTS.edenKingDomConverterRouter;

  const routerConfigured =
    routerAddress !== ZERO_ADDRESS;

  const {
    writeContractAsync,
    data: transactionHash,
    isPending,
    error,
    reset,
  } = useWriteContract();

  const [lastSubmittedHash, setLastSubmittedHash] =
    useState<Hex | undefined>();

  /**
   * Validate quote and KyberSwap build before execution.
   */
  const validateQuote = useCallback(
    (quote: BuiltConversionQuote): void => {
      if (!isConnected || !address) {
        throw new Error("Connect your wallet first.");
      }

      if (chainId !== CONVERTER_CONTRACTS.chainId) {
        throw new Error(
          "Switch to BNB Smart Chain Mainnet.",
        );
      }

      if (!routerConfigured) {
        throw new Error(
          "EdenKingDomConverterRouter address is not configured.",
        );
      }

      if (quote.chainId !== CONVERTER_CONTRACTS.chainId) {
        throw new Error("Invalid quote chain.");
      }

      if (
        !isAddress(quote.tokenIn) ||
        !isAddress(quote.tokenOut) ||
        !isAddress(quote.sender) ||
        !isAddress(quote.recipient) ||
        !isAddress(quote.kyberRouterAddress) ||
        !isAddress(quote.spender)
      ) {
        throw new Error(
          "Invalid address in conversion build.",
        );
      }

      if (!sameAddress(quote.sender, routerAddress)) {
        throw new Error(
          "Build sender does not match EdenKingDomConverterRouter.",
        );
      }

      if (
        !isHex(quote.data, { strict: true }) ||
        quote.data.length < 10
      ) {
        throw new Error(
          "Invalid KyberSwap execution calldata.",
        );
      }

      if (
        quote.amountIn <= 0n ||
        quote.feeAmount <= 0n ||
        quote.netAmountIn <= 0n ||
        quote.minimumAmountOut <= 0n
      ) {
        throw new Error(
          "Invalid conversion amounts.",
        );
      }

      if (
        quote.feeAmount + quote.netAmountIn !==
        quote.amountIn
      ) {
        throw new Error(
          "Gross, fee and net amounts are inconsistent.",
        );
      }

      if (
        !isValidDecimalString(quote.transactionValue) ||
        !isValidDecimalString(quote.amountOut) ||
        BigInt(quote.amountOut) <= 0n
      ) {
        throw new Error(
          "Invalid KyberSwap build amounts.",
        );
      }

      if (
        quote.deadline <=
        BigInt(Math.floor(Date.now() / 1000))
      ) {
        throw new Error(
          "Execution deadline has expired.",
        );
      }

      const now = Date.now();

      if (
        !Number.isSafeInteger(quote.builtAt) ||
        !Number.isSafeInteger(quote.quoteExpiresAt) ||
        now < quote.builtAt ||
        now - quote.builtAt > MAX_BUILD_AGE_MS ||
        now > quote.quoteExpiresAt
      ) {
        throw new Error(
          "Build expired. Request a fresh quote.",
        );
      }

      if (
        sameAddress(quote.tokenIn, quote.tokenOut)
      ) {
        throw new Error(
          "Input and output tokens must be different.",
        );
      }

      /**
       * Native BNB input:
       * Kyber receives netAmountIn, not grossAmountIn.
       *
       * ERC20 input:
       * Kyber transactionValue must be zero.
       */
      const isNativeInput = sameAddress(
        quote.tokenIn,
        NATIVE_BNB,
      );

      const expectedTransactionValue = isNativeInput
        ? quote.netAmountIn
        : 0n;

      if (
        BigInt(quote.transactionValue) !==
        expectedTransactionValue
      ) {
        throw new Error(
          "Kyber transaction value does not match the net input amount.",
        );
      }

      /**
       * Output recipient:
       *
       * ERC20 output -> user wallet.
       * BNB output -> EdenKingDom Converter Router.
       */
      const isNativeOutput = sameAddress(
        quote.tokenOut,
        NATIVE_BNB,
      );

      const expectedRecipient = isNativeOutput
        ? routerAddress
        : address;

      if (
        !sameAddress(
          quote.recipient,
          expectedRecipient,
        )
      ) {
        throw new Error(
          "Build recipient does not match the expected output recipient.",
        );
      }

      if (
        BigInt(quote.amountOut) <
        quote.minimumAmountOut
      ) {
        throw new Error(
          "Build output is below the minimum output amount.",
        );
      }
    },
    [
      isConnected,
      address,
      chainId,
      routerConfigured,
      routerAddress,
    ],
  );

  /**
   * ERC20 -> ERC20
   * ERC20 -> BNB
   */
  const executeTokenSwap = useCallback(
    async ({ quote }: ExecuteSwapParams) => {
      validateQuote(quote);

      if (
        sameAddress(quote.tokenIn, NATIVE_BNB)
      ) {
        throw new Error(
          "Use executeBNBSwap for native BNB input.",
        );
      }

      if (BigInt(quote.transactionValue) !== 0n) {
        throw new Error(
          "ERC20 input must not send native BNB value.",
        );
      }

      const hash = await writeContractAsync({
        address: routerAddress,
        abi: EDENKINGDOM_CONVERTER_ROUTER_ABI,
        functionName: "executeSwap",
        args: [
          quote.tokenIn,
          quote.tokenOut,
          quote.amountIn,
          quote.minimumAmountOut,
          quote.deadline,
          quote.kyberRouterAddress,
          quote.spender,
          quote.data,
        ],
      });

      setLastSubmittedHash(hash);

      return hash;
    },
    [
      validateQuote,
      writeContractAsync,
      routerAddress,
    ],
  );

  /**
   * BNB -> ERC20
   *
   * The wallet sends grossAmountIn.
   * The Router calculates and deducts the fee.
   * Kyber executes with netAmountIn.
   */
  const executeBNBSwap = useCallback(
    async ({ quote }: ExecuteSwapParams) => {
      validateQuote(quote);

      if (
        !sameAddress(quote.tokenIn, NATIVE_BNB)
      ) {
        throw new Error(
          "This execution requires native BNB as input.",
        );
      }

      if (
        BigInt(quote.transactionValue) !==
        quote.netAmountIn
      ) {
        throw new Error(
          "BNB Kyber transaction value must equal the net input amount.",
        );
      }

      const hash = await writeContractAsync({
        address: routerAddress,
        abi: EDENKINGDOM_CONVERTER_ROUTER_ABI,
        functionName: "executeSwapNative",
        args: [
          quote.tokenOut,
          quote.minimumAmountOut,
          quote.deadline,
          quote.kyberRouterAddress,
          quote.spender,
          quote.data,
        ],
        value: quote.amountIn,
      });

      setLastSubmittedHash(hash);

      return hash;
    },
    [
      validateQuote,
      writeContractAsync,
      routerAddress,
    ],
  );

  /**
   * Automatic execution based on input token.
   */
  const executeConversion = useCallback(
    async ({ quote }: ExecuteSwapParams) => {
      if (
        sameAddress(quote.tokenIn, NATIVE_BNB)
      ) {
        return executeBNBSwap({ quote });
      }

      return executeTokenSwap({ quote });
    },
    [
      executeBNBSwap,
      executeTokenSwap,
    ],
  );

  return {
    executeTokenSwap,
    executeBNBSwap,
    executeConversion,

    validateQuote,

    transactionHash,
    lastSubmittedHash,

    isPending,
    error,
    reset,
  };
}
