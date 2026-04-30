
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "viem";

export function useEcGas(address?: `0x${string}`) {
  const { writeContractAsync } = useWriteContract();

  const { data: gasBalance } = useReadContract({
    abi: erc20Abi,
    address: CONTRACTS.ECGAS,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  const { data: preview } = useReadContract({
    abi: CONTRACTS.MINING_STAKING_ABI,
    address: CONTRACTS.MINING_STAKING,
    functionName: "preview",
    args: address ? [address] : undefined,
  });

  const buyGas = async (amount: bigint) => {
    return writeContractAsync({
      abi: CONTRACTS.ECGAS_SALE_ABI,
      address: CONTRACTS.ECGAS_SALE,
      functionName: "buy",
      args: [amount],
    });
  };

  return {
    gasBalance,
    preview,
    buyGas,
  };
}