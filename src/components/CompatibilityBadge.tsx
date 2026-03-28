"use client";

import Link from "next/link";
import { Monitor, Smartphone, ChevronRight,ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function CompatibilityBadge() {
  return (
    <div className="w-full max-w-[340px] mt-4 mx-auto space-y-3">
      
      {/* ⚠️ PAINEL DE COMPATIBILIDADE */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
        <h4 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
          <ShieldCheck size={12} /> Compatibilidade Atual
        </h4>
        
        <div className="space-y-3">
          {/* DESKTOP */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
              <Monitor size={14} className="text-blue-400" />
              <span>Desktop (Windows)</span>
            </div>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
              MetaMask
            </span>
          </div>

          {/* MOBILE */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
              <Smartphone size={14} className="text-emerald-400" />
              <span>Mobile (App)</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
              Trust Wallet
            </span>
          </div>
        </div>
      </div>

      {/* 🚀 BOTÃO DE ACESSO AO GUIA COMPLETO */}
      <Link href="/import-guide" className="group">
        <motion.div 
          whileHover={{ x: 5 }}
          className="flex items-center justify-between bg-gradient-to-r from-black/40 to-black/20 border border-white/5 p-4 rounded-2xl hover:border-[#D4AF37]/30 transition-all cursor-pointer"
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Aprender mais</span>
            <span className="text-xs text-[#F5F5F5] font-semibold">Guia Completo de Importação</span>
          </div>
          <div className="bg-[#D4AF37]/10 p-2 rounded-full text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
            <ChevronRight size={16} />
          </div>
        </motion.div>
      </Link>

      <p className="text-[8px] text-center text-white/20 uppercase tracking-widest">
        E-Coin Protocol Standard • BEP-20
      </p>
    </div>
  );
}
