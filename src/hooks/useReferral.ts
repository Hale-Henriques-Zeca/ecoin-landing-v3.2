import { useAccount, useWalletClient } from "wagmi";
import { publicClient } from "@/lib/publicClient";
import { unifiedReferralAbi } from "@/lib/abis/unifiedReferralAbi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { isAddress } from "viem";
import { bsc} from "wagmi/chains";

export function useReferral() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

   /* ===================== BIND ===================== */
  async function bindInviter(upline: string): Promise<void> {
    if (!walletClient || !address) {
      throw new Error("Wallet not connected");
    }

    if (!isAddress(upline)) {
      throw new Error("Invalid inviter address");
    }

    await walletClient.writeContract({
  address: CONTRACTS.REFERRAL as `0x${string}`,
  abi: unifiedReferralAbi,
  functionName: "bindInviter",
  args: [upline],
  chain: bsc,
  account: address as `0x${string}`,
});
  }

  /* ===================== READ ===================== */
  async function getInviter(): Promise<string | null> {
  if (!address) return null;

  try {

    return await publicClient.readContract({
      address: CONTRACTS.REFERRAL as `0x${string}`,
      abi: unifiedReferralAbi,
      functionName: "inviterOf",
      args: [address as `0x${string}`],
    }) as string;

  } catch (error) {

    console.error("getInviter error:", error);

    return null;
  }
}

async function getPendingRewards(
  token: `0x${string}`
): Promise<bigint> {

  if (!address) return 0n;

  try {

    return await publicClient.readContract({
      address: CONTRACTS.REFERRAL as `0x${string}`,
      abi: unifiedReferralAbi,
      functionName: "pendingRewards",
      args: [
        address as `0x${string}`,
        token,
      ],
    }) as bigint;

  } catch (error) {

    console.error(
      "getPendingRewards error:",
      error
    );

    return 0n;
  }
}

async function getScore(): Promise<bigint> {

  if (!address) return 0n;

  try {

    return await publicClient.readContract({
      address: CONTRACTS.REFERRAL as `0x${string}`,
      abi: unifiedReferralAbi,
      functionName: "getScore",
      args: [address as `0x${string}`],
    }) as bigint;

  } catch (error) {

    console.error(
      "getScore error:",
      error
    );

    return 0n;
  }
}

  /* ===================== CLAIM ===================== */
 async function claimRewards(
  token: `0x${string}`
): Promise<void> {
  if (!walletClient || !address) {
    throw new Error("Wallet not connected");
  }

  await walletClient.writeContract({
    address: CONTRACTS.REFERRAL as `0x${string}`,
    abi: unifiedReferralAbi,
    functionName: "claim",
    args: [token],
    chain: bsc,
    account: address as `0x${string}`,
  });
}

 return {
  bindInviter,
  getInviter,
  getPendingRewards,
  claimRewards,
  getScore,
};
}
