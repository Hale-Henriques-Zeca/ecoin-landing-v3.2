import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { formatUnits, parseUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";

const abi = [
  {
    name: "pendingRewards",
    type: "function",
    inputs: [{ type: "address" }],
    outputs: [{ type: "uint256" }],
    stateMutability: "view"
  },
  {
    name: "users",
    type: "function",
    inputs: [{ type: "address" }],
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "rewardDebt", type: "uint256" },
      { name: "pending", type: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    name: "stake",
    type: "function",
    inputs: [{ type: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    name: "unstake",
    type: "function",
    inputs: [{ type: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    name: "claim",
    type: "function",
    inputs: [],
    stateMutability: "nonpayable"
  }
];

export function useMining() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const { data: rewards } = useReadContract({
    address: CONTRACTS.MINING_STAKING,
    abi,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
    query: { refetchInterval: 4000 }
  });

  const { data: user } = useReadContract({
    address: CONTRACTS.MINING_STAKING,
    abi,
    functionName: "users",
    args: address ? [address] : undefined,
    query: { refetchInterval: 4000 }
  });

  const stake = (amount: string) =>
    writeContractAsync({
      address: CONTRACTS.MINING_STAKING,
      abi,
      functionName: "stake",
      args: [parseUnits(amount, 18)]
    });

  const unstake = (amount: string) =>
    writeContractAsync({
      address: CONTRACTS.MINING_STAKING,
      abi,
      functionName: "unstake",
      args: [parseUnits(amount, 18)]
    });

  const claim = () =>
    writeContractAsync({
      address: CONTRACTS.MINING_STAKING,
      abi,
      functionName: "claim"
    });

  return {
    stake,
    unstake,
    claim,
    rewards: rewards ? Number(formatUnits(rewards, 18)) : 0,
    staked: user ? Number(formatUnits(user[0], 18)) : 0
  };
}