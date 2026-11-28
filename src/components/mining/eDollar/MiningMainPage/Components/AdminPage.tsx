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
import { useQueryClient } from "@tanstack/react-query";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAdminAbi } from "@/lib/abis/eDollarMining/miningStakingAdminAbi";
import { eDollarEcGasSaleAbi } from "@/lib/abis/eDollarMining/eDollarEcGasSaleAbi";

import {
  PRIMARY_ADMIN_WALLET,
  treasuryAbi,
  stakingAccessCheckAbi,
  ecGasStatusViewAbi,
  extractErrorMessage,
  AdminFeedbackState,
  ExecuteTxFn,
} from "@/components/mining/eDollar/MiningMainPage/Components/admin/eDollarProtocol/stablecoinAdminConfig";
import {
  AdminAccessGuard,
  AdminFeedbackBanner,
} from "@/components/mining/eDollar/MiningMainPage/Components/admin/StablecoinSharedUI";
import { StablecoinHeaderAndMetrics } from "@/components/mining/eDollar/MiningMainPage/Components/admin/StablecoinHeaderAndMetrics";
import { TreasuryVaultPanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/TreasuryVaultPanel";
import { SecurityControlsPanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/SecurityControlsPanel";
import { MiningRewardsPanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/MiningRewardsPanel";
import { EcGasEnginePanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/EcGasEnginePanel";
import { DepositTokenControlsPanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/DepositTokenControlsPanel";
import { AuthorizedInjectorsPanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/AuthorizedInjectorsPanel";
import { ProtocolStatusPanel } from "@/components/mining/eDollar/MiningMainPage/Components/admin/ProtocolStatusPanel";

export default function AdminPage() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: bsc.id });
  const queryClient = useQueryClient();

  const treasuryAddress = CONTRACTS.TREASURY as `0x${string}`;
  const miningStakingAddress = CONTRACTS.MINING_STAKING as `0x${string}`;
  const ecGasSaleAddress = CONTRACTS.ECGAS_SALE as `0x${string}`;
  const usdtAddress = CONTRACTS.USDT as `0x${string}`;
  const eusdAddress = CONTRACTS.EUSD as `0x${string}`;
  const ecoinAddress = CONTRACTS.ECOIN as `0x${string}`;

  const isCorrectChain = chain?.id === bsc.id;

  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<AdminFeedbackState>(null);

  /* ================= VERIFICAÇÃO DE PERMISSÃO ON-CHAIN ================= */

  const { data: contractOwner, isLoading: isLoadingOwner } = useReadContract({
    address: miningStakingAddress,
    abi: stakingAccessCheckAbi,
    functionName: "owner",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, retry: false },
  });

  const { data: isCurrentAddressInjector } = useReadContract({
    address: miningStakingAddress,
    abi: stakingAccessCheckAbi,
    functionName: "authorizedInjectors",
    args: address ? [address] : undefined,
    chainId: bsc.id,
    query: {
      enabled: Boolean(isConnected && isCorrectChain && address),
      retry: false,
    },
  });

  /* ================= LEITURAS TREASURY ================= */

  const { data: treasuryUSDT, refetch: refetchTreasuryUSDT } = useReadContract({
    address: treasuryAddress,
    abi: treasuryAbi,
    functionName: "balanceOf",
    args: [usdtAddress],
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: treasuryEUSD, refetch: refetchTreasuryEUSD } = useReadContract({
    address: treasuryAddress,
    abi: treasuryAbi,
    functionName: "balanceOf",
    args: [eusdAddress],
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: treasuryECOIN, refetch: refetchTreasuryECOIN } =
    useReadContract({
      address: treasuryAddress,
      abi: treasuryAbi,
      functionName: "balanceOf",
      args: [ecoinAddress],
      chainId: bsc.id,
      query: {
        enabled: isConnected && isCorrectChain,
        refetchInterval: 15_000,
      },
    });

  const { data: dailyWithdrawLimit, refetch: refetchDailyLimit } =
    useReadContract({
      address: treasuryAddress,
      abi: treasuryAbi,
      functionName: "dailyWithdrawLimit",
      chainId: bsc.id,
      query: { enabled: isConnected && isCorrectChain },
    });

  const { data: withdrawnToday, refetch: refetchWithdrawnToday } =
    useReadContract({
      address: treasuryAddress,
      abi: treasuryAbi,
      functionName: "withdrawnToday",
      chainId: bsc.id,
      query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
    });

  /* ================= LEITURAS MINING ================= */

  const { data: totalStaked, refetch: refetchTotalStaked } = useReadContract({
    address: miningStakingAddress,
    abi: miningStakingAdminAbi,
    functionName: "totalStaked",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: rewardUSDT, refetch: refetchRewardUSDT } = useReadContract({
    address: miningStakingAddress,
    abi: miningStakingAdminAbi,
    functionName: "rewardBufferUSDT",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  const { data: rewardEUSD, refetch: refetchRewardEUSD } = useReadContract({
    address: miningStakingAddress,
    abi: miningStakingAdminAbi,
    functionName: "rewardBufferEUSD",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, refetchInterval: 15_000 },
  });

  /* ================= LEITURAS ECGAS ================= */

  const { data: gasRate, refetch: refetchGasRate } = useReadContract({
    address: ecGasSaleAddress,
    abi: eDollarEcGasSaleAbi,
    functionName: "rate",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain },
  });

  const { data: usdtEnabled, refetch: refetchUsdtEnabled } = useReadContract({
    address: ecGasSaleAddress,
    abi: ecGasStatusViewAbi,
    functionName: "usdtEnabled",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, retry: false },
  });

  const { data: eusdEnabled, refetch: refetchEusdEnabled } = useReadContract({
    address: ecGasSaleAddress,
    abi: ecGasStatusViewAbi,
    functionName: "eusdEnabled",
    chainId: bsc.id,
    query: { enabled: isConnected && isCorrectChain, retry: false },
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
        refetchTreasuryUSDT(),
        refetchTreasuryEUSD(),
        refetchTreasuryECOIN(),
        refetchDailyLimit(),
        refetchWithdrawnToday(),
        refetchTotalStaked(),
        refetchRewardUSDT(),
        refetchRewardEUSD(),
        refetchGasRate(),
        refetchUsdtEnabled(),
        refetchEusdEnabled(),
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

  if (
    !isConnected ||
    !isCorrectChain ||
    (!isLoadingOwner && !isAuthorizedOperator)
  ) {
    return (
      <AdminAccessGuard
        isConnected={isConnected}
        isCorrectChain={isCorrectChain}
        isCheckingPermission={isLoadingOwner}
        isAuthorizedOperator={isAuthorizedOperator}
        address={address}
        onSwitchChain={() => switchChain?.({ chainId: bsc.id })}
        onDisconnect={() => disconnect()}
      />
    );
  }

  /* ================= VALORES NORMALIZADOS ================= */

  const treasuryUSDTBN = (treasuryUSDT as bigint | undefined) ?? 0n;
  const treasuryEUSDBN = (treasuryEUSD as bigint | undefined) ?? 0n;
  const treasuryECOINBN = (treasuryECOIN as bigint | undefined) ?? 0n;
  const dailyLimitBN = (dailyWithdrawLimit as bigint | undefined) ?? 0n;
  const withdrawnTodayBN = (withdrawnToday as bigint | undefined) ?? 0n;
  const totalStakedBN = (totalStaked as bigint | undefined) ?? 0n;
  const rewardUSDTBN = (rewardUSDT as bigint | undefined) ?? 0n;
  const rewardEUSDBN = (rewardEUSD as bigint | undefined) ?? 0n;
  const gasRateBN = (gasRate as bigint | undefined) ?? 0n;

  return (
    <div className="w-full space-y-6 sm:space-y-8 overflow-x-hidden">
      {/* CABEÇALHO & KPIs GLOBAIS */}
      <StablecoinHeaderAndMetrics
        isOwner={isOwner}
        isCurrentAddressInjector={Boolean(isCurrentAddressInjector)}
        isRefreshing={isRefreshing}
        onSyncAll={syncAllReads}
        treasuryUSDTBN={treasuryUSDTBN}
        treasuryEUSDBN={treasuryEUSDBN}
        treasuryECOINBN={treasuryECOINBN}
        totalStakedBN={totalStakedBN}
        gasRateBN={gasRateBN}
      />

      {/* BANNER DE FEEDBACK ON-CHAIN */}
      <AdminFeedbackBanner
        feedback={feedback}
        onClose={() => setFeedback(null)}
      />

      {/* PAINÉIS MODULARIZADOS DE ADMINISTRAÇÃO */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-8">
        <TreasuryVaultPanel
          treasuryAddress={treasuryAddress}
          usdtAddress={usdtAddress}
          eusdAddress={eusdAddress}
          ecoinAddress={ecoinAddress}
          treasuryUSDTBN={treasuryUSDTBN}
          treasuryEUSDBN={treasuryEUSDBN}
          treasuryECOINBN={treasuryECOINBN}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <SecurityControlsPanel
          treasuryAddress={treasuryAddress}
          dailyLimitBN={dailyLimitBN}
          withdrawnTodayBN={withdrawnTodayBN}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <MiningRewardsPanel
          miningStakingAddress={miningStakingAddress}
          usdtAddress={usdtAddress}
          eusdAddress={eusdAddress}
          rewardUSDTBN={rewardUSDTBN}
          rewardEUSDBN={rewardEUSDBN}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <EcGasEnginePanel
          ecGasSaleAddress={ecGasSaleAddress}
          gasRateBN={gasRateBN}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <DepositTokenControlsPanel
          ecGasSaleAddress={ecGasSaleAddress}
          usdtEnabled={
            usdtEnabled !== undefined ? Boolean(usdtEnabled) : undefined
          }
          eusdEnabled={
            eusdEnabled !== undefined ? Boolean(eusdEnabled) : undefined
          }
          busyAction={busyAction}
          executeTx={executeTx}
        />

        <AuthorizedInjectorsPanel
          miningStakingAddress={miningStakingAddress}
          busyAction={busyAction}
          onFeedback={setFeedback}
          executeTx={executeTx}
        />

        <ProtocolStatusPanel
          treasuryAddress={treasuryAddress}
          miningStakingAddress={miningStakingAddress}
          ecGasSaleAddress={ecGasSaleAddress}
          usdtAddress={usdtAddress}
          eusdAddress={eusdAddress}
          busyAction={busyAction}
        />
      </div>
    </div>
  );
}