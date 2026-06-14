import {
  http,
  fallback,
  createConfig,
} from "wagmi";

import { bsc } from "@/lib/chains";

import {
  walletConnect,
  injected,
} from "wagmi/connectors";

export const wagmiConfig = createConfig({

  chains: [bsc],

  connectors: [

    injected(),

    walletConnect({
      projectId:
        process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    }),

  ],

  transports: {

  [bsc.id]: fallback([

    http("https://bsc-dataseed.binance.org"),

    http("https://bsc-dataseed1.defibit.io"),

    http("https://bsc-dataseed1.ninicoin.io"),

    http("https://rpc.ankr.com/bsc"),

    http("https://bsc-rpc.publicnode.com"),

    http("https://1rpc.io/bnb"),

  ]),

},

});