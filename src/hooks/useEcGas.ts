
import { useReadContract, useWriteContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
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
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "preview",
    args: address ? [address] : undefined,
  });

  async function buyGasUSDT(amount: bigint) {

  // 🔥 APPROVE FIRST
  await writeContractAsync({
    address: CONTRACTS.USDT,
    abi: erc20Abi,
    functionName: "approve",
    args: [
      CONTRACTS.ECGAS_SALE,
      amount,
    ],
  });

  // 🔥 BUY
  return writeContractAsync({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "buyUSDT",
    args: [amount],

    gas: BigInt(3_000_000),
  });
}

async function buyGasEUSD(amount: bigint) {

  // 🔥 APPROVE FIRST
  await writeContractAsync({
    address: CONTRACTS.EUSD,
    abi: erc20Abi,
    functionName: "approve",
    args: [
      CONTRACTS.ECGAS_SALE,
      amount,
    ],
  });

  return writeContractAsync({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "buyEUSD",
    args: [amount],

    gas: BigInt(3_000_000),
  });
}

  return {
    gasBalance,
    preview,
    buyGasUSDT,
    buyGasEUSD,
  };
}