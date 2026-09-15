import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "viem";

export function useApproveUSDT() {
  const { writeContractAsync } = useWriteContract();

  const approve = async (amount: string) => {
    return writeContractAsync({
      address: CONTRACTS.USDT, // ⚠️ adiciona no contracts.ts
      abi: erc20Abi,
      functionName: "approve",
      args: [
        CONTRACTS.TRADING_GAS_VAULT,
        parseUnits(amount, 18)
      ]
    });
  };

  return { approve };
}