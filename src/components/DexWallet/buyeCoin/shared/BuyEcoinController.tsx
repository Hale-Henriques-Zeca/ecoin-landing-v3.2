"use client";

import type { ReactNode } from "react";

import BuyEcoinProvider from "./BuyEcoinProvider";
import BuyEcoinLayout from "./BuyEcoinLayout";
import BuyEcoinWalletBar from "./BuyEcoinWalletBar";
import BuyEcoinErrorBoundary from "./BuyEcoinErrorBoundary";

interface BuyEcoinControllerProps {
  desktop: ReactNode;
  mobile: ReactNode;
  showWalletBar?: boolean;
  initialState?: {
    fromAsset?: string;
    toAsset?: string;
    amount?: string;
    slippage?: number;
  };
}

export default function BuyEcoinController({
  desktop,
  mobile,
  showWalletBar = true,
  initialState,
}: BuyEcoinControllerProps) {
  return (
    <BuyEcoinErrorBoundary>
      <BuyEcoinProvider initialState={initialState}>
        <BuyEcoinLayout
          header={
            showWalletBar ? (
              <div className="mx-auto w-full max-w-[1600px] px-4 py-4 md:px-8">
                <BuyEcoinWalletBar />
              </div>
            ) : null
          }
          desktop={desktop}
          mobile={mobile}
        />
      </BuyEcoinProvider>
    </BuyEcoinErrorBoundary>
  );
}