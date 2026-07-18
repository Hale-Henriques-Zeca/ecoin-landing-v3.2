'use client';

import React from 'react';
import Link from 'next/link';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';
import { LogoIcon, LogoText, LogoBadge } from './components';
import { BadgeType } from './components/LogoBadge';

interface WalletLogoProps {
  useAsset?: boolean;
  badgeType?: BadgeType;
  badgeText?: string;
}

export default function WalletLogo({ 
  useAsset = false,
  badgeType = 'NONE', // Definido por defeito como NONE para manter o design clássico limpo
  badgeText
}: WalletLogoProps) {
  return (
    <Link 
      href={WALLET_ROUTES.dashboard}
      className="flex items-center gap-3 group cursor-pointer select-none"
    >
      {/* 1. Ícone do Logótipo (SVG / Imagem) */}
      <LogoIcon useAsset={useAsset} />
      
      {/* 2. Texto de Identidade */}
      <LogoText />

      {/* 3. Badge Dinâmico do Estado da dApp */}
      {badgeType !== 'NONE' && (
        <LogoBadge type={badgeType} text={badgeText} />
      )}
    </Link>
  );
}