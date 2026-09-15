import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";

import { parseUnits } from "viem";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { TradingGasVaultAbi } from "@/lib/abis/TradingGasVaultAbi";

export function useTradingGas() {

  const { address } = useAccount();

  const { writeContractAsync } =
    useWriteContract();

  const { data: owner } =
    useReadContract({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "owner",
    });

  const { data: feeCollector } =
    useReadContract({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "feeCollector",
    });

  const { data: liquidityReserve } =
    useReadContract({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "liquidityReserve",
    });

  const { data: usdtEnabled } =
    useReadContract({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "usdtEnabled",
    });

  const { data: eusdEnabled } =
    useReadContract({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "eusdEnabled",
    });

  async function depositUSDT(
    amount: string
  ) {

    await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "depositUSDT",
      args: [
        parseUnits(amount, 18)
      ],
    });
  }

  async function depositEUSD(
    amount: string
  ) {

    await writeContractAsync({
      address: CONTRACTS.TRADING_GAS_VAULT,
      abi: TradingGasVaultAbi,
      functionName: "depositEUSD",
      args: [
        parseUnits(amount, 18)
      ],
    });
  }

  const isOwner =
    typeof owner === "string" &&
    typeof address === "string" &&
    owner.toLowerCase() ===
    address.toLowerCase();

  return {
    owner,
    feeCollector,
    liquidityReserve,

    usdtEnabled:
      usdtEnabled ?? false,

    eusdEnabled:
      eusdEnabled ?? false,

    isOwner,

    depositUSDT,
    depositEUSD,
  };
}