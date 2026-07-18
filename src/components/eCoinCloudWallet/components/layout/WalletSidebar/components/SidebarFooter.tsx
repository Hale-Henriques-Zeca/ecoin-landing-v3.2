'use client';

import React from 'react';
import SidebarNetwork from './SidebarNetwork';
import SidebarUser from './SidebarUser';
import SidebarVersion from './SidebarVersion';

export default function SidebarFooter() {
  return (
    <div className="p-4 border-t border-[#D4AF37]/10 bg-[#050505]/50 flex flex-col gap-4">
      {/* Status da Rede Blockchain */}
      <SidebarNetwork />

      {/* Conta do Operador / Utilizador */}
      <SidebarUser />

      {/* Rodapé Administrativo / Versão */}
      <SidebarVersion />
    </div>
  );
}