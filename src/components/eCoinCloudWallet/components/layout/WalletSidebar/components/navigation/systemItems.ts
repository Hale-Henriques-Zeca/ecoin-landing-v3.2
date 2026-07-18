import { Settings, HelpCircle } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';

export const systemItems = [
  { 
    title: 'Definições', 
    href: WALLET_ROUTES.settings, 
    icon: Settings 
  },
] as const;