import { useMemo } from "react";
import { useReadContracts } from "wagmi";
import { bsc } from "wagmi/chains";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { airdropFeeCollectorAbi } from "@/lib/abis/airdropFeeCollectorAbi";

export interface AirdropClaimBreakdown {
  isLoading: boolean;
  feeBP: bigint;
  splitTotalBP: bigint;
  feeSplitIsValid: boolean;
  isStableAsset: boolean;
  grossClaim: bigint;
  serviceFee: bigint;
  netToReceive: bigint;
  distribution: {
    mining: bigint;
    miningLabel: string;
    referral: bigint;
    buyback: bigint;
    liquidity: bigint;
    salary: bigint;
    treasury: bigint;
    trading: bigint;
    ecosystem: bigint;
    engine: bigint;
  };
}

const BP = 10_000n;

export function useAirdropFeeCollector(
  tokenAddress: `0x${string}` | undefined,
  grossClaim: bigint
): AirdropClaimBreakdown {
  const collectorAddress = CONTRACTS.AIRDROP_FEE_COLLECTOR as `0x${string}`;

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: collectorAddress,
        abi: airdropFeeCollectorAbi,
        functionName: "CLAIM_FEE_BP",
        chainId: bsc.id,
      },
      {
        address: collectorAddress,
        abi: airdropFeeCollectorAbi,
        functionName: "feeSplit",
        chainId: bsc.id,
      },
      {
        address: collectorAddress,
        abi: airdropFeeCollectorAbi,
        functionName: "eusd",
        chainId: bsc.id,
      },
      {
        address: collectorAddress,
        abi: airdropFeeCollectorAbi,
        functionName: "usdt",
        chainId: bsc.id,
      },
    ],
    query: {
      staleTime: 30_000,
    },
  });

  return useMemo(() => {
    const feeBP = (data?.[0]?.result as bigint | undefined) ?? 1_000n;
    const split = data?.[1]?.result as readonly bigint[] | undefined;
    const onChainEusd = (data?.[2]?.result as `0x${string}` | undefined) ?? CONTRACTS.EDOLLAR;
    const onChainUsdt = (data?.[3]?.result as `0x${string}` | undefined) ?? CONTRACTS.USDT;

    const splitTotalBP = split ? split.reduce((sum, val) => sum + val, 0n) : 0n;
    const feeSplitIsValid = splitTotalBP === BP;

    const serviceFee = (grossClaim * feeBP) / BP;
    const netToReceive = grossClaim - serviceFee;

    const normalizedToken = tokenAddress?.toLowerCase() ?? "";
    const isStableAsset =
      normalizedToken === onChainEusd.toLowerCase() ||
      (onChainUsdt !== "0x0000000000000000000000000000000000000000" &&
        normalizedToken === onChainUsdt.toLowerCase());

    const part = (bp: bigint) => (serviceFee * bp) / BP;

    const miningStableBP = split?.[0] ?? 0n;
    const miningCryptoBP = split?.[1] ?? 0n;
    const liquidity = part(split?.[2] ?? 0n);
    const salary = part(split?.[3] ?? 0n);
    const baseTreasury = part(split?.[4] ?? 0n);
    const buyback = part(split?.[5] ?? 0n);
    const trading = part(split?.[6] ?? 0n);
    const ecosystem = part(split?.[7] ?? 0n);
    const engine = part(split?.[8] ?? 0n);
    const referral = part(split?.[9] ?? 0n);

    // Separação estrita por classe (idêntica a _distributeFee no Solidity)
    const mining = isStableAsset ? part(miningStableBP) : part(miningCryptoBP);

    const allocated =
      referral +
      mining +
      liquidity +
      salary +
      baseTreasury +
      buyback +
      trading +
      ecosystem +
      engine;

    // Quota da classe de mineração inativa + resíduos de arredondamento vão para o Treasury
    const treasury =
      serviceFee > allocated ? baseTreasury + (serviceFee - allocated) : baseTreasury;

    return {
      isLoading,
      feeBP,
      splitTotalBP,
      feeSplitIsValid,
      isStableAsset,
      grossClaim,
      serviceFee,
      netToReceive,
      distribution: {
        mining,
        miningLabel: isStableAsset ? "Stable Coin Mining (E-USD / USDT)" : "Crypto Coin Mining (E-Coin)",
        referral,
        buyback,
        liquidity,
        salary,
        treasury,
        trading,
        ecosystem,
        engine,
      },
    };
  }, [data, isLoading, tokenAddress, grossClaim]);
}