
import { isAddress, type Address } from "viem";

import {
  CONVERTER_TOKENS,
  NATIVE_BNB,
  ZERO_ADDRESS,
} from "./contracts";

import type {
  ConverterAsset,
  ConverterAssetSymbol,
} from "@/types/converter";

/**
 * =========================================================
 * 1. ASSET DEFINITIONS
 * =========================================================
 *
 * BNB is native and uses the NATIVE_BNB sentinel.
 * ECOIN, USDT and EUSD are ERC20 assets.
 */

export const CONVERTER_ASSETS: Record<
  ConverterAssetSymbol,
  ConverterAsset
> = {
  ECOIN: {
    symbol: "ECOIN",
    name: "EdenKingDom Coin",
    address: CONVERTER_TOKENS.ECOIN.address,
    decimals: CONVERTER_TOKENS.ECOIN.decimals,
    isNative: false,
  },

  USDT: {
    symbol: "USDT",
    name: "Tether USD",
    address: CONVERTER_TOKENS.USDT.address,
    decimals: CONVERTER_TOKENS.USDT.decimals,
    isNative: false,
  },

  EUSD: {
    symbol: "EUSD",
    name: "EdenKingDom eDollar",
    address: CONVERTER_TOKENS.EUSD.address,
    decimals: CONVERTER_TOKENS.EUSD.decimals,
    isNative: false,
  },

  BNB: {
    symbol: "BNB",
    name: "BNB",
    address: NATIVE_BNB,
    decimals: CONVERTER_TOKENS.BNB.decimals,
    isNative: true,
  },
};

/**
 * =========================================================
 * 2. ASSET LIST
 * =========================================================
 */

export const CONVERTER_ASSET_LIST: ConverterAsset[] =
  Object.values(CONVERTER_ASSETS);

/**
 * =========================================================
 * 3. GET ASSET BY SYMBOL
 * =========================================================
 */

export const getConverterAsset = (
  symbol: ConverterAssetSymbol
): ConverterAsset => {
  return CONVERTER_ASSETS[symbol];
};

/**
 * =========================================================
 * 4. GET ASSET BY ADDRESS
 * =========================================================
 */

export const getConverterAssetByAddress = (
  address: Address
): ConverterAsset | undefined => {
  const normalizedAddress = address.toLowerCase();

  return CONVERTER_ASSET_LIST.find(
    (asset) =>
      asset.address.toLowerCase() === normalizedAddress
  );
};

/**
 * =========================================================
 * 5. ASSET CONFIGURATION VALIDATION
 * =========================================================
 */

export const isConverterAssetConfigured = (
  symbol: ConverterAssetSymbol
): boolean => {
  const asset = getConverterAsset(symbol);

  if (!asset.address || asset.address === ZERO_ADDRESS) {
    return false;
  }

  if (!isAddress(asset.address)) {
    return false;
  }

  if (!Number.isInteger(asset.decimals) || asset.decimals < 0 || asset.decimals > 255) {
    return false;
  }

  if (asset.isNative) {
    return (
      symbol === "BNB" &&
      asset.address.toLowerCase() === NATIVE_BNB.toLowerCase()
    );
  }

  return asset.address.toLowerCase() !== NATIVE_BNB.toLowerCase();
};

/**
 * =========================================================
 * 6. CONFIGURED ASSETS
 * =========================================================
 */

export const getConfiguredConverterAssets = (): ConverterAsset[] => {
  return CONVERTER_ASSET_LIST.filter((asset) =>
    isConverterAssetConfigured(asset.symbol)
  );
};

/**
 * =========================================================
 * 7. ERC20 ASSETS ONLY
 * =========================================================
 */

export const getERC20ConverterAssets = (): ConverterAsset[] => {
  return getConfiguredConverterAssets().filter(
    (asset) => !asset.isNative
  );
};

/**
 * =========================================================
 * 8. CONFIGURED ASSET SYMBOLS
 * =========================================================
 */

export const getConverterAssetSymbols = (): ConverterAssetSymbol[] => {
  return getConfiguredConverterAssets().map(
    (asset) => asset.symbol
  );
};
