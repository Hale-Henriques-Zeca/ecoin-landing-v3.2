
import type { Address } from "viem";

export const BSC_CHAIN_ID = 56;
export const BSC_CHAIN_SLUG = "bsc";

export const BSC_NATIVE_TOKEN =
  "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" as Address;

export const BSC_CHAIN = {
  id: BSC_CHAIN_ID,
  slug: BSC_CHAIN_SLUG,
  name: "BNB Smart Chain",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  explorerUrl: "https://bscscan.com",
  rpcUrl: "https://bsc-dataseed.binance.org/",
} as const;
