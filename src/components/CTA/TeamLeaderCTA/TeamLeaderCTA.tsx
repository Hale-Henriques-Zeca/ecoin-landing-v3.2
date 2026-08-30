"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users2, ArrowUpRight } from "lucide-react";

export function TeamLeaderCTA() {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleTeamsRedirect = () => {
    setIsRedirecting(true);
    router.push("/equipes");
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 via-[#0d0d0f] to-[#0d0d0f] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-[0_4px_30px_rgba(212,175,55,0.05)]">
      {/* Detalhe de Luz de Fundo Luxo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
            <Users2 size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Gestão de Líder de Equipas
            </h3>
            <p className="text-xs text-white/50 mt-1 max-w-md">
              Aceda ao painel avançado de performance, monitorização de rede de afiliados e relatórios de comissões estruturais.
            </p>
          </div>
        </div>

        <button
          onClick={handleTeamsRedirect}
          disabled={isRedirecting}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] text-black text-xs font-black uppercase tracking-wider hover:bg-[#b8952e] active:scale-95 transition-all disabled:opacity-50 min-w-[160px] cursor-pointer"
        >
          {isRedirecting ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Entrar no Painel
              <ArrowUpRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default TeamLeaderCTA;