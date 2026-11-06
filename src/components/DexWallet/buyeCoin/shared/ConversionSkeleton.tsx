"use client";

interface ConversionSkeletonProps {
  rows?: number;
}

export default function ConversionSkeleton({
  rows = 3,
}: ConversionSkeletonProps) {
  return (
    <div
      className="w-full animate-pulse space-y-4 rounded-2xl border border-white/10 bg-[#101923] p-4"
      aria-label="A carregar dados da conversão"
      aria-busy="true"
    >
      <div className="h-5 w-40 rounded bg-neutral-700" />

      <div className="space-y-3 rounded-xl bg-black/20 p-4">
        <div className="h-3 w-24 rounded bg-neutral-700" />
        <div className="h-8 w-48 rounded bg-neutral-700" />
        <div className="h-12 w-full rounded-xl bg-neutral-800" />
        <div className="h-3 w-28 rounded bg-neutral-700" />
        <div className="h-8 w-40 rounded bg-neutral-700" />
      </div>

      {Array.from({ length: Math.max(0, rows) }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4"
        >
          <div className="h-3 w-28 rounded bg-neutral-700" />
          <div className="h-3 w-20 rounded bg-neutral-700" />
        </div>
      ))}

      <div className="h-12 w-full rounded-xl bg-neutral-700" />
    </div>
  );
}