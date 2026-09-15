"use client";

import { useState } from "react";
import ReferralModalContent from "@/components/ReferralModalContent";
import { X } from "lucide-react";

export default function ReferralModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center my-4">
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black text-xs font-bold py-2.5 px-6 rounded-full uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg active:scale-95"
      >
        🎁 Convidar Amigos
      </button>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-[99999] p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#0d0d0f] p-4 sm:p-6 rounded-2xl border border-[#00FF9C]/30 w-full max-w-md relative shadow-2xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* CABEÇALHO COM BOTÃO FECHAR FIXO */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#00FF9C]/20 shrink-0">
              <h3 className="text-[#00FF9C] text-xs sm:text-sm font-bold uppercase tracking-wider truncate">
                Referral System
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTEÚDO COM SCROLL AUTO */}
            <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
              <ReferralModalContent onClose={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}