import { Layers, Coins, Cpu, Zap } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';

export const ecosystemItems = [
  { 
    title: 'Módulos eCoin', 
    href: WALLET_ROUTES.ecosystem, 
    icon: Layers 
  },
  { 
    title: 'NFTs Gallery', 
    href: WALLET_ROUTES.nfts, 
    icon: Coins 
  },
] as const;