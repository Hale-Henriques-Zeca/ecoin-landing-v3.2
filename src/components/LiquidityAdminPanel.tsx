"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useBalance } from "wagmi";
import { formatUnits, parseUnits, isAddress } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "@/lib/abis/erc20Abi";
import { bsc } from "wagmi/chains";
import {
  ShieldAlert,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Coins,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";

/* ================= VAULT ABI ================= */
const vaultAbi = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "to", type: "address" },
    ],
    outputs: [],
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
] as const;

/* ================= LISTA DE ATIVOS SUPORTADOS ================= */
interface TokenConfig {
  symbol: string;
  name: string;
  address: `0x${string}`;
  decimals: number;
  color: string;
  bgColor: string;
  borderColor: string;
  isNative?: boolean;
}

const SUPPORTED_TOKENS: TokenConfig[] = [
  {
    symbol: "USDT",
    name: "Tether USD",
    address: CONTRACTS.USDT as `0x${string}`,
    decimals: 18,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    symbol: "E-USD",
    name: "eDollar Stablecoin",
    address: "0xF7543E5B4735C58a176269202847360aaDfA83C1",
    decimals: 18,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    symbol: "E-Coin",
    name: "eCoin Native Token",
    address: "0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964",
    decimals: 18,
    color: "text-[#D4AF37]",
    bgColor: "bg-[#D4AF37]/10",
    borderColor: "border-[#D4AF37]/30",
  },
  {
    symbol: "BNB",
    name: "Binance Coin (Native)",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    isNative: true,
  },
];

