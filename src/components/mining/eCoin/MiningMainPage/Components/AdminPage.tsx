"use client";

import React, { useState } from "react";
import {
  useAccount,
  useDisconnect,
  useReadContract,
  usePublicClient,
  useSwitchChain,
} from "wagmi";
import { bsc } from "wagmi/chains";
import { formatUnits, erc20Abi } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import { CONTRACTS } from "@/lib/contracts/contracts";

import {
  PRIMARY_ADMIN_WALLET,
  miningStakingECoinAdminAbi,
  ecGasSaleECoinAdminAbi,
  treasuryAbi,
  extractErrorMessage,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";
import {
  AdminAccessGuard,
  AdminFeedbackBanner,
} from "@/components/mining/eCoin/MiningMainPage/Components/admin/AdminSharedUI";
import { AdminHeaderAndMetrics } from "@/components/mining/eCoin/MiningMainPage/Components/admin/AdminHeaderAndMetrics";
import { MiningRewardsPanel } from "@/components/mining/eCoin/MiningMainPage/Components/admin/MiningRewardsPanel";
import { EcGasEnginePanel } from "@/components/mining/eCoin/MiningMainPage/Components/admin//EcGasEnginePanel";
import { InjectorsAndCollectorPanel } from "@/components/mining/eCoin/MiningMainPage/Components/admin/InjectorsAndCollectorPanel";
import { ExcessRecoveryPanel } from "@/components/mining/eCoin/MiningMainPage/Components/admin/ExcessRecoveryPanel";
import { TreasuryVaultPanel } from "@/components/mining/eCoin/MiningMainPage/Components/admin/TreasuryVaultPanel";
import { ProtocolSecurityStatusPanel } from "@/components/mining/eCoin/MiningMainPage/Components/admin/ProtocolSecurityStatusPanel";

export default function AdminPage() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: bsc.id });
  const queryClient = useQueryClient();

  const stakingAddress = CONTRACTS.eCoin_Mining_Staking_eCoin as `0x${string}`;
  const gasSaleAddress = CONTRACTS.ecGas_Sale_eCoin as `0x${string}`;
  const contractsRecord = CONTRACTS as Record<
    string,
    `0x${string}` | undefined
  >;
  const treasuryAddress = contractsRecord.TREASURY;

  const isCorrectChain = chain?.id === bsc.id;

  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<AdminFeedbackState>(null);

  /* ================= LEITURAS MINING (ECoinMiningStakingECoin) ================= */

  const { data: contractOwner } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "owner",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain },
  });

  const { data: onChainECoin } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "ecoin",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain },
  });

  const ecoinTokenAddress = (onChainECoin ??
    contractsRecord.ECOIN ??
    contractsRecord.eCoin) as `0x${string}` | undefined;

  const { data: totalStaked, refetch: refetchTotalStaked } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "totalStaked",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: totalEligibleStaked, refetch: refetchEligible } =
    useReadContract({
      address: stakingAddress,
      abi: miningStakingECoinAdminAbi,
      functionName: "totalEligibleStaked",
      chainId: bsc.id,
      query: {
        enabled: isConnected && isCorrectChain,
        refetchInterval: 15_000,
      },
    });

  const { data: rewardBufferECoin, refetch: refetchBuffer } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "rewardBufferECoin",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: streamRateRaw } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "streamRate",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain },
  });

  const { data: totalStakers } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "totalStakers",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: currentClaimCollector, refetch: refetchClaimCollector } =
    useReadContract({
      address: stakingAddress,
      abi: miningStakingECoinAdminAbi,
      functionName: "claimCollector",
      chainId: bsc.id,
      query: { enabled: isConnected && isCorrectChain },
    });

  const { data: stakingContractECoinBalance, refetch: refetchStakingBalance } =
    useReadContract({
      address: ecoinTokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [stakingAddress],
      chainId: bsc.id,
      query: {
        enabled: Boolean(isConnected && isCorrectChain && ecoinTokenAddress),
        refetchInterval: 15_000,
      },
    });

  const { data: adminWalletECoinBalance, refetch: refetchAdminBalance } =
    useReadContract({
      address: ecoinTokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
      chainId: bsc.id,
      query: {
        enabled: Boolean(
          isConnected && isCorrectChain && ecoinTokenAddress && address
        ),
        refetchInterval: 15_000,
      },
    });

  const { data: isCurrentAddressInjector } = useReadContract({
    address: stakingAddress,
    abi: miningStakingECoinAdminAbi,
    functionName: "authorizedInjectors",
    args: address ? [address] : undefined,
    chainId: bsc.id,
    query: { enabled: Boolean(isConnected && isCorrectChain && address) },
  });

  /* ================= LEITURAS ECGAS (EcGasSaleECoin) ================= */

  const { data: ecoinSaleEnabled, refetch: refetchSaleEnabled } =
    useReadContract({
      address: gasSaleAddress,
      abi: ecGasSaleECoinAdminAbi,
      functionName: "ecoinEnabled",
      chainId: bsc.id,
      query: { enabled: isConnected && isCorrectChain },
    });

  const { data: currentGasCollector, refetch: refetchGasCollector } =
    useReadContract({
      address: gasSaleAddress,
      abi: ecGasSaleECoinAdminAbi,
      functionName: "collector",
      chainId: bsc.id,
      query: { enabled: isConnected && isCorrectChain },
    });

  const { data: currentGasMining, refetch: refetchGasMining } = useReadContract({
    address: gasSaleAddress,
    abi: ecGasSaleECoinAdminAbi,
    functionName: "mining",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain },
  });

  const { data: currentActivityRegistry, refetch: refetchActivityRegistry } =
    useReadContract({
      address: gasSaleAddress,
      abi: ecGasSaleECoinAdminAbi,
      functionName: "activityRegistry",
      chainId: bsc.id,
      query: { enabled: isConnected && isCorrectChain },
    });

  /* ================= LEITURAS TREASURY (eCoin) ================= */

  const { data: treasuryECOIN, refetch: refetchTreasuryBalance } =
    useReadContract({
      address: treasuryAddress,
      abi: treasuryAbi,
      functionName: "balanceOf",
      args: ecoinTokenAddress ? [ecoinTokenAddress] : undefined,
      chainId: bsc.id,
      query: {
        enabled: Boolean(
          isConnected && isCorrectChain && treasuryAddress && ecoinTokenAddress
        ),
        refetchInterval: 15_000,
      },
    });

  const { data: dailyWithdrawLimit, refetch: refetchDailyLimit } =
    useReadContract({
      address: treasuryAddress,
      abi: treasuryAbi,
      functionName: "dailyWithdrawLimit",
      chainId: bsc.id,
      query: { enabled: Boolean(isConnected && isCorrectChain && treasuryAddress) },
    });

  const { data: withdrawnToday, refetch: refetchWithdrawnToday } =
    useReadContract({
      address: treasuryAddress,
      abi: treasuryAbi,
      functionName: "withdrawnToday",
      chainId: bsc.id,
      query: { enabled: Boolean(isConnected && isCorrectChain && treasuryAddress) },
    });

  /* ================= CONTROLE DE ACESSO ON-CHAIN ================= */

  const normalizedUser = address?.toLowerCase();
  const normalizedOwner = (contractOwner as string | undefined)?.toLowerCase();

  const isOwner = Boolean(
    isConnected &&
      normalizedUser &&
      (normalizedUser === normalizedOwner ||
        normalizedUser === PRIMARY_ADMIN_WALLET)
  );
  const isAuthorizedOperator = isOwner || Boolean(isCurrentAddressInjector);

  /* ================= SYNC & EXECUTOR CENTRAL DE TRANSAÇÕES ================= */

  async function syncAllReads() {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchTotalStaked(),
        refetchEligible(),
        refetchBuffer(),
        refetchClaimCollector(),
        refetchStakingBalance(),
        refetchAdminBalance(),
        refetchSaleEnabled(),
        refetchGasCollector(),
        refetchGasMining(),
        refetchActivityRegistry(),
        refetchTreasuryBalance(),
        refetchDailyLimit(),
        refetchWithdrawnToday(),
        queryClient.invalidateQueries(),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  }

  const executeTx: ExecuteTxFn = async (
    actionKey,
    successLabel,
    fn,
    onSuccessReset
  ) => {
    try {
      setFeedback(null);
      setBusyAction(actionKey);
      const hash = await fn();
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      await syncAllReads();
      onSuccessReset?.();
      setFeedback({
        type: "success",
        message: successLabel,
        txHash: hash,
      });
    } catch (err) {
      setFeedback({
        type: "error",
        message: extractErrorMessage(err),
      });
    } finally {
      setBusyAction(null);
    }
  };

  /* ================= BLOQUEIOS DE ACESSO ================= */

  if (!isConnected || !isCorrectChain || (contractOwner !== undefined && !isAuthorizedOperator)) {
    return (
      <AdminAccessGuard
        isConnected={isConnected}
        isCorrectChain={isCorrectChain}
        isCheckingPermission={contractOwner === undefined}
        isAuthorizedOperator={isAuthorizedOperator}
        address={address}
        onSwitchChain={() => switchChain?.({ chainId: bsc.id })}
        onDisconnect={() => disconnect()}
      />
    );
  }

  /* ================= CÁLCULOS NORMALIZADOS ON-CHAIN ================= */

  const stakedBN = (totalStaked as bigint | undefined) ?? 0n;
  const eligibleBN = (totalEligibleStaked as bigint | undefined) ?? 0n;
  const bufferBN = (rewardBufferECoin as bigint | undefined) ?? 0n;
  const contractBalBN = stakingContractECoinBalance ?? 0n;
  const excessBN = contractBalBN > stakedBN ? contractBalBN - stakedBN : 0n;

  const treasuryBN = (treasuryECOIN as bigint | undefined) ?? 0n;
  const dailyLimitBN = (dailyWithdrawLimit as bigint | undefined) ?? 0n;
  const withdrawnTodayBN = (withdrawnToday as bigint | undefined) ?? 0n;
  const remainingDailyBN =
    dailyLimitBN > withdrawnTodayBN ? dailyLimitBN - withdrawnTodayBN : 0n;

  const streamSeconds =
    streamRateRaw && Number(streamRateRaw) > 0 ? Number(streamRateRaw) : 3600;
  const cyclesPerDay = Math.max(1, Math.round(86400 / streamSeconds));
  const bufferNum = Number(formatUnits(bufferBN, 18));
  const streamPerCycleNum = bufferNum / cyclesPerDay;

  return (
    <div className="w-full space-y-6 sm:space-y-8 overflow-x-hidden">
      {/* CABEÇALHO & KPIs GLOBAIS */}
      <AdminHeaderAndMetrics
        isOwner={isOwner}
        ecoinSaleEnabled={Boolean(ecoinSaleEnabled)}
        isCurrentAddressInjector={Boolean(isCurrentAddressInjector)}
        isRefreshing={isRefreshing}
        onSyncAll={syncAllReads}
        stakedBN={stakedBN}
        eligibleBN={eligibleBN}
        bufferBN={bufferBN}
        contractBalBN={contractBalBN}
        excessBN={excessBN}
        totalStakers={totalStakers as bigint | undefined}
        cyclesPerDay={cyclesPerDay}
        streamPerCycleNum={streamPerCycleNum}
      />

      {/* BANNER DE FEEDBACK ON-CHAIN */}
      <AdminFeedbackBanner
        feedback={feedback}
        onClose={() => setFeedback(null)}
      />

      {/* PAINÉIS MODULARIZADOS DE ADMINISTRAÇÃO */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-8">
        <MiningRewardsPanel
          stakingAddress={stakingAddress}
          ecoinTokenAddress={ecoinTokenAddress}
          bufferBN={bufferBN}
          contractBalBN={contractBalBN}
          adminWalletBalance={adminWalletECoinBalance}
          cyclesPerDay={cyclesPerDay}
          streamSeconds={streamSeconds}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <EcGasEnginePanel
          gasSaleAddress={gasSaleAddress}
          ecoinSaleEnabled={
            ecoinSaleEnabled !== undefined ? Boolean(ecoinSaleEnabled) : undefined
          }
          currentGasCollector={
            currentGasCollector ? String(currentGasCollector) : undefined
          }
          currentGasMining={
            currentGasMining ? String(currentGasMining) : undefined
          }
          currentActivityRegistry={
            currentActivityRegistry
              ? String(currentActivityRegistry)
              : undefined
          }
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <InjectorsAndCollectorPanel
          stakingAddress={stakingAddress}
          currentClaimCollector={
            currentClaimCollector ? String(currentClaimCollector) : undefined
          }
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <ExcessRecoveryPanel
          stakingAddress={stakingAddress}
          contractBalBN={contractBalBN}
          stakedBN={stakedBN}
          excessBN={excessBN}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        {treasuryAddress && (
          <TreasuryVaultPanel
            treasuryAddress={treasuryAddress}
            ecoinTokenAddress={ecoinTokenAddress}
            treasuryBN={treasuryBN}
            remainingDailyBN={remainingDailyBN}
            busyAction={busyAction}
            onFeedback={setFeedback}
            executeTx={executeTx}
          />
        )}

        <ProtocolSecurityStatusPanel
          treasuryAddress={treasuryAddress}
          ecoinTokenAddress={ecoinTokenAddress}
          stakingAddress={stakingAddress}
          gasSaleAddress={gasSaleAddress}
          dailyLimitBN={dailyLimitBN}
          withdrawnTodayBN={withdrawnTodayBN}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />
      </div>
    </div>
  );
}