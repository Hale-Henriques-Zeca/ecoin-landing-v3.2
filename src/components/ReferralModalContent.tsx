"use client";

import { useState } from "react";
import { useDexWallet } from "@/contexts/DexWalletContext";
import ReferralDashboard from "@/components/ReferralDashboard";
import ReferralBindPanel from "@/components/ReferralBindPanel";

interface ReferralModalContentProps {
  onClose?: () => void;
}

export default function ReferralModalContent({ onClose }: ReferralModalContentProps) {
  const { isConnected } = useDexWallet();
  const [tab, setTab] = useState<"bind" | "dashboard">("bind");

  if (!isConnected) {
    return (
      <div className="py-8 text-center space-y-3">
        <p className="text-xs sm:text-sm text-gray-400">
          Conecte a sua wallet para aceder ao sistema de referral.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* SWITCH DE ABAS COMPACTO */}
      <div className="flex rounded-xl overflow-hidden border border-[#00FF9C]/30 p-1 bg-black/60 shrink-0">
        <button
          onClick={() => setTab("bind")}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
            tab === "bind"
              ? "bg-[#00FF9C] text-black shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Vincular Upline
        </button>

        <button
          onClick={() => setTab("dashboard")}
          className={`flex-1 py-1.5 px-2 text-xs font-bold rounded-lg transition-all ${
            tab === "dashboard"
              ? "bg-[#00FF9C] text-black shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Painel Rewards
        </button>
      </div>

      {/* CONTEÚDO DA ABA SELECCIONADA */}
      <div className="pt-1">
        {tab === "bind" ? <ReferralBindPanel /> : <ReferralDashboard />}
      </div>
    </div>
  );
}