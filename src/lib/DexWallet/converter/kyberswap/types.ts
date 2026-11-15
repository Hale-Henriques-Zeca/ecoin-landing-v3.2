
import type { Address, Hex } from "viem";
import type { ConverterFeeResult } from "../fee/feeCalculator";

// ============================================================
// COMMON
// ============================================================

export type KyberChain = "bsc";

export interface KyberApiEnvelope<T> {
  code: number;
  message: string;
  data: T;
  requestId?: string;
}

// ============================================================
// GET /api/v1/routes
// ============================================================

export interface KyberRoutePool {
  pool: Address;
  tokenIn: Address;
  tokenOut: Address;
  swapAmount: string;
  amountOut: string;
  exchange: string;
  poolType: string;
}

export interface KyberRouteSummary {
  tokenIn: Address;
  amountIn: string;
  amountInUsd?: string;

  tokenOut: Address;
  amountOut: string;
  amountOutUsd?: string;

  gas?: string;
  gasPrice?: string;
  gasUsd?: string;

  route: KyberRoutePool[][];

  routeID?: string;
  checksum?: string;

  extraFee?: {
    feeAmount: string;
    chargeFeeBy: string;
    isInBps: boolean;
    feeReceiver: Address;
  };

  [key: string]: unknown;
}

export interface KyberGetRouteData {
  routeSummary: KyberRouteSummary;
  routerAddress: Address;
  [key: string]: unknown;
}

export interface GetRouteParams {
  chain: KyberChain;
  tokenIn: Address;
  tokenOut: Address;

  /**
   * Must be the result of calculateConverterFee().
   * getRoute() will use fee.netAmount exclusively.
   */
  fee: ConverterFeeResult;

  includedSources?: string;
  excludedSources?: string;
  gasInclude?: boolean;
  saveGas?: boolean;
}

// ============================================================
// POST /api/v1/route/build
// ============================================================

export interface KyberBuildRouteParams {
  chain: KyberChain;
  routeSummary: KyberRouteSummary;

  sender: Address;
  recipient: Address;

  /**
   * KyberSwap uses basis points.
   * 10 = 0.1%, 50 = 0.5%, 100 = 1%.
   */
  slippageTolerance: number;

  source?: string;
  referral?: string;
  deadline?: number;
  enableGasEstimation?: boolean;
}

export interface KyberBuildRouteData {
  amountIn: string;
  amountOut: string;

  amountInUsd?: string;
  amountOutUsd?: string;

  gas?: string;
  gasUsd?: string;

  additionalCostUsd?: string;
  additionalCostMessage?: string;

  data: Hex;
  routerAddress: Address;
  transactionValue: string;

  [key: string]: unknown;
}

// ============================================================
// SERVICE RESULTS
// ============================================================

export interface KyberQuoteResult {
  chain: KyberChain;

  tokenIn: Address;
  tokenOut: Address;

  grossAmount: bigint;
  feeAmount: bigint;
  netAmount: bigint;

  amountOut: bigint;

  routerAddress: Address;
  routeSummary: KyberRouteSummary;

  amountOutUsd?: string;
  gas?: string;
  gasUsd?: string;

  quotedAt: number;
}

export interface KyberBuiltSwap {
  chain: KyberChain;

  sender: Address;
  recipient: Address;

  tokenIn: Address;
  tokenOut: Address;

  amountIn: bigint;
  amountOut: bigint;

  routerAddress: Address;
  transactionValue: bigint;
  data: Hex;

  slippageTolerance: number;

  builtAt: number;
}

// ============================================================
// INTERNAL VALIDATION
// ============================================================

export interface KyberRequestContext {
  chain: KyberChain;
  clientId: string;
}

export type FeeAwareRouteInput = {
  fee: ConverterFeeResult;
};
