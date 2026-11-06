
import {
  formatUnits,
  parseUnits,
} from "viem";

import type {
  ConverterAsset,
  ConverterFeeDetails,
} from "@/types/converter";

import {
  CONVERTER_FEE,
  CONVERTER_SETTINGS,
} from "./contracts";

/**
 * =========================================================
 * 1. TOKEN UNIT CONVERSION
 * =========================================================
 */

export function toTokenUnits(
  amount: string,
  decimals: number
): bigint {
  const normalized = amount.trim();

  if (
    !normalized ||
    !Number.isInteger(decimals) ||
    decimals < 0 ||
    !/^\d+(\.\d+)?$/.test(normalized)
  ) {
    return 0n;
  }

  try {
    return parseUnits(normalized, decimals);
  } catch {
    return 0n;
  }
}

export function fromTokenUnits(
  amount: bigint,
  decimals: number
): string {
  if (
    !Number.isInteger(decimals) ||
    decimals < 0
  ) {
    throw new Error("Invalid token decimals.");
  }

  return formatUnits(amount, decimals);
}

/**
 * =========================================================
 * 2. PRECISE ASSET FORMATTING
 * =========================================================
 */

export function formatAssetAmount(
  amount: bigint,
  asset: ConverterAsset,
  maximumFractionDigits = 6
): string {
  if (
    !Number.isInteger(maximumFractionDigits) ||
    maximumFractionDigits < 0
  ) {
    throw new Error("Invalid fraction digits.");
  }

  const raw = formatUnits(amount, asset.decimals);
  const [integerPart, fractionPart = ""] = raw.split(".");

  const groupedInteger = BigInt(integerPart).toLocaleString(
    "en-US"
  );

  const fraction = fractionPart
    .slice(0, maximumFractionDigits)
    .replace(/0+$/, "");

  return fraction
    ? `${groupedInteger}.${fraction}`
    : groupedInteger;
}

/**
 * =========================================================
 * 3. FIAT FORMATTING
 * =========================================================
 */

export function formatUSD(
  amount: number,
  maximumFractionDigits = 2
): string {
  if (!Number.isFinite(amount)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(amount);
}

export function formatPercentage(
  value: number
): string {
  if (!Number.isFinite(value)) {
    return "0.00%";
  }

  return `${value.toFixed(2)}%`;
}

/**
 * =========================================================
 * 4. CONVERTER FEE
 * =========================================================
 *
 * Local estimate only.
 * FeeCollector.previewFee() is authoritative.
 */

export function calculateConverterFee(
  grossAmount: bigint
): ConverterFeeDetails {
  if (grossAmount <= 0n) {
    return {
      grossAmount: 0n,
      feeAmount: 0n,
      netAmount: 0n,
      feePercentage: CONVERTER_FEE.percentage,
    };
  }

  const feeAmount =
    (grossAmount * CONVERTER_FEE.serviceFeeBP) /
    CONVERTER_FEE.denominator;

  return {
    grossAmount,
    feeAmount,
    netAmount: grossAmount - feeAmount,
    feePercentage: CONVERTER_FEE.percentage,
  };
}

/**
 * =========================================================
 * 5. MINIMUM OUTPUT / SLIPPAGE
 * =========================================================
 */

export function calculateMinimumOutput(
  expectedAmountOut: bigint,
  slippagePercentage: number
): bigint {
  if (expectedAmountOut <= 0n) {
    return 0n;
  }

  if (
    !Number.isFinite(slippagePercentage) ||
    slippagePercentage < CONVERTER_SETTINGS.minimumSlippage ||
    slippagePercentage > CONVERTER_SETTINGS.maximumSlippage
  ) {
    throw new Error("Invalid slippage percentage.");
  }

  const slippageBP = BigInt(
    Math.round(slippagePercentage * 100)
  );

  const remainingBP =
    CONVERTER_FEE.denominator - slippageBP;

  return (
    expectedAmountOut * remainingBP
  ) / CONVERTER_FEE.denominator;
}

/**
 * =========================================================
 * 6. TRANSACTION DEADLINE
 * =========================================================
 */

export function getConverterDeadline(): bigint {
  const deadline =
    Math.floor(Date.now() / 1000) +
    CONVERTER_SETTINGS.transactionDeadlineMinutes * 60;

  return BigInt(deadline);
}

/**
 * =========================================================
 * 7. ADDRESS / HASH FORMATTING
 * =========================================================
 */

export function shortenAddress(
  address?: string,
  start = 6,
  end = 4
): string {
  if (!address) return "";

  if (address.length <= start + end) {
    return address;
  }

  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function shortenTransactionHash(
  hash?: string
): string {
  return shortenAddress(hash, 10, 8);
}
