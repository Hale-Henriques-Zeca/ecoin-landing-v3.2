"use client";

import { useState } from "react";
import { useDexWallet } from "@/contexts/DexWalletContext";
import ReferralDashboard from "@/components/ReferralDashboard";
import ReferralBindPanel from "@/components/ReferralBindPanel";
import { X } from "lucide-react";

export default function ReferralModalContent() {
  const { isConnected } = useDexWallet();
  const [tab, setTab] = useState<"bind" | "dashboard">("bind");
  const [isVisible, setIsVisible] = useState(true);

  // Se o estado for falso, o modal desaparece por completo
  if (!isVisible) return null;

  if (!isConnected) {
    return (
      <p className="text-sm text-gray-400 text-center">
        Conecte a wallet para usar o sistema de referral.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* SWITCH */}
      <div className="flex rounded-xl overflow-hidden border border-[#00FF9C]/30">
        <button
          onClick={() => setTab("bind")}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            tab === "bind"
              ? "bg-[#00FF9C] text-black"
              : "bg-black text-gray-400"
          }`}
        >
          Vincular Upline
        </button>

        <button
          onClick={() => setTab("dashboard")}
          className={`flex-1 py-2 text-sm font-semibold transition ${
            tab === "dashboard"
              ? "bg-[#00FF9C] text-black"
              : "bg-black text-gray-400"
          }`}
        >
          Painel
        </button>
      </div>

      {/* BOTÃO FECHAR (Inserido logo após o Switch) */}
      <button
        onClick={() => setIsVisible(false)}
        className="w-full group relative flex items-center justify-center gap-2 px-6 py-3 
                   bg-red-500/10 hover:bg-red-500/20 
                   border border-red-500/30 hover:border-red-500/60 
                   rounded-xl transition-all duration-300 
                   shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.2)]"
      >
        {/* Ícone de Fechar */}
        <X 
          size={18} 
          className="text-red-500 group-hover:text-red-400 group-hover:rotate-90 transition-all duration-300" 
        />
        
        {/* Texto */}
        <span className="text-red-400 font-bold text-xs uppercase tracking-[0.2em] group-hover:text-white transition-colors">
          Fechar
        </span>
      </button>

      {/* CONTEÚDO */}
      {tab === "bind" ? <ReferralBindPanel /> : <ReferralDashboard />}
    </div>
  );
}