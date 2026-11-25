"use client";

import { useReadContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { airdropFeeCollectorAbi } from "@/lib/abis/airdropFeeCollectorAbi";
import { formatUnits } from "viem";
import { X, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  token: { symbol: string; name: string; address: `0x${string}` };
  availableAmount: bigint;
  isProcessing: boolean;
}

function amount(value?: bigint, decimals: number = 6) {
  return value === undefined
    ? "—"
    : Number(formatUnits(value, 18)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: decimals,
      });
}

export default function ClaimModal({
  isOpen,
  onClose,
  onConfirm,
  token,
  availableAmount,
  isProcessing,
}: ClaimModalProps) {
  if (!isOpen) return null;

  const FEE_COLLECTOR_ADDRESS = CONTRACTS.AIRDROP_FEE_COLLECTOR as `0x${string}`;

  // Leitura da taxa configurada no FeeCollector
  const { data: feeBPData } = useReadContract({
    address: FEE_COLLECTOR_ADDRESS,
    abi: airdropFeeCollectorAbi,
    functionName: "CLAIM_FEE_BP",
    chainId: bsc.id,
  });

  // Leitura do split de taxas configurado no FeeCollector
  const { data: feeSplitData } = useReadContract({
    address: FEE_COLLECTOR_ADDRESS,
    abi: airdropFeeCollectorAbi,
    functionName: "feeSplit",
    chainId: bsc.id,
  });

  const BP = 10_000n;
  const feeBP = feeBPData ?? 1_000n; // Padrão de 10% se não retornado
  const grossClaim = availableAmount;
  const serviceFee = (grossClaim * feeBP) / BP;
  const netToReceive = grossClaim - serviceFee;

  const split = feeSplitData as readonly bigint[] | undefined;
  const splitTotalBP = split ? split.reduce((sum, val) => sum + val, 0n) : 0n;
  const feeSplitIsValid = splitTotalBP === BP;

  const feePart = (bp: bigint) => (serviceFee * bp) / BP;
  const stableMiningFee = feePart(split?.[0] ?? 0n);
  const cryptoMiningFee = feePart(split?.[1] ?? 0n);
  const liquidityFee = feePart(split?.[2] ?? 0n);
  const salaryFee = feePart(split?.[3] ?? 0n);
  const treasuryFee = feePart(split?.[4] ?? 0n);
  const buybackFee = feePart(split?.[5] ?? 0n);
  const tradingFee = feePart(split?.[6] ?? 0n);
  const ecosystemFee = feePart(split?.[7] ?? 0n);
  const referralFee = feePart(split?.[8] ?? 0n);

  const allocatedFee =
    stableMiningFee +
    cryptoMiningFee +
    liquidityFee +
    salaryFee +
    treasuryFee +
    buybackFee +
    tradingFee +
    ecosystemFee +
    referralFee;

  const treasuryRemainder = serviceFee > allocatedFee ? serviceFee - allocatedFee : 0n;

  const redirectedMiningFee =
    token.address.toLowerCase() === CONTRACTS.EUSD.toLowerCase()
      ? cryptoMiningFee
      : stableMiningFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-slate-950 via-black to-slate-900 p-6 text-white shadow-2xl space-y-6">
        
        {/* Header do Modal */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Confirmar Resgate (Claim)</h3>
              <p className="text-xs text-slate-400">{token.name} — Ecossistema EdenKingDom</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Claim Preview Card */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Resumo da Transação</span>
            <span className="text-xs text-slate-400">Taxa Protocolar: {Number(feeBP) / 100}%</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Montante Bruto (Gross Claim)</span>
              <strong className="text-white">{amount(grossClaim, 6)} {token.symbol}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Taxa de Serviço ({Number(feeBP) / 100}%)</span>
              <strong className="text-amber-400">−{amount(serviceFee, 6)} {token.symbol}</strong>
            </div>

            <div className="h-px bg-white/10 my-2" />

            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Líquido a Receber na Carteira</span>
              <strong className="text-xl text-emerald-400">{amount(netToReceive, 6)} {token.symbol}</strong>
            </div>
          </div>
        </div>

        {/* Fee Distribution Breakdown */}
        <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 space-y-2">
          <p className="text-xs font-bold text-[#D4AF37] mb-1">Distribuição da Taxa de 10% pelo Ecossistema</p>
          {[
            ["Stable Mining", stableMiningFee],
            ["Crypto Mining", cryptoMiningFee],
            ["Liquidity Pool", liquidityFee],
            ["Salary Pool", salaryFee],
            ["Treasury", treasuryFee + treasuryRemainder],
            ["Buyback", buybackFee],
            ["Trading Capital", tradingFee],
            ["Ecosystem Dev", ecosystemFee],
            ["Referral Network", referralFee],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between text-xs">
              <span className="text-slate-400">{label}</span>
              <span className="text-slate-200 font-medium">{amount(value as bigint, 6)} {token.symbol}</span>
            </div>
          ))}

          <div className="pt-2 border-t border-white/10 flex justify-between text-xs">
            <span className="text-slate-400">Mineração cruzada (Redirect Engine)</span>
            <strong className="text-amber-300">{amount(redirectedMiningFee, 6)} {token.symbol}</strong>
          </div>
        </div>

        {!feeSplitIsValid && (
          <div className="rounded-xl bg-red-950/50 border border-red-500/30 p-3 text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>Aviso: A configuração de taxas on-chain não totaliza 100%. O resgate está temporariamente condicionado.</span>
          </div>
        )}

        {/* Botões de Ação do Modal */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 py-3.5 text-sm font-bold text-slate-300 transition"
          >
            Cancelar
          </button>
          
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing || !feeSplitIsValid || grossClaim === 0n}
            className="flex-[2] rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 py-3.5 text-sm font-extrabold text-slate-950 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isProcessing ? "A processar..." : `Confirmar Claim (${amount(netToReceive, 4)} ${token.symbol})`}</span>
            {!isProcessing && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}