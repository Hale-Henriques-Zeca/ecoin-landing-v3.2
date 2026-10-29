
"use client";

import {
  useAccount,
  useBalance,
  useChainId,
} from "wagmi";

import { bscChain } from
  "@/components/eCoinCloudWallet/lib/chains";

export function useSmartWallet() {
  const account = useAccount();
  const chainId = useChainId();

  const balance = useBalance({
    address: account.address,
    chainId: bscChain.id,
    query: {
      enabled:
        Boolean(account.address) &&
        chainId === bscChain.id,
    },
  });

  return {
    // Conta externa actualmente ligada.
    eoaAddress: account.address,
    isConnected: account.isConnected,
    isConnecting: account.isConnecting,
    isDisconnected: account.isDisconnected,

    // Endereço da Smart Account:
    // será obtido da Factory ou do serviço ERC-4337.
    smartAccountAddress: undefined as
      `0x${string}` | undefined,

    isSmartAccountDeployed: false,

    nativeBalance: balance.data?.value,
    nativeBalanceFormatted: balance.data?.formatted,
    nativeSymbol: balance.data?.symbol,

    isCorrectNetwork: chainId === bscChain.id,
    chainId,
    isBalanceLoading: balance.isLoading,
    balanceError: balance.error,
    refetchBalance: balance.refetch,
  };
}
