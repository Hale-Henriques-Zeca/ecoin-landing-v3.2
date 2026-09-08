'use client';

import React from 'react';
import { TradeActivity } from '../../types/ecnTrading';
import TradeActivityRow from './TradeActivityRow';

interface TradeActivityTableProps {
  activities: TradeActivity[];
}

export const TradeActivityTable: React.FC<TradeActivityTableProps> = ({ activities }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
      <table className="w-full text-left text-xs md:text-sm text-slate-300">
        <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
          <tr>
            <th scope="col" className="px-5 py-3.5">Time</th>
            <th scope="col" className="px-5 py-3.5">Bot Engine</th>
            <th scope="col" className="px-5 py-3.5">Market Pair</th>
            <th scope="col" className="px-5 py-3.5">Action</th>
            <th scope="col" className="px-5 py-3.5">Volume</th>
            <th scope="col" className="px-5 py-3.5 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {activities.map((activity) => (
            <TradeActivityRow key={activity.id} activity={activity} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeActivityTable;