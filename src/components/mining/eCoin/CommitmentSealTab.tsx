"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Award, Lock, Zap } from "lucide-react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

// Contratos e ABIs
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinEcGasSaleAbi } from "@/lib/abis/eCoinMining/eCoinEcGasSaleAbi";

// Hooks e Componentes Internos
import { useEcGas } from "@/hooks/eCoinMining/useEcGas";
import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";
import { useTransactionStateeCoin } from "@/hooks/eCoinMining/useTransactionStateeCoin";
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
  const isValid =
    value !== "" &&
    !isNaN(Number(normalizedValue)) &&
    Number(normalizedValue) > 0;
  return { value, normalizedValue, setValue, onChange, isValid };
}

export default function CommitmentSealTab() {
  const { address } = useAccount();
  const gas = useEcGas(address);
  const mining = useMiningStakingeCoin();
  const csTx = useTransactionStateeCoin();
  const amountInput = useSafeNumberInput();

  // Verificação de retenção de eCoin ativa (Shareholder Ativo)
  const isStakeActive = Boolean(
    mining.stakeActive ?? Number(mining.userStake) > 0
  );

  // Leitura de disponibilidade de emissão via EcGasSaleECoin.ecoinEnabled()
  const { data: ecoinEnabled } = useReadContract({
    address: CONTRACTS.ecGas_Sale_eCoin,
    abi: eCoinEcGasSaleAbi,
    functionName: "ecoinEnabled",
    chainId: 56,
  });

  useEffect(() => {
    if (gas.gasPending) {
      csTx.setState("confirming");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gas.gasPending]);

  useEffect(() => {
    if (gas.gasConfirmed) {
      csTx.setState("success");
      amountInput.setValue("");
      const timer = setTimeout(() => {
        csTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gas.gasConfirmed]);

  const isSystemActive = Boolean(ecoinEnabled);
  const isCanEmit = Boolean(address) && isSystemActive && isStakeActive;

  const ecoinBalance = gas.ecoinBalance ?? 0n;
  const walletECoin = Number(formatUnits(ecoinBalance, 18));
  const inputAmountNum = Number(amountInput.normalizedValue) || 0;
  // Espelha capacityFromECoin(uint256) do contrato: (ecoinAmount * 13000) / 10000 = 1.3x
  const estimatedCapacityAdded = inputAmountNum * 1.3;

  const handleSetMax = () => {
    if (ecoinBalance > 0n) {
      amountInput.setValue(formatUnits(ecoinBalance, 18));
    }
  };

  const handleAcquireCS = async () => {
    if (!address) {
      alert("Conecte sua carteira para emitir o Selo de Compromisso (CS).");
      return;
    }

    if (!isStakeActive) {
      alert(
        "Retenção de eCoin inativa. Efetue stake na aba de Retenção para ativar sua posição de Shareholder."
      );
      return;
    }

    if (!amountInput.isValid) {
      alert("Insira um valor válido em eCoin maior que zero.");
      return;
    }

    try {
      const parsed = parseUnits(amountInput.normalizedValue, 18);

      if (parsed > ecoinBalance) {
        alert("Saldo de eCoin insuficiente na carteira.");
        return;
      }

      csTx.setState("wallet");
      await gas.buyGasECoin(parsed);
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
            A emissão de Selos está <strong>bloqueada</strong>. Efetue o stake
            de <strong>eCoin</strong> na aba <strong>ações</strong> para
            habilitar a emissão de Selos (CS).
          </span>
        </div>
      )}

      {/* BARRA DE SALDO E MOEDA EXCLUSIVA ECOIN */}
      <div className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-2xl mb-6 border border-white/5 text-xs">
        <span className="text-zinc-400 font-mono uppercase tracking-wider">
          Ativo de Emissão: <strong className="text-[#D4AF37]">eCoin</strong>
        </span>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-zinc-500">
            Saldo:{" "}
            <strong className="text-white">
              {walletECoin.toLocaleString("en-US", {
                maximumFractionDigits: 4,
              })}{" "}
              eCoin
            </strong>
          </span>
          {ecoinBalance > 0n && isCanEmit && (
            <button
              type="button"
              onClick={handleSetMax}
              className="px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 text-[10px] font-black uppercase cursor-pointer transition-colors"
            >
              MAX
            </button>
          )}
        </div>
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
            placeholder="Quantidade em eCoin..."
            value={amountInput.value}
            onChange={(e) => amountInput.onChange(e.target.value)}
            className="w-full bg-black/40 border border-white/10 group-focus-within:border-[#D4AF37]/50 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] text-xs font-mono font-bold">
            eCoin
          </div>
        </div>

        <TxButton
          state={csTx.state}
          disabled={!isCanEmit}
          idleText={
            !isStakeActive ? "Retenção Necessária" : "Emitir CS com eCoin"
          }
          className="px-8 py-4 rounded-2xl font-black whitespace-nowrap bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-black shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
          onClick={handleAcquireCS}
        />
      </div>

      {/* PREVIEW DE CAPACIDADE ADICIONADA (1.3x = 130%) */}
      {inputAmountNum > 0 && (
        <div className="mt-4 px-4 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-400" />
            Capacidade de Mineração Adicionada:
          </span>
          <span className="text-emerald-400 font-black">
            +{estimatedCapacityAdded.toFixed(4)} eCoin
          </span>
        </div>
      )}

      <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed flex items-center gap-1.5">
        <Award size={14} className="text-[#D4AF37] shrink-0" />
        Ative o seu <strong>Selo de Compromisso (CS)</strong> com{" "}
        <strong>eCoin</strong> para expandir em <strong>130%</strong> o
        seu teto operacional de mineração e governança de Shareholder.
      </p>
    </div>
  );
}