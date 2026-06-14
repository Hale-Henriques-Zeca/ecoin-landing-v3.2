import {
  createPublicClient,
  fallback,
  http,
} from "viem";

import { bsc } from "viem/chains";

export const publicClient =
  createPublicClient({

    chain: bsc,

    transport: fallback([

      http("https://bsc-dataseed.binance.org"),

      http("https://bsc-dataseed1.defibit.io"),

      http("https://bsc-dataseed1.ninicoin.io"),

      http("https://rpc.ankr.com/bsc"),

      http("https://bsc-rpc.publicnode.com"),

      http("https://1rpc.io/bnb"),

    ]),
  });