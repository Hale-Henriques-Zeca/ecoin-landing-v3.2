
import type { Address } from "viem";
import { BSC_NATIVE_TOKEN } from "./chains";

export const BSC_TOKENS = {
  BNB: {
    symbol: "BNB",
    name: "BNB",
    address: BSC_NATIVE_TOKEN,
    decimals: 18,
    isNative: true,
  },

  ECOIN: {
    symbol: "ECOIN",
    name: "E-Coin",
    address:
      "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964" as Address,
    decimals: 18,
    isNative: false,
  },

  USDT: {
    symbol: "USDT",
    name: "Tether USD",
    address:
      "0x55d398326f99059fF775485246999027B3197955" as Address,
    decimals: 18,
    isNative: false,
  },

  EUSD: {
    symbol: "EUSD",
    name: "eDollar",
    address:
      "0xF7543E5B4735C58a176269202847360aaDfA83C1" as Address,
    decimals: 18,
    isNative: false,
  },
} as const;

export type SupportedBscToken =
  (typeof BSC_TOKENS)[keyof typeof BSC_TOKENS];

export function getBscToken(address: string) {
  return Object.values(BSC_TOKENS).find(
    (token) =>
      token.address.toLowerCase() === address.toLowerCase(),
  );
}

export function isSupportedBscToken(address: string): boolean {
  return Boolean(getBscToken(address));
}
