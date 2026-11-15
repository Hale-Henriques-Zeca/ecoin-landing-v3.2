
import {
  type Hash,
  type PublicClient,
  type TransactionReceipt,
} from "viem";

export type SwapTransactionStatus =
  | "pending"
  | "success"
  | "reverted"
  | "timeout";

export interface MonitorTransactionParams {
  publicClient: PublicClient;
  hash: Hash;
  confirmations?: number;
  timeoutMs?: number;
  pollingIntervalMs?: number;
}

export interface MonitorTransactionResult {
  hash: Hash;
  status: SwapTransactionStatus;
  receipt?: TransactionReceipt;
  blockNumber?: bigint;
  gasUsed?: bigint;
}

export async function monitorSwapTransaction({
  publicClient,
  hash,
  confirmations = 2,
  timeoutMs = 180_000,
  pollingIntervalMs = 3_000,
}: MonitorTransactionParams): Promise<MonitorTransactionResult> {
  if (!hash || !/^0x[0-9a-fA-F]{64}$/.test(hash)) {
    throw new Error("Invalid transaction hash.");
  }

  if (!Number.isInteger(confirmations) || confirmations < 1) {
    throw new Error("Confirmations must be at least 1.");
  }

  try {
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      confirmations,
      timeout: timeoutMs,
      pollingInterval: pollingIntervalMs,
    });

    if (receipt.status === "success") {
      return {
        hash,
        status: "success",
        receipt,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
      };
    }

    return {
      hash,
      status: "reverted",
      receipt,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "";

    if (
      message.toLowerCase().includes("timed out") ||
      message.toLowerCase().includes("timeout")
    ) {
      return {
        hash,
        status: "timeout",
      };
    }

    throw error;
  }
}
