import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking | EdenKingDom",
  description:
    "Acompanhe em tempo real o Ranking On-Chain da EdenKingDom na BNB Smart Chain: ecnTrader (Top Margin, Live Profit, Top Gainers), Comissões de Referência em 3 Níveis (L1, L2, L3) e ecGas & VIP.",
};

export default function RankingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen w-full bg-[#070B12] text-white selection:bg-[#D4AF37] selection:text-black">
      {children}
    </section>
  );
}