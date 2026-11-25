import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Coin Airdrop | EdenKingDom",
  description:
    "Minere E-Coin e E-USD continuamente durante 30 dias por temporada na BNB Smart Chain e ganhe comissões de referência em 3 níveis na EdenKingDom.",
};

export default function MiningPortal({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen w-full bg-[#070B12] text-white selection:bg-[#D4AF37]/30 selection:text-[#F9D13E]">
      {children}
    </section>
  );
}