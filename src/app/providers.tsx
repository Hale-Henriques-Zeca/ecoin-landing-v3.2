
"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import "@rainbow-me/rainbowkit/styles.css";

import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  WagmiProvider,
  http,
  fallback,
} from "wagmi";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { bsc } from "@/lib/chains";
import { LanguageProvider } from "@/components/language/i18n/context/LanguageProvider";

const config = getDefaultConfig({
  appName: "EdenKingDom Coin (E-Coin) DApp",

  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",

  chains: [bsc],

  transports: {
    [bsc.id]: fallback([
      http("https://bsc-dataseed.binance.org"),
      http("https://bsc-dataseed1.defibit.io"),
      http("https://bsc-dataseed1.ninicoin.io"),
      http("https://rpc.ankr.com/bsc"),
      http("https://bsc-rpc.publicnode.com"),
      http("https://1rpc.io/bnb"),
    ]),
  },

  // Importante para a hidratação do Wagmi em Next.js.
  ssr: true,
});

export function Providers({
  children,
}: {
  children: ReactNode;
}) {
  // Uma instância estável por montagem do Providers.
  const [queryClient] = useState(
    () => new QueryClient()
  );

  return (
    <LanguageProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#F9D13E",
              accentColorForeground: "#000000",
              borderRadius: "large",
              fontStack: "rounded",
            })}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </LanguageProvider>
  );
}
