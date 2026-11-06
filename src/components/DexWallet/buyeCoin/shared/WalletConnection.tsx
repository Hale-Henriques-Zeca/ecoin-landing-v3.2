"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ExternalLink, Wallet } from "lucide-react";

interface WalletConnectionProps {
  compact?: boolean;
  showAddress?: boolean;
}

function shortenAddress(address?: string) {
  if (!address) return "";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function WalletConnection({
  compact = false,
  showAddress = true,
}: WalletConnectionProps) {
  const { address, isConnected, chain } = useAccount();

  const explorerUrl =
    chain?.id === 97
      ? "https://testnet.bscscan.com/address"
      : "https://bscscan.com/address";

  return (
    <div className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#101923] p-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400">
          <Wallet size={20} />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-neutral-400">
            {isConnected ? "Carteira conectada" : "Carteira não conectada"}
          </p>

          {isConnected && showAddress && address ? (
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-white">
                {shortenAddress(address)}
              </span>

              <a
                href={`${explorerUrl}/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver carteira no BscScan"
                className="text-neutral-400 transition hover:text-yellow-400"
              >
                <ExternalLink size={13} />
              </a>
            </div>
          ) : (
            <p className="text-sm font-medium text-white">
              {isConnected ? "Ligada" : "Liga a tua carteira para continuar"}
            </p>
          )}
        </div>
      </div>

      <div className={compact ? "shrink-0" : "shrink-0"}>
        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus={compact ? "avatar" : "address"}
        />
      </div>
    </div>
  );
}