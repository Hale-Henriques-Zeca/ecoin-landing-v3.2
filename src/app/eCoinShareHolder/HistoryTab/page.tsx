"use client";

import EdenActivityHistoryPanel from "@/components/edenActivityRegistry/EdenActivityHistoryPanel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#070708] text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
      {/* Iluminação de fundo estilo eCoin */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* NAVEGAÇÃO DE RETORNO */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Dashboard</span>
          </Link>
        </div>

        {/* COMPONENTE DO HISTÓRICO */}
        <EdenActivityHistoryPanel />

      </div>
    </main>
  );
}