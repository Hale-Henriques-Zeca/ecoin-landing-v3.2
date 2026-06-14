"use client";

import { useWalletClient, usePublicClient } from "wagmi";

import { CONTRACTS } from "@/lib/contracts/contracts";

import { referralCodeRegistryAbi }
from "@/lib/abis/referralCodeRegistryAbi";

export function useReferralCodeRegistry() {

  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  async function registerCode(code: string) {

    if (!walletClient)
      throw new Error("Wallet not connected");

    const hash =
      await walletClient.writeContract({

        address:
          CONTRACTS.REFERRAL_CODE_REGISTRY,

        abi:
          referralCodeRegistryAbi,

        functionName:
          "registerCode",

        args: [code]
      });

    return publicClient.waitForTransactionReceipt({
      hash
    });
  }

  async function resolveCode(
  code: string
) {

  return publicClient.readContract({

    address:
      CONTRACTS.REFERRAL_CODE_REGISTRY,

    abi:
      referralCodeRegistryAbi,

    functionName:
      "resolveCode",

    args: [code]
  });
}

  async function myCode() {

  return publicClient.readContract({

    address:
      CONTRACTS.REFERRAL_CODE_REGISTRY,

    abi:
      referralCodeRegistryAbi,
  });
}

  return {
  registerCode,
  resolveCode,
  myCode
};
}