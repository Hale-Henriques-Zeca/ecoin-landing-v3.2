'use client';

import React from 'react';
import { TradeActivity } from '../../types/ecnTrading';
import TradingStatusBadge from './TradingStatusBadge';

interface TradeActivityRowProps {
  activity: TradeActivity;
}

export const TradeActivityRow: React.FC<TradeActivityRowProps> = ({ activity }) => {
  const isBuy = activity.type === 'BUY';

  return (
    <tr className="hover:bg-slate-800/40 transition-colors border-b border-slate-800/60 font-medium text-xs md:text-sm">
      <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">{activity.timestamp}</td>
      <td className="px-5 py-3.5 font-bold text-white">{activity.botName}</td>
      <td className="px-5 py-3.5 text-slate-300 font-semibold">{activity.pair}</td>
      <td className="px-5 py-3.5">
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-extrabold ${
            isBuy
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {activity.type}
        </span>
      </td>
      <td className="px-5 py-3.5 text-slate-200 font-mono">{activity.amount}</td>
      <td className="px-5 py-3.5 text-right">
        <TradingStatusBadge status={activity.status} />
      </td>
    </tr>
  );
};

export default TradeActivityRow;