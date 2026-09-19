import { formatEther } from "viem";

export const TOKEN_ADDRESSES = {
  ECOIN: "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964",    // Endereço do contrato eCoin
  EDOLLAR: "0xF7543E5B4735C58a176269202847360aaDfA83C1",  // Endereço do contrato eDollar
  USDT: "0x55d398326f99059fF775485246999027B3197955",     // Endereço USDT na BSC
  BNB: "0x0000000000000000000000000000000000000000"
};

export async function fetchLeaderData(
  publicClient: any, 
  referralContractAddress: `0x${string}`,
  leaderWallets: `0x${string}`[]
): Promise<LeaderItem[]> {
  const leaders = await Promise.all(
    leaderWallets.map(async (wallet) => {
      // 1. Perfil
      const profile = await publicClient.readContract({
        address: referralContractAddress,
        abi: UNIFIED_REFERRAL_ABI,
        functionName: "profiles",
        args: [wallet],
      });

      // 2. Estatísticas de Rede (Rede L1 + L2 + L3)
      const stats = await publicClient.readContract({
        address: referralContractAddress,
        abi: UNIFIED_REFERRAL_ABI,
        functionName: "getNetworkStats",
        args: [wallet],
      });

      // 3. Pontuação
      const score = await publicClient.readContract({
        address: referralContractAddress,
        abi: UNIFIED_REFERRAL_ABI,
        functionName: "getScore",
        args: [wallet],
      });

      // 4. Rewards Multi-moeda
      const [eCoin, eDollar, usdt, bnb] = await Promise.all([
        publicClient.readContract({
          address: referralContractAddress,
          abi: UNIFIED_REFERRAL_ABI,
          functionName: "totalRewardsByToken",
          args: [wallet, TOKEN_ADDRESSES.ECOIN],
        }),
        publicClient.readContract({
          address: referralContractAddress,
          abi: UNIFIED_REFERRAL_ABI,
          functionName: "totalRewardsByToken",
          args: [wallet, TOKEN_ADDRESSES.EDOLLAR],
        }),
        publicClient.readContract({
          address: referralContractAddress,
          abi: UNIFIED_REFERRAL_ABI,
          functionName: "totalRewardsByToken",
          args: [wallet, TOKEN_ADDRESSES.USDT],
        }),
        publicClient.readContract({
          address: referralContractAddress,
          abi: UNIFIED_REFERRAL_ABI,
          functionName: "totalRewardsByToken",
          args: [wallet, TOKEN_ADDRESSES.BNB],
        }),
      ]);

      return {
        name: profile[0] || `${wallet.slice(0, 6)}...${wallet.slice(-4)}`,
        wallet: `${wallet.slice(0, 5)}...${wallet.slice(-3)}`,
        members: Number(stats[3]), // totalMembers
        rewards: {
          eCoin: Number(formatEther(eCoin as bigint)).toFixed(2),
          eDollar: Number(formatEther(eDollar as bigint)).toFixed(2),
          usdt: Number(formatEther(usdt as bigint)).toFixed(2),
          bnb: Number(formatEther(bnb as bigint)).toFixed(4),
        },
        score: Number(score),
      };
    })
  );

  return leaders.sort((a, b) => b.score - a.score);
}