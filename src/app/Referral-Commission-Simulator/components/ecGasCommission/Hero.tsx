"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  Users,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Coins,
  Crown,
  Award,
} from "lucide-react";
import { useMemo, useState } from "react";

export interface HeroProps {
  onChange?: (data: {
    purchase: number;
    referralPool: number;
    l1: number;
    l2: number;
    l3: number;
  }) => void;
}

export default function Hero({ onChange }: HeroProps) {
  const [purchase, setPurchase] = useState(1000);

  const values = useMemo(() => {
    const referralPool = purchase * 0.2;

    const l1 = referralPool * 0.7;
    const l2 = referralPool * 0.2;
    const l3 = referralPool * 0.1;

    return {
      purchase,
      referralPool,
      l1,
      l2,
      l3,
    };
  }, [purchase]);

  useMemo(() => {
    onChange?.(values);
  }, [values, onChange]);

  const Stat = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    subtitle: string;
    icon: any;
    color: string;
  }) => (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-[#111114]
      p-6
      shadow-xl
      "
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at top right, ${color}, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center justify-between">

        <div>

          <p className="uppercase tracking-[0.25em] text-[10px] text-white/40 font-bold">

            {title}

          </p>

          <h3
            className="text-3xl font-black mt-3"
            style={{
              color,
            }}
          >
            {value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}

            <span className="text-base ml-1">
              USD
            </span>

          </h3>

          <p className="text-xs mt-2 text-white/45">

            {subtitle}

          </p>

        </div>

        <div
          className="
          w-16
          h-16
          rounded-2xl
          flex
          items-center
          justify-center
          border
          border-white/10
          "
          style={{
            background: `${color}20`,
          }}
        >
          <Icon
            size={28}
            style={{
              color,
            }}
          />
        </div>

      </div>
    </motion.div>
  );

  return (

    <section className="space-y-8">

      <motion.div

        initial={{
          opacity: 0,
          y: 25,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.45,
        }}

        className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-[#D4AF37]/20
        bg-gradient-to-br
        from-[#D4AF37]/10
        via-[#111114]
        to-black
        p-8
        shadow-[0_30px_80px_rgba(0,0,0,.45)]
        "
      >

        <div className="absolute right-0 top-0 w-80 h-80 rounded-full blur-[120px] bg-[#D4AF37]/10" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-2">

            <Coins
              size={16}
              className="text-[#D4AF37]"
            />

            <span className="uppercase tracking-[0.25em] text-[10px] font-bold text-[#D4AF37]">

              ecGas Referral Calculator

            </span>

          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight leading-tight">

            Referral

            <span className="text-[#D4AF37]">

              {" "}Commission{" "}

            </span>

            Simulator

          </h1>

          <p className="max-w-3xl mt-5 text-white/60 leading-8">

            Simule instantaneamente quanto um líder pode receber pelas
            compras de ecGas da sua rede de afiliados.

            O cálculo segue exatamente o contrato inteligente:

            <span className="text-[#D4AF37] font-bold">

              {" "}20% Referral Pool → 70% / 20% / 10%.

            </span>

          </p>

          <div className="mt-10 grid lg:grid-cols-2 gap-10">

            <div>

              <p className="uppercase tracking-[0.2em] text-xs text-white/50 font-bold mb-4">

                Valor da Compra ecGas

              </p>

              <div className="relative">

                <input
                  type="number"
                  min={1}
                  value={purchase}
                  onChange={(e) =>
                    setPurchase(Number(e.target.value))
                  }
                  className="
                  w-full
                  rounded-2xl
                  bg-black/50
                  border
                  border-white/10
                  px-6
                  py-6
                  text-4xl
                  font-black
                  outline-none
                  focus:border-[#D4AF37]
                  transition
                  "
                />

                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 font-bold">

                  USD

                </div>

              </div>

              <div className="grid grid-cols-4 gap-3 mt-5">

                {[1,10,100,1000].map((v)=>(
                  <button
                    key={v}
                    onClick={()=>setPurchase(v)}
                    className="
                    py-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    hover:bg-[#D4AF37]
                    hover:text-black
                    transition
                    font-bold
                    "
                  >
                    {v}
                  </button>
                ))}

              </div>

            </div>

            <div className="rounded-3xl bg-black/30 border border-white/10 p-6">

              <div className="flex items-center gap-3">

                <Wallet className="text-[#D4AF37]" />

                <h3 className="font-black text-xl">

                  Resultado Geral

                </h3>

              </div>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between items-center">

                  <span className="text-white/60">

                    Compra ecGas

                  </span>

                  <strong className="text-2xl">

                    {values.purchase.toLocaleString()} USD

                  </strong>

                </div>

                <div className="flex justify-between items-center">

                  <span className="text-white/60">

                    Referral Pool (20%)

                  </span>

                  <strong className="text-[#D4AF37] text-2xl">

                    {values.referralPool.toFixed(2)} USD

                  </strong>

                </div>

                <div className="h-px bg-white/10" />
                <div className="flex items-center justify-between">

                  <span className="text-white/60 flex items-center gap-2">
                    <ArrowRight
                      size={16}
                      className="text-emerald-400"
                    />
                    Distribuição Total
                  </span>

                  <strong className="text-emerald-400 text-2xl font-black">
                    {values.referralPool.toFixed(2)} USD
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

      {/* ===================================================== */}
      {/*                DISTRIBUIÇÃO DOS LÍDERES               */}
      {/* ===================================================== */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">

        <Stat
          title="Líder Nível 1"
          value={values.l1}
          subtitle="70% do Referral Pool (14% da Compra)"
          icon={Crown}
          color="#D4AF37"
        />

        <Stat
          title="Líder Nível 2"
          value={values.l2}
          subtitle="20% do Referral Pool (4% da Compra)"
          icon={Award}
          color="#06B6D4"
        />

        <Stat
          title="Líder Nível 3"
          value={values.l3}
          subtitle="10% do Referral Pool (2% da Compra)"
          icon={Users}
          color="#10B981"
        />

        <Stat
          title="Total Distribuído"
          value={values.referralPool}
          subtitle="100% do Referral Pool"
          icon={TrendingUp}
          color="#F97316"
        />

      </div>

      {/* ===================================================== */}
      {/*               RESUMO DO SMART CONTRACT               */}
      {/* ===================================================== */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: .45,
        }}

        className="
        rounded-3xl
        border
        border-white/10
        bg-[#111114]
        p-8
        "
      >

        <div className="flex items-center gap-3 mb-8">

          <DollarSign
            className="text-[#D4AF37]"
          />

          <h2 className="text-2xl font-black">

            Como o Smart Contract Calcula

          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="rounded-2xl bg-black/30 p-6 border border-white/5">

            <p className="uppercase text-xs tracking-[0.2em] text-white/40 mb-3">

              Passo 1

            </p>

            <h3 className="font-black text-lg mb-3">

              Compra ecGas

            </h3>

            <div className="text-4xl font-black text-[#D4AF37]">

              {values.purchase.toLocaleString()}

            </div>

            <p className="text-white/50 mt-2">

              USD

            </p>

          </div>

          <div className="rounded-2xl bg-black/30 p-6 border border-white/5">

            <p className="uppercase text-xs tracking-[0.2em] text-white/40 mb-3">

              Passo 2

            </p>

            <h3 className="font-black text-lg mb-3">

              Referral Pool

            </h3>

            <div className="text-4xl font-black text-emerald-400">

              20%

            </div>

            <p className="text-white/50 mt-2">

              {values.referralPool.toFixed(2)} USD

            </p>

          </div>

          <div className="rounded-2xl bg-black/30 p-6 border border-white/5">

            <p className="uppercase text-xs tracking-[0.2em] text-white/40 mb-3">

              Passo 3

            </p>

            <h3 className="font-black text-lg mb-3">

              Distribuição

            </h3>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">

                <span>L1</span>

                <span className="text-[#D4AF37]">

                  70%

                </span>

              </div>

              <div className="flex justify-between">

                <span>L2</span>

                <span className="text-cyan-400">

                  20%

                </span>

              </div>

              <div className="flex justify-between">

                <span>L3</span>

                <span className="text-emerald-400">

                  10%

                </span>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </section>

  );

}