export const MOCK_PRICES = {
  ECOIN: 0.0102,
  USDT: 1.0,
  EUSD: 1.0,
  BNB: 612.45,
};

export function getPriceBySymbol(symbol: string): number {
  return MOCK_PRICES[symbol as keyof typeof MOCK_PRICES] || 0;
}