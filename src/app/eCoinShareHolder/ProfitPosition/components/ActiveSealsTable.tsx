'use client';

import React from 'react';
import { CommitmentSeal } from '../types';
import CommitmentSealCard from './CommitmentSealCard';

interface ActiveSealsTableProps {
  seals: CommitmentSeal[];
  totalCommitment: number;
  totalMaxCapacity: number;
}

export const ActiveSealsTable: React.FC<ActiveSealsTableProps> = ({
  seals,
  totalCommitment,
  totalMaxCapacity,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">MY PROFIT CAPACITY</h3>
          <span className="text-xs text-slate-400">Active Seals: {seals.length}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block">Aggregate Max Capacity</span>
          <span className="text-sm font-black text-amber-400">{totalMaxCapacity.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {seals.map((seal) => (
          <CommitmentSealCard key={seal.id} seal={seal} />
        ))}
      </div>
    </div>
  );
};

export default ActiveSealsTable;