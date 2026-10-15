import type { Address } from "viem";

/**
 * EdenActivityRegistry proxy on BNB Smart Chain Mainnet (chainId 56).
 *
 * IMPORTANT:
 * Confirm this proxy address against the deployment transaction before using it.
 * An earlier deployment address was also mentioned in the project history.
 */
export const EDEN_ACTIVITY_REGISTRY_ADDRESS =
  "0xE73EB50f5C63bdDf0cfB90Ea5b23733C35816CdA" as Address;

export const EDEN_ACTIVITY_REGISTRY_CHAIN_ID = 56;

/**
 * REQUIRED: replace 0n with the block number in which THIS proxy was deployed.
 *
 * Do not leave this at 0n in production: scanning from genesis can be very slow
 * and can exceed RPC-provider limits. The hooks intentionally refuse to scan
 * until the deployment block is configured.
 */
export const EDEN_ACTIVITY_REGISTRY_START_BLOCK = 0n;

export const EDEN_ACTIVITY_REGISTRY_EXPLORER =
  "https://bscscan.com";
