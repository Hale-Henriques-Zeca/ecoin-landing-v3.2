import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowUpRight, Sparkles } from 'lucide-react';

export default function SimulatorRedirectCard() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSimulatorRedirect = () => {
    setIsRedirecting(true);
    // Aqui entra a sua rota ou lógica de navegação para a nova page.tsx
    setTimeout(() => {
      window.location.href = "/Referral-Commission-Simulator"; // a rota
    }, 800);
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* CARD PREMIUM DE REDIRECIONAMENTO PARA O SIMULADOR DE REFERÊNCIAS */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 via-[#0d0d0f] to-[#0d0d0f] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-[0_4px_30px_rgba(212,175,55,0.05)] group">
        
        {/* Detalhe de Luz de Fundo Luxo & Efeito Blur Dinâmico */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/15 transition-all duration-700" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-slate-900/40 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            
            {/* Ícone com Badge de Luxo */}
            <div className="relative p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Calculator size={24} />
              <div className="absolute -top-1 -right-1 bg-amber-500 p-0.5 rounded-full border border-[#0d0d0f] animate-pulse">
                <Sparkles size={8} className="text-black" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-[#D4AF37]/80">
                PRO CONSOLE ENGINE
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Simulador de Comissões de Referências
              </h3>
              <p className="text-xs text-white/50 max-w-md leading-relaxed font-sans">
                Projete ganhos geométricos em tempo real. Compare de forma analítica os impactos macroeconômicos e de rendimento entre os motores <span className="text-[#D4AF37] font-medium">ecGas</span> e <span className="text-[#D4AF37] font-medium">Withdrawal Fee</span>.
              </p>
            </div>
          </div>

          {/* Botão de Ação Premium com Efeito de Feedback */}
          <button
            onClick={handleSimulatorRedirect}
            disabled={isRedirecting}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] text-black text-xs font-black uppercase tracking-wider hover:bg-[#b8952e] active:scale-95 transition-all duration-200 disabled:opacity-50 min-w-[170px] shadow-[0_4px_20px_rgba(212,175,55,0.15)] shrink-0 self-end sm:self-center"
          >
            {isRedirecting ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Abrir Simulador
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}