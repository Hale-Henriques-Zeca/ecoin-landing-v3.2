"use client";

import React from "react";
import { Activity } from "lucide-react";
import { AdminCard, AddressPill } from "./StablecoinSharedUI";

type ProtocolStatusPanelProps = {
  treasuryAddress: `0x${string}`;
  miningStakingAddress: `0x${string}`;
  ecGasSaleAddress: `0x${string}`;
  usdtAddress: `0x${string}`;
  eusdAddress: `0x${string}`;
  busyAction: string | null;
};

export function ProtocolStatusPanel({
  treasuryAddress,
  miningStakingAddress,
  ecGasSaleAddress,
  usdtAddress,
  eusdAddress,
  busyAction,
}: ProtocolStatusPanelProps) {
  return (
    <AdminCard
      title="Protocol Status"
      subtitle="Integridade dos módulos e endereços on-chain"
      icon={Activity}
    >
      <div className="space-y-3 text-[11px] sm:text-xs font-mono">
        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50">Wallet</span>
            <span className="text-emerald-400 font-bold">CONNECTED</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50">Treasury</span>
            <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50">Mining</span>
            <span className="text-emerald-400 font-bold">ACTIVE</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-white/50">Security</span>
            <span className="text-[#D4AF37] font-bold">
              {busyAction ? `BUSY (${busyAction})` : "PROTECTED"}
            </span>
          </div>
        </div>

        <div className="bg-black/40 rounded-2xl p-3.5 sm:p-4 space-y-2">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Treasury:</span>
            <AddressPill address={treasuryAddress} accentClass="text-white/80" />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">Mining Staking:</span>
            <AddressPill
              address={miningStakingAddress}
              accentClass="text-[#D4AF37]"
            />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">ecGas Sale:</span>
            <AddressPill
              address={ecGasSaleAddress}
              accentClass="text-purple-300"
            />
          </div>
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="text-white/50 shrink-0">USDT / EUSD:</span>
            <div className="flex items-center gap-2 min-w-0">
              <AddressPill
                address={usdtAddress}
                accentClass="text-emerald-400"
              />
              <span className="text-white/30">•</span>
              <AddressPill address={eusdAddress} accentClass="text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </AdminCard>
  );
}