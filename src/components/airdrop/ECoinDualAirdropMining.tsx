"use client";

import { useEffect } from "react";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { bsc } from "wagmi/chains";
import { CONTRACTS } from "@/lib/contracts";
import { eCoinDualAirdropAbi } from "@/lib/abis/eCoinDualAirdropAbi";
import { useECoinDualAirdrop, ECOIN_DUAL_AIRDROP_ADDRESS } from "@/hooks/useECoinDualAirdrop";

const TOKENS = [
  {
    symbol: "E-Coin",
    name: "eCoin",
    address: CONTRACTS.ECOIN as `0x${string}`,
  },
  {
    symbol: "E-USD",
    name: "eDollar",
    address: CONTRACTS.EUSD as `0x${string}`,
  },
] as const;

function amount(value?: bigint) {
  return value === undefined
    ? "—"
    : Number(formatUnits(value, 18)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      });
}

function shortDate(timestamp?: bigint) {
  if (!timestamp || timestamp === 0n) return "Ainda não iniciada";
  return new Date(Number(timestamp) * 1000).toLocaleString();
}

export default function ECoinDualAirdropMining() {
  const {
    address,
    isConnected,
    isCorrectChain,
    seasonId,
    seasonInfo,
    walletPending,
    waitingForReceipt,
    busyToken,
    errorMessage,
    successMessage,
    executeAction,
  } = useECoinDualAirdrop();

  if (!isConnected) {
    return (
      <section className="rounded-2xl border border-white/10 bg-slate-950 p-6 text-white">
        <h2 className="text-xl font-bold">E-Coin Dual Airdrop</h2>
        <p className="mt-2 text-sm text-slate-400">
          Conecta a tua carteira para consultar a mineração e reclamar as tuas recompensas.
        </p>
      </section>
    );
  }

  if (!isCorrectChain) {
    return (
      <section className="rounded-2xl border border-amber-500/30 bg-slate-950 p-6 text-white">
        <h2 className="text-xl font-bold">Rede incorreta</h2>
        <p className="mt-2 text-sm text-amber-300">
          Seleciona BNB Smart Chain Mainnet para continuar.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5 text-white">
      <header className="rounded-2xl border border-white/10 bg-slate-950 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">E-Coin Dual Airdrop</h2>
            <p className="mt-1 text-sm text-slate-400">Mineração individual durante 30 dias</p>
          </div>
          <span className="rounded-full border border-emerald-500/30 px-3 py-1 text-sm text-emerald-300">
            Temporada {seasonId?.toString() ?? "…"}
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          A temporada está {seasonInfo?.[2] ? "ativa" : "inativa ou a carregar"}.
        </p>
      </header>

      {TOKENS.map((token) => (
        <MiningTokenCard
          key={token.symbol}
          token={token}
          user={address!}
          seasonId={seasonId}
          seasonActive={Boolean(seasonInfo?.[2])}
          disabled={walletPending || waitingForReceipt}
          busy={busyToken === token.symbol}
          onStart={() => executeAction(token.address, token.symbol, "startMining")}
          onClaim={() => executeAction(token.address, token.symbol, "claim")}
        />
      ))}

      {(walletPending || waitingForReceipt) && (
        <p className="rounded-xl bg-blue-950/50 p-3 text-sm text-blue-200">
          {waitingForReceipt ? "A aguardar confirmação da transação..." : "Confirma a transação na tua carteira..."}
        </p>
      )}

      {successMessage && (
        <p className="rounded-xl bg-emerald-950/50 p-3 text-sm text-emerald-300">{successMessage}</p>
      )}

      {errorMessage && (
        <p className="break-words rounded-xl bg-red-950/50 p-3 text-sm text-red-300">{errorMessage}</p>
      )}
    </section>
  );
}

function MiningTokenCard({
  token,
  user,
  seasonId,
  seasonActive,
  disabled,
  busy,
  onStart,
  onClaim,
}: {
  token: (typeof TOKENS)[number];
  user: `0x${string}`;
  seasonId?: bigint;
  seasonActive: boolean;
  disabled: boolean;
  busy: boolean;
  onStart: () => void;
  onClaim: () => void;
}) {
  const enabled = seasonId !== undefined;

  const { data: allocation } = useReadContract({
    address: ECOIN_DUAL_AIRDROP_ADDRESS,
    abi: eCoinDualAirdropAbi,
    functionName: "airdropAmounts",
    args: enabled ? [seasonId, token.address] : undefined,
    chainId: bsc.id,
    query: { enabled, refetchInterval: 10_000 },
  });

  const { data: session } = useReadContract({
    address: ECOIN_DUAL_AIRDROP_ADDRESS,
    abi: eCoinDualAirdropAbi,
    functionName: "userMining",
    args: enabled ? [user, seasonId, token.address] : undefined,
    chainId: bsc.id,
    query: { enabled, refetchInterval: 5_000 },
  });

  const { data: status, refetch } = useReadContract({
    address: ECOIN_DUAL_AIRDROP_ADDRESS,
    abi: eCoinDualAirdropAbi,
    functionName: "getMiningStatus",
    args: enabled ? [user, seasonId, token.address] : undefined,
    chainId: bsc.id,
    query: { enabled: enabled && Boolean(session && (session as any)[3]), refetchInterval: 5_000 },
  });

  useEffect(() => {
    if (!session || !(session as any)[3]) return;
    const timer = setInterval(() => { void refetch(); }, 5_000);
    return () => clearInterval(timer);
  }, [session, refetch]);

  const sessionData = session as any;
  const statusData = status as any;

  const isMining = sessionData ? Boolean(sessionData[3]) : false;
  const startTime = sessionData ? sessionData[0] : 0n;
  const totalReward = sessionData ? sessionData[1] : 0n;
  const claimed = sessionData ? sessionData[2] : 0n;

  const accrued = statusData ? statusData[0] : 0n;
  const available = statusData ? statusData[1] : 0n;
  const remaining = statusData ? statusData[2] : 0n;

  const progress = totalReward > 0n ? Math.min(100, Number((accrued * 10000n) / totalReward) / 100) : 0;
  const canClaim = Boolean(available && available > 0n);
  const completed = totalReward > 0n && claimed >= totalReward;

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold">{token.name}</h3>
          <p className="text-sm text-slate-400">{token.symbol}</p>
        </div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
          {completed ? "Concluída" : isMining ? "A minerar" : "Não iniciada"}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Metric label="Alocação da temporada" value={`${amount(allocation)} ${token.symbol}`} />
        <Metric label="Saldo acumulado bruto" value={`${amount(accrued)} ${token.symbol}`} />
        <Metric label="Disponível para Claim" value={`${amount(available)} ${token.symbol}`} />
        <Metric label="Já reclamado (bruto)" value={`${amount(claimed)} ${token.symbol}`} />
        <Metric label="Ainda por acumular" value={`${amount(remaining)} ${token.symbol}`} />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-slate-400">Progresso da mineração</span>
          <span className="font-semibold">{progress.toFixed(2)}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-emerald-400 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-sm text-slate-400 sm:grid-cols-2">
        <p>Início: {shortDate(startTime)}</p>
      </div>

      {!isMining ? (
        <button
          type="button"
          onClick={onStart}
          disabled={disabled || !seasonActive || !allocation || allocation === 0n}
          className="mt-5 w-full rounded-xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "A processar..." : "Start Mining"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onClaim}
          disabled={disabled || !canClaim}
          className="mt-5 w-full rounded-xl bg-blue-500 px-4 py-3 font-bold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "A processar..." : canClaim ? `Claim ${amount(available)} ${token.symbol}` : "A acumular recompensas…"}
        </button>
      )}
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 break-words text-lg font-semibold">{value}</p>
    </div>
  );
}