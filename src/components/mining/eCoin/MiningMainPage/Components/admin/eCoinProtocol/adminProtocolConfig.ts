import { formatUnits } from "viem";

export const PRIMARY_ADMIN_WALLET =
  "0x503de6d52bcC6C329345f6Fbc77610B1F5b39283".toLowerCase();

/* ================= ABIs ALINHADAS AOS CONTRATOS ================= */

export const miningStakingECoinAdminAbi = [
  {
    name: "ecoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "owner",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "claimCollector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "totalStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "totalEligibleStaked",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "rewardBufferECoin",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "totalStakers",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "streamRate",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "authorizedInjectors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "bool" }],
  },
  {
    name: "injectInstantECoin",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "addECoinBuffer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "amount", type: "uint256" }],
    outputs: [],
  },
  {
    name: "pingStream",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "setAuthorizedInjector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "injector", type: "address" },
      { name: "allowed", type: "bool" },
    ],
    outputs: [],
  },
  {
    name: "setClaimCollector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_collector", type: "address" }],
    outputs: [],
  },
  {
    name: "withdrawExcess",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "to", type: "address" }],
    outputs: [],
  },
] as const;

export const ecGasSaleECoinAdminAbi = [
  {
    name: "ecoinEnabled",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "bool" }],
  },
  {
    name: "collector",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "mining",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "activityRegistry",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "address" }],
  },
  {
    name: "setECoinEnabled",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "enabled", type: "bool" }],
    outputs: [],
  },
  {
    name: "setCollector",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_collector", type: "address" }],
    outputs: [],
  },
  {
    name: "setMining",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_mining", type: "address" }],
    outputs: [],
  },
  {
    name: "setActivityRegistry",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "_activityRegistry", type: "address" }],
    outputs: [],
  },
] as const;

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

/* ================= TIPOS PARTILHADOS ================= */

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