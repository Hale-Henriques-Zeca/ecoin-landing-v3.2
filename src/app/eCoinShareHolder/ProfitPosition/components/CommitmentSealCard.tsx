'use client';

import React from 'react';
import { CommitmentSeal } from '../types';

interface CommitmentSealCardProps {
  seal: CommitmentSeal;
}

export const CommitmentSealCard: React.FC<CommitmentSealCardProps> = ({ seal }) => {
  return (
    <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black text-amber-400">Commitment Seal {seal.sealNumber}</span>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
          {seal.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block">Capital Commitment</span>
          <span className="font-bold text-white">{seal.capitalAmount} {seal.paymentAsset}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block">Maximum Cycle Capacity</span>
          <span className="font-bold text-emerald-400">{seal.maxCapacity} {seal.paymentAsset}</span>
        </div>
      </div>
    </div>
  );
};

export default CommitmentSealCard;