'use client';

import React from 'react';
import { Users } from 'lucide-react';
import {
  GuardianCard,
  GuardianPermissions,
  GuardianRecovery,
  AddGuardian
} from './components';

export default function Guardians() {
  const guardians = [
    { name: 'Contacto de Confiança', role: 'Social Guardian', status: 'Ativo' },
    { name: 'EdenKingDom Node Multisig', role: 'Institutional Guardian', status: 'Ativo' },
    { name: 'Cold Hardware Vault', role: 'Backup Guardian', status: 'Ativo' },
  ];

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Users size={14} className="text-purple-400" /> Guardian Accounts (Recuperação Social)
          </h3>
          <GuardianPermissions />
        </div>
        <AddGuardian />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {guardians.map((g, i) => (
          <GuardianCard key={i} name={g.name} role={g.role} status={g.status} />
        ))}
      </div>

      <GuardianRecovery />
    </div>
  );
}