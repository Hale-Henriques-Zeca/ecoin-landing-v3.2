"use client";

import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from '@rainbow-me/rainbowkit';

import {
  WagmiProvider,
} from 'wagmi';

import { bsc } from '@/lib/chains';

import { QueryClient, QueryClientProvider }
from '@tanstack/react-query';

import { http } from "wagmi";

const config = getDefaultConfig({

  appName: 'EdenKingDom Coin (E-Coin) DApp',

  projectId:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

  chains: [bsc],

  transports: {

    [bsc.id]: http(
      'https://bsc-dataseed.binance.org'
    ),

  },

});

const queryClient = new QueryClient();

export function Providers({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <WagmiProvider config={config}>

      <QueryClientProvider client={queryClient}>

        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#F9D13E',
            accentColorForeground: '#000000',
            borderRadius: 'large',
            fontStack: 'rounded',
          })}
        >

          {children}

        </RainbowKitProvider>

      </QueryClientProvider>

    </WagmiProvider>
  );
}