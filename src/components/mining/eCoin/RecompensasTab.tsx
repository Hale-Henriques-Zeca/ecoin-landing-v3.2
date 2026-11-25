"use client";

import React, { useEffect } from "react";
import { Award, Flame, Zap, AlertTriangle, Clock } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import TxButton from "@/components/TxButton";
import ClaimCooldown from "@/components/mining/eCoin/ClaimCooldown";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";
import { useTransactionStateeCoin } from "@/hooks/eCoinMining/useTransactionStateeCoin";
import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";

interface RecompensasTabProps {
  /** Retorno de pendingRewards(user) ou preview(user).pendingECoin */
  pendingECoin?: number;
  /** Taxa aplicada pelo IClaimCollectorECoin (opcional, em eCoin) */
  withdrawFeeECoin?: number;
  /** Valor líquido estimado após taxas do collector (opcional, em eCoin) */
  withdrawNetECoin?: number;
  /** Retorno de isMiningActive(user) / preview(user).willAccumulate */
  isMiningActive?: boolean;
  /** Retorno de preview(user).usedCapacity ou gasConsumed(user) */
  usedCapacity?: number;
  /** Retorno de preview(user).maxCapacity ou gasCapacity(user) */
  maxCapacity?: number;
  /** Retorno de preview(user).remainingCapacity */
  remainingCapacity?: number;
  /** Retorno opcional de rewardRates(user).ecoinPerDay */
  ecoinPerDay?: number;
  /** Validação opcional de CLAIM_COOLDOWN (10m) e MIN_STAKE_TIME (5m) */
  canClaim?: boolean;
  /** Mensagem de bloqueio caso esteja em cooldown ou abaixo de MIN_STAKE_TIME */
  claimBlockReason?: string;
  claimTxState?: string;
  onClaim?: () => Promise<void>;
}

