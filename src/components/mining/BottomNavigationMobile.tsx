"use client";

import { Home, Newspaper, Users, User } from "lucide-react";

interface BottomNavigationMobileProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReferral: () => void;
}

export default function BottomNavigationMobile({
  activeTab,
  setActiveTab,
  onOpenReferral,
}: BottomNavigationMobileProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0f]/95 border-t border-white/10 backdrop-blur-md z-50 px-2 py-2 flex items-center justify-around">
      {/* Botão Início */}
      <button
        onClick={() => setActiveTab("minacao")}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${activeTab === "minacao" ? "text-[#D4AF37]" : "text-white/40"}`}
      >
        <Home size={20} className={activeTab === "minacao" ? "scale-110" : ""} />
        <span className="text-[9px] font-medium tracking-tight">Início</span>
      </button>

      {/* Botão Notícias / Analytics */}
      <button
        onClick={() => setActiveTab("analytics")}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${activeTab === "analytics" ? "text-[#D4AF37]" : "text-white/40"}`}
      >
        <Newspaper size={20} className={activeTab === "analytics" ? "scale-110" : ""} />
        <span className="text-[9px] font-medium tracking-tight">Notícias</span>
      </button>

      {/* Botão Referral */}
      <button
        onClick={onOpenReferral}
        className="flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all text-white/40 hover:text-[#D4AF37]"
      >
        <Users size={20} />
        <span className="text-[9px] font-medium tracking-tight">Referral</span>
      </button>

      {/* Botão Perfil */}
      <button
        onClick={() => setActiveTab("config")}
        className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${activeTab === "config" ? "text-[#D4AF37]" : "text-white/40"}`}
      >
        <User size={20} className={activeTab === "config" ? "scale-110" : ""} />
        <span className="text-[9px] font-medium tracking-tight">Perfil</span>
      </button>
    </nav>
  );
}