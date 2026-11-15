
import {
  getAddress,
  isAddress,
  type Address,
  type Hex,
} from "viem";

import type {
  KyberBuiltSwap,
  KyberQuoteResult,
} from "./types";

export const BSC_CHAIN_ID = 56;

export const KYBER_NATIVE_BNB =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

export interface ValidateKyberRouteParams {
  quote: KyberQuoteResult;
  swap: KyberBuiltSwap;
  expectedChainId?: number;
}

function sameAddress(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

function isNativeBNB(token: Address): boolean {
  return sameAddress(token, KYBER_NATIVE_BNB);
}

function assertAddress(value: string, label: string): void {
  if (!isAddress(value)) {
    throw new Error(`${label} is not a valid address.`);
  }
}

function assertHex(value: string, label: string): void {
  if (
    !/^0x([0-9a-fA-F]{2})+$/.test(value)
  ) {
    throw new Error(`${label} is not valid hexadecimal calldata.`);
  }
}

export function validateKyberSwapRoute({
  quote,
  swap,
  expectedChainId = BSC_CHAIN_ID,
}: ValidateKyberRouteParams): void {
  if (quote.chain !== "bsc" || swap.chain !== "bsc") {
    throw new Error("Unsupported KyberSwap chain.");
  }

  if (expectedChainId !== BSC_CHAIN_ID) {
    throw new Error("Unexpected blockchain network.");
  }

  assertAddress(quote.tokenIn, "Quote tokenIn");
  assertAddress(quote.tokenOut, "Quote tokenOut");
  assertAddress(quote.routerAddress, "Quote router");

  assertAddress(swap.tokenIn, "Swap tokenIn");
  assertAddress(swap.tokenOut, "Swap tokenOut");
  assertAddress(swap.routerAddress, "Swap router");
  assertAddress(swap.sender, "Swap sender");
  assertAddress(swap.recipient, "Swap recipient");

  if (
    !sameAddress(quote.tokenIn, swap.tokenIn) ||
    !sameAddress(quote.tokenOut, swap.tokenOut)
  ) {
    throw new Error("Swap tokens do not match the quote.");
  }

  if (!sameAddress(quote.routerAddress, swap.routerAddress)) {
    throw new Error("Execution router differs from quoted router.");
  }

  if (quote.netAmount <= 0n || quote.feeAmount <= 0n) {
    throw new Error("Invalid fee or net input amount.");
  }

  if (swap.amountIn !== quote.netAmount) {
    throw new Error(
      "Execution amount is not equal to the net input amount.",
    );
  }

  if (quote.amountOut <= 0n || swap.amountOut <= 0n) {
    throw new Error("Invalid expected output amount.");
  }

  if (swap.amountOut > quote.amountOut) {
    throw new Error(
      "Built output is unexpectedly higher than the quoted output.",
    );
  }

  if (
    !Number.isInteger(swap.slippageTolerance) ||
    swap.slippageTolerance < 1 ||
    swap.slippageTolerance > 500
  ) {
    throw new Error("Invalid slippage tolerance.");
  }

  const minimumAllowedOutput =
    (quote.amountOut *
      BigInt(10_000 - swap.slippageTolerance)) /
    10_000n;

  if (swap.amountOut < minimumAllowedOutput) {
    throw new Error(
      "Built output is below the permitted slippage threshold.",
    );
  }

  assertHex(swap.data as Hex, "Swap calldata");

  if (swap.transactionValue < 0n) {
    throw new Error("Invalid transaction value.");
  }

  const nativeInput = isNativeBNB(quote.tokenIn);

  if (!nativeInput && swap.transactionValue !== 0n) {
    throw new Error(
      "ERC-20 swap must not send native BNB as transaction value.",
    );
  }

  if (nativeInput && swap.transactionValue !== quote.netAmount) {
    throw new Error(
      "Native BNB transaction value must equal the net input amount.",
    );
  }

  if (sameAddress(swap.sender, "0x0000000000000000000000000000000000000000")) {
    throw new Error("Invalid swap sender.");
  }

  if (sameAddress(swap.recipient, "0x0000000000000000000000000000000000000000")) {
    throw new Error("Invalid swap recipient.");
  }

  // Normaliza e confirma que os endereços são compatíveis.
  getAddress(swap.routerAddress);
}
