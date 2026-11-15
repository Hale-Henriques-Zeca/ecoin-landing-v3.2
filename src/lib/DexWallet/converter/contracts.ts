
import type { Address } from "viem";

/**
 * =========================================================
 * 1. NETWORK
 * =========================================================
 */

export const CONVERTER_CHAIN_ID = 56 as const;

export const ZERO_ADDRESS =
  "0x0000000000000000000000000000000000000000" as Address;

export const NATIVE_BNB =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

/**
 * =========================================================
 * 2. CONVERTER CONTRACTS
 * =========================================================
 */

export const CONVERTER_CONTRACTS = {
  chainId: CONVERTER_CHAIN_ID,

  internalConverter:
    "0x511D6A78C6B078Ea6361fA1C6549fb9FBb819930" as Address,

  routerRegistry:
    "0x24F85834159dAE3c7dFC07aF72EEe9188BA1C4b2" as Address,

  feeCollector:
    "0x7824eB801a6940BB15Aacdc2c8899573a78CAdd5" as Address,

  nativeBnb: NATIVE_BNB,

  tokens: {
    eCoin:
      "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964" as Address,

    USDT:
      "0x55d398326f99059fF775485246999027B3197955" as Address,

    eDollar:
      "0xF7543E5B4735C58a176269202847360aaDfA83C1" as Address,
  },
} as const;

/**
 * =========================================================
 * 3. TOKEN CONFIGURATION
 * =========================================================
 *
 * BNB is native and uses the sentinel address.
 * The other assets are ERC20 tokens.
 */

export const CONVERTER_TOKENS = {
  eCoin: {
    address: CONVERTER_CONTRACTS.tokens.eCoin,
    decimals: 18,
  },

  USDT: {
    address: CONVERTER_CONTRACTS.tokens.USDT,
    decimals: 18,
  },

  eDollar: {
    address: CONVERTER_CONTRACTS.tokens.eDollar,
    decimals: 18,
  },

  BNB: {
    address: NATIVE_BNB,
    decimals: 18,
  },
} as const;

/**
 * =========================================================
 * 4. CONVERTER FEE
 * =========================================================
 *
 * 300 BP = 3%
 *
 * The Fee Collector contract remains authoritative.
 */

export const CONVERTER_FEE = {
  serviceFeeBP: 300n,
  denominator: 10_000n,
  percentage: 3,
} as const;

/**
 * =========================================================
 * 5. CONVERTER SETTINGS
 * =========================================================
 */

export const CONVERTER_SETTINGS = {
  defaultSlippage: 0.5,

  minimumSlippage: 0.1,

  maximumSlippage: 5,

  transactionDeadlineMinutes: 20,

  quoteRefreshInterval: 10_000,
} as const;

/**
 * =========================================================
 * 6. CONFIGURATION HELPERS
 * =========================================================
 */

export const isConverterContractConfigured = (): boolean => {
  return (
    CONVERTER_CONTRACTS.internalConverter !== ZERO_ADDRESS &&
    CONVERTER_CONTRACTS.routerRegistry !== ZERO_ADDRESS &&
    CONVERTER_CONTRACTS.feeCollector !== ZERO_ADDRESS
  );
};
