import { createPublicClient, fallback, http } from "viem";
import { bsc } from "viem/chains";

export const publicClient = createPublicClient({
  chain: bsc,

  transport: fallback([
    http("https://bsc-dataseed.bnbchain.org"),
  ]),
});