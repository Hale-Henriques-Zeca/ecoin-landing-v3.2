'use client';

import React from 'react';
import { History } from 'lucide-react';
import {
  LoginCard,
  LoginLocation,
  LoginDevice,
  LoginMethod,
  LoginRisk,
  LoginTimeline
} from './components';

export default function LoginHistory() {
  const history = [
    { date: 'Hoje às 22:15', location: 'Nhamatanda, Sofala', device: 'Chrome / Windows', method: 'Google SSO + Passkey', risk: 'Baixo' as const },
    { date: 'Hoje às 19:01', location: 'Beira, Sofala', device: 'iPhone 15 Pro', method: 'Face ID', risk: 'Baixo' as const },
    { date: 'Ontem às 14:30', location: 'Maputo, Moçambique', device: 'Firefox / Linux', method: 'Password + SMS', risk: 'Baixo' as const },
  ];

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
        <History size={14} className="text-neutral-400" /> Histórico Detalhado de Logins
      </h3>

      <div className="flex flex-col gap-2">
        {history.map((item, idx) => (
          <LoginCard key={idx}>
            <div className="flex items-center gap-3">
              <LoginTimeline date={item.date} />
              <LoginLocation location={item.location} />
              <LoginDevice device={item.device} />
            </div>
            <div className="flex items-center gap-3">
              <LoginMethod method={item.method} />
              <LoginRisk risk={item.risk} />
            </div>
          </LoginCard>
        ))}
      </div>
    </div>
  );
}