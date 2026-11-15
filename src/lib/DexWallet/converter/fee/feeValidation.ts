
import {
  getAddress,
  isAddress,
  type Address,
} from "viem";

import {
  calculateConverterFee,
  toTokenUnits,
} from "./feeCalculator";

export interface FeeValidationConfig {
  account: string;
  tokenAddress: string;
  supportedTokens: string[];
  amount: string;
  decimals: number;
}

export interface ValidatedFeeOperation {
  account: Address;
  tokenAddress: Address;
  grossAmount: bigint;
  feeAmount: bigint;
  netAmount: bigint;
  decimals: number;
}

export function validateWalletAddress(
  address: string,
): Address {
  if (!isAddress(address)) {
    throw new Error("Invalid wallet address.");
  }

  return getAddress(address);
}

export function validateTokenAddress(
  tokenAddress: string,
  supportedTokens: string[],
): Address {
  if (!isAddress(tokenAddress)) {
    throw new Error("Invalid token address.");
  }

  const normalizedToken = getAddress(tokenAddress);

  const isSupported = supportedTokens.some(
    (token) =>
      isAddress(token) &&
      getAddress(token) === normalizedToken,
  );

  if (!isSupported) {
    throw new Error("Unsupported converter token.");
  }

  return normalizedToken;
}

export function validateGrossAmount(
  amount: string,
  decimals: number,
): bigint {
  const grossAmount = toTokenUnits(amount, decimals);

  if (grossAmount <= 0n) {
    throw new Error("Enter an amount greater than zero.");
  }

  return grossAmount;
}

/**
 * Validates the complete ERC20 fee operation.
 *
 * The supportedTokens array should contain the configured
 * USDT, EUSD and ECOIN contract addresses.
 */
export function validateFeeOperation(
  config: FeeValidationConfig,
): ValidatedFeeOperation {
  const account = validateWalletAddress(config.account);

  const tokenAddress = validateTokenAddress(
    config.tokenAddress,
    config.supportedTokens,
  );

  if (
    !Number.isInteger(config.decimals) ||
    config.decimals < 0 ||
    config.decimals > 255
  ) {
    throw new Error("Invalid token decimals.");
  }

  const grossAmount = validateGrossAmount(
    config.amount,
    config.decimals,
  );

  const fee = calculateConverterFee(grossAmount);

  return {
    account,
    tokenAddress,
    grossAmount: fee.grossAmount,
    feeAmount: fee.feeAmount,
    netAmount: fee.netAmount,
    decimals: config.decimals,
  };
}

/**
 * Checks that the amount sent to the quote service
 * is exactly the net amount after the 3% fee.
 */
export function validateNetSwapAmount(
  expectedNetAmount: bigint,
  actualSwapAmount: bigint,
): void {
  if (expectedNetAmount <= 0n) {
    throw new Error("Invalid net swap amount.");
  }

  if (actualSwapAmount !== expectedNetAmount) {
    throw new Error(
      "Swap amount does not match the amount after fees.",
    );
  }
}

/**
 * Validates an operation ID.
 */
export function validateOperationId(
  operationId: string,
): `0x${string}` {
  if (!/^0x[a-fA-F0-9]{64}$/.test(operationId)) {
    throw new Error("Invalid operation ID.");
  }

  if (/^0x0{64}$/i.test(operationId)) {
    throw new Error("Operation ID cannot be zero.");
  }

  return operationId as `0x${string}`;
}
