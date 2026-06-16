"use client";

import { useWalletClient, usePublicClient } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { referralCodeRegistryAbi } from "@/lib/abis/referralCodeRegistryAbi";

export function useReferralCodeRegistry() {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  // Registrar um novo código
  async function registerCode(code: string) {
    if (!walletClient) throw new Error("Wallet not connected");

    const hash = await walletClient.writeContract({
      address: CONTRACTS.REFERRAL_CODE_REGISTRY,
      abi: referralCodeRegistryAbi,
      functionName: "registerCode",
      args: [code],
    });

    return publicClient.waitForTransactionReceipt({ hash });
  }

  // Resolver código para endereço (para o sistema de referência)
  async function resolveCode(code: string) {
    return publicClient.readContract({
      address: CONTRACTS.REFERRAL_CODE_REGISTRY,
      abi: referralCodeRegistryAbi,
      functionName: "resolveCode",
      args: [code],
    });
  }

  // Obter lista completa de códigos do usuário (substitui a antiga myCode)
  async function getMyCodes(address: `0x${string}`) {
    return publicClient.readContract({
      address: CONTRACTS.REFERRAL_CODE_REGISTRY,
      abi: referralCodeRegistryAbi,
      functionName: "getMyCodes",
      args: [address],
    });
  }

  return {
    registerCode,
    resolveCode,
    getMyCodes,
  };
}