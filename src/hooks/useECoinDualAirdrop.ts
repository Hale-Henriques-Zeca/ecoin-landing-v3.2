"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { bsc } from "wagmi/chains";
import { eCoinDualAirdropAbi } from "@/lib/abis/eCoinDualAirdropAbi";

// Endereço oficial e direto do contrato ECoinDualAirdrop na BSC
export const ECOIN_DUAL_AIRDROP_ADDRESS = "0x91C8973d791717948DC003B81fcf6b46FCc66F4D" as `0x${string}`;

export function useECoinDualAirdrop() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync, isPending: walletPending } = useWriteContract();

  const [txHash, setTxHash] = useState<`0x${string}`>();
  const [busyToken, setBusyToken] = useState<string>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isCorrectChain = chainId === bsc.id;

  const { data: seasonData, refetch: refetchSeason } = useReadContract({
    address: ECOIN_DUAL_AIRDROP_ADDRESS,
    abi: eCoinDualAirdropAbi,
    functionName: "currentSeason",
    chainId: bsc.id,
    query: {
      enabled: isConnected && isCorrectChain,
      refetchInterval: 10_000,
    },
  });

  const seasonId = seasonData;

  const { data: seasonInfo, refetch: refetchSeasonInfo } = useReadContract({
    address: ECOIN_DUAL_AIRDROP_ADDRESS,
    abi: eCoinDualAirdropAbi,
    functionName: "seasons",
    args: seasonId !== undefined ? [seasonId] : undefined,
    chainId: bsc.id,
    query: {
      enabled: isConnected && isCorrectChain && seasonId !== undefined,
      refetchInterval: 10_000,
    },
  });

  const { isLoading: waitingForReceipt, isSuccess: transactionConfirmed } =
    useWaitForTransactionReceipt({
      chainId: bsc.id,
      hash: txHash,
      query: { enabled: !!txHash },
    });

  useEffect(() => {
    if (!transactionConfirmed) return;

    setSuccessMessage("Transação confirmada na blockchain.");
    setErrorMessage("");
    setBusyToken(undefined);
    setTxHash(undefined);

    void Promise.all([refetchSeason(), refetchSeasonInfo()]);
  }, [transactionConfirmed, refetchSeason, refetchSeasonInfo]);

  async function executeAction(tokenAddress: `0x${string}`, symbol: string, action: "startMining" | "claim") {
    if (!address || !isConnected) {
      setErrorMessage("Conecta primeiro a tua carteira.");
      return;
    }

    if (!isCorrectChain) {
      setErrorMessage("Muda a carteira para BNB Smart Chain Mainnet.");
      return;
    }

    if (seasonId === undefined) {
      setErrorMessage("Não foi possível carregar a temporada atual.");
      return;
    }

    setBusyToken(symbol);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const args = action === "startMining" ? [tokenAddress] : [tokenAddress, seasonId];

      const hash = await writeContractAsync({
        address: ECOIN_DUAL_AIRDROP_ADDRESS,
        abi: eCoinDualAirdropAbi,
        functionName: action,
        args: args as any,
        chain: bsc,
        account: address,
      });

      setTxHash(hash);
      setSuccessMessage(
        action === "startMining"
          ? "Start Mining enviado. A aguardar confirmação..."
          : "Claim enviado. A aguardar confirmação..."
      );
    } catch (error) {
      console.error(`ECoinDualAirdrop ${action}:`, error);
      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível enviar a transação."
      );
      setBusyToken(undefined);
    }
  }

  return {
    address,
    isConnected,
    isCorrectChain,
    seasonId,
    seasonInfo,
    walletPending,
    waitingForReceipt,
    busyToken,
    errorMessage,
    successMessage,
    airdropAddress: ECOIN_DUAL_AIRDROP_ADDRESS,
    executeAction,
  };
}