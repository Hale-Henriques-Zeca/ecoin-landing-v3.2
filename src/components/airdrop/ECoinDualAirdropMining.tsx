"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useDisconnect, useReadContract, useSwitchChain } from "wagmi";
import { bsc } from "wagmi/chains";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinDualAirdropAbi } from "@/lib/abis/eCoinDualAirdropAbi";
import {
  useECoinDualAirdrop,
  ECOIN_DUAL_AIRDROP_ADDRESS,
} from "@/hooks/useECoinDualAirdrop";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Wallet,
  Sparkles,
  Flame,
  ShieldAlert,
  CheckCircle2,
  Clock,
  LogOut,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import ClaimModal from "@/components/airdrop/ClaimModal";
import ECoinDualAirdropMiningAdminPage from "@/components/airdrop/airDropMiningAdmin/ECoinDualAirdropMiningAdminPage";

const PRIMARY_ADMIN_WALLET =
  "0x503de6d52bcC6C329345f6Fbc77610B1F5b39283".toLowerCase();

const TOKENS = [
  {
    symbol: "E-Coin",
    name: "eCoin Mining",
    address: CONTRACTS.ECOIN as `0x${string}`,
  },
  {
    symbol: "E-USD",
    name: "eDollar Mining",
    address: CONTRACTS.EUSD as `0x${string}`,
  },
] as const;

