"use client";

import React from "react";
import { ArrowLeft, ShieldCheck, Bell, Wallet } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function MobileHeader({
  title = "Buy & Convert",
  subtitle = "EdenKingDom Converter",
  onBack,
}: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-800/80 px-4 py-3 bg-[#0B0E14]">
      <div className="flex items-center gap-2.5 min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="rounded-xl bg-[#12181F] border border-gray-800 p-2 text-gray-300 hover:text-white transition shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
        )}

        <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-yellow-500/10">
          <div className="w-full h-full bg-[#0B0E14] rounded-[10px] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
          </div>
        </div>

        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium text-yellow-400">
            {subtitle}
          </p>
          <h1 className="truncate text-sm font-black text-white tracking-wide leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="p-2 bg-[#12181F] border border-gray-800 rounded-xl text-gray-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
        </button>

        {/* INTEGRATION: RAINBOWKIT CONNECT BUTTON (MOBILE) */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus || authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#12181F] border border-yellow-500/30 hover:border-yellow-500/80 rounded-xl text-xs font-bold text-yellow-400 transition"
                      >
                        <Wallet className="w-3.5 h-3.5 text-yellow-400" />
                        <span>Conectar</span>
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500/10 border border-red-500/40 hover:border-red-500 rounded-xl text-xs font-bold text-red-400 transition"
                      >
                        Rede Incorreta
                      </button>
                    );
                  }

                  return (
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#12181F] border border-yellow-500/20 hover:border-yellow-500/60 rounded-xl text-xs font-bold text-yellow-400 transition"
                    >
                      <Wallet className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{account.displayName}</span>
                    </button>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  );
}