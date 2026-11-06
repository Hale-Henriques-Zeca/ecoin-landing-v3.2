"use client";

import { useState } from "react";

interface AssetIconProps {
  symbol: string;
  imageUrl?: string | null;
  size?: number;
  className?: string;
}

const TOKEN_COLORS: Record<string, string> = {
  ECOIN: "bg-yellow-500/15 text-yellow-400",
  USDT: "bg-emerald-500/15 text-emerald-400",
  EUSD: "bg-cyan-500/15 text-cyan-400",
  BNB: "bg-amber-500/15 text-amber-400",
};

export default function AssetIcon({
  symbol,
  imageUrl,
  size = 36,
  className = "",
}: AssetIconProps) {
  const [imageError, setImageError] = useState(false);

  const colorClass =
    TOKEN_COLORS[symbol.toUpperCase()] ??
    "bg-neutral-700 text-neutral-200";

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-bold ${colorClass} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${symbol} icon`}
    >
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt={symbol}
          width={size}
          height={size}
          className="h-full w-full rounded-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-xs">
          {symbol.slice(0, 3).toUpperCase()}
        </span>
      )}
    </span>
  );
}