"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  BatteryCharging,
  Coins,
} from "lucide-react";

type Props = {
  gasBalance: number;
  maxCapacity: number;
  usedCapacity: number;
  remainingCapacity: number;
  willMine: boolean;
  stakeActive: boolean;
};

export default function GasCapacityPanel({
  gasBalance,
  maxCapacity,
  usedCapacity,
  remainingCapacity,
  willMine,
  stakeActive,
}: Props) {

  // PROGRESSO DO TETO DE DIVIDENDOS (ROI 130%)
  const roiProgress =
    maxCapacity > 0
      ? (usedCapacity / maxCapacity) * 100
      : 0;

  const formatGas = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}k`;
    }

    return value.toFixed(9);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#D4AF37]/20
        bg-white/5
        backdrop-blur-xl
        p-6
        mb-8
      "
    >
      {/* BACKGROUND FX */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        ">
          <div className="flex items-center gap-3">
            <div className="
              w-14
              h-14
              rounded-2xl
              bg-[#D4AF37]/10
              flex
              items-center
              justify-center
            ">
              <Coins
                size={24}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <h2 className="text-white text-xl font-black">
                Motor de Capacidade CS & Dividendos
              </h2>

              <p className="text-xs text-white/40">
                Controlador de limite do Selo de Compromisso (CS)
              </p>
            </div>
          </div>

          {/* STATUS DO SHAREHOLDER */}
          <div
            className={`
              flex
              items-center
              gap-2
              px-3
              py-1
              rounded-full
              text-[10px]
              sm:text-xs
              font-bold
              border
              ${
                stakeActive
                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  : "bg-gray-500/10 text-gray-400 border-gray-500/20"
              }
            `}
          >
            <ShieldCheck size={14} />
            {stakeActive ? "SHAREHOLDER ATIVO" : "SHAREHOLDER INATIVO"}
          </div>
        </div>

        {/* BALANÇO CS */}
        <div className="
          mb-6
          rounded-2xl
          border
          border-[#D4AF37]/10
          bg-black/20
          p-4
        ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BatteryCharging
                size={18}
                className="text-[#D4AF37]"
              />

              <span className="text-white/50 text-sm">
                Saldo de Capacidade CS
              </span>
            </div>

            <span className="
              text-[#00FF9C]
              text-lg
              font-black
            ">
              {formatGas(gasBalance)}
            </span>
          </div>
        </div>

        {/* GRID DE CAPACIDADES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* TETO MÁXIMO */}
          <div className="
            rounded-2xl
            border
            border-[#D4AF37]/10
            bg-black/20
            p-5
          ">
            <p className="text-white/40 text-xs uppercase mb-2">
              Teto Máximo (130% ROI)
            </p>

            <h2 className="
              text-2xl
              font-black
              text-[#D4AF37]
            ">
              {maxCapacity.toFixed(9)}
            </h2>

            <p className="text-[10px] text-white/30 mt-1">
              Limite máximo de recebimento CS
            </p>
          </div>

          {/* CONSUMIDO */}
          <div className="
            rounded-2xl
            border
            border-red-500/10
            bg-red-500/5
            p-5
          ">
            <p className="text-white/40 text-xs uppercase mb-2">
              Capacidade Consumida
            </p>

            <h2 className="
              text-2xl
              font-black
              text-red-400
            ">
              {usedCapacity.toFixed(9)}
            </h2>

            <p className="text-[10px] text-white/30 mt-1">
              Dividendos já debitados da CS
            </p>
          </div>

          {/* RESTANTE */}
          <div className="
            rounded-2xl
            border
            border-green-500/10
            bg-green-500/5
            p-5
          ">
            <p className="text-white/40 text-xs uppercase mb-2">
              Capacidade Restante
            </p>

            <h2 className="
              text-2xl
              font-black
              text-green-400
            ">
              {remainingCapacity.toFixed(9)}
            </h2>

            <p className="text-[10px] text-white/30 mt-1">
              Direitos de dividendo restantes
            </p>
          </div>

        </div>

        {/* ROI PROGRESS */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <div className="
              flex
              items-center
              gap-2
              text-white/50
              text-xs
              uppercase
            ">
              <TrendingUp size={14} />
              Progresso do Teto CS (130%)
            </div>

            <span className="
              text-white
              text-xs
              font-bold
            ">
              {roiProgress.toFixed(2)}%
            </span>
          </div>

          <div className="
            w-full
            h-4
            bg-white/10
            rounded-full
            overflow-hidden
          ">
            <motion.div
              animate={{
                width: `${roiProgress}%`,
              }}
              transition={{
                duration: 1.2,
              }}
              className="
                h-full
                bg-gradient-to-r
                from-green-400
                via-yellow-400
                to-red-500
              "
            />
          </div>

          <div className="
            mt-3
            flex
            justify-between
            text-[10px]
            text-white/30
          ">
            <span>0%</span>
            <span>Esgotamento da Capacidade CS</span>
            <span>100% (Teto ROI)</span>
          </div>
        </div>

        {/* STATUS PANEL */}
        <div
          className={`
            mt-8
            rounded-2xl
            border
            p-5
            ${
              remainingCapacity <= 0
                ? "border-red-500/20 bg-red-500/5"
                : willMine
                  ? "border-green-500/20 bg-green-500/5"
                  : "border-red-500/20 bg-red-500/5"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                className={`
                  text-sm
                  font-black
                  ${
                    remainingCapacity <= 0
                      ? "text-red-400"
                      : willMine
                        ? "text-green-400"
                        : "text-red-400"
                  }
                `}
              >
                {willMine
                  ? "🟢 Distribuição de Dividendos Ativa"
                  : "🔴 Distribuição de Dividendos Pausada"}
              </h3>

              <p className="text-[11px] text-white/40 mt-1">
                {remainingCapacity <= 0
                  ? "Os dividendos excederam a sua capacidade CS. Recarregue seu Selo de Compromisso para continuar a receber."
                  : willMine
                    ? "Capacidade CS disponível para crédito regular de dividendos."
                    : stakeActive
                      ? "Adquira mais Capacidade CS para retomar o recebimento dos rendimentos."
                      : "Ative sua posição de Shareholder para liberar o recebimento."}
              </p>
            </div>
          </div>
        </div>

        {/* OVERFLOW PROTECTION */}
        <div className="
          mt-6
          rounded-2xl
          border
          border-cyan-500/20
          bg-cyan-500/5
          p-5
        ">
          <div className="flex items-start gap-3">
            <div className="
              w-12
              h-12
              rounded-xl
              bg-cyan-500/10
              flex
              items-center
              justify-center
              text-lg
            ">
              ♻️
            </div>

            <div className="flex-1">
              <h3 className="text-cyan-400 font-black text-sm uppercase tracking-wide">
                Proteção de Overflow de Dividendos Ativa
              </h3>

              <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
                Dividendos excedentes que ultrapassarem sua Capacidade CS atual são automaticamente reciclados e re-injetados na pool de recompensas do protocolo em vez de serem perdidos.
              </p>

              {remainingCapacity <= 0 && (
                <div className="
                  mt-3
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1
                  rounded-full
                  bg-cyan-500/10
                  border
                  border-cyan-500/20
                  text-cyan-300
                  text-[10px]
                  font-bold
                  uppercase
                ">
                  ♻ Reciclagem Automática de Dividendos Ativada
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}