export default function RecompensasTab({
  pendingECoin: propPendingECoin,
  withdrawFeeECoin: propWithdrawFeeECoin,
  withdrawNetECoin: propWithdrawNetECoin,
  isMiningActive: propIsMiningActive,
  usedCapacity: propUsedCapacity,
  maxCapacity: propMaxCapacity,
  remainingCapacity: propRemainingCapacity,
  ecoinPerDay: propEcoinPerDay,
  canClaim: propCanClaim,
  claimBlockReason: propClaimBlockReason,
  claimTxState: propClaimTxState,
  onClaim,
}: RecompensasTabProps) {
  const { address } = useAccount();
  const claimTx = useTransactionStateeCoin();
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // 📊 Leitura multicall estática para espelhar exatamente o cálculo de _update() no contrato
  const { data: reads, refetch } = useReadContracts({
    contracts: address
      ? [
          {
            ...contractConfig,
            functionName: "pendingRewards",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "users",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "gasCapacity",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "gasConsumed",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "isMiningActive",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "preview",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "rewardRates",
            args: [address],
          },
        ]
      : [],
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  // Cálculo normalizado em bigint (respeita o teto de capacidade CS e ignora overflow devolvido ao buffer)
  const hasAllReads =
    Boolean(address) &&
    reads?.[0]?.status === "success" &&
    reads?.[1]?.status === "success" &&
    reads?.[2]?.status === "success" &&
    reads?.[3]?.status === "success" &&
    reads?.[4]?.status === "success";

  let pendingECoin =
    propPendingECoin !== undefined
      ? propPendingECoin
      : Number(mining.pendingECoin ?? 0);

  if (hasAllReads && reads) {
    const rawPendingBN = (reads[0].result as bigint) ?? 0n;
    const userTuple = reads[1].result as readonly [bigint, bigint, bigint];
    const storedPendingBN = userTuple?.[2] ?? 0n;
    const gasCapacityBN = (reads[2].result as bigint) ?? 0n;
    const gasConsumedBN = (reads[3].result as bigint) ?? 0n;
    const activeOnChain = Boolean(reads[4].result);

    const unclaimedBN =
      rawPendingBN > storedPendingBN ? rawPendingBN - storedPendingBN : 0n;

    const remainingGasBN =
      activeOnChain && gasCapacityBN > gasConsumedBN
        ? gasCapacityBN - gasConsumedBN
        : 0n;

    const acceptedBN =
      unclaimedBN <= remainingGasBN ? unclaimedBN : remainingGasBN;

    pendingECoin = Number(formatUnits(storedPendingBN + acceptedBN, 18));
  }

  // Status de mineração e métricas de capacidade/taxa sincronizados com o contrato
  const isMiningActive =
    address && reads?.[4]?.status === "success"
      ? Boolean(reads[4].result)
      : propIsMiningActive ?? Boolean(mining.isMiningActive);

  const rawPreview =
    address && reads?.[5]?.status === "success"
      ? (reads[5].result as readonly [bigint, bigint, bigint, bigint, boolean])
      : undefined;

  const remainingCapacity = rawPreview
    ? Number(formatUnits(rawPreview[1] ?? 0n, 18))
    : propRemainingCapacity ?? Number(mining.previewData?.remainingCapacity ?? 0);

  const usedCapacity = rawPreview
    ? Number(formatUnits(rawPreview[2] ?? 0n, 18))
    : propUsedCapacity ?? Number(mining.previewData?.usedCapacity ?? 0);

  const maxCapacity = rawPreview
    ? Number(formatUnits(rawPreview[3] ?? 0n, 18))
    : propMaxCapacity ?? Number(mining.previewData?.maxCapacity ?? 0);

  const rawRates =
    address && reads?.[6]?.status === "success"
      ? (reads[6].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;

  const ecoinPerDay = rawRates
    ? Number(formatUnits(rawRates[3] ?? 0n, 18))
    : propEcoinPerDay ?? Number(mining.rates?.ecoinPerDay ?? 0);

  // Taxa de 1% do ECoinMiningFeeCollectorECoin (CLAIM_FEE_BP = 100)
  const effectiveFeeECoin =
    propWithdrawFeeECoin !== undefined &&
    propPendingECoin !== undefined &&
    propPendingECoin === pendingECoin
      ? propWithdrawFeeECoin
      : pendingECoin * 0.01;

  const netECoin =
    propWithdrawNetECoin !== undefined &&
    propPendingECoin !== undefined &&
    propPendingECoin === pendingECoin
      ? propWithdrawNetECoin
      : Math.max(0, pendingECoin - effectiveFeeECoin);

  const capacityPercent =
    maxCapacity > 0 ? Math.min(100, (usedCapacity / maxCapacity) * 100) : 0;

  const isGasExhausted = maxCapacity > 0 && remainingCapacity <= 0;

  // Validação temporal (MIN_STAKE_TIME = 5m / CLAIM_COOLDOWN = 10m)
  const temporalAllowed =
    (mining.cooldownPassed ?? true) && (mining.minStakeTimePassed ?? true);

  const canClaim =
    propCanClaim !== undefined
      ? propCanClaim && temporalAllowed
      : temporalAllowed;

  const autoBlockReason = !mining.minStakeTimePassed
    ? "Aguarde o tempo mínimo de stake (5 min) para sacar."
    : !mining.cooldownPassed
    ? "Aguarde o cooldown de saque (10 min) terminar."
    : undefined;

  const claimBlockReason = propClaimBlockReason ?? autoBlockReason;
  const isButtonDisabled = pendingECoin <= 0 || !canClaim;

  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState("success");
      refetch();
      const timer = setTimeout(() => {
        claimTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining.claimConfirmed]);

  const handleClaimRewards = async () => {
    if (onClaim) {
      await onClaim();
      return;
    }

    try {
      claimTx.setState("wallet");
      await mining.claim();
      claimTx.setState("submitted");
    } catch (error) {
      console.error("Erro ao resgatar recompensas eCoin:", error);
      claimTx.setState("error");
    }
  };

  const effectiveTxState =
    propClaimTxState && propClaimTxState !== "idle"
      ? propClaimTxState
      : claimTx.state;

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#D4AF37]/10 to-[#0d0d0f] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8">
      {/* Cabeçalho + Status de Mineração */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-md font-bold uppercase tracking-wider flex items-center gap-2 text-[#D4AF37]">
          <Award size={20} /> Recompensas eCoin
        </h2>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
            isMiningActive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
          }`}
        >
          <Zap size={12} />
          {isMiningActive ? "Mineração Ativa" : "Mineração Pausada"}
        </span>
      </div>

      {/* Saldo Principal Acumulado (Exclusivo em eCoin) */}
      <div className="text-center py-8 border-y border-white/5 mb-6">
        <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">
          eCoin Prontos para Saque
        </span>

        <div className="text-2xl md:text-3xl font-black text-[#D4AF37] break-all">
          {pendingECoin.toFixed(12)} <span className="text-lg">eCoin</span>
        </div>

        {ecoinPerDay > 0 && isMiningActive && (
          <p className="text-xs text-emerald-400/80 mt-2">
            Estimativa atual: +{ecoinPerDay.toFixed(6)} eCoin / dia
          </p>
        )}
      </div>

      {/* Capacidade de Gás (preview / gasCapacity / gasConsumed) */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/60 flex items-center gap-1.5 font-medium">
            <Flame size={14} className="text-[#D4AF37]" />
            Capacidade de Gás (1.3x)
          </span>
          <span className="text-white font-bold">
            {usedCapacity.toFixed(4)} / {maxCapacity.toFixed(4)} eCoin
          </span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
          <div
            className={`h-full transition-all duration-500 ${
              isGasExhausted ? "bg-red-500" : "bg-[#D4AF37]"
            }`}
            style={{ width: `${capacityPercent}%` }}
          />
        </div>

        <div className="flex justify-between text-[11px] text-white/40">
          <span>Restante: {remainingCapacity.toFixed(6)} eCoin</span>
          <span>{capacityPercent.toFixed(1)}% consumido</span>
        </div>

        {(!isMiningActive || isGasExhausted) && (
          <div className="mt-3 flex items-start gap-2 text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
            <AlertTriangle size={15} className="shrink-0 mt-0.5" />
            <span>
              Sem capacidade de gás ativa. As recompensas excedentes retornam
              automaticamente ao buffer do contrato até nova recarga de gás.
            </span>
          </div>
        )}
      </div>

      {/* Resumo de Saque (IClaimCollectorECoin) */}
      {pendingECoin > 0 && (
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Total Acumulado</span>
            <span className="font-bold text-white">
              {pendingECoin.toFixed(8)} eCoin
            </span>
          </div>

          {effectiveFeeECoin > 0 && (
            <div className="flex justify-between text-sm text-red-400">
              <span>Taxa do Collector (1%)</span>
              <span>-{effectiveFeeECoin.toFixed(8)} eCoin</span>
            </div>
          )}

          <div className="h-px bg-white/10" />

          <div className="flex justify-between text-base font-black text-emerald-400">
            <span>Rendimento Líquido</span>
            <span>{netECoin.toFixed(8)} eCoin</span>
          </div>
        </div>
      )}

      {/* Aviso de Regra Temporal (MIN_STAKE_TIME = 5m / CLAIM_COOLDOWN = 10m) */}
      {claimBlockReason && !canClaim && (
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl py-2.5 px-3">
          <Clock size={14} />
          <span>{claimBlockReason}</span>
        </div>
      )}

      {/* Botão de Claim -> chama claim() no contrato */}
      <TxButton
        state={effectiveTxState}
        idleText="SACAR RECOMPENSAS ECOIN"
        disabled={isButtonDisabled}
        className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#D4AF37] text-black hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        onClick={handleClaimRewards}
      />

      <div className="text-center text-[10px] text-white/30 mt-3 space-y-1">
        <ClaimCooldown />
        <p>Cooldown de saque: 10 min • Tempo mínimo de stake: 5 min</p>
      </div>
    </div>
  );
}