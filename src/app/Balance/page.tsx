"use client";

import EcoinWalletModal from "@/components/EcoinWalletModal";

export default function BalancePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* BOTÃO ECOIN WALLET MODAL (Novo Flutuante) */}
      <div>
        <EcoinWalletModal />
      </div>
    </div>
  );
}