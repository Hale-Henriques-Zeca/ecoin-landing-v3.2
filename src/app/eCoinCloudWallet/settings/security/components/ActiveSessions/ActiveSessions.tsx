'use client';

import React from 'react';
import { Activity } from 'lucide-react';
import {
  SessionCard,
  SessionLocation,
  SessionDevice,
  SessionDuration,
  CurrentSession,
  LogoutSession,
  LogoutAllSessions
} from './components';

export default function ActiveSessions() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Activity size={14} className="text-blue-400" /> Sessões Ativas
        </h3>
        <LogoutAllSessions />
      </div>

      <div className="flex flex-col gap-2.5">
        <SessionCard>
          <div>
            <div className="flex items-center gap-2">
              <SessionDevice device="Chrome em Windows 11" />
              <CurrentSession />
            </div>
            <SessionLocation location="Nhamatanda, Sofala" ip="102.218.45.12" />
          </div>
          <SessionDuration duration="Ativo agora" />
        </SessionCard>

        <SessionCard>
          <div>
            <SessionDevice device="eCoin Mobile App em iPhone 15" />
            <SessionLocation location="Maputo, Moçambique" ip="41.222.10.05" />
          </div>
          <div className="flex items-center gap-3">
            <SessionDuration duration="Há 22 min" />
            <LogoutSession />
          </div>
        </SessionCard>
      </div>
    </div>
  );
}