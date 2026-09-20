"use client";

import React from "react";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

export default function AssetsPage() {
  return (
    <main className="min-h-screen bg-[#07090E] text-white pt-20 pb-28 px-4 sm:px-6 flex flex-col items-center">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="w-full max-w-2xl mb-6 text-left">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">
            Portfolio & Liquidez
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Meus Ativos
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Acompanhe o saldo total, alocação de tokens e gráfico de variação em tempo real.
        </p>
      </div>

      {/* COMPONENTE PRINCIPAL DE ATIVOS */}
      <div className="w-full max-w-2xl">
        <EcoinWalletDashboard />
      </div>

      {/* ÁREA RESERVADA PARA NOVO CONTEÚDO */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {/* Você pode adicionar histórico de transações, estatísticas adicionais ou cards aqui */}
      </div>

    </main>
  );
}