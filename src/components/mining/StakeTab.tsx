"use client";

import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import TxButton from "@/components/TxButton";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useTransactionState } from "@/hooks/useTransactionState";

function useInternalNumberInput(initial = "") {
  const [value, setValue] = useState(initial);
  const onChange = (input: string) => {
    const raw = input.replace(",", ".").replace(/[^\d.]/g, "");
    if (/^\d*\.?\d*$/.test(raw)) {
      setValue(raw);
    }
  };
  const normalizedValue = value.replace(",", ".").trim() || "0";
  const isValid = value.trim() !== "" && !isNaN(Number(normalizedValue)) && Number(normalizedValue) > 0;
  return { value, normalizedValue, setValue, onChange, isValid };
}

interface StakeTabProps {
  customWalletBalance?: number | string;
  customUserStake?: number | string;
}

export default function StakeTab({
  customWalletBalance,
  customUserStake,
}: StakeTabProps) {
  const mining = useMiningStaking();
  const depositTx = useTransactionState();
  const amountInput = useInternalNumberInput();

  // Sincronização do estado visual do botão com o contrato
  useEffect(() => {
    if (mining.stakePending) {
      depositTx.setState("confirming");
    }
  }, [mining.stakePending, depositTx]);

  useEffect(() => {
    if (mining.stakeConfirmed) {
      depositTx.setState("success");
      const timer = setTimeout(() => {
        depositTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mining.stakeConfirmed, depositTx]);

  // Resolução de saldos (Props > Hook interno)
  const balance = Number(customWalletBalance ?? mining.walletBalance ?? 0);
  const staked = Number(customUserStake ?? mining.userStake ?? 0);

  const setStakePercentage = (percent: number) => {
    const value = (balance * percent) / 100;
    amountInput.setValue(value > 0 ? value.toString() : "0");
  };

  const setUnstakePercentage = (percent: number) => {
    const value = (staked * percent) / 100;
    amountInput.setValue(value > 0 ? value.toString() : "0");
  };

  const handleStake = async () => {
    if (!amountInput.isValid) {
      alert("Por favor, insira uma quantia válida para retenção de ações.");
      return;
    }
    try {
      depositTx.setState("wallet");
      await mining.stake(amountInput.normalizedValue);
      depositTx.setState("submitted");
    } catch (error) {
      console.error("Erro ao efetuar retenção:", error);
      depositTx.setState("error");
    }
  };

  const handleUnstake = async () => {
    if (!amountInput.isValid) {
      alert("Por favor, insira uma quantia válida para liberação.");
      return;
    }
    try {
      await mining.unstake(amountInput.normalizedValue);
    } catch (error) {
      console.error("Erro na liberação de ações:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#0d0d0f] border border-white/5 rounded-3xl p-6 md:p-8">
      <h2 className="text-md font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-[#D4AF37]">
        <ShieldCheck size={20} /> Gestão de Retenção de Ações (eCoin)
      </h2>
      <div className="space-y-6">
        <div>
          <label className="text-xs text-white/40 uppercase font-bold mb-2 block">
            Quantidade para Retenção
          </label>
          <div className="relative">
            <input
              inputMode="decimal"
              type="text"
              placeholder="0.00"
              value={amountInput.value}
              onChange={(e) => amountInput.onChange(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-lg font-bold focus:outline-none focus:border-[#D4AF37]/50"
            />
            <button
              type="button"
              onClick={() => setStakePercentage(100)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-[#D4AF37] text-black px-2.5 py-1 rounded hover:bg-white transition-colors cursor-pointer"
            >
              MAX
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">
              % a Reter
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[25, 50, 100].map((p) => (
                <button
                  key={`st-${p}`}
                  type="button"
                  onClick={() => setStakePercentage(p)}
                  className="text-[10px] py-2 rounded bg-white/5 border border-white/5 hover:border-[#D4AF37] transition text-white/80 hover:text-white cursor-pointer"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] text-white/40 mb-2 uppercase tracking-wider">
              % a Liberar
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {[25, 50, 100].map((p) => (
                <button
                  key={`un-${p}`}
                  type="button"
                  onClick={() => setUnstakePercentage(p)}
                  className="text-[10px] py-2 rounded bg-red-500/5 border border-red-500/10 hover:border-red-500 transition text-red-400 cursor-pointer"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <TxButton
            state={depositTx.state}
            idleText="RETER AÇÕES"
            className="bg-[#D4AF37] text-black font-black py-4 rounded-xl text-xs tracking-wider uppercase hover:bg-white transition-all cursor-pointer"
            onClick={handleStake}
          />
          <button
            type="button"
            onClick={handleUnstake}
            className="bg-white/5 border border-white/10 text-white font-black py-4 rounded-xl text-xs tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer"
          >
            LIBERAR AÇÕES
          </button>
        </div>
      </div>
    </div>
  );
}