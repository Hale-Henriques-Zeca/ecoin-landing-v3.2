"use client";

import React, { useState, useRef, useEffect } from "react";
import { Wallet, ChevronDown, X, Sparkles } from "lucide-react";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

export interface EcoinWalletModalProps {
  className?: string;
}

export default function EcoinWalletModal({ className = "" }: EcoinWalletModalProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora ou pressionar ESC
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* 🪙 BOTÃO PRINCIPAL (Inspirado na Luxury EdenKingDom / Language Selector) */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 bg-black/80 border border-[#00FF9C]/40 rounded-full px-5 py-2.5 text-[#00FF9C] hover:bg-[#00FF9C] hover:text-black transition-all shadow-lg backdrop-blur-xl group"
      >
        <Wallet size={10} className="transition-transform group-hover:scale-110" />
        <span className="text-xs font-bold uppercase tracking-wider">Balance</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* 🔽 DROPDOWN PAINEL FLUTUANTE */}
      {open && (
        <div
          className="
            absolute
            top-full
            mt-3
            right-0
            md:right-0

            max-md:fixed
            max-md:left-1/2
            max-md:-translate-x-1/2
            max-md:top-[72px]

            w-[94vw]
            max-w-[420px]
            md:w-96

            bg-black/90
            backdrop-blur-xl

            rounded-2xl
            shadow-2xl

            border
            border-[#00FF9C]/40
            border-t-2
            border-t-[#00FF9C]

            p-4
            z-[9999]
            animate-fadeIn
          "
        >
          {/* CABEÇALHO COM BOTÃO FECHAR */}
          <div className="flex items-center justify-between pb-3 border-b border-[#00FF9C]/20 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#00FF9C]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#00FF9C]">
                Balance
              </span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Fechar"
            >
              <X size={16} />
            </button>
          </div>

          {/* DASHBOARD IMPORTADO */}
          <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
            <EcoinWalletDashboard />
          </div>
        </div>
      )}
    </div>
  );
}