"use client";

import { useState } from "react";
import ReferralModalContent from "@/components/ReferralModalContent";

export default function ReferralModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center my-4">
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black text-xs font-bold py-2.5 px-6 rounded-full uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
      >
        🎁 Convidar Amigos
      </button>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-[#0d0d0f] p-6 rounded-2xl border border-[#00FF9C]/30 w-full max-w-sm relative shadow-2xl"
          >
            <h3 className="text-[#00FF9C] text-md font-bold uppercase tracking-wider mb-4">
              Referral System Dashboard
            </h3>
            <ReferralModalContent />
          </div>
        </div>
      )}
    </div>
  );
}