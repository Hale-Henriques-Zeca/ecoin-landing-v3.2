
import { defineChain } from "viem";

export const bscChain = defineChain({
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
        "https://bsc-dataseed.binance.org",
        "https://bsc-rpc.publicnode.com",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
    },
  },
  testnet: false,
});
