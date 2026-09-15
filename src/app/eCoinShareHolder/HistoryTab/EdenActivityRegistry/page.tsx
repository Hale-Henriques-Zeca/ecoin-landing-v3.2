"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Coins, 
  Gift, 
  TrendingUp, 
  Zap, 
  ExternalLink, 
  RefreshCw, 
  Filter,
  Layers
} from "lucide-react";

// ================= CONSTANTES E MAPEAMENTO DE ATIVIDADES =================

const EDEN_ACTIVITY_REGISTRY_ADDRESS = "0x0000000000000000000000000000000000000000"; // Substituir pelo endereço implantado

const ABI_ACTIVITY_REGISTRY = [
  "event ActivityRecorded(address indexed user, bytes32 indexed activityType, address indexed token, uint256 amount, address source, bytes32 referenceId, uint256 timestamp)",
  "function activityCount(address user) external view returns (uint256)"
];

// Mapeamento expandido para cobrir todas as constantes do contrato Solidity
const ACTIVITY_MAP: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  [ethers.id("DEPOSIT")]: { label: "Deposit", icon: <ArrowDownLeft className="w-4 h-4 text-emerald-400" />, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  [ethers.id("WITHDRAWAL")]: { label: "Withdrawal", icon: <ArrowUpRight className="w-4 h-4 text-red-400" />, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  [ethers.id("STAKING")]: { label: "Staking", icon: <Layers className="w-4 h-4 text-purple-400" />, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  [ethers.id("UNSTAKE")]: { label: "Unstake", icon: <Layers className="w-4 h-4 text-amber-400" />, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  [ethers.id("PROFIT")]: { label: "Profit", icon: <TrendingUp className="w-4 h-4 text-emerald-500" />, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
  [ethers.id("REFERRAL")]: { label: "Referral", icon: <Gift className="w-4 h-4 text-blue-400" />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  [ethers.id("REFERRAL_CLAIM")]: { label: "Referral Claim", icon: <Gift className="w-4 h-4 text-cyan-400" />, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  [ethers.id("CS_EMISSION")]: { label: "CS Emission", icon: <Zap className="w-4 h-4 text-yellow-400" />, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  [ethers.id("CLAIM")]: { label: "Claim Fee", icon: <Coins className="w-4 h-4 text-[#D4AF37]" />, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10 border-[#D4AF37]/20" },
  [ethers.id("TRADING")]: { label: "Trading", icon: <TrendingUp className="w-4 h-4 text-indigo-400" />, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  [ethers.id("INVESTMENT")]: { label: "Investment", icon: <Coins className="w-4 h-4 text-teal-400" />, color: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
};

interface ActivityLog {
  id: string;
  user: string;
  activityType: string;
  token: string;
  amount: string;
  source: string;
  referenceId: string;
  timestamp: number;
  transactionHash: string;
  blockNumber: number;
}

export default function EdenActivityHistoryPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("ALL");

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      if (!window.ethereum) {
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      
      if (accounts.length === 0) {
        setLoading(false);
        return;
      }

      const userAddress = accounts[0];
      setAccount(userAddress);

      const contract = new ethers.Contract(
        EDEN_ACTIVITY_REGISTRY_ADDRESS,
        ABI_ACTIVITY_REGISTRY,
        provider
      );

      // Filtra os eventos ActivityRecorded onde o utilizador é o endereço ativo
      const filter = contract.filters.ActivityRecorded(userAddress);
      const events = await contract.queryFilter(filter, 0, "latest");

      const parsedLogs: ActivityLog[] = events.map((event: any) => {
        const { user, activityType, token, amount, source, referenceId, timestamp } = event.args;
        return {
          id: `${event.transactionHash}-${event.index}`,
          user,
          activityType,
          token,
          amount: ethers.formatEther(amount),
          source,
          referenceId,
          timestamp: Number(timestamp),
          transactionHash: event.transactionHash,
          blockNumber: event.blockNumber,
        };
      }).reverse(); // Exibe os mais recentes primeiro

      setLogs(parsedLogs);
    } catch (err) {
      console.error("Erro ao carregar histórico da blockchain:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filteredLogs = logs.filter((log) => {
    if (filterType === "ALL") return true;
    return log.activityType === filterType;
  });

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 space-y-4 bg-[#020617] text-white">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 bg-[#D4AF37]/20 rounded-full blur-xl animate-pulse" />
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#D4AF37] border-r-amber-400 animate-spin" />
          <div className="absolute w-4 h-4 rounded-full bg-[#D4AF37] animate-ping opacity-75" />
          <div className="absolute w-2 h-2 rounded-full bg-amber-300" />
        </div>
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wider text-slate-200 uppercase">
              Carregando Histórico
            </span>
            <span className="flex space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Sincronizando registros da blockchain e movimentações...
          </p>
        </div>
        <div className="pt-2">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
            eCoin ShareHolder Protocol
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] text-white p-4 md:p-8 space-y-6">
      {/* 🟢 Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
            <span>Eden Activity Registry</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-mono">
              On-Chain Logs
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {account ? `Carteira conectada: ${account.substring(0, 6)}...${account.substring(account.length - 4)}` : "Carteira não detectada"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchHistory}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37]" />
            Atualizar
          </button>
        </div>
      </div>

      {/* 🔍 Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
        <button
          onClick={() => setFilterType("ALL")}
          className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
            filterType === "ALL"
              ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]"
              : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white"
          }`}
        >
          Todos ({logs.length})
        </button>
        {Object.keys(ACTIVITY_MAP).map((typeHash) => {
          const info = ACTIVITY_MAP[typeHash];
          const count = logs.filter((l) => l.activityType === typeHash).length;
          if (count === 0) return null;
          return (
            <button
              key={typeHash}
              onClick={() => setFilterType(typeHash)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                filterType === typeHash
                  ? `${info.bg} ${info.color}`
                  : "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {info.label} ({count})
            </button>
          );
        })}
      </div>

      {/* 📊 Activity Table / List */}
      <div className="rounded-xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Layers className="w-10 h-10 text-slate-600 mx-auto animate-pulse" />
            <p className="text-sm text-slate-400 font-mono">Nenhum registro de atividade encontrado.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-mono border-b border-white/5">
                <tr>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Montante</th>
                  <th className="px-4 py-3">Token / Ativo</th>
                  <th className="px-4 py-3">Data & Hora</th>
                  <th className="px-4 py-3 text-right">Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLogs.map((log) => {
                  const meta = ACTIVITY_MAP[log.activityType] || {
                    label: "Desconhecido",
                    icon: <Layers className="w-4 h-4 text-slate-400" />,
                    color: "text-slate-400",
                    bg: "bg-slate-500/10 border-slate-500/20"
                  };

                  const dateFormatted = new Date(log.timestamp * 1000).toLocaleString();

                  return (
                    <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-lg border ${meta.bg}`}>
                            {meta.icon}
                          </div>
                          <span className={`font-semibold ${meta.color}`}>
                            {meta.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-200 font-bold">
                        {parseFloat(log.amount).toFixed(4)}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-400">
                        {log.token === ethers.ZeroAddress ? (
                          <span className="text-amber-400/90 font-semibold">BNB</span>
                        ) : (
                          `${log.token.substring(0, 6)}...${log.token.substring(log.token.length - 4)}`
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 font-mono">
                        {dateFormatted}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <a
                          href={`https://bscscan.com/tx/${log.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-[#D4AF37] transition-colors font-mono"
                        >
                          {log.transactionHash.substring(0, 6)}...
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}