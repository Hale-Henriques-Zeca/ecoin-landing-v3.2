/**
 * Utilitários de cálculo para métricas do E-Coin Trading Bot
 */

export function calculatePoolShare(userStake: number, totalPoolStake: number): number {
  if (totalPoolStake <= 0) return 0;
  return Number(((userStake / totalPoolStake) * 100).toFixed(2));
}

export function calculateProfitCapacity(csUsdtAmount: number, ratio = 1.3): number {
  return csUsdtAmount * ratio;
}

export function calculateCapacityConsumedPercent(realizedProfitUsdt: number, maxCapacityUsdt: number): number {
  if (maxCapacityUsdt <= 0) return 0;
  const percent = (realizedProfitUsdt / maxCapacityUsdt) * 100;
  return Math.min(100, Number(percent.toFixed(2)));
}

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatCrypto(value: number, decimals = 4): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  });
}