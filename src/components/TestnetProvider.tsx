"use client";

import { WagmiProvider } from "wagmi";
import { wagmiTestnetConfig } from "@/lib/wagmiTestnet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function TestnetProvider({ children }: any) {
  return (
    <WagmiProvider config={wagmiTestnetConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}