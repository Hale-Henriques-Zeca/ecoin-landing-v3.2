"use client";

interface PriceImpactProps {
  impact: number | null;
  loading?: boolean;
}

export default function PriceImpact({
  impact,
  loading = false,
}: PriceImpactProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs text-neutral-400">
          Impacto no preço
        </span>
        <span className="h-3 w-16 animate-pulse rounded bg-neutral-700" />
      </div>
    );
  }

  if (impact === null || !Number.isFinite(impact)) {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-xs text-neutral-400">
          Impacto no preço
        </span>
        <span className="text-xs text-neutral-500">
          Indisponível
        </span>
      </div>
    );
  }

  const absoluteImpact = Math.abs(impact);

  const severity =
    absoluteImpact >= 5
      ? "high"
      : absoluteImpact >= 2
        ? "medium"
        : "low";

  const styles = {
    low: "text-emerald-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  };

  const labels = {
    low: "Baixo",
    medium: "Moderado",
    high: "Elevado",
  };

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div>
        <p className="text-xs text-neutral-400">
          Impacto no preço
        </p>
        <p className={`mt-1 text-[10px] ${styles[severity]}`}>
          {labels[severity]}
        </p>
      </div>

      <span className={`text-sm font-semibold ${styles[severity]}`}>
        {impact > 0 ? "+" : ""}
        {impact.toFixed(2)}%
      </span>
    </div>
  );
}