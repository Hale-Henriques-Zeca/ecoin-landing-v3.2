import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Trophy,
  Users,
  Zap,
  Layers,
} from "lucide-react";
import { EcnRankingBoard } from "@/components/ranking/EcnRankingBoard";
import { CONTRACTS } from "@/lib/contracts/contracts";

export default function RankingPage() {
  const verifiedContracts = [
    {
      label: "Stable Staking",
      address: CONTRACTS.MINING_STAKING,
    },
    {
      label: "eCoin Staking",
      address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    },
    {
      label: "Unified Referral (3 Níveis)",
      address: CONTRACTS.REFERRAL,
    },
    {
      label: "ecGas Sale (USDT/E-USD)",
      address: CONTRACTS.ECGAS_SALE,
    },
    ...(CONTRACTS.ecGas_Sale_eCoin
      ? [
          {
            label: "ecGas Sale (eCoin)",
            address: CONTRACTS.ecGas_Sale_eCoin,
          },
        ]
      : []),
  ].filter((item) => Boolean(item.address));

  return (
    <main className="relative min-h-screen w-full bg-[#070B12] text-white overflow-x-hidden pb-16">
      {/* Glows Ambientais */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute top-1/3 -left-24 w-72 h-72 rounded-full bg-[#ff007f]/10 blur-[110px]" />
        <div className="absolute bottom-1/4 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-6">
        {/* BARRA SUPERIOR DE NAVEGAÇÃO */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 hover:text-[#F9D13E] transition"
          >
            <ArrowLeft size={14} />
            <span>Voltar ao Ecossistema</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] font-mono text-[#F9D13E]">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>BNB Smart Chain • Leitura Direta Multicall</span>
          </div>
        </div>

        {/* HERO HEADER DA PÁGINA DE RANKING */}
        <header className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">
            <Trophy size={13} />
            <span>EdenKingDom Leaderboard</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F9D13E] to-[#D4AF37]">
            Classificação Global On-Chain
          </h1>

          <p className="text-xs sm:text-sm text-white/65 leading-relaxed">
            Dados auditáveis diretamente nos contratos inteligentes da{" "}
            <strong className="text-white">BNB Smart Chain</strong> sem
            intermediários: posições de Staking, lucros ao vivo, rede de
            comissões em <strong className="text-[#F9D13E]">3 níveis (L1, L2 e L3)</strong> e
            capacidade <strong className="text-emerald-400">ecGas</strong>.
          </p>
        </header>

        {/* RESUMO DAS 3 DIMENSÕES DO RANKING */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#F9D13E]">
              <Layers size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-white">
                Pools ecnTrader
              </div>
              <p className="text-[11px] text-white/55 mt-0.5">
                Top Margin, Live Profit dinâmico e Top Gainers por período.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#ff007f]/15 border border-[#ff007f]/30 flex items-center justify-center shrink-0 text-pink-300">
              <Users size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-white">
                Rede em 3 Níveis
              </div>
              <p className="text-[11px] text-white/55 mt-0.5">
                Comissões L1 (Direto), L2 (Indireto) e L3 (Rede) via
                UnifiedReferralV2.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-300">
              <Zap size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-white">ecGas & VIP</div>
              <p className="text-[11px] text-white/55 mt-0.5">
                Capacidade energética adquirida em USDT, E-USD e eCoin.
              </p>
            </div>
          </div>
        </div>

        {/* COMPONENTE PRINCIPAL DO RANKING */}
        <EcnRankingBoard />

        {/* RODAPÉ DE TRANSPARÊNCIA DOS CONTRATOS NA BSCSCAN */}
        {verifiedContracts.length > 0 && (
          <footer className="max-w-3xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-white/70">
                <ShieldCheck size={13} className="text-[#D4AF37]" />
                <span>Contratos UUPS Auditáveis na BscScan:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {verifiedContracts.map((c) => (
                  <a
                    key={c.label}
                    href={`https://bscscan.com/address/${c.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 hover:bg-[#D4AF37]/15 border border-white/10 hover:border-[#D4AF37]/40 text-[10px] font-mono text-white/70 hover:text-[#F9D13E] transition"
                  >
                    <span>{c.label}:</span>
                    <span className="text-white/90">
                      {c.address.slice(0, 6)}...{c.address.slice(-4)}
                    </span>
                    <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}