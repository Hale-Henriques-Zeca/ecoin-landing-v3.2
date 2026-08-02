import { useECoinPrice } from './useECoinPrice';
import { useTokenSupply } from './useTokenSupply';
import { calculateMarketCap } from '../utils/marketCap';
import { MarketData } from '../types/market';
import { formatTime } from '../utils/time';

export function useMarketData(): MarketData {
  const { price, volume24h } = useECoinPrice();
  const supply = useTokenSupply();

  const marketCap = calculateMarketCap(price, supply);

  return {
    marketCap,
    volume: volume24h,
    lastUpdate: formatTime(Date.now()),
    supply,
  };
}