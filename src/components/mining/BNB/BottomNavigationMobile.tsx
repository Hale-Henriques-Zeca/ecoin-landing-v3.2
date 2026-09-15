"use client";

import {
  Award,
  BarChart3,
  Wallet,
  Gift,
  Coins,
  ShieldCheck,
  Settings,
} from "lucide-react";

interface BottomNavigationMobileProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNavigationMobile({
  activeTab,
  setActiveTab,
}: BottomNavigationMobileProps) {
  const navItems = [
    { id: "shareholders", label: "Acionistas", icon: Award },
    { id: "analytics", label: "Métricas", icon: BarChart3 },
    { id: "portfolio", label: "Portfólio CS", icon: Wallet },
    { id: "recompensas", label: "Dividendos", icon: Gift },
    { id: "stake", label: "Retenção", icon: Coins },
    { id: "cs_vault", label: "Selo CS", icon: ShieldCheck },
    { id: "config", label: "Perfil", icon: Settings },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0d0d0f]/95 border-t border-white/10 backdrop-blur-md z-50 px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-all ${
              isActive ? "text-[#D4AF37]" : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon size={20} className={isActive ? "scale-110" : ""} />
            <span className="text-[9px] font-medium tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}