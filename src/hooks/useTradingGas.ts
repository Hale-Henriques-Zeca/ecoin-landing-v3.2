import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";

export function useTradingGas() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // 🔥 BALANCE REAL
  const { data: gasBalance } = useReadContract({
    address: CONTRACTS.TRADING_GAS_VAULT,
    abi: TradingGasVaultAbi,
    functionName: "ecGasBalance",
    args: [address],
    query: { enabled: !!address }
  });

  // 🔥 DEPOSIT
  async function deposit(amount: string) {
    const parsed = parseUnits(amount, 18);

    await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "deposit",
      args: [parsed],
    });
  }

  // 🔥 REDEEM
  async function redeem(amount: string) {
    const parsed = parseUnits(amount, 18);

    await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "redeem",
      args: [parsed],
    });
  }

  return {
    gas: gasBalance ? Number(formatUnits(gasBalance, 0)) : 0,
    deposit,
    redeem
  };
}