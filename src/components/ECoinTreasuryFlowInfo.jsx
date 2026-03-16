"use client";

import Link from "next/link";

export default function ECoinTreasuryFlowInfo() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col">

      {/* ================= HERO ================= */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r
          from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10"
        />
        <div className="relative z-10 max-w-4xl text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] block mb-4">
            EdenKingDom Protocol
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            💰 <span className="text-[#D4AF37]">E-Coin Treasury & Liquidity Flow</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm md:text-base">
            Entenda como o <strong>protocolo E-Coin</strong> gerencia as conversões, taxas,
            staking, buyback e cobertura de liquidez para garantir sustentabilidade.
          </p>
          <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm md:text-base">
            Todo o fluxo é gerido através dos contratos <strong>TreasuryVault</strong>,
            <strong>LiquidityReserveVault</strong> e <strong>ConvertFeeCollector</strong>.
          </p>
        </div>
      </section>

      

      {/* ================= CTA BUTTON ================= */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <Link
          href="/ECoin-Treasury-Flow-Info"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full
          bg-black text-white font-semibold
          hover:bg-[#D4AF37] hover:text-black
          transition-all duration-300 shadow-lg"
        >
          Explorar E-Coin Treasury & Liquidity Flow →
        </Link>
      </section>

    </main>
  );
}