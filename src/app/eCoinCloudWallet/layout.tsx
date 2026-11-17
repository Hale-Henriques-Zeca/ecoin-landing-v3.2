import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESCW | EdenKingDom",
  description:
    "Guarde os seus activos na Carteira descentralizado da EdenKingDom.",
};

export default function WalletPage({
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