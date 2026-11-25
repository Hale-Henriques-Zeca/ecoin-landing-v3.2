"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Wallet,
  Activity,
  Settings,
  Coins,
  Layers,
  AlertTriangle,
  RefreshCw,
  LogOut,
  PauseCircle,
  PlayCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  useAccount,
  useDisconnect,
  useReadContract,
  useWriteContract,
  usePublicClient,
} from "wagmi";
import { bsc } from "wagmi/chains";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  parseUnits,
  formatUnits,
  isAddress,
  erc20Abi,
  zeroAddress,
} from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinDualAirdropAdminAbi } from "@/lib/abis/eCoinDualAirdropAdminAbi";

const PRIMARY_ADMIN_WALLET =
  "0x503de6d52bcC6C329345f6Fbc77610B1F5b39283".toLowerCase();

type CardProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

const Card = ({ title, icon: Icon, children }: CardProps) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
        <Icon size={20} />
      </div>
      <h2 className="text-white font-black text-lg">{title}</h2>
    </div>
    {children}
  </div>
);

export default function ECoinDualAirdropMiningAdminPage() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const contractsRecord = CONTRACTS as Record<string, `0x${string}` | undefined>;
  const airdropAddress = (contractsRecord.ECOIN_DUAL_AIRDROP ??
    "0x91C8973d791717948DC003B81fcf6b46FCc66F4D") as `0x${string}`;
  const defaultCollectorAddress = (contractsRecord.AIRDROP_FEE_COLLECTOR ??
    "0xeF48a38D293EBB7a5ADB997567dDc248f73B88a3") as `0x${string}`;

  // Estados independentes por painel
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [statusFeedback, setStatusFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [ecoinVaultAmount, setEcoinVaultAmount] = useState("");
  const [eusdVaultAmount, setEusdVaultAmount] = useState("");

  const [ecoinTargetAmount, setEcoinTargetAmount] = useState("1000");
  const [eusdTargetAmount, setEusdTargetAmount] = useState("1000");

  const [collectorInput, setCollectorInput] = useState("");

  /* ================= LEITURAS ON-CHAIN (ECoinDualAirdrop) ================= */

  const { data: contractOwner } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "owner",
    chainId: bsc.id,
  });

  const { data: onChainECoin } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "eCoinToken",
    chainId: bsc.id,
  });

  const { data: onChainEDollar } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "eDollarToken",
    chainId: bsc.id,
  });

  const ecoinAddress = (onChainECoin ??
    contractsRecord.ECOIN) as `0x${string}` | undefined;
  const eusdAddress = (onChainEDollar ??
    contractsRecord.EUSD) as `0x${string}` | undefined;

  const { data: currentSeason, refetch: refetchSeason } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "currentSeason",
    chainId: bsc.id,
  });

  const seasonId = currentSeason ?? 1n;

  const { data: seasonInfo, refetch: refetchSeasonInfo } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "getSeasonInfo",
    args: [seasonId],
    chainId: bsc.id,
  });

  const { data: globalPaused, refetch: refetchGlobalPaused } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "paused",
    chainId: bsc.id,
  });

  const { data: currentFeeCollector, refetch: refetchFeeCollector } =
    useReadContract({
      address: airdropAddress,
      abi: eCoinDualAirdropAdminAbi,
      functionName: "airdropFeeCollector",
      chainId: bsc.id,
    });

  // Leituras E-Coin (Vault, Meta por carteira, Pausa)
  const { data: ecoinVault, refetch: refetchEcoinVault } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "getVaultBalance",
    args: ecoinAddress ? [ecoinAddress] : undefined,
    chainId: bsc.id,
    query: { enabled: Boolean(ecoinAddress) },
  });

  const { data: ecoinAllocation, refetch: refetchEcoinAllocation } =
    useReadContract({
      address: airdropAddress,
      abi: eCoinDualAirdropAdminAbi,
      functionName: "airdropAmounts",
      args: ecoinAddress ? [seasonId, ecoinAddress] : undefined,
      chainId: bsc.id,
      query: { enabled: Boolean(ecoinAddress) },
    });

  const { data: ecoinPaused, refetch: refetchEcoinPaused } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "tokenPaused",
    args: ecoinAddress ? [ecoinAddress] : undefined,
    chainId: bsc.id,
    query: { enabled: Boolean(ecoinAddress) },
  });

  const { data: adminEcoinWalletBal, refetch: refetchAdminEcoinBal } =
    useReadContract({
      address: ecoinAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
      chainId: bsc.id,
      query: { enabled: Boolean(ecoinAddress && address) },
    });

  // Leituras eDollar (Vault, Meta por carteira, Pausa)
  const { data: eusdVault, refetch: refetchEusdVault } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "getVaultBalance",
    args: eusdAddress ? [eusdAddress] : undefined,
    chainId: bsc.id,
    query: { enabled: Boolean(eusdAddress) },
  });

  const { data: eusdAllocation, refetch: refetchEusdAllocation } =
    useReadContract({
      address: airdropAddress,
      abi: eCoinDualAirdropAdminAbi,
      functionName: "airdropAmounts",
      args: eusdAddress ? [seasonId, eusdAddress] : undefined,
      chainId: bsc.id,
      query: { enabled: Boolean(eusdAddress) },
    });

  const { data: eusdPaused, refetch: refetchEusdPaused } = useReadContract({
    address: airdropAddress,
    abi: eCoinDualAirdropAdminAbi,
    functionName: "tokenPaused",
    args: eusdAddress ? [eusdAddress] : undefined,
    chainId: bsc.id,
    query: { enabled: Boolean(eusdAddress) },
  });

  const { data: adminEusdWalletBal, refetch: refetchAdminEusdBal } =
    useReadContract({
      address: eusdAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: address ? [address] : undefined,
      chainId: bsc.id,
      query: { enabled: Boolean(eusdAddress && address) },
    });

  /* ================= VERIFICAÇÃO IS_OWNER SEM .ENV ================= */

  const normalizedUser = address?.toLowerCase();
  const normalizedOnChainOwner = contractOwner?.toLowerCase();

  const isOwner = Boolean(
    normalizedUser &&
      (normalizedUser === normalizedOnChainOwner ||
        normalizedUser === PRIMARY_ADMIN_WALLET)
  );

  /* ================= HELPER DE EXECUÇÃO ON-CHAIN ================= */

  async function executeTx(
    actionKey: string,
    successMsg: string,
    fn: () => Promise<`0x${string}`>
  ) {
    try {
      setStatusFeedback(null);
      setBusyAction(actionKey);
      const hash = await fn();
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }
      await Promise.all([
        refetchSeason(),
        refetchSeasonInfo(),
        refetchGlobalPaused(),
        refetchFeeCollector(),
        refetchEcoinVault(),
        refetchEcoinAllocation(),
        refetchEcoinPaused(),
        refetchAdminEcoinBal(),
        refetchEusdVault(),
        refetchEusdAllocation(),
        refetchEusdPaused(),
        refetchAdminEusdBal(),
      ]);
      setStatusFeedback({ type: "success", text: successMsg });
    } catch (err: unknown) {
      console.error(`Erro na ação [${actionKey}]:`, err);
      const msg =
        err instanceof Error
          ? err.message.split("\n")[0]
          : "Falha ao executar transação na blockchain.";
      setStatusFeedback({ type: "error", text: msg });
    } finally {
      setBusyAction(null);
    }
  }

  /* ================= AÇÕES: DEPOSIT & WITHDRAW VAULT ================= */

  async function handleDepositToken(
    tokenAddr: `0x${string}` | undefined,
    symbol: string,
    rawAmount: string
  ) {
    if (!tokenAddr || !address) return;
    if (!rawAmount || Number(rawAmount) <= 0) {
      setStatusFeedback({
        type: "error",
        text: `Insira uma quantidade válida de ${symbol} para depositar.`,
      });
      return;
    }

    const parsed = parseUnits(rawAmount, 18);

    await executeTx(
      `deposit-${symbol}`,
      `Depósito de ${rawAmount} ${symbol} concluído no cofre do Airdrop!`,
      async () => {
        if (publicClient) {
          const currentAllowance = (await publicClient.readContract({
            address: tokenAddr,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, airdropAddress],
          })) as bigint;

          if (currentAllowance < parsed) {
            const approveHash = await writeContractAsync({
              address: tokenAddr,
              abi: erc20Abi,
              functionName: "approve",
              args: [airdropAddress, parsed],
              chain: bsc,
            });
            await publicClient.waitForTransactionReceipt({
              hash: approveHash,
            });
          }
        }

        return writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: "deposit",
          args: [tokenAddr, parsed],
          chain: bsc,
        });
      }
    );
  }

  async function handleWithdrawToken(
    tokenAddr: `0x${string}` | undefined,
    symbol: string,
    rawAmount: string
  ) {
    if (!tokenAddr) return;
    if (!rawAmount || Number(rawAmount) <= 0) {
      setStatusFeedback({
        type: "error",
        text: `Insira uma quantidade válida de ${symbol} para sacar.`,
      });
      return;
    }

    const parsed = parseUnits(rawAmount, 18);

    await executeTx(
      `withdraw-${symbol}`,
      `Saque de ${rawAmount} ${symbol} livre enviado para sua carteira Admin!`,
      () =>
        writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: "withdraw",
          args: [tokenAddr, parsed],
          chain: bsc,
        })
    );
  }

  /* ================= AÇÕES: DEFINIR META POR CARTEIRA & PAUSA ================= */

  async function handleSetAirdropAmount(
    tokenAddr: `0x${string}` | undefined,
    symbol: string,
    rawAmount: string
  ) {
    if (!tokenAddr) return;
    if (!rawAmount || Number(rawAmount) <= 0) {
      setStatusFeedback({
        type: "error",
        text: `Defina uma meta válida por carteira para ${symbol}.`,
      });
      return;
    }

    const parsed = parseUnits(rawAmount, 18);

    await executeTx(
      `setAmount-${symbol}`,
      `Meta da Temporada ${seasonId.toString()} atualizada para ${rawAmount} ${symbol} por carteira!`,
      () =>
        writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: "setAirdropAmount",
          args: [tokenAddr, parsed],
          chain: bsc,
        })
    );
  }

  async function handleSetTokenPause(
    tokenAddr: `0x${string}` | undefined,
    symbol: string,
    paused: boolean
  ) {
    if (!tokenAddr) return;
    await executeTx(
      `pause-${symbol}`,
      `Mineração de ${symbol} ${paused ? "pausada" : "ativada"} com sucesso.`,
      () =>
        writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: "setTokenPause",
          args: [tokenAddr, paused],
          chain: bsc,
        })
    );
  }

  /* ================= AÇÕES: TEMPORADA & FEE COLLECTOR ================= */

  async function handleRestoreSeason() {
    await executeTx(
      "restoreSeason",
      "Nova temporada iniciada com sucesso!",
      () =>
        writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: "restore",
          chain: bsc,
        })
    );
  }

  async function handleToggleGlobalPause(pause: boolean) {
    await executeTx(
      "globalPause",
      pause
        ? "Contrato pausado globalmente."
        : "Contrato reativado globalmente.",
      () =>
        writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: pause ? "pauseGlobal" : "unpauseGlobal",
          chain: bsc,
        })
    );
  }

  async function handleSetFeeCollector(targetAddress: string) {
    if (!isAddress(targetAddress)) {
      setStatusFeedback({
        type: "error",
        text: "Endereço do AirdropFeeCollector inválido.",
      });
      return;
    }

    await executeTx(
      "setFeeCollector",
      "AirdropFeeCollector atualizado no contrato!",
      () =>
        writeContractAsync({
          address: airdropAddress,
          abi: eCoinDualAirdropAdminAbi,
          functionName: "setAirdropFeeCollector",
          args: [targetAddress],
          chain: bsc,
        })
    );
  }

  /* ================= GUARDS DE ACESSO ================= */

  if (!isConnected) {
    return (
      <main className="min-h-[360px] bg-black/70 border border-[#D4AF37]/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-white space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
          <Wallet className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#D4AF37]">
            Acesso Admin • ECoinDualAirdrop
          </h2>
          <p className="text-xs text-white/60 font-mono mt-2 max-w-md">
            Conecte a carteira proprietária ({PRIMARY_ADMIN_WALLET.slice(0, 6)}
            ...{PRIMARY_ADMIN_WALLET.slice(-4)}) para gerenciar temporadas, cofre
            e metas por carteira.
          </p>
        </div>
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              type="button"
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 rounded-2xl text-sm font-extrabold text-black shadow-lg shadow-yellow-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Conectar Carteira Admin</span>
            </button>
          )}
        </ConnectButton.Custom>
      </main>
    );
  }

  if (!isOwner) {
    return (
      <main className="min-h-[340px] bg-black/80 border border-red-500/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center text-white space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-400" />
        <h2 className="text-xl font-black text-red-400">
          Carteira Sem Permissão de Administrador
        </h2>
        <p className="text-xs font-mono text-white/60 max-w-lg">
          Conectado como: <span className="text-white">{address}</span>
          <br />
          Proprietário autorizado:{" "}
          <span className="text-[#D4AF37]">
            {contractOwner ?? PRIMARY_ADMIN_WALLET}
          </span>
        </p>
        <button
          type="button"
          onClick={() => disconnect()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase cursor-pointer"
        >
          <LogOut size={15} />
          <span>Desconectar Carteira (Logout)</span>
        </button>
      </main>
    );
  }

  /* ================= FORMATAÇÃO DE MÉTRICAS ================= */

  const ecoinTotalBal = ecoinVault
    ? Number(formatUnits(ecoinVault[0], 18))
    : 0;
  const ecoinReserved = ecoinVault
    ? Number(formatUnits(ecoinVault[1], 18))
    : 0;
  const ecoinFree = ecoinVault ? Number(formatUnits(ecoinVault[2], 18)) : 0;
  const ecoinTargetNum = ecoinAllocation
    ? Number(formatUnits(ecoinAllocation, 18))
    : 0;
  const ecoinSlotsAvailable =
    ecoinTargetNum > 0 ? Math.floor(ecoinFree / ecoinTargetNum) : 0;

  const eusdTotalBal = eusdVault ? Number(formatUnits(eusdVault[0], 18)) : 0;
  const eusdReserved = eusdVault ? Number(formatUnits(eusdVault[1], 18)) : 0;
  const eusdFree = eusdVault ? Number(formatUnits(eusdVault[2], 18)) : 0;
  const eusdTargetNum = eusdAllocation
    ? Number(formatUnits(eusdAllocation, 18))
    : 0;
  const eusdSlotsAvailable =
    eusdTargetNum > 0 ? Math.floor(eusdFree / eusdTargetNum) : 0;

  const isCollectorMissing =
    !currentFeeCollector ||
    currentFeeCollector.toLowerCase() === zeroAddress.toLowerCase();

  return (
    <div className="w-full space-y-8">
      {/* CABEÇALHO + BOTÃO LOGOUT */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
            <span className="text-[#D4AF37]">e</span>Coin{" "}
            <span className="text-[#D4AF37]">Dual Airdrop Admin</span>
          </h1>
          <p className="text-white/50 text-xs md:text-sm font-mono">
            ECoinDualAirdrop • Temporada {seasonId.toString()} • Ciclo 30 Dias
            (E-Coin & eDollar)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span
            className={`px-3 py-1.5 rounded-full border ${
              !globalPaused
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            Protocolo: {!globalPaused ? "ATIVO" : "PAUSADO"}
          </span>

          <span className="px-3 py-1.5 rounded-full border bg-[#D4AF37]/15 border-[#D4AF37]/30 text-[#D4AF37]">
            Admin: {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>

          <button
            type="button"
            onClick={() => disconnect()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-300 font-bold transition cursor-pointer"
          >
            <LogOut size={13} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* FEEDBACK DE TRANSAÇÃO */}
      {statusFeedback && (
        <div
          className={`rounded-2xl p-4 text-xs font-mono flex items-center gap-3 border ${
            statusFeedback.type === "success"
              ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/70 border-red-500/40 text-red-300"
          }`}
        >
          {statusFeedback.type === "success" ? (
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle size={16} className="shrink-0 text-red-400" />
          )}
          <span className="break-all">{statusFeedback.text}</span>
        </div>
      )}

      {/* ALERTA DE COLLECTOR NÃO CONFIGURADO */}
      {isCollectorMissing && (
        <div className="rounded-2xl p-4 bg-amber-950/60 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-mono text-amber-200">
            <strong>Atenção:</strong> `airdropFeeCollector` ainda está zerado
            no contrato. Defina-o para permitir que os utilizadores façam
            claim.
          </div>
          <button
            type="button"
            disabled={busyAction !== null}
            onClick={() => handleSetFeeCollector(defaultCollectorAddress)}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black font-black text-xs uppercase shrink-0 cursor-pointer"
          >
            Vincular Collector Oficial
          </button>
        </div>
      )}

      {/* MÉTRICAS GLOBAIS ON-CHAIN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Cofre Livre E-Coin
          </div>
          <div className="text-3xl font-black text-[#D4AF37] font-mono">
            {ecoinFree.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Total: {ecoinTotalBal.toFixed(2)} • Reservado:{" "}
            {ecoinReserved.toFixed(2)}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Meta E-Coin / Carteira
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {ecoinTargetNum.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Vagas disponíveis: {ecoinSlotsAvailable} carteiras
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Cofre Livre eDollar (EUSD)
          </div>
          <div className="text-3xl font-black text-blue-400 font-mono">
            {eusdFree.toLocaleString("en-US", { maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Total: {eusdTotalBal.toFixed(2)} • Reservado:{" "}
            {eusdReserved.toFixed(2)}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="text-white/40 text-xs font-mono uppercase mb-2">
            Meta eDollar / Carteira
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {eusdTargetNum.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-[11px] text-white/40 mt-1 font-mono">
            Vagas disponíveis: {eusdSlotsAvailable} carteiras
          </div>
        </div>
      </div>

      {/* PAINÉIS DE ADMINISTRAÇÃO */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 1. COFRE E-COIN: DEPOSIT & WITHDRAW */}
        <Card title="Cofre E-Coin (Recarga & Liquidez)" icon={Coins}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Seu Saldo na Carteira:</span>
                <span className="text-[#D4AF37] font-bold">
                  {adminEcoinWalletBal
                    ? Number(formatUnits(adminEcoinWalletBal, 18)).toLocaleString(
                        "en-US",
                        { maximumFractionDigits: 4 }
                      )
                    : "0"}{" "}
                  eCoin
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Livre no Contrato:</span>
                <span className="text-emerald-400 font-bold">
                  {ecoinFree.toFixed(4)} eCoin
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Reservado (Miners Ativos):</span>
                <span className="text-amber-400">
                  {ecoinReserved.toFixed(4)} eCoin
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Quantidade E-Coin (ex: 50000)"
                value={ecoinVaultAmount}
                onChange={(e) => setEcoinVaultAmount(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-white font-mono text-sm"
              />
              {["10000", "50000", "100000"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setEcoinVaultAmount(preset)}
                  className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[11px] font-mono text-[#D4AF37] cursor-pointer"
                >
                  {Number(preset) / 1000}k
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                disabled={busyAction !== null}
                onClick={() =>
                  handleDepositToken(ecoinAddress, "E-Coin", ecoinVaultAmount)
                }
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                {busyAction === "deposit-E-Coin"
                  ? "A Depositar..."
                  : "Approve & Deposit E-Coin"}
              </button>

              <button
                type="button"
                disabled={busyAction !== null || ecoinFree <= 0}
                onClick={() =>
                  handleWithdrawToken(ecoinAddress, "E-Coin", ecoinVaultAmount)
                }
                className="bg-red-500 hover:bg-red-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                {busyAction === "withdraw-E-Coin"
                  ? "A Sacar..."
                  : "Withdraw Livre"}
              </button>
            </div>
          </div>
        </Card>

        {/* 2. COFRE EDOLLAR: DEPOSIT & WITHDRAW */}
        <Card title="Cofre eDollar / EUSD (Recarga & Liquidez)" icon={Wallet}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Seu Saldo na Carteira:</span>
                <span className="text-blue-400 font-bold">
                  {adminEusdWalletBal
                    ? Number(formatUnits(adminEusdWalletBal, 18)).toLocaleString(
                        "en-US",
                        { maximumFractionDigits: 4 }
                      )
                    : "0"}{" "}
                  EUSD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Livre no Contrato:</span>
                <span className="text-emerald-400 font-bold">
                  {eusdFree.toFixed(4)} EUSD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Reservado (Miners Ativos):</span>
                <span className="text-amber-400">
                  {eusdReserved.toFixed(4)} EUSD
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                placeholder="Quantidade eDollar (ex: 50000)"
                value={eusdVaultAmount}
                onChange={(e) => setEusdVaultAmount(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3.5 text-white font-mono text-sm"
              />
              {["10000", "50000", "100000"].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setEusdVaultAmount(preset)}
                  className="px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[11px] font-mono text-blue-400 cursor-pointer"
                >
                  {Number(preset) / 1000}k
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                disabled={busyAction !== null}
                onClick={() =>
                  handleDepositToken(eusdAddress, "EUSD", eusdVaultAmount)
                }
                className="bg-blue-500 hover:bg-blue-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                {busyAction === "deposit-EUSD"
                  ? "A Depositar..."
                  : "Approve & Deposit EUSD"}
              </button>

              <button
                type="button"
                disabled={busyAction !== null || eusdFree <= 0}
                onClick={() =>
                  handleWithdrawToken(eusdAddress, "EUSD", eusdVaultAmount)
                }
                className="bg-red-500 hover:bg-red-400 text-black font-black py-4 rounded-2xl text-xs uppercase tracking-wider cursor-pointer disabled:opacity-40"
              >
                {busyAction === "withdraw-EUSD"
                  ? "A Sacar..."
                  : "Withdraw Livre"}
              </button>
            </div>
          </div>
        </Card>

        {/* 3. META POR CARTEIRA (setAirdropAmount) & PAUSA POR TOKEN */}
        <Card
          title={`Meta por Carteira • Temporada ${seasonId.toString()}`}
          icon={Settings}
        >
          <div className="space-y-5">
            {/* E-Coin Meta */}
            <div className="bg-black/40 rounded-2xl p-4 space-y-3 border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#D4AF37] font-bold">
                  E-Coin (Atual: {ecoinTargetNum} / carteira)
                </span>
                <span
                  className={
                    ecoinPaused ? "text-red-400 font-bold" : "text-emerald-400"
                  }
                >
                  {ecoinPaused ? "PAUSADO" : "ATIVO"}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  placeholder="Meta E-Coin (ex: 1000)"
                  value={ecoinTargetAmount}
                  onChange={(e) => setEcoinTargetAmount(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setEcoinTargetAmount("1000")}
                  className="px-3 bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl font-mono text-xs font-bold cursor-pointer"
                >
                  1.000
                </button>
                <button
                  type="button"
                  disabled={busyAction !== null}
                  onClick={() =>
                    handleSetAirdropAmount(
                      ecoinAddress,
                      "E-Coin",
                      ecoinTargetAmount
                    )
                  }
                  className="px-4 bg-[#D4AF37] hover:bg-amber-400 text-black font-black rounded-xl text-xs uppercase cursor-pointer disabled:opacity-40"
                >
                  Definir
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busyAction !== null || !ecoinPaused}
                  onClick={() =>
                    handleSetTokenPause(ecoinAddress, "E-Coin", false)
                  }
                  className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-[11px] font-bold uppercase cursor-pointer disabled:opacity-40"
                >
                  Ativar E-Coin
                </button>
                <button
                  type="button"
                  disabled={busyAction !== null || Boolean(ecoinPaused)}
                  onClick={() =>
                    handleSetTokenPause(ecoinAddress, "E-Coin", true)
                  }
                  className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-xl text-[11px] font-bold uppercase cursor-pointer disabled:opacity-40"
                >
                  Pausar E-Coin
                </button>
              </div>
            </div>

            {/* eDollar Meta */}
            <div className="bg-black/40 rounded-2xl p-4 space-y-3 border border-white/5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-blue-400 font-bold">
                  eDollar / EUSD (Atual: {eusdTargetNum} / carteira)
                </span>
                <span
                  className={
                    eusdPaused ? "text-red-400 font-bold" : "text-emerald-400"
                  }
                >
                  {eusdPaused ? "PAUSADO" : "ATIVO"}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  placeholder="Meta eDollar (ex: 1000)"
                  value={eusdTargetAmount}
                  onChange={(e) => setEusdTargetAmount(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => setEusdTargetAmount("1000")}
                  className="px-3 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-xl font-mono text-xs font-bold cursor-pointer"
                >
                  1.000
                </button>
                <button
                  type="button"
                  disabled={busyAction !== null}
                  onClick={() =>
                    handleSetAirdropAmount(
                      eusdAddress,
                      "EUSD",
                      eusdTargetAmount
                    )
                  }
                  className="px-4 bg-blue-500 hover:bg-blue-400 text-black font-black rounded-xl text-xs uppercase cursor-pointer disabled:opacity-40"
                >
                  Definir
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={busyAction !== null || !eusdPaused}
                  onClick={() =>
                    handleSetTokenPause(eusdAddress, "EUSD", false)
                  }
                  className="flex-1 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 rounded-xl text-[11px] font-bold uppercase cursor-pointer disabled:opacity-40"
                >
                  Ativar eDollar
                </button>
                <button
                  type="button"
                  disabled={busyAction !== null || Boolean(eusdPaused)}
                  onClick={() =>
                    handleSetTokenPause(eusdAddress, "EUSD", true)
                  }
                  className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-xl text-[11px] font-bold uppercase cursor-pointer disabled:opacity-40"
                >
                  Pausar eDollar
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* 4. TEMPORADAS, FEE COLLECTOR & SEGURANÇA */}
        <Card title="Temporadas, Fee Collector & Segurança" icon={Layers}>
          <div className="space-y-4">
            <div className="bg-black/40 rounded-2xl p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-white/50">Temporada Atual:</span>
                <span className="text-[#D4AF37] font-bold">
                  #{seasonId.toString()} (
                  {seasonInfo?.[2] ? "ATIVA" : "ENCERRADA"})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Abertura Temporada:</span>
                <span className="text-white/80">
                  {seasonInfo?.[1] && seasonInfo[1] > 0n
                    ? new Date(Number(seasonInfo[1]) * 1000).toLocaleString()
                    : "—"}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-white/50 shrink-0">Fee Collector:</span>
                <span className="text-emerald-400 truncate">
                  {currentFeeCollector ?? "—"}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                placeholder={`Fee Collector (${defaultCollectorAddress.slice(0, 10)}...)`}
                value={collectorInput}
                onChange={(e) => setCollectorInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-xs"
              />
              <button
                type="button"
                disabled={busyAction !== null}
                onClick={() =>
                  handleSetFeeCollector(
                    collectorInput || defaultCollectorAddress
                  )
                }
                className="px-4 bg-purple-500 hover:bg-purple-400 text-black font-black rounded-2xl text-xs uppercase cursor-pointer disabled:opacity-40"
              >
                Set Collector
              </button>
            </div>

            <button
              type="button"
              disabled={busyAction !== null}
              onClick={handleRestoreSeason}
              className="w-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 text-[#D4AF37] font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw size={15} />
              Encerrar Temporada #{seasonId.toString()} & Iniciar Nova
              (restore)
            </button>

            <div className="grid grid-cols-2 gap-4 pt-1">
              <button
                type="button"
                disabled={busyAction !== null || Boolean(globalPaused)}
                onClick={() => handleToggleGlobalPause(true)}
                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 font-black py-3.5 rounded-2xl text-xs uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <PauseCircle size={15} />
                Pausar Global
              </button>

              <button
                type="button"
                disabled={busyAction !== null || !globalPaused}
                onClick={() => handleToggleGlobalPause(false)}
                className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-black py-3.5 rounded-2xl text-xs uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40"
              >
                <PlayCircle size={15} />
                Retomar Global
              </button>
            </div>

            <div className="bg-black/40 rounded-2xl p-3.5 flex items-center justify-between text-xs font-mono border border-white/5">
              <span className="text-white/50 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Contrato Dual Airdrop:
              </span>
              <span className="text-white/80 truncate max-w-[210px]">
                {airdropAddress}
              </span>
            </div>

            <div className="bg-black/40 rounded-2xl p-3.5 flex items-center justify-between text-xs font-mono border border-white/5">
              <span className="text-white/50 flex items-center gap-1.5">
                <Activity size={14} className="text-[#D4AF37]" />
                Estado Operacional:
              </span>
              <span className="text-emerald-400 font-bold">
                {busyAction ? `PROCESSANDO (${busyAction})...` : "SINCRONIZADO"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}