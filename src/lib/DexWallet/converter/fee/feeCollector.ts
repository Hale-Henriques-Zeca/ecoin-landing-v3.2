
import {
  encodeAbiParameters,
  getAddress,
  keccak256,
  parseAbi,
  type Address,
  type Hash,
  type PublicClient,
  type WalletClient,
} from "viem";

import { calculateConverterFee } from "./feeCalculator";
import { validateOperationId } from "./feeValidation";

// ============================================================
// CONTRACT ABIs
// ============================================================

export const FEE_COLLECTOR_ABI = parseAbi([
  "function previewFee(uint256 grossAmount) view returns (uint256)",
  "function collectConverterFee(bytes32 operationId, address token, uint256 grossAmount)",
  "function collectBNBConverterFee(bytes32 operationId, uint256 grossAmount) payable",
  "function refundExpiredFee(bytes32 operationId)",
]);

export const ERC20_APPROVAL_ABI = parseAbi([
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
]);

// ============================================================
// TYPES
// ============================================================

export interface FeeCollectorConfig {
  publicClient: PublicClient;
  walletClient: WalletClient;
  collectorAddress: Address;
  account: Address;
}

export interface FeeCollectionResult {
  operationId: Hash;
  feeAmount: bigint;
  grossAmount: bigint;
  netAmount: bigint;
  approvalHash?: Hash;
  resetApprovalHash?: Hash;
  collectionHash: Hash;
}

export interface BNBFeeCollectionResult {
  operationId: Hash;
  feeAmount: bigint;
  grossAmount: bigint;
  netAmount: bigint;
  collectionHash: Hash;
}

// ============================================================
// OPERATION ID
// ============================================================

/**
 * Generates a deterministic unique operation ID.
 *
 * The caller must supply a unique nonce for each operation.
 * Never reuse the same operation ID for another conversion.
 */
