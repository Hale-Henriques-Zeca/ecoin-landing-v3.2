"use client";

import React from "react";
import EfteExchangeCTA from "@/components/CTA/EfteExchangeCTA/EfteExchangeCTA";
import EPayAgentCTA from "@/components/CTA/EPayAgentCTA/EPayAgentCTA";
import ECoinPancakeSwapPairCTA from "@/components/CTA/ECoinPancakeSwapPairCTA/ECoinPancakeSwapPairCTA";

export default function EBCConvertPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Cabeçalho da Página */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-400 to-blue-500">
            eCoin Official Gateways & Exchange
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Escolha o portal ideal para realizar suas operações de compra, venda, swap na PancakeSwap ou saque para dinheiro físico via Agentes Licenciados ePay.
          </p>
        </div>

        {/* CARD 1: EFTE Exchange Web3 */}
        <section className="w-full">
          <EfteExchangeCTA />
        </section>

        {/* CARD 2: ePay Cash Out Gateway */}
        <section className="w-full">
          <EPayAgentCTA />
        </section>

        {/* CARD 3: PancakeSwap Liquidity CTA */}
        <section className="w-full">
          <ECoinPancakeSwapPairCTA />
        </section>
      </div>
    </main>
  );
}