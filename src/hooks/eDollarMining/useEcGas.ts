
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState } from "react";
import { erc20Abi, maxUint256, } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eDollarEcGasSaleAbi } from "@/lib/abis/eDollarMining/eDollarEcGasSaleAbi";
import { eDollarMiningStakingAbi } from "@/lib/abis/eDollarMining/eDollarMiningStakingAbi";
import { publicClient } from "@/lib/publicClient";


export function useEcGas(address?: `0x${string}`) {
  const { writeContractAsync } = useWriteContract();


const [txHash, setTxHash] =
  useState<`0x${string}` | undefined>();

const {
  isLoading: confirming,
  isSuccess,
} =
useWaitForTransactionReceipt({
  hash: txHash,
});

  const { data: gasBalance } = useReadContract({
    abi: erc20Abi,
    address: CONTRACTS.ECGAS_SALE,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const { data: preview } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "preview",
    args: address ? [address] : undefined,
  });

  async function buyGasUSDT(
  amount: bigint
) {

  if (!address)
    return;

  if (!publicClient)
    return;

  const allowance =
    await publicClient.readContract({
      address: CONTRACTS.USDT,
      abi: erc20Abi,
      functionName: "allowance",
      args: [
        address,
        CONTRACTS.ECGAS_SALE,
      ],
    }) as bigint;

  if (allowance < amount) {

    await writeContractAsync({
      address: CONTRACTS.USDT,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.ECGAS_SALE,
        maxUint256,
      ],
    });

  }

  const hash =
  await writeContractAsync({
    address: CONTRACTS.ECGAS_SALE,
    abi: eDollarEcGasSaleAbi,
    functionName: "buyUSDT",
    args: [amount],
    gas: 3000000n,
  });

setTxHash(hash);

return hash;
}

async function buyGasEUSD(
  amount: bigint
) {

  if (!address)
    return;

  if (!publicClient)
    return;

  const allowance =
    await publicClient.readContract({
      address: CONTRACTS.EUSD,
      abi: erc20Abi,
      functionName: "allowance",
      args: [
        address,
        CONTRACTS.ECGAS_SALE,
      ],
    }) as bigint;

  if (allowance < amount) {

    await writeContractAsync({
      address: CONTRACTS.EUSD,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.ECGAS_SALE,
        maxUint256,
      ],
    });

  }

  const hash =
  await writeContractAsync({
    address: CONTRACTS.ECGAS_SALE,
    abi: eDollarEcGasSaleAbi,
    functionName: "buyEUSD",
    args: [amount],
    gas: 3000000n,
  });

setTxHash(hash);

return hash;
}




  return {

  gasBalance,
  preview,

  buyGasUSDT,
  buyGasEUSD,

  gasPending: confirming,
  gasConfirmed: isSuccess,
};
}