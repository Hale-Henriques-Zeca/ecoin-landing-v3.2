"use client";

import { useState } from "react";

export type TxState =
  | "idle"
  | "wallet"
  | "submitted"
  | "confirming"
  | "success"
  | "error";

export function useTransactionState() {

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