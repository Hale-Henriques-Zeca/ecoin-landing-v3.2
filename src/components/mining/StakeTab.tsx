"use client";

import { Zap } from "lucide-react";
import TxButton from "@/components/TxButton";

interface StakeTabProps {
  amountInput: {
    value: string;
    normalizedValue: string;
    onChange: (val: string) => void;
    isValid: boolean;
  };
  setStakePercentage: (p: number) => void;
  setUnstakePercentage: (p: number) => void;
  depositTxState: any;
  onStake: () => Promise<void>;
  onUnstake: () => void;
}

export default function StakeTab({
  amountInput,
  setStakePercentage,
  setUnstakePercentage,
  depositTxState,
  onStake,
  onUnstake,
}: StakeTabProps) {
  return (
    <div className="max-w-2xl mx-auto bg-[#0d0d0f] border border-white/5 rounded-3xl p-6 md:p-8">
      <h2 className="text-md font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-[#D4AF37]">
        <Zap size={20} /> Gerenciar Depósito de eCoin
      </h2>
      <div className="space-y-6">
        <div>
          <label className="text-xs text-white/40 uppercase font-bold mb-2 block">Quantia a Enviar</label>
          <div className="relative">
            <input
              inputMode="decimal"
              type="text"
              placeholder="0.00"
              value={amountInput.value}
              onChange={(e) => amountInput.onChange(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-lg font-bold focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button onClick={() => setStakePercentage(100)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-[#D4AF37] text-black px-2.5 py-1 rounded">MAX</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">% a Depositar</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[25, 50, 100].map((p) => (
                <button key={`st-${p}`} onClick={() => setStakePercentage(p)} className="text-[10px] py-2 rounded bg-white/5 border border-white/5 hover:border-[#D4AF37] transition">{p}%</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">% a Remover</p>
            <div className="grid grid-cols-3 gap-1.5">
              {[25, 50, 100].map((p) => (
                <button key={`un-${p}`} onClick={() => setUnstakePercentage(p)} className="text-[10px] py-2 rounded bg-red-500/5 border border-red-500/10 hover:border-red-500 transition text-red-400">{p}%</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <TxButton
            state={depositTxState}
            idleText="DEPOSITAR"
            className="bg-[#D4AF37] text-black font-black py-4 rounded-xl text-xs tracking-wider uppercase hover:bg-white transition-all"
            onClick={onStake}
          />
          <button
            onClick={onUnstake}
            className="bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-xs tracking-wider uppercase hover:bg-white/10 transition-all"
          >
            REMOVER
          </button>
        </div>
      </div>
    </div>
  );
}