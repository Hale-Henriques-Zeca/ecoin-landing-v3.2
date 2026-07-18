'use client';

import React from 'react';
import TokenIcon from '../../../common/TokenIcon';

interface AssetIconProps {
  src?: string;
  symbol: string;
}

export default function AssetIcon({ src, symbol }: AssetIconProps) {
  return <TokenIcon src={src} symbol={symbol} size="md" />;
}