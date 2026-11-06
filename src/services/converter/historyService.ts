import type { Address, Hex } from "viem";

export interface ConversionHistoryItem {
  id: string;
  transactionHash: Hex;
  wallet: Address;
  tokenIn: Address;
  tokenOut: Address;
  amountIn: string;
  amountOut: string;
  timestamp: number;
  status: "success" | "failed" | "pending";
  chainId: 56;
}

interface GetConversionHistoryParams {
  wallet: Address | string;
  limit?: number;
}

/**
 * TODO:
 * Ligar a uma base de dados/indexador que leia os eventos
 * do InternalConverter na BNB Smart Chain.
 *
 * Não declarar transações como existentes sem as recuperar
 * de uma fonte persistente e verificável.
 */
export async function getConversionHistory(
  _params: GetConversionHistoryParams
): Promise<ConversionHistoryItem[]> {
  return [];
}