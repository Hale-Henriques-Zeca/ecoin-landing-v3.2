"use client";

import {
  useReadContract,
} from "wagmi";

import { CONTRACTS } from "@/lib/contracts/contracts";

import { miningFeeCollectorAbi }
from "@/lib/abis/miningFeeCollectorAbi";

export function useMiningFeeCollector() {

  const { data: treasury } =
    useReadContract({
      abi: miningFeeCollectorAbi,
      address: CONTRACTS.MINING_FEE_COLLECTOR,
      functionName: "treasury",
      chainId: 97,
    });

  return {
    treasury,
  };
}