"use client";

import { useChainId, useSwitchChain } from "wagmi";

interface BuyEcoinNetworkBadgeProps {
  showSwitchButton?: boolean;
}

export default function BuyEcoinNetworkBadge({
  showSwitchButton = true,
}: BuyEcoinNetworkBadgeProps) {
  const chainId = useChainId();
  const { switchChain, isPending } = useSwitchChain();

  const isMainnet = chainId === 56;
  const isTestnet = chainId === 97;
  const isSupported = isMainnet || isTestnet;

  const networkName = isMainnet
    ? "BNB Smart Chain"
    : isTestnet
      ? "BSC Testnet"
      : "Rede não suportada";

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isMainnet
            ? "bg-emerald-400"
            : isTestnet
              ? "bg-yellow-400"
              : "bg-red-400"
        }`}
      />

      <div className="flex flex-col">
        <span className="text-xs font-semibold text-white">
          {networkName}
        </span>

        <span className="text-[10px] text-gray-400">
          Chain ID: {chainId}
        </span>
      </div>

      {!isSupported && showSwitchButton && (
        <button
          type="button"
          onClick={() => switchChain({ chainId: 56 })}
          disabled={isPending}
          className="ml-2 rounded-lg bg-yellow-500 px-3 py-1.5 text-xs font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
        >
          {isPending ? "A mudar..." : "Mudar rede"}
        </button>
      )}
    </div>
  );
}