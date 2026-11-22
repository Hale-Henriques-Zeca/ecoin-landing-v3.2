"use client";

import { Award, Flame, Zap, AlertTriangle, Clock } from "lucide-react";
import TxButton from "@/components/TxButton";
import ClaimCooldown from "@/components/ClaimCooldown";

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
  pendingECoin = 0,
  withdrawFeeECoin = 0,
  withdrawNetECoin,
  isMiningActive = false,
  usedCapacity = 0,
  maxCapacity = 0,
  remainingCapacity = 0,
  ecoinPerDay = 0,
  canClaim = true,
  claimBlockReason,
  claimTxState = "idle",
  onClaim,
}: RecompensasTabProps) {
  const netECoin =
    withdrawNetECoin !== undefined
      ? withdrawNetECoin
      : Math.max(0, pendingECoin - withdrawFeeECoin);

  const capacityPercent =
    maxCapacity > 0 ? Math.min(100, (usedCapacity / maxCapacity) * 100) : 0;

  const isGasExhausted = maxCapacity > 0 && remainingCapacity <= 0;
  const isButtonDisabled = pendingECoin <= 0 || !canClaim;

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

          {withdrawFeeECoin > 0 && (
            <div className="flex justify-between text-sm text-red-400">
              <span>Taxa do Collector</span>
              <span>-{withdrawFeeECoin.toFixed(8)} eCoin</span>
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
        state={claimTxState}
        idleText="SACAR RECOMPENSAS ECOIN"
        disabled={isButtonDisabled}
        className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#D4AF37] text-black hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        onClick={onClaim}
      />

      <div className="text-center text-[10px] text-white/30 mt-3 space-y-1">
        <ClaimCooldown />
        <p>Cooldown de saque: 10 min • Tempo mínimo de stake: 5 min</p>
      </div>
    </div>
  );
}