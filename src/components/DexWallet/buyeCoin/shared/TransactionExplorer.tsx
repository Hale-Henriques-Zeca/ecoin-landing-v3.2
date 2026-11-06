"use client";

interface TransactionExplorerProps {
  hash?: `0x${string}` | null;
  chainId?: number;
  status?: "idle" | "pending" | "success" | "error";
  title?: string;
}

export default function TransactionExplorer({
  hash,
  chainId = 56,
  status = "idle",
  title = "Transação",
}: TransactionExplorerProps) {
  const explorerUrl =
    chainId === 97
      ? "https://testnet.bscscan.com"
      : "https://bscscan.com";

  const statusConfig = {
    idle: {
      label: "Aguardando transação",
      color: "text-gray-400",
      indicator: "bg-gray-500",
    },
    pending: {
      label: "Transação pendente",
      color: "text-yellow-400",
      indicator: "bg-yellow-400",
    },
    success: {
      label: "Transação confirmada",
      color: "text-emerald-400",
      indicator: "bg-emerald-400",
    },
    error: {
      label: "Transação falhou",
      color: "text-red-400",
      indicator: "bg-red-400",
    },
  }[status];

  const explorerLink = hash
    ? `${explorerUrl}/tx/${hash}`
    : null;

  const copyHash = async () => {
    if (!hash) return;

    try {
      await navigator.clipboard.writeText(hash);
    } catch (error) {
      console.error("Não foi possível copiar o hash:", error);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#101722] p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>

        <span
          className={`flex items-center gap-2 text-xs font-medium ${statusConfig.color}`}
        >
          <span
            className={`h-2 w-2 rounded-full ${statusConfig.indicator}`}
          />
          {statusConfig.label}
        </span>
      </div>

      {hash ? (
        <div className="mt-4">
          <p className="mb-2 text-xs text-gray-400">
            Transaction Hash
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 p-3">
            <span className="break-all font-mono text-xs text-gray-200">
              {`${hash.slice(0, 12)}...${hash.slice(-10)}`}
            </span>

            <button
              type="button"
              onClick={copyHash}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10"
            >
              Copiar
            </button>
          </div>

          <a
            href={explorerLink!}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-yellow-400 hover:text-yellow-300"
          >
            Ver no BscScan
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      ) : (
        <p className="mt-3 text-xs text-gray-500">
          O hash da transação aparecerá aqui depois de iniciares a operação.
        </p>
      )}
    </div>
  );
}