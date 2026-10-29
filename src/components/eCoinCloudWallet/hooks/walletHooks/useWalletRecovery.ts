
"use client";

import { useState } from "react";

export type RecoveryStatus =
  | "idle"
  | "requested"
  | "pending"
  | "completed"
  | "error";

export function useWalletRecovery() {
  const [status, setStatus] =
    useState<RecoveryStatus>("idle");

  const [error, setError] =
    useState<string | null>(null);

  function beginRecovery() {
    setError(null);
    setStatus("requested");
  }

  function markPending() {
    setStatus("pending");
  }

  function markCompleted() {
    setError(null);
    setStatus("completed");
  }

  function markError(message: string) {
    setError(message);
    setStatus("error");
  }

  function reset() {
    setStatus("idle");
    setError(null);
  }

  return {
    status,
    error,
    isRecovering:
      status === "requested" ||
      status === "pending",
    beginRecovery,
    markPending,
    markCompleted,
    markError,
    reset,
  };
}
