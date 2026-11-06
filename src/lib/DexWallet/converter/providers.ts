import {
  isAddress,
  keccak256,
  toBytes,
  type Address,
  type Hex,
} from "viem";

import type {
  ConverterProvider,
} from "@/types/converter";

import {
  ZERO_ADDRESS,
} from "./contracts";

/**
 * =========================================================
 * 1. LIQUIDMESH PROVIDER CONFIGURATION
 * =========================================================
 *
 * Provider ID is deterministic.
 * It must be registered in RouterRegistry.
 *
 * Adapter address must be replaced after deployment.
 */

// Deterministic provider ID: keccak256("LIQUIDMESH")
export const LIQUIDMESH_PROVIDER_ID: Hex =
  keccak256(toBytes("LIQUIDMESH"));

// Replace ZERO_ADDRESS with the deployed adapter proxy.
export const LIQUIDMESH_ADAPTER_ADDRESS: Address =
  ZERO_ADDRESS;

/**
 * =========================================================
 * 2. VALIDATION
 * =========================================================
 */

export function validateProviderId(
  value: string
): value is Hex {
  return (
    /^0x[0-9a-fA-F]{64}$/.test(value) &&
    value.toLowerCase() !==
      `0x${"0".repeat(64)}`
  );
}

export function validateAdapterAddress(
  value: string
): value is Address {
  return (
    isAddress(value) &&
    value.toLowerCase() !== ZERO_ADDRESS.toLowerCase()
  );
}

/**
 * =========================================================
 * 3. PROVIDERS
 * =========================================================
 */

export const CONVERTER_PROVIDERS: ConverterProvider[] = [
  {
    id: LIQUIDMESH_PROVIDER_ID,
    name: "LiquidMesh",
    adapter: LIQUIDMESH_ADAPTER_ADDRESS,
    enabled: validateProviderId(LIQUIDMESH_PROVIDER_ID) &&
      validateAdapterAddress(LIQUIDMESH_ADAPTER_ADDRESS),
    description:
      "LiquidMesh routing provider on BNB Smart Chain",
  },
];

/**
 * =========================================================
 * 4. PROVIDER HELPERS
 * =========================================================
 */

export const getConfiguredProviders = ():
  ConverterProvider[] => {
  return CONVERTER_PROVIDERS.filter(
    (provider) =>
      provider.enabled &&
      provider.adapter !== undefined
  );
};

export const getConverterProvider = (
  providerId: Hex
): ConverterProvider | undefined => {
  return getConfiguredProviders().find(
    (provider) =>
      provider.id.toLowerCase() ===
      providerId.toLowerCase()
  );
};

export const getDefaultConverterProvider = ():
  ConverterProvider | undefined => {
  return getConfiguredProviders()[0];
};

export const isLiquidMeshConfigured = (): boolean => {
  return (
    validateProviderId(LIQUIDMESH_PROVIDER_ID) &&
    validateAdapterAddress(LIQUIDMESH_ADAPTER_ADDRESS)
  );
};