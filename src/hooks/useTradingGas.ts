import { useWriteContract } from "wagmi";
import { parseUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";

export function useTradingGas() {
  const { writeContractAsync } = useWriteContract();

  const deposit = async (amount: string) => {
    return await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "deposit",
      args: [parseUnits(amount, 6)], // USDT
    });
  };

  const redeem = async (gasAmount: string) => {
    return await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "redeem",
      args: [parseUnits(gasAmount, 0)], // ecGas
    });
  };

  return { deposit, redeem };
}