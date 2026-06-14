"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultConfig, darkTheme, } from "@rainbow-me/rainbowkit";

import { WagmiProvider, } from "wagmi";

import { bsc } from "@/lib/chains";

import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

import { http, fallback, } from "wagmi";

const config = getDefaultConfig({

  appName:
    "EdenKingDom Coin (E-Coin) DApp",

  projectId:
    process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

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

const queryClient =
  new QueryClient();

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <WagmiProvider config={config}>

      <QueryClientProvider
        client={queryClient}
      >

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

  );
}