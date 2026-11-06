
"use client";

import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  XCircle,
} from "lucide-react";

import type {
  ConversionStatus,
} from "@/types/converter";

interface DesktopTransactionStatusProps {
  status: ConversionStatus;
  hash?: string;
  explorerUrl?: string;
  message?: string;
}

const statusConfig: Record<
  ConversionStatus,
  {
    title: string;
    description: string;
    icon: typeof Clock3;
    color: string;
  }
> = {
  idle: {
    title: "Aguardando operação",
    description: "Nenhuma transação foi iniciada.",
    icon: Clock3,
    color: "text-gray-400",
  },
  quoting: {
    title: "A obter cotação",
    description: "A consultar fornecedores de liquidez.",
    icon: LoaderCircle,
    color: "text-blue-400",
  },
  awaiting_approval: {
    title: "Aguardando autorização",
    description: "É necessária uma autorização ERC-20.",
    icon: Clock3,
    color: "text-amber-400",
  },
  approving: {
    title: "A autorizar token",
    description: "Aguardando submissão da autorização.",
    icon: LoaderCircle,
    color: "text-blue-400",
  },
  approval_confirming: {
    title: "A confirmar autorização",
    description: "Aguardando confirmação na blockchain.",
    icon: LoaderCircle,
    color: "text-blue-400",
  },
  awaiting_confirmation: {
    title: "Aguardando confirmação",
    description: "Confirme a operação na sua carteira.",
    icon: Clock3,
    color: "text-amber-400",
  },
  submitting: {
    title: "A enviar transação",
    description: "A transação está a ser submetida.",
    icon: LoaderCircle,
    color: "text-blue-400",
  },
  confirming: {
    title: "A confirmar transação",
    description: "Aguardando confirmação da blockchain.",
    icon: LoaderCircle,
    color: "text-blue-400",
  },
  success: {
    title: "Conversão concluída",
    description: "A transação foi confirmada.",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  failed: {
    title: "Operação falhada",
    description: "A transação não foi concluída.",
    icon: XCircle,
    color: "text-red-400",
  },
};

export default function DesktopTransactionStatus({
  status,
  hash,
  explorerUrl,
  message,
}: DesktopTransactionStatusProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  const isLoading = [
    "quoting",
    "approving",
    "approval_confirming",
    "submitting",
    "confirming",
  ].includes(status);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#15191e] p-5">
      <div className="flex items-start gap-3">
        <div className={`rounded-xl bg-white/5 p-3 ${config.color}`}>
          <Icon
            size={22}
            className={isLoading ? "animate-spin" : ""}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white">
            {config.title}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            {message || config.description}
          </p>

          {hash && (
            <p className="mt-3 break-all font-mono text-[10px] text-gray-500">
              {hash}
            </p>
          )}

          {hash && explorerUrl && (
            <a
              href={explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-emerald-400 hover:underline"
            >
              Ver transação no BscScan ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
