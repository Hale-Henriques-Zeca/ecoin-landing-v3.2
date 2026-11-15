
import type { Address, Hex } from "viem";

/**
 * =========================================================
 * 1. ASSET TYPES
 * =========================================================
 */

export type ConverterAssetSymbol =
  | "eCoin"
  | "USDT"
  | "eDollar"
  | "BNB";

export interface ConverterAsset {
  symbol: ConverterAssetSymbol;
  name: string;
  address: Address;
  decimals: number;
  isNative: boolean;
  logo?: string;
}

/**
 * =========================================================
 * 2. CONVERSION TYPES
 * =========================================================
 */

export type ConversionDirection =
  | "BUY"
  | "SELL"
  | "CONVERT";

export interface ConversionFormValues {
  direction: ConversionDirection;
  tokenIn: ConverterAssetSymbol;
  tokenOut: ConverterAssetSymbol;
  amount: string;
  slippage: number;
  providerId?: ConverterProviderId;
}

/**
 * Backward compatibility:
 * Some existing files import ConverterFormValues.
 */

export type ConverterFormValues = ConversionFormValues;

/**
 * =========================================================
 * 3. PROVIDER TYPES
 * =========================================================
 */

export type ConverterProviderId = Hex;

export interface ConverterProvider {
  id: ConverterProviderId;
  name: string;
  adapter?: Address;
  enabled: boolean;
  description?: string;
}

/**
 * =========================================================
 * 4. QUOTE TYPES
 * =========================================================
 */

export interface ConversionQuote {
  providerId: ConverterProviderId;

  tokenIn: Address;
  tokenOut: Address;

  amountIn: bigint;
  feeAmount: bigint;
  netAmountIn: bigint;

  expectedAmountOut: bigint;
  minimumAmountOut: bigint;

  priceImpact?: number;
  slippage: number;

  routeData: Hex;

  deadline: bigint;
  updatedAt: number;
}

/**
 * =========================================================
 * 5. CONVERSION STATUS
 * =========================================================
 */

export type ConversionStatus =
  | "idle"
  | "quoting"
  | "awaiting_approval"
  | "approving"
  | "approval_confirming"
  | "awaiting_confirmation"
  | "submitting"
  | "confirming"
  | "success"
  | "failed";

/**
 * =========================================================
 * 6. TRANSACTION TYPES
 * =========================================================
 */

export interface ConversionTransaction {
  hash: Hex;

  tokenIn: Address;
  tokenOut: Address;

  amountIn: bigint;
  amountOut?: bigint;
  feeAmount?: bigint;

  providerId: ConverterProviderId;

  timestamp: number;

  status: ConversionStatus;
}

/**
 * =========================================================
 * 7. VALIDATION TYPES
 * =========================================================
 */

export interface ConverterValidationResult {
  valid: boolean;
  message?: string;
}

/**
 * =========================================================
 * 8. PAIR TYPES
 * =========================================================
 */

export interface ConverterPair {
  tokenIn: Address;
  tokenOut: Address;
  enabled: boolean;
}

/**
 * =========================================================
 * 9. FEE TYPES
 * =========================================================
 */

export interface ConverterFeeDetails {
  grossAmount: bigint;
  feeAmount: bigint;
  netAmount: bigint;
  feePercentage: number;
}
