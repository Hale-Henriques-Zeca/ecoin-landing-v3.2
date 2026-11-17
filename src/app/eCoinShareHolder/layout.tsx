import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Coin Holders | EdenKingDom",
  description:
    "Asegure eCons e ganhe dividendos da EdenKingDom.",
};

export default function MiningPortal({
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