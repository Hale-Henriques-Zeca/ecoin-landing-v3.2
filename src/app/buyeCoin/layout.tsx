import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy E-Coin | EdenKingDom",
  description:
    "Compra e converte E-Coin através do conversor descentralizado EdenKingDom.",
};

export default function BuyEcoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen w-full bg-[#070B12]">
      {children}
    </section>
  );
}