"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import RewardVelocityGraph from "@/components/RewardVelocityGraph";
import LiveRewardCounter from "@/app/Savings/components/LiveRewardCounter";
import RewardStreamIndicator from "@/app/Savings/components/RewardStreamIndicator";
import APRPanel from "@/components/APRPanel";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";

interface MiningTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: Array<{ id: string; label: string; icon: LucideIcon }>;
  pendingUSDT: number;
  pendingEUSD: number;
  userStake: number | string;
}

export default function MiningTab({
  setActiveTab,
  menuItems,
  pendingUSDT,
  pendingEUSD,
  userStake,
}: MiningTabProps) {
  return (
    <>
      {/* GRID DE ÍCONES EXCLUSIVA PARA CELULARES */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-2 gap-3 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={`mobile-grid-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className="bg-[#0d0d0f] border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-all text-center group"
              >
                <div className="p-3 rounded-xl bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Icon size={26} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conteúdo Principal Empilhável/Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
          <RewardVelocityGraph pendingUSDT={pendingUSDT} />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <LiveRewardCounter pendingUSDT={pendingUSDT} pendingEUSD={pendingEUSD} />
          <RewardStreamIndicator />
        </div>
      </div>

      <div className="mb-8 mt-6">
        <APRPanel
          yearlyRewards={(pendingUSDT + pendingEUSD) * 365}
          stakedAmount={Number(userStake)}
        />
      </div>

      <div className="mb-8">
        <RewardVelocityPanel pendingUSDT={pendingUSDT} />
      </div>

      <div className="mb-12">
        <ProjectedRewardsPanel pendingUSDT={pendingUSDT} />
      </div>
    </>
  );
}