function amount(value?: bigint, decimals: number = 6) {
  return value === undefined
    ? "—"
    : Number(formatUnits(value, 18)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: decimals,
      });
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

  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const [selectedMobileToken, setSelectedMobileToken] = useState<number>(0);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);

  // Leitura direta do owner() on-chain sem dependência de .env
  const { data: contractOwner } = useReadContract({
    address: ECOIN_DUAL_AIRDROP_ADDRESS,
    abi: eCoinDualAirdropAbi,
    functionName: "owner",
    chainId: bsc.id,
    query: { enabled: isConnected },
  });

  const normalizedUser = address?.toLowerCase();
  const normalizedOwner = (contractOwner as string | undefined)?.toLowerCase();

  const isOwner = Boolean(
    isConnected &&
      normalizedUser &&
      (normalizedUser === normalizedOwner ||
        normalizedUser === PRIMARY_ADMIN_WALLET)
  );

  // Resetar visualização admin se desconectar ou trocar para carteira comum
  useEffect(() => {
    if (!isConnected || !isOwner) {
      setShowAdminPanel(false);
    }
  }, [isConnected, isOwner]);

  if (!isConnected) {
    return (
      <section className="rounded-3xl border border-yellow-500/30 bg-gradient-to-br from-black via-slate-950 to-[#0B0E14] p-8 text-white shadow-2xl max-w-2xl mx-auto text-center mt-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none"></div>
        <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <Wallet className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[#D4AF37] tracking-wide">
          E-Coin Dual Airdrop & Mineração
        </h2>
        <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          Conecte a sua carteira e comece a minerar o airdrop da eCoin de forma
          totalmente descentralizada e segura na Binance Smart Chain.
        </p>
        <div className="mt-8 flex justify-center">
          <ConnectButton.Custom>
            {({ openConnectModal }) => (
              <button
                onClick={openConnectModal}
                type="button"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 rounded-2xl text-sm font-extrabold text-black shadow-[0_0_35px_rgba(212,175,55,0.5)] transition transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Conectar Carteira & Começar Mineração</span>
              </button>
            )}
          </ConnectButton.Custom>
        </div>
      </section>
    );
  }

  if (!isCorrectChain) {
    return (
      <section className="rounded-3xl border border-red-500/30 bg-slate-950 p-8 text-white max-w-2xl mx-auto text-center mt-12 space-y-5">
        <ShieldAlert className="w-12 h-12 text-red-400 mx-auto animate-bounce" />
        <div>
          <h2 className="text-xl font-bold text-red-400">
            Rede Incorreta Detectada
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Por favor, mude a rede da sua carteira para a{" "}
            <strong className="text-yellow-400">
              BNB Smart Chain Mainnet
            </strong>{" "}
            para prosseguir com a mineração.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => switchChain?.({ chainId: bsc.id })}
            className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black font-extrabold text-xs uppercase cursor-pointer"
          >
            Mudar para BNB Chain
          </button>
          <button
            type="button"
            onClick={() => disconnect()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-bold text-xs uppercase cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout / Desconectar</span>
          </button>
        </div>
      </section>
    );
  }

  // Renderiza o painel Admin quando o owner clicar em "Painel Admin"
  if (isOwner && showAdminPanel) {
    return (
      <section className="space-y-6 text-white w-full max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowAdminPanel(false)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#D4AF37] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar à Interface de Mineração</span>
          </button>
        </div>

        <ECoinDualAirdropMiningAdminPage />
      </section>
    );
  }

  return (
    <section className="space-y-6 text-white w-full max-w-6xl mx-auto px-4 py-6">
      <header className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-black via-slate-950 to-[#111] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
              Ecossistema Web3 • Protocolo Ativo
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              E-Coin Dual Airdrop & Mineração
            </h2>
            <p className="mt-1 text-xs md:text-sm text-slate-400">
              Mineração individual progressiva e contínua durante 30 dias por
              temporada.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Indicador Temporada */}
            <div className="flex items-center gap-2 bg-black/60 border border-emerald-500/30 px-4 py-2 rounded-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Temporada {seasonId?.toString() ?? "1"} (
                {seasonInfo?.[2] ? "Ativa" : "Inativa"})
              </span>
            </div>

            {/* Botão Exclusivo Admin (isOwner on-chain sem .env) */}
            {isOwner && (
              <button
                type="button"
                onClick={() => setShowAdminPanel(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 transition cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Painel Admin</span>
              </button>
            )}

            {/* Carteira Conectada + Botão Logout */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 pl-3 pr-1.5 py-1.5 rounded-xl">
              <span className="text-xs font-mono text-slate-300">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button
                type="button"
                onClick={() => disconnect()}
                title="Desconectar carteira e fechar mineração"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {(walletPending || waitingForReceipt) && (
        <div className="rounded-xl bg-blue-950/60 border border-blue-500/30 p-4 text-sm text-blue-200 flex items-center gap-3 animate-pulse">
          <Clock className="w-5 h-5 text-blue-400 animate-spin" />
          <span>
            {waitingForReceipt
              ? "A aguardar confirmação da transação na blockchain..."
              : "Por favor, confirme a transação na sua carteira..."}
          </span>
        </div>
      )}

      {successMessage && (
        <div className="rounded-xl bg-emerald-950/60 border border-emerald-500/30 p-4 text-sm text-emerald-300 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl bg-red-950/60 border border-red-500/30 p-4 text-sm text-red-300 break-words">
          {errorMessage}
        </div>
      )}

      {/* MOBILE VIEW SWITCHER */}
      <div className="block md:hidden space-y-4">
        <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
          {TOKENS.map((tk, idx) => (
            <button
              key={tk.symbol}
              onClick={() => setSelectedMobileToken(idx)}
              className={`py-2.5 text-xs font-bold rounded-xl transition ${
                selectedMobileToken === idx
                  ? "bg-[#D4AF37] text-black shadow-lg shadow-yellow-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tk.symbol} Mineração
            </button>
          ))}
        </div>

        <MiningTokenCard
          token={TOKENS[selectedMobileToken]}
          user={address!}
          seasonId={seasonId}
          seasonActive={Boolean(seasonInfo?.[2])}
          disabled={walletPending || waitingForReceipt}
          busy={busyToken === TOKENS[selectedMobileToken].symbol}
          onStart={() =>
            executeAction(
              TOKENS[selectedMobileToken].address,
              TOKENS[selectedMobileToken].symbol,
              "startMining"
            )
          }
          onClaimExecution={() =>
            executeAction(
              TOKENS[selectedMobileToken].address,
              TOKENS[selectedMobileToken].symbol,
              "claim"
            )
          }
        />
      </div>

      {/* DESKTOP SIDE-BY-SIDE GRID */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {TOKENS.map((token) => (
          <MiningTokenCard
            key={token.symbol}
            token={token}
            user={address!}
            seasonId={seasonId}
            seasonActive={Boolean(seasonInfo?.[2])}
            disabled={walletPending || waitingForReceipt}
            busy={busyToken === token.symbol}
            onStart={() =>
              executeAction(token.address, token.symbol, "startMining")
            }
            onClaimExecution={() =>
              executeAction(token.address, token.symbol, "claim")
            }
          />
        ))}
      </div>
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
  onClaimExecution,
}: {
  token: (typeof TOKENS)[number];
  user: `0x${string}`;
  seasonId?: bigint;
  seasonActive: boolean;
  disabled: boolean;
  busy: boolean;
  onStart: () => void;
  onClaimExecution: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    query: {
      enabled: enabled && Boolean(session && (session as readonly [bigint, bigint, bigint, boolean])[3]),
      refetchInterval: 3_000,
    },
  });

  const [now, setNow] = useState<number>(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const timer = setInterval(
      () => setNow(Math.floor(Date.now() / 1000)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!session || !(session as readonly [bigint, bigint, bigint, boolean])[3])
      return;
    const timer = setInterval(() => {
      void refetch();
    }, 5_000);
    return () => clearInterval(timer);
  }, [session, refetch]);

  const sessionData = session as
    | readonly [bigint, bigint, bigint, boolean]
    | undefined;
  const statusData = status as readonly [bigint, bigint, bigint] | undefined;

  const isMining = sessionData ? Boolean(sessionData[3]) : false;
  const startTime = sessionData ? Number(sessionData[0]) : 0;
  const totalReward = sessionData ? sessionData[1] : (allocation ?? 0n);

  const rewardNumber = Number(formatUnits(totalReward, 18));
  const totalSeconds = 30 * 24 * 60 * 60;
  const perSecond = rewardNumber / totalSeconds;
  const perMinute = perSecond * 60;
  const perHour = perMinute * 60;
  const perDay = perHour * 24;

  const accrued = statusData ? statusData[0] : 0n;
  const available = statusData ? statusData[1] : 0n;
  const remaining = statusData ? statusData[2] : 0n;

  const progress =
    totalReward > 0n
      ? Math.min(100, Number((accrued * 10000n) / totalReward) / 100)
      : 0;
  const canClaim = Boolean(available && available > 0n);
  const isExhausted =
    totalReward > 0n &&
    (accrued >= totalReward ||
      (isMining && now - startTime >= totalSeconds && remaining === 0n));

  return (
    <>
      <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-black to-slate-900 p-6 space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-wrap items-start justify-between gap-3 relative z-10">
          <div>
            <h3 className="text-xl font-bold text-white">{token.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Temporada {seasonId?.toString() ?? "1"} ·{" "}
              {isExhausted && !canClaim
                ? "Exausto"
                : isMining
                ? "Mineração Ativa"
                : "Pronto para Iniciar"}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isExhausted && !canClaim
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : isMining
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-white/5 text-slate-300 border border-white/10"
            }`}
          >
            {isExhausted && !canClaim
              ? "Exhausted"
              : isMining
              ? "Active"
              : "Ready"}
          </span>
        </div>

        {/* Bloco Principal: Mining Realised Balance */}
        <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5 text-center relative z-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#D4AF37]">
            Mining Realised Balance
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {amount(accrued, 6)}{" "}
            <span className="text-[#D4AF37]">{token.symbol}</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Montante acumulado nesta temporada
          </p>
        </div>

        {/* Blocos Secundários: Available & Remaining */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-[11px] text-slate-400">Available for Claim</p>
            <p className="mt-1 text-lg font-extrabold text-white">
              {amount(available, 6)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">{token.symbol}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
            <p className="text-[11px] text-slate-400">Remaining Mining</p>
            <p className="mt-1 text-lg font-extrabold text-white">
              {amount(remaining, 6)}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">{token.symbol}</p>
          </div>
        </div>

        {/* Taxas de Mineração */}
        <div className="rounded-xl border border-white/5 bg-black/40 p-4 relative z-10">
          <p className="text-xs font-medium text-slate-400 mb-3">
            Taxa de Mineração (30 dias / {rewardNumber} {token.symbol})
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="rounded-lg bg-black/60 p-2 border border-white/5">
              <p className="text-[10px] text-slate-400">Por dia</p>
              <p className="text-xs font-bold text-emerald-300 mt-0.5">
                {perDay.toFixed(3)}
              </p>
            </div>
            <div className="rounded-lg bg-black/60 p-2 border border-white/5">
              <p className="text-[10px] text-slate-400">Por hora</p>
              <p className="text-xs font-bold text-emerald-300 mt-0.5">
                {perHour.toFixed(3)}
              </p>
            </div>
            <div className="rounded-lg bg-black/60 p-2 border border-white/5">
              <p className="text-[10px] text-slate-400">Por minuto</p>
              <p className="text-xs font-bold text-emerald-300 mt-0.5">
                {perMinute.toFixed(4)}
              </p>
            </div>
            <div className="rounded-lg bg-black/60 p-2 border border-white/5">
              <p className="text-[10px] text-slate-400">Por segundo</p>
              <p className="text-xs font-bold text-emerald-300 mt-0.5">
                {perSecond.toFixed(5)}
              </p>
            </div>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="relative z-10">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-slate-400">Progresso da temporada</span>
            <span className="font-bold text-[#D4AF37]">
              {progress.toFixed(2)}%
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-yellow-600 to-amber-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="relative z-10 pt-2">
          {!isMining ? (
            <button
              type="button"
              onClick={onStart}
              disabled={
                disabled || !seasonActive || !allocation || allocation === 0n
              }
              className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 px-4 py-3.5 font-extrabold text-black transition disabled:cursor-not-allowed disabled:opacity-40 shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>{busy ? "A iniciar..." : "Start Mining"}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              disabled={disabled || !canClaim}
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 px-4 py-3.5 font-bold text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-40 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>
                {busy
                  ? "A processar..."
                  : canClaim
                  ? `Claim ${amount(available, 4)} ${token.symbol}`
                  : "Claim Indisponível (Sem Saldo)"}
              </span>
            </button>
          )}
        </div>
      </article>

      {/* Modal de Preview do Claim */}
      <ClaimModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          onClaimExecution();
        }}
        token={token}
        availableAmount={available}
        isProcessing={disabled || busy}
      />
    </>
  );
}