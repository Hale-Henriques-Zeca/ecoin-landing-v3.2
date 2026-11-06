interface FeeBreakdownProps {
  amountIn: string;
  symbol: string;
}

export function FeeBreakdown({ amountIn, symbol }: FeeBreakdownProps) {
  const gross = parseFloat(amountIn) || 0;
  const fee = gross * 0.03;
  const net = gross - fee;

  return (
    <div className="p-3 bg-neutral-950/60 rounded-xl border border-neutral-800/80 text-xs space-y-2 mt-3">
      <div className="flex justify-between text-neutral-400">
        <span>Taxa do Protocolo (3%)</span>
        <span className="text-amber-400">{fee.toFixed(4)} {symbol}</span>
      </div>
      <div className="flex justify-between text-neutral-400">
        <span>Montante Líquido para o Adapter</span>
        <span className="text-white">{net.toFixed(4)} {symbol}</span>
      </div>
      <div className="flex justify-between text-neutral-400">
        <span>Tolerância de Slippage</span>
        <span className="text-white">0.5%</span>
      </div>
    </div>
  );
}