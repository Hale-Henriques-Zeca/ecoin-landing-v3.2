"use client";

import React from "react";

export default function InfoBox() {
  return (
    <div className="w-full bg-[#111] border border-[#333] rounded-2xl p-6 shadow-xl text-gray-300">
      <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37] mb-4 font-mono">
        Como Funciona a Distribuição de Acionistas e Bonificações?
      </h2>

      <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-white/80">
        <p>
          O ecossistema <strong>EdenKingDom / eCoin</strong> opera com uma estrutura refinada de{" "}
          <span className="text-[#D4AF37] font-semibold">3 Níveis de Bonificação</span> totalmente automatizada por Smart Contracts auditados na EVM (`UnifiedMiningCollector`, `TradingFeeCollector` e `ECoinMiningFeeCollector`).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="p-3 bg-black/50 border border-white/10 rounded-xl">
            <h4 className="text-emerald-400 font-bold font-mono text-xs mb-1">1. Venda de Selos</h4>
            <p className="text-[11px] text-white/70">
              20% de cada compra vai para os acionistas (L1: 14%, L2: 4%, L3: 2%). O restante divide-se entre Staking (30%), Liquidez (20%) e Treasury.
            </p>
          </div>

          <div className="p-3 bg-black/50 border border-white/10 rounded-xl">
            <h4 className="text-cyan-400 font-bold font-mono text-xs mb-1">2. Trading Robot Profit</h4>
            <p className="text-[11px] text-white/70">
              20% das dos lucros e ecGas do motor de negociação sustentam a rede em 3 níveis (L1: 15%, L2: 3%, L3: 2%), além de alimentar o Staking (30%) e a Liquidez (30%).
            </p>
          </div>

          <div className="p-3 bg-black/50 border border-white/10 rounded-xl">
            <h4 className="text-fuchsia-400 font-bold font-mono text-xs mb-1">3. Claim Fee Collector</h4>
            <p className="text-[11px] text-white/70">
              A taxa de claim (1%) repassa 30% para a árvore de indicação (L1: 70%, L2: 25%, L3: 5%), 50% para o Staking e 20% para a Tesouraria.
            </p>
          </div>
        </div>

        <p className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl text-xs text-[#D4AF37]">
          🛡️ <strong>Proteção Anti-Drain Integrada:</strong> Caso a reserva da Tesouraria em EUSD fique abaixo de 10.000 tokens, o contrato reduz dinamicamente as recompensas extras em 50% (`dynamicReductionBP = 5000`), prevenindo drenagem de liquidez e garantindo a saúde financeira do ecossistema a longo prazo.
        </p>
      </div>
    </div>
  );
}