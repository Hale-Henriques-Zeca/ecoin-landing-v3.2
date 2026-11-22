"use client";

import {
  useReadContract,
} from "wagmi";

import { CONTRACTS } from "@/lib/contracts/contracts";

import { miningFeeCollectorAbi }
from "@/lib/abis/eDollarMining/miningFeeCollectorAbi";

export function useMiningFeeCollectoreDollar() {

  const { data: treasury } =
    useReadContract({
      abi: miningFeeCollectorAbi,
      address: CONTRACTS.MINING_FEE_COLLECTOR,
      functionName: "treasury",
      chainId: 56,
    });

  return {
    treasury,
  };
}