'use client';

import React from 'react';

interface PoolParticipationCardProps {
  poolShare: number;
  userStake: number;
  totalEligibleStake: number;
  marketAsset: string;
}

export const PoolParticipationCard: React.FC<PoolParticipationCardProps> = ({
  poolShare,
  userStake,
  totalEligibleStake,
  marketAsset,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white tracking-wide">STEP 2 — POOL SHARE</h3>
        <span className="text-xs text-emerald-400 font-bold">{marketAsset} AI STAKING POOL</span>
      </div>

      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-center space-y-1">
        <span className="text-xs text-slate-400 block font-medium">Your Relative Pool Share</span>
        <span className="text-3xl font-black text-emerald-400">{poolShare}%</span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-400">
          <span>Your E-Coin Stake:</span>
          <span className="font-bold text-white">{userStake.toLocaleString()} ECOIN</span>
        </div>
        <div className="flex justify-between text-slate-400">
          <span>Total Eligible Stake:</span>
          <span className="font-bold text-white">{totalEligibleStake.toLocaleString()} ECOIN</span>
        </div>
      </div>
    </div>
  );
};

export default PoolParticipationCard;