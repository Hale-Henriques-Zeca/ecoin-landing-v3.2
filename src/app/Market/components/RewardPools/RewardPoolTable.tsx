'use client';

import React from 'react';
import { RewardPool } from '../../types/ecnTrading';

interface RewardPoolTableProps {
  pools: RewardPool[];
}

export const RewardPoolTable: React.FC<RewardPoolTableProps> = ({ pools }) => {
  const formatVal = (asset: string, val: number) => {
    if (asset === 'USDT' || asset === 'EUSD') {
      return `$${val.toLocaleString()}`;
    }
    return `${val.toLocaleString()} ${asset}`;
  };

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
      <table className="w-full text-left text-xs md:text-sm text-slate-300">
        <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
          <tr>
            <th scope="col" className="px-5 py-3.5">Reward Pool</th>
            <th scope="col" className="px-5 py-3.5">Reward Asset</th>
            <th scope="col" className="px-5 py-3.5">Available Rewards</th>
            <th scope="col" className="px-5 py-3.5">Total Distributed</th>
            <th scope="col" className="px-5 py-3.5">Eligible Holders</th>
            <th scope="col" className="px-5 py-3.5 text-right">Beneficiaries & Mechanism</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 font-medium">
          {pools.map((pool) => (
            <tr key={pool.asset} className="hover:bg-slate-800/40 transition-colors">
              <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                {pool.asset} Reward Pool
              </td>
              <td className="px-5 py-4 font-semibold text-slate-200">{pool.rewardAsset}</td>
              <td className="px-5 py-4 text-amber-400 font-bold">{formatVal(pool.asset, pool.availableRewards)}</td>
              <td className="px-5 py-4 text-emerald-400 font-bold">{formatVal(pool.asset, pool.distributedRewards)}</td>
              <td className="px-5 py-4 text-slate-300">{pool.eligibleHolders.toLocaleString()}</td>
              <td className="px-5 py-4 text-right text-xs text-slate-400 font-medium">{pool.mechanism}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardPoolTable;