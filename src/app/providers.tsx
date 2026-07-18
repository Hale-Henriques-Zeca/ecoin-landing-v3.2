"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { useState, useEffect } from "react";
import { RainbowKitProvider, getDefaultConfig, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http, fallback } from "wagmi";
import { bsc } from "@/lib/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "EdenKingDom Coin (E-Coin) DApp",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
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
});

// Criar o queryClient fora do componente ou com useState impede recriações desnecessárias
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Garante que o código só corre após a hidratação completa do cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
          {/* Só renderiza os filhos após o browser estar pronto */}
          {mounted ? children : <div className="min-h-screen bg-slate-950" />}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}