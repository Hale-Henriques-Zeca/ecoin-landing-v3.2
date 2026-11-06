"use client";

import { createContext, useContext } from "react";

export type BuyEcoinStatus =
  | "idle"
  | "quoting"
  | "approving"
  | "pending"
  | "success"
  | "error";

export interface BuyEcoinState {
  fromAsset: string;
  toAsset: string;
  amount: string;
  slippage: number;
  quote: unknown | null;
  status: BuyEcoinStatus;
  transactionHash: `0x${string}` | null;
  error: string | null;
}

export interface BuyEcoinContextValue extends BuyEcoinState {
  setFromAsset: (value: string) => void;
  setToAsset: (value: string) => void;
  setAmount: (value: string) => void;
  setSlippage: (value: number) => void;
  setQuote: (value: unknown | null) => void;
  setStatus: (value: BuyEcoinStatus) => void;
  setTransactionHash: (value: `0x${string}` | null) => void;
  setError: (value: string | null) => void;
  reset: () => void;
}

export const INITIAL_BUYECOIN_STATE: BuyEcoinState = {
  fromAsset: "USDT",
  toAsset: "ECOIN",
  amount: "",
  slippage: 0.5,
  quote: null,
  status: "idle",
  transactionHash: null,
  error: null,
};

export const BuyEcoinContext =
  createContext<BuyEcoinContextValue | undefined>(undefined);

export function useBuyEcoin(): BuyEcoinContextValue {
  const context = useContext(BuyEcoinContext);

  if (!context) {
    throw new Error(
      "useBuyEcoin deve ser utilizado dentro de BuyEcoinProvider."
    );
  }

  return context;
}