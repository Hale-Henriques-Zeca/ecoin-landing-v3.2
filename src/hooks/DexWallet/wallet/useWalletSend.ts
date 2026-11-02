
"use client";

import {
  useAccount,
  useChainId,
  usePublicClient,
  useWriteContract
} from "wagmi";

import {
  parseUnits,
  isAddress,
  type Address
} from "viem";

import {
  BSC_CHAIN_ID,
  SEND_ROUTER_ADDRESS,
  SEND_ROUTER_ABI,
  ERC20_ABI
} from "@/lib/wallet/walletContracts";

export function useWalletSend() {

  const { address } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  const send = async ({
    token,
    recipient,
    amount,
    decimals,
    isNative
  }: {
    token: Address;
    recipient: string;
    amount: string;
    decimals: number;
    isNative: boolean;
  }) => {

    if (!address) {
      throw new Error("Conecte sua carteira.");
    }

    if (chainId !== BSC_CHAIN_ID) {
      throw new Error("Selecione BNB Smart Chain Mainnet.");
    }

    if (!publicClient) {
      throw new Error("Cliente blockchain indisponível.");
    }

    if (!isAddress(recipient)) {
      throw new Error("Endereço do destinatário inválido.");
    }

    if (
      !SEND_ROUTER_ADDRESS ||
      !isAddress(SEND_ROUTER_ADDRESS)
    ) {
      throw new Error("SendRouter não configurado.");
    }

    const value = parseUnits(amount, decimals);

    if (value <= 0n) {
      throw new Error("Montante inválido.");
    }

    if (isNative) {

      const hash = await writeContractAsync({
        address: SEND_ROUTER_ADDRESS,
        abi: SEND_ROUTER_ABI,
        functionName: "sendBNB",
        args: [recipient as Address],
        value
      });

      const receipt = await publicClient.waitForTransactionReceipt({
        hash
      });

      if (receipt.status !== "success") {
        throw new Error("Transferência BNB revertida.");
      }

      return {
        hash,
        receipt
      };
    }

    // 1. Consultar allowance.
    const allowance = await publicClient.readContract({
      address: token,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [address, SEND_ROUTER_ADDRESS]
    });

    // 2. Aprovar o router se necessário.
    if (allowance < value) {

      const approvalHash = await writeContractAsync({
        address: token,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [SEND_ROUTER_ADDRESS, value]
      });

      const approvalReceipt =
        await publicClient.waitForTransactionReceipt({
          hash: approvalHash
        });

      if (approvalReceipt.status !== "success") {
        throw new Error("Aprovação do token falhou.");
      }
    }

    // 3. Executar transferência.
    const hash = await writeContractAsync({
      address: SEND_ROUTER_ADDRESS,
      abi: SEND_ROUTER_ABI,
      functionName: "sendToken",
      args: [
        token,
        recipient as Address,
        value
      ]
    });

    // 4. Esperar confirmação on-chain.
    const receipt = await publicClient.waitForTransactionReceipt({
      hash
    });

    if (receipt.status !== "success") {
      throw new Error("Transferência revertida.");
    }

    return {
      hash,
      receipt
    };
  };

  return { send };
}
