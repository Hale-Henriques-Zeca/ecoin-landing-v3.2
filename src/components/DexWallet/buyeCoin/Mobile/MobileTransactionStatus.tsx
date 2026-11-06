"use client";

import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  LoaderCircle,
  XCircle,
} from "lucide-react";

import type {
  ConversionStatus,
} from "@/types/converter";

interface MobileTransactionStatusProps {
  status: ConversionStatus | string;
  hash?: string;
  explorerUrl?: string;
  message?: string;
}

const configurations: Record<
  string,
  {
    title: string;
    description: string;
    color: string;
    icon: typeof Clock3;
  }
> = {
  idle: {
    title: "Aguardando",
    description: "Nenhuma operação iniciada.",
    color: "text-gray-400",
    icon: Clock3,
  },
  quoting: {
    title: "A obter cotação",
    description: "A consultar os fornecedores.",
    color: "text-blue-400",
    icon: LoaderCircle,
  },
  awaiting_approval: {
    title: "Aguardando autorização",
    description: "Autorize o token na carteira.",
    color: "text-amber-400",
    icon: Clock3,
  },
  approving: {
    title: "A autorizar",
    description: "Aguarde a assinatura.",
    color: "text-blue-400",
    icon: LoaderCircle,
  },
  approval_confirming: {
    title: "A confirmar autorização",
    description: "Aguardando a blockchain.",
    color: "text-blue-400",
    icon: LoaderCircle,
  },
  awaiting_confirmation: {
    title: "Aguardando confirmação",
    description: "Confirme na sua carteira.",
    color: "text-amber-400",
    icon: Clock3,
  },
  submitting: {
    title: "A enviar",
    description: "A transação está a ser submetida.",
    color: "text-blue-400",
    icon: LoaderCircle,
  },
  confirming: {
    title: "A confirmar",
    description: "Aguardando confirmação on-chain.",
    color: "text-blue-400",
    icon: LoaderCircle,
  },
  success: {
    title: "Conversão concluída",
    description: "Transação confirmada.",
    color: "text-emerald-400",
    icon: CheckCircle2,
  },
  failed: {
    title: "Operação falhada",
    description: "Não foi possível concluir.",
    color: "text-red-400",
    icon: XCircle,
  },
};

// Fallback seguro caso venha um estado desconhecido ou undefined
const defaultConfig = {
  title: "Processando",
  description: "A processar operação...",
  color: "text-blue-400",
  icon: LoaderCircle,
};

export default function MobileTransactionStatus({
  status,
  hash,
  explorerUrl,
  message,
}: MobileTransactionStatusProps) {
  const config = configurations[status as string] || defaultConfig;
  const Icon = config.icon || Clock3;

  const loading = [
    "quoting",
    "approving",
    "approval_confirming",
    "submitting",
    "confirming",
  ].includes(status as string);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#15191e] p-4">
      <div className="flex items-start gap-3">
        <div className={`rounded-xl bg-white/5 p-3 ${config.color}`}>
          <Icon
            size={21}
            className={loading ? "animate-spin" : ""}
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-white">
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
              className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400"
            >
              Ver no BscScan
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}