import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { bscTestnet } from "./chainsTestnet";

export const wagmiTestnetConfig = createConfig({
  chains: [bscTestnet],

  connectors: [
    injected(),
    walletConnect({
      projectId: "b8e382f5ba79a645dbe5bc9c1b8e7d32",
    }),
  ],

  transports: {
    [bscTestnet.id]: http("https://data-seed-prebsc-1-s1.binance.org:8545/"),
  },
});