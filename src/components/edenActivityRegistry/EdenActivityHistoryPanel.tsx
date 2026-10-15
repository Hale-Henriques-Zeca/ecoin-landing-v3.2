"use client";

import {
  EDEN_ACTIVITY_HASH_TEXT,
  EDEN_ACTIVITY_LABELS,
  type EdenActivityRecord,
} from "@/types/edenActivityRegistry/activity.types";
import { useEdenActivityHistory } from "@/hooks/edenActivityRegistry/useEdenActivityHistory";
import { useEdenActivityCount } from "@/hooks/edenActivityRegistry/useEdenActivityCount";
import { keccak256, toBytes, type Address } from "viem";

function shorten(value: string) {
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

function activityLabel(activityType: string) {
  const normalized = activityType.toLowerCase();
  const key = Object.entries(EDEN_ACTIVITY_HASH_TEXT).find(
    ([, solidityText]) =>
      keccak256(toBytes(solidityText)).toLowerCase() === normalized,
  )?.[0];

  return key ? EDEN_ACTIVITY_LABELS[key] : "Actividade";
}

function formatDate(timestamp: bigint) {
  return new Date(Number(timestamp) * 1000).toLocaleString();
}

type Props = {
  userAddress?: Address;
};

export default function EdenActivityHistoryPanel({ userAddress }: Props) {
  const history = useEdenActivityHistory({ userAddress });
  const count = useEdenActivityCount(userAddress);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Histórico de actividades</h2>
          <p className="text-sm text-muted-foreground">
            Total registado on-chain: {count.count.toString()}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            history.refetch();
            void count.refetch();
          }}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          Actualizar
        </button>
      </div>

      {history.error && (
        <p role="alert" className="rounded-lg border border-red-500/40 p-3 text-sm">
          {history.error.message}
        </p>
      )}

      {count.error && (
        <p role="alert" className="rounded-lg border border-red-500/40 p-3 text-sm">
          Não foi possível consultar a contagem: {count.error.message}
        </p>
      )}

      {history.isLoading && (
        <p className="text-sm text-muted-foreground">A carregar actividades…</p>
      )}

      {!history.isLoading && !history.error && history.activities.length === 0 && (
        <p className="rounded-lg border p-4 text-sm text-muted-foreground">
          Não foram encontradas actividades para este endereço, ou a configuração
          do bloco inicial ainda não foi concluída.
        </p>
      )}

      <div className="space-y-3">
        {history.activities.map((activity: EdenActivityRecord) => (
          <article
            key={`${activity.transactionHash ?? "tx"}-${activity.logIndex ?? 0}`}
            className="rounded-xl border p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-medium">
                  {activityLabel(activity.activityType)}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                Bloco {activity.blockNumber.toString()}
              </span>
            </div>

            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Token</dt>
                <dd className="break-all">
                  {activity.token.toLowerCase() ===
                  "0x0000000000000000000000000000000000000000"
                    ? "Token nativo / não especificado"
                    : shorten(activity.token)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Montante bruto (uint256)</dt>
                <dd className="break-all">{activity.amount.toString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Origem</dt>
                <dd>{shorten(activity.source)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Referência</dt>
                <dd className="break-all">{shorten(activity.referenceId)}</dd>
              </div>
            </dl>

            {activity.transactionHash && (
              <a
                className="mt-3 inline-block text-sm underline"
                href={`https://bscscan.com/tx/${activity.transactionHash}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver transacção no BscScan
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
