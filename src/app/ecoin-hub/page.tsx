"use client";

import dynamic from 'next/dynamic';
import ConverterCard from "@/components/ConverterCard";
import RechargeCard from "@/components/RechargeCard";

// Carregamento Dinâmico para componentes que usam bibliotecas pesadas ou de Node (PDF, etc)
const GasSupportEngine = dynamic(() => import("@/components/nexus/GasSupportEngine"), { ssr: false });
const QRClaimEngine = dynamic(() => import("@/components/nexus/QRClaimEngine"), { ssr: false });
const PaymentEngine = dynamic(() => import("@/components/nexus/PaymentEngine"), { ssr: false });
const InvoiceEngine = dynamic(() => import("@/components/nexus/InvoiceEngine"), { ssr: false });
const GiftCardMarket = dynamic(() => import("@/components/nexus/GiftCardMarket"), { ssr: false });
const BridgeEngine = dynamic(() => import("@/components/nexus/BridgeEngine"), { ssr: false });
const FlexibleWallet = dynamic(() => import("@/components/nexus/FlexibleWallet"), { ssr: false });
const UtilityPayments = dynamic(() => import("@/components/nexus/UtilityPayments"), { ssr: false });

export default function ECoinHubPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-[#D4AF37] mb-3 block">BEM VINDO A E-COIN HUB</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--blue)] mb-4">
            Sem <span className="text-[#D4AF37]">BNB</span> Não Há Transações — Converta Aqui
          </h2>
        </div>
      </section>

      {/* ================= CONVERTER ================= */}
      <section id="converter" className="pb-24 pt-16">
        <ConverterCard />
      </section>

      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-[#D4AF37] mb-3 block">E-Coin Nexus</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--blue)] mb-4">
            Aqui tu podes: <span className="text-[#D4AF37]"> Fazer pagamentos de Contas diversos</span>, ter acesso a: 
            <span className="text-[#D4AF37]"> bridge, ramps, gas assistance, comprar gift cards, serviços, QR transfers, faturação, wallet flexível</span>, e mais.
          </h2>
        </div>
      </section>

      {/* ================= SECTIONS ================= */}
      <section className="py-16 bg-gray-50"><RechargeCard /></section>
      <section className="py-16 bg-gray-50"><GasSupportEngine/></section>
      <section className="py-16 bg-gray-50"><QRClaimEngine/></section>
      <section className="py-16 bg-gray-50"><PaymentEngine/></section>
      <section className="py-16 bg-gray-50"><InvoiceEngine /></section>
      <section className="py-16 bg-gray-50"><GiftCardMarket/></section>
      <section className="py-16 bg-gray-50"><BridgeEngine/></section>
      <section className="py-16 bg-gray-50"><FlexibleWallet/></section>
      <section className="py-16 bg-gray-50"><UtilityPayments/></section>
    </div>
  );
}
