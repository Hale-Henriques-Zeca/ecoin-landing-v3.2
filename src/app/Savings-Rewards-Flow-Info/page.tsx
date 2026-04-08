"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Network,
  Coins,
  ArrowRightLeft,
  Layers,
  ShieldCheck,
  Activity,
} from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative px-6 py-28 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="uppercase tracking-[0.4em] text-xs text-[#D4AF37] block mb-6">
            E-Coin Neural Web3 Mining Engine
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
            ⛏️ The <span className="text-[#D4AF37]">Real Source</span> of Mining Rewards
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            This is not inflation. This is not artificial yield.
            Every reward distributed in the E-Coin Mining Panel
            comes from real economic activity happening inside
            the ecosystem — every millisecond.
          </p>
        </div>
      </section>

      {/* ================= CORE IDEA ================= */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">

          <h2 className="text-2xl font-semibold text-[#D4AF37]">
            ⚡ You Are Not Just Staking — You Are Mining Cashflow
          </h2>

          <p className="text-gray-400">
            When you stake your E-Coin inside the Savings Interface,
            you are not waiting for inflation rewards.
          </p>

          <p className="text-gray-400">
            You are connecting directly to a global financial engine
            that generates revenue from:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8 text-left">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <Cpu className="text-[#D4AF37] mb-3" />
              <p>Forex AI Trading Bots</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <Activity className="text-[#D4AF37] mb-3" />
              <p>Crypto Arbitrage Systems</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <ArrowRightLeft className="text-[#D4AF37] mb-3" />
              <p>On-Chain Conversions</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <Coins className="text-[#D4AF37] mb-3" />
              <p>Claim & Redemption Fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FLOW ================= */}
      <section className="px-6 py-24 bg-white/5 text-center">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-semibold mb-12">
            🔄 The Mining Reward Flow
          </h2>

          <div className="space-y-10 text-gray-300">

            <div>
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">
                1. ecGas Injection (Fuel of the System)
              </h3>
              <p>
                Every time a user buys ecGas using USDT,
                <strong> 5% is instantly injected into the Mining Pool.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">
                2. Trading Activity (Main Revenue Engine)
              </h3>
              <p>
                Trading bots generate profits and charge (0.70% ecGas) fees per trade.
                <strong> 20% of trading fees flow directly to miners.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">
                3. Claims & Redeems 
              </h3>
              <p>
                Every time someone withdraws or claims rewards (1%) and ecGas Redeem (10%) fee is charged,
                <strong> 20% of that fee returns to the Mining reward pool.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">
                4. Continuous Distribution
              </h3>
              <p>
                The system distributes rewards instantly to all stakers
                based on participation share.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= NETWORK SYSTEM ================= */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-semibold mb-10">
            🌐 3-Level Referral Engine (E-Network)
          </h2>

          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-300">

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <Network className="text-[#D4AF37] mb-3" />
              <p>Level 1 → 7.5%</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <Network className="text-[#D4AF37] mb-3" />
              <p>Level 2 → 1.5%</p>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <Network className="text-[#D4AF37] mb-3" />
              <p>Level 3 → 1%</p>
            </div>

          </div>

          <p className="mt-8 text-gray-400">
            Every action in your network generates passive income:
            trading, claims, gas usage and ecosystem activity.
          </p>
        </div>
      </section>

      {/* ================= SUSTAINABILITY ================= */}
      <section className="px-6 py-24 bg-white/5 text-center">
        <div className="max-w-3xl mx-auto space-y-6">

          <h2 className="text-3xl font-semibold">
            🛡️ Self-Sustaining Mining Loop
          </h2>

          <p className="text-gray-400">
            The system is designed as a perpetual economic cycle:
          </p>

          <div className="space-y-3 text-gray-300">
            <p>• Gas enters → fuels trading</p>
            <p>• Trading generates fees</p>
            <p>• Fees feed the mining pool</p>
            <p>• Users claim → part returns to pool</p>
            <p>• Cycle repeats infinitely</p>
          </div>

          <p className="text-[#D4AF37] font-semibold mt-4">
            No inflation. Only real economic activity.
          </p>

        </div>
      </section>

      {/* ================= FINAL ================= */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">

          <h2 className="text-3xl font-semibold">
            ⚡ The Truth About E-Coin Mining
          </h2>

          <p className="text-gray-400">
            You are not mining tokens from nothing.
          </p>

          <p className="text-gray-400">
            You are mining the fees of a global financial system.
          </p>

          <p className="text-gray-400">
            Every millisecond of activity generates value.
          </p>

          <p className="text-[#D4AF37] font-semibold text-lg">
            And your stake is your share of that flow.
          </p>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6 text-center">

        <Link
          href="/Savings"
          target="_blank"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full
          bg-[#D4AF37] text-black font-semibold
          hover:bg-white hover:text-black
          transition-all duration-300 shadow-lg"
        >
          Start Mining Now ⛏️
        </Link>

      </section>

    </main>
  );
}