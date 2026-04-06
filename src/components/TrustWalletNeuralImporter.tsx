"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Smartphone, 
  Globe, 
  Fingerprint, 
  Download, 
  Zap, 
  ExternalLink,
  Wallet,
  Check
} from "lucide-react";

export default function TrustWalletGuide() {
  const importLink = "https://ecoin.edenkingdom.org/Import-E-Coin-Token";
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(importLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 space-y-8">
      
      {/* 📘 GUIA DE IMPORTAÇÃO: TRUST WALLET NEURAL */}
      <div className="relative overflow-hidden bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-8 rounded-[2.5rem] group">
        
        {/* Ícone de Carteira no fundo */}
        <div className="absolute top-0 right-0 p-6 opacity-10 animate-pulse">
          <Wallet size={80} className="text-[#D4AF37]" />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
          <div className="bg-[#D4AF37]/20 p-4 rounded-2xl shrink-0 border border-[#D4AF37]/30">
            <Smartphone className="text-[#D4AF37]" size={32} />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-black text-[#D4AF37] uppercase tracking-tighter italic">
              IMPORTAÇÃO NEURAL: Ativação Trust Wallet & Mobile 📱
            </h3>

            <div className="space-y-4 text-xs md:text-sm text-gray-300 leading-relaxed">
              <p>
                O nosso motor de **Automação Web3** foi desenhado para as elites. Enquanto a Metamask domina o Desktop, a **Trust Wallet** é a nossa escolha oficial para dispositivos móveis (Android/iOS). Siga os passos abaixo para mapear os 3 tokens do ecossistema:
              </p>

              {/* STEPS PANEL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/60 p-5 rounded-2xl border-l-4 border-[#D4AF37] hover:bg-black/80 transition-all">
                  <span className="text-[#D4AF37] font-black text-lg mr-2">01.</span>
                  <span className="font-bold text-white uppercase text-[10px] tracking-widest">Configuração Inicial:</span>
                  <p className="mt-2 text-white/60">Instale a Trust Wallet e crie a sua conta. **Guarde a sua Seed Phrase offline** conforme o protocolo de segurança acima.</p>
                </div>

                <div className="bg-black/60 p-5 rounded-2xl border-l-4 border-emerald-500 hover:bg-black/80 transition-all">
                  <span className="text-emerald-500 font-black text-lg mr-2">02.</span>
                  <span className="font-bold text-white uppercase text-[10px] tracking-widest">Acesso ao Browser:</span>
                  <p className="mt-2 text-white/60">Dentro da Trust Wallet, clique no ícone <strong>Navegador / Browser / descobrir / explore</strong> e cole o nosso link oficial de importação.</p>
                </div>

                <div className="bg-black/60 p-5 rounded-2xl border-l-4 border-blue-500 hover:bg-black/80 transition-all">
                  <span className="text-blue-500 font-black text-lg mr-2">03.</span>
                  <span className="font-bold text-white uppercase text-[10px] tracking-widest">Protocolo de Conexão:</span>
                  <p className="mt-2 text-white/60">Clique em <strong>Conectar Carteira (1)</strong>. Certifique-se de que a rede selecionada é a Smart Chain (BSC).</p>
                </div>

                <div className="bg-black/60 p-5 rounded-2xl border-l-4 border-[#F5F5F5] hover:bg-black/80 transition-all">
                  <span className="text-[#F5F5F5] font-black text-lg mr-2">04.</span>
                  <span className="font-bold text-white uppercase text-[10px] tracking-widest">Mapeamento Token:</span>
                  <p className="mt-2 text-white/60">Clique em <strong>Importar Tokens (2)</strong> e o sistema enviará os metadados e logótipos para a sua carteira.</p>
                </div>
              </div>

              <p className="font-medium text-[#D4AF37] italic border-t border-white/10 pt-4">
                Seja bem-vindo à independência financeira eminente. De 2025 para sempre E-Coiner. Yeah! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 CARD DE AÇÃO (REDIRECT) */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1200px]">
          <div className="
            relative overflow-hidden
            bg-gradient-to-br from-[#D4AF37]/20 via-black/60 to-[#F5F5F5]/10
            border border-[#D4AF37]/40 rounded-3xl p-8 backdrop-blur-2xl
            hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)]
            transition-all duration-500 group flex flex-col gap-6
          ">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                  <Download size={24} className="text-[#D4AF37] animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-[#D4AF37] tracking-tight">
                  Portal de Importação Inteligente ⚡
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                <Globe size={12} className="text-[#D4AF37]" />
                <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">Web3 Automation</span>
              </div>
            </div>

            <p className="text-[#F5F5F5]/90 text-sm leading-relaxed">
              Clique no botão abaixo para copiar o link oficial ou aceder diretamente ao motor de importação. Utilize este link exclusivamente dentro do **Browser/descobrir/explore da Trust Wallet**.
            </p>

            {/* BARRA DE LINK COM BOTÃO COPY ANIMADO */}
            <div className="flex flex-col sm:flex-row items-center gap-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-4 backdrop-blur-md">
              <code className="flex-1 text-xs text-[#D4AF37] font-mono break-all opacity-80">
                {importLink}
              </code>

              <button onClick={copyLink} className="relative min-w-[100px]">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  animate={copied ? { boxShadow: "0 0 18px rgba(212,175,55,0.6)", scale: [1, 1.05, 1] } : {}}
                  className="relative overflow-hidden rounded-full border border-[#D4AF37]/40 px-6 py-2 text-[10px] font-black uppercase text-[#D4AF37] bg-black/60 tracking-widest"
                >
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 2 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-white/20 to-[#D4AF37]/30 blur-md"
                      />
                    )}
                  </AnimatePresence>

                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {copied ? <><Check size={12} strokeWidth={4} /> Copied</> : "Copy Link"}
                  </span>
                </motion.div>
              </button>
            </div>


            {/* BOTÃO COM LINK REDIRECIONADO */}
            <Link
              href={importLink}
              target="_blank"
              className="
                flex items-center justify-center gap-3
                py-5 rounded-2xl font-black text-sm
                bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5]
                text-black hover:brightness-110 hover:gap-6
                transition-all duration-300 uppercase tracking-[0.2em]
              "
            >
              <Fingerprint size={18} fill="black" />
              Copiar Link & Importar Agora 🤖
              <ExternalLink size={14} />
            </Link>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
               <code className="text-[#D4AF37] text-xs font-mono break-all selection:bg-[#D4AF37] selection:text-black">
                {importLink}
               </code>
            </div>

            <div className="flex justify-center items-center gap-2">
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">
                Protocolo E-Coin Neural Web3 V3
              </p>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
