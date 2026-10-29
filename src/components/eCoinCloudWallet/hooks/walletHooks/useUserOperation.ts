
"use client";

import { useState } from "react";

export type UserOperationStatus =
  | "idle"
  | "preparing"
  | "pending"
  | "success"
  | "error";

export function useUserOperation() {
  const [status, setStatus] =
    useState<UserOperationStatus>("idle");

  const [userOpHash, setUserOpHash] =
    useState<`0x${string}` | undefined>();

  const [error, setError] =
    useState<string | null>(null);

  function reset() {
    setStatus("idle");
    setUserOpHash(undefined);
    setError(null);
  }

  function setPending(hash: `0x${string}`) {
    setUserOpHash(hash);
    setStatus("pending");
    setError(null);
  }

  function setSuccess() {
    setStatus("success");
    setError(null);
  }

  function setFailure(message: string) {
    setStatus("error");
    setError(message);
  }

  return {
    status,
    userOpHash,
    error,
    isLoading:
      status === "preparing" ||
      status === "pending",
    reset,
    setPending,
    setSuccess,
    setFailure,
    setPreparing: () => {
      setError(null);
      setStatus("preparing");
    },
  };
}
