"use client";

import type { ReactNode } from "react";

interface BuyEcoinLayoutProps {
  desktop: ReactNode;
  mobile: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export default function BuyEcoinLayout({
  desktop,
  mobile,
  header,
  footer,
}: BuyEcoinLayoutProps) {
  return (
    <main className="min-h-screen w-full bg-[#070B12] text-white">
      {header}

      <div className="hidden md:block w-full">
        {desktop}
      </div>

      <div className="block md:hidden w-full">
        {mobile}
      </div>

      {footer}
    </main>
  );
}