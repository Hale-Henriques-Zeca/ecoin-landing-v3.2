import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";

export function useTradingGas() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // 🔥 GAS
  const { data: gasBalance } = useReadContract({
    address: CONTRACTS.TRADING_GAS_VAULT,
    abi: TradingGasVaultAbi,
    functionName: "ecGasBalance",
    args: [address],
    query: { enabled: !!address }
  });

  // 🔥 USDT VALUE
  const { data: usdtBalance } = useReadContract({
    address: CONTRACTS.TRADING_GAS_VAULT,
    abi: TradingGasVaultAbi,
    functionName: "usdtEquivalent",
    args: [address],
    query: { enabled: !!address }
  });

  async function deposit(amount: string) {
    const parsed = parseUnits(amount, 6); // USDT
    await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "deposit",
      args: [parsed],
    });
  }

  async function redeem(amount: string) {
    const parsed = parseUnits(amount, 0); // GAS
    await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "redeem",
      args: [parsed],
    });
  }

  return {
    gasBalance: gasBalance ? Number(formatUnits(gasBalance, 0)) : 0,
    usdtValue: usdtBalance ? Number(formatUnits(usdtBalance, 6)) : 0,
    deposit,
    redeem
  };
}