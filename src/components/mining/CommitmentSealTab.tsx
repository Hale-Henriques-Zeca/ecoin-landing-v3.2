"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Award, Lock } from "lucide-react";
import { parseUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

// Contratos e ABIs
import { CONTRACTS } from "@/lib/contracts/contracts";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";

// Hooks e Componentes Internos
import { useEcGas } from "@/hooks/useEcGas";
import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useTransactionState } from "@/hooks/useTransactionState";
import TxButton from "@/components/TxButton";

function useSafeNumberInput(initial = "") {
  const [value, setValue] = useState(initial);
  const onChange = (input: string) => {
    const raw = input.replace(",", ".").replace(/[^\d.]/g, "");
    if (/^\d*\.?\d*$/.test(raw)) {
      setValue(raw);
    }
  };
  const normalizedValue = value.replace(",", ".").trim() || "0";
  const isValid = value !== "" && !isNaN(Number(normalizedValue)) && Number(normalizedValue) > 0;
  return { value, normalizedValue, setValue, onChange, isValid };
}

export default function CommitmentSealTab() {
  const { address } = useAccount();
  const gas = useEcGas(address);
  const mining = useMiningStaking();
  const csTx = useTransactionState();
  const amountInput = useSafeNumberInput();

  const [csToken, setCsToken] = useState<"USDT" | "EUSD">("USDT");

  // Verificação de retenção de ações ativa (Shareholder Ativo)
  const isStakeActive = Boolean(mining.stakeActive ?? (Number(mining.userStake) > 0));

  // Leitura de disponibilidade de emissão de Selos via Contrato
  const { data: usdtEnabled } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "usdtEnabled",
  });

  const { data: eusdEnabled } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: "eusdEnabled",
  });

  useEffect(() => {
    if (gas.gasPending) {
      csTx.setState("confirming");
    }
  }, [gas.gasPending]);

  useEffect(() => {
    if (gas.gasConfirmed) {
      csTx.setState("success");
      const timer = setTimeout(() => {
        csTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gas.gasConfirmed]);

  const isSystemActive = csToken === "USDT" ? !!usdtEnabled : !!eusdEnabled;
  const isCanEmit = isSystemActive && isStakeActive;

  const handleAcquireCS = async () => {
    if (!isStakeActive) {
      alert("Retenção de Ações inativa. Retenha suas ações na aba Gestão de Retenção de Ações para ativar sua posição de Shareholder.");
      return;
    }

    if (!amountInput.isValid) {
      alert("Insira um valor válido maior que zero.");
      return;
    }

    try {
      csTx.setState("wallet");
      const parsed = parseUnits(amountInput.normalizedValue, 18);

      if (csToken === "USDT") {
        await gas.buyGasUSDT(parsed);
      } else {
        await gas.buyGasEUSD(parsed);
      }
      csTx.setState("submitted");
    } catch (error) {
      console.error("Erro na aquisição do Selo de Compromisso (CS):", error);
      csTx.setState("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
      {/* HEADER DO PAINEL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-[#D4AF37]">
          <ShieldCheck size={18} /> Aquisição de Selo de Compromisso (CS)
        </h3>

        {/* STATUS BADGES */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              isStakeActive
                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
            }`}
          >
            {isStakeActive ? "Shareholder Ativo" : "Shareholder Inativo"}
          </div>

          <div
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              isSystemActive
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            }`}
          >
            {isSystemActive ? "Emissão Ativa" : "Emissão Pausada"}
          </div>
        </div>
      </div>

      {/* ALERTA QUANDO SHAREHOLDER ESTIVER INATIVO */}
      {!isStakeActive && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-400 text-xs">
          <Lock size={18} className="shrink-0 text-amber-400" />
          <span>
            A emissão de Selos está <strong>bloqueada</strong>. Efetue a retenção de ações na aba <strong>Stake</strong> para habilitar a emissão de Selos (CS).
          </span>
        </div>
      )}

      {/* TOKEN SWITCHER */}
      <div className="flex bg-black/40 p-1 rounded-2xl mb-6 border border-white/5">
        <button
          type="button"
          onClick={() => setCsToken("USDT")}
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
            csToken === "USDT"
              ? "bg-[#D4AF37] text-black shadow-lg"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          USDT
        </button>
        <button
          type="button"
          onClick={() => setCsToken("EUSD")}
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
            csToken === "EUSD"
              ? "bg-[#D4AF37] text-black shadow-lg"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          eDollar
        </button>
      </div>

      {/* BUY INPUT AREA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <input
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            type="text"
            disabled={!isCanEmit}
            placeholder={`Quantidade em ${csToken}...`}
            value={amountInput.value}
            onChange={(e) => amountInput.onChange(e.target.value)}
            className="w-full bg-black/40 border border-white/10 group-focus-within:border-[#D4AF37]/50 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
            {csToken}
          </div>
        </div>

        <TxButton
          state={csTx.state}
          disabled={!isCanEmit}
          idleText={!isStakeActive ? "Retenção Necessária" : `Emitir CS com ${csToken}`}
          className="px-8 py-4 rounded-2xl font-black whitespace-nowrap bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-black shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
          onClick={handleAcquireCS}
        />
      </div>

      <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed flex items-center gap-1.5">
        <Award size={14} className="text-[#D4AF37] shrink-0" />
        Ative o seu <strong>Selo de Compromisso (CS)</strong> para expandir seu teto operacional de dividendos e governança de Shareholder. Transações auditadas via contratos inteligentes.
      </p>
    </div>
  );
}