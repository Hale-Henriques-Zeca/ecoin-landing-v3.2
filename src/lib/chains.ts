import type { Chain } from "viem";

export const bsc: Chain = {
  id: 56,

  name: "BNB Smart Chain",

  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },

  rpcUrls: {
    default: {
      http: [
        "https://bsc-dataseed.bnbchain.org",
      ],
    },
  },

  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
    },
  },

  contracts: {
    multicall3: {
      address:
        "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452,
    },
  },

  testnet: false,
};