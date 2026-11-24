"use client";

import EdenActivityHistoryPanel from "@/components/edenActivityRegistry/EdenActivityHistoryPanel";
import { ArrowLeft, ArrowUpRight, History } from "lucide-react";
import Link from "next/link";

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Iluminação de fundo estilo eCoin */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* BARRA SUPERIOR: RETORNO & ACESSO À MINING SESSION */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Dashboard</span>
          </Link>

          <Link
            href="/eCoinShareHolder/eCoin/HistoryTab/MiningSessionCard"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37]/20 to-amber-500/10 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/10 transition-all duration-300 active:scale-95"
          >
            <History size={15} />
            <span>Mining Session</span>
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* COMPONENTE DO HISTÓRICO */}
        <EdenActivityHistoryPanel />
      </div>
    </main>
  );
}