export function createFeeOperationId(params: {
  account: Address;
  chainId: number;
  grossAmount: bigint;
  nonce: bigint;
}): Hash {
  if (params.grossAmount <= 0n) {
    throw new Error("Invalid gross amount.");
  }

  if (params.nonce < 0n) {
    throw new Error("Invalid operation nonce.");
  }

  return keccak256(
    encodeAbiParameters(
      [
        { type: "address" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
      ],
      [
        getAddress(params.account),
        BigInt(params.chainId),
        params.grossAmount,
        params.nonce,
      ],
    ),
  );
}

// ============================================================
// INTERNAL HELPERS
// ============================================================

async function waitForSuccessfulReceipt(
  publicClient: PublicClient,
  hash: Hash,
): Promise<void> {
  const receipt = await publicClient.waitForTransactionReceipt({
    hash,
  });

  if (receipt.status !== "success") {
    throw new Error(
      `Transaction failed: ${hash}`,
    );
  }
}

async function getOnchainFee(
  config: FeeCollectorConfig,
  grossAmount: bigint,
): Promise<bigint> {
  return config.publicClient.readContract({
    address: config.collectorAddress,
    abi: FEE_COLLECTOR_ABI,
    functionName: "previewFee",
    args: [grossAmount],
  });
}

async function approveExactFee(
  config: FeeCollectorConfig,
  tokenAddress: Address,
  feeAmount: bigint,
): Promise<{
  approvalHash?: Hash;
  resetApprovalHash?: Hash;
}> {
  const allowance = await config.publicClient.readContract({
    address: tokenAddress,
    abi: ERC20_APPROVAL_ABI,
    functionName: "allowance",
    args: [
      config.account,
      config.collectorAddress,
    ],
  });

  if (allowance >= feeAmount) {
    return {};
  }

  let resetApprovalHash: Hash | undefined;

  // Some ERC20 tokens require allowance to be reset to zero
  // before changing it to another non-zero value.
  if (allowance > 0n) {
    resetApprovalHash = await config.walletClient.writeContract({
      address: tokenAddress,
      abi: ERC20_APPROVAL_ABI,
      functionName: "approve",
      args: [
        config.collectorAddress,
        0n,
      ],
      account: config.account,
    });

    await waitForSuccessfulReceipt(
      config.publicClient,
      resetApprovalHash,
    );
  }

  const approvalHash = await config.walletClient.writeContract({
    address: tokenAddress,
    abi: ERC20_APPROVAL_ABI,
    functionName: "approve",
    args: [
      config.collectorAddress,
      feeAmount,
    ],
    account: config.account,
  });

  await waitForSuccessfulReceipt(
    config.publicClient,
    approvalHash,
  );

  return {
    approvalHash,
    resetApprovalHash,
  };
}

// ============================================================
// ERC20 FEE COLLECTION
// ============================================================

/**
 * 1. Calculates the local 3% fee.
 * 2. Checks the contract's previewFee.
 * 3. Approves only the required fee.
 * 4. Calls collectConverterFee directly from the user wallet.
 * 5. Waits until the escrow transaction is confirmed.
 *
 * The swap must not start until this function succeeds.
 */
export async function collectERC20ConverterFee(params: {
  config: FeeCollectorConfig;
  tokenAddress: Address;
  grossAmount: bigint;
  operationId: Hash;
}): Promise<FeeCollectionResult> {
  const {
    config,
    tokenAddress,
    grossAmount,
  } = params;

  const operationId = validateOperationId(
    params.operationId,
  );

  if (grossAmount <= 0n) {
    throw new Error("Invalid gross amount.");
  }

  const localFee = calculateConverterFee(grossAmount);

  const onchainFee = await getOnchainFee(
    config,
    grossAmount,
  );

  if (onchainFee !== localFee.feeAmount) {
    throw new Error(
      "Local fee does not match FeeCollector fee.",
    );
  }

  const approvals = await approveExactFee(
    config,
    tokenAddress,
    onchainFee,
  );

  const collectionHash =
    await config.walletClient.writeContract({
      address: config.collectorAddress,
      abi: FEE_COLLECTOR_ABI,
      functionName: "collectConverterFee",
      args: [
        operationId,
        tokenAddress,
        grossAmount,
      ],
      account: config.account,
    });

  await waitForSuccessfulReceipt(
    config.publicClient,
    collectionHash,
  );

  return {
    operationId,
    feeAmount: onchainFee,
    grossAmount,
    netAmount: grossAmount - onchainFee,
    approvalHash: approvals.approvalHash,
    resetApprovalHash: approvals.resetApprovalHash,
    collectionHash,
  };
}

// ============================================================
// BNB FEE COLLECTION
// ============================================================

/**
 * BNB is sent directly to the FeeCollector escrow.
 *
 * No ERC20 approval is required.
 */
export async function collectBNBConverterFee(params: {
  config: FeeCollectorConfig;
  grossAmount: bigint;
  operationId: Hash;
}): Promise<BNBFeeCollectionResult> {
  const {
    config,
    grossAmount,
  } = params;

  const operationId = validateOperationId(
    params.operationId,
  );

  if (grossAmount <= 0n) {
    throw new Error("Invalid gross amount.");
  }

  const localFee = calculateConverterFee(grossAmount);

  const onchainFee = await getOnchainFee(
    config,
    grossAmount,
  );

  if (onchainFee !== localFee.feeAmount) {
    throw new Error(
      "Local BNB fee does not match FeeCollector fee.",
    );
  }

  const collectionHash =
    await config.walletClient.writeContract({
      address: config.collectorAddress,
      abi: FEE_COLLECTOR_ABI,
      functionName: "collectBNBConverterFee",
      args: [
        operationId,
        grossAmount,
      ],
      value: onchainFee,
      account: config.account,
    });

  await waitForSuccessfulReceipt(
    config.publicClient,
    collectionHash,
  );

  return {
    operationId,
    feeAmount: onchainFee,
    grossAmount,
    netAmount: grossAmount - onchainFee,
    collectionHash,
  };
}

// ============================================================
// REFUND EXPIRED FEE
// ============================================================

/**
 * The payer can call this after the escrow timeout,
 * provided the operation is still pending.
 */
export async function refundExpiredConverterFee(params: {
  config: FeeCollectorConfig;
  operationId: Hash;
}): Promise<Hash> {
  const operationId = validateOperationId(
    params.operationId,
  );

  const hash = await params.config.walletClient.writeContract({
    address: params.config.collectorAddress,
    abi: FEE_COLLECTOR_ABI,
    functionName: "refundExpiredFee",
    args: [operationId],
    account: params.config.account,
  });

  await waitForSuccessfulReceipt(
    params.config.publicClient,
    hash,
  );

  return hash;
}
