"use client";

import { Gift } from "lucide-react";
import TxButton from "@/components/TxButton";
import ClaimCooldown from "@/components/ClaimCooldown";

interface RecompensasTabProps {
  pendingUSDT: number;
  pendingEUSD: number;
  totalRewardsUSD: number;
  withdrawFeeUSD: number;
  withdrawNetUSD: number;
  claimTxState: any;
  onClaim: () => Promise<void>;
}

export default function RecompensasTab({
  pendingUSDT,
  pendingEUSD,
  totalRewardsUSD,
  withdrawFeeUSD,
  withdrawNetUSD,
  claimTxState,
  onClaim,
}: RecompensasTabProps) {
  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#D4AF37]/10 to-[#0d0d0f] border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-md font-bold uppercase tracking-wider flex items-center gap-2 text-[#D4AF37]">
          <Gift size={20} /> Recompensas Disponíveis
        </h2>
      </div>

      <div className="text-center py-8 border-y border-white/5 mb-6">
        <span className="text-xs text-white/40 uppercase tracking-widest block mb-2">
          Pronto para Retirada
        </span>
        <div className="space-y-2">
          <div className="text-3xl font-black text-emerald-400">
            {pendingUSDT.toFixed(7)} USDT
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {pendingEUSD.toFixed(7)} eDollar
          </div>
        </div>
      </div>

      {totalRewardsUSD > 0 && (
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Total das Recompensas</span>
            <span className="font-bold text-white">{totalRewardsUSD.toFixed(6)} USD</span>
          </div>
          <div className="flex justify-between text-sm text-red-400">
            <span>Taxa de Saque (1%)</span>
            <span>-{withdrawFeeUSD.toFixed(6)} USD</span>
          </div>
          <div className="h-px bg-white/10" />
          <div className="flex justify-between text-base font-black text-emerald-400">
            <span>Você Receberá</span>
            <span>{withdrawNetUSD.toFixed(6)} USD</span>
          </div>
        </div>
      )}

      <TxButton
        state={claimTxState}
        idleText="SACAR RECOMPENSAS"
        className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#D4AF37] text-black hover:bg-white transition-all"
        onClick={onClaim}
      />
      <div className="text-center text-[10px] text-white/30 mt-3">
        <ClaimCooldown />
      </div>
    </div>
  );
}