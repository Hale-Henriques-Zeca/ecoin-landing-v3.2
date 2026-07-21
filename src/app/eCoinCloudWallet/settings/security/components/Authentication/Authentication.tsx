'use client';

import React from 'react';
import { Key } from 'lucide-react';
import { AuthenticationMethods, AuthenticationHistory } from './components';

export default function Authentication() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono">
      <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
        <Key size={14} className="text-[#D4AF37]" /> Provedores de Autenticação eCoin Wallet
      </h3>
      <AuthenticationMethods />
      <AuthenticationHistory />
    </div>
  );
}