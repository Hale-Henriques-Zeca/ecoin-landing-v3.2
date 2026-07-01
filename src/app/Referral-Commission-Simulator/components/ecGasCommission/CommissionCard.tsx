"use client";

import { motion } from "framer-motion";
import {
  LucideIcon,
  ArrowUpRight,
} from "lucide-react";

interface CommissionCardProps {

  title: string;

  value: number;

  percentage: number;

  subtitle: string;

  color: string;

  icon: LucideIcon;

  currency?: string;

  delay?: number;

}

export default function CommissionCard({

  title,

  value,

  percentage,

  subtitle,

  color,

  icon: Icon,

  currency = "USD",

  delay = 0,

}: CommissionCardProps) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 25,
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
        delay,
      }}

      whileHover={{
        y: -8,
        scale: 1.02,
      }}

      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-[#111114]
      shadow-xl
      p-6
      transition-all
      "
    >

      {/* Glow */}

      <div

        className="absolute inset-0 opacity-10"

        style={{

          background: `radial-gradient(circle at top right, ${color}, transparent 70%)`

        }}

      />

      {/* Header */}

      <div className="relative flex items-center justify-between">

        <div>

          <p className="uppercase tracking-[0.25em] text-[10px] text-white/40 font-bold">

            {title}

          </p>

          <h2

            className="mt-4 text-4xl font-black"

            style={{

              color,

            }}

          >

            {value.toLocaleString(undefined,{

              minimumFractionDigits:2,

              maximumFractionDigits:2,

            })}

          </h2>

          <span className="text-white/40 text-sm">

            {currency}

          </span>

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

            background:`${color}20`

          }}

        >

          <Icon

            size={30}

            style={{

              color,

            }}

          />

        </div>

      </div>

      {/* Divider */}

      <div className="my-6 h-px bg-white/10" />

      {/* Footer */}

      <div className="flex items-center justify-between">

        <div>

          <div

            className="text-2xl font-black"

            style={{

              color,

            }}

          >

            {percentage.toFixed(2)}%

          </div>

          <p className="text-xs text-white/45 mt-1">

            {subtitle}

          </p>

        </div>

        <div

          className="
          flex
          items-center
          gap-2
          text-xs
          font-bold
          "

          style={{

            color,

          }}

        >

          Smart Contract

          <ArrowUpRight size={15} />

        </div>

      </div>

    </motion.div>

  );

}