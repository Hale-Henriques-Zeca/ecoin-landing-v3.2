import type { Chain } from "viem";

export const bscTestnet: Chain = {
  id: 97,
  name: "BSC Testnet",
  network: "bsc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tBNB",
    symbol: "tBNB",
  },
  rpcUrls: {
    default: {
      http: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://testnet.bscscan.com",
    },
  },
};