export default function LiquidityAdminPanel() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  /* ================= ESTADOS LOCAIS ================= */
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<string>("USDT");
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState<string>("");
  const [withdrawTo, setWithdrawTo] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info" | null;
    text: string;
  }>({ type: null, text: "" });

  const activeToken =
    SUPPORTED_TOKENS.find((t) => t.symbol === selectedTokenSymbol) ||
    SUPPORTED_TOKENS[0];

  /* ================= LEITURA DE OWNER ================= */
  const { data: owner } = useReadContract({
    address: CONTRACTS.LIQUIDITY_VAULT as `0x${string}`,
    abi: vaultAbi,
    functionName: "owner",
  });

  const isOwner =
    typeof owner === "string" &&
    typeof address === "string" &&
    owner.toLowerCase() === address.toLowerCase();

  /* ================= LEITURA DE SALDOS DO COFRE ================= */
  // Balance ERC20
  const { data: erc20VaultBalance } = useReadContract({
    address: activeToken.isNative ? undefined : activeToken.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [CONTRACTS.LIQUIDITY_VAULT as `0x${string}`],
    query: { refetchInterval: 4000, enabled: !activeToken.isNative },
  });

  // Balance Nativo BNB
  const { data: bnbVaultBalance } = useBalance({
    address: CONTRACTS.LIQUIDITY_VAULT as `0x${string}`,
    query: { refetchInterval: 4000, enabled: activeToken.isNative },
  });

  const rawVaultBalance = activeToken.isNative
    ? bnbVaultBalance?.value
    : (erc20VaultBalance as bigint | undefined);

  const formattedVaultBalance =
    rawVaultBalance !== undefined
      ? Number(formatUnits(rawVaultBalance, activeToken.decimals)).toLocaleString(
          undefined,
          { minimumFractionDigits: 2, maximumFractionDigits: 4 }
        )
      : "—";

  /* ================= AÇÕES (DEPOSIT & WITHDRAW) ================= */
  const handleDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      setStatusMessage({ type: "error", text: "Insira um valor válido para depósito." });
      return;
    }

    try {
      setIsLoading(true);
      setStatusMessage({ type: "info", text: "Aprovação em processamento..." });

      const parsed = parseUnits(amount, activeToken.decimals);

      // Se for ERC20, faz Approve antes
      if (!activeToken.isNative) {
        await writeContractAsync({
          address: activeToken.address,
          abi: erc20Abi,
          functionName: "approve",
          args: [CONTRACTS.LIQUIDITY_VAULT as `0x${string}`, parsed],
          account: address,
          chain: bsc,
        });

        setStatusMessage({ type: "info", text: "Aprovação concluída. Efetuando depósito no Cofre..." });
      }

      // Executa o Depósito no Cofre
      await writeContractAsync({
        address: CONTRACTS.LIQUIDITY_VAULT as `0x${string}`,
        abi: vaultAbi,
        functionName: "deposit",
        args: [activeToken.address, parsed],
        account: address,
        chain: bsc,
      });

      setStatusMessage({
        type: "success",
        text: `Depósito de ${amount} ${activeToken.symbol} realizado com sucesso!`,
      });
      setAmount("");
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: err?.shortMessage || "Erro ao processar depósito on-chain.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      setStatusMessage({ type: "error", text: "Insira um valor válido para levantamento." });
      return;
    }

    if (!withdrawTo || !isAddress(withdrawTo)) {
      setStatusMessage({ type: "error", text: "Endereço de destino inválido." });
      return;
    }

    try {
      setIsLoading(true);
      setStatusMessage({ type: "info", text: "Processando levantamento do Cofre..." });

      const parsed = parseUnits(amount, activeToken.decimals);

      await writeContractAsync({
        address: CONTRACTS.LIQUIDITY_VAULT as `0x${string}`,
        abi: vaultAbi,
        functionName: "withdraw",
        args: [activeToken.address, parsed, withdrawTo as `0x${string}`],
        account: address,
        chain: bsc,
      });

      setStatusMessage({
        type: "success",
        text: `Levantamento de ${amount} ${activeToken.symbol} enviado para ${withdrawTo.slice(
          0,
          6
        )}...${withdrawTo.slice(-4)}!`,
      });
      setAmount("");
      setWithdrawTo("");
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: err?.shortMessage || "Erro ao efetuar levantamento do Cofre.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= ESTADO NÃO CONECTADO ================= */
  if (!isConnected) {
    return (
      <div className="bg-zinc-950/80 border border-amber-500/20 rounded-2xl p-6 text-center shadow-xl backdrop-blur-md">
        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full w-fit mx-auto mb-3">
          <Lock size={22} />
        </div>
        <h4 className="text-zinc-200 font-semibold text-base mb-1">
          Acesso Restrito ao Administrador
        </h4>
        <p className="text-xs text-zinc-400">
          Conecte a carteira proprietária do protocolo para gerenciar o Cofre de Liquidez.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/90 border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* GLOW DECORATIVO */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER DO PAINEL ADMIN */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37] tracking-wide">
              Painel de Gestão do Cofre (Liquidity Vault)
            </h3>
            <p className="text-xs text-zinc-400">
              Gerencie depósitos e levantamentos diretos de ativos na reserva on-chain.
            </p>
          </div>
        </div>

        {/* STATUS DE PROPRIETÁRIO */}
        <div className="shrink-0">
          {isOwner ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 size={13} /> Owner Autenticado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
              <AlertCircle size={13} /> Não é o Owner
            </span>
          )}
        </div>
      </div>

      {/* SELETOR DE MOEDAS */}
      <div className="mt-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2.5">
          1. Selecionar Ativo no Cofre
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SUPPORTED_TOKENS.map((token) => {
            const isSelected = token.symbol === selectedTokenSymbol;
            return (
              <button
                key={token.symbol}
                type="button"
                onClick={() => {
                  setSelectedTokenSymbol(token.symbol);
                  setStatusMessage({ type: null, text: "" });
                }}
                className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left ${
                  isSelected
                    ? `${token.bgColor} ${token.borderColor} ring-1 ring-[#D4AF37]/50`
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 text-zinc-400"
                }`}
              >
                <div className={`p-1.5 rounded-lg bg-black/40 ${token.color}`}>
                  <Coins size={16} />
                </div>
                <div>
                  <div className={`text-xs font-bold ${isSelected ? token.color : "text-zinc-200"}`}>
                    {token.symbol}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">{token.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CARD DE SALDO DISPONÍVEL DO ATIVO SELECIONADO */}
      <div className="mt-5 bg-black/40 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Wallet size={16} className={activeToken.color} />
          <span>Saldo Atual no Cofre ({activeToken.symbol}):</span>
        </div>
        <div className={`text-lg font-mono font-bold ${activeToken.color}`}>
          {formattedVaultBalance} {activeToken.symbol}
        </div>
      </div>

      {/* NAVEGAÇÃO DE ABAS: DEPOSITAR vs LEVANTAR */}
      <div className="mt-6 flex border-b border-zinc-800">
        <button
          type="button"
          onClick={() => {
            setActiveTab("deposit");
            setStatusMessage({ type: null, text: "" });
          }}
          className={`flex items-center gap-2 px-5 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === "deposit"
              ? "border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/5"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <ArrowDownLeft size={16} /> Depositar Ativo
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("withdraw");
            setStatusMessage({ type: null, text: "" });
          }}
          className={`flex items-center gap-2 px-5 py-2.5 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === "withdraw"
              ? "border-red-500 text-red-400 bg-red-500/5"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <ArrowUpRight size={16} /> Levantar (Withdraw)
        </button>
      </div>

      {/* FORMULÁRIO DE AÇÃO */}
      <div className="mt-6 space-y-4">
        {/* INPUT DE VALOR */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
            Quantidade ({activeToken.symbol})
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              disabled={isLoading}
              className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#D4AF37] transition disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => {
                if (rawVaultBalance) {
                  setAmount(formatUnits(rawVaultBalance, activeToken.decimals));
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[#D4AF37] uppercase tracking-wider"
            >
              Max
            </button>
          </div>
        </div>

        {/* INPUT SEPARADO DE ENDEREÇO DE DESTINO (EXCLUSIVO LEVANTAMENTO) */}
        {activeTab === "withdraw" && (
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
              Endereço de Destino (Wallet Recebedora)
            </label>
            <input
              type="text"
              value={withdrawTo}
              onChange={(e) => setWithdrawTo(e.target.value)}
              placeholder="0x..."
              disabled={isLoading}
              className="w-full bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-red-500 transition disabled:opacity-50"
            />
            {withdrawTo && !isAddress(withdrawTo) && (
              <p className="text-[11px] text-red-400 mt-1">Endereço EVM/BEP20 inválido.</p>
            )}
          </div>
        )}

        {/* MENSAGEM DE STATUS / FEEDBACK */}
        {statusMessage.text && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : statusMessage.type === "error"
                ? "bg-red-500/10 border border-red-500/30 text-red-400"
                : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
            }`}
          >
            {statusMessage.type === "info" && <Loader2 size={15} className="animate-spin shrink-0" />}
            {statusMessage.type === "success" && <CheckCircle2 size={15} className="shrink-0" />}
            {statusMessage.type === "error" && <AlertCircle size={15} className="shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* BOTÕES DE AÇÃO */}
        <div className="pt-2">
          {activeTab === "deposit" ? (
            <button
              type="button"
              onClick={handleDeposit}
              disabled={isLoading || !amount}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-bold text-sm flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-emerald-500/10"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Processando Depósito...</span>
                </>
              ) : (
                <>
                  <ArrowDownLeft size={16} />
                  <span>Depositar {activeToken.symbol} no Cofre</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleWithdraw}
              disabled={isLoading || !isOwner || !amount || !withdrawTo}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-red-500/10"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Processando Levantamento...</span>
                </>
              ) : !isOwner ? (
                <span>Requer Permissões de Owner do Cofre</span>
              ) : (
                <>
                  <ArrowUpRight size={16} />
                  <span>Levantar {activeToken.symbol} do Cofre</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}