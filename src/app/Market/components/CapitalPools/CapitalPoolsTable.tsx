'use client';

import React from 'react';
import { CapitalPool } from '../../types/ecnTrading';

interface CapitalPoolsTableProps {
  pools: CapitalPool[];
}

export const CapitalPoolsTable: React.FC<CapitalPoolsTableProps> = ({ pools }) => {
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
            <th scope="col" className="px-5 py-3.5">Pool Asset</th>
            <th scope="col" className="px-5 py-3.5">Available</th>
            <th scope="col" className="px-5 py-3.5">In Trading</th>
            <th scope="col" className="px-5 py-3.5">Reserved</th>
            <th scope="col" className="px-5 py-3.5 text-right">Total Profit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 font-medium">
          {pools.map((pool) => (
            <tr key={pool.poolAsset} className="hover:bg-slate-800/40 transition-colors">
              <td className="px-5 py-4 font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                {pool.poolAsset}
              </td>
              <td className="px-5 py-4 text-emerald-400">{formatVal(pool.poolAsset, pool.available)}</td>
              <td className="px-5 py-4 text-amber-400">{formatVal(pool.poolAsset, pool.inTrading)}</td>
              <td className="px-5 py-4 text-sky-400">{formatVal(pool.poolAsset, pool.reserved)}</td>
              <td className="px-5 py-4 text-right font-bold text-emerald-400">
                +{formatVal(pool.poolAsset, pool.totalProfit)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CapitalPoolsTable;