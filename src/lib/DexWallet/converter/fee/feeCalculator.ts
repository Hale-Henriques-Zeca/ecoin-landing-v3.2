
import { formatUnits, parseUnits } from "viem";

export const SERVICE_FEE_BP = 300n;
export const BASIS_POINTS = 10_000n;

export interface ConverterFeeResult {
  grossAmount: bigint;
  feeAmount: bigint;
  netAmount: bigint;
  feeBP: bigint;
}

export interface ConverterFeeInput {
  amount: string;
  decimals: number;
}

function validateDecimals(decimals: number): void {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 255) {
    throw new Error("Invalid token decimals.");
  }
}

/**
 * Converts a human-readable amount into token base units.
 */
export function toTokenUnits(
  amount: string,
  decimals: number,
): bigint {
  validateDecimals(decimals);

  const normalized = amount.trim();

  if (!normalized || !/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error("Invalid amount.");
  }

  return parseUnits(normalized, decimals);
}

/**
 * Converts token base units into a human-readable amount.
 */
export function fromTokenUnits(
  amount: bigint,
  decimals: number,
): string {
  validateDecimals(decimals);

  if (amount < 0n) {
    throw new Error("Amount cannot be negative.");
  }

  return formatUnits(amount, decimals);
}

/**
 * Frontend-only conversion breakdown.
 *
 * grossAmount = 100%
 * feeAmount   = 3%
 * netAmount   = 97%
 *
 * Only netAmount should be sent to KyberSwap for quotation.
 */
export function calculateConverterFee(
  grossAmount: bigint,
): ConverterFeeResult {
  if (grossAmount <= 0n) {
    throw new Error("Gross amount must be greater than zero.");
  }

  const feeAmount =
    (grossAmount * SERVICE_FEE_BP) / BASIS_POINTS;

  if (feeAmount <= 0n) {
    throw new Error("Amount is too small to cover the converter fee.");
  }

  if (feeAmount >= grossAmount) {
    throw new Error("Invalid converter fee.");
  }

  const netAmount = grossAmount - feeAmount;

  return {
    grossAmount,
    feeAmount,
    netAmount,
    feeBP: SERVICE_FEE_BP,
  };
}

/**
 * Calculates the breakdown from the user's input.
 */
export function calculateConverterFeeFromInput({
  amount,
  decimals,
}: ConverterFeeInput): ConverterFeeResult {
  const grossAmount = toTokenUnits(amount, decimals);

  return calculateConverterFee(grossAmount);
}

/**
 * Formats the breakdown for frontend display.
 */
export function formatConverterFee(
  result: ConverterFeeResult,
  decimals: number,
) {
  return {
    gross: fromTokenUnits(result.grossAmount, decimals),
    fee: fromTokenUnits(result.feeAmount, decimals),
    net: fromTokenUnits(result.netAmount, decimals),
    feePercentage: "3%",
  };
}
