"use client";

import { useState } from "react";
import { 
  Cpu, 
  Smartphone, 
  Monitor, 
  AlertTriangle, 
  Zap, 
  Compass, 
  Timer,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlockchainDeviceAlert() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[1200px] mx-auto px-4 py-8"
      >
        <div className="relative overflow-hidden bg-blue-500/5 border border-blue-500/20 p-8 rounded-[2.5rem] group backdrop-blur-md">
          
          {/* Ícone de Fundo Animado */}
          <div className="absolute top-0 right-0 p-6 opacity-10 animate-pulse">
            <Cpu size={80} className="text-blue-400" />
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
            
            {/* Coluna de Ícone Lateral */}
            <div className="flex flex-col gap-4 shrink-0">
              <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-500/30">
                <Smartphone className="text-blue-400" size={32} />
              </div>
              <div className="bg-[#D4AF37]/20 p-4 rounded-2xl border border-[#D4AF37]/30">
                <Zap className="text-[#D4AF37]" size={32} />
              </div>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-black text-blue-400 uppercase tracking-tighter italic flex items-center gap-3">
                  <Timer className="animate-spin-slow" size={24} /> 
                  Protocolo de Coeficiência: Performance Mobile 📱
                </h3>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
                <p>
                  Para garantir a máxima eficiência em transações na **Blockchain via SmartPhone**, a equipa de engenharia recomenda vivamente o uso do link oficial <code className="text-[#D4AF37] font-mono">ecoin.edenkingdom.org</code> diretamente no navegador nativo da tua carteira.
                </p>

                {/* Destaque Browser de Carteira */}
                <div className="bg-black/40 p-5 rounded-2xl border-l-4 border-[#D4AF37] flex items-start gap-4 shadow-lg">
                  <Compass className="text-[#D4AF37] shrink-0" size={20} />
                  <p>
                    Utiliza o ícone <strong>Navegador / Browser / Descobrir / Explore</strong> dentro da **Trust Wallet**, **SafePal** ou similares. Esta integração direta garante que as confirmações de blocos ocorram sem latência.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <h4 className="text-[#D4AF37] font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      <AlertTriangle size={14} /> Nota de Memória
                    </h4>
                    <p className="text-white/60 text-[11px]">
                      Navegadores externos podem sofrer com falta de memória RAM, aceitando a primeira confirmação mas falhando nas subsequentes. Garante que o teu smartphone tem alta capacidade de processamento.
                    </p>
                  </div>

                  <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <h4 className="text-emerald-400 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                      <Monitor size={14} /> Desktop Status
                    </h4>
                    <p className="text-white/60 text-[11px]">
                      Utilizadores de Desktop estão isentos desta limitação técnica, usufruindo de estabilidade total em qualquer navegador Web3.
                    </p>
                  </div>
                </div>

                {/* NOTAS DE AUTORIDADE E VALOR DO COMPONENTE */}
                <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span className="text-[9px] text-blue-200/50 uppercase font-bold">Evita Tickets de Suporte</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span className="text-[9px] text-blue-200/50 uppercase font-bold">Autoridade Técnica BSC</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" />
                    <span className="text-[9px] text-blue-200/50 uppercase font-bold">Clareza Visual Mobile</span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-medium text-white/80 italic">
                    Estamos a trabalhar em ajustes de coeficiência para browsers externos. Fica atento.
                  </p>
                  <p className="text-[#D4AF37] font-bold uppercase tracking-widest text-[10px] mt-2">
                    E-Coiner para sempre. O futuro é agora. Yeah! 🚀
                  </p>
                </div>
              </div>

              {/* BOTÃO ENTENDIDO */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
                <div className="flex gap-3">
                  <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] font-bold text-blue-400 uppercase tracking-widest">
                    DApp Browser Optimized
                  </div>
                </div>

                <button 
                  onClick={() => setIsVisible(false)}
                  className="group/btn relative overflow-hidden px-8 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-xl transition-all duration-300"
                >
                  <span className="relative z-10 text-blue-400 font-black text-xs uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors">
                    Entendido, Proseguir ⚡
                  </span>
                  <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
