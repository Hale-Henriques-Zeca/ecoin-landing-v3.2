"use client";

import { useState, useEffect } from "react";
import { Fuel } from "lucide-react";
import { parseUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

// Contratos e ABIs
import { CONTRACTS } from "@/lib/contracts/contracts";
import { ecGasSaleAbi } from "@/lib/abis/ecGasSaleAbi";

// Hooks e Componentes Internos
import { useEcGas } from "@/hooks/useEcGas";
import { useTransactionState } from "@/hooks/useTransactionState";
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
  const isValid = value !== "" && !isNaN(Number(normalizedValue)) && Number(normalizedValue) > 0;
  return { value, normalizedValue, setValue, onChange, isValid };
}

export default function GasVaultTab() {
  const { address } = useAccount();
  const gas = useEcGas(address);
  const gasTx = useTransactionState();
  const amountInput = useSafeNumberInput();

  const [gasToken, setGasToken] = useState<"USDT" | "EUSD">("USDT");

  // Leitura de disponibilidade dos tokens
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

  // Controle do estado da transação
  useEffect(() => {
    if (gas.gasPending) {
      gasTx.setState("confirming");
    }
  }, [gas.gasPending]);

  useEffect(() => {
    if (gas.gasConfirmed) {
      gasTx.setState("success");
      setTimeout(() => {
        gasTx.setState("idle");
      }, 2000);
    }
  }, [gas.gasConfirmed]);

  const isSystemActive = gasToken === "USDT" ? !!usdtEnabled : !!eusdEnabled;

  const handleBuyGas = async () => {
    try {
      if (!amountInput.isValid) {
        alert("Insira um valor válido maior que zero.");
        return;
      }
      gasTx.setState("wallet");
      const parsed = parseUnits(amountInput.normalizedValue, 18);
      
      if (gasToken === "USDT") {
        await gas.buyGasUSDT(parsed);
      } else {
        await gas.buyGasEUSD(parsed);
      }
      gasTx.setState("submitted");
    } catch (error) {
      console.error("Erro na compra de ecGas:", error);
      gasTx.setState("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-950/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
      {/* HEADER DO PAINEL */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2 text-[#D4AF37]">
          <Fuel size={18} /> Compra ecGas
        </h3>

        {/* STATUS BADGE */}
        <div
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            isSystemActive
              ? "bg-green-500/10 text-green-500 border-green-500/20"
              : "bg-red-500/10 text-red-500 border-red-500/20"
          }`}
        >
          {isSystemActive ? "Sistema Ativo" : "Sistema Pausado"}
        </div>
      </div>

      {/* TOKEN SWITCHER */}
      <div className="flex bg-black/40 p-1 rounded-2xl mb-6 border border-white/5">
        <button
          onClick={() => setGasToken("USDT")}
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
            gasToken === "USDT"
              ? "bg-[#D4AF37] text-black shadow-lg"
              : "text-zinc-500 hover:text-white"
          }`}
        >
          USDT
        </button>
        <button
          onClick={() => setGasToken("EUSD")}
          className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${
            gasToken === "EUSD"
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
            placeholder={`Enter ${gasToken} amount...`}
            value={amountInput.value}
            onChange={(e) => amountInput.onChange(e.target.value)}
            className="w-full bg-black/40 border border-white/10 group-focus-within:border-[#D4AF37]/50 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-600 outline-none transition-all duration-300"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono">
            {gasToken}
          </div>
        </div>

        <TxButton
          state={gasTx.state}
          idleText={`Comprar Com ${gasToken}`}
          className="px-8 py-4 rounded-2xl font-black whitespace-nowrap bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-black shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
          onClick={handleBuyGas}
        />
      </div>

      <p className="text-[11px] text-zinc-500 mt-4 leading-relaxed">
        Fuel your <strong>ecGas</strong> (mining capacity) to power your mining payout capacity. Transações seguras via contrato inteligente.
      </p>
    </div>
  );
}