"use client";

import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  BuyEcoinContext,
  INITIAL_BUYECOIN_STATE,
  type BuyEcoinState,
  type BuyEcoinStatus,
} from "./BuyEcoinContext";

interface BuyEcoinProviderProps {
  children: ReactNode;
  initialState?: Partial<BuyEcoinState>;
}

export default function BuyEcoinProvider({
  children,
  initialState,
}: BuyEcoinProviderProps) {
  const [fromAsset, setFromAsset] = useState(
    initialState?.fromAsset ?? INITIAL_BUYECOIN_STATE.fromAsset
  );

  const [toAsset, setToAsset] = useState(
    initialState?.toAsset ?? INITIAL_BUYECOIN_STATE.toAsset
  );

  const [amount, setAmount] = useState(
    initialState?.amount ?? INITIAL_BUYECOIN_STATE.amount
  );

  const [slippage, setSlippage] = useState(
    initialState?.slippage ?? INITIAL_BUYECOIN_STATE.slippage
  );

  const [quote, setQuote] = useState<unknown | null>(
    initialState?.quote ?? null
  );

  const [status, setStatus] = useState<BuyEcoinStatus>(
    initialState?.status ?? INITIAL_BUYECOIN_STATE.status
  );

  const [transactionHash, setTransactionHash] =
    useState<`0x${string}` | null>(
      initialState?.transactionHash ?? null
    );

  const [error, setError] = useState<string | null>(
    initialState?.error ?? null
  );

  const reset = useCallback(() => {
    setFromAsset(INITIAL_BUYECOIN_STATE.fromAsset);
    setToAsset(INITIAL_BUYECOIN_STATE.toAsset);
    setAmount(INITIAL_BUYECOIN_STATE.amount);
    setSlippage(INITIAL_BUYECOIN_STATE.slippage);
    setQuote(null);
    setStatus("idle");
    setTransactionHash(null);
    setError(null);
  }, []);

  const value = useMemo(
    () => ({
      fromAsset,
      toAsset,
      amount,
      slippage,
      quote,
      status,
      transactionHash,
      error,
      setFromAsset,
      setToAsset,
      setAmount,
      setSlippage,
      setQuote,
      setStatus,
      setTransactionHash,
      setError,
      reset,
    }),
    [
      fromAsset,
      toAsset,
      amount,
      slippage,
      quote,
      status,
      transactionHash,
      error,
      reset,
    ]
  );

  return (
    <BuyEcoinContext.Provider value={value}>
      {children}
    </BuyEcoinContext.Provider>
  );
}