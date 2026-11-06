"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import BuyEcoinNetworkBadge from "./BuyEcoinNetworkBadge";

interface BuyEcoinWalletBarProps {
  showNetwork?: boolean;
}

function shortenAddress(address?: string) {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function BuyEcoinWalletBar({
  showNetwork = true,
}: BuyEcoinWalletBarProps) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#101722] p-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-500/10 text-lg">
          👛
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-400">
            {isConnected ? "Carteira conectada" : "Carteira"}
          </p>

          <p className="truncate text-sm font-semibold text-white">
            {isConnected
              ? shortenAddress(address)
              : "Nenhuma carteira conectada"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {showNetwork && <BuyEcoinNetworkBadge />}

        {isConnected ? (
          <button
            type="button"
            onClick={() => disconnect()}
            className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-gray-200 transition hover:bg-white/10"
          >
            Desconectar
          </button>
        ) : (
          <ConnectButton />
        )}
      </div>
    </div>
  );
}