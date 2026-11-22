"use client";

import { useState, useEffect } from "react";
import { Fuel, Zap } from "lucide-react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

// Contratos e ABIs
import { CONTRACTS } from "@/lib/contracts/contracts";
import { ecGasSaleAbi } from "@/lib/abis/eCoinMining/ecGasSaleAbi";

// Hooks e Componentes Internos
import { useEcGas } from "@/hooks/eCoinMining/useEcGas";
import { useTransactionState } from "@/hooks/eCoinMining/useTransactionState";
import TxButton from "@/components/TxButton";

// Helper hook local para validação de input numérico
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

export default function GasVaultTab() {
  const { address } = useAccount();
  const gas = useEcGas(address);
  const gasTx = useTransactionState();
  const amountInput = useSafeNumberInput();

  // Leitura de disponibilidade da venda de ecGas exclusivamente em eCoin (EcGasSaleECoin.ecoinEnabled)
  const { data: ecoinEnabled } = useReadContract({
    address: CONTRACTS.ecGas_Sale_eCoin,
    abi: ecGasSaleAbi,
    functionName: "ecoinEnabled",
  });

  // Controle do estado da transação
  useEffect(() => {
    if (gas.gasPending) {
      gasTx.setState("confirming");
    }
  }, [gas.gasPending]);

  useEffect(() => {
    if (gas.gasConfirmed) {
      gasTx.setState("success");
      amountInput.setValue("");
      const timer = setTimeout(() => {
        gasTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gas.gasConfirmed]);

  const isSystemActive = Boolean(ecoinEnabled);
  const canBuy = Boolean(address) && isSystemActive;

  const ecoinBalance = gas.ecoinBalance ?? 0n;
  const walletECoin = Number(formatUnits(ecoinBalance, 18));

  const remainingCapacity = Number(
    formatUnits(gas.gasStats?.remainingCapacity ?? 0n, 18)
  );
  const usedCapacity = Number(
    formatUnits(gas.gasStats?.usedCapacity ?? 0n, 18)
  );
  const maxCapacity = Number(
    formatUnits(gas.gasStats?.maxCapacity ?? 0n, 18)
  );

  const inputAmountNum = Number(amountInput.normalizedValue) || 0;
  // Espelha capacityFromECoin(uint256) do contrato de mining: (ecoinAmount * 13000) / 10000 = 1.3x
  const capacityToAdd = inputAmountNum * 1.3;

  const handleSetMax = () => {
    if (ecoinBalance > 0n) {
      amountInput.setValue(formatUnits(ecoinBalance, 18));
    }
  };

  const handleBuyGas = async () => {
    if (!address) {
      alert("Conecte sua carteira para comprar capacidade ecGas.");
      return;
    }

    if (!isSystemActive) {
      alert("A compra de ecGas com eCoin está pausada no momento.");
      return;
    }

    try {
      if (!amountInput.isValid) {
        alert("Insira um valor válido em eCoin maior que zero.");
        return;
      }

      const parsed = parseUnits(amountInput.normalizedValue, 18);

      if (parsed > ecoinBalance) {
        alert("Saldo de eCoin insuficiente na carteira.");
        return;
      }

      gasTx.setState("wallet");
      await gas.buyGasECoin(parsed);
      gasTx.setState("submitted");
    } catch (error) {
      console.error("Erro na compra de ecGas com eCoin:", error);
      gasTx.setState("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
      {/* HEADER DO PAINEL */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-[#D4AF37]">
          <Fuel size={18} /> Compra ecGas (eCoin)
        </h3>

        {/* STATUS BADGE */}
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            isSystemActive
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-red-500/10 text-red-500 border-red-500/20"
          }`}
        >
          {isSystemActive ? "Sistema Ativo" : "Sistema Pausado"}
        </div>
      </div>

      {/* RESUMO DA CAPACIDADE ATUAL NO COFRE */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-3">
          <span className="text-[10px] text-zinc-500 uppercase font-mono block">
            Gás Restante
          </span>
          <span className="text-sm font-black text-emerald-400 font-mono">
            {remainingCapacity.toFixed(4)} eCoin
          </span>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-3">
          <span className="text-[10px] text-zinc-500 uppercase font-mono block">
            Gás Consumido
          </span>
          <span className="text-sm font-black text-white font-mono">
            {usedCapacity.toFixed(4)} eCoin
          </span>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-3">
          <span className="text-[10px] text-zinc-500 uppercase font-mono block">
            Capacidade Total
          </span>
          <span className="text-sm font-black text-[#D4AF37] font-mono">
            {maxCapacity.toFixed(4)} eCoin
          </span>
        </div>
      </div>

      {/* BARRA DE ATIVO EXCLUSIVO ECOIN E SALDO */}
      <div className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-2xl mb-6 border border-white/5 text-xs font-mono">
        <span className="text-zinc-400 uppercase tracking-wider">
          Ativo de Pagamento: <strong className="text-[#D4AF37]">eCoin</strong>
        </span>

        <div className="flex items-center gap-2">
          <span className="text-zinc-500">
            Saldo:{" "}
            <strong className="text-white">
              {walletECoin.toLocaleString("en-US", {
                maximumFractionDigits: 4,
              })}{" "}
              eCoin
            </strong>
          </span>
          {ecoinBalance > 0n && canBuy && (
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
            disabled={!canBuy}
            placeholder="Insira a quantidade em eCoin..."
            value={amountInput.value}
            onChange={(e) => amountInput.onChange(e.target.value)}
            className="w-full bg-black/40 border border-white/10 group-focus-within:border-[#D4AF37]/50 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37] text-xs font-mono font-bold">
            eCoin
          </div>
        </div>

        <TxButton
          state={gasTx.state}
          disabled={!canBuy}
          idleText="Comprar com eCoin"
          className="px-8 py-4 rounded-2xl font-black whitespace-nowrap bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-black shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
          onClick={handleBuyGas}
        />
      </div>

      {/* PREVIEW DE CAPACIDADE ADICIONADA (1.3x = 130%) */}
      {inputAmountNum > 0 && (
        <div className="mt-4 px-4 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-400" />
            Capacidade Creditada (1.3x):
          </span>
          <span className="text-emerald-400 font-black">
            +{capacityToAdd.toFixed(4)} eCoin
          </span>
        </div>
      )}

      <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed">
        Abasteça sua capacidade de <strong>ecGas</strong> com{" "}
        <strong>eCoin</strong> para receber <strong>(130%)</strong> em
        teto de recompensas de mineração diretamente via{" "}
        <code>EcGasSaleECoin.buyECoin</code>.
      </p>
    </div>
  );
}