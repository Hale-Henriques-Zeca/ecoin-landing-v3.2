
"use client";

import { useState } from "react";

export type GasMode =
  | "smart-account"
  | "sponsored";

export function useGasMode() {
  const [gasMode, setGasMode] =
    useState<GasMode>("smart-account");

  return {
    gasMode,
    setGasMode,

    // A selecção da interface não prova que
    // o patrocínio esteja disponível na rede.
    isSponsorshipRequested:
      gasMode === "sponsored",
  };
}
