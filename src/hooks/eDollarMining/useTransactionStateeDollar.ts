"use client";

import { useState } from "react";

export type TxState =
  | "idle"
  | "wallet"
  | "submitted"
  | "confirming"
  | "success"
  | "error";

export function useTransactionStateeDollar() {

  const [state, setState] =
    useState<TxState>("idle");

  const reset = () =>
    setState("idle");

  return {
    state,
    setState,
    reset,
  };
}