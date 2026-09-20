"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useAccount, useReadContract, useBalance } from "wagmi";
import { erc20Abi } from "viem";
import { CONTRACTS, GOVERNANCE_SAFE } from "@/config/dexContracts";
import { bsc } from '@/lib/chains';

type DexWalletState = {
  address?: string;
  isConnected: boolean;
  isOwner: boolean;
  hideBalance: boolean;
  toggleHideBalance: () => void;
  isLoading: boolean;

  balances: {
    ecoin: bigint;
    eusd: bigint;
    bnb: bigint;
    usdt: bigint;
  };

  swapPaused: boolean;
  refresh: () => void;
};

const DexWalletContext = createContext<DexWalletState | null>(null);

export function DexWalletProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const [hideBalance, setHideBalance] = useState<boolean>(false);

  /* ---------------- PRIVACY TOGGLE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem("dex_hide_balance");
    if (saved !== null) setHideBalance(saved === "true");
  }, []);

  const toggleHideBalance = () => {
    setHideBalance((prev) => {
      const next = !prev;
      localStorage.setItem("dex_hide_balance", String(next));
      return next;
    });
  };

  /* ---------------- OWNER CHECK ---------------- */
  const isOwner =
    !!address &&
    address.toLowerCase() === GOVERNANCE_SAFE.toLowerCase();

  /* ---------------- BALANCES ---------------- */
  const ecoin = useReadContract({
    address: CONTRACTS.ECOIN as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const eusd = useReadContract({
    address: CONTRACTS.EUSD as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const bnbBalance = useBalance({
    address,
    query: { enabled: !!address },
  });

  const usdtBalance = useReadContract({
    address: CONTRACTS.USDT as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    chainId: bsc.id,
    query: { enabled: !!address },
  });

  const isLoading =
    ecoin.isLoading || eusd.isLoading || bnbBalance.isLoading || usdtBalance.isLoading;

  /* ---------------- REFRESH ---------------- */
  function refresh() {
    ecoin.refetch();
    eusd.refetch();
    usdtBalance.refetch();
    bnbBalance.refetch();
  }

  return (
    <DexWalletContext.Provider
      value={{
        address,
        isConnected,
        isOwner,
        hideBalance,
        toggleHideBalance,
        isLoading,
        balances: {
          ecoin: ecoin.data ?? 0n,
          eusd: eusd.data ?? 0n,
          bnb: bnbBalance.data?.value ?? 0n,
          usdt: usdtBalance.data ?? 0n,
        },
        swapPaused: false,
        refresh,
      }}
    >
      {children}
    </DexWalletContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */
export function useDexWallet() {
  const ctx = useContext(DexWalletContext);
  if (!ctx) {
    throw new Error("useDexWallet must be used inside DexWalletProvider");
  }
  return ctx;
}