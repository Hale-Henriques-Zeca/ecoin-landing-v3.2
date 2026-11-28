import { formatUnits } from "viem";

export const PRIMARY_ADMIN_WALLET =
  "0x503de6d52bcC6C329345f6Fbc77610B1F5b39283".toLowerCase();

/* ================= ABIs AUXILIARES & TREASURY ================= */

export const treasuryAbi = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "withdraw",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "dailyWithdrawLimit",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "withdrawnToday",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "setDailyWithdrawLimit",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "limit", type: "uint256" }],
    outputs: [],
  },
] as const;

export const stakingAccessCheckAbi = [
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "bool" }],
  },
] as const;

export const ecGasStatusViewAbi = [
  {
    name: "usdtEnabled",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool" }],
  },
  {
    name: "eusdEnabled",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool" }],
  },
] as const;

/* ================= TIPOS PARTILHADOS ================= */

export type StablecoinTokenSymbol = "USDT" | "EUSD" | "ECOIN";

export type AdminFeedbackState = {
  type: "success" | "error";
  message: string;
  txHash?: `0x${string}`;
} | null;

export type ExecuteTxFn = (
  actionKey: string,
  successLabel: string,
  fn: () => Promise<`0x${string}`>,
  onSuccessReset?: () => void
) => Promise<void>;

/* ================= HELPERS DE FORMATAÇÃO & ESCALA ELÁSTICA ================= */

export function formatTokenAmount(
  value?: bigint,
  minDecimals: number = 2,
  maxDecimals: number = 4
): string {
  if (value === undefined) return "—";
  return Number(formatUnits(value, 18)).toLocaleString("en-US", {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
}

export function sanitizeDecimalInput(raw: string): string | null {
  const trimmed = raw.trim().replace(/\s+/g, "");
  if (!trimmed) return null;
  const normalized =
    trimmed.includes(",") && !trimmed.includes(".")
      ? trimmed.replace(",", ".")
      : trimmed.replace(/,/g, "");
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  if (Number(normalized) <= 0) return null;
  return normalized;
}

export function extractErrorMessage(err: unknown): string {
  if (!err || typeof err !== "object") {
    return "Erro inesperado ao executar a transação.";
  }
  const e = err as {
    shortMessage?: string;
    message?: string;
    cause?: { reason?: string; shortMessage?: string };
  };
  const msg =
    e.cause?.reason ||
    e.cause?.shortMessage ||
    e.shortMessage ||
    e.message ||
    "Falha na transação on-chain.";

  if (msg.toLowerCase().includes("user rejected")) {
    return "Transação cancelada pelo utilizador na carteira.";
  }
  return msg.length > 180 ? `${msg.slice(0, 180)}...` : msg;
}

export function getKpiMetricSize(valueStr: string): string {
  const len = valueStr.length;
  if (len <= 8) return "text-[clamp(1.35rem,5.2vw,1.875rem)]";
  if (len <= 11) return "text-[clamp(1.15rem,4.4vw,1.625rem)]";
  if (len <= 14) return "text-[clamp(0.95rem,3.6vw,1.35rem)]";
  if (len <= 18) return "text-[clamp(0.82rem,3.1vw,1.125rem)]";
  return "text-[clamp(0.72rem,2.7vw,0.95rem)]";
}

export function getRowMetricSize(valueStr: string): string {
  const len = valueStr.length;
  if (len <= 10) return "text-[clamp(0.72rem,3vw,0.8125rem)]";
  if (len <= 14) return "text-[clamp(0.65rem,2.7vw,0.75rem)]";
  if (len <= 18) return "text-[clamp(0.58rem,2.4vw,0.6875rem)]";
  return "text-[clamp(0.52rem,2.1vw,0.625rem)]";
}