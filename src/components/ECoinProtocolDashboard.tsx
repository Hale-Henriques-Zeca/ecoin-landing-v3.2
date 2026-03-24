"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Link from "next/link";

const PROTOCOL_ADDRESS = "0xA9a40d586b868FB32916881E190a4297DEe4b4b1";

const PROTOCOL_ABI = [
  "function currentPhase() view returns (uint8)",
  "function launchTime() view returns (uint256)"
];

const PHASES = [
  "Bootstrapping",
  "Expansion",
  "Externalization",
  "Price Discovery",
  "Market Only"
];

const PHASE_DURATIONS = [
  60 * 24 * 60 * 60,
  60 * 24 * 60 * 60,
  30 * 24 * 60 * 60,
  15 * 24 * 60 * 60
];

export default function ECoinProtocolDashboard() {

  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [launchTime, setLaunchTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<any>({});
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {

    async function loadProtocol() {

      const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed.binance.org/"
      );

      const contract = new ethers.Contract(
        PROTOCOL_ADDRESS,
        PROTOCOL_ABI,
        provider
      );

      const phase = await contract.currentPhase();
      const launch = await contract.launchTime();

      setCurrentPhase(Number(phase));
      setLaunchTime(Number(launch));

    }

    loadProtocol();

  }, []);

  useEffect(() => {

    if (!launchTime) return;

    const timer = setInterval(() => {

      const now = Math.floor(Date.now() / 1000);

      let phaseStart = launchTime;

      for (let i = 0; i < currentPhase; i++) {
        phaseStart += PHASE_DURATIONS[i];
      }

      const phaseDuration =
        currentPhase < PHASE_DURATIONS.length
          ? PHASE_DURATIONS[currentPhase]
          : 0;

      const phaseEnd = phaseStart + phaseDuration;

      const remaining = phaseEnd - now;

      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      });

      const elapsed = now - phaseStart;

      const pct = (elapsed / phaseDuration) * 100;

      setProgress(Math.max(0, Math.min(100, pct)));

    }, 1000);

    return () => clearInterval(timer);

  }, [launchTime, currentPhase]);

  const nextPhase =
    currentPhase < PHASES.length - 1
      ? PHASES[currentPhase + 1]
      : "Market Only";

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">

      {/* HERO */}

      <section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">

        <div
          className="absolute inset-0 bg-gradient-to-r
          from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10"
        />

        <div className="relative z-10 max-w-3xl text-center">

          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] block mb-4">
            EdenKingDom Protocol
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            ⚙️ <span className="text-[#D4AF37]">Economic Infrastructure & Market Preparation</span>
          </h1>

          <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
            Before the official listing of <strong>E-Coin</strong> on major global exchanges,
            the <strong>EdenKingDom Protocol</strong> ecosystem is undergoing a strategic
            phase of fully on-chain economic preparation.
          </p>

        </div>
      </section>


      {/* PHASE STATUS */}

      <section className="py-20 px-6 text-center bg-gray-50">

        <h2 className="text-3xl font-semibold mb-6">
          Current Protocol Phase
        </h2>

        <p className="text-2xl font-semibold text-[#D4AF37] mb-4">
          Phase {currentPhase + 1} — {PHASES[currentPhase]}
        </p>

        <p className="text-gray-600 mb-10">
          Next Phase: <strong>{nextPhase}</strong>
        </p>

        {/* PROGRESS BAR */}

        <div className="max-w-xl mx-auto bg-gray-200 rounded-full h-3 overflow-hidden">

          <div
            className="bg-[#D4AF37] h-3 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />

        </div>

      </section>

      {/* COUNTDOWN */}

      <section className="py-20 px-6 text-center">

        <h2 className="text-3xl font-semibold mb-10">
          ⏳ Time Remaining in Current Phase
        </h2>

        <div className="grid grid-cols-4 gap-8 max-w-3xl mx-auto">

          <div>
            <p className="text-4xl font-semibold">{timeLeft.days}</p>
            <p className="text-gray-500">Days</p>
          </div>

          <div>
            <p className="text-4xl font-semibold">{timeLeft.hours}</p>
            <p className="text-gray-500">Hours</p>
          </div>

          <div>
            <p className="text-4xl font-semibold">{timeLeft.minutes}</p>
            <p className="text-gray-500">Minutes</p>
          </div>

          <div>
            <p className="text-4xl font-semibold">{timeLeft.seconds}</p>
            <p className="text-gray-500">Seconds</p>
          </div>

        </div>

      </section>

      {/* TIMELINE */}

      <section className="py-24 px-6 bg-gray-50">

        <h2 className="text-3xl font-semibold text-center mb-16">
          Protocol Growth Timeline
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">

          {PHASES.map((phase, index) => (

            <div
              key={index}
              className={`p-6 rounded-xl border ${
                index === currentPhase
                  ? "border-[#D4AF37] bg-[#D4AF37]/10"
                  : "border-gray-200"
              }`}
            >

              <p className="font-semibold">
                Phase {index + 1} — {phase}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* CTA */}

      <section className="py-24 px-6 text-center">

        <Link
          href="/ecoin-economic-phases"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full
          bg-black text-white font-semibold
          hover:bg-[#D4AF37] hover:text-black
          transition-all duration-300 shadow-lg"
        >
          Read Detailed Protocol Phases →
        </Link>

      </section>

      <section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">

        <div
          className="absolute inset-0 bg-gradient-to-r
          from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10"
        />

        <div className="relative z-10 max-w-3xl text-center">


          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            ⚙️ <span className="text-[#D4AF37]">Market Price — PancakeSwap Liquidity Added in the Market Only Phase</span>
          </h1>

          <p className="mb-3">

After the completion of the protocol’s Phases internal economic preparation
phases, the E-Coin ecosystem transitions into the first stage of
external market interaction through a <strong>pre-listing liquidity
deployment on PancakeSwap</strong>.

</p>

        </div>
        
        
      </section>

{/* CTA */}

      <section className="py-24 px-6 text-center">

        <Link
          href="/Market-Only-phase"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full
          bg-black text-white font-semibold
          hover:bg-[#D4AF37] hover:text-black
          transition-all duration-300 shadow-lg"
        >
          Explore — the Market Price Only Phase →
        </Link>

      </section>
      {/* LINK */}

{/* ================= PANCAKESWAP PANEL ================= */}

<div className="bg-black text-white p-8 rounded-xl mt-10 text-center">

<h3 className="text-1xl text-[#D4AF37] font-semibold mb-4">
E-Coin / USDT Pair — PancakeSwap
</h3>

<p className="mb-6">

The E-Coin pair is already pre-listed on PancakeSwap and waiting for
sustainable liquidity before entering full market activity.

</p>

<a
href="https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964&outputCurrency=0x55d398326f99059fF775485246999027B3197955"
target="_blank"
className="inline-block px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-full hover:bg-white transition"
>

Access E-Coin / USDT Pair →

</a>

</div>
    </main>
  );
}