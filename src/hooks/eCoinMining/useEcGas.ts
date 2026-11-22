"use client";

import { useEffect, useState } from "react";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, maxUint256 } from "viem";
import { bsc } from "wagmi/chains";
import { useQueryClient } from "@tanstack/react-query";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinEcGasSaleAbi } from "@/lib/abis/eCoinMining/eCoinEcGasSaleAbi";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";
import { publicClient } from "@/lib/publicClient";

const ECOIN = CONTRACTS.ECOIN as `0x${string}`;
const ECGAS_SALE = CONTRACTS.ecGas_Sale_eCoin as `0x${string}`;
const STAKING = CONTRACTS.eCoin_Mining_Staking_eCoin as `0x${string}`;

export function useEcGas(address?: `0x${string}`) {
  const { writeContractAsync } = useWriteContract();
  const queryClient = useQueryClient();

  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Saldo real de eCoin na carteira do usuário
  const { data: ecoinBalanceRaw, refetch: refetchECoinBalance } =
    useReadContract({
      abi: erc20Abi,
      address: ECOIN,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
      chainId: 56,
      query: {
        enabled: Boolean(address),
        refetchInterval: 10000,
      },
    });

  // Leitura da capacidade de gás no contrato ECoinMiningStakingECoin.preview(address)
  const { data: preview, refetch: refetchPreview } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: STAKING,
    functionName: "preview",
    args: address ? [address] : undefined,
    chainId: 56,
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    refetchECoinBalance();
    refetchPreview();
    queryClient.invalidateQueries();
  }, [isSuccess, refetchECoinBalance, refetchPreview, queryClient]);

  async function buyGasECoin(amount: bigint) {
    if (!address || !publicClient || amount <= 0n) return;

    const allowance = (await publicClient.readContract({
      address: ECOIN,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address, ECGAS_SALE],
    })) as bigint;

    // 1. Aprova EcGasSaleECoin a transferir eCoin para o Collector
    if (allowance < amount) {
      const approveHash = await writeContractAsync({
        address: ECOIN,
        abi: erc20Abi,
        functionName: "approve",
        args: [ECGAS_SALE, maxUint256],
        account: address,
        chain: bsc,
      });

      await publicClient.waitForTransactionReceipt({ hash: approveHash });
    }

    // 2. Executa buyECoin(uint256) no EcGasSaleECoin
    const hash = await writeContractAsync({
      address: ECGAS_SALE,
      abi: eCoinEcGasSaleAbi,
      functionName: "buyECoin",
      args: [amount],
      account: address,
      chain: bsc,
    });

    setTxHash(hash);
    return hash;
  }

  const ecoinBalance = (ecoinBalanceRaw as bigint | undefined) ?? 0n;

  const previewTuple = preview as
    | readonly [bigint, bigint, bigint, bigint, boolean]
    | undefined;

  const gasStats = {
    pendingECoin: previewTuple?.[0] ?? 0n,
    remainingCapacity: previewTuple?.[1] ?? 0n,
    usedCapacity: previewTuple?.[2] ?? 0n,
    maxCapacity: previewTuple?.[3] ?? 0n,
    willAccumulate: previewTuple?.[4] ?? false,
  };

  return {
    ecoinBalance,
    gasBalance: gasStats.remainingCapacity,
    preview,
    gasStats,

    buyGasECoin,

    gasPending: confirming,
    gasConfirmed: isSuccess,
  };
}