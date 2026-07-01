"use client";

import ReferralModalContent from "@/components/ReferralModalContent";

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-[#0d0d0f] p-6 rounded-2xl border border-[#00FF9C]/30 w-full max-w-sm"
      >
        <h3 className="text-[#00FF9C] text-md font-bold uppercase tracking-wider mb-4">
          Referral System Dashboard
        </h3>
        <ReferralModalContent />
      </div>
    </div>
  );
}