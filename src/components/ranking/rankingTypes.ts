export type MainRankingTab = "ecnTrader" | "referrals" | "ecGas";

export type TraderSubMode = "topMargin" | "liveProfit" | "topGainers";
export type ReferralSubMode = "all" | "level1" | "level2" | "level3";
export type PoolFilter = "ALL" | "ECOIN" | "STABLE";
export type TimeWindowKey = "90d" | "30d" | "15d" | "7d" | "1d";

export interface RankingEntry {
  address: `0x${string}`;
  displayName: string;
  stakedECoin: number; // Principal em eCoin no Staking (ou volume de gás na aba ecGas)
  poolSharePercent: number; // % de participação no pool total
  liveProfit: number; // Lucro pendente ao vivo (zera ao sacar)
  periodGain: number; // Acumulado na janela (90d, 30d, 15d, 7d, 1d)
  rewardSymbol: "eCoin" | "USDT" | "E-USD" | "BNB";
  poolType: "ECOIN" | "STABLE";
  vipTier: string; // Ex: ECN-VIP6 ou R-VIP5
  directReferralsCount?: number; // Contagem de convidados no filtro/período ativo
  l1Count?: number; // Nível 1 (Direto) no período
  l2Count?: number; // Nível 2 (Indireto) no período
  l3Count?: number; // Nível 3 (Rede) no período
  l1Gain?: number; // Comissões Nível 1 (Direto) no período
  l2Gain?: number; // Comissões Nível 2 (Indireto) no período
  l3Gain?: number; // Comissões Nível 3 (Rede) no período
  lastTxHash?: `0x${string}`;
}

export const TIME_WINDOWS: { key: TimeWindowKey; label: string; days: number }[] = [
  { key: "90d", label: "90 Dia", days: 90 },
  { key: "30d", label: "30 Dia", days: 30 },
  { key: "15d", label: "15 Dia", days: 15 },
  { key: "7d", label: "7 Dia", days: 7 },
  { key: "1d", label: "1 Dia", days: 1 },
];

export const REFERRAL_LEVEL_FILTERS: {
  key: ReferralSubMode;
  label: string;
  shortLabel: string;
}[] = [
  { key: "all", label: "Todos os Níveis (L1–L3)", shortLabel: "Geral (3 Níveis)" },
  { key: "level1", label: "Nível 1 · Direto", shortLabel: "Direto (L1)" },
  { key: "level2", label: "Nível 2 · Indireto", shortLabel: "Indireto (L2)" },
  { key: "level3", label: "Nível 3 · Rede", shortLabel: "Rede (L3)" },
];

export function shortenWallet(addr: string): string {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function computeVipTier(
  stakedECoin: number,
  prefix: "ECN-VIP" | "R-VIP" = "ECN-VIP"
): string {
  if (stakedECoin >= 50_000) return `${prefix}6`;
  if (stakedECoin >= 20_000) return `${prefix}5`;
  if (stakedECoin >= 5_000) return `${prefix}4`;
  if (stakedECoin >= 1_000) return `${prefix}3`;
  if (stakedECoin >= 250) return `${prefix}2`;
  return `${prefix}1`;
}

export function getBscScanAddressUrl(
  address: string,
  txHash?: string
): string {
  if (txHash) return `https://bscscan.com/tx/${txHash}`;
  return `https://bscscan.com/address/${address}`;
}