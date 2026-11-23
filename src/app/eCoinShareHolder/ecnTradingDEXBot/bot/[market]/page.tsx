'use client';

import { use } from 'react';
import Crypto from './Crypto';
import Stable from './Stable';

interface MarketPageProps {
  params: Promise<{ market: string }> | { market: string };
}

export default function MarketConfigPage({ params }: MarketPageProps) {
  const resolvedParams =
    typeof (params as Promise<{ market: string }>).then === 'function'
      ? use(params as Promise<{ market: string }>)
      : (params as { market: string });

  const market = resolvedParams?.market ?? 'usdt';
  const normalized = market.toLowerCase();

  // Roteia eCoin e BuyBack para o motor Crypto (eCoin) e eDollar/USDT para Stable
  const isCryptoMarket =
    normalized.startsWith('ecoin') ||
    normalized.startsWith('buyback') ||
    normalized.startsWith('crypto');

  if (isCryptoMarket) {
    return <Crypto market={market} />;
  }

  return <Stable market={market} />;
}