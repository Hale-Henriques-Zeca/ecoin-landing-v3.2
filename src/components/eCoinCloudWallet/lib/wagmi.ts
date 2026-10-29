
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  walletConnectWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { bscChain } from "./chains";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.warn(
    "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID não está configurado."
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "EdenKingDom Coin (eCoin) Smart Cloud Wallet",
  projectId: projectId || "00000000000000000000000000000000",
  chains: [bscChain],
  ssr: true,
  wallets: [
    {
      groupName: "Carteiras disponíveis",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        injectedWallet,
      ],
    },
  ],
});
