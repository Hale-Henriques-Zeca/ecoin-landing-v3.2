"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { AdminFeedbackState } from "@/components/mining/eCoin/MiningMainPage/Components/admin/eCoinProtocol/adminProtocolConfig";

/* ================= CARD BASE ================= */

type AdminCardProps = {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

export function AdminCard({
  title,
  subtitle,
  icon: Icon,
  children,
}: AdminCardProps) {
  return (
    <div className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-5 sm:mb-6 min-w-0">
          <div className="shrink-0 p-2.5 sm:p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
            <Icon size={20} />
          </div>
          <div className="min-w-0">
            <h2 className="min-w-0 text-white font-black text-[clamp(0.95rem,3.8vw,1.125rem)] leading-snug truncate">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[11px] font-mono text-white/40 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ================= ADDRESS PILL COM CÓPIA RÁPIDA ================= */

export function AddressPill({
  address,
  accentClass = "text-white/80",
}: {
  address?: string;
  accentClass?: string;
}) {
  const [copied, setCopied] = useState(false);

  if (!address) {
    return <span className="text-white/40">—</span>;
  }

  const handleCopy = () => {
    void navigator.clipboard?.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={`Copiar endereço completo: ${address}`}
      className={`inline-flex items-center gap-1.5 min-w-0 max-w-full hover:opacity-80 transition cursor-pointer ${accentClass}`}
    >
      <span className="truncate font-mono">
        {address.slice(0, 6)}...{address.slice(-4)}
      </span>
      {copied ? (
        <Check size={12} className="shrink-0 text-emerald-400" />
      ) : (
        <Copy size={12} className="shrink-0 opacity-60" />
      )}
    </button>
  );
}

/* ================= BANNER DE FEEDBACK ON-CHAIN ================= */

export function AdminFeedbackBanner({
  feedback,
  onClose,
}: {
  feedback: AdminFeedbackState;
  onClose: () => void;
}) {
  if (!feedback) return null;

  return (
    <div
      className={`rounded-2xl p-3.5 sm:p-4 border flex items-start justify-between gap-3 text-xs font-mono ${
        feedback.type === "success"
          ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-200"
          : "bg-red-950/60 border-red-500/40 text-red-200"
      }`}
    >
      <div className="flex items-start gap-2.5 min-w-0">
        {feedback.type === "success" ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1 min-w-0">
          <p className="break-words leading-relaxed">{feedback.message}</p>
          {feedback.txHash && (
            <a
              href={`https://bscscan.com/tx/${feedback.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#F9D13E] hover:underline"
            >
              <span>Ver transação no BscScan</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 text-white/50 hover:text-white px-1.5 py-0.5 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}

/* ================= GUARDA DE ACESSO (WALLET / REDE / OWNER) ================= */

type AdminAccessGuardProps = {
  isConnected: boolean;
  isCorrectChain: boolean;
  isCheckingPermission: boolean;
  isAuthorizedOperator: boolean;
  address?: `0x${string}`;
  onSwitchChain: () => void;
  onDisconnect: () => void;
};

export function AdminAccessGuard({
  isConnected,
  isCorrectChain,
  isCheckingPermission,
  isAuthorizedOperator,
  address,
  onSwitchChain,
  onDisconnect,
}: AdminAccessGuardProps) {
  if (!isConnected) {
    return (
      <main className="min-h-[320px] bg-black/60 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center text-white font-mono text-xs sm:text-sm gap-3">
        <ShieldCheck className="w-10 h-10 text-[#D4AF37]" />
        <p>Conecte a carteira Admin para gerenciar o protocolo eCoin</p>
      </main>
    );
  }

  if (!isCorrectChain) {
    return (
      <main className="min-h-[320px] bg-slate-950 border border-red-500/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center text-white gap-4">
        <ShieldAlert className="w-10 h-10 text-red-400 animate-bounce" />
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-black text-red-400">
            Rede Incorreta Detectada
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            Conecte-se à BNB Smart Chain Mainnet (Chain ID 56) para operar o
            painel administrativo.
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitchChain}
          className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black font-black text-xs uppercase cursor-pointer"
        >
          Mudar para BNB Chain
        </button>
      </main>
    );
  }

  if (!isCheckingPermission && !isAuthorizedOperator) {
    return (
      <main className="min-h-[320px] bg-slate-950 border border-amber-500/30 rounded-3xl p-6 flex flex-col items-center justify-center text-center text-white gap-4">
        <ShieldAlert className="w-10 h-10 text-amber-400" />
        <div className="space-y-1.5 max-w-md">
          <h2 className="text-base sm:text-lg font-black text-amber-400">
            Acesso Restrito ao Administrador
          </h2>
          <p className="text-xs text-slate-300 font-mono">
            A carteira conectada ({address?.slice(0, 6)}...{address?.slice(-4)})
            não possui permissão de Owner nem de Injector autorizado neste
            contrato.
          </p>
        </div>
        <button
          type="button"
          onClick={onDisconnect}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-bold text-xs uppercase cursor-pointer"
        >
          <LogOut size={14} />
          <span>Desconectar Carteira</span>
        </button>
      </main>
    );
  }

  return null;
}