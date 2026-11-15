
export interface LiquidMeshQuoteParams {
  chainId: 56;
  inputToken: string;
  outputToken: string;
  amount: string;
  userAddress: string;
}

export interface LiquidMeshTokenInfo {
  address?: string;
  chainId?: number | string;
  decimals?: number;
  symbol?: string;
  name?: string;
  [key: string]: unknown;
}

export interface LiquidMeshRoutePlan {
  amount?: string;
  router?: string;
  subRouters?: unknown[];
  [key: string]: unknown;
}

export interface LiquidMeshQuoteData {
  chainId?: number | string;
  inputToken?: string;
  outputToken?: string;
  inputAmount?: string;
  outputAmount?: string;
  priceImpactPct?: string;
  midPrice?: string;
  routePlans?: LiquidMeshRoutePlan[];
  blockNumber?: number;
  tradeType?: string;
  estimatedGas?: number;
  [key: string]: unknown;
}

export interface LiquidMeshQuoteResponse {
  success?: boolean;
  code?: number;
  msg?: string;
  message?: string;
  data?: LiquidMeshQuoteData;
  [key: string]: unknown;
}

export interface LiquidMeshQuoteResult {
  success: true;
  provider: "LIQUIDMESH";
  chainId: 56;
  inputToken: string;
  outputToken: string;
  inputAmount: string;
  userAddress: string;
  quote: LiquidMeshQuoteResponse;
}

export interface LiquidMeshHealthResponse {
  success: boolean;
  service: "LiquidMesh";
  authenticated: boolean;
  message: string;
}

export interface LiquidMeshSwapParams {
  chainId: 56;
  inputToken: string;
  outputToken: string;
  amount: string;
  userAddress: string;
  slippageBps: number;
}

/**
 * Executable EVM transaction returned by LiquidMesh.
 */
export interface LiquidMeshCallMsg {
  from: string;
  to: string;
  value: string;
  data: string;
}

/**
 * Actual swap data returned by POST /v1/bsc/swap.
 */
export interface LiquidMeshSwapData {
  chainId: number | string;
  callMsg: LiquidMeshCallMsg;
  estimatedGas?: number | string;
  orderId?: string;
  expiryTimestamp?: number | string;
  [key: string]: unknown;
}

export interface LiquidMeshSwapResponse {
  code: number;
  msg?: string;
  message?: string;
  data?: LiquidMeshSwapData;
  [key: string]: unknown;
}

export interface LiquidMeshSwapResult {
  success: true;
  provider: "LIQUIDMESH";
  chainId: 56;
  inputToken: string;
  outputToken: string;
  inputAmount: string;
  userAddress: string;
  slippageBps: number;
  quote: LiquidMeshQuoteResponse;
  swap: LiquidMeshSwapResponse